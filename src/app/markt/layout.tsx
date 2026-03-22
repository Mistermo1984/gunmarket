import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waffenpreise Schweiz 2026 — Marktanalyse & Preisguide | GunMarket.ch",
  description:
    "Aktuelle Waffenpreise für den Schweizer Markt. Durchschnittspreise, Preistrends und Restwertanalyse für Pistolen, Gewehre, Ordonnanz- und Jagdwaffen. Täglich aktualisiert.",
  alternates: {
    canonical: "https://gunmarket.ch/markt",
  },
  openGraph: {
    title: "Waffenpreise Schweiz 2026 — Marktanalyse",
    description:
      "Aktuelle Waffenpreise für den Schweizer Markt. Durchschnittspreise, Preistrends und Restwertanalyse für Pistolen, Gewehre, Ordonnanz- und Jagdwaffen.",
    url: "https://gunmarket.ch/markt",
    type: "website",
    images: [{ url: "https://gunmarket.ch/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function MarktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
