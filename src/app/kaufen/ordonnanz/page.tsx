import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ordonnanzwaffen kaufen Schweiz — K31, Stgw 57, Stgw 90 | GunMarket.ch",
    description:
      "Schweizer Ordonnanzwaffen kaufen: K31, Sturmgewehr 57, Sturmgewehr 90, SIG P210. Geprüfte Händler und Private. Rechtsstatus und Preisguide.",
    alternates: {
      canonical: "https://gunmarket.ch/kaufen/ordonnanz",
    },
    openGraph: {
      title: "Ordonnanzwaffen kaufen Schweiz — K31, Stgw 57, Stgw 90 | GunMarket.ch",
      description:
        "Schweizer Ordonnanzwaffen kaufen: K31, Sturmgewehr 57, Sturmgewehr 90, SIG P210. Geprüfte Händler und Private.",
      url: "https://gunmarket.ch/kaufen/ordonnanz",
      images: [{ url: "https://gunmarket.ch/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gunmarket.ch" },
    { "@type": "ListItem", position: 2, name: "Kaufen", item: "https://gunmarket.ch/kaufen" },
    { "@type": "ListItem", position: 3, name: "Ordonnanzwaffen", item: "https://gunmarket.ch/kaufen/ordonnanz" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ordonnanzwaffen kaufen Schweiz — K31, Stgw 57, Stgw 90",
  description:
    "Schweizer Ordonnanzwaffen kaufen: K31, Sturmgewehr 57, Sturmgewehr 90, SIG P210. Geprüfte Händler und Private. Rechtsstatus und Preisguide.",
  url: "https://gunmarket.ch/kaufen/ordonnanz",
  publisher: {
    "@type": "Organization",
    name: "GunMarket.ch",
    url: "https://gunmarket.ch",
  },
};

export default function OrdonnanzKaufenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Dark header */}
      <div className="bg-brand-dark">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Link href="/" className="transition-colors hover:text-white">Startseite</Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <Link href="/kaufen/ordonnanz" className="text-white">Ordonnanzwaffen kaufen</Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Ordonnanzwaffen kaufen in der Schweiz
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            Schweizer Militaerwaffen fuer Sammler und Schuetzen: K31, Sturmgewehr 57, Sturmgewehr 90, SIG P210 und mehr. Rechtslage, Preise und Kaufberatung.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Geschichte der Schweizer Ordonnanzwaffen
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Schweiz verfuegt ueber eine der laengsten und reichsten Militaertraditionen Europas. Seit der Gruendung des modernen Bundesstaates 1848 hat die Schweizer Armee eine beeindruckende Reihe von Ordonnanzwaffen eingefuehrt, die heute bei Sammlern und Sportschuetzen gleichermassen begehrt sind. Die Tradition der Milizarmee bedeutet, dass Millionen von Schweizerinnen und Schweizern im Laufe der Jahrzehnte mit diesen Waffen ausgebildet wurden und eine persoenliche Verbindung zu ihnen haben. Ordonnanzwaffen sind daher nicht nur Schusswaffen, sondern auch ein Stueck Schweizer Kulturgeschichte.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Von den fruehen Vetterli-Gewehren ueber den legendaeren Schmidt-Rubin-Karabiner bis hin zu den modernen Sturmgewehren hat die Schweiz stets auf qualitativ hochwertige, in der Regel im Inland produzierte Waffen gesetzt. Die Eidgenoessische Waffenfabrik in Bern und spaeter die SIG (Schweizerische Industrie-Gesellschaft) in Neuhausen am Rheinfall haben Waffen hergestellt, die weltweit fuer ihre Praezision und Zuverlaessigkeit bekannt sind.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Welche Ordonnanzwaffen kann man kaufen?
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Der <Link href="/wissen/waffen/k31" className="font-medium text-brand-green hover:underline">Karabiner 31 (K31)</Link> ist die wohl beliebteste Schweizer Ordonnanzwaffe auf dem Sammlermarkt. Der Geradezug-Repetierer im Kaliber 7.5x55 Swiss wurde von 1933 bis in die 1970er Jahre produziert und besticht durch seine herausragende Praezision. Viele K31-Exemplare sind in erstaunlich gutem Zustand erhaeltlich, da sie sorgfaeltig gelagert und gewartet wurden. Auf dem Gebrauchtmarkt finden Sie K31-Karabiner im Preisbereich von CHF 400 bis CHF 1200, abhaengig von Zustand, Jahrgang und Zubehoer. Besonders gefragte Varianten mit Diopter-Visierung oder seltenen Produktionsjahren koennen deutlich hoehere Preise erzielen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Das <Link href="/wissen/waffen/stgw57" className="font-medium text-brand-green hover:underline">Sturmgewehr 57 (Stgw 57)</Link> ist ein verzoegerter Masseverschluss-Halbautomat im Kaliber 7.5x55 Swiss, der von der W+F Bern produziert wurde. Es gilt als eines der praezisesten Sturmgewehre seiner Generation und ist bei Schuetzen wegen seines ruhigen Schussbildes und der hochwertigen Verarbeitung beliebt. Gebrauchte Stgw 57 bewegen sich preislich zwischen CHF 800 und CHF 2000, wobei Modelle mit Originalzubehoer und gutem Zustand am oberen Ende liegen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Das <Link href="/wissen/waffen/stgw90" className="font-medium text-brand-green hover:underline">Sturmgewehr 90 (Stgw 90)</Link>, basierend auf dem SIG 550, ist die aktuelle Ordonnanzwaffe der Schweizer Armee. Es wird im Kaliber 5.6x45mm (GP90) verschossen und ist als halbautomatische Version auf dem zivilen Markt erhaeltlich. Ehemalige Armeewaffen koennen nach dem Dienst uebernommen werden — dabei wird der Vollautomatik-Modus deaktiviert. Die Preise fuer gebrauchte Stgw 90 liegen typischerweise zwischen CHF 800 und CHF 1800.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die <Link href="/wissen/waffen/sig-p210" className="font-medium text-brand-green hover:underline">SIG P210</Link> (Pistole 49) ist die ikonische Schweizer Ordonnanzpistole und gilt als eine der praezisesten Serienpistolen, die je gefertigt wurden. Die P210 wurde von 1949 bis 2006 von der SIG in Neuhausen produziert und ist heute ein begehrtes Sammlerstueck. Die Preise variieren stark: Einfache Dienstmodelle beginnen bei rund CHF 1500, waehrend seltene Sport- und Zielversionen CHF 3000 bis CHF 4000 oder mehr erreichen koennen. Auch die Pistolen P06/08 (Parabellum/Luger) sind auf dem Sammlermarkt zu finden, allerdings zu deutlich hoeheren Preisen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Rechtslage: Ordonnanzwaffen erwerben
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Fuer den Erwerb von Ordonnanzwaffen in der Schweiz gelten unterschiedliche Bestimmungen, je nachdem, ob es sich um eine Uebernahme aus dem Militaerdienst oder einen Kauf auf dem freien Markt handelt. Bei der Uebername der persoenlichen Dienstwaffe nach dem Militaerdienst benoetigen Sie einen Waffenerwerbsschein (WES). Das Sturmgewehr wird vor der Uebergabe auf Halbautomatik umgebaut und als Kategorie-B-Waffe eingetragen. Die Kosten fuer die Uebernahme sind vergleichsweise guenstig und werden vom Armeelogistikcenter (ALC) festgelegt.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Fuer den Kauf historischer Ordonnanzwaffen wie dem K31 oder Stgw 57 auf dem freien Markt benoetigen Sie ebenfalls einen WES. Repetierwaffen wie der K31 fallen als Kategorie-B-Waffen unter die WES-Pflicht. Halbautomatische Ordonnanzwaffen wie das Stgw 57 oder Stgw 90 erfordern zusaetzlich eine kantonale Ausnahmebewilligung (ABK Klein), da sie seit 2019 als Kategorie-A-Waffen eingestuft sind. Weitere Details zur Rechtslage finden Sie auf unserer <Link href="/waffenrecht" className="font-medium text-brand-green hover:underline">Waffenrecht-Seite</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Preisguide Ordonnanzwaffen 2026
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-border">
                    <th className="py-3 pr-4 font-semibold text-brand-dark">Modell</th>
                    <th className="py-3 pr-4 font-semibold text-brand-dark">Kaliber</th>
                    <th className="py-3 font-semibold text-brand-dark">Preisspanne (CHF)</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-600">
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Karabiner 31 (K31)</td>
                    <td className="py-2.5 pr-4">7.5x55 Swiss</td>
                    <td className="py-2.5">400 — 1&apos;200</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Sturmgewehr 57 (Stgw 57)</td>
                    <td className="py-2.5 pr-4">7.5x55 Swiss</td>
                    <td className="py-2.5">800 — 2&apos;000</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Sturmgewehr 90 (Stgw 90)</td>
                    <td className="py-2.5 pr-4">5.6x45mm</td>
                    <td className="py-2.5">800 — 1&apos;800</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">SIG P210 (Pistole 49)</td>
                    <td className="py-2.5 pr-4">9mm Para</td>
                    <td className="py-2.5">1&apos;500 — 4&apos;000</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4">Parabellum P06/08</td>
                    <td className="py-2.5 pr-4">7.65mm Para</td>
                    <td className="py-2.5">2&apos;000 — 6&apos;000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Tipps fuer Ordonnanzwaffen-Kaeufer
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Beim Kauf einer Ordonnanzwaffe sollten Sie besonders auf den Laufzustand achten. Viele Ordonnanzwaffen haben im Militaerdienst tausende Schuss abgefeuert, was sich auf die Praezision auswirken kann. Pruefen Sie den Lauf auf Erosion und Pittings, insbesondere im Patronenlager. Achten Sie auch auf die Seriennummern: Bei Ordonnanzwaffen sollten alle Teile uebereinstimmende Nummern tragen. Nachtraeglich zusammengestellte Waffen (sogenannte «Mischmasch-Waffen») sind weniger wert als Exemplare mit durchgaengig passenden Nummern.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Fuer Sammler ist die Provenienz wichtig: Wurde die Waffe direkt vom ALC uebernommen oder stammt sie aus dem freien Handel? Originalverpackung, Waffenpass und Zubehoer wie Reinigungsgeraet oder Tragriemen erhoehen den Sammlerwert erheblich. Nutzen Sie die Suchfunktionen auf GunMarket.ch, um Preise zu vergleichen und ein faires Angebot zu finden.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-brand-border bg-brand-grey/30 p-8 text-center">
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Ordonnanzwaffen-Inserate durchsuchen
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              Entdecken Sie Schweizer Militaerwaffen auf GunMarket.ch — K31, Stgw 57, SIG P210 und mehr.
            </p>
            <Link
              href="/?hauptkategorie=ordonnanzwaffen"
              className="inline-flex items-center rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Alle Ordonnanz-Inserate ansehen
            </Link>
          </section>

        </div>
      </div>
    </>
  );
}
