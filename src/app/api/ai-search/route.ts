import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const SYSTEM_PROMPT = `Du bist ein KI-Suchassistent für GunMarket.ch, einen Schweizer Waffenmarktplatz.

DEINE AUFGABE:
Der Nutzer beschreibt in Freitext, was er sucht. Du analysierst die Anfrage und gibst eine strukturierte JSON-Antwort zurück.

VERFÜGBARE KATEGORIEN: kurzwaffen, buechsen, flinten, jagdwaffen, ordonnanzwaffen, freie-waffen, optik, munition, zubehoer
VERFÜGBARE RECHTSSTATUS: frei, wes, abk-klein, abk-gross, kaufvertrag
VERFÜGBARE ZUSTAND: Neu, Wie neu, Sehr gut, Gut, Akzeptabel
VERFÜGBARE KANTONE: AG, AI, AR, BE, BL, BS, FR, GE, GL, GR, JU, LU, NE, NW, OW, SG, SH, SO, SZ, TG, TI, UR, VD, VS, ZG, ZH

Du antwortest IMMER in gültigem JSON mit genau diesem Schema:
{
  "erklärung": "Kurze Erklärung (2-3 Sätze) warum du diese Ergebnisse empfiehlst. Fachkundige Beratung.",
  "suchbegriff": "Optionaler Textsuche-Begriff für Titel/Marke/Beschreibung",
  "kategorie": "Eine der verfügbaren Kategorien oder null",
  "rechtsstatus": "Einer der verfügbaren Status oder null",
  "zustand": "Einer der verfügbaren Zustände oder null",
  "kanton": "Einer der verfügbaren Kantone oder null",
  "preisMin": null,
  "preisMax": null,
  "sortierung": "neueste" oder "preis-asc" oder "preis-desc",
  "annotationen": {
    "BESCHREIBUNG_DES_TYPS": "Kurze fachkundige Info zu dieser Waffentyp/Kategorie (1-2 Sätze). Z.B. bei Ordonnanzwaffen: 'Militärwaffen der Schweizer Armee, zuverlässig und historisch wertvoll.'"
  }
}

WICHTIGE REGELN:
- Bei "günstig schiessen" oder "laufende Kosten" → empfehle .22 LR Kaliber (günstigste Munition)
- Bei "Ordonnanzwaffen" → erkläre den historischen Kontext
- Bei "Jagd" → filtere auf jagdwaffen
- Bei "Sportschütze" oder "Sportschiessen" → empfehle passende Kategorien
- Bei "Selbstverteidigung" → verweise auf Rechtslage (WES nötig)
- Setze nur die Filter, die aus der Anfrage klar hervorgehen
- Die "annotationen" sollen generisches Wissen enthalten, das auf die Suchergebnisse angewendet werden kann
- Antworte IMMER auf Deutsch
- Gib KEINE Rechtsberatung, nur allgemeine Infos`;

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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Max 10 KI-Suchen pro Stunde." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.trim().length < 3) {
      return NextResponse.json({ error: "Suchanfrage zu kurz" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        maxOutputTokens: 800,
        responseMimeType: "application/json",
      },
    });

    // Combine system prompt + user query in a single prompt for more reliable JSON output
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\nNUTZER-ANFRAGE: ${query.trim()}\n\nAntworte NUR mit dem JSON-Objekt, keine zusätzlichen Erklärungen.`;

    let aiText: string;
    try {
      const result = await model.generateContent(fullPrompt);
      aiText = result.response.text();
    } catch (aiErr: unknown) {
      const errMsg = aiErr instanceof Error ? aiErr.message : String(aiErr);
      if (errMsg.includes("429")) {
        return NextResponse.json({ error: "KI-Suche ist gerade überlastet. Bitte versuche es in einer Minute erneut." }, { status: 429 });
      }
      throw aiErr;
    }

    // Parse JSON from AI response
    let parsed;
    try {
      // Try direct parse first
      parsed = JSON.parse(aiText);
    } catch {
      // Try extracting JSON from markdown or text wrapper
      try {
        const jsonMatch = aiText.match(/```json\s*([\s\S]*?)\s*```/) || aiText.match(/(\{[\s\S]*\})/);
        parsed = JSON.parse(jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : "{}");
      } catch {
        console.error("[AI Search] Failed to parse:", aiText.substring(0, 300));
        return NextResponse.json({
          error: "KI konnte die Anfrage nicht verarbeiten. Bitte versuche es erneut.",
        }, { status: 500 });
      }
    }

    // Ensure parsed has expected fields with defaults
    parsed = {
      erklärung: parsed.erklärung || parsed.erklaerung || "",
      suchbegriff: parsed.suchbegriff || null,
      kategorie: parsed.kategorie || null,
      rechtsstatus: parsed.rechtsstatus || null,
      zustand: parsed.zustand || null,
      kanton: parsed.kanton || null,
      preisMin: parsed.preisMin || null,
      preisMax: parsed.preisMax || null,
      sortierung: parsed.sortierung || "neueste",
      annotationen: parsed.annotationen || {},
    };

    // Step 2: Query DB with AI-determined filters
    const db = getDb();
    const conditions: string[] = ["l.status = 'aktiv'"];
    const params: (string | number)[] = [];

    if (parsed.suchbegriff) {
      conditions.push("(l.titel LIKE ? OR l.beschreibung LIKE ? OR l.marke LIKE ?)");
      const term = `%${parsed.suchbegriff}%`;
      params.push(term, term, term);
    }
    if (parsed.kategorie) {
      conditions.push("(l.hauptkategorie = ? OR l.unterkategorie = ?)");
      params.push(parsed.kategorie, parsed.kategorie);
    }
    if (parsed.rechtsstatus) {
      conditions.push("l.rechtsstatus = ?");
      params.push(parsed.rechtsstatus);
    }
    if (parsed.zustand) {
      conditions.push("l.zustand = ?");
      params.push(parsed.zustand);
    }
    if (parsed.kanton) {
      conditions.push("l.kanton = ?");
      params.push(parsed.kanton);
    }
    if (parsed.preisMin) {
      conditions.push("l.preis >= ?");
      params.push(parsed.preisMin);
    }
    if (parsed.preisMax) {
      conditions.push("l.preis <= ?");
      params.push(parsed.preisMax);
    }

    const sortMap: Record<string, string> = {
      "neueste": "l.created_at DESC",
      "preis-asc": "l.preis ASC",
      "preis-desc": "l.preis DESC",
    };
    const orderBy = sortMap[parsed.sortierung] || "l.created_at DESC";

    const whereClause = conditions.join(" AND ");

    const total = (
      db.prepare(`SELECT COUNT(*) as c FROM listings l WHERE ${whereClause}`).get(...params) as { c: number }
    ).c;

    const listings = db.prepare(`
      SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ
      FROM listings l
      LEFT JOIN users u ON l.user_id = u.id
      WHERE ${whereClause}
      ORDER BY ${orderBy}
      LIMIT 20
    `).all(...params) as Record<string, unknown>[];

    // Attach images
    const imgStmt = db.prepare("SELECT url, position FROM listing_images WHERE listing_id = ? ORDER BY position ASC");
    for (const listing of listings) {
      listing.images = imgStmt.all(listing.id as string);
    }

    return NextResponse.json({
      erklärung: parsed.erklärung || "",
      annotationen: parsed.annotationen || {},
      filter: {
        suchbegriff: parsed.suchbegriff || null,
        kategorie: parsed.kategorie || null,
        rechtsstatus: parsed.rechtsstatus || null,
        zustand: parsed.zustand || null,
        kanton: parsed.kanton || null,
        preisMin: parsed.preisMin || null,
        preisMax: parsed.preisMax || null,
        sortierung: parsed.sortierung || "neueste",
      },
      listings,
      total,
    });
  } catch (error) {
    console.error("AI Search error:", error);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
