import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schützenvereine Schweiz — Verzeichnis aller Kantone",
  description:
    "Umfassendes Verzeichnis der Schweizer Schützenvereine. Finden Sie Schützenvereine in allen 26 Kantonen. Pistole, Gewehr, 300m, IPSC und mehr.",
  keywords: [
    "Schützenvereine Schweiz",
    "Schützenverein finden",
    "Schiessverein Schweiz",
    "SSV Vereine",
    "Schiessstand Schweiz",
    "Pistolenclub",
    "Feldschiessen",
  ],
  alternates: {
    canonical: "https://gunmarket.ch/vereine",
  },
  openGraph: {
    title: "Schützenvereine Schweiz | GunMarket.ch",
    description: "Finden Sie Schützenvereine in allen 26 Kantonen der Schweiz.",
  },
};

export default function VereineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
