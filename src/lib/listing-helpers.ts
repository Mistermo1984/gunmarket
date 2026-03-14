import type { ListingCardData } from "@/components/ui/ListingCard";

// Map rechtsstatus to display values
const RECHTS_MAP: Record<string, { label: string; farbe: string; textfarbe: string }> = {
  frei: { label: "Frei", farbe: "bg-gray-100", textfarbe: "text-gray-700" },
  wes: { label: "WES", farbe: "bg-amber-100", textfarbe: "text-amber-800" },
  "abk-klein": { label: "ABK Klein", farbe: "bg-orange-100", textfarbe: "text-orange-800" },
  "abk-gross": { label: "ABK Gross", farbe: "bg-red-100", textfarbe: "text-red-800" },
  kaufvertrag: { label: "Vertrag", farbe: "bg-gray-100", textfarbe: "text-gray-700" },
};

// Map hauptkategorie to waffenTyp
const WAFFEN_TYP_MAP: Record<string, "kurzwaffe" | "langwaffe" | "flinte" | "zubehoer"> = {
  kurzwaffen: "kurzwaffe",
  buechsen: "langwaffe",
  flinten: "flinte",
  jagdwaffen: "langwaffe",
  ordonnanzwaffen: "langwaffe",
  "freie-waffen": "langwaffe",
  optik: "zubehoer",
  zubehoer: "zubehoer",
  munition: "zubehoer",
};

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return "Heute";
    if (diffDays === 1) return "Gestern";
    return date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export function apiListingToCard(listing: Record<string, unknown>): ListingCardData {
  const rechts = RECHTS_MAP[listing.rechtsstatus as string] || RECHTS_MAP.frei;
  const images = (listing.images as Record<string, unknown>[]) || [];

  return {
    id: listing.id as string,
    titel: listing.titel as string,
    kaliber: (listing.kaliber as string) || "",
    preis: listing.preis as number,
    zustand: listing.zustand as string,
    kanton: listing.kanton as string,
    kategorie: (listing.unterkategorie as string) || (listing.hauptkategorie as string),
    rechtsstatus: listing.rechtsstatus as string,
    rechtsstatusLabel: rechts.label,
    rechtsstatusFarbe: rechts.farbe,
    rechtsstatusTextfarbe: rechts.textfarbe,
    anbieterTyp: (listing.verkaeufer_typ as "Privat" | "Händler") || "Privat",
    datum: formatDate((listing.created_at as string) || ""),
    waffenTyp: WAFFEN_TYP_MAP[listing.hauptkategorie as string] || "zubehoer",
    aufrufe: (listing.aufrufe as number) || 0,
    verhandelbar: !!(listing.verhandelbar as number),
    bildAnzahl: images.length,
    source: (listing.source as string) || "gunmarket",
    sourceUrl: (listing.source_url as string) || null,
    imageUrl: images.length > 0 ? (images[0].url as string) : null,
  };
}
