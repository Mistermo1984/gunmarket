import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaliber & Munition — Alle Kaliber erklärt",
  description:
    "Kaliber-Guide: Von 9×19mm Parabellum über .308 Winchester bis 7.5×55 Swiss. Alle wichtigen Kaliber mit technischen Daten, Einsatzgebieten und Vergleichstabellen.",
  alternates: {
    canonical: "https://gunmarket.ch/wissen/munition",
  },
  openGraph: {
    title: "Kaliber & Munition — GunMarket.ch",
    description:
      "Alle wichtigen Kaliber erklärt: 9mm, .308 Win, 7.5×55 und mehr. Technische Daten und Einsatzgebiete.",
    url: "https://gunmarket.ch/wissen/munition",
  },
};

export default function WissenMunitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
