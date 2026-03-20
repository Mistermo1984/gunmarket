import { initializeSchema, dbGet, dbAll, dbRun, dbBatch, dbExec } from "./db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { getPlzCoordinates, getCityCoordinates } from "./plz-coordinates";
import { classifyRechtsstatus } from "./rechtsstatus-classifier";
import { classifyCategory } from "./category-classifier";

// ─── Constants ──────────────────────────────────────────────

const GW_BASE_URL = "https://www.gebrauchtwaffen.com";

const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "de-CH,de;q=0.9,fr;q=0.8,en;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Cache-Control": "max-age=0",
  Referer: "https://www.google.ch/",
};

const GW_CRAWLER_USER = {
  id: "crawler-gebrauchtwaffen",
  email: "crawler@gebrauchtwaffen.com",
  vorname: "Gebrauchtwaffen",
  nachname: ".com",
  anbieter_typ: "Händler",
};

// All categories to crawl — exact slugs from gebrauchtwaffen.com (verified live)
// NOTE: 'munition' does not exist as a standalone category on gebrauchtwaffen.com
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

// ─── Types ──────────────────────────────────────────────────

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

interface ListingRef {
  sourceId: string;
  url: string;
}

// ─── Utilities ──────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchPage(url: string, retries = 2): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      redirect: "follow",
    });
    if ((res.status === 403 || res.status === 429) && retries > 0) {
      console.warn(`[Crawl] ${res.status} for ${url}, retrying in 5s...`);
      await delay(5000);
      return fetchPage(url, retries - 1);
    }
    if (!res.ok) {
      console.warn(`[Crawl] HTTP ${res.status} for ${url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.error(`[Crawl] Fetch error for ${url}:`, err);
    return null;
  }
}

// ─── gebrauchtwaffen.com ─────────────────────────────────────

/** Detect last page number from » pagination link */
function getLastPage(html: string, categorySlug: string): number {
  // Try specific category slug pattern: href="/kurzwaffen/57">»
  const match = html.match(
    new RegExp(`href="\\/${categorySlug}\\/(\\d+)"[^>]*>\\s*[»»]`)
  );
  if (match) return parseInt(match[1]);
  // Fallback: any pagination » link
  const match2 = html.match(/href="\/[a-z-]+\/(\d+)"[^>]*>\s*[»»]/);
  if (match2) return parseInt(match2[1]);
  return 1;
}

/** Extract listing URLs from category page using onclick patterns */
function extractListingUrls(html: string): string[] {
  const matches = Array.from(
    html.matchAll(
      /location\.href='(https:\/\/www\.gebrauchtwaffen\.com\/[^']+_i\d+)'/g
    )
  );
  return Array.from(new Set(matches.map((m) => m[1])));
}

/** URL-based category mapping — accessories override weapon parent categories */
function mapCategoryFromUrl(url: string): string {
  // Accessories first — these appear under weapon categories but are Zubehör
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
  // Main categories
  if (url.includes("/kurzwaffen")) return "kurzwaffen";
  if (url.includes("/langwaffen")) return "langwaffen";
  if (url.includes("/sammler") || url.includes("/ordonanz"))
    return "ordonnanzwaffen";
  if (url.includes("/luftdruck") || url.includes("/softair"))
    return "luftdruckwaffen";
  if (url.includes("/optik")) return "optik";
  if (url.includes("/messer") || url.includes("/blank")) return "zubehoer";
  if (url.includes("/wiederladen")) return "zubehoer";
  if (url.includes("/wild") || url.includes("/jagd")) return "langwaffen";
  if (url.includes("/bogenschiesen")) return "zubehoer";
  if (url.includes("/selbstverteidigung")) return "zubehoer";
  return "zubehoer";
}

/** Scrape individual gebrauchtwaffen.com listing page for full data */
async function scrapeGwListing(
  url: string
): Promise<CrawledItem | null> {
  const html = await fetchPage(url);
  if (!html) return null;

  const idMatch = url.match(/_i(\d+)/);
  if (!idMatch) return null;

  // Title — remove category prefix like "Pistolen – "
  let titel = html.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1]?.trim() || "";
  titel = titel.replace(/^[^–\-]+ [–\-] /, "").trim();
  if (!titel) return null;

  // Price
  const priceMatch = html.match(/CHF\s*([\d.']+)/);
  const preis = priceMatch
    ? parseFloat(
        priceMatch[1].replace(/\./g, "").replace(/'/g, "").replace(",", ".")
      )
    : 0;

  // Description
  const descMatch = html.match(
    /class="item-description"[^>]*>([\s\S]*?)<\/div>/
  );
  const beschreibung =
    descMatch?.[1]
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 2000) || "";

  // Canton
  const cantonMatch =
    html.match(/Schweiz-Switzerland\s*·\s*([^·\n<]+)/) ||
    html.match(/class="region"[^>]*>\s*([^<]+)/) ||
    html.match(/Standort[^<]*<[^>]+>\s*([^<]+)/);
  const kanton = cantonMatch?.[1]?.trim().split("·")[0]?.trim() || "";

  // Images — CloudFront thumbnail URLs → full size
  const thumbMatches = Array.from(
    html.matchAll(
      /https:\/\/d9c3dmdj8vwy7\.cloudfront\.net\/\d+_thumbnail\.(?:jpg|jpeg|png)/g
    )
  ).map((m) => m[0]);
  const imageUrls = Array.from(new Set(thumbMatches)).map((u) =>
    u.replace("_thumbnail", "")
  );

  // Category: URL-based mapping for hauptkategorie, classifier for unterkategorie
  const hauptkategorie = mapCategoryFromUrl(url);
  const classified = classifyCategory(titel, beschreibung);
  const unterkategorie = classified.unterkategorie;

  return {
    sourceId: `gw-${idMatch[1]}`,
    titel,
    preis,
    verhandelbar: 0,
    ortschaft: "",
    plz: "",
    kanton,
    hauptkategorie,
    unterkategorie,
    beschreibung,
    imageUrls,
    sourceUrl: url,
  };
}

/** Collect all listing URLs from all pages of a GW category */
async function collectGwListingUrls(slug: string): Promise<ListingRef[]> {
  const refs: ListingRef[] = [];
  const seen = new Set<string>();

  console.log(`[Crawl] Crawling gebrauchtwaffen.com: ${slug}`);
  const firstHtml = await fetchPage(`${GW_BASE_URL}/${slug}`);
  if (!firstHtml) {
    console.warn(`[Crawl] ${slug}: no response for first page`);
    return refs;
  }

  const lastPage = getLastPage(firstHtml, slug);
  console.log(`[Crawl] ${slug}: ${lastPage} pages found`);

  // Process first page
  for (const url of extractListingUrls(firstHtml)) {
    const id = url.match(/_i(\d+)/)?.[1];
    if (id && !seen.has(id)) {
      seen.add(id);
      refs.push({ sourceId: `gw-${id}`, url });
    }
  }

  // Process remaining pages
  for (let page = 2; page <= lastPage; page++) {
    await delay(1200 + Math.random() * 1300);
    try {
      const html = await fetchPage(`${GW_BASE_URL}/${slug}/${page}`);
      if (!html) continue;
      const urls = extractListingUrls(html);
      if (urls.length === 0) break; // No more listings
      for (const url of urls) {
        const id = url.match(/_i(\d+)/)?.[1];
        if (id && !seen.has(id)) {
          seen.add(id);
          refs.push({ sourceId: `gw-${id}`, url });
        }
      }
    } catch (err) {
      console.error(`[Crawl] Error page ${page} of ${slug}:`, err);
    }
  }

  console.log(
    `[Crawl] ${slug}: ${refs.length} listings found across ${lastPage} pages`
  );
  return refs;
}

// ─── nextgun.ch ──────────────────────────────────────────────

async function crawlNextgun(): Promise<CrawledItem[]> {
  const allItems: CrawledItem[] = [];

  try {
    console.log("[Crawl] Crawling marketplace.nextgun.ch");
    const html = await fetchPage(
      "https://marketplace.nextgun.ch/marketplace"
    );
    if (!html) {
      console.error("[Crawl] NextGun: No response");
      return [];
    }

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

      // Store image URLs directly — no download
      const imageUrls = l.hasImage
        ? [`https://marketplace.nextgun.ch/api/image/annonce/${l.id}`]
        : [];
      const slug = l.weaponName
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, "");

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

/** Enrich NextGun items with gallery images from detail pages */
async function enrichNextgunImages(items: CrawledItem[]): Promise<void> {
  for (const item of items) {
    if (item.imageUrls.length === 0) continue;
    try {
      const html = await fetchPage(item.sourceUrl);
      if (html) {
        const matches = html.match(
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

async function ensureCrawlerUser(
  userId: string,
  email: string,
  vorname: string,
  nachname: string
) {
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
  const userId =
    source === "nextgun" ? "crawler-nextgun" : GW_CRAWLER_USER.id;
  const statements: { sql: string; args: (string | number | null)[] }[] = [];

  for (const item of items) {
    const id = uuidv4();
    const createdAt = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    const coords =
      item.lat && item.lng
        ? { lat: item.lat, lng: item.lng }
        : ((item.plz ? getPlzCoordinates(item.plz) : null) ??
          getCityCoordinates(item.ortschaft));

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
        id,
        userId,
        item.titel,
        item.beschreibung,
        item.hauptkategorie,
        item.unterkategorie,
        rechtsstatus,
        "",
        "",
        "",
        "",
        item.preis,
        item.verhandelbar,
        item.kanton,
        item.ortschaft,
        item.plz,
        coords?.lat ?? null,
        coords?.lng ?? null,
        0,
        source,
        item.sourceUrl,
        item.sourceId,
        createdAt,
      ],
    });

    // Store image URLs directly in listing_images (no download)
    for (let i = 0; i < item.imageUrls.length; i++) {
      statements.push({
        sql: "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
        args: [uuidv4(), id, item.imageUrls[i], i, i === 0 ? 1 : 0],
      });
    }
  }

  // Batch in chunks to avoid oversized transactions
  const CHUNK_SIZE = 200;
  for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
    await dbBatch(statements.slice(i, i + CHUNK_SIZE));
  }
}

// ─── Public API ──────────────────────────────────────────────

export function seedCrawledListings() {
  console.log("[Seed] Use admin panel to crawl.");
}

export function getCrawlSteps(): { id: string; label: string }[] {
  return [
    ...CATEGORIES.map((c) => ({
      id: `gw-${c.slug}`,
      label: `gebrauchtwaffen.com: ${c.slug}`,
    })),
    { id: "nextgun", label: "nextgun.ch" },
    { id: "cleanup", label: "Aufräumen (verkaufte entfernen)" },
  ];
}

export async function runCrawlStep(
  stepId: string
): Promise<{ inserted: number; deleted: number; source: string }> {
  await initializeSchema();
  await ensureCrawlerUser(
    GW_CRAWLER_USER.id,
    GW_CRAWLER_USER.email,
    GW_CRAWLER_USER.vorname,
    GW_CRAWLER_USER.nachname
  );
  await ensureCrawlerUser(
    "crawler-nextgun",
    "crawler@nextgun.ch",
    "NextGun",
    ".ch"
  );

  // Get existing source_ids to skip duplicates
  const existingRows = await dbAll<{ source_id: string; source: string }>(
    "SELECT source_id, source FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun') AND source_id IS NOT NULL"
  );
  const existingSourceIds = new Set(existingRows.map((r) => r.source_id));

  if (stepId === "nextgun") {
    const items = await crawlNextgun();
    const newItems = items.filter(
      (item) => !existingSourceIds.has(item.sourceId)
    );

    // Enrich new items with gallery images from detail pages
    await enrichNextgunImages(newItems);
    await insertItems(newItems, "nextgun");

    await ensureCrawlMetaTable();
    const existingLiveRow = await dbGet<{ value: string }>(
      "SELECT value FROM crawl_meta WHERE key = 'live_source_ids'"
    );
    const existingLive: string[] = existingLiveRow?.value
      ? JSON.parse(existingLiveRow.value)
      : [];
    const updatedLive = [
      ...existingLive,
      ...items.map((i) => i.sourceId),
    ];
    await dbRun(
      "INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('live_source_ids', ?)",
      [JSON.stringify(updatedLive)]
    );

    console.log(
      `[Crawl] NextGun: ${items.length} total, ${newItems.length} new`
    );
    return { inserted: newItems.length, deleted: 0, source: "nextgun" };
  }

  if (stepId === "cleanup") {
    await ensureCrawlMetaTable();
    const liveIdsRow = await dbGet<{ value: string }>(
      "SELECT value FROM crawl_meta WHERE key = 'live_source_ids'"
    );
    if (!liveIdsRow?.value) {
      await saveCrawlTimestamp();
      return { inserted: 0, deleted: 0, source: "cleanup" };
    }
    const liveSourceIds = new Set(
      JSON.parse(liveIdsRow.value) as string[]
    );
    const toRemove = existingRows.filter(
      (r) => !liveSourceIds.has(r.source_id)
    );
    let deleted = 0;
    if (toRemove.length > 0) {
      const deleteStatements: {
        sql: string;
        args: (string | number | null)[];
      }[] = [];
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

  // Phase 1: Collect all listing URLs from category pages (fast)
  const refs = await collectGwListingUrls(cat.slug);
  const newRefs = refs.filter((r) => !existingSourceIds.has(r.sourceId));
  console.log(
    `[Crawl] ${cat.slug}: ${refs.length} total, ${newRefs.length} new to scrape`
  );

  // Phase 2: Scrape detail pages for new listings only (slow)
  const newItems: CrawledItem[] = [];
  for (const ref of newRefs) {
    await delay(1200 + Math.random() * 1300);
    const item = await scrapeGwListing(ref.url);
    if (item) newItems.push(item);
  }

  await insertItems(newItems, "gebrauchtwaffen");

  // Track ALL source IDs (both new and existing) for cleanup
  await ensureCrawlMetaTable();
  const existingLiveRow = await dbGet<{ value: string }>(
    "SELECT value FROM crawl_meta WHERE key = 'live_source_ids'"
  );
  const existingLive: string[] = existingLiveRow?.value
    ? JSON.parse(existingLiveRow.value)
    : [];
  const updatedLive = [
    ...existingLive,
    ...refs.map((r) => r.sourceId),
  ];
  await dbRun(
    "INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('live_source_ids', ?)",
    [JSON.stringify(updatedLive)]
  );

  console.log(
    `[Crawl] ${cat.slug}: ${refs.length} total, ${newItems.length} new inserted`
  );
  return {
    inserted: newItems.length,
    deleted: 0,
    source: `gw-${slug}`,
  };
}

export async function runCrawl(): Promise<{
  inserted: number;
  deleted: number;
  duration: number;
}> {
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
  console.log(
    `[Crawl] Full crawl done: ${totalInserted} new, ${totalDeleted} removed in ${duration}ms`
  );
  return { inserted: totalInserted, deleted: totalDeleted, duration };
}

export async function getCrawlStatus(): Promise<{
  lastCrawl: string | null;
  count: number;
  autoCrawlEnabled: boolean;
  autoCrawlTime: string;
}> {
  await initializeSchema();
  const count =
    (
      await dbGet<{ c: number }>(
        "SELECT COUNT(*) as c FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun')"
      )
    )?.c ?? 0;

  await ensureCrawlMetaTable();
  const row = await dbGet<{ value: string }>(
    "SELECT value FROM crawl_meta WHERE key = 'last_crawl'"
  );

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
  await dbRun(
    "INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('last_crawl', ?)",
    [now]
  );
}
