import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, DM_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWrapper from "@/components/chatbot/ChatWrapper";
import SessionProvider from "@/components/auth/SessionProvider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL = "https://gunmarket.ch";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GunMarket.ch — Waffen kaufen & verkaufen in der Schweiz",
    template: "%s | GunMarket.ch",
  },
  description:
    "Der grösste Schweizer Waffenmarktplatz. Pistolen, Büchsen, Jagdwaffen, Ordonnanzwaffen kaufen und verkaufen. Kostenlose Inserate für Private und Händler.",
  keywords: [
    "Waffen kaufen Schweiz",
    "Waffen verkaufen Schweiz",
    "Pistole kaufen",
    "Büchse kaufen",
    "Jagdwaffe kaufen",
    "Ordonnanzwaffe kaufen",
    "Revolver kaufen Schweiz",
    "Flinte kaufen",
    "Waffenerwerbsschein WES",
    "Waffenmarkt Schweiz",
    "Waffen Inserate",
    "Waffen Marktplatz",
    "Schweizer Waffenhandel",
    "Schützenverein Schweiz",
    "Munition kaufen Schweiz",
    "Waffenzubehör",
    "SIG Sauer",
    "Glock",
    "K31",
    "Stgw 90",
    "Waffenrecht Schweiz",
  ],
  authors: [{ name: "GunMarket.ch" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: SITE_URL,
    siteName: "GunMarket.ch",
    title: "GunMarket.ch — Waffen kaufen & verkaufen in der Schweiz",
    description:
      "Der grösste Schweizer Waffenmarktplatz. Pistolen, Büchsen, Jagdwaffen, Ordonnanzwaffen kaufen und verkaufen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GunMarket.ch — Waffen kaufen & verkaufen in der Schweiz",
    description:
      "Der grösste Schweizer Waffenmarktplatz. Kostenlose Inserate für Private und Händler.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <body
        className={`${barlowCondensed.variable} ${dmSans.variable} ${dmMono.variable} font-body antialiased`}
      >
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ChatWrapper />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
