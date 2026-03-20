import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbAll } from "@/lib/db";

export const dynamic = "force-dynamic";

// ─── Rate limiting ──────────────────────────────────────────
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── Fetch live inventory stats for the AI prompt ───────────
async function getInventoryContext(): Promise<string> {
  const [catStats, priceStats, caliberStats, totalRow] = await Promise.all([
    dbAll<{ hauptkategorie: string; cnt: number }>(
      `SELECT hauptkategorie, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' GROUP BY hauptkategorie ORDER BY cnt DESC`
    ),
    dbGet<{ minPreis: number; maxPreis: number; avgPreis: number }>(
      `SELECT MIN(preis) as minPreis, MAX(preis) as maxPreis, ROUND(AVG(preis)) as avgPreis FROM listings WHERE status = 'aktiv' AND preis > 0`
    ),
    dbAll<{ kaliber: string; cnt: number }>(
      `SELECT kaliber, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' AND kaliber IS NOT NULL AND kaliber != '' GROUP BY kaliber ORDER BY cnt DESC LIMIT 15`
    ),
    dbGet<{ total: number }>(`SELECT COUNT(*) as total FROM listings WHERE status = 'aktiv'`),
  ]);

  const catLines = catStats.map((c) => `  ${c.hauptkategorie}: ${c.cnt} Inserate`).join("\n");
  const caliberLines = caliberStats.map((c) => `  ${c.kaliber}: ${c.cnt}`).join("\n");

  return `
AKTUELLER BESTAND (${totalRow?.total ?? 0} aktive Inserate):
Kategorien:
${catLines}

Preisbereich: CHF ${priceStats?.minPreis ?? 0} - CHF ${priceStats?.maxPreis ?? 0} (Durchschnitt: CHF ${priceStats?.avgPreis ?? 0})

Häufigste Kaliber im Bestand:
${caliberLines}

WICHTIG: Setze Filter nur auf Werte, die im Bestand existieren. Wenn eine Kategorie 0 Inserate hat, verwende sie NICHT als Filter.
Setze preisMax nur wenn der Nutzer explizit einen Preis nennt. Setze KEINEN suchbegriff-Filter wenn die Kategorie allein ausreicht.
Bevorzuge breite Kategoriefilter statt enger Textsuche.`;
}

// ─── Build the system prompt ────────────────────────────────
function buildSystemPrompt(inventoryContext: string): string {
  return `Du bist ein KI-Suchassistent für GunMarket.ch, einen Schweizer Waffenmarktplatz.

DEINE AUFGABE:
Der Nutzer beschreibt in Freitext, was er sucht. Du analysierst die Anfrage und gibst eine strukturierte JSON-Antwort zurück.

VERFÜGBARE HAUPTKATEGORIEN (exakt diese Werte verwenden): kurzwaffen, buechsen, flinten, jagdwaffen, ordonnanzwaffen, freie-waffen, optik, munition, zubehoer
VERFÜGBARE RECHTSSTATUS: frei, wes, abk-klein
VERFÜGBARE ZUSTAND (exakt diese Werte): neu, sehr-gut, gut, akzeptabel, defekt
VERFÜGBARE KANTONE (Kleinbuchstaben): ag, ai, ar, be, bl, bs, fr, ge, gl, gr, ju, lu, ne, nw, ow, sg, sh, so, sz, tg, ti, ur, vd, vs, zg, zh

${inventoryContext}

Du antwortest IMMER in gültigem JSON mit genau diesem Schema:
{
  "erklärung": "Kurze Erklärung (2-3 Sätze) warum du diese Ergebnisse empfiehlst. Fachkundige Beratung.",
  "suchbegriff": "Optionaler Textsuche-Begriff für Titel/Marke/Beschreibung oder null. NUR setzen wenn nötig (z.B. spezifische Marke/Modell). NICHT setzen wenn Kategorie allein reicht.",
  "kategorie": "Eine der verfügbaren Hauptkategorien oder null. Kann auch eine Unterkategorie sein.",
  "kategorien": ["Optional: Array von mehreren passenden Kategorien, z.B. ['jagdwaffen', 'buechsen']. Nur wenn mehrere Kategorien passen."],
  "rechtsstatus": "Einer der verfügbaren Status oder null",
  "zustand": "Einer der verfügbaren Zustände (Kleinbuchstaben mit Bindestrich) oder null",
  "kanton": "Einer der verfügbaren Kantone (Kleinbuchstaben) oder null",
  "preisMin": null,
  "preisMax": null,
  "sortierung": "neueste oder preis-asc oder preis-desc",
  "annotationen": {
    "BESCHREIBUNG_DES_TYPS": "Kurze fachkundige Info zu dieser Waffentyp/Kategorie (1-2 Sätze)."
  }
}

WICHTIGE REGELN:
- WENIGER FILTER = MEHR ERGEBNISSE. Setze nur Filter, die DIREKT aus der Anfrage hervorgehen.
- Bei "günstig" oder "unter X CHF" → setze preisMax, aber KEINEN zustand/rechtsstatus Filter
- Bei "Ordonnanzwaffen" oder "Sammeln" → kategorie: "ordonnanzwaffen", KEIN zusätzlicher suchbegriff
- Bei "Jagdgewehr" → kategorien: ["jagdwaffen", "buechsen"] (beide passen)
- Bei "Pistole" → kategorie: "kurzwaffen"
- Bei generischen Anfragen wie "günstige Pistole" → nur kategorie + preisMax, NICHT zustand/kaliber filtern
- suchbegriff NUR für spezifische Marken/Modelle (z.B. "SIG 550", "Glock 17"), NICHT für generische Begriffe
- Antworte IMMER auf Deutsch
- Gib KEINE Rechtsberatung, nur allgemeine Infos`;
}

// ─── Query builder + progressive relaxation ─────────────────

interface ParsedFilters {
  erklärung: string;
  suchbegriff: string | null;
  kategorie: string | null;
  kategorien: string[] | null;
  rechtsstatus: string | null;
  zustand: string | null;
  kanton: string | null;
  preisMin: number | null;
  preisMax: number | null;
  sortierung: string;
  annotationen: Record<string, string>;
}

function buildQuery(filters: ParsedFilters, relaxLevel: number): { where: string; params: (string | number)[] } {
  const conditions: string[] = ["l.status = 'aktiv'"];
  const params: (string | number)[] = [];

  // Text search — removed at relaxLevel >= 1
  if (filters.suchbegriff && relaxLevel < 1) {
    conditions.push("(l.titel LIKE ? OR l.beschreibung LIKE ? OR l.marke LIKE ? OR l.kaliber LIKE ?)");
    const term = `%${filters.suchbegriff}%`;
    params.push(term, term, term, term);
  }

  // Category — always kept (use kategorien array if available)
  const cats = filters.kategorien && filters.kategorien.length > 0
    ? filters.kategorien
    : filters.kategorie ? [filters.kategorie] : [];
  if (cats.length === 1) {
    conditions.push("(l.hauptkategorie = ? OR l.unterkategorie = ?)");
    params.push(cats[0], cats[0]);
  } else if (cats.length > 1) {
    const placeholders = cats.map(() => "?").join(",");
    conditions.push(`(l.hauptkategorie IN (${placeholders}) OR l.unterkategorie IN (${placeholders}))`);
    params.push(...cats, ...cats);
  }

  // Rechtsstatus — removed at relaxLevel >= 2
  if (filters.rechtsstatus && relaxLevel < 2) {
    conditions.push("l.rechtsstatus = ?");
    params.push(filters.rechtsstatus);
  }

  // Zustand — removed at relaxLevel >= 2
  if (filters.zustand && relaxLevel < 2) {
    conditions.push("l.zustand = ?");
    params.push(filters.zustand);
  }

  // Kanton — removed at relaxLevel >= 3
  if (filters.kanton && relaxLevel < 3) {
    conditions.push("l.kanton = ?");
    params.push(filters.kanton);
  }

  // Price — removed at relaxLevel >= 4
  if (filters.preisMin && relaxLevel < 4) {
    conditions.push("l.preis >= ?");
    params.push(filters.preisMin);
  }
  if (filters.preisMax && relaxLevel < 4) {
    conditions.push("l.preis <= ?");
    params.push(filters.preisMax);
  }

  return { where: conditions.join(" AND "), params };
}

const MIN_RESULTS = 5;
const FALLBACK_MIN = 3;

async function queryWithRelaxation(
  filters: ParsedFilters
): Promise<{ listings: Record<string, unknown>[]; total: number; relaxed: boolean; fallback: boolean }> {
  const sortMap: Record<string, string> = {
    neueste: "l.created_at DESC",
    "preis-asc": "l.preis ASC",
    "preis-desc": "l.preis DESC",
  };
  const orderBy = sortMap[filters.sortierung] || "l.created_at DESC";

  // Try progressively relaxed queries
  // Level 0: all filters
  // Level 1: remove suchbegriff
  // Level 2: remove rechtsstatus + zustand
  // Level 3: remove kanton
  // Level 4: remove price filters
  for (let level = 0; level <= 4; level++) {
    const { where, params } = buildQuery(filters, level);

    const total = (
      await dbGet<{ c: number }>(`SELECT COUNT(*) as c FROM listings l WHERE ${where}`, params)
    )?.c ?? 0;

    if (total >= MIN_RESULTS || level === 4) {
      if (total >= FALLBACK_MIN) {
        const listings = await dbAll(
          `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ
           FROM listings l LEFT JOIN users u ON l.user_id = u.id
           WHERE ${where} ORDER BY ${orderBy} LIMIT 20`,
          params
        );
        return { listings, total, relaxed: level > 0, fallback: false };
      }
      break; // even fully relaxed has < FALLBACK_MIN, go to fallback
    }
  }

  // Fallback: return newest listings
  const listings = await dbAll(
    `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ
     FROM listings l LEFT JOIN users u ON l.user_id = u.id
     WHERE l.status = 'aktiv'
     ORDER BY l.created_at DESC LIMIT 20`
  );
  const total = (
    await dbGet<{ c: number }>(`SELECT COUNT(*) as c FROM listings l WHERE l.status = 'aktiv'`)
  )?.c ?? 0;
  return { listings, total, relaxed: true, fallback: true };
}

// ─── Main handler ───────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Max 30 KI-Suchen pro Stunde." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[AI-Search] API key fehlt!");
    return NextResponse.json(
      { error: "KI-Suche ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut." },
      { status: 503 }
    );
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.trim().length < 3) {
      return NextResponse.json({ error: "Suchanfrage zu kurz" }, { status: 400 });
    }

    await initializeSchema();

    // Fetch inventory context for smarter AI filtering
    const inventoryContext = await getInventoryContext();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        maxOutputTokens: 800,
        responseMimeType: "application/json",
      },
    });

    const systemPrompt = buildSystemPrompt(inventoryContext);
    const fullPrompt = `${systemPrompt}\n\n---\n\nNUTZER-ANFRAGE: ${query.trim()}\n\nAntworte NUR mit dem JSON-Objekt, keine zusätzlichen Erklärungen.`;

    let aiText: string;
    try {
      const result = await model.generateContent(fullPrompt);
      aiText = result.response.text();
    } catch (aiErr: unknown) {
      const errMsg = aiErr instanceof Error ? aiErr.message : String(aiErr);
      if (errMsg.includes("429")) {
        return NextResponse.json(
          { error: "KI-Suche ist gerade überlastet. Bitte versuche es in einer Minute erneut." },
          { status: 429 }
        );
      }
      throw aiErr;
    }

    let raw;
    try {
      raw = JSON.parse(aiText);
    } catch {
      try {
        const jsonMatch = aiText.match(/```json\s*([\s\S]*?)\s*```/) || aiText.match(/(\{[\s\S]*\})/);
        raw = JSON.parse(jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : "{}");
      } catch {
        console.error("[AI Search] Failed to parse:", aiText.substring(0, 300));
        return NextResponse.json(
          { error: "KI konnte die Anfrage nicht verarbeiten. Bitte versuche es erneut." },
          { status: 500 }
        );
      }
    }

    // Normalize AI response — fix common casing/format issues
    const parsed: ParsedFilters = {
      erklärung: raw.erklärung || raw.erklaerung || "",
      suchbegriff: raw.suchbegriff || null,
      kategorie: raw.kategorie ? String(raw.kategorie).toLowerCase() : null,
      kategorien: Array.isArray(raw.kategorien) ? raw.kategorien.map((k: string) => String(k).toLowerCase()) : null,
      rechtsstatus: raw.rechtsstatus ? String(raw.rechtsstatus).toLowerCase() : null,
      zustand: raw.zustand ? String(raw.zustand).toLowerCase().replace(/\s+/g, "-") : null,
      kanton: raw.kanton ? String(raw.kanton).toLowerCase() : null,
      preisMin: typeof raw.preisMin === "number" ? raw.preisMin : null,
      preisMax: typeof raw.preisMax === "number" ? raw.preisMax : null,
      sortierung: raw.sortierung || "neueste",
      annotationen: raw.annotationen || {},
    };

    // Normalize zustand edge cases
    if (parsed.zustand) {
      const zustandMap: Record<string, string> = {
        "neu": "neu", "wie-neu": "sehr-gut", "sehr-gut": "sehr-gut",
        "gut": "gut", "akzeptabel": "akzeptabel", "defekt": "defekt",
      };
      parsed.zustand = zustandMap[parsed.zustand] ?? null;
    }

    // Query with progressive relaxation
    const { listings, total, relaxed, fallback } = await queryWithRelaxation(parsed);

    // Attach images
    for (const listing of listings) {
      const images = await dbAll(
        "SELECT url, position FROM listing_images WHERE listing_id = ? ORDER BY position ASC",
        [listing.id as string]
      );
      listing.images = images;
    }

    // Build explanation
    let erklärung = parsed.erklärung;
    if (fallback) {
      erklärung = `Keine genauen Treffer für "${query}" gefunden — zeige neueste Inserate. ` + erklärung;
    } else if (relaxed) {
      erklärung = erklärung + " (Filter wurden erweitert um mehr Ergebnisse zu zeigen.)";
    }

    return NextResponse.json({
      erklärung,
      annotationen: parsed.annotationen,
      filter: {
        suchbegriff: parsed.suchbegriff,
        kategorie: parsed.kategorie,
        kategorien: parsed.kategorien,
        rechtsstatus: parsed.rechtsstatus,
        zustand: parsed.zustand,
        kanton: parsed.kanton,
        preisMin: parsed.preisMin,
        preisMax: parsed.preisMax,
        sortierung: parsed.sortierung,
      },
      listings,
      total,
      fallback,
    });
  } catch (error) {
    console.error("AI Search error:", error);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
