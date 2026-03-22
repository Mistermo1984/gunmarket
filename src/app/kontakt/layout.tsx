import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | GunMarket.ch",
  description:
    "Kontaktiere das GunMarket.ch Team. Wir helfen dir bei Fragen rund um Inserate, Waffenhandel und die Plattform.",
  alternates: {
    canonical: "https://gunmarket.ch/kontakt",
  },
  openGraph: {
    title: "Kontakt | GunMarket.ch",
    description: "Kontaktiere das GunMarket.ch Team.",
    url: "https://gunmarket.ch/kontakt",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
