import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrieren",
  description:
    "Erstellen Sie ein kostenloses Konto auf GunMarket.ch — dem grössten Schweizer Waffenmarktplatz. Für Private und Händler.",
  robots: { index: false, follow: true },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
