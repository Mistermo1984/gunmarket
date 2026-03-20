import type { ListingCardData } from "@/components/ui/ListingCard";

// Map rechtsstatus to display values
const RECHTS_MAP: Record<string, { label: string; farbe: string; textfarbe: string }> = {
  frei: { label: "Frei", farbe: "bg-gray-100", textfarbe: "text-gray-700" },
  wes: { label: "WES", farbe: "bg-amber-100", textfarbe: "text-amber-800" },
  "abk-klein": { label: "ABK", farbe: "bg-orange-100", textfarbe: "text-orange-800" },
  // Legacy values mapped to current categories
  "abk-gross": { label: "ABK", farbe: "bg-orange-100", textfarbe: "text-orange-800" },
  kaufvertrag: { label: "Frei", farbe: "bg-gray-100", textfarbe: "text-gray-700" },
};

// Map hauptkategorie to waffenTyp
const WAFFEN_TYP_MAP: Record<string, "kurzwaffe" | "langwaffe" | "flinte" | "zubehoer"> = {
  kurzwaffen: "kurzwaffe",
  buechsen: "langwaffe",
  flinten: "flinte",
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
  if (!listing) listing = {};
  const rechts = RECHTS_MAP[listing.rechtsstatus as string] || RECHTS_MAP.frei;
  const images = Array.isArray(listing.images) ? listing.images : [];
  const firstImage = images.length > 0 && images[0] ? images[0] : null;

  return {
    id: String(listing.id || ""),
    titel: String(listing.titel || ""),
    kaliber: String(listing.kaliber || ""),
    preis: Number(listing.preis) || 0,
    zustand: String(listing.zustand || ""),
    kanton: String(listing.kanton || ""),
    kategorie: String(listing.unterkategorie || listing.hauptkategorie || ""),
    rechtsstatus: String(listing.rechtsstatus || "frei"),
    rechtsstatusLabel: rechts.label,
    rechtsstatusFarbe: rechts.farbe,
    rechtsstatusTextfarbe: rechts.textfarbe,
    anbieterTyp: (listing.verkaeufer_typ as "Privat" | "Händler") || "Privat",
    datum: formatDate(String(listing.created_at || "")),
    waffenTyp: WAFFEN_TYP_MAP[listing.hauptkategorie as string] || "zubehoer",
    aufrufe: Number(listing.aufrufe) || 0,
    verhandelbar: !!(listing.verhandelbar as number),
    bildAnzahl: images.length,
    source: String(listing.source || "gunmarket"),
    sourceUrl: (listing.source_url as string) || null,
    imageUrl: firstImage ? String((firstImage as Record<string, unknown>).url || "") || null : null,
  };
}
