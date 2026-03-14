# GunMarket.ch — UX VERBESSERUNGEN (basierend auf Konkurrenz-Analyse)
# Direkt in Claude Code eingeben — alles ausführen ohne Rückfragen

```
Analysiere und verbessere folgende UX-Elemente basierend auf Best Practices.
Führe alle Änderungen direkt aus ohne Rückfragen.

## 1. HEADER — Vereinfachen

Datei: src/components/layout/Header.tsx

AKTUELL: Zu viele Elemente, komplexe Navigation
NEU: Ultra-kompakter Header wie erfolgreiche Marktplätze

Layout (eine Zeile):
- Links: Logo (klein, kompakt)
- Mitte: Suchleiste mit 3 Feldern IN EINER ZEILE:
  [Was suchst du?] [Ort / Kanton ▼] [🔍 Suchen]
  Suchfeld: flex-1, Kanton-Dropdown: 160px, Button: grün
- Rechts: "Mein Account" (ghost) + "+ Inserat aufgeben" (grün, kompakt)

Unter Header: Kategorie-Strip (bereits vorhanden, behalten)

Kein Hero mehr auf der Suchergebnisseite — Header IS die Suche.

## 2. KATEGORIE-ICONS — Von SVG zu runden Foto-Bubbles

Datei: src/components/home/HeroSection.tsx + überall wo Kategorien

AKTUELL: Rechteckige Kacheln mit SVG-Icons
NEU: Runde Bubbles (80px Circle) mit farbigem Hintergrund + Icon

Farben pro Kategorie:
- Kurzwaffen: roter Kreis (#dc2626)
- Büchsen: blauer Kreis (#2563eb)  
- Flinten: grüner Kreis (#16a34a)
- Jagdwaffen: brauner Kreis (#92400e)
- Ordonnanzwaffen: grauer Kreis (#4b5563)
- Freie Waffen: hellblauer Kreis (#0891b2)
- Optik: orangener Kreis (#ea580c)
- Zubehör: violetter Kreis (#7c3aed)
- Munition: dunkelroter Kreis (#991b1b)

Jeder Circle: weisses Icon zentriert, darunter Kategorie-Name (klein, grau)
Hover: scale-110, leichter Schatten
Horizontal scrollbar auf Mobile (snap-x)

## 3. LISTING CARDS — Minimalistischer

Datei: src/components/ui/ListingCard.tsx

AKTUELL: Zu viele Infos auf der Card
NEU: Fokus auf das Wesentliche

Grid Card (neu):
- Foto: aspect-[4/3], rounded-t-lg, object-cover
  Oben links: Foto-Anzahl Badge (weiss, "📷 3")
  Oben rechts: Merkliste-Star (⭐, outlined/filled)
- Body (padding 12px):
  - Titel: 1 Zeile, truncate, font-medium, 14px
  - Preis: gross, brand-green, Barlow Condensed, 20px, fett
    "VB" in klein grau daneben wenn verhandelbar
  - Unten: Ort links (klein, grau, Pin-Icon) | Datum rechts (klein, grau)
- Border: 1px solid #e5e7eb, rounded-lg
- Hover: shadow-md, cursor-pointer
- KEIN Rechtsstatus-Badge auf Card (zu komplex für Übersicht)

## 4. DETAILSEITE — Preis und CTA prominenter

Datei: src/app/inserat/[id]/page.tsx

AKTUELL: Preis zu klein, CTAs nicht prominent genug
NEU: Wie waffengebraucht.ch — Preis dominiert

Rechte Spalte (sticky) neu strukturieren:
┌─────────────────────────┐
│  CHF 650                │  ← Gelb/Grün Box, Barlow Condensed 36px
│  (VB)                   │
├─────────────────────────┤
│ ✉️  Nachricht senden    │  ← Blauer/Grüner Button, volle Breite, gross
├─────────────────────────┤
│ 📞  Telefon anzeigen    │  ← Zweiter Button (falls Verkäufer aktiviert)
├─────────────────────────┤
│ 👤 Haller Rudolf        │
│    Privater Nutzer      │
│    Aktiv seit: 2023     │
├─────────────────────────┤
│ [Teilen] [Melden]       │  ← Klein, ghost, nebeneinander
└─────────────────────────┘

Preis-Box: bg-amber-50, border border-amber-200, rounded-lg, p-4
Preis-Zahl: text-4xl, font-bold, text-amber-600 (wie Waffengebraucht gelb)

## 5. NAVIGATION — "Zurück" prominenter

Datei: src/app/inserat/[id]/page.tsx

Oben links: "← Zurück" Link (deutlich sichtbar, nicht nur Breadcrumb)
- text-brand-green, hover:underline
- Unter dem Header, vor allem anderen Inhalt
- Breadcrumb daneben: Kurzwaffen › Pistolen (mit Chevrons)

## 6. HOMEPAGE — Weniger Hero, mehr Content

Datei: src/app/page.tsx

AKTUELL: Grosser Hero nimmt viel Platz weg
NEU: Kompakter Hero, Inserate sofort sichtbar

Hero auf max 200px Höhe reduzieren:
- Nur Suchfeld (gross) + Quicksearch-Chips
- Kein langer Beschreibungstext
- Stats-Leiste beibehalten (kompakt)

Direkt darunter: Kategorien (runde Bubbles, siehe Punkt 2)
Dann sofort: "Neueste Inserate" Grid (4 Spalten)

## 7. SUCHLEISTE — Ort + Umkreis

Datei: src/components/layout/Header.tsx + src/app/page.tsx

Füge "Ort"-Feld zur Hauptsuche hinzu:
- Textfeld: Ortschaft oder Kanton eingeben
- Umkreis-Dropdown daneben: 10km / 25km / 50km / 100km / CH-weit
- Diese 3 Felder IMMER im Header sichtbar (nicht nur auf Suchseite)

Wenn User Ort eingibt → Nominatim Geocoding (bereits in DB)
→ Zeigt Inserate im gewählten Radius

## 8. INSERAT-MELDEN Button

Datei: src/app/inserat/[id]/page.tsx

Füge "Verdächtiges Inserat melden" Link hinzu:
- Klein, grau, unter den CTAs
- Öffnet Modal: Grund auswählen (Verdacht Betrug / Illegale Waffe / 
  Falscher Rechtsstatus / Andere)
- Email geht an info@gunmarket.ch
- Wichtig für Community-Vertrauen

Alle Änderungen direkt ausführen, TypeScript einhalten.
```
