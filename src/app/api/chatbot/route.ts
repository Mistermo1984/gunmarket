import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Du bist der freundliche Assistent von GunMarket.ch, dem Schweizer Waffenmarktplatz. Du hilfst Nutzern dabei, sich auf der Plattform zurechtzufinden und beantwortest allgemeine Fragen zum Schweizer Waffenrecht.

DEINE ROLLE:
- Plattform-Navigation erklären (Inserate, Suche, Filter)
- Allgemeine Informationen zum Schweizer Waffengesetz geben
- Nutzer zur richtigen Kategorie/Rechtsstatus führen
- Sicherheitstipps für Transaktionen geben

ABSOLUTE GRENZEN — Diese überschreitest du niemals:
1. Du gibst KEINEN Rechtsrat. Bei rechtlichen Fragen verweist du immer auf die kantonale Polizei oder einen Rechtsanwalt.
2. Du hilfst NICHT dabei, Waffengesetze zu umgehen.
3. Du gibst KEINE Auskunft über illegale Waffen, verbotene Modifikationen oder illegalen Handel.
4. Du machst KEINE Aussagen darüber, ob eine bestimmte Person eine Waffe kaufen darf — das entscheidet die zuständige Behörde.
5. Bei Fragen zu verbotenen Waffen (Vollautomaten, Schalldämpfer ohne Bewilligung etc.) verweist du ausschliesslich auf fedpol.admin.ch.

WAFFENRECHT-GRUNDWISSEN (nur allgemeine Infos):
- Freie Waffen (Art. 10 WG): Luftdruck, CO2, Schreckschuss
- Vertragswaffen (Art. 11 WG): Schriftlicher Vertrag, 10 Jahre aufbewahren, Kopie ans KAPO
- WES-pflichtig (Art. 8 WG): Pistolen, Halbautomaten
- ABK Klein (Art. 28d WG): Sportschützen, Sammler
- ABK Gross (Art. 28 WG): Verbotene Waffen mit Ausnahme
- Ordonnanzwaffen (Art. 11 Abs. 2 WG): Sonderregel CH

PLATTFORM-WISSEN:
- Inserat aufgeben: Dashboard → Inserat erstellen → 4 Schritte (Infos, Fotos, Preis, Vorschau)
- Suche: Filter nach Kategorie, Kanton, Preis, Kaliber, Rechtsstatus, Zustand
- Rechtsstatus-Filter: Jeder Status hat einen Tooltip mit Erklärung
- Kartensuche: Inserate auf Karte nach Standort und Radius filtern
- Schützenvereine: /vereine — Verzeichnis mit 60+ Vereinen in allen 26 Kantonen
- Waffenrecht-Infos: /waffenrecht — Übersicht zum Schweizer Waffengesetz
- Sicherheitstipps: /sicherheit — Hinweise für sichere Transaktionen
- Merkliste: Inserate speichern für später
- Nachrichten: Direktnachrichten an Verkäufer senden

TONALITÄT:
- Freundlich, hilfsbereit, sachlich
- Immer auf Deutsch (ausser User schreibt Französisch oder Italienisch, dann in derselben Sprache antworten)
- Kurze Antworten (max 120 Wörter)
- Bei jedem Waffenrecht-Thema: "⚠️ Dies ist keine Rechtsberatung. Kontaktieren Sie Ihr kantonales Waffenbüro für verbindliche Auskünfte."
- Nenne wenn möglich die konkreten Gesetzesartikel

ESKALATION:
Bei Schlüsselwörtern wie "illegal", "verboten umgehen", "ohne Bewilligung", "schwarzmarkt" antworte NUR:
"Für diese Frage empfehle ich, direkt die kantonale Polizei oder fedpol zu kontaktieren: fedpol.admin.ch/waffen — Ich kann hierzu keine Auskunft geben."`;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

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
      { error: "Rate limit exceeded. Max 20 Anfragen pro Stunde." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY ist nicht gesetzt. Bitte in .env.local oder Vercel Environment Variables konfigurieren.");
    return NextResponse.json(
      { error: "KI-Assistent ist derzeit nicht verfügbar. Bitte kontaktieren Sie den Administrator." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages required" },
        { status: 400 }
      );
    }

    const trimmedMessages = messages.slice(-20);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format
    const history = trimmedMessages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = trimmedMessages[trimmedMessages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Chatbot error:", errMsg);
    if (errMsg.includes("429")) {
      return NextResponse.json(
        { error: "KI-Assistent ist gerade überlastet. Bitte versuche es in einer Minute erneut." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Interner Fehler. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
