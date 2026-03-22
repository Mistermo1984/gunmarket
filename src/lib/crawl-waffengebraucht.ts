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

// ─── Two-stage classification ────────────────────────────────

// STUFE 1: URL-Segment Mapping (most reliable source)
const URL_CATEGORY_MAP: Record<string, { hauptkategorie: string; unterkategorie: string }> = {
  // ── KURZWAFFEN ──
  kurzwaffen: { hauptkategorie: "kurzwaffen", unterkategorie: "pistolen" },
  pistolen: { hauptkategorie: "kurzwaffen", unterkategorie: "pistolen" },
  revolver: { hauptkategorie: "kurzwaffen", unterkategorie: "revolver" },
  handguns: { hauptkategorie: "kurzwaffen", unterkategorie: "pistolen" },
  firearms: { hauptkategorie: "kurzwaffen", unterkategorie: "pistolen" },
  // ── LANGWAFFEN (comprehensive) ──
  langwaffen: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  buechsen: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  buchsen: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  gewehre: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  repetierer: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  repetierbuechsen: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  halbautomaten: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  halbautomat: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  einzellader: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  kipplaufbuechsen: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  flinten: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  jagdflinten: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  bockflinten: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  doppelflinten: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  bockdoppelflinten: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  pumpaction: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  kombinierte: { hauptkategorie: "langwaffen", unterkategorie: "kombinierte-waffen" },
  kombiniertwaffen: { hauptkategorie: "langwaffen", unterkategorie: "kombinierte-waffen" },
  kombiniertewaffen: { hauptkategorie: "langwaffen", unterkategorie: "kombinierte-waffen" },
  bockbuechsflinten: { hauptkategorie: "langwaffen", unterkategorie: "kombinierte-waffen" },
  drillinge: { hauptkategorie: "langwaffen", unterkategorie: "kombinierte-waffen" },
  doppelbuechsen: { hauptkategorie: "langwaffen", unterkategorie: "kombinierte-waffen" },
  jagdwaffen: { hauptkategorie: "langwaffen", unterkategorie: "jagdwaffen" },
  wildjagd: { hauptkategorie: "langwaffen", unterkategorie: "jagdwaffen" },
  wildundjagd: { hauptkategorie: "langwaffen", unterkategorie: "jagdwaffen" },
  rifles: { hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  shotguns: { hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  // ── ORDONNANZ ──
  ordonnanzwaffen: { hauptkategorie: "ordonnanzwaffen", unterkategorie: "langwaffen-ordonnanz" },
  ordonnanz: { hauptkategorie: "ordonnanzwaffen", unterkategorie: "langwaffen-ordonnanz" },
  sammlerordonanzwaffen: { hauptkategorie: "ordonnanzwaffen", unterkategorie: "langwaffen-ordonnanz" },
  sammlerordonnanzwaffen: { hauptkategorie: "ordonnanzwaffen", unterkategorie: "langwaffen-ordonnanz" },
  // ── LUFTDRUCK ──
  luftdruckwaffen: { hauptkategorie: "luftdruckwaffen", unterkategorie: "luftgewehre" },
  luftdruckwaffensoftair: { hauptkategorie: "luftdruckwaffen", unterkategorie: "co2-waffen" },
  luftgewehre: { hauptkategorie: "luftdruckwaffen", unterkategorie: "luftgewehre" },
  luftpistolen: { hauptkategorie: "luftdruckwaffen", unterkategorie: "luftpistolen" },
  airguns: { hauptkategorie: "luftdruckwaffen", unterkategorie: "luftgewehre" },
  softair: { hauptkategorie: "luftdruckwaffen", unterkategorie: "co2-waffen" },
  // ── MUNITION ──
  munition: { hauptkategorie: "munition", unterkategorie: "" },
  ammunition: { hauptkategorie: "munition", unterkategorie: "" },
  // ── OPTIK ──
  optik: { hauptkategorie: "optik", unterkategorie: "zielfernrohre" },
  zielfernrohre: { hauptkategorie: "optik", unterkategorie: "zielfernrohre" },
  montagen: { hauptkategorie: "optik", unterkategorie: "montagen" },
  // ── ZUBEHOER ──
  messer: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  messerblankwaffen: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  wiederladen: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  wiederladepressen: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  selbstverteidigung: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  verschiedenes: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  magazine: { hauptkategorie: "zubehoer", unterkategorie: "magazine" },
  griffschalen: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  holster: { hauptkategorie: "zubehoer", unterkategorie: "holster" },
  schafte: { hauptkategorie: "zubehoer", unterkategorie: "lauefe-teile" },
  laufe: { hauptkategorie: "zubehoer", unterkategorie: "lauefe-teile" },
  chokes: { hauptkategorie: "zubehoer", unterkategorie: "lauefe-teile" },
  bogenschiesen: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  accessories: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  knives: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  bekleidung: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  ausrustung: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  waffenkofferfutterale: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  waffenpflegeputzzeug: { hauptkategorie: "zubehoer", unterkategorie: "reinigung" },
  buchersoftwaredvds: { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
};

// STUFE 2: Title-Keyword Matching (fallback when URL is ambiguous)
// Includes French terms for nextgun.ch (Suisse romande)
const TITLE_KEYWORDS: { pattern: RegExp; hauptkategorie: string; unterkategorie: string }[] = [
  // Ordonnanz (check before Kurzwaffen due to P220/P226 overlap)
  { pattern: /\b(k31|k11|k98|stgw\s?57|stgw\s?90|sig\s?510|sig\s?550|pe57|karabiner\s?31|ordonnanz|mousqueton\s?31)\b/i, hauptkategorie: "ordonnanzwaffen", unterkategorie: "langwaffen-ordonnanz" },
  // Kurzwaffen (DE + FR)
  { pattern: /\b(pistole|pistol|pistolet|glock|sig\s?p\d|walther|beretta\s?(px|apx|92|m9)|cz\s?\d|hk\s?(p|sfp|usp|vp)|browning\s?hp|p226|p220|p210|p38|luger|fnx|fn\s?five|canik|springfield|kimber|1911)\b/i, hauptkategorie: "kurzwaffen", unterkategorie: "pistolen" },
  { pattern: /\b(revolver|taurus|colt\s?(python|anaconda|cobra|king)|smith\s?&?\s?wesson|s&w\s+model|ruger\s?(gp|sp|redhawk))\b/i, hauptkategorie: "kurzwaffen", unterkategorie: "revolver" },
  // Langwaffen (DE + FR — comprehensive)
  { pattern: /\b(büchse|buechse|karabiner|gewehr|rifle|fusil|carabine|carbine|mauser|sauer\s?\d|blaser|merkel|browning\s+(bar|x-bolt|a-bolt)|tikka|sako|remington\s?\d|winchester|savage|ruger\s?(precision|american|ranch|mini)|repetierer|repetier|halbautomat|haenel|oberland|desert\s?tech|sig\s?(55[016]|mcx|516|56\d|sauer)|mr223|ar[\s-]?15|sr[\s-]?15|hk\s?(mr|sl|g)|stgw|benelli\s?mr|cz\s?(557|600|bren)|steyr|zastava|mauserwerke|vetterli|schmidt.rubin)\b/i, hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  { pattern: /\b(flinte|schrotflinte|shotgun|bockdoppel|drilling|bockbüchse|beretta\s?(686|69[0-9]|dt|sv|a[34]00)|browning\s?(b[25]|maxus|a5|cynergy)|benelli\s?(m[1-4]|super|ethos|vinci)|franchi|remington\s?8[78]|winchester\s?sx|mossberg|pump\s?action|bockflinte|doppelflinte|fusil.+(chasse|trap|sport))\b/i, hauptkategorie: "langwaffen", unterkategorie: "flinten" },
  { pattern: /\b(arme\s+d.{0,2}[ée]paule|fusil\s+semi|carabine\s+semi|mousqueton)\b/i, hauptkategorie: "langwaffen", unterkategorie: "buechsen" },
  // Luftdruck
  { pattern: /\b(luftpistole|luftgewehr|co2|pre-charged|pcp|airguns?|airsoft|softair)\b/i, hauptkategorie: "luftdruckwaffen", unterkategorie: "luftgewehre" },
  // Munition
  { pattern: /\b(munition|patrone|patronen|projektil|\d+\s?mm\s+para|\d+x\d+|\.\d{2,3}\s?(win|rem|mag|spl|lr))\b/i, hauptkategorie: "munition", unterkategorie: "" },
  // Zubehör
  { pattern: /\b(magazin|magazine|mag\s+\d|chargeur|clips?)\b/i, hauptkategorie: "zubehoer", unterkategorie: "magazine" },
  { pattern: /\b(holster|halfter|schulterholster|porte-chargeur)\b/i, hauptkategorie: "zubehoer", unterkategorie: "holster" },
  { pattern: /\b(zielfernrohr|zf|scope|visier|diopter|rotpunkt|red\s?dot|leuchtpunkt|lunette|aimpoint|eotech|holosun|vortex|zeiss|swarovski|leupold)\b/i, hauptkategorie: "optik", unterkategorie: "zielfernrohre" },
  { pattern: /\b(reinigung|reinigungsset|putzzeug|öl|waffenöl)\b/i, hauptkategorie: "zubehoer", unterkategorie: "reinigung" },
  { pattern: /\b(griff|griffschale|griffstück|schaft|crosse|handguard)\b/i, hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  { pattern: /\b(messer|klappmesser|taschenmesser|jagdmesser|couteau)\b/i, hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  { pattern: /\b(wiederladen|ladebank|matrize|zündhütchen|hülsen)\b/i, hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer" },
  { pattern: /\b(silencieux|schalldämpfer|kompensator|suppressor|mundungsbremse|mündungsbremse)\b/i, hauptkategorie: "zubehoer", unterkategorie: "lauefe-teile" },
];

export function classifyListing(
  sourceUrl: string,
  titel: string,
  beschreibung: string
): { hauptkategorie: string; unterkategorie: string; confidence: "url" | "title" | "fallback" } {
  // STUFE 1: URL segments — check from most specific (deepest) to broadest
  // e.g. /kurzwaffen/magazine/item → match "magazine" (zubehoer) not "kurzwaffen"
  try {
    const url = new URL(sourceUrl);
    const segments = url.pathname.split("/").filter(Boolean);
    // Reverse: deepest path segment first (most specific)
    for (let i = segments.length - 1; i >= 0; i--) {
      const normalized = segments[i].toLowerCase().replace(/[^a-z]/g, "");
      if (URL_CATEGORY_MAP[normalized]) {
        return { ...URL_CATEGORY_MAP[normalized], confidence: "url" };
      }
    }
  } catch {}

  // STUFE 2: Use the existing scoring classifier which handles anti-patterns
  // (e.g. "Holster für Glock" → zubehoer, "für SIG P226" → zubehoer)
  const classified = classifyCategory(titel, beschreibung);

  // Check if title keywords match to determine confidence
  const text = `${titel} ${(beschreibung || "").substring(0, 200)}`.toLowerCase();
  for (const rule of TITLE_KEYWORDS) {
    if (rule.pattern.test(text)) {
      return { ...classified, confidence: "title" };
    }
  }

  // If scoring classifier found something meaningful, trust it
  if (classified.hauptkategorie !== "zubehoer" || classified.unterkategorie !== "andere-zubehoer") {
    return { ...classified, confidence: "title" };
  }

  return { hauptkategorie: "zubehoer", unterkategorie: "andere-zubehoer", confidence: "fallback" };
}

// Track unmapped URL segments for reporting
const _unmappedSegments = new Set<string>();
export function getUnmappedSegments(): string[] { return Array.from(_unmappedSegments); }
export function clearUnmappedSegments(): void { _unmappedSegments.clear(); }

function trackUrlSegments(sourceUrl: string): void {
  try {
    const url = new URL(sourceUrl);
    const segments = url.pathname.split("/").filter(Boolean);
    for (const segment of segments) {
      const normalized = segment.toLowerCase().replace(/[^a-z]/g, "");
      if (normalized && !URL_CATEGORY_MAP[normalized] && !/^\d+$/.test(normalized) && !normalized.includes("_i")) {
        _unmappedSegments.add(segment.toLowerCase());
      }
    }
  } catch {}
}

// All categories — exact slugs verified live on gebrauchtwaffen.com
// NOTE: 'munition' does NOT exist as a standalone category
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
  confidence?: "url" | "title" | "fallback";
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

/**
 * Detect last page number using multiple methods:
 * 1. searchPaginationLast class link (most reliable)
 * 2. » link matching the category slug
 * 3. Highest page number in pagination links
 * 4. Calculate from "X von Y" total count text
 */
function getLastPage(html: string, categorySlug: string): number {
  // Method 1: searchPaginationLast class link — <a href=".../57" class="searchPaginationLast ...">»</a>
  const m1 = html.match(
    /class="searchPaginationLast[^"]*"[^>]*href="[^"]*\/(\d+)"|href="[^"]*\/(\d+)"[^>]*class="searchPaginationLast/
  );
  if (m1) return parseInt(m1[1] || m1[2]);

  // Method 2: » link (Unicode 187) for this category slug
  const escaped = categorySlug.replace(/-/g, "\\-");
  const m2 = html.match(
    new RegExp(
      `href="(?:https://www\\.gebrauchtwaffen\\.com)?/${escaped}/(\\d+)"[^>]*>\\s*(?:»|&raquo;|\\u00BB)`,
      "i"
    )
  );
  if (m2) return parseInt(m2[1]);

  // Method 3: highest page number in any pagination link for this slug
  const allMatches = Array.from(
    html.matchAll(
      new RegExp(
        `href="(?:https://www\\.gebrauchtwaffen\\.com)?/${escaped}/(\\d+)"`,
        "g"
      )
    )
  );
  if (allMatches.length > 0) {
    return Math.max(...allMatches.map((m) => parseInt(m[1])));
  }

  // Method 4: calculate from "X von Y" total count
  const m4 = html.match(/(\d+)\s+von\s+(\d+)/i);
  if (m4) {
    const perPage = parseInt(m4[1]);
    const total = parseInt(m4[2]);
    if (perPage > 0 && total > 0) return Math.ceil(total / perPage);
  }

  return 1;
}

/**
 * Extract listing URLs from category page.
 * Listings are in <tr onclick="..."> rows containing <a href="URL_with_i_i12345">.
 * Pattern: href="https://www.gebrauchtwaffen.com/.../..._i107304"
 */
function extractListingUrls(html: string): string[] {
  // Primary: absolute URLs with _i pattern
  const absMatches = Array.from(
    html.matchAll(
      /href="(https:\/\/www\.gebrauchtwaffen\.com\/[^"]+_i\d+)"/g
    )
  );
  if (absMatches.length > 0) {
    return Array.from(new Set(absMatches.map((m) => m[1])));
  }

  // Fallback: relative URLs with _i pattern
  const relMatches = Array.from(html.matchAll(/href="(\/[^"]+_i\d+)"/g));
  if (relMatches.length > 0) {
    return Array.from(
      new Set(relMatches.map((m) => GW_BASE_URL + m[1]))
    );
  }

  // Legacy fallback: onclick location.href pattern
  const onclickMatches = Array.from(
    html.matchAll(
      /location\.href='(https:\/\/www\.gebrauchtwaffen\.com\/[^']+_i\d+)'/g
    )
  );
  return Array.from(new Set(onclickMatches.map((m) => m[1])));
}


/**
 * Scrape individual gebrauchtwaffen.com listing page.
 * All selectors verified by live inspection.
 */
async function scrapeGwListing(url: string): Promise<CrawledItem | null> {
  const html = await fetchPage(url);
  if (!html) return null;

  const idMatch = url.match(/_i(\d+)/);
  if (!idMatch) return null;

  // Title: <h1> — remove category prefix like "Pistolen - " or "Ausrüstung – "
  let titel = html.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1]?.trim() || "";
  titel = titel.replace(/^[^–\-]+ [–\-] /, "").trim();
  if (!titel) return null;

  // Price: div.price.round3 — format "CHF 1.440,00"
  const priceMatch = html.match(/class="price[^"]*"[^>]*>\s*CHF\s*([\d.,'+]+)/);
  let preis = 0;
  if (priceMatch) {
    preis =
      parseFloat(
        priceMatch[1]
          .replace(/\./g, "")
          .replace(/'/g, "")
          .replace(",", ".")
      ) || 0;
  } else {
    // Fallback: any CHF mention
    const fallback = html.match(/CHF\s*([\d.,'+]+)/);
    if (fallback) {
      preis =
        parseFloat(
          fallback[1]
            .replace(/\./g, "")
            .replace(/'/g, "")
            .replace(",", ".")
        ) || 0;
    }
  }

  // Description: second div.desc.round3 (first is structured attributes, second is free text)
  const descMatches = Array.from(
    html.matchAll(/class="desc round3"[^>]*>([\s\S]*?)<\/div>/g)
  );
  let beschreibung = "";
  if (descMatches.length >= 2) {
    beschreibung = descMatches[1][1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 2000);
  }
  if (!beschreibung) {
    // Fallback: div.text
    const textMatch = html.match(/class="text"[^>]*>([\s\S]*?)<\/div>/);
    if (textMatch) {
      beschreibung = textMatch[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 2000);
    }
  }
  if (!beschreibung) {
    // Legacy fallback
    const descMatch = html.match(
      /class="item-description"[^>]*>([\s\S]*?)<\/div>/
    );
    if (descMatch) {
      beschreibung = descMatch[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 2000);
    }
  }

  // Canton: <a class="breadcrumb region" ...><span itemprop="title">Graubünden</span></a>
  let kanton = "";
  const cantonMatch =
    html.match(
      /class="[^"]*breadcrumb[^"]*region[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i
    ) ||
    html.match(
      /class="[^"]*region[^"]*breadcrumb[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i
    ) ||
    html.match(/class="region"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i) ||
    html.match(/itemprop="addressRegion"[^>]*>([^<]+)/i) ||
    html.match(/Schweiz-Switzerland\s*·\s*([^·\n<]+)/);
  if (cantonMatch) {
    kanton = cantonMatch[1].trim().split("·")[0].trim();
  }

  // City: <span class="city">Chur</span>
  let ortschaft = "";
  const cityMatch =
    html.match(/class="city"[^>]*>([^<]+)</) ||
    html.match(/itemprop="addressLocality"[^>]*>([^<]+)/i);
  if (cityMatch) {
    ortschaft = cityMatch[1].trim();
  }

  // Images: ONLY from div.main-effect.effect6 (the listing's own gallery)
  // Related listings use <tr class="effect6">, NOT <div class="main-effect effect6">
  const mainEffectMatch =
    html.match(/class="main-effect effect6"[^>]*>([\s\S]*?)<\/div>/i) ||
    html.match(/class="[^"]*main-effect[^"]*effect6[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  let imageUrls: string[] = [];
  if (mainEffectMatch) {
    const galleryHtml = mainEffectMatch[0];
    const thumbMatches =
      galleryHtml.match(
        /d9c3dmdj8vwy7\.cloudfront\.net\/\d+_thumbnail\.(?:jpg|jpeg|png)/gi
      ) || [];
    imageUrls = Array.from(new Set(thumbMatches)).map((u) =>
      "https://" + u.replace(/_thumbnail\./, ".")
    );
  }

  // Category: two-stage classification (URL → title keywords → scoring fallback)
  trackUrlSegments(url);
  const { hauptkategorie, unterkategorie, confidence } = classifyListing(url, titel, beschreibung);

  return {
    sourceId: `gw-${idMatch[1]}`,
    titel,
    preis,
    verhandelbar: 0,
    ortschaft,
    plz: "",
    kanton,
    hauptkategorie,
    unterkategorie,
    beschreibung,
    imageUrls,
    sourceUrl: url,
    confidence,
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

      const ngSourceUrl = `https://marketplace.nextgun.ch/annonce/view/${slug}-id-${l.id}`;
      trackUrlSegments(ngSourceUrl);
      const ngClassified = classifyListing(ngSourceUrl, l.weaponName, "");
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
        sourceUrl: ngSourceUrl,
        lat: l.latitude || null,
        lng: l.longitude || null,
        confidence: ngClassified.confidence,
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

async function upsertItems(
  items: CrawledItem[],
  source: string,
  existingMap: Map<string, { id: string; preis: number; imageCount: number }>
): Promise<{ created: number; updated: number; unchanged: number; confidenceBreakdown: { url: number; title: number; fallback: number }; categoryBreakdown: Record<string, number>; newListingIds: string[] }> {
  const userId =
    source === "nextgun" ? "crawler-nextgun" : GW_CRAWLER_USER.id;
  const statements: { sql: string; args: (string | number | null)[] }[] = [];
  let created = 0;
  let updated = 0;
  let unchanged = 0;
  const confidenceBreakdown = { url: 0, title: 0, fallback: 0 };
  const categoryBreakdown: Record<string, number> = {};
  const newListingIds: string[] = [];
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  for (const item of items) {
    const existing = existingMap.get(item.sourceId);

    if (!existing) {
      // Track confidence + category stats
      const conf = item.confidence || "fallback";
      confidenceBreakdown[conf]++;
      categoryBreakdown[item.hauptkategorie] = (categoryBreakdown[item.hauptkategorie] || 0) + 1;

      // New listing — insert
      const id = uuidv4();
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
        sql: `INSERT INTO listings (id, user_id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus, marke, modell, kaliber, zustand, preis, verhandelbar, tausch, kanton, ortschaft, plz, lat, lng, aufrufe, source, source_url, source_id, last_seen_at, created_at, kategorie_confidence)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id, userId, item.titel, item.beschreibung, item.hauptkategorie,
          item.unterkategorie, rechtsstatus, "", "", "", "", item.preis,
          item.verhandelbar, item.kanton, item.ortschaft, item.plz,
          coords?.lat ?? null, coords?.lng ?? null, 0, source,
          item.sourceUrl, item.sourceId, now, now, conf,
        ],
      });

      for (let i = 0; i < item.imageUrls.length; i++) {
        statements.push({
          sql: "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
          args: [uuidv4(), id, item.imageUrls[i], i, i === 0 ? 1 : 0],
        });
      }

      // Record initial price in history
      if (item.preis > 0) {
        statements.push({
          sql: "INSERT INTO listing_price_history (id, listing_id, preis, recorded_at) VALUES (?, ?, ?, ?)",
          args: [uuidv4(), id, item.preis, now],
        });
      }
      created++;
      newListingIds.push(id);
    } else {
      // Existing listing — check for changes
      const changes: string[] = [];
      const args: (string | number | null)[] = [];

      // Always update last_seen_at
      changes.push("last_seen_at = ?");
      args.push(now);

      // Price changed?
      if (item.preis > 0 && item.preis !== existing.preis) {
        changes.push("preis = ?", "price_updated_at = ?");
        args.push(item.preis, now);

        // Record price history
        statements.push({
          sql: "INSERT INTO listing_price_history (id, listing_id, preis, recorded_at) VALUES (?, ?, ?, ?)",
          args: [uuidv4(), existing.id, item.preis, now],
        });

        // Update price_change_pct
        const pctChange = existing.preis > 0
          ? ((item.preis - existing.preis) / existing.preis) * 100
          : 0;
        changes.push("price_change_pct = ?");
        args.push(Math.round(pctChange * 10) / 10);
      }

      // More images?
      if (item.imageUrls.length > existing.imageCount) {
        changes.push("images_updated_at = ?");
        args.push(now);
        // Replace images
        statements.push({
          sql: "DELETE FROM listing_images WHERE listing_id = ?",
          args: [existing.id],
        });
        for (let i = 0; i < item.imageUrls.length; i++) {
          statements.push({
            sql: "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
            args: [uuidv4(), existing.id, item.imageUrls[i], i, i === 0 ? 1 : 0],
          });
        }
      }

      if (changes.length > 1) {
        // Real changes beyond just last_seen_at
        args.push(existing.id);
        statements.push({
          sql: `UPDATE listings SET ${changes.join(", ")} WHERE id = ?`,
          args,
        });
        updated++;
      } else {
        // Only last_seen_at
        statements.push({
          sql: "UPDATE listings SET last_seen_at = ? WHERE id = ?",
          args: [now, existing.id],
        });
        unchanged++;
      }
    }
  }

  const CHUNK_SIZE = 200;
  for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
    await dbBatch(statements.slice(i, i + CHUNK_SIZE));
  }

  return { created, updated, unchanged, confidenceBreakdown, categoryBreakdown, newListingIds };
}

// ─── Public API ──────────────────────────────────────────────

export function seedCrawledListings() {
  console.log("[Seed] Use admin panel to crawl.");
}

// ─── Crawler state management ───────────────────────────────

async function ensureCrawlerStateTable() {
  await dbExec(`
    CREATE TABLE IF NOT EXISTS crawler_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      status TEXT DEFAULT 'idle',
      started_at TEXT,
      stopped_at TEXT,
      stop_requested INTEGER DEFAULT 0,
      current_source TEXT,
      current_category TEXT,
      processed_count INTEGER DEFAULT 0,
      created_count INTEGER DEFAULT 0,
      updated_count INTEGER DEFAULT 0,
      unchanged_count INTEGER DEFAULT 0
    );
    INSERT OR IGNORE INTO crawler_state (id) VALUES (1);
  `);
}

async function setCrawlerState(data: Record<string, string | number | null>) {
  await ensureCrawlerStateTable();
  const sets = Object.keys(data).map((k) => `${k} = ?`).join(", ");
  await dbRun(`UPDATE crawler_state SET ${sets} WHERE id = 1`, Object.values(data));
}

async function isCrawlerStopRequested(): Promise<boolean> {
  await ensureCrawlerStateTable();
  const row = await dbGet<{ stop_requested: number }>(
    "SELECT stop_requested FROM crawler_state WHERE id = 1"
  );
  return row?.stop_requested === 1;
}

export async function requestCrawlerStop() {
  await setCrawlerState({ stop_requested: 1 });
}

export async function getCrawlerState(): Promise<{
  status: string;
  started_at: string | null;
  stopped_at: string | null;
  current_source: string | null;
  current_category: string | null;
  processed_count: number;
  created_count: number;
  updated_count: number;
  unchanged_count: number;
}> {
  await ensureCrawlerStateTable();
  const row = await dbGet<Record<string, unknown>>(
    "SELECT * FROM crawler_state WHERE id = 1"
  );
  return {
    status: (row?.status as string) || "idle",
    started_at: (row?.started_at as string) || null,
    stopped_at: (row?.stopped_at as string) || null,
    current_source: (row?.current_source as string) || null,
    current_category: (row?.current_category as string) || null,
    processed_count: (row?.processed_count as number) || 0,
    created_count: (row?.created_count as number) || 0,
    updated_count: (row?.updated_count as number) || 0,
    unchanged_count: (row?.unchanged_count as number) || 0,
  };
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
): Promise<{
  inserted: number; updated: number; unchanged: number; deleted: number; source: string;
  runId?: string;
  categories?: Record<string, number>;
  confidence_breakdown?: { url: number; title: number; fallback: number };
  unmapped_segments?: string[];
}> {
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

  // Create crawler_runs record
  const runId = uuidv4();
  const startedAt = new Date().toISOString();
  const sourceName = stepId.startsWith("gw-") ? "gebrauchtwaffen" : stepId === "nextgun" ? "nextgun" : "cleanup";
  await dbRun(
    `INSERT INTO crawler_runs (id, started_at, step, source, status) VALUES (?, ?, ?, ?, 'running')`,
    [runId, startedAt, stepId, sourceName]
  );

  // Reset stop flag so single-step calls don't get stuck from a previous abort
  await setCrawlerState({ stop_requested: 0, status: "running", current_source: stepId });

  // Build map of existing listings for upsert
  const existingRows = await dbAll<{ source_id: string; source: string; id: string; preis: number }>(
    "SELECT source_id, source, id, preis FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun') AND source_id IS NOT NULL"
  );
  const existingSourceIds = new Set(existingRows.map((r) => r.source_id));

  // Build existing map with image counts for upsert
  const imageCountRows = await dbAll<{ listing_id: string; cnt: number }>(
    "SELECT listing_id, COUNT(*) as cnt FROM listing_images WHERE listing_id IN (SELECT id FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun')) GROUP BY listing_id"
  );
  const imageCountMap = new Map(imageCountRows.map((r) => [r.listing_id, r.cnt]));
  const existingMap = new Map(
    existingRows.map((r) => [r.source_id, { id: r.id, preis: r.preis, imageCount: imageCountMap.get(r.id) || 0 }])
  );

  await setCrawlerState({ current_source: stepId, current_category: stepId });

  try {
    if (stepId === "nextgun") {
      const items = await crawlNextgun();
      const newItems = items.filter((item) => !existingSourceIds.has(item.sourceId));

      await enrichNextgunImages(newItems);
      const result = await upsertItems(items, "nextgun", existingMap);

      await ensureCrawlMetaTable();
      const existingLiveRow = await dbGet<{ value: string }>(
        "SELECT value FROM crawl_meta WHERE key = 'live_source_ids'"
      );
      const existingLive: string[] = existingLiveRow?.value
        ? JSON.parse(existingLiveRow.value) : [];
      const updatedLive = [...existingLive, ...items.map((i) => i.sourceId)];
      await dbRun(
        "INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('live_source_ids', ?)",
        [JSON.stringify(updatedLive)]
      );

      console.log(
        `[Crawl] NextGun: ${items.length} total, ${result.created} new, ${result.updated} updated, ${result.unchanged} unchanged`
      );

      const durationMs = Date.now() - new Date(startedAt).getTime();
      const newIds = result.newListingIds || [];
      await dbRun(
        `UPDATE crawler_runs SET completed_at = ?, status = 'completed', total_scraped = ?, new_listings = ?, updated_listings = ?, unchanged_listings = ?, new_listing_ids = ?, pages_crawled = ?, duration_ms = ? WHERE id = ?`,
        [new Date().toISOString(), items.length, result.created, result.updated, result.unchanged, JSON.stringify(newIds), 1, durationMs, runId]
      );

      return {
        inserted: result.created, updated: result.updated, unchanged: result.unchanged, deleted: 0, source: "nextgun", runId,
        categories: result.categoryBreakdown, confidence_breakdown: result.confidenceBreakdown, unmapped_segments: getUnmappedSegments(),
      };
    }

    if (stepId === "cleanup") {
      await ensureCrawlMetaTable();
      const liveIdsRow = await dbGet<{ value: string }>(
        "SELECT value FROM crawl_meta WHERE key = 'live_source_ids'"
      );
      if (!liveIdsRow?.value) {
        await saveCrawlTimestamp();
        const durationMs = Date.now() - new Date(startedAt).getTime();
        await dbRun(
          `UPDATE crawler_runs SET completed_at = ?, status = 'completed', duration_ms = ? WHERE id = ?`,
          [new Date().toISOString(), durationMs, runId]
        );
        return { inserted: 0, updated: 0, unchanged: 0, deleted: 0, source: "cleanup", runId };
      }
      const liveSourceIds = new Set(JSON.parse(liveIdsRow.value) as string[]);
      const toDeactivate = existingRows.filter((r) => !liveSourceIds.has(r.source_id));
      let deleted = 0;
      const removedIds: string[] = [];
      if (toDeactivate.length > 0) {
        const deactivateStatements: { sql: string; args: (string | number | null)[] }[] = [];
        for (const row of toDeactivate) {
          deactivateStatements.push({
            sql: "UPDATE listings SET status = 'inaktiv', sold_at = datetime('now'), updated_at = datetime('now') WHERE source_id = ? AND status = 'aktiv'",
            args: [row.source_id],
          });
          removedIds.push(row.id);
        }
        await dbBatch(deactivateStatements);
        deleted = toDeactivate.length;
      }
      const toReactivate = existingRows.filter(
        (r) => liveSourceIds.has(r.source_id)
      );
      if (toReactivate.length > 0) {
        const reactivateStatements: { sql: string; args: (string | number | null)[] }[] = [];
        for (const row of toReactivate) {
          reactivateStatements.push({
            sql: "UPDATE listings SET status = 'aktiv', sold_at = NULL WHERE source_id = ? AND status = 'inaktiv'",
            args: [row.source_id],
          });
        }
        await dbBatch(reactivateStatements);
      }
      await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'");
      await saveCrawlTimestamp();
      console.log(`[Crawl] Cleanup: ${deleted} deactivated`);

      const durationMs = Date.now() - new Date(startedAt).getTime();
      await dbRun(
        `UPDATE crawler_runs SET completed_at = ?, status = 'completed', removed_listings = ?, removed_listing_ids = ?, duration_ms = ? WHERE id = ?`,
        [new Date().toISOString(), deleted, JSON.stringify(removedIds), durationMs, runId]
      );

      return { inserted: 0, updated: 0, unchanged: 0, deleted, source: "cleanup", runId };
    }

    // gw-{slug} — crawl single gebrauchtwaffen.com category
    const slug = stepId.replace("gw-", "");
    const cat = CATEGORIES.find((c) => c.slug === slug);
    if (!cat) throw new Error(`Unknown crawl step: ${stepId}`);

    // Phase 1: Collect all listing URLs from category pages (fast)
    const refs = await collectGwListingUrls(cat.slug);
    console.log(`[Crawl] ${cat.slug}: ${refs.length} total listings found`);

    // Phase 2: Scrape detail pages for NEW listings only (slow)
    const newRefs = refs.filter((r) => !existingSourceIds.has(r.sourceId));
    const allItems: CrawledItem[] = [];
    for (const ref of newRefs) {
      if (await isCrawlerStopRequested()) {
        console.log("[Crawl] Stop requested during scraping");
        break;
      }
      await delay(1200 + Math.random() * 1300);
      const item = await scrapeGwListing(ref.url);
      if (item) allItems.push(item);
    }

    // Also create minimal items for existing refs so upsert can update last_seen_at
    for (const ref of refs) {
      if (existingSourceIds.has(ref.sourceId) && !allItems.find((i) => i.sourceId === ref.sourceId)) {
        allItems.push({
          sourceId: ref.sourceId,
          titel: "", beschreibung: "", hauptkategorie: "", unterkategorie: "",
          preis: 0, verhandelbar: 0, ortschaft: "", plz: "", kanton: "",
          imageUrls: [], sourceUrl: ref.url,
        });
      }
    }

    const result = await upsertItems(allItems, "gebrauchtwaffen", existingMap);

    // Track ALL source IDs for cleanup
    await ensureCrawlMetaTable();
    const existingLiveRow = await dbGet<{ value: string }>(
      "SELECT value FROM crawl_meta WHERE key = 'live_source_ids'"
    );
    const existingLive: string[] = existingLiveRow?.value
      ? JSON.parse(existingLiveRow.value) : [];
    const updatedLive = [...existingLive, ...refs.map((r) => r.sourceId)];
    await dbRun(
      "INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('live_source_ids', ?)",
      [JSON.stringify(updatedLive)]
    );

    console.log(
      `[Crawl] ${cat.slug}: ${result.created} new, ${result.updated} updated, ${result.unchanged} unchanged`
    );

    const durationMs = Date.now() - new Date(startedAt).getTime();
    const newIds = result.newListingIds || [];
    // Detect page count from refs (each page has ~20 listings)
    const pagesCrawled = Math.ceil(refs.length / 20) || 1;
    await dbRun(
      `UPDATE crawler_runs SET completed_at = ?, status = 'completed', total_scraped = ?, new_listings = ?, updated_listings = ?, unchanged_listings = ?, new_listing_ids = ?, pages_crawled = ?, duration_ms = ?, mapping_errors = ?, mapping_issues = ? WHERE id = ?`,
      [new Date().toISOString(), refs.length, result.created, result.updated, result.unchanged, JSON.stringify(newIds), pagesCrawled, durationMs, (result.confidenceBreakdown?.fallback || 0), JSON.stringify([]), runId]
    );

    return {
      inserted: result.created,
      updated: result.updated,
      unchanged: result.unchanged,
      deleted: 0,
      source: `gw-${slug}`,
      runId,
      categories: result.categoryBreakdown,
      confidence_breakdown: result.confidenceBreakdown,
      unmapped_segments: getUnmappedSegments(),
    };
  } catch (err) {
    // Record failure
    await dbRun(
      `UPDATE crawler_runs SET status = 'failed', completed_at = ?, error_log = ?, duration_ms = ? WHERE id = ?`,
      [new Date().toISOString(), JSON.stringify([err instanceof Error ? err.message : String(err)]), Date.now() - new Date(startedAt).getTime(), runId]
    );
    throw err;
  }
}

export async function runCrawl(): Promise<{
  inserted: number;
  updated: number;
  unchanged: number;
  deleted: number;
  duration: number;
  stopped: boolean;
}> {
  const start = Date.now();
  const steps = getCrawlSteps();
  let totalInserted = 0;
  let totalUpdated = 0;
  let totalUnchanged = 0;
  let totalDeleted = 0;
  let stopped = false;

  await initializeSchema();
  await ensureCrawlMetaTable();
  await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'");

  // Reset crawler state
  await setCrawlerState({
    status: "running",
    started_at: new Date().toISOString(),
    stopped_at: null,
    stop_requested: 0,
    current_source: null,
    current_category: null,
    processed_count: 0,
    created_count: 0,
    updated_count: 0,
    unchanged_count: 0,
  });

  for (const step of steps) {
    if (await isCrawlerStopRequested()) {
      console.log("[Crawl] Stop requested — aborting remaining steps");
      stopped = true;
      break;
    }

    await setCrawlerState({ current_source: step.id, current_category: step.id });
    const result = await runCrawlStep(step.id);
    totalInserted += result.inserted;
    totalUpdated += result.updated;
    totalUnchanged += result.unchanged;
    totalDeleted += result.deleted;

    await setCrawlerState({
      processed_count: totalInserted + totalUpdated + totalUnchanged + totalDeleted,
      created_count: totalInserted,
      updated_count: totalUpdated,
      unchanged_count: totalUnchanged,
    });
  }

  const duration = Date.now() - start;
  await setCrawlerState({
    status: stopped ? "stopped" : "idle",
    stopped_at: new Date().toISOString(),
    current_source: null,
    current_category: null,
  });

  console.log(
    `[Crawl] Full crawl done: ${totalInserted} new, ${totalUpdated} updated, ${totalUnchanged} unchanged, ${totalDeleted} removed in ${duration}ms${stopped ? " (stopped)" : ""}`
  );
  return { inserted: totalInserted, updated: totalUpdated, unchanged: totalUnchanged, deleted: totalDeleted, duration, stopped };
}

export async function getCrawlStatus(): Promise<{
  lastCrawl: string | null;
  count: number;
  autoCrawlEnabled: boolean;
  autoCrawlTime: string;
  crawlerState: Awaited<ReturnType<typeof getCrawlerState>>;
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

  const crawlerState = await getCrawlerState();

  return {
    lastCrawl: row?.value || null,
    count,
    autoCrawlEnabled: true,
    autoCrawlTime: "00:00–02:00",
    crawlerState,
  };
}

export async function ensureCrawlMetaTable() {
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
