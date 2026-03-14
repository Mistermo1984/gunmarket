# GunMarket.ch — UX NEXT LEVEL

Verbessere das gesamte UI/UX der Plattform auf professionelles Niveau.
Orientierung: homegate.ch, tutti.ch, ricardo.ch — modern, clean, Swiss precision.
Führe alle Änderungen direkt aus ohne Rückfragen.

---

## 1. MICRO-ANIMATIONS & TRANSITIONS

Datei: src/app/globals.css

Füge globale Transitions hinzu:
- Alle Buttons: transition-all duration-200 ease-out
- Alle Cards: hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200
- Alle Links: transition-colors duration-150
- Page transitions: fade-in Animation beim Laden (opacity 0→1, 300ms)

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in {
  animation: slideInRight 0.25s ease-out forwards;
}
```

---

## 2. LISTING CARDS — Komplettes Redesign

Datei: src/components/ui/ListingCard.tsx

GRID VARIANT (neue Version):
- Weisser Hintergrund, border border-brand-border, rounded-xl
- Hover: border-brand-green/40, shadow-md, -translate-y-0.5
- Foto: aspect-[4/3], object-cover, rounded-t-xl, overflow-hidden
  Hover auf Foto: scale-105 transition (nur das Foto, nicht die Card)
- Foto-Overlay (oben links): Rechtsstatus-Badge
- Foto-Overlay (oben rechts): Merkliste-Heart-Button
  Heart: weisser Circle mit Schatten, hover:scale-110
  Gefüllt (rot) wenn gespeichert, outline wenn nicht
- Preis: Barlow Condensed, 22px, brand-green, fett
- Titel: 2 Zeilen max, text-ellipsis
- Meta-Info: Kaliber · Kanton · Datum — klein, grau, mit Dots als Trenner
- Anbieter-Badge: unten links, "Privat" grau oder "Händler" grün
- Aufrufe: unten rechts, Auge-Icon + Zahl, klein grau

LIST VARIANT:
- Horizontal, 120px Foto links (quadratisch, rounded-lg)
- Alle Infos rechts davon
- Rechtsstatus-Badge inline neben Titel
- Preis gross rechts aussen
- Hover: linker grüner Border (4px) erscheint

---

## 3. HOMEPAGE HERO — Upgrade

Datei: src/components/home/HeroSection.tsx

- Hintergrund: Subtiles Muster (SVG crosshatch, sehr hell, opacity 0.03)
  oder: Gradient von brand-green/5 zu transparent
- Suchfeld: grösser (h-14), Schatten, beim Focus: grüner Ring
- Kategorie-Dropdown im Suchfeld: mit Icons
- "Suchen" Button: Icon + Text, hover: leicht dunkler grün
- Unter Suchfeld: Schnellsuche-Chips animiert einblenden:
  "SIG Sauer" · "Glock" · "K31" · "Remington" · "Jagdwaffen"
  Chips: klickbar, füllen Suchfeld

- STATS-LEISTE unter Hero (neu):
  3 Zahlen nebeneinander, getrennt durch vertikale Linien:
  "2'847 Inserate" | "1'203 Verkäufer" | "26 Kantone"
  Zahlen in Barlow Condensed, brand-green
  Animierter Counter (countUp von 0 bis Endwert beim Laden)

---

## 4. KATEGORIE-GRID — Upgrade

Datei: src/components/home/NeusteInserate.tsx oder Kategorie-Section

Kategorie-Kacheln:
- Hover: brand-green Hintergrund, weisser Text, Icon wird weiss
- Aktive/Hover Kachel: leichte Scale-up (scale-105)
- Icon: SVG-Icons (bereits vorhanden), zentriert, 32px
- Unter Icon: Kategorie-Name + "(142 Inserate)" in klein grau
- Border: 1px solid brand-border, hover: brand-green

---

## 5. FILTER SIDEBAR — Upgrade

Datei: src/components/suche/FilterSidebar.tsx

- Jeder Filter-Block: collapsible mit smooth Animation (max-height transition)
- Aktive Filter: oben als removable Chips anzeigen
  "× Kanton: Bern" "× Preis: bis CHF 500" etc.
  "Alle Filter löschen" Link rechts
- Preis-Slider: Custom styled (grün, rund, Schatten)
- Kanton Checkboxen: Custom Checkbox Styling (grüner Haken)
- "X Filter aktiv" Badge auf Filter-Button (mobile)

---

## 6. SUCHERGEBNISSE — Upgrade

Datei: src/components/suche/ListingGrid.tsx

- Skeleton Loading State:
  Beim Laden: graue animierte Platzhalter (pulse Animation)
  für 6 Cards gleichzeitig sichtbar
  ```
  Skeleton Card: grauer Block oben (Foto), 
  3 graue Linien unten (Titel, Meta, Preis)
  animate-pulse bg-gray-200 rounded
  ```
- Keine Ergebnisse State:
  Illustration (SVG leere Suche), 
  "Keine Inserate gefunden" + "Filter anpassen" Button
- Pagination: Modernere Optik, aktive Seite grün ausgefüllt

---

## 7. HEADER — Upgrade

Datei: src/components/layout/Header.tsx

- Suchfeld im Header: beim Focus ausklappen (width animation)
- Kategorie-Strip: Active-State mit grünem Underline-Indicator
  der smooth zur aktiven Kategorie slidet
- "Inserat aufgeben" Button: pulsierender grüner Ring-Effekt
  (subtle attention animation, 3s loop)
- Mobile Header: Suchfeld als eigene Zeile wenn geöffnet (slide down)
- Scroll-Verhalten: Header wirft beim Scrollen leichten Schatten

---

## 8. INSERAT DETAILSEITE — Upgrade

Datei: src/app/inserat/[id]/page.tsx

- Foto-Galerie: Keyboard Navigation (← →), Touch Swipe Support
- Haupt-Foto: smooth crossfade beim Thumbnail-Wechsel (opacity transition)
- "Nachricht senden" Button: sticky auf Mobile (fixed bottom bar)
- Preis: animate-pulse einmal beim Laden (attention)
- Ähnliche Inserate: Horizontal scroll mit Snap-Scrolling
- Breadcrumb: mit Chevron-Icons zwischen den Stufen
- Back-Button: "← Zurück zur Suche" oben links, ghost style

---

## 9. DASHBOARD — Upgrade

Datei: src/app/dashboard/page.tsx + layout

- Stats-Kacheln: animierter Counter beim ersten Laden
- Sidebar Nav-Items: hover mit grünem Left-Border Slide-in
- Aktiver Nav-Item: grüner Punkt vor dem Text
- Inserate-Tabelle: Row-Hover mit sanftem grau Hintergrund
- Status-Toggle: smooth Pill-Animation (grün ↔ grau)
- Success/Error Toasts: oben rechts, slide-in, auto-dismiss nach 3s
  Grün für Erfolg (Checkmark Icon), Rot für Fehler (X Icon)

---

## 10. GLOBAL TOAST SYSTEM

Neue Datei: src/components/ui/Toast.tsx
Neue Datei: src/hooks/useToast.ts

```typescript
// Toast Typen: success | error | warning | info
// Positon: top-right, fixed
// Animation: slide in von rechts, fade out
// Auto-dismiss: 3 Sekunden
// Max 3 gleichzeitig sichtbar
// X-Button zum manuellen Schliessen
```

Integriere Toast in:
- Dashboard Inserat Status Toggle: "Inserat pausiert" / "Inserat aktiviert"
- Dashboard Löschen: "Inserat gelöscht"
- Profil speichern: "Profil gespeichert"
- Nachricht senden: "Nachricht gesendet"
- Merkliste: "Zur Merkliste hinzugefügt" / "Entfernt"

---

## 11. EMPTY STATES — Überall einheitlich

Erstelle: src/components/ui/EmptyState.tsx

Props: icon, title, description, ctaLabel, ctaHref

Verwende überall:
- Merkliste leer: Herz-Icon, "Noch nichts gespeichert", "Jetzt stöbern"
- Keine Nachrichten: Chat-Icon, "Keine Nachrichten", "Inserate anschauen"  
- Keine Inserate: Liste-Icon, "Noch keine Inserate", "Erstes Inserat aufgeben"
- Keine Suchergebnisse: Suche-Icon, "Nichts gefunden", "Filter zurücksetzen"

---

## 12. MOBILE OPTIMIERUNGEN

- Bottom Sheet für Filter (statt Sidebar) auf Mobile
  Slide-up Animation, Backdrop-Blur Hintergrund
- Floating Action Button (FAB): "+" unten rechts auf Mobile
  Direkt-Link zu /dashboard/inserat-erstellen
  brand-green, Schatten, bounce-in Animation
- Touch-Targets: alle Buttons min. 44px height
- Swipe-to-dismiss auf Toast Messages

---

## DESIGN TOKENS (falls nicht vorhanden, zu globals.css hinzufügen)

```css
:root {
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-hover: 0 4px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.15);
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
  --radius-card: 12px;
  --radius-btn: 8px;
}
```

Alle Änderungen direkt ausführen, keine Rückfragen.
TypeScript strict mode einhalten.
Keine neuen npm packages ausser bereits installierten.
