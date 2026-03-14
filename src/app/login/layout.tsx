import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anmelden",
  description:
    "Melden Sie sich bei GunMarket.ch an, um Waffen-Inserate aufzugeben, Verkäufer zu kontaktieren und Ihre Merkliste zu verwalten.",
  robots: { index: false, follow: true },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
