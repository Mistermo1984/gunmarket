# GunMarket.ch — SEO + SCHÜTZENVEREINE + CHATBOT
# 3 separate Prompts — nacheinander in Claude Code eingeben

---

## PROMPT A: SEO OPTIMIERUNG

```
Optimiere GunMarket.ch vollständig für Suchmaschinen (SEO).
Führe alle Änderungen direkt aus ohne Rückfragen.

1. src/app/layout.tsx — Globale Meta-Tags:
   - title: "GunMarket.ch — Waffen kaufen & verkaufen in der Schweiz"
   - description: "Der grösste Schweizer Waffenmarktplatz. Pistolen, Büchsen, 
     Jagdwaffen, Ordonnanzwaffen kaufen und verkaufen. Kostenlose Inserate für 
     Private und Händler."
   - keywords: "Waffen Schweiz, Pistole kaufen, Büchse verkaufen, 
     Jagdwaffe, Ordonnanzwaffe, WES, Waffenmarkt Schweiz"
   - og:image, og:type, og:locale: de_CH
   - twitter:card: summary_large_image
   - canonical URL
   - robots: index, follow
   - lang: de-CH

2. src/app/sitemap.ts — Dynamische Sitemap:
   - Alle statischen Seiten (/, /suche, /vereine, /waffenrecht, /agb etc.)
   - Alle Inserate-Seiten dynamisch aus DB: /inserat/[id]
   - Alle Kategorie-Seiten: /suche?kategorie=kurzwaffen etc.
   - Alle Kanton-Seiten: /suche?kanton=BE etc.
   - Priority: Homepage 1.0, Inserate 0.8, Kategorien 0.7, Legal 0.3
   - changeFrequency: Inserate "daily", Static "monthly"

3. src/app/robots.ts:
   - Allow: /
   - Disallow: /dashboard, /api, /admin
   - Sitemap URL angeben

4. Dynamische Meta-Tags für Inserat-Detailseiten:
   src/app/inserat/[id]/page.tsx — generateMetadata():
   - title: "[Marke] [Modell] kaufen — [Kanton] | GunMarket.ch"
   - description: "[Erste 150 Zeichen der Beschreibung]... CHF [Preis]"
   - og:image: Erstes Inserat-Foto
   - og:type: "product"

5. Dynamische Meta-Tags für Kategorie-Seiten:
   src/app/suche/page.tsx — generateMetadata():
   - title: "[Kategorie] kaufen Schweiz | GunMarket.ch"
   - description: "Alle [Kategorie] Inserate in der Schweiz. 
     Jetzt [Kategorie] kaufen oder verkaufen auf GunMarket.ch"

6. src/app/page.tsx — Strukturierte Daten (JSON-LD):
   Schema.org WebSite + SearchAction:
   {
     "@context": "https://schema.org",
     "@type": "WebSite",
     "name": "GunMarket.ch",
     "url": "https://gunmarket.ch",
     "description": "Schweizer Waffenmarktplatz",
     "potentialAction": {
       "@type": "SearchAction",
       "target": "https://gunmarket.ch/suche?q={search_term_string}",
       "query-input": "required name=search_term_string"
     }
   }

7. Inserat-Detailseiten — JSON-LD Product Schema:
   {
     "@type": "Product",
     "name": "[Titel]",
     "description": "[Beschreibung]",
     "offers": {
       "@type": "Offer",
       "price": "[Preis]",
       "priceCurrency": "CHF",
       "availability": "https://schema.org/InStock",
       "seller": { "@type": "Person", "name": "[Verkäufer]" }
     }
   }

8. Kategorie-Landing-Pages (neue Dateien):
   src/app/kategorien/[slug]/page.tsx
   - /kategorien/kurzwaffen — "Kurzwaffen kaufen Schweiz"
   - /kategorien/buechsen — "Büchsen & Gewehre kaufen Schweiz"
   - /kategorien/jagdwaffen — "Jagdwaffen kaufen Schweiz"
   - /kategorien/ordonnanzwaffen — "Ordonnanzwaffen kaufen Schweiz"
   Jede Seite: H1 mit Keyword, kurzer Text (150 Wörter), 
   Inserate-Grid, interne Links

9. next.config.ts — Performance für SEO:
   - images: { formats: ['image/avif', 'image/webp'] }
   - compress: true
   - poweredByHeader: false
   - Sicherheits-Headers (X-Frame-Options, CSP)

10. Interne Verlinkung:
    - Footer: Links zu allen Kategorien + Kantonen
    - Homepage: "Waffen kaufen in [Kanton]" Links für alle 26 Kantone
    - Breadcrumbs auf allen Unterseiten (bereits vorhanden, 
      jetzt mit JSON-LD BreadcrumbList ergänzen)
```

---

## PROMPT B: SCHÜTZENVEREINE VERZEICHNIS (Echte Daten)

```
Ergänze die Schützenvereine-Seite mit einem umfassenden Verzeichnis.
Führe alle Änderungen direkt aus ohne Rückfragen.

Datei: src/app/vereine/page.tsx + src/lib/vereine-data.ts

Erstelle src/lib/vereine-data.ts mit mindestens 60 echten 
Schweizer Schützenvereinen aus allen 26 Kantonen.

Verwende folgende echte Vereine (recherchiert):

KANTON BERN:
- Schützengesellschaft Bern, Bern BE, 300m + Pistole, www.sgbern.ch
- Pistolenclub Thun, Thun BE, Pistole + IPSC
- Feldschützen Steffisburg, Steffisburg BE, 300m + Feldschiessen
- Schützengesellschaft Burgdorf, Burgdorf BE, 300m
- Pistolenclub Biel, Biel BE, Pistole
- Jagdgesellschaft Oberland, Interlaken BE, Jagdschiessen

KANTON ZÜRICH:
- Pistolenclub Zürich, Zürich ZH, Pistole + IPSC, www.pczurich.ch
- Schützengesellschaft Zürich, Zürich ZH, 300m + 25m
- Feldschützen Winterthur, Winterthur ZH, 300m + Feldschiessen
- Schützenverein Uster, Uster ZH, 300m
- IPSC Schweiz Zürich, Zürich ZH, IPSC

KANTON LUZERN:
- Feldschützen Luzern, Luzern LU, 300m + Feldschiessen
- Pistolenclub Luzern, Luzern LU, Pistole
- Schützengesellschaft Sursee, Sursee LU, 300m

KANTON ST. GALLEN:
- Schützengesellschaft St. Gallen, St. Gallen SG, 300m + Pistole
- Feldschützen Rapperswil, Rapperswil SG, 300m
- Jagdgesellschaft Toggenburg, Wattwil SG, Jagdschiessen

KANTON AARGAU:
- Schützenverein Baden, Baden AG, 300m + Pistole
- Feldschützen Aarau, Aarau AG, 300m + Feldschiessen
- Pistolenclub Rheinfelden, Rheinfelden AG, Pistole

KANTON BASEL:
- Schützengesellschaft Basel, Basel BS, 300m + Pistole
- Pistolenclub Basel, Basel BS, Pistole + IPSC

KANTON SOLOTHURN:
- Feldschützen Solothurn, Solothurn SO, 300m
- Schützenverein Olten, Olten SO, 300m + Pistole

KANTON FREIBURG:
- Société de tir Fribourg, Fribourg FR, 300m + Pistole
- Feldschützen Murten, Murten FR, 300m

KANTON WALLIS:
- Société de tir Sion, Sion VS, 300m + Pistole
- Schützenverein Brig, Brig VS, 300m
- Jagdgesellschaft Wallis, Visp VS, Jagdschiessen

KANTON GRAUBÜNDEN:
- Schützenverein Chur, Chur GR, 300m + Pistole
- Jagdgesellschaft Graubünden, Chur GR, Jagdschiessen
- Feldschützen Davos, Davos GR, 300m

KANTON TESSIN:
- Società di tiro Lugano, Lugano TI, 300m + Pistole
- Società di tiro Bellinzona, Bellinzona TI, 300m

KANTON WAADT:
- Société de tir Lausanne, Lausanne VD, 300m + Pistole
- Société de tir Vevey, Vevey VD, 300m

KANTON GENF:
- Société de tir Genève, Genf GE, 300m + Pistole + IPSC

KANTON NEUENBURG:
- Société de tir Neuchâtel, Neuenburg NE, 300m

KANTON SCHAFFHAUSEN:
- Schützengesellschaft Schaffhausen, Schaffhausen SH, 300m + Pistole

KANTON THURGAU:
- Schützenverein Frauenfeld, Frauenfeld TG, 300m + Pistole

KANTON SCHWYZ:
- Schützengesellschaft Schwyz, Schwyz SZ, 300m

KANTON URI:
- Schützengesellschaft Altdorf, Altdorf UR, 300m

KANTON OBWALDEN:
- Feldschützen Sarnen, Sarnen OW, 300m + Feldschiessen

KANTON NIDWALDEN:
- Schützenverein Stans, Stans NW, 300m

KANTON GLARUS:
- Schützengesellschaft Glarus, Glarus GL, 300m

KANTON ZUG:
- Schützengesellschaft Zug, Zug ZG, 300m + Pistole

KANTON APPENZELL AR:
- Schützenverein Herisau, Herisau AR, 300m

KANTON APPENZELL AI:
- Schützengesellschaft Appenzell, Appenzell AI, 300m

KANTON JURA:
- Société de tir Delémont, Delémont JU, 300m

Datenstruktur pro Verein:
{
  id: string,
  name: string,
  kanton: string (2-letter code),
  ortschaft: string,
  disziplinen: string[],
  website?: string,
  email?: string,
  neumitglieder: boolean,
  beschreibung?: string,
  lat?: number,
  lng?: number (ungefähre Koordinaten der Ortschaft)
}

SEITEN-FEATURES:
- Suchfeld: Live-Filter über Name + Ortschaft
- Kanton-Filter: Dropdown
- Disziplin-Filter: Checkboxen
- "Neumitglieder willkommen" Toggle
- Ergebnis-Counter: "X Vereine gefunden"
- Karte: Alle Vereine als Marker (Leaflet, dynamic import)
- SSV-Hinweis: "Vollständiges Verzeichnis auf ssv-fstv.ch"
- Disclaimer: "Angaben ohne Gewähr. Bitte direkt beim 
  Verein anfragen für aktuelle Informationen."
- SEO: generateMetadata mit "Schützenvereine Schweiz" Keywords
```

---

## PROMPT C: CHATBOT UPGRADE

```
Upgrade den bestehenden Waffenrecht-Chatbot zu einem 
vollständigen Plattform-Assistenten.
Führe alle Änderungen direkt aus ohne Rückfragen.

WICHTIGE EINSCHRÄNKUNGEN (nicht verhandelbar):
- Kein Rechtsrat — immer auf Anwalt/KAPO verweisen
- Keine Unterstützung für illegale Aktivitäten
- Keine Hilfe beim Umgehen von Waffengesetzen
- Bei Unsicherheit: immer auf fedpol.admin.ch verweisen

Datei: src/app/api/chatbot/route.ts — Neuer System-Prompt:

SYSTEM PROMPT:
"Du bist der freundliche Assistent von GunMarket.ch, 
dem Schweizer Waffenmarktplatz. Du hilfst Nutzern dabei, 
sich auf der Plattform zurechtzufinden und beantwortest 
allgemeine Fragen zum Schweizer Waffenrecht.

DEINE ROLLE:
- Plattform-Navigation erklären (Inserate, Suche, Filter)
- Allgemeine Informationen zum Schweizer Waffengesetz geben
- Nutzer zur richtigen Kategorie/Rechtsstatus führen
- Sicherheitstipps für Transaktionen geben

ABSOLUTE GRENZEN — Diese überschreitest du niemals:
1. Du gibst KEINEN Rechtsrat. Bei rechtlichen Fragen 
   verweist du immer auf die kantonale Polizei oder 
   einen Rechtsanwalt.
2. Du hilfst NICHT dabei, Waffengesetze zu umgehen.
3. Du gibst KEINE Auskunft über illegale Waffen, 
   verbotene Modifikationen oder illegalen Handel.
4. Du machst KEINE Aussagen darüber, ob eine bestimmte 
   Person eine Waffe kaufen darf — das entscheidet 
   die zuständige Behörde.
5. Bei Fragen zu verbotenen Waffen (Vollautomaten, 
   Schalldämpfer ohne Bewilligung etc.) verweist du 
   ausschliesslich auf fedpol.admin.ch.

WAFFENRECHT-GRUNDWISSEN (nur allgemeine Infos):
- Freie Waffen (Art. 10 WG): Luftdruck, CO2, Schreckschuss
- Vertragswaffen (Art. 11 WG): Schriftlicher Vertrag, 
  10 Jahre aufbewahren, Kopie ans KAPO
- WES-pflichtig (Art. 8 WG): Pistolen, Halbautomaten
- ABK Klein (Art. 28d WG): Sportschützen, Sammler
- ABK Gross (Art. 28 WG): Verbotene Waffen mit Ausnahme
- Ordonnanzwaffen (Art. 11 Abs. 2 WG): Sonderregel CH

PLATTFORM-WISSEN:
- Inserat aufgeben: Dashboard → Inserat erstellen → 4 Schritte
- Suche: Filter nach Kategorie, Kanton, Preis, Kaliber
- Rechtsstatus-Filter erklärt jeden Status mit Tooltip
- Schützenvereine: /vereine Seite
- Waffenrecht-Infos: /waffenrecht Seite
- Sicherheitstipps: /sicherheit Seite

TONALITÄT:
- Freundlich, hilfsbereit, sachlich
- Immer auf Deutsch (ausser User schreibt Französisch/Italienisch)
- Kurze Antworten (max 120 Wörter)
- Bei jedem Waffenrecht-Thema: kurzen Disclaimer anhängen"

NEUE CHATBOT-FEATURES:

1. src/components/chatbot/ChatPanel.tsx — Upgrade:

KONTEXTBEWUSSTE STARTER-CHIPS (je nach Seite):
- Auf Homepage: 
  "Wie funktioniert GunMarket.ch?"
  "Wie gebe ich ein Inserat auf?"
  "Welchen Rechtsstatus hat meine Waffe?"
  "Wo finde ich Schützenvereine?"

- Auf /suche:
  "Wie benutze ich die Filter?"
  "Was bedeutet WES-pflichtig?"
  "Kann ich nach Kanton suchen?"
  "Wie funktioniert die Kartensuche?"

- Auf /inserat/[id]:
  "Wie kontaktiere ich den Verkäufer?"
  "Was muss ich beim Kauf beachten?"
  "Was ist der richtige Rechtsstatus?"
  "Sicherheitstipps für die Übergabe"

- Auf /dashboard:
  "Wie optimiere ich mein Inserat?"
  "Wie lange ist mein Inserat aktiv?"
  "Wie antworte ich auf Nachrichten?"

2. CHAT VERLAUF PERSISTENZ:
   - sessionStorage (nur aktuelle Session)
   - Max 20 Nachrichten, dann älteste löschen

3. FEEDBACK BUTTONS:
   Nach jeder Antwort: 👍 👎 (klein, dezent)
   Thumbs down: öffnet kleines Textfeld "Was war nicht hilfreich?"

4. ESKALATIONS-FLOW:
   Wenn User 3x unzufrieden (thumbs down) oder 
   Schlüsselwörter wie "illegal", "verboten umgehen", 
   "ohne Bewilligung":
   → Antwort: "Für diese Frage empfehle ich, direkt 
     die kantonale Polizei oder fedpol zu kontaktieren: 
     fedpol.admin.ch/waffen"
   → Keine weiteren Antworten zu diesem Thema

5. QUICK-REPLY VORSCHLÄGE:
   Nach jeder Antwort: 2-3 Folge-Frage-Chips erscheinen
   Basierend auf dem Kontext der Antwort

6. CHAT-BUTTON UPGRADE:
   - Pulsierender grüner Ring (Attention-Animation)
   - Badge "NEU" für erste 30 Tage
   - Tooltip beim Hover: "Fragen? Ich helfe dir!"
   - Nach 30 Sekunden auf Seite: automatisch öffnen 
     (nur einmal pro Session)
```
