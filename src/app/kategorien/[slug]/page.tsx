import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NeusteInserate from "@/components/home/NeusteInserate";

const KATEGORIE_DATA: Record<string, { title: string; h1: string; description: string; seoText: string }> = {
  kurzwaffen: {
    title: "Kurzwaffen kaufen Schweiz",
    h1: "Kurzwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Kurzwaffen Inserate in der Schweiz. Pistolen, Revolver und mehr kaufen oder verkaufen auf GunMarket.ch.",
    seoText: "Auf GunMarket.ch finden Sie das grösste Angebot an Kurzwaffen in der Schweiz. Ob Pistolen von SIG Sauer, Glock, CZ oder Beretta — durchsuchen Sie hunderte Inserate von privaten Verkäufern und Händlern. Kurzwaffen sind in der Schweiz WES-pflichtig (Waffenerwerbsschein). Für den Kauf einer Pistole oder eines Revolvers benötigen Sie einen gültigen WES, den Sie bei Ihrer kantonalen Polizeibehörde beantragen können. Auf GunMarket.ch können Sie kostenlos Kurzwaffen inserieren und kaufen. Nutzen Sie unsere Filter, um nach Kaliber, Preis, Zustand und Kanton zu suchen. Alle Inserate werden vor der Veröffentlichung geprüft, um die Sicherheit auf unserer Plattform zu gewährleisten.",
  },
  langwaffen: {
    title: "Langwaffen kaufen Schweiz",
    h1: "Langwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Langwaffen Inserate in der Schweiz. Büchsen, Flinten, Jagdwaffen und mehr auf GunMarket.ch.",
    seoText: "Finden Sie auf GunMarket.ch eine grosse Auswahl an Langwaffen. Von Repetierbüchsen für die Jagd bis hin zu Sportgewehren für den Schiessstand — unser Marktplatz bietet Inserate für jeden Bedarf. Repetierbüchsen können in der Schweiz per schriftlichem Vertrag erworben werden. Halbautomatische Büchsen sind WES-pflichtig. Auf GunMarket.ch finden Sie detaillierte Angaben zum Rechtsstatus jedes Inserats, sodass Sie immer wissen, welche Dokumente Sie benötigen. Nutzen Sie unsere Filterfunktionen, um nach Kaliber, Marke und Zustand zu suchen.",
  },
  // Backward compat aliases
  buechsen: {
    title: "Langwaffen kaufen Schweiz",
    h1: "Langwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Langwaffen Inserate in der Schweiz. Repetierer, Halbautomaten, Jagdgewehre und mehr auf GunMarket.ch.",
    seoText: "Finden Sie auf GunMarket.ch eine grosse Auswahl an Langwaffen. Von Repetierbüchsen für die Jagd bis hin zu Sportgewehren für den Schiessstand — unser Marktplatz bietet Inserate für jeden Bedarf.",
  },
  flinten: {
    title: "Flinten kaufen Schweiz",
    h1: "Flinten kaufen & verkaufen in der Schweiz",
    description: "Alle Flinten Inserate in der Schweiz. Bockflinten, Querflinten und mehr kaufen auf GunMarket.ch.",
    seoText: "Entdecken Sie auf GunMarket.ch das vielfältige Angebot an Flinten in der Schweiz. Ob Bockflinte für den Tontaubensport, Querflinte für die Jagd oder Repetierflinte — hier finden Sie das passende Inserat.",
  },
  jagdwaffen: {
    title: "Jagdwaffen kaufen Schweiz",
    h1: "Jagdwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Jagdwaffen Inserate in der Schweiz. Jagdbüchsen, Drillinge und Kombinationswaffen auf GunMarket.ch.",
    seoText: "GunMarket.ch ist der führende Marktplatz für Jagdwaffen in der Schweiz. Finden Sie Jagdbüchsen, Drillinge, Bergstutzen und Kombinationswaffen von renommierten Herstellern wie Blaser, Sauer, Mauser und Browning.",
  },
  ordonnanzwaffen: {
    title: "Ordonnanzwaffen kaufen Schweiz",
    h1: "Ordonnanzwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Ordonnanzwaffen Inserate in der Schweiz. K31, Stgw 57 und weitere Schweizer Militärwaffen auf GunMarket.ch.",
    seoText: "Auf GunMarket.ch finden Sie ein breites Angebot an Schweizer Ordonnanzwaffen. Vom legendären K31 Karabiner über den Stgw 57 bis hin zu historischen Langwaffen der Schweizer Armee — unser Marktplatz verbindet Sammler und Schützen in der ganzen Schweiz. Ordonnanzwaffen haben in der Schweiz einen besonderen rechtlichen Status. Ehemalige Armeewaffen können unter bestimmten Bedingungen per Vertrag oder mit WES erworben werden. Auf GunMarket.ch ist der Rechtsstatus bei jedem Inserat klar angegeben.",
  },
  luftdruckwaffen: {
    title: "Luftdruckwaffen kaufen Schweiz",
    h1: "Luftdruckwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Luftdruckwaffen in der Schweiz. Luftgewehre, CO2-Waffen und Schreckschusswaffen auf GunMarket.ch.",
    seoText: "Entdecken Sie auf GunMarket.ch Luftdruckwaffen, die ohne Waffenerwerbsschein erworben werden können. Dazu gehören Luftdruckwaffen, CO2-Waffen und Schreckschusswaffen gemäss Art. 10 des Schweizer Waffengesetzes. Diese Waffen können von jeder Person ab 18 Jahren frei erworben werden. Auf GunMarket.ch finden Sie eine grosse Auswahl an Luftdruckwaffen für Sport, Freizeit und Training.",
  },
  // Keep legacy slug for backward compat
  "freie-waffen": {
    title: "Luftdruckwaffen kaufen Schweiz",
    h1: "Luftdruckwaffen kaufen & verkaufen in der Schweiz",
    description: "Alle Luftdruckwaffen in der Schweiz. Luftgewehre, CO2-Waffen und Schreckschusswaffen auf GunMarket.ch.",
    seoText: "Entdecken Sie auf GunMarket.ch Luftdruckwaffen, die ohne Waffenerwerbsschein erworben werden können.",
  },
  zubehoer: {
    title: "Waffenzubehör kaufen Schweiz",
    h1: "Waffenzubehör kaufen & verkaufen in der Schweiz",
    description: "Waffenzubehör in der Schweiz. Optiken, Magazine, Holster und mehr auf GunMarket.ch.",
    seoText: "Finden Sie auf GunMarket.ch umfangreiches Waffenzubehör. Von Zielfernrohren und Rotpunktvisieren über Magazine und Holster bis hin zu Reinigungssets und Aufbewahrungslösungen — unser Marktplatz bietet alles, was Schützen und Jäger benötigen. Waffenzubehör kann in der Schweiz in der Regel frei erworben werden, solange es sich nicht um bewilligungspflichtige Teile handelt. Stöbern Sie durch hunderte Inserate von Privatpersonen und Fachhändlern.",
  },
};

export async function generateStaticParams() {
  return Object.keys(KATEGORIE_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = KATEGORIE_DATA[params.slug];
  if (!data) {
    return { title: "Kategorie nicht gefunden" };
  }
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://gunmarket.ch/kategorien/${params.slug}`,
    },
    openGraph: {
      title: `${data.title} | GunMarket.ch`,
      description: data.description,
    },
  };
}

export default function KategorieSeite({
  params,
}: {
  params: { slug: string };
}) {
  const data = KATEGORIE_DATA[params.slug];

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Kategorie nicht gefunden</h1>
        <Link href="/" className="mt-4 text-brand-green hover:underline">Zurück zur Startseite</Link>
      </div>
    );
  }

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gunmarket.ch" },
      { "@type": "ListItem", position: 2, name: data.title, item: `https://gunmarket.ch/kategorien/${params.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-brand-border bg-brand-grey/50">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-green transition-colors">Startseite</Link>
          <ChevronRight size={12} className="text-neutral-300" />
          <Link href="/kategorien" className="hover:text-brand-green transition-colors">Kategorien</Link>
          <ChevronRight size={12} className="text-neutral-300" />
          <span className="text-brand-dark">{data.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-brand-dark md:text-4xl">
          {data.h1}
        </h1>

        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-neutral-600">
          {data.seoText}
        </p>

        {/* CTA */}
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href={`/?kategorie=${params.slug}`}
            className="inline-flex items-center rounded-lg bg-brand-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
          >
            Alle {data.title.split(" ")[0]} Inserate anzeigen
          </Link>
          <Link
            href="/inserat/neu"
            className="inline-flex items-center rounded-lg border border-brand-green px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green-light"
          >
            Inserat aufgeben
          </Link>
        </div>
      </div>

      {/* Neueste Inserate (als Platzhalter für kategorie-spezifische) */}
      <NeusteInserate />

      {/* Interne Links */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-4 font-display text-lg font-bold uppercase text-brand-dark">
            Weitere Kategorien
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(KATEGORIE_DATA)
              .filter(([slug]) => slug !== params.slug)
              .map(([slug, d]) => (
                <Link
                  key={slug}
                  href={`/kategorien/${slug}`}
                  className="rounded-full border border-brand-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green"
                >
                  {d.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
