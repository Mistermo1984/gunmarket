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
import bcrypt from "bcryptjs";
import { classifyRechtsstatus } from "../src/lib/rechtsstatus-classifier";
import { classifyCategory } from "../src/lib/category-classifier";
import { getCityCoordinates } from "../src/lib/plz-coordinates";

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

function mapCategoryFromUrl(url: string): { hauptkategorie: string; unterkategorie: string } {
  // Extract path parts from URL
  // URL format: https://www.gebrauchtwaffen.com/[cat]/[subcat]/title_i12345
  const path = new URL(url).pathname;
  const parts = path.split('/').filter(p => p && !p.match(/_i\d+$/) && !p.match(/^[a-z]+-[rc]\d+/));
  // parts[0] = main category slug, parts[1] = subcategory slug (if exists)

  const mainSlug = parts[0] || '';
  const subSlug = parts[1] || '';

  // Subcategories that are ACCESSORIES (override main category to zubehoer)
  const accessorySubcats = [
    'magazine', 'magazine_1', 'holster', 'griffschalen', 'schafte',
    'laufe', 'montagen-schienen-ringe', 'chokes', 'kombinierte-waffen',
    'andere', 'andere_1', 'andere_2', 'andere_3', 'andere_4',
    'lauefe-teile', 'teile', 'ersatzteile',
  ];

  // Map subcategory slug to clean label
  const subcatMap: Record<string, string> = {
    'pistolen': 'pistolen',
    'revolver': 'revolver',
    'magazine': 'magazine',
    'magazine_1': 'magazine',
    'holster': 'holster',
    'griffschalen': 'griffschalen',
    'schafte': 'schafte',
    'laufe': 'laeufe',
    'montagen-schienen-ringe': 'montagen',
    'chokes': 'chokes',
    'flinten': 'flinten',
    'buchsen': 'buechsen',
    'kombinierte-waffen': 'kombinierte-waffen',
    'langwaffen_1': 'langwaffen',
    'kurzwaffen_1': 'kurzwaffen',
    'andere': 'andere',
    'andere_1': 'andere',
    'luftdruck-gewehre': 'luftdruck-gewehre',
    'luftdruck-pistolen': 'luftdruck-pistolen',
    'co2-gewehre-pistolen': 'co2',
    'softair-gewehre': 'softair',
  };

  // Determine if subcategory is an accessory
  const isAccessory = accessorySubcats.includes(subSlug);

  // Map main category
  let hauptkategorie = 'verschiedenes';
  if (mainSlug === 'kurzwaffen') {
    hauptkategorie = isAccessory ? 'zubehoer' : 'kurzwaffen';
  } else if (mainSlug === 'langwaffen') {
    hauptkategorie = isAccessory ? 'zubehoer' : 'langwaffen';
  } else if (mainSlug === 'sammler-ordonanzwaffen') {
    hauptkategorie = 'ordonnanzwaffen';
  } else if (mainSlug === 'luftdruckwaffen-softair') {
    hauptkategorie = 'luftdruck';
  } else if (mainSlug === 'optik') {
    hauptkategorie = 'optik';
  } else if (mainSlug === 'messer-blankwaffen') {
    hauptkategorie = 'messer';
  } else if (mainSlug === 'wiederladen') {
    hauptkategorie = 'wiederladen';
  } else if (mainSlug === 'wild-und-jagd') {
    hauptkategorie = 'jagd';
  } else if (mainSlug === 'munition') {
    hauptkategorie = 'munition';
  }

  const unterkategorie = subcatMap[subSlug] || subSlug || '';

  return { hauptkategorie, unterkategorie };
}

// ─── Canton coordinates for map ─────────────────────────────

const CANTON_COORDS: Record<string, { lat: number; lng: number }> = {
  'Zürich': { lat: 47.3769, lng: 8.5417 },
  'Bern': { lat: 46.9480, lng: 7.4474 },
  'Luzern': { lat: 47.0502, lng: 8.3093 },
  'Uri': { lat: 46.8800, lng: 8.6349 },
  'Schwyz': { lat: 47.0207, lng: 8.6530 },
  'Obwalden': { lat: 46.8783, lng: 8.2514 },
  'Nidwalden': { lat: 46.9266, lng: 8.3852 },
  'Glarus': { lat: 47.0399, lng: 9.0677 },
  'Zug': { lat: 47.1661, lng: 8.5157 },
  'Freiburg': { lat: 46.8065, lng: 7.1620 },
  'Solothurn': { lat: 47.2088, lng: 7.5323 },
  'Basel-Stadt': { lat: 47.5596, lng: 7.5886 },
  'Basel-Landschaft': { lat: 47.4416, lng: 7.7573 },
  'Schaffhausen': { lat: 47.6960, lng: 8.6344 },
  'Appenzell Ausserrhoden': { lat: 47.3664, lng: 9.3054 },
  'Appenzell Innerrhoden': { lat: 47.3159, lng: 9.4166 },
  'St. Gallen': { lat: 47.4245, lng: 9.3767 },
  'Graubünden': { lat: 46.6570, lng: 9.6280 },
  'Aargau': { lat: 47.3887, lng: 8.0430 },
  'Thurgau': { lat: 47.5560, lng: 9.1750 },
  'Tessin': { lat: 46.3317, lng: 8.8009 },
  'Waadt': { lat: 46.5763, lng: 6.5601 },
  'Wallis': { lat: 46.2291, lng: 7.5586 },
  'Neuenburg': { lat: 46.9899, lng: 6.9293 },
  'Genf': { lat: 46.2044, lng: 6.1432 },
  'Jura': { lat: 47.3557, lng: 7.1432 },
  'Vaud': { lat: 46.5763, lng: 6.5601 },
  'Valais': { lat: 46.2291, lng: 7.5586 },
  'Neuchâtel': { lat: 46.9899, lng: 6.9293 },
  'Genève': { lat: 46.2044, lng: 6.1432 },
  'Fribourg': { lat: 46.8065, lng: 7.1620 },
  'Ticino': { lat: 46.3317, lng: 8.8009 },
  'Appenzell': { lat: 47.3664, lng: 9.3054 },
};

function getCantonCoords(canton: string): { lat: number; lng: number } | null {
  if (!canton) return null;
  if (CANTON_COORDS[canton]) return CANTON_COORDS[canton];
  const key = Object.keys(CANTON_COORDS).find(k =>
    canton.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(canton.toLowerCase())
  );
  return key ? CANTON_COORDS[key] : null;
}

function addJitter(coord: number, amount: number = 0.05): number {
  return coord + (Math.random() - 0.5) * amount;
}

// ─── Detail page scraping ───────────────────────────────────

interface ScrapedListing {
  sourceId: string;
  titel: string;
  preis: number;
  beschreibung: string;
  kanton: string;
  ortschaft: string;
  plz?: string;
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
  // Extract images from #right (main photo) and #photos-block (gallery thumbnails)
  // These are the ONLY containers with the listing's own images
  // Do NOT use #left-block or #rel_ads — those contain related listings

  // Extract #right block content
  const rightMatch = html.match(/id="right"[^>]*>([\s\S]*?)<div id="photos-block"/i);
  const rightHtml = rightMatch?.[1] || '';

  // Extract #photos-block content
  const photosMatch = html.match(/id="photos-block"[^>]*>([\s\S]*?)<\/div>/i);
  const photosHtml = photosMatch?.[1] || '';

  // Combine both sections
  const combinedHtml = rightHtml + photosHtml;

  // Extract all d9c3dmdj8vwy7.cloudfront.net image URLs (with OR without _thumbnail)
  const matches = combinedHtml.match(
    /https?:\/\/d9c3dmdj8vwy7\.cloudfront\.net\/\d+(?:_thumbnail)?\.(jpg|jpeg|png)/gi
  ) || [];

  // If combined approach finds nothing, fallback: extract from full HTML
  // but STOP before id="left-block" or id="rel_ads"
  if (matches.length === 0) {
    const stopMarkers = ['id="left-block"', 'id="rel_ads"', 'class="related_ads'];
    let cutIndex = html.length;
    for (const marker of stopMarkers) {
      const idx = html.indexOf(marker);
      if (idx > 0 && idx < cutIndex) cutIndex = idx;
    }
    const safeHtml = html.substring(0, cutIndex);
    const fallbackMatches = safeHtml.match(
      /https?:\/\/d9c3dmdj8vwy7\.cloudfront\.net\/\d+(?:_thumbnail)?\.(jpg|jpeg|png)/gi
    ) || [];
    return [...new Set(fallbackMatches.map(url =>
      url.replace(/_thumbnail\.(jpg|jpeg|png)$/i, m => m.replace('_thumbnail', ''))
    ))];
  }

  // Convert thumbnails to full size, then deduplicate
  return [...new Set(matches.map(url =>
    url.replace(/_thumbnail\.(jpg|jpeg|png)$/i, m => m.replace('_thumbnail', ''))
  ))];
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

  const { hauptkategorie, unterkategorie } = mapCategoryFromUrl(url);

  const rechtsstatus = classifyRechtsstatus({
    titel,
    beschreibung,
    hauptkategorie,
    unterkategorie,
  });

  // Try city coordinates first, then fall back to canton center with jitter
  const cityCoords = getCityCoordinates(ortschaft);
  const cantonCoords = getCantonCoords(kanton);
  const lat = cityCoords?.lat ?? (cantonCoords ? addJitter(cantonCoords.lat, 0.3) : null);
  const lng = cityCoords?.lng ?? (cantonCoords ? addJitter(cantonCoords.lng, 0.3) : null);

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
    lat,
    lng,
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

// ─── kantonFromPlz (for NextGun) ────────────────────────────

function kantonFromPlz(plz: string): string {
  const p = parseInt(plz, 10);
  if (isNaN(p)) return "";
  if (p >= 1000 && p <= 1299) return "Waadt";
  if (p >= 1300 && p <= 1399) return "Waadt";
  if (p >= 1400 && p <= 1499) return "Freiburg";
  if (p >= 1500 && p <= 1599) return "Freiburg";
  if (p >= 1600 && p <= 1699) return "Freiburg";
  if (p >= 1700 && p <= 1799) return "Freiburg";
  if (p >= 1800 && p <= 1899) return "Waadt";
  if (p >= 1900 && p <= 1999) return "Wallis";
  if (p >= 2000 && p <= 2099) return "Neuenburg";
  if (p >= 2100 && p <= 2199) return "Neuenburg";
  if (p >= 2200 && p <= 2299) return "Neuenburg";
  if (p >= 2300 && p <= 2399) return "Bern";
  if (p >= 2400 && p <= 2499) return "Bern";
  if (p >= 2500 && p <= 2599) return "Bern";
  if (p >= 2600 && p <= 2699) return "Bern";
  if (p >= 2700 && p <= 2799) return "Bern";
  if (p >= 2800 && p <= 2899) return "Jura";
  if (p >= 2900 && p <= 2999) return "Jura";
  if (p >= 3000 && p <= 3999) return "Bern";
  if (p >= 4000 && p <= 4099) return "Basel-Stadt";
  if (p >= 4100 && p <= 4199) return "Basel-Landschaft";
  if (p >= 4200 && p <= 4299) return "Basel-Landschaft";
  if (p >= 4300 && p <= 4499) return "Solothurn";
  if (p >= 4500 && p <= 4599) return "Solothurn";
  if (p >= 4600 && p <= 4699) return "Aargau";
  if (p >= 4700 && p <= 4799) return "Solothurn";
  if (p >= 4800 && p <= 4899) return "Aargau";
  if (p >= 4900 && p <= 4999) return "Aargau";
  if (p >= 5000 && p <= 5999) return "Aargau";
  if (p >= 6000 && p <= 6099) return "Luzern";
  if (p >= 6100 && p <= 6199) return "Luzern";
  if (p >= 6200 && p <= 6299) return "Luzern";
  if (p >= 6300 && p <= 6399) return "Zug";
  if (p >= 6400 && p <= 6499) return "Schwyz";
  if (p >= 6500 && p <= 6999) return "Tessin";
  if (p >= 7000 && p <= 7799) return "Graubünden";
  if (p >= 8000 && p <= 8499) return "Zürich";
  if (p >= 8500 && p <= 8599) return "Thurgau";
  if (p >= 8600 && p <= 8799) return "Zürich";
  if (p >= 8800 && p <= 8899) return "Schwyz";
  if (p >= 8900 && p <= 8999) return "Aargau";
  if (p >= 9000 && p <= 9099) return "St. Gallen";
  if (p >= 9100 && p <= 9199) return "Appenzell A.";
  if (p >= 9200 && p <= 9499) return "St. Gallen";
  if (p >= 9500 && p <= 9599) return "Thurgau";
  if (p >= 9600 && p <= 9899) return "St. Gallen";
  return "";
}

// ─── NextGun crawler ────────────────────────────────────────

const NEXTGUN_CRAWLER_USER_ID = "crawler-nextgun";

async function getExistingNextgunIds(): Promise<Set<string>> {
  const rows = await db.execute(
    "SELECT source_id FROM listings WHERE source = 'nextgun' AND source_id IS NOT NULL"
  );
  return new Set(rows.rows.map((r) => String(r.source_id)));
}

async function insertNextgunListing(item: ScrapedListing): Promise<boolean> {
  const id = uuidv4();
  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);

  try {
    await db.execute({
      sql: `INSERT INTO listings (id, user_id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus, marke, modell, kaliber, zustand, preis, verhandelbar, tausch, kanton, ortschaft, plz, lat, lng, aufrufe, source, source_url, source_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, '', '', '', '', ?, 0, 0, ?, ?, ?, ?, ?, 0, 'nextgun', ?, ?, ?)`,
      args: [
        id,
        NEXTGUN_CRAWLER_USER_ID,
        item.titel,
        item.beschreibung,
        item.hauptkategorie,
        item.unterkategorie,
        item.rechtsstatus,
        item.preis,
        item.kanton,
        item.ortschaft,
        item.plz || "",
        item.lat,
        item.lng,
        item.sourceUrl,
        item.sourceId,
        createdAt,
      ],
    });

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

async function crawlNextgun(): Promise<number> {
  console.log("  Fetching marketplace.nextgun.ch...");
  const html = await fetchHtml("https://marketplace.nextgun.ch/marketplace");
  if (!html) {
    console.log("  [x] No response from NextGun");
    return 0;
  }

  // Extract embedded SvelteKit JSON data
  const startIdx = html.indexOf("annonces:[");
  if (startIdx === -1) {
    console.log("  [x] Could not find annonces data in HTML");
    return 0;
  }

  let bracketCount = 0;
  const arrayStart = startIdx + "annonces:".length;
  let arrayEnd = arrayStart;
  for (let i = arrayStart; i < html.length; i++) {
    if (html[i] === "[") bracketCount++;
    if (html[i] === "]") bracketCount--;
    if (bracketCount === 0) {
      arrayEnd = i + 1;
      break;
    }
  }

  const arrayStr = html.substring(arrayStart, arrayEnd);
  const step1 = arrayStr.replace(/new Date\((\d+)\)/g, "$1");
  const step2 = step1.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');

  let listings: Array<{
    id: string;
    weaponName: string;
    location: string | null;
    latitude: number | null;
    longitude: number | null;
    price: number;
    hasImage: number;
    createdAt: number;
    username: string;
  }>;

  try {
    listings = JSON.parse(step2);
  } catch {
    console.log("  [x] Failed to parse NextGun JSON");
    return 0;
  }

  console.log(`  Found ${listings.length} listings`);

  const existingIds = await getExistingNextgunIds();
  console.log(`  Already in DB: ${existingIds.size}`);

  let inserted = 0;

  for (let i = 0; i < listings.length; i++) {
    const l = listings[i];
    const sourceId = `ng-${l.id}`;

    if (existingIds.has(sourceId)) continue;

    let ortschaft = "";
    let plz = "";
    let kanton = "";
    if (l.location) {
      const locParts = l.location.split(",").map((s) => s.trim());
      const plzMatch = l.location.match(/(\d{4})/);
      if (plzMatch) {
        plz = plzMatch[1];
        kanton = kantonFromPlz(plz);
      }
      ortschaft =
        locParts.find(
          (p) =>
            p.length > 2 &&
            !/^\d+$/.test(p) &&
            !p.includes("District") &&
            !p.includes("Suisse")
        ) ||
        locParts[0] ||
        "";
    }

    const imageUrls = l.hasImage
      ? [`https://marketplace.nextgun.ch/api/image/annonce/${l.id}`]
      : [];
    const slug = l.weaponName
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    const classified = classifyCategory(l.weaponName, "");
    const rechtsstatus = classifyRechtsstatus({
      titel: l.weaponName,
      beschreibung: "",
      hauptkategorie: classified.hauptkategorie,
      unterkategorie: classified.unterkategorie,
    });

    const item: ScrapedListing = {
      sourceId,
      titel: l.weaponName,
      preis: l.price || 0,
      beschreibung: "",
      kanton,
      ortschaft,
      plz,
      hauptkategorie: classified.hauptkategorie,
      unterkategorie: classified.unterkategorie,
      rechtsstatus,
      imageUrls,
      sourceUrl: `https://marketplace.nextgun.ch/annonce/view/${slug}-id-${l.id}`,
      lat: l.latitude || null,
      lng: l.longitude || null,
    };

    // Enrich with gallery images from detail page
    if (item.imageUrls.length > 0) {
      try {
        const detailHtml = await fetchHtml(item.sourceUrl);
        if (detailHtml) {
          const matches = detailHtml.match(
            /api\/image\/annonce-image\/[a-z0-9]+/g
          );
          if (matches) {
            const additionalUrls = Array.from(new Set(matches)).map(
              (path) => `https://marketplace.nextgun.ch/${path}`
            );
            item.imageUrls = [...item.imageUrls, ...additionalUrls];
          }
        }
        await delay(300);
      } catch {
        // Keep main image as fallback
      }
    }

    const ok = await insertNextgunListing(item);
    if (ok) inserted++;

    process.stdout.write(
      `  Processing: ${i + 1}/${listings.length} (${inserted} new)\r`
    );
  }

  console.log(
    `  Done: +${inserted} new NextGun listings                    `
  );
  return inserted;
}

// ─── Ensure crawler users exist in users table ──────────────
// The API uses JOIN users, so listings without a matching user are invisible.

async function ensureCrawlerUser(
  userId: string,
  email: string,
  vorname: string,
  nachname: string
) {
  const existing = await db.execute({
    sql: "SELECT id FROM users WHERE id = ?",
    args: [userId],
  });
  if (existing.rows.length === 0) {
    const hash = bcrypt.hashSync("CrawlerNoLogin!", 10);
    await db.execute({
      sql: "INSERT INTO users (id, email, password_hash, vorname, nachname, anbieter_typ, email_verified, is_admin) VALUES (?, ?, ?, ?, ?, ?, 1, 0)",
      args: [userId, email, hash, vorname, nachname, "Händler"],
    });
    console.log(`  Created crawler user: ${userId}`);
  }
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log("GunMarket Local Crawler");
  console.log("=======================\n");

  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env.local");
    process.exit(1);
  }

  // Ensure crawler users exist so listings are visible via API (JOIN users)
  await ensureCrawlerUser("crawler-gebrauchtwaffen", "crawler@gebrauchtwaffen.com", "Gebrauchtwaffen", ".com");
  await ensureCrawlerUser("crawler-nextgun", "crawler@nextgun.ch", "NextGun", ".ch");

  // 1. Crawl gebrauchtwaffen.com
  console.log("Source 1: gebrauchtwaffen.com");
  console.log("----------------------------");

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
    `gebrauchtwaffen.com: ${totalNew} new, ${totalSkipped} skipped`
  );

  // 2. Crawl nextgun.ch
  console.log("\nSource 2: nextgun.ch");
  console.log("--------------------");
  const ngNew = await crawlNextgun();

  console.log("\n========================================");
  console.log(
    `All done! GW: ${totalNew} new | NextGun: ${ngNew} new`
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
