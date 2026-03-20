import { initializeSchema, dbGet, dbAll, dbRun, dbBatch, dbExec } from "./db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import * as cheerio from "cheerio";
import { getPlzCoordinates, getCityCoordinates } from "./plz-coordinates";
import { classifyRechtsstatus } from "./rechtsstatus-classifier";
import { classifyCategory } from "./category-classifier";

const GW_BASE_URL = "https://www.gebrauchtwaffen.com";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent": USER_AGENT,
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "de-CH,de;q=0.9,fr;q=0.8,en;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Cache-Control": "max-age=0",
  "Referer": "https://www.google.ch/",
};

const GW_CRAWLER_USER = {
  id: "crawler-gebrauchtwaffen",
  email: "crawler@gebrauchtwaffen.com",
  vorname: "Gebrauchtwaffen",
  nachname: ".com",
  anbieter_typ: "Händler",
};

const CATEGORIES = [
  { slug: "kurzwaffen", hauptkategorie: "kurzwaffen" },
  { slug: "langwaffen", hauptkategorie: "langwaffen" },
  { slug: "sammler-amp-ordonnanzwaffen", hauptkategorie: "ordonnanzwaffen" },
  { slug: "luftdruckwaffen-softair", hauptkategorie: "luftdruckwaffen" },
  { slug: "optik", hauptkategorie: "optik" },
  { slug: "munition", hauptkategorie: "munition" },
  { slug: "messer-amp-blankwaffen", hauptkategorie: "zubehoer" },
  { slug: "wiederladen", hauptkategorie: "zubehoer" },
  { slug: "bogenschiessen", hauptkategorie: "zubehoer" },
  { slug: "verschiedenes", hauptkategorie: "zubehoer" },
];

interface CrawledItem {
  sourceId: string;
  titel: string;
  preis: number;
  verhandelbar: number;
  ortschaft: string;
  plz: string;
  kanton: string;
  hauptkategorie: string;
  unterkategorie: string;
  beschreibung: string;
  imageUrls: string[];
  sourceUrl: string;
  lat?: number | null;
  lng?: number | null;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchPage(url: string, retries = 1): Promise<string> {
  const res = await fetch(url, {
    headers: BROWSER_HEADERS,
    redirect: "follow",
  });
  if ((res.status === 403 || res.status === 429) && retries > 0) {
    console.warn(`[Crawl] ${res.status} for ${url}, retrying in 5s...`);
    await delay(5000);
    return fetchPage(url, retries - 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ─── gebrauchtwaffen.com ─────────────────────────────────────

/** Parse listing cards from a gebrauchtwaffen.com category page */
function parseGwListingCards(html: string): CrawledItem[] {
  const $ = cheerio.load(html);
  const items: CrawledItem[] = [];

  $("tr.effect6").each((_, el) => {
    const $el = $(el);

    // Extract URL and listing ID
    const linkEl = $el.find("td.text h3 a");
    const href = linkEl.attr("href") || "";
    const idMatch = href.match(/_i(\d+)$/);
    if (!idMatch) return;

    const sourceId = `gw-${idMatch[1]}`;
    const titel = linkEl.text().trim();

    // Price
    const priceText = $el.find(".zoznam_cena").text().trim();
    const priceMatch = priceText.match(/CHF\s*([\d.']+)/);
    const priceRaw = priceMatch?.[1]?.replace(/\./g, "").replace(",", ".").replace("'", "") || "0";
    const preis = parseFloat(priceRaw) || 0;

    // Description
    const beschreibung = $el.find(".zoznam_desc").text().trim().substring(0, 500);

    // Location
    const kanton = $el.find(".zoznam_region").text().replace("·", "").trim();
    const ortschaft = $el.find(".zoznam_city").text().replace("·", "").trim();

    // Thumbnail image → full size URL
    const thumbSrc = $el.find("td.photo img").attr("src") || "";
    const imageUrls: string[] = [];
    if (thumbSrc.includes("cloudfront.net")) {
      imageUrls.push(thumbSrc.replace("_thumbnail", ""));
    }

    if (titel && sourceId) {
      const classified = classifyCategory(titel, beschreibung);
      items.push({
        sourceId,
        titel,
        preis,
        verhandelbar: 0,
        ortschaft,
        plz: "",
        kanton,
        hauptkategorie: classified.hauptkategorie,
        unterkategorie: classified.unterkategorie,
        beschreibung,
        imageUrls,
        sourceUrl: href,
      });
    }
  });

  return items;
}

/** Get total page count from gebrauchtwaffen.com pagination select */
function getGwTotalPages(html: string): number {
  const $ = cheerio.load(html);
  let maxPage = 1;
  $(".pagination-select option").each((_, el) => {
    const val = $(el).attr("value") || "";
    // Pages are /category/2, /category/3, etc.
    const match = val.match(/\/(\d+)$/);
    if (match) {
      const p = parseInt(match[1], 10);
      if (p > maxPage) maxPage = p;
    }
  });
  return maxPage;
}

/** Scrape ALL image URLs from a gebrauchtwaffen.com detail page */
async function scrapeGwDetailImages(sourceUrl: string): Promise<string[]> {
  try {
    const html = await fetchPage(sourceUrl);
    const $ = cheerio.load(html);
    const images: string[] = [];

    // Main image
    const bigImg = $("#big-img").attr("src") || "";
    if (bigImg.includes("d9c3dmdj8vwy7.cloudfront.net")) {
      images.push(bigImg);
    }

    // Gallery images (from img-link anchors)
    $("a.img-link").each((_, el) => {
      const href = $(el).attr("href") || "";
      if (href.includes("d9c3dmdj8vwy7.cloudfront.net")) {
        images.push(href);
      }
    });

    return Array.from(new Set(images));
  } catch (e) {
    console.error("[Crawl] GW detail scrape failed:", sourceUrl, e);
    return [];
  }
}

/** Crawl a single category from gebrauchtwaffen.com */
async function crawlGwCategory(slug: string): Promise<CrawledItem[]> {
  const items: CrawledItem[] = [];
  const seenIds = new Set<string>();

  console.log(`[Crawl] Crawling gebrauchtwaffen.com: ${slug}`);
  const firstPageUrl = `${GW_BASE_URL}/${slug}`;
  const firstPageHtml = await fetchPage(firstPageUrl);
  const totalPages = getGwTotalPages(firstPageHtml);
  console.log(`[Crawl] ${slug}: ${totalPages} pages`);

  const firstItems = parseGwListingCards(firstPageHtml);
  for (const item of firstItems) {
    if (!seenIds.has(item.sourceId)) {
      seenIds.add(item.sourceId);
      items.push(item);
    }
  }

  for (let page = 2; page <= totalPages; page++) {
    await delay(1500 + Math.random() * 1500);
    try {
      const pageUrl = `${GW_BASE_URL}/${slug}/${page}`;
      const pageHtml = await fetchPage(pageUrl);
      const pageItems = parseGwListingCards(pageHtml);
      for (const item of pageItems) {
        if (!seenIds.has(item.sourceId)) {
          seenIds.add(item.sourceId);
          items.push(item);
        }
      }
    } catch (err) {
      console.error(`[Crawl] Error page ${page} of ${slug}:`, err);
    }
  }

  return items;
}

// ─── nextgun.ch ──────────────────────────────────────────────

async function crawlNextgun(): Promise<CrawledItem[]> {
  const allItems: CrawledItem[] = [];

  try {
    console.log("[Crawl] Crawling marketplace.nextgun.ch");
    const html = await fetchPage("https://marketplace.nextgun.ch/marketplace");

    const startIdx = html.indexOf("annonces:[");
    if (startIdx === -1) {
      console.error("[Crawl] NextGun: Could not find annonces data");
      return [];
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
      console.error("[Crawl] NextGun: Failed to parse JSON");
      return [];
    }

    console.log(`[Crawl] NextGun: Found ${listings.length} listings`);

    for (const l of listings) {
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
        ortschaft = locParts.find((p) => p.length > 2 && !/^\d+$/.test(p) && !p.includes("District") && !p.includes("Suisse")) || locParts[0] || "";
      }

      // Store image URLs directly — no download
      const imageUrls = l.hasImage ? [`https://marketplace.nextgun.ch/api/image/annonce/${l.id}`] : [];
      const slug = l.weaponName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");

      const ngClassified = classifyCategory(l.weaponName, "");
      allItems.push({
        sourceId: `ng-${l.id}`,
        titel: l.weaponName,
        preis: l.price || 0,
        verhandelbar: 0,
        ortschaft,
        plz,
        kanton,
        hauptkategorie: ngClassified.hauptkategorie,
        unterkategorie: ngClassified.unterkategorie,
        beschreibung: "",
        imageUrls,
        sourceUrl: `https://marketplace.nextgun.ch/annonce/view/${slug}-id-${l.id}`,
        lat: l.latitude || null,
        lng: l.longitude || null,
      });
    }
  } catch (err) {
    console.error("[Crawl] NextGun error:", err);
  }

  console.log(`[Crawl] NextGun total: ${allItems.length} listings`);
  return allItems;
}

// ─── Shared helpers ──────────────────────────────────────────

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
  if (p >= 5000 && p <= 5099) return "Aargau";
  if (p >= 5100 && p <= 5199) return "Aargau";
  if (p >= 5200 && p <= 5299) return "Aargau";
  if (p >= 5300 && p <= 5399) return "Aargau";
  if (p >= 5400 && p <= 5499) return "Aargau";
  if (p >= 5500 && p <= 5599) return "Aargau";
  if (p >= 5600 && p <= 5699) return "Aargau";
  if (p >= 5700 && p <= 5799) return "Aargau";
  if (p >= 5800 && p <= 5899) return "Aargau";
  if (p >= 5900 && p <= 5999) return "Aargau";
  if (p >= 6000 && p <= 6099) return "Luzern";
  if (p >= 6100 && p <= 6199) return "Luzern";
  if (p >= 6200 && p <= 6299) return "Luzern";
  if (p >= 6300 && p <= 6399) return "Zug";
  if (p >= 6400 && p <= 6499) return "Schwyz";
  if (p >= 6500 && p <= 6599) return "Tessin";
  if (p >= 6600 && p <= 6699) return "Tessin";
  if (p >= 6700 && p <= 6799) return "Tessin";
  if (p >= 6800 && p <= 6899) return "Tessin";
  if (p >= 6900 && p <= 6999) return "Tessin";
  if (p >= 7000 && p <= 7099) return "Graubünden";
  if (p >= 7100 && p <= 7199) return "Graubünden";
  if (p >= 7200 && p <= 7299) return "Graubünden";
  if (p >= 7300 && p <= 7399) return "Graubünden";
  if (p >= 7400 && p <= 7499) return "Graubünden";
  if (p >= 7500 && p <= 7599) return "Graubünden";
  if (p >= 7600 && p <= 7699) return "Graubünden";
  if (p >= 7700 && p <= 7799) return "Graubünden";
  if (p >= 8000 && p <= 8099) return "Zürich";
  if (p >= 8100 && p <= 8199) return "Zürich";
  if (p >= 8200 && p <= 8299) return "Zürich";
  if (p >= 8300 && p <= 8399) return "Zürich";
  if (p >= 8400 && p <= 8499) return "Zürich";
  if (p >= 8500 && p <= 8599) return "Thurgau";
  if (p >= 8600 && p <= 8699) return "Zürich";
  if (p >= 8700 && p <= 8799) return "Zürich";
  if (p >= 8800 && p <= 8899) return "Schwyz";
  if (p >= 8900 && p <= 8999) return "Aargau";
  if (p >= 9000 && p <= 9099) return "St. Gallen";
  if (p >= 9100 && p <= 9199) return "Appenzell A.";
  if (p >= 9200 && p <= 9299) return "St. Gallen";
  if (p >= 9300 && p <= 9399) return "St. Gallen";
  if (p >= 9400 && p <= 9499) return "St. Gallen";
  if (p >= 9500 && p <= 9599) return "Thurgau";
  if (p >= 9600 && p <= 9699) return "St. Gallen";
  if (p >= 9700 && p <= 9799) return "St. Gallen";
  if (p >= 9800 && p <= 9899) return "St. Gallen";
  return "";
}

async function ensureCrawlerUser(userId: string, email: string, vorname: string, nachname: string) {
  const existing = await dbGet("SELECT id FROM users WHERE id = ?", [userId]);
  if (!existing) {
    const hash = bcrypt.hashSync("CrawlerNoLogin!", 10);
    await dbRun(
      "INSERT INTO users (id, email, password_hash, vorname, nachname, anbieter_typ, email_verified, is_admin) VALUES (?, ?, ?, ?, ?, ?, 1, 0)",
      [userId, email, hash, vorname, nachname, "Händler"]
    );
  }
}

// ─── Insert items — store image URLs directly (no download) ──

async function insertItems(items: CrawledItem[], source: string) {
  const userId = source === "nextgun" ? "crawler-nextgun" : GW_CRAWLER_USER.id;
  const statements: { sql: string; args: (string | number | null)[] }[] = [];

  for (const item of items) {
    const id = uuidv4();
    const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);

    const coords = (item.lat && item.lng)
      ? { lat: item.lat, lng: item.lng }
      : (item.plz ? getPlzCoordinates(item.plz) : null)
        ?? getCityCoordinates(item.ortschaft);

    const rechtsstatus = classifyRechtsstatus({
      titel: item.titel,
      beschreibung: item.beschreibung,
      hauptkategorie: item.hauptkategorie,
      unterkategorie: item.unterkategorie,
    });

    statements.push({
      sql: `INSERT INTO listings (id, user_id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus, marke, modell, kaliber, zustand, preis, verhandelbar, tausch, kanton, ortschaft, plz, lat, lng, aufrufe, source, source_url, source_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, userId, item.titel, item.beschreibung,
        item.hauptkategorie, item.unterkategorie, rechtsstatus,
        "", "", "", "",
        item.preis, item.verhandelbar,
        item.kanton, item.ortschaft, item.plz,
        coords?.lat ?? null, coords?.lng ?? null, 0,
        source, item.sourceUrl, item.sourceId, createdAt,
      ],
    });

    // For gebrauchtwaffen listings, scrape detail page for all images
    let allImageUrls = item.imageUrls;
    if (source === "gebrauchtwaffen" && item.sourceUrl) {
      try {
        const detailImages = await scrapeGwDetailImages(item.sourceUrl);
        if (detailImages.length > 0) allImageUrls = detailImages;
        await delay(1000 + Math.random() * 1000);
      } catch {
        // Keep category page thumbnail as fallback
      }
    } else if (source === "nextgun" && item.imageUrls.length > 0) {
      // For nextgun, try to get additional images from detail page
      try {
        const html = await fetchPage(item.sourceUrl);
        const matches = html.match(/api\/image\/annonce-image\/[a-z0-9]+/g);
        if (matches) {
          const additionalUrls = Array.from(new Set(matches)).map((path) => `https://marketplace.nextgun.ch/${path}`);
          allImageUrls = [...item.imageUrls, ...additionalUrls];
        }
        await delay(300);
      } catch {
        // Keep main image as fallback
      }
    }

    // Store image URLs directly in listing_images (no download)
    for (let i = 0; i < allImageUrls.length; i++) {
      statements.push({
        sql: "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
        args: [uuidv4(), id, allImageUrls[i], i, i === 0 ? 1 : 0],
      });
    }
  }

  await dbBatch(statements);
}

// ─── Public API ──────────────────────────────────────────────

export function seedCrawledListings() {
  console.log("[Seed] Use admin panel to crawl.");
}

export function getCrawlSteps(): { id: string; label: string }[] {
  return [
    ...CATEGORIES.map((c) => ({ id: `gw-${c.slug}`, label: `gebrauchtwaffen.com: ${c.slug}` })),
    { id: "nextgun", label: "nextgun.ch" },
    { id: "cleanup", label: "Aufräumen (verkaufte entfernen)" },
  ];
}

export async function runCrawlStep(stepId: string): Promise<{ inserted: number; deleted: number; source: string }> {
  await initializeSchema();
  await ensureCrawlerUser(GW_CRAWLER_USER.id, GW_CRAWLER_USER.email, GW_CRAWLER_USER.vorname, GW_CRAWLER_USER.nachname);
  await ensureCrawlerUser("crawler-nextgun", "crawler@nextgun.ch", "NextGun", ".ch");

  // Get existing source_ids to skip duplicates
  const existingRows = await dbAll<{ source_id: string; source: string }>(
    "SELECT source_id, source FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun') AND source_id IS NOT NULL"
  );
  const existingSourceIds = new Set(existingRows.map((r) => r.source_id));

  if (stepId === "nextgun") {
    const items = await crawlNextgun();
    const newItems = items.filter((item) => !existingSourceIds.has(item.sourceId));
    await insertItems(newItems, "nextgun");

    await ensureCrawlMetaTable();
    const existingLiveRow = await dbGet<{ value: string }>("SELECT value FROM crawl_meta WHERE key = 'live_source_ids'");
    const existingLive: string[] = existingLiveRow?.value ? JSON.parse(existingLiveRow.value) : [];
    const updatedLive = [...existingLive, ...items.map((i) => i.sourceId)];
    await dbRun("INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('live_source_ids', ?)", [JSON.stringify(updatedLive)]);

    console.log(`[Crawl] NextGun: ${items.length} total, ${newItems.length} new`);
    return { inserted: newItems.length, deleted: 0, source: "nextgun" };
  }

  if (stepId === "cleanup") {
    await ensureCrawlMetaTable();
    const liveIdsRow = await dbGet<{ value: string }>("SELECT value FROM crawl_meta WHERE key = 'live_source_ids'");
    if (!liveIdsRow?.value) {
      await saveCrawlTimestamp();
      return { inserted: 0, deleted: 0, source: "cleanup" };
    }
    const liveSourceIds = new Set(JSON.parse(liveIdsRow.value) as string[]);
    const toRemove = existingRows.filter((r) => !liveSourceIds.has(r.source_id));
    let deleted = 0;
    if (toRemove.length > 0) {
      const deleteStatements: { sql: string; args: (string | number | null)[] }[] = [];
      for (const row of toRemove) {
        deleteStatements.push({
          sql: "DELETE FROM listing_images WHERE listing_id IN (SELECT id FROM listings WHERE source_id = ?)",
          args: [row.source_id],
        });
        deleteStatements.push({
          sql: "DELETE FROM listings WHERE source_id = ?",
          args: [row.source_id],
        });
      }
      await dbBatch(deleteStatements);
      deleted = toRemove.length;
    }
    await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'");
    await saveCrawlTimestamp();
    console.log(`[Crawl] Cleanup: ${deleted} removed`);
    return { inserted: 0, deleted, source: "cleanup" };
  }

  // gw-{slug} — crawl single gebrauchtwaffen.com category
  const slug = stepId.replace("gw-", "");
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) throw new Error(`Unknown crawl step: ${stepId}`);

  const items = await crawlGwCategory(cat.slug);
  const newItems = items.filter((item) => !existingSourceIds.has(item.sourceId));
  await insertItems(newItems, "gebrauchtwaffen");

  await ensureCrawlMetaTable();
  const existingLiveRow = await dbGet<{ value: string }>("SELECT value FROM crawl_meta WHERE key = 'live_source_ids'");
  const existingLive: string[] = existingLiveRow?.value ? JSON.parse(existingLiveRow.value) : [];
  const updatedLive = [...existingLive, ...items.map((i) => i.sourceId)];
  await dbRun("INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('live_source_ids', ?)", [JSON.stringify(updatedLive)]);

  console.log(`[Crawl] ${cat.slug}: ${items.length} total, ${newItems.length} new`);
  return { inserted: newItems.length, deleted: 0, source: `gw-${slug}` };
}

export async function runCrawl(): Promise<{ inserted: number; deleted: number; duration: number }> {
  const start = Date.now();
  const steps = getCrawlSteps();
  let totalInserted = 0;
  let totalDeleted = 0;

  await initializeSchema();
  await ensureCrawlMetaTable();
  await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'");

  for (const step of steps) {
    const result = await runCrawlStep(step.id);
    totalInserted += result.inserted;
    totalDeleted += result.deleted;
  }

  const duration = Date.now() - start;
  console.log(`[Crawl] Full crawl done: ${totalInserted} new, ${totalDeleted} removed in ${duration}ms`);
  return { inserted: totalInserted, deleted: totalDeleted, duration };
}

export async function getCrawlStatus(): Promise<{ lastCrawl: string | null; count: number; autoCrawlEnabled: boolean; autoCrawlTime: string }> {
  await initializeSchema();
  const count = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun')"))?.c ?? 0;

  await ensureCrawlMetaTable();
  const row = await dbGet<{ value: string }>("SELECT value FROM crawl_meta WHERE key = 'last_crawl'");

  return {
    lastCrawl: row?.value || null,
    count,
    autoCrawlEnabled: true,
    autoCrawlTime: "17:00",
  };
}

async function ensureCrawlMetaTable() {
  await dbExec(`
    CREATE TABLE IF NOT EXISTS crawl_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
}

async function saveCrawlTimestamp() {
  await ensureCrawlMetaTable();
  const now = new Date().toISOString();
  await dbRun("INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('last_crawl', ?)", [now]);
}
