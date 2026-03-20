// Comprehensive caliber list based on munitionsdepot.ch
// Used by CaliberSelect component, FilterSidebar, and DetailsStep

export interface CaliberGroup {
  gruppe: string;
  kaliber: string[];
}

export const CALIBER_GROUPS: CaliberGroup[] = [
  {
    gruppe: "Randfeuer",
    kaliber: [
      ".17 HMR", ".22 short", ".22 LR", ".22 WMR", "6mm Platz", "6mm Flobert", "9mm Flobert",
    ],
  },
  {
    gruppe: "Pistolen",
    kaliber: [
      "4.6x30mm", "5.7x28mm", "6.35 Browning", "7.62x25mm Tokarev", "7.63 Mauser",
      "7.65 Browning", "7.65 Para", "8mm Steyr", ".380 ACP / 9mm kurz", "9x18 Police",
      "9mm Makarov", "9mm Browning Long", "9mm Para", "9x21", ".38 Super Auto",
      ".357 SIG", ".40 S&W", "10mm Auto", ".45 ACP", ".45 G.A.P", ".50 AE",
    ],
  },
  {
    gruppe: "Revolver",
    kaliber: [
      ".32 S&W Long", ".38 S&W", ".38 Special", ".357 Mag", ".44 Mag", ".45 Colt",
      ".454 Casull", "7.5 Swiss Revolver", "7.62 Nagant", ".45 Schofield",
      ".460 S&W Mag", ".500 S&W Mag",
    ],
  },
  {
    gruppe: "Gewehr",
    kaliber: [
      ".17 Hornet", ".22 Hornet", ".222 Rem", "5.45x39", ".223 Rem / 5.56 NATO / GP90",
      "5.6x50R", "5.6x52R", ".243 Win", ".25-20 Win", "6.5 Creedmoor", "6.5 Grendel",
      "6.5x47 Lapua", "6.5x55 Swedish", "6.5x65R", ".270 Win", ".277 Fury", ".280 Rem",
      "7x57", "7x57R", "7x64", "7x65R", "7mm Rem Mag", "7mm-08 Rem", "7.62x39",
      "7.62x53R", "7.62x54R", ".300 BLK / Whisper", ".338 ARC", ".300 PRC", ".300 WSM",
      ".300 RUM", ".300 Wby Mag", ".300 Win Mag", ".30-30 Win", ".30 Carbine",
      ".30 R Blaser", ".30-06 Springfield", ".303 British", ".307 Win", ".308 Norma Mag",
      ".308 Win / 7.62x51", ".308 Mar Exp", "7.5x54 French", "7.5x55mm / GP11",
      "7.65x53 Argentine", ".30-378 Wby Mag", "7.92x33 Kurz", "8x50R Lebel", "8x56RS",
      "8x57 IS", "8x57 JRS", "8x60 S", "8x68 S", ".32 Win Special", ".32-20 Win",
      ".338 Lapua Mag", ".338 Norma Mag", ".375 H&H Mag", ".375 Ruger", ".375 Cheytac",
      "9.3x57", "9.3x62", "9.3x72R", "9.3x74R", "10.3x68 Mag", "10.4x42R Vetterli",
      ".408 Chey Tac", ".416 Barrett", ".444 Marlin", ".44-40 Win", ".45-70 Gov.",
      ".450 Bushmaster", ".458 Lott", ".458 Win", ".460 Wby Mag", ".50 BMG",
    ],
  },
  {
    gruppe: "Flinten",
    kaliber: [
      "12/55 - 12/60", "12/63 - 12/70", "12/76", "12/89",
      "16/65.5 - 16/70", "20/65 - 20/70", "20/76", "28/70 - 28/76", ".410",
    ],
  },
  {
    gruppe: "Luftdruck",
    kaliber: [
      "4.5mm (.177)", "5.5mm (.22)", "6.35mm (.25)",
    ],
  },
];

// Flat list of all calibers
export const ALL_CALIBERS: string[] = CALIBER_GROUPS.flatMap((g) => g.kaliber);

// Categories that require caliber selection
const WEAPON_CATEGORIES = new Set([
  "kurzwaffen", "buechsen", "flinten", "ordonnanzwaffen", "freie-waffen", "munition",
]);

export function isCaliberRequired(hauptkategorie: string): boolean {
  return WEAPON_CATEGORIES.has(hauptkategorie);
}
