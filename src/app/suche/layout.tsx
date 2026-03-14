import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waffen kaufen Schweiz — Alle Inserate",
  description:
    "Alle Waffen Inserate in der Schweiz. Pistolen, Büchsen, Flinten, Jagdwaffen und Ordonnanzwaffen kaufen oder verkaufen auf GunMarket.ch. Filter nach Kategorie, Kanton, Preis und mehr.",
  alternates: {
    canonical: "https://gunmarket.ch/suche",
  },
};

// Breadcrumb JSON-LD
function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://gunmarket.ch",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Suche",
        item: "https://gunmarket.ch/suche",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function SucheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd />
      {children}
    </>
  );
}
