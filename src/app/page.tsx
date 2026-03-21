import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HomeContent from "@/components/home/HomeContent";
import HomeMapSection from "@/components/home/HomeMapSection";
import SoFunktionierts from "@/components/home/SoFunktionierts";
import RechtlicherHinweis from "@/components/home/RechtlicherHinweis";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import SeoLinksSection from "@/components/home/SeoLinksSection";
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
      <SeoLinksSection />
    </>
  );
}
