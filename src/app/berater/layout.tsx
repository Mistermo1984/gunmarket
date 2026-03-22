import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waffenberater | GunMarket.ch",
  description:
    "KI-gestützter Waffenberater: Bedarfsanalyse, Modellempfehlung, Kostenrechnung und Schweizer Waffenrecht.",
  robots: { index: false, follow: false },
};

export default function BeraterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
