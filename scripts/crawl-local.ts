#!/usr/bin/env npx tsx
/**
 * Local crawler script — run with: npx tsx scripts/crawl-local.ts
 * Runs directly on your Mac, no Vercel timeout issues.
 *
 * Uses the REAL DB schema (listings + listing_images tables).
 */

import { createClient } from "@libsql/client";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import { classifyRechtsstatus } from "../src/lib/rechtsstatus-classifier";
import { classifyCategory } from "../src/lib/category-classifier";
import { getPlzCoordinates, getCityCoordinates } from "../src/lib/plz-coordinates";

dotenv.config({ path: ".env.local" });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// ─── Constants ──────────────────────────────────────────────

const BASE = "https://www.gebrauchtwaffen.com";

const HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "de-CH,de;q=0.9,fr;q=0.8,en;q=0.7",
  Referer: "https://www.google.ch/",
};

const CRAWLER_USER_ID = "crawler-gebrauchtwaffen";

const CATEGORIES = [
  { slug: "kurzwaffen", hauptkategorie: "kurzwaffen" },
  { slug: "langwaffen", hauptkategorie: "langwaffen" },
  { slug: "sammler-ordonanzwaffen", hauptkategorie: "ordonnanzwaffen" },
  { slug: "luftdruckwaffen-softair", hauptkategorie: "luftdruckwaffen" },
  { slug: "optik", hauptkategorie: "optik" },
  { slug: "messer-blankwaffen", hauptkategorie: "zubehoer" },
  { slug: "wiederladen", hauptkategorie: "zubehoer" },
  { slug: "bogenschiesen", hauptkategorie: "zubehoer" },
  { slug: "wild-und-jagd", hauptkategorie: "langwaffen" },
  { slug: "verschiedenes", hauptkategorie: "zubehoer" },
  { slug: "selbstverteidigung", hauptkategorie: "zubehoer" },
];

// ─── Utilities ──────────────────────────────────────────────

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchHtml(url: string, retries = 2): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
    if ((res.status === 403 || res.status === 429) && retries > 0) {
      console.log(`  [!] ${res.status} — retrying in 5s...`);
      await delay(5000);
      return fetchHtml(url, retries - 1);
    }
    if (!res.ok) {
      console.log(`  [!] HTTP ${res.status} for ${url}`);
      return null;
    }
    return await res.text();
  } catch (e) {
    console.log(`  [x] Fetch error: ${e}`);
    return null;
  }
}

// ─── Pagination & URL extraction ────────────────────────────

function getLastPage(html: string, slug: string): number {
  const m1 = html.match(
    /class="searchPaginationLast[^"]*"[^>]*href="[^"]*\/(\d+)"|href="[^"]*\/(\d+)"[^>]*class="searchPaginationLast/
  );
  if (m1) return parseInt(m1[1] || m1[2]);

  const escaped = slug.replace(/-/g, "\\-");
  const m2 = html.match(
    new RegExp(
      `href="(?:https://www\\.gebrauchtwaffen\\.com)?/${escaped}/(\\d+)"[^>]*>\\s*(?:»|&raquo;|\\u00BB)`,
      "i"
    )
  );
  if (m2) return parseInt(m2[1]);

  const allMatches = Array.from(
    html.matchAll(
      new RegExp(
        `href="(?:https://www\\.gebrauchtwaffen\\.com)?/${escaped}/(\\d+)"`,
        "g"
      )
    )
  );
  if (allMatches.length > 0)
    return Math.max(...allMatches.map((m) => parseInt(m[1])));

  const m4 = html.match(/(\d+)\s+von\s+(\d+)/i);
  if (m4) {
    const perPage = parseInt(m4[1]);
    const total = parseInt(m4[2]);
    if (perPage > 0 && total > 0) return Math.ceil(total / perPage);
  }
  return 1;
}

function extractListingUrls(html: string): string[] {
  const absMatches = Array.from(
    html.matchAll(
      /href="(https:\/\/www\.gebrauchtwaffen\.com\/[^"]+_i\d+)"/g
    )
  );
  if (absMatches.length > 0)
    return Array.from(new Set(absMatches.map((m) => m[1])));

  const relMatches = Array.from(html.matchAll(/href="(\/[^"]+_i\d+)"/g));
  if (relMatches.length > 0)
    return Array.from(new Set(relMatches.map((m) => BASE + m[1])));

  const onclickMatches = Array.from(
    html.matchAll(
      /location\.href='(https:\/\/www\.gebrauchtwaffen\.com\/[^']+_i\d+)'/g
    )
  );
  return Array.from(new Set(onclickMatches.map((m) => m[1])));
}

// ─── Category mapping ───────────────────────────────────────

function mapCategoryFromUrl(url: string): string {
  if (url.includes("/pistolen") || url.includes("/revolver"))
    return "kurzwaffen";
  if (
    url.includes("/magazine") ||
    url.includes("/holster") ||
    url.includes("/griffschalen") ||
    url.includes("/schafte") ||
    url.includes("/laufe") ||
    url.includes("/montagen") ||
    url.includes("/chokes")
  )
    return "zubehoer";
  if (url.includes("/kurzwaffen")) return "kurzwaffen";
  if (
    url.includes("/flinten") ||
    url.includes("/buchsen") ||
    url.includes("/kombinierte")
  )
    return "langwaffen";
  if (url.includes("/langwaffen")) return "langwaffen";
  if (url.includes("/sammler") || url.includes("/ordonanz"))
    return "ordonnanzwaffen";
  if (url.includes("/luftdruck") || url.includes("/softair"))
    return "luftdruckwaffen";
  if (url.includes("/optik")) return "optik";
  if (url.includes("/messer") || url.includes("/blankwaffen"))
    return "zubehoer";
  if (url.includes("/wiederladen")) return "zubehoer";
  if (url.includes("/wild") || url.includes("/jagd")) return "langwaffen";
  if (url.includes("/bogenschiesen")) return "zubehoer";
  if (url.includes("/selbstverteidigung")) return "zubehoer";
  return "zubehoer";
}

// ─── Detail page scraping ───────────────────────────────────

interface ScrapedListing {
  sourceId: string;
  titel: string;
  preis: number;
  beschreibung: string;
  kanton: string;
  ortschaft: string;
  hauptkategorie: string;
  unterkategorie: string;
  rechtsstatus: string;
  imageUrls: string[];
  sourceUrl: string;
  lat: number | null;
  lng: number | null;
}

function parseTitle(html: string): string {
  const m = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (!m) return "";
  return m[1].trim().replace(/^[^–\-]+ [–\-] /, "").trim();
}

function parsePrice(html: string): number {
  const m = html.match(/class="price[^"]*"[^>]*>\s*CHF\s*([\d.,'+]+)/);
  if (m) {
    return (
      parseFloat(m[1].replace(/\./g, "").replace(/'/g, "").replace(",", ".")) ||
      0
    );
  }
  const fallback = html.match(/CHF\s*([\d.,'+]+)/);
  if (fallback) {
    return (
      parseFloat(
        fallback[1].replace(/\./g, "").replace(/'/g, "").replace(",", ".")
      ) || 0
    );
  }
  return 0;
}

function parseDescription(html: string): string {
  const descMatches = Array.from(
    html.matchAll(/class="desc round3"[^>]*>([\s\S]*?)<\/div>/g)
  );
  if (descMatches.length >= 2) {
    return descMatches[1][1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 2000);
  }
  const textMatch = html.match(/class="text"[^>]*>([\s\S]*?)<\/div>/);
  if (textMatch) {
    return textMatch[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 2000);
  }
  const legacyMatch = html.match(
    /class="item-description"[^>]*>([\s\S]*?)<\/div>/
  );
  if (legacyMatch) {
    return legacyMatch[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 2000);
  }
  return "";
}

function parseCanton(html: string): string {
  const m =
    html.match(
      /class="[^"]*breadcrumb[^"]*region[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i
    ) ||
    html.match(
      /class="[^"]*region[^"]*breadcrumb[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i
    ) ||
    html.match(
      /class="region"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i
    ) ||
    html.match(/itemprop="addressRegion"[^>]*>([^<]+)/i) ||
    html.match(/Schweiz-Switzerland\s*·\s*([^·\n<]+)/);
  return m ? m[1].trim().split("·")[0].trim() : "";
}

function parseCity(html: string): string {
  const m =
    html.match(/class="city"[^>]*>([^<]+)</) ||
    html.match(/itemprop="addressLocality"[^>]*>([^<]+)/i);
  return m ? m[1].trim() : "";
}

function parseImages(html: string): string[] {
  // ONLY extract images from div.main-effect.effect6 (the listing's own gallery)
  // Related listings use <tr class="effect6">, NOT <div class="main-effect effect6">
  const mainEffectMatch =
    html.match(/class="main-effect effect6"[^>]*>([\s\S]*?)<\/div>/i) ||
    html.match(/class="[^"]*main-effect[^"]*effect6[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

  if (!mainEffectMatch) return [];

  const galleryHtml = mainEffectMatch[0];
  const matches =
    galleryHtml.match(
      /d9c3dmdj8vwy7\.cloudfront\.net\/\d+_thumbnail\.(?:jpg|jpeg|png)/gi
    ) || [];

  return Array.from(new Set(matches)).map(
    (u) => "https://" + u.replace(/_thumbnail\./, ".")
  );
}

async function scrapeListing(url: string): Promise<ScrapedListing | null> {
  const html = await fetchHtml(url);
  if (!html) return null;

  const idMatch = url.match(/_i(\d+)/);
  if (!idMatch) return null;

  const titel = parseTitle(html);
  if (!titel) return null;

  const preis = parsePrice(html);
  const beschreibung = parseDescription(html);
  const kanton = parseCanton(html);
  const ortschaft = parseCity(html);
  const imageUrls = parseImages(html);

  const hauptkategorie = mapCategoryFromUrl(url);
  const classified = classifyCategory(titel, beschreibung);
  const unterkategorie = classified.unterkategorie;

  const rechtsstatus = classifyRechtsstatus({
    titel,
    beschreibung,
    hauptkategorie,
    unterkategorie,
  });

  const coords =
    getCityCoordinates(ortschaft) ?? getPlzCoordinates("") ?? null;

  return {
    sourceId: `gw-${idMatch[1]}`,
    titel,
    preis,
    beschreibung,
    kanton,
    ortschaft,
    hauptkategorie,
    unterkategorie,
    rechtsstatus,
    imageUrls,
    sourceUrl: url,
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
  };
}

// ─── DB operations ──────────────────────────────────────────

async function getExistingSourceIds(): Promise<Set<string>> {
  const rows = await db.execute(
    "SELECT source_id FROM listings WHERE source = 'gebrauchtwaffen' AND source_id IS NOT NULL"
  );
  return new Set(rows.rows.map((r) => String(r.source_id)));
}

async function insertListing(item: ScrapedListing): Promise<boolean> {
  const id = uuidv4();
  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);

  try {
    await db.execute({
      sql: `INSERT INTO listings (id, user_id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus, marke, modell, kaliber, zustand, preis, verhandelbar, tausch, kanton, ortschaft, plz, lat, lng, aufrufe, source, source_url, source_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, '', '', '', '', ?, 0, 0, ?, ?, '', ?, ?, 0, 'gebrauchtwaffen', ?, ?, ?)`,
      args: [
        id,
        CRAWLER_USER_ID,
        item.titel,
        item.beschreibung,
        item.hauptkategorie,
        item.unterkategorie,
        item.rechtsstatus,
        item.preis,
        item.kanton,
        item.ortschaft,
        item.lat,
        item.lng,
        item.sourceUrl,
        item.sourceId,
        createdAt,
      ],
    });

    // Insert images
    for (let i = 0; i < item.imageUrls.length; i++) {
      await db.execute({
        sql: "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
        args: [uuidv4(), id, item.imageUrls[i], i, i === 0 ? 1 : 0],
      });
    }

    return true;
  } catch (e) {
    console.log(`  [x] DB error: ${e}`);
    return false;
  }
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log("GunMarket Crawler — gebrauchtwaffen.com");
  console.log("========================================\n");

  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env.local");
    process.exit(1);
  }

  const existingIds = await getExistingSourceIds();
  console.log(`Existing GW listings in DB: ${existingIds.size}\n`);

  let totalNew = 0;
  let totalSkipped = 0;

  for (const cat of CATEGORIES) {
    console.log(`\n--- ${cat.slug} ---`);

    const firstHtml = await fetchHtml(`${BASE}/${cat.slug}`);
    if (!firstHtml) {
      console.log("  [x] Failed to fetch first page");
      continue;
    }

    const lastPage = getLastPage(firstHtml, cat.slug);
    console.log(`  Pages: ${lastPage}`);

    // Collect all listing URLs from all pages
    const allUrls: { url: string; sourceId: string }[] = [];
    const seen = new Set<string>();

    for (let page = 1; page <= lastPage; page++) {
      const html =
        page === 1
          ? firstHtml
          : await fetchHtml(`${BASE}/${cat.slug}/${page}`);
      if (!html) {
        console.log(`  [!] Page ${page} failed`);
        continue;
      }

      const urls = extractListingUrls(html);
      if (urls.length === 0) {
        console.log(`  [!] No listings on page ${page}, stopping`);
        break;
      }

      for (const url of urls) {
        const id = url.match(/_i(\d+)/)?.[1];
        if (id && !seen.has(id)) {
          seen.add(id);
          allUrls.push({ url, sourceId: `gw-${id}` });
        }
      }

      process.stdout.write(
        `  Collecting URLs: page ${page}/${lastPage} (${allUrls.length} found)\r`
      );

      if (page < lastPage) await delay(1200 + Math.random() * 1300);
    }

    console.log(
      `  Collected: ${allUrls.length} listings across ${lastPage} pages`
    );

    // Filter to new-only
    const newUrls = allUrls.filter((u) => !existingIds.has(u.sourceId));
    const skipped = allUrls.length - newUrls.length;
    totalSkipped += skipped;
    console.log(
      `  New: ${newUrls.length} | Already in DB: ${skipped}`
    );

    // Scrape detail pages for new listings
    let catNew = 0;
    for (let i = 0; i < newUrls.length; i++) {
      await delay(1200 + Math.random() * 1300);
      const item = await scrapeListing(newUrls[i].url);
      if (item) {
        const inserted = await insertListing(item);
        if (inserted) {
          catNew++;
          totalNew++;
        }
      }
      process.stdout.write(
        `  Scraping: ${i + 1}/${newUrls.length} (${catNew} inserted)\r`
      );
    }

    console.log(
      `  Done: +${catNew} new listings from ${cat.slug}            `
    );
  }

  console.log("\n========================================");
  console.log(
    `Crawl complete! ${totalNew} new, ${totalSkipped} skipped (already in DB).`
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
