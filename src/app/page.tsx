import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HomeContent from "@/components/home/HomeContent";
import HomeMapSection from "@/components/home/HomeMapSection";
import SoFunktionierts from "@/components/home/SoFunktionierts";
import RechtlicherHinweis from "@/components/home/RechtlicherHinweis";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Link from "next/link";
import { initializeSchema } from "@/lib/db";

export const metadata: Metadata = {
  title: "GunMarket.ch — Waffen kaufen & verkaufen in der Schweiz",
  description:
    "Der grösste Schweizer Waffenmarktplatz. Pistolen, Revolver, Büchsen, Flinten, Jagdwaffen und Ordonnanzwaffen kaufen und verkaufen. Kostenlose Inserate für Private und Händler in allen 26 Kantonen.",
  alternates: {
    canonical: "https://gunmarket.ch",
  },
};

function ensureSchema() {
  try {
    initializeSchema();
  } catch {
    // ignore
  }
}

const KANTONE_LINKS = [
  { label: "Zürich", kanton: "ZH" },
  { label: "Bern", kanton: "BE" },
  { label: "Luzern", kanton: "LU" },
  { label: "Uri", kanton: "UR" },
  { label: "Schwyz", kanton: "SZ" },
  { label: "Obwalden", kanton: "OW" },
  { label: "Nidwalden", kanton: "NW" },
  { label: "Glarus", kanton: "GL" },
  { label: "Zug", kanton: "ZG" },
  { label: "Freiburg", kanton: "FR" },
  { label: "Solothurn", kanton: "SO" },
  { label: "Basel-Stadt", kanton: "BS" },
  { label: "Basel-Land", kanton: "BL" },
  { label: "Schaffhausen", kanton: "SH" },
  { label: "Appenzell AR", kanton: "AR" },
  { label: "Appenzell AI", kanton: "AI" },
  { label: "St. Gallen", kanton: "SG" },
  { label: "Graubünden", kanton: "GR" },
  { label: "Aargau", kanton: "AG" },
  { label: "Thurgau", kanton: "TG" },
  { label: "Tessin", kanton: "TI" },
  { label: "Waadt", kanton: "VD" },
  { label: "Wallis", kanton: "VS" },
  { label: "Neuenburg", kanton: "NE" },
  { label: "Genf", kanton: "GE" },
  { label: "Jura", kanton: "JU" },
];

// JSON-LD structured data — WebSite + SearchAction
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GunMarket.ch",
  url: "https://gunmarket.ch",
  description: "Der grösste Schweizer Waffenmarktplatz. Pistolen, Büchsen, Jagdwaffen, Ordonnanzwaffen kaufen und verkaufen.",
  inLanguage: "de-CH",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://gunmarket.ch/suche?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// JSON-LD Organization
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GunMarket.ch",
  url: "https://gunmarket.ch",
  logo: "https://gunmarket.ch/og-image.png",
  description: "Der grösste Schweizer Waffenmarktplatz für legalen Waffenhandel.",
  areaServed: {
    "@type": "Country",
    name: "Schweiz",
  },
  sameAs: [],
};

// JSON-LD FAQPage — für Google Rich Snippets
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ist der Waffenhandel auf GunMarket.ch legal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. GunMarket.ch ist ein legaler Marktplatz für Waffen in der Schweiz. Alle Transaktionen müssen gemäss dem Schweizer Waffengesetz (WG) und der Waffenverordnung (WV) abgewickelt werden. Für bewilligungspflichtige Waffen ist ein Waffenerwerbsschein (WES) erforderlich.",
      },
    },
    {
      "@type": "Question",
      name: "Brauche ich einen Waffenerwerbsschein (WES)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für bewilligungspflichtige Waffen (z.B. Pistolen, Revolver, halbautomatische Waffen) benötigen Sie einen WES. Frei erwerbbare Waffen wie Repetiergewehre und einläufige Jagdflinten können mit einem Kaufvertrag erworben werden. Ordonnanzwaffen wie K31 oder Stgw 57 sind ebenfalls frei erwerbbar.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet ein Inserat auf GunMarket.ch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Aufgeben von Inseraten auf GunMarket.ch ist komplett kostenlos — sowohl für Privatpersonen als auch für gewerbliche Waffenhändler. Es fallen keine Gebühren für das Einstellen oder die Vermittlung an.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Waffen darf ich in der Schweiz kaufen und verkaufen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In der Schweiz dürfen Schweizer Bürger und Personen mit Niederlassungsbewilligung C die meisten Waffen kaufen und verkaufen. Dazu gehören Pistolen, Revolver, Büchsen, Flinten, Jagdwaffen und Ordonnanzwaffen. Verbotene Waffen (z.B. vollautomatische Waffen, Schalldämpfer ohne Bewilligung) sind vom Handel ausgeschlossen.",
      },
    },
  ],
};

export default function Home() {
  ensureSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. Hero with integrated search */}
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      {/* Category tiles */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Nach Kategorie suchen</h2>
        <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
          {[
            { id: 'kurzwaffen', label: 'Kurzwaffen', emoji: '🔫', color: 'bg-slate-800' },
            { id: 'langwaffen', label: 'Langwaffen', emoji: '🎯', color: 'bg-green-800' },
            { id: 'ordonnanzwaffen', label: 'Ordonnanz', emoji: '🪖', color: 'bg-amber-700' },
            { id: 'optik', label: 'Optik', emoji: '🔭', color: 'bg-blue-800' },
            { id: 'munition', label: 'Munition', emoji: '🔶', color: 'bg-orange-700' },
            { id: 'zubehoer', label: 'Zubehör', emoji: '🔧', color: 'bg-gray-700' },
            { id: 'messer', label: 'Messer', emoji: '🗡️', color: 'bg-red-800' },
            { id: 'luftdruck', label: 'Luftdruck', emoji: '💨', color: 'bg-cyan-800' },
          ].map(cat => (
            <Link
              key={cat.id}
              href={`/inserate?kategorie=${cat.id}`}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center group"
            >
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl`}>
                {cat.emoji}
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-green-700 leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Main content: FilterSidebar + Neueste Inserate */}
      <ErrorBoundary>
        <HomeContent />
      </ErrorBoundary>

      {/* Listings section */}
      <ErrorBoundary
        fallback={
          <section className="py-10 md:py-14" style={{ backgroundColor: "#f8faf8", minHeight: 400 }}>
            <div className="mx-auto max-w-7xl px-4 text-center text-neutral-400 py-20">
              <p className="text-sm">Karte konnte nicht geladen werden.</p>
            </div>
          </section>
        }
      >
        <HomeMapSection />
      </ErrorBoundary>

      {/* So funktioniert's */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10">
        <SoFunktionierts />
      </div>

      {/* Full-width sections */}
      <RechtlicherHinweis />

      {/* Waffen kaufen in allen Kantonen — SEO */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 font-display text-xl font-black uppercase tracking-tight text-brand-dark">
            Waffen kaufen in der Schweiz
          </h2>
          <div className="flex flex-wrap gap-2">
            {KANTONE_LINKS.map((k) => (
              <Link
                key={k.kanton}
                href={`/suche?kanton=${k.kanton}`}
                className="rounded-full border border-brand-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green"
              >
                Waffen kaufen in {k.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
