# GunMarket.ch — BUILDPLAN

## STEP 8: User Dashboard

1. LAYOUT src/app/dashboard/layout.tsx
   Zweispaltig:
   - Linke Sidebar: 260px, weiss, border-right
   - Rechter Content: flex-1, hellgrauer Hintergrund

   SIDEBAR Navigation:
   - Oben: User-Avatar (Initialen-Circle, brand-green) 
     + Username + "Privat" oder "Händler" Badge
   - Nav-Items mit Lucide Icons:
     Übersicht          /dashboard
     Meine Inserate     /dashboard/inserate
     Merkliste          /dashboard/merkliste
     Nachrichten        /dashboard/nachrichten
     Profil             /dashboard/profil
     Einstellungen      /dashboard/einstellungen
   - Aktiver Link: brand-green Hintergrund, grüner linker Border (4px)
   - Unten in Sidebar: "Abmelden" Button (ghost, rot)
   - Mobile: Bottom-Navigation Bar (5 Icons)

2. src/app/dashboard/page.tsx — ÜBERSICHT
   STATS-ROW (4 Kacheln): Aktive Inserate / Gesamtaufrufe / Auf Merkliste / Neue Nachrichten
   Jede Kachel: weiss, rounded, shadow, Zahl in Barlow Condensed gross, grün

   MEINE LETZTEN INSERATE:
   - Max 3 neueste Inserate als kompakte Zeilen
   - Spalten: Foto · Titel · Status · Aufrufe · Datum
   - "Neues Inserat erstellen" Button grün oben rechts

   LETZTE AKTIVITÄT:
   - "Ihr Inserat 'SIG Sauer P226' wurde 12x angesehen"
   - "Neue Nachricht für 'K31 Karabiner'"
   - "Inserat 'Glock 17' wurde auf Merkliste gesetzt"

   QUICK-ACTIONS: "Neues Inserat" (grün) / "Profil vervollständigen" (amber) / "Waffenrecht CH" (grau)

3. src/app/dashboard/inserate/page.tsx — MEINE INSERATE
   - Tab-Filter: Alle · Aktiv · Pausiert · Abgelaufen
   - Tabelle: Foto · Titel + Details · Status Toggle · Aufrufe · Edit · Delete
   - STATUS TOGGLE: "● Aktiv" ↔ "○ Pausiert" mit Animation
   - LÖSCH-CONFIRMATION Modal mit rotem Button
   - LEERER STATE mit SVG + CTA
   - MOCK-DATEN: 4 Inserate (Mix Aktiv/Pausiert)

4. src/app/dashboard/merkliste/page.tsx
   - Grid 3 Spalten, ListingCard + X-Button zum Entfernen
   - Leerer State + 4 Mock-Listings

5. src/app/dashboard/nachrichten/page.tsx
   - Zweispaltig: Konversationsliste links (300px) + aktive Konversation rechts
   - Bubbles: Empfangen links grau, Gesendet rechts brand-green
   - Hinweis-Box amber: "Geben Sie niemals Vorauszahlungen."
   - MOCK: 2 Konversationen mit je 3-4 Nachrichten

6. src/app/dashboard/profil/page.tsx
   - Avatar-Circle + Formular (Vorname, Nachname, Email read-only, Telefon +41, Kanton, Über mich)
   - Händler-Felder: Firmenname, UID, Bewilligungs-Nr., Website

7. src/app/dashboard/einstellungen/page.tsx
   - Benachrichtigungs-Toggles
   - Passwort ändern (expandierbar)
   - Daten exportieren (DSG Art. 25)
   - Konto löschen (rot, Modal mit Passwort-Bestätigung, Hinweis auf 24-Monate Aufbewahrung Art. 10a WG)

TypeScript, responsive, mobile-first. Mock-Daten realistisch (Schweizer Kontext). Lucide-react Icons.

---

## STEP 9: Inserat erstellen (4-Step Wizard)

src/app/dashboard/inserat-erstellen/page.tsx

PROGRESS BAR: 4 Schritte: Kategorie · Details · Fotos · Vorschau

SCHRITT 1 — KATEGORIE & RECHTSSTATUS:
- 9 Hauptkategorie-Kacheln mit Icons
- Unterkategorie Dropdown nach Auswahl
- 6 Rechtsstatus-Kacheln (aus constants.ts, farbig)
- Info-Box: Link zu /waffenrecht

SCHRITT 2 — DETAILS:
Linke Spalte: Titel* (80 Zeichen), Marke*, Modell*, Kaliber (Dropdown), Zustand*, Baujahr, Lauflänge, Magazin
Rechte Spalte: Preis* CHF, Verhandelbar Toggle, Tausch Toggle, Kanton*, Ortschaft*, Beschreibung* (20-2000 Zeichen)
Inline-Validierung rot.

SCHRITT 3 — FOTOS:
- Drag & Drop Zone, max 8 Fotos, max 10MB, JPG/PNG/WEBP
- Thumbnail-Grid mit X-Button, erstes Foto = Hauptbild
- Drag-to-reorder
- Base64 im State (echtes Upload kommt mit Step 13)

SCHRITT 4 — VORSCHAU & BESTÄTIGUNG:
- Vollständige Inserat-Vorschau
- 4 Pflicht-Checkboxen (18+, Rechtmässiger Besitz, Art. 10a WG, AGB)
- "Inserat veröffentlichen" (grün, disabled bis alle Checkboxen)
- Redirect zu /dashboard/inserate + Success-Toast

Komponenten:
- src/components/inserat/CategoryStep.tsx
- src/components/inserat/DetailsStep.tsx
- src/components/inserat/PhotosStep.tsx
- src/components/inserat/PreviewStep.tsx
- src/components/inserat/ProgressBar.tsx

---

## STEP 10: Inserat Detailseite

src/app/inserat/[id]/page.tsx

BREADCRUMB: Startseite › Kurzwaffen › Pistolen › SIG Sauer P226

HAUPTBEREICH (zweispaltig 60/40):

LINKE SPALTE:
- Foto-Galerie: Hauptbild + Thumbnail-Strip + Lightbox (ESC zum Schliessen)
- Details-Box: Titel H1, Rechtsstatus-Badge, Preis grün gross
- Spezifikationen-Grid 2 Spalten mit Lucide Icons: Marke/Modell/Kaliber/Zustand/Baujahr/Lauflänge/Magazin/Kategorie
- Beschreibung (max 5 Zeilen + "Mehr anzeigen")

RECHTE SPALTE (sticky):
- Verkäufer-Box: Avatar + Name + Badge + Mitglied seit + Verifiziert
- Kontakt-Box (grüner Rahmen): "Nachricht senden" Modal + 3 Template-Nachrichten
- Standort-Box: Kanton/Ortschaft + Mini-Leaflet-Karte (Ortschaft-Ebene, nicht genaue Adresse)
- Sicherheits-Hinweis amber: Link zu /sicherheit
- Merkliste-Button (Toggle Herz-Icon)

META: Inserat-Nr. · Aufrufe · Eingestellt am · Zuletzt aktualisiert

ÄHNLICHE INSERATE: Horizontal scroll, 4 ListingCards, gleiche Kategorie

MOCK: SIG Sauer P226, 9mm, CHF 650, Bern, WES, Verkäufer Hans M., 5 Fotos von picsum.photos

Komponenten:
- src/components/inserat/ImageLightbox.tsx
- src/components/inserat/KontaktModal.tsx
Leaflet dynamic import (ssr: false).

---

## STEP 11: Schützenvereine Verzeichnis

src/app/vereine/page.tsx

HERO (kompakt): "Schützenvereine in der Schweiz" + Suchfeld

FILTER-LEISTE: Kanton Dropdown · Disziplin (Alle/Pistole/Gewehr/300m/25m/Jagd/Feldschiessen/IPSC) · Neumitglieder Toggle

VEREINS-GRID (3 Spalten):
Jede Karte: Vereinsname · Kanton/Ortschaft · Disziplin-Badges · Mitgliederzahl · "Neumitglieder willkommen" Badge · Kontakt + Website

MOCK: 12 Vereine (Bern, Zürich, Luzern, GR, BS, SG, AG, VS, TI, FR, SO, NE)

SSV INFO-BOX: Hinweis auf SSV + externer Link

LEAFLET-KARTE: Alle Vereine als Marker, Klick = Popup mit Vereinsinfo

DISCLAIMER: "Angaben ohne Gewähr."

---

## STEP 12: Claude KI-Chatbot (Waffenrecht-Assistent)

FLOATING BUTTON (alle Seiten):
src/components/chatbot/ChatButton.tsx
- Fixed unten rechts, grüner Circle, "Waffenrecht KI" Label

CHAT PANEL:
src/components/chatbot/ChatPanel.tsx
- Slide-in von rechts, 350px breit
- Header: "Waffenrecht-Assistent" + Disclaimer "Keine Rechtsberatung"
- Starter-Chips: "Brauche ich einen WES?" / "Was ist eine Vertragswaffe?" / "Wie kaufe ich eine Ordonnanzwaffe?" / "Was darf ich als Tourist kaufen?"
- Nachrichten-Bubbles (User rechts grün, Assistent links grau)
- Typing Indicator (3 Punkte animiert)
- Amber Disclaimer-Box (immer sichtbar)

API ROUTE:
src/app/api/chatbot/route.ts
- POST, ruft claude-sonnet-4-20250514 auf
- System-Prompt: Experte Schweizer Waffengesetz (WG SR 514.54), antwortet auf Deutsch, max 150 Wörter, immer Disclaimer, verweist auf fedpol.admin.ch bei Unsicherheit, nennt konkrete Gesetzesartikel
- Streaming Response (ReadableStream)
- Rate Limit: 20 Anfragen/Stunde pro IP
- API Key: process.env.ANTHROPIC_API_KEY

---

## STEP 13: SQLite Datenbank + API Routes

npm install better-sqlite3 @types/better-sqlite3 sharp multer @types/multer

SCHEMA src/lib/db.ts (better-sqlite3):

users: id, email, password_hash, vorname, nachname, anbieter_typ, telefon, kanton, ueber_mich, firmenname, uid_nummer, bewilligungs_nr, website, email_verified, created_at, updated_at

listings: id, user_id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus, marke, modell, kaliber, zustand, baujahr, lauflange, magazin, preis, verhandelbar, tausch, kanton, ortschaft, plz, lat, lng, status (aktiv|pausiert|abgelaufen|geloescht), aufrufe, created_at, updated_at

listing_images: id, listing_id, url, position, is_main

favorites: id, user_id, listing_id, created_at

messages: id, sender_id, receiver_id, listing_id, content, read_at, created_at

API ROUTES:
GET/POST /api/listings
GET/PUT/DELETE /api/listings/[id]
GET /api/listings/nearby?lat=&lng=&radius= (Haversine)
POST /api/listings/[id]/view
GET/POST /api/favorites
DELETE /api/favorites/[id]
GET/POST /api/messages

SEED: src/lib/seed.ts — 20 Inserate, 5 User, realistische CH-Daten

GEOCODING: src/lib/geocoding.ts — Nominatim API, 1 req/sec, DB-Caching

IMAGE UPLOAD: src/app/api/upload/route.ts — Sharp Resize max 1200px, /public/uploads/, max 8 Bilder je 10MB

---

## STEP 14: Leaflet Karte + Radius-Suche

npm install react-leaflet leaflet @types/leaflet react-leaflet-cluster

SPLIT VIEW in /suche:
- "Karte" Toggle Button in ErgebnisHeader
- 50/50 Layout: Listings links scrollbar, Karte rechts sticky

src/components/map/MapView.tsx:
- DYNAMIC IMPORT ssr:false (Pflicht für Next.js!)
- OpenStreetMap Tiles
- MarkerClusterGroup
- Grüne Custom-Marker
- Klick = Popup mit Foto/Titel/Preis/"Anzeigen"
- Hover auf ListingCard = Marker pulst

src/components/map/LocationSearch.tsx:
- "In meiner Nähe" Button (Geolocation API)
- Nominatim Autocomplete
- Radius-Slider: 10/25/50/100 km
- Grüner Radius-Kreis auf Karte

src/hooks/useGeoFilter.ts:
- Haversine-Distanzberechnung
- Gibt gefilterte Listings zurück

Schweiz Bounds: SW [45.8, 5.9] NE [47.8, 10.5]
Default Center: [46.8, 8.2] Zoom: 8
CSS: import 'leaflet/dist/leaflet.css' in layout
