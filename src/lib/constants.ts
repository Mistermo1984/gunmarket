import React from "react";
import {
  PistolenIcon,
  RevolverIcon,
  RepetierIcon,
  HalbautomatIcon,
  JagdbuechseIcon,
  OrdonnanzIcon,
  BockflinteIcon,
  LuftwaffeIcon,
  SchreckschussIcon,
  OptikIcon,
  MunitionIcon,
  MagazinIcon,
  HolsterIcon,
  WiederladenIcon,
  ReinigungIcon,
  KurzwaffenIcon,
  BuechsenIcon,
  FreieWaffenIcon,
  ZubehoerGruppeIcon,
  ZielfernrohrIcon,
  RotpunktIcon,
  FernglasIcon,
  MontageIcon,
} from "@/components/ui/WeaponIcons";

// ─── Kategorie-Interfaces ────────────────────────────────────

export interface Unterkategorie {
  id: string;
  label: string;
  iconComponent: React.ComponentType<{ className?: string; size?: number }>;
}

export interface Hauptkategorie {
  id: string;
  label: string;
  iconComponent: React.ComponentType<{ className?: string; size?: number }>;
  unterkategorien: Unterkategorie[];
}

// ─── Hauptkategorien mit Unterkategorien ─────────────────────

export const HAUPTKATEGORIEN: Hauptkategorie[] = [
  {
    id: "kurzwaffen",
    label: "Kurzwaffen",
    iconComponent: KurzwaffenIcon,
    unterkategorien: [
      { id: "pistolen", label: "Pistolen", iconComponent: PistolenIcon },
      { id: "revolver", label: "Revolver", iconComponent: RevolverIcon },
    ],
  },
  {
    id: "langwaffen",
    label: "Langwaffen",
    iconComponent: BuechsenIcon,
    unterkategorien: [
      { id: "buechsen", label: "Büchsen", iconComponent: RepetierIcon },
      { id: "flinten", label: "Flinten", iconComponent: BockflinteIcon },
      { id: "jagdwaffen", label: "Jagdwaffen", iconComponent: JagdbuechseIcon },
      { id: "andere-langwaffen", label: "Andere Langwaffen", iconComponent: HalbautomatIcon },
    ],
  },
  {
    id: "ordonnanzwaffen",
    label: "Ordonnanzwaffen",
    iconComponent: OrdonnanzIcon,
    unterkategorien: [
      { id: "kurzwaffen-ordonnanz", label: "Kurzwaffen Ordonnanz", iconComponent: PistolenIcon },
      { id: "langwaffen-ordonnanz", label: "Langwaffen Ordonnanz", iconComponent: OrdonnanzIcon },
    ],
  },
  {
    id: "luftdruckwaffen",
    label: "Luftdruckwaffen",
    iconComponent: FreieWaffenIcon,
    unterkategorien: [
      { id: "luftpistolen", label: "Luftpistolen", iconComponent: PistolenIcon },
      { id: "luftgewehre", label: "Luftgewehre", iconComponent: LuftwaffeIcon },
      { id: "co2-waffen", label: "CO2 Waffen", iconComponent: SchreckschussIcon },
    ],
  },
  {
    id: "optik",
    label: "Optik",
    iconComponent: OptikIcon,
    unterkategorien: [
      { id: "zielfernrohre", label: "Zielfernrohre", iconComponent: ZielfernrohrIcon },
      { id: "rotpunktvisiere", label: "Rotpunktvisiere", iconComponent: RotpunktIcon },
      { id: "fernglaeser", label: "Ferngläser", iconComponent: FernglasIcon },
      { id: "montagen", label: "Montagen", iconComponent: MontageIcon },
    ],
  },
  {
    id: "zubehoer",
    label: "Zubehör",
    iconComponent: ZubehoerGruppeIcon,
    unterkategorien: [
      { id: "magazine", label: "Magazine", iconComponent: MagazinIcon },
      { id: "holster", label: "Holster", iconComponent: HolsterIcon },
      { id: "lauefe-teile", label: "Läufe & Teile", iconComponent: WiederladenIcon },
      { id: "reinigung", label: "Reinigung", iconComponent: ReinigungIcon },
      { id: "andere-zubehoer", label: "Andere", iconComponent: ZubehoerGruppeIcon },
    ],
  },
  {
    id: "munition",
    label: "Munition",
    iconComponent: MunitionIcon,
    unterkategorien: [],
  },
];

// ─── Flache Kategorienliste ──────────────────────────────────

export const KATEGORIEN_FLAT: Unterkategorie[] = HAUPTKATEGORIEN.flatMap(
  (hk) => hk.unterkategorien
);

// ─── Category groups for sidebar display ─────────────────────

export const WAFFEN_IDS = ["kurzwaffen", "langwaffen", "ordonnanzwaffen", "luftdruckwaffen"];
export const ZUBEHOER_IDS = ["optik", "zubehoer", "munition"];

// Backward compat: old slug → current slug
export const CATEGORY_ALIASES: Record<string, string> = {
  buechsen: "langwaffen",
  flinten: "langwaffen",
  jagdwaffen: "langwaffen",
  "freie-waffen": "luftdruckwaffen",
};

// ─── Rechtsstatus-Filter ─────────────────────────────────────

export interface RechtstatusFilter {
  id: string;
  label: string;
  kurzlabel: string;
  farbe: string;
  textfarbe: string;
  icon: string;
  tooltip: string;
  dokumente: string[];
}

export const RECHTSSTATUS_FILTER: RechtstatusFilter[] = [
  {
    id: "frei",
    label: "Frei erhältlich",
    kurzlabel: "Frei",
    farbe: "bg-gray-100",
    textfarbe: "text-gray-700",
    icon: "CheckCircle",
    tooltip:
      "Kein Waffenerwerbsschein nötig. Nur schriftlicher Kaufvertrag erforderlich.",
    dokumente: [
      "Schriftlicher Kaufvertrag (10 Jahre aufbewahren)",
      "Ausweis/Pass beider Parteien",
      "Kopie an Kantonspolizei senden",
    ],
  },
  {
    id: "wes",
    label: "WES-pflichtig",
    kurzlabel: "WES",
    farbe: "bg-amber-100",
    textfarbe: "text-amber-800",
    icon: "FileText",
    tooltip:
      "Waffenerwerbsschein (WES) beim kantonalen Waffenbüro beantragen. Gilt für Pistolen, Revolver, Halbautomaten (Magazin \u226410).",
    dokumente: [
      "Gültiger Waffenerwerbsschein (WES)",
      "WES gilt für max. 3 Waffen",
      "Ausweis/Pass beider Parteien",
      "Kauf beim Händler: gleicher Tag",
      "Privatkauf: schriftlicher Vertrag + WES",
    ],
  },
  {
    id: "abk-klein",
    label: "ABK Klein",
    kurzlabel: "ABK Klein",
    farbe: "bg-orange-100",
    textfarbe: "text-orange-800",
    icon: "Award",
    tooltip:
      "Ausnahmebewilligung (ABK) — kantonal. Für verbotene Waffen: Vollautomaten, Schalldämpfer, Nachtsichtzielgeräte, Laser-Zielgeräte. Sehr restriktiv — beim kantonalen Waffenbüro anfragen.",
    dokumente: [
      "Ausnahmebewilligung klein (kant. Waffenbüro)",
      "Sportschütze: Nachweis aktiver Schiesssport",
      "Sammler: Sicherheitskonzept + Waffenverzeichnis",
      "Ausweis/Pass beider Parteien",
      "Schriftlicher Kaufvertrag",
    ],
  },
  {
    id: "ordonnanz",
    label: "Ordonnanzwaffe",
    kurzlabel: "Ordonnanz",
    farbe: "bg-green-100",
    textfarbe: "text-green-800",
    icon: "Shield",
    tooltip:
      "Persönliche Ordonnanzwaffe aus Schweizer Militärdienst. Weitergabe an Dritte erfordert WES beim Empfänger (Art. 11 WG).",
    dokumente: [
      "WES beim Käufer erforderlich",
      "Nachweis Militärdienstabschluss des Verkäufers",
      "Schriftlicher Kaufvertrag",
      "Meldung an Kantonspolizei",
    ],
  },
];

// ─── Kantone ─────────────────────────────────────────────────

export interface Kanton {
  id: string;
  label: string;
}

export const KANTONE: Kanton[] = [
  { id: "ag", label: "Aargau" },
  { id: "ai", label: "Appenzell I." },
  { id: "ar", label: "Appenzell A." },
  { id: "be", label: "Bern" },
  { id: "bl", label: "Basel-Landschaft" },
  { id: "bs", label: "Basel-Stadt" },
  { id: "fr", label: "Freiburg" },
  { id: "ge", label: "Genf" },
  { id: "gl", label: "Glarus" },
  { id: "gr", label: "Graubünden" },
  { id: "ju", label: "Jura" },
  { id: "lu", label: "Luzern" },
  { id: "ne", label: "Neuenburg" },
  { id: "nw", label: "Nidwalden" },
  { id: "ow", label: "Obwalden" },
  { id: "sg", label: "St. Gallen" },
  { id: "sh", label: "Schaffhausen" },
  { id: "so", label: "Solothurn" },
  { id: "sz", label: "Schwyz" },
  { id: "tg", label: "Thurgau" },
  { id: "ti", label: "Tessin" },
  { id: "ur", label: "Uri" },
  { id: "vd", label: "Waadt" },
  { id: "vs", label: "Wallis" },
  { id: "zg", label: "Zug" },
  { id: "zh", label: "Zürich" },
];

// ─── Kaliber-Gruppen ─────────────────────────────────────────
// Re-exported from calibers.ts (single source of truth)

export type { CaliberGroup as KaliberGruppe } from "@/lib/calibers";
export { CALIBER_GROUPS as KALIBER_GRUPPEN } from "@/lib/calibers";

// ─── Zustand ─────────────────────────────────────────────────

export interface ZustandOption {
  id: string;
  label: string;
}

export const ZUSTAND_OPTIONEN: ZustandOption[] = [
  { id: "neu", label: "Neu" },
  { id: "sehr-gut", label: "Sehr gut" },
  { id: "gut", label: "Gut" },
  { id: "akzeptabel", label: "Akzeptabel" },
  { id: "defekt", label: "Defekt" },
];

// ─── Anbieter-Typ ────────────────────────────────────────────

export interface AnbieterTyp {
  id: string;
  label: string;
}

export const ANBIETER_TYP: AnbieterTyp[] = [
  { id: "privat", label: "Privat" },
  { id: "haendler", label: "Händler" },
];

// ─── Rechtlicher Disclaimer ─────────────────────────────────

export const RECHTLICHER_DISCLAIMER =
  "GunMarket.ch gibt keine Rechtsauskunft. Die angezeigten Rechtsinformationen sind unverbindlich und dienen nur der Orientierung. Massgebend ist das geltende Bundesgesetz über Waffen (WG) sowie die kantonalen Bestimmungen. Bei Unklarheiten wenden Sie sich an Ihr kantonales Waffenbüro.";

// ─── Optik-Attribute (Inserat-Erstellung) ────────────────────

export const OPTIK_ATTRIBUTE = {
  hersteller: [
    "Zeiss", "Swarovski", "Leica", "Nightforce",
    "Schmidt & Bender", "Kahles", "Leupold", "Vortex",
    "Aimpoint", "EOTech", "Trijicon", "Holosun",
    "March", "Steiner", "Minox", "Andere",
  ],
  vergroesserung: [
    "1x (Fix)", "1-4x", "1-6x", "1-8x", "1-10x",
    "2-10x", "2.5-10x", "3-12x", "3-15x", "4-16x",
    "5-20x", "5-25x", "6-24x", "Fix 4x", "Fix 6x",
  ],
  tubus_durchmesser: [
    "25.4mm (1\")", "30mm", "34mm", "35mm", "36mm",
  ],
  absehen_typ: [
    "Absehen 1 (oben)", "Absehen 4 (unten)",
    "BDC", "MIL-Dot", "MOA", "MRAD",
    "Leuchtabsehen", "Ohne Leuchtpunkt",
  ],
  absehen_ebene: [
    "Erste Bildebene (FFP)",
    "Zweite Bildebene (SFP)",
  ],
  objektiv_durchmesser: [
    "40mm", "42mm", "44mm", "50mm", "56mm", "Andere",
  ],
  zustand: [
    "Neu (OVP)", "Wie neu", "Sehr gut", "Gut", "Akzeptabel",
  ],
} as const;

// ─── Munition-Attribute (Inserat-Erstellung) ─────────────────

export const MUNITION_ATTRIBUTE = {
  kaliber: [
    // Büchse
    "7.5×55 Swiss (GP11)", ".308 Win / 7.62×51",
    ".223 Rem / 5.56×45", "6.5 Creedmoor",
    "7×64", "7×65R", "8×57 IS", "9.3×62", "9.3×74R",
    ".30-06 Springfield", ".300 Win Mag", ".338 Lapua Magnum",
    ".270 Win", "6.5×55 Swedish", "7×57R", "30R Blaser",
    // Pistole/Revolver
    "9mm Luger", ".45 ACP", ".40 S&W", ".357 Magnum",
    ".38 Special", ".44 Magnum", ".380 ACP", "7.65mm Browning",
    // Randfeuer
    ".22 LR", ".22 WMR", ".17 HMR",
    // Flinte
    "12/70", "12/76", "20/70", "20/76", ".410",
    // Andere
    "Sonstige",
  ],
  geschoss_typ: [
    "Vollmantel (FMJ)", "Teilmantel (SP)", "Hohlspitz (HP/JHP)",
    "Bleigeschoss", "Kupfergeschoss (bleifrei)",
    "Schrot", "Flintenlaufgeschoss (Slug)",
    "Trainingsmunition", "Subsonic", "Match / Präzision",
  ],
  menge: [
    "20 Schuss", "25 Schuss", "50 Schuss", "100 Schuss",
    "250 Schuss", "500 Schuss", "1000 Schuss", "Andere Menge",
  ],
  hersteller: [
    "RUAG / Thun", "Geco", "Sellier & Bellot",
    "Federal", "Hornady", "Lapua", "Norma",
    "RWS", "Winchester", "PMC", "Fiocchi",
    "Magtech", "PPU (Prvi Partizan)", "Andere",
  ],
  zustand: [
    "Neu (Fabrikverpackung)", "Neu (lose)", "Wiedergeladen",
  ],
} as const;
