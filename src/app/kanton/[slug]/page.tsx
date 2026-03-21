import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NeusteInserate from "@/components/home/NeusteInserate";

const KANTON_DATA: Record<string, { name: string; abbr: string; seoText: string }> = {
  aargau: {
    name: "Aargau",
    abbr: "AG",
    seoText: "Finden Sie gebrauchte Waffen im Kanton Aargau. Der Kanton Aargau verfügt über zahlreiche Schiessvereine und eine aktive Schützengemeinschaft. Ob Pistolen, Büchsen, Jagdwaffen oder Zubehör — auf GunMarket.ch finden Sie Inserate von privaten Verkäufern und Händlern aus dem Aargau. Nutzen Sie unsere Filter, um nach Kaliber, Preis und Zustand zu suchen.",
  },
  "appenzell-ausserrhoden": {
    name: "Appenzell Ausserrhoden",
    abbr: "AR",
    seoText: "Gebrauchte Waffen im Kanton Appenzell Ausserrhoden kaufen und verkaufen. Durchsuchen Sie aktuelle Inserate für Pistolen, Büchsen und Zubehör von Verkäufern aus Appenzell Ausserrhoden auf GunMarket.ch.",
  },
  "appenzell-innerrhoden": {
    name: "Appenzell Innerrhoden",
    abbr: "AI",
    seoText: "Waffen kaufen und verkaufen im Kanton Appenzell Innerrhoden. Finden Sie Inserate für Pistolen, Langwaffen und Waffenzubehör von Verkäufern aus Appenzell Innerrhoden auf GunMarket.ch.",
  },
  "basel-landschaft": {
    name: "Basel-Landschaft",
    abbr: "BL",
    seoText: "Gebrauchte Waffen im Kanton Basel-Landschaft kaufen und verkaufen. Finden Sie aktuelle Inserate für Kurzwaffen, Langwaffen, Ordonnanzwaffen und Zubehör von Verkäufern aus dem Baselbiet auf GunMarket.ch.",
  },
  "basel-stadt": {
    name: "Basel-Stadt",
    abbr: "BS",
    seoText: "Waffen kaufen und verkaufen in Basel-Stadt. Durchsuchen Sie Inserate für Pistolen, Büchsen, Jagdwaffen und Waffenzubehör von Verkäufern aus Basel auf GunMarket.ch. Finden Sie lokale Angebote in Ihrer Nähe.",
  },
  bern: {
    name: "Bern",
    abbr: "BE",
    seoText: "Der Kanton Bern ist der zweitgrösste Kanton der Schweiz mit einer langen Schiesstradition. Auf GunMarket.ch finden Sie gebrauchte Waffen von Verkäufern aus Bern und Umgebung — von Pistolen und Revolvern über Jagdbüchsen und Ordonnanzwaffen bis hin zu Optik und Zubehör. Nutzen Sie unsere Filterfunktionen, um gezielt nach Angeboten aus dem Kanton Bern zu suchen.",
  },
  freiburg: {
    name: "Freiburg",
    abbr: "FR",
    seoText: "Gebrauchte Waffen im Kanton Freiburg kaufen und verkaufen. Finden Sie Inserate für Pistolen, Büchsen, Jagdwaffen und Zubehör von Verkäufern aus Freiburg auf GunMarket.ch.",
  },
  genf: {
    name: "Genf",
    abbr: "GE",
    seoText: "Waffen kaufen und verkaufen im Kanton Genf. Durchsuchen Sie aktuelle Inserate für Kurzwaffen, Langwaffen und Waffenzubehör von Verkäufern aus Genf auf GunMarket.ch.",
  },
  glarus: {
    name: "Glarus",
    abbr: "GL",
    seoText: "Gebrauchte Waffen im Kanton Glarus kaufen und verkaufen. Finden Sie Inserate für Waffen und Zubehör von Verkäufern aus dem Glarnerland auf GunMarket.ch.",
  },
  graubuenden: {
    name: "Graubünden",
    abbr: "GR",
    seoText: "Der Kanton Graubünden ist bekannt für seine Jagdtradition. Auf GunMarket.ch finden Sie gebrauchte Waffen von Verkäufern aus Graubünden — Jagdbüchsen, Repetierer, Bergstutzen und vieles mehr. Ideal für Jäger und Sportschützen in der Region.",
  },
  jura: {
    name: "Jura",
    abbr: "JU",
    seoText: "Waffen kaufen und verkaufen im Kanton Jura. Finden Sie Inserate für Pistolen, Büchsen und Zubehör von Verkäufern aus dem Jura auf GunMarket.ch.",
  },
  luzern: {
    name: "Luzern",
    abbr: "LU",
    seoText: "Gebrauchte Waffen im Kanton Luzern kaufen und verkaufen. Durchsuchen Sie aktuelle Inserate für Kurzwaffen, Langwaffen, Ordonnanzwaffen und Zubehör von Verkäufern aus Luzern auf GunMarket.ch.",
  },
  neuenburg: {
    name: "Neuenburg",
    abbr: "NE",
    seoText: "Waffen kaufen und verkaufen im Kanton Neuenburg. Finden Sie Inserate für Pistolen, Büchsen und Waffenzubehör von Verkäufern aus Neuenburg auf GunMarket.ch.",
  },
  nidwalden: {
    name: "Nidwalden",
    abbr: "NW",
    seoText: "Gebrauchte Waffen im Kanton Nidwalden kaufen und verkaufen. Finden Sie aktuelle Inserate von Verkäufern aus Nidwalden auf GunMarket.ch.",
  },
  obwalden: {
    name: "Obwalden",
    abbr: "OW",
    seoText: "Waffen kaufen und verkaufen im Kanton Obwalden. Durchsuchen Sie Inserate für Waffen und Zubehör von Verkäufern aus Obwalden auf GunMarket.ch.",
  },
  schaffhausen: {
    name: "Schaffhausen",
    abbr: "SH",
    seoText: "Gebrauchte Waffen im Kanton Schaffhausen kaufen und verkaufen. Finden Sie Inserate für Pistolen, Büchsen und Zubehör von Verkäufern aus Schaffhausen auf GunMarket.ch.",
  },
  schwyz: {
    name: "Schwyz",
    abbr: "SZ",
    seoText: "Waffen kaufen und verkaufen im Kanton Schwyz. Durchsuchen Sie aktuelle Inserate für Kurzwaffen, Langwaffen und Zubehör von Verkäufern aus Schwyz auf GunMarket.ch.",
  },
  solothurn: {
    name: "Solothurn",
    abbr: "SO",
    seoText: "Gebrauchte Waffen im Kanton Solothurn kaufen und verkaufen. Finden Sie Inserate für Pistolen, Büchsen und Waffenzubehör von Verkäufern aus Solothurn auf GunMarket.ch.",
  },
  "st-gallen": {
    name: "St. Gallen",
    abbr: "SG",
    seoText: "Der Kanton St. Gallen bietet eine aktive Schützengemeinschaft. Finden Sie gebrauchte Waffen von Verkäufern aus St. Gallen auf GunMarket.ch — Pistolen, Büchsen, Ordonnanzwaffen und mehr.",
  },
  tessin: {
    name: "Tessin",
    abbr: "TI",
    seoText: "Waffen kaufen und verkaufen im Kanton Tessin. Durchsuchen Sie Inserate für Pistolen, Langwaffen und Zubehör von Verkäufern aus dem Tessin auf GunMarket.ch.",
  },
  thurgau: {
    name: "Thurgau",
    abbr: "TG",
    seoText: "Gebrauchte Waffen im Kanton Thurgau kaufen und verkaufen. Finden Sie aktuelle Inserate für Waffen und Zubehör von Verkäufern aus dem Thurgau auf GunMarket.ch.",
  },
  uri: {
    name: "Uri",
    abbr: "UR",
    seoText: "Waffen kaufen und verkaufen im Kanton Uri. Finden Sie Inserate für Pistolen, Büchsen und Zubehör von Verkäufern aus Uri auf GunMarket.ch.",
  },
  waadt: {
    name: "Waadt",
    abbr: "VD",
    seoText: "Gebrauchte Waffen im Kanton Waadt kaufen und verkaufen. Durchsuchen Sie Inserate für Kurzwaffen, Langwaffen und Waffenzubehör von Verkäufern aus dem Kanton Waadt auf GunMarket.ch.",
  },
  wallis: {
    name: "Wallis",
    abbr: "VS",
    seoText: "Der Kanton Wallis ist bekannt für seine Jagdtradition. Auf GunMarket.ch finden Sie gebrauchte Waffen von Verkäufern aus dem Wallis — Jagdbüchsen, Bergstutzen, Pistolen und vieles mehr.",
  },
  zug: {
    name: "Zug",
    abbr: "ZG",
    seoText: "Waffen kaufen und verkaufen im Kanton Zug. Finden Sie Inserate für Pistolen, Büchsen und Zubehör von Verkäufern aus Zug auf GunMarket.ch.",
  },
  zuerich: {
    name: "Zürich",
    abbr: "ZH",
    seoText: "Der Kanton Zürich ist der bevölkerungsreichste Kanton der Schweiz mit zahlreichen Schiessvereinen und Waffenhändlern. Auf GunMarket.ch finden Sie das grösste Angebot an gebrauchten Waffen von Verkäufern aus Zürich und Umgebung — von Pistolen und Revolvern über Jagdwaffen bis hin zu Optik und Zubehör. Nutzen Sie unsere Filter, um gezielt nach Angeboten in Ihrer Nähe zu suchen.",
  },
};

export async function generateStaticParams() {
  return Object.keys(KANTON_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = KANTON_DATA[slug];
  if (!data) {
    return { title: "Kanton nicht gefunden" };
  }
  return {
    title: `Waffen kaufen ${data.name} — GunMarket.ch`,
    description: `Gebrauchte Waffen, Pistolen, Büchsen und Zubehör im Kanton ${data.name} (${data.abbr}) kaufen und verkaufen. Grösster Schweizer Waffenmarktplatz.`,
    alternates: {
      canonical: `https://gunmarket.ch/kanton/${slug}`,
    },
    openGraph: {
      title: `Waffen in ${data.name} — GunMarket.ch`,
      description: `Inserate für Waffen und Zubehör im Kanton ${data.name}. Jetzt auf GunMarket.ch entdecken.`,
    },
  };
}

export default async function KantonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = KANTON_DATA[slug];

  if (!data) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gunmarket.ch" },
      { "@type": "ListItem", position: 2, name: `Waffen ${data.name}`, item: `https://gunmarket.ch/kanton/${slug}` },
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
          <Link href="/" className="transition-colors hover:text-brand-green">Startseite</Link>
          <ChevronRight size={12} className="text-neutral-300" />
          <span className="text-brand-dark">Waffen {data.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-brand-dark md:text-4xl">
          Waffen kaufen & verkaufen in {data.name}
        </h1>

        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-neutral-600">
          {data.seoText}
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href={`/?kanton=${data.abbr.toLowerCase()}`}
            className="inline-flex items-center rounded-lg bg-brand-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
          >
            Alle Inserate in {data.name} anzeigen
          </Link>
          <Link
            href="/inserat/neu"
            className="inline-flex items-center rounded-lg border border-brand-green px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green-light"
          >
            Inserat aufgeben
          </Link>
        </div>
      </div>

      <NeusteInserate />

      {/* Links to other cantons */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-4 font-display text-lg font-bold uppercase text-brand-dark">
            Weitere Kantone
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(KANTON_DATA)
              .filter(([s]) => s !== slug)
              .map(([s, d]) => (
                <Link
                  key={s}
                  href={`/kanton/${s}`}
                  className="rounded-full border border-brand-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green"
                >
                  {d.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
