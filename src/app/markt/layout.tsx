import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waffenpreise Schweiz — Marktanalyse & Preisguide | GunMarket.ch",
  description:
    "Aktuelle Waffenpreise und Marktdaten für die Schweiz. Durchschnittspreise, Preistrends und Restwertanalyse für Pistolen, Gewehre und Ordonnanzwaffen.",
  alternates: {
    canonical: "https://gunmarket.ch/markt",
  },
  openGraph: {
    title: "Waffenpreise Schweiz — Marktanalyse",
    description:
      "Aktuelle Marktdaten: Durchschnittspreise, Trends und Restwert für Schweizer Waffen.",
    url: "https://gunmarket.ch/markt",
    type: "website",
  },
};

export default function MarktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
