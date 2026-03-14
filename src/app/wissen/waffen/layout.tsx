import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waffen-Wiki — Pistolen, Revolver, Gewehre & Flinten",
  description:
    "Umfassendes Waffen-Lexikon: Pistolen, Revolver, Büchsen, Flinten, Ordonnanz- und Jagdwaffen. Funktionsweise, Rechtsstatus und bekannte Modelle für den Schweizer Markt.",
  alternates: {
    canonical: "https://gunmarket.ch/wissen/waffen",
  },
  openGraph: {
    title: "Waffen-Wiki — GunMarket.ch",
    description:
      "Pistolen, Revolver, Gewehre & Flinten: Alle Waffentypen erklärt für Schweizer Schützen und Jäger.",
    url: "https://gunmarket.ch/wissen/waffen",
  },
};

export default function WissenWaffenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
