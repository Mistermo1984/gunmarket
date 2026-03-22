import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Was ist meine Waffe wert? Restwert & Preisguide Schweiz 2026 | GunMarket.ch",
    description:
      "Kostenloser Waffenwert-Guide für die Schweiz. Aktuelle Marktpreise für K31, Glock, SIG Sauer und 80+ weitere Modelle. Basierend auf echten Inseraten.",
    alternates: {
      canonical: "https://gunmarket.ch/wert",
    },
    openGraph: {
      title: "Was ist meine Waffe wert? Restwert & Preisguide Schweiz 2026 | GunMarket.ch",
      description:
        "Kostenloser Waffenwert-Guide für die Schweiz. Aktuelle Marktpreise für K31, Glock, SIG Sauer und 80+ weitere Modelle.",
      url: "https://gunmarket.ch/wert",
      images: [{ url: "https://gunmarket.ch/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gunmarket.ch" },
    { "@type": "ListItem", position: 2, name: "Waffenwert", item: "https://gunmarket.ch/wert" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Was ist meine Waffe wert? Restwert & Preisguide Schweiz 2026",
  description:
    "Kostenloser Waffenwert-Guide für die Schweiz. Aktuelle Marktpreise für K31, Glock, SIG Sauer und 80+ weitere Modelle. Basierend auf echten Inseraten.",
  url: "https://gunmarket.ch/wert",
  publisher: {
    "@type": "Organization",
    name: "GunMarket.ch",
    url: "https://gunmarket.ch",
  },
};

export default function WaffenwertPage() {
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
            <Link href="/wert" className="text-white">Waffenwert</Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Was ist meine Waffe wert?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            Kostenloser Preisguide fuer die Schweiz 2026. Aktuelle Marktpreise basierend auf echten Inseraten und Verkaufsdaten.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Wie wird der Wert einer Waffe bestimmt?
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Den Wert einer gebrauchten Waffe zu bestimmen ist keine exakte Wissenschaft, aber es gibt klare Faktoren, die den Marktpreis massgeblich beeinflussen. Auf GunMarket.ch analysieren wir laufend tausende Inserate und Verkaufsdaten, um Ihnen eine zuverlaessige Orientierung zu bieten. Der Wert einer Waffe ergibt sich aus dem Zusammenspiel von Angebot und Nachfrage auf dem Schweizer Markt, dem aktuellen Zustand der Waffe, ihrer Seltenheit und historischen Bedeutung sowie dem allgemeinen Preisniveau fuer vergleichbare Modelle.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Anders als bei Autos gibt es fuer Waffen keine standardisierten Bewertungssysteme wie die Eurotax-Liste. Der Waffenwert wird daher hauptsaechlich durch Marktvergleiche bestimmt. GunMarket.ch bietet Ihnen mit der <Link href="/markt" className="font-medium text-brand-green hover:underline">Marktanalyse-Seite</Link> ein leistungsfaehiges Werkzeug, um aktuelle Preise zu vergleichen und den fairen Marktwert Ihrer Waffe einzuschaetzen. Dort finden Sie Median-Preise, Preistrends und Verteilungen nach Marke und Kategorie.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Einflussfaktoren auf den Waffenwert
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              <strong className="text-brand-dark">Zustand:</strong> Der wichtigste Einzelfaktor fuer den Wert einer gebrauchten Waffe ist ihr Zustand. Die Bewertungsskala reicht von «neuwertig» (kaum Gebrauchsspuren, Originalverpackung vorhanden) ueber «gut» (normale Gebrauchsspuren, voll funktionsfaehig) bis «gebraucht» (deutliche Spuren, moeglicherweise kleinere Maengel). Eine Waffe im neuwertigen Zustand kann das Doppelte oder Dreifache einer identischen Waffe im stark gebrauchten Zustand erzielen. Besonders der Laufzustand ist entscheidend: Pittings, Erosion oder ein ausgeleiertes Patronenlager mindern den Wert erheblich.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              <strong className="text-brand-dark">Seltenheit und historische Bedeutung:</strong> Seltene Modelle, limitierte Auflagen oder historisch bedeutsame Waffen erzielen hoehere Preise als Massenprodukte. Eine SIG P210 der ersten Produktionsserie ist deutlich mehr wert als ein spaetes Modell. Ebenso koennen K31-Karabiner mit seltenen Stempeln oder Produktionsjahren erhebliche Aufpreise erzielen. Waffen mit dokumentierter Provenienz — etwa nachweisbarem Militaereinsatz oder beruehmten Vorbesitzern — sind bei Sammlern besonders gefragt.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              <strong className="text-brand-dark">Kaliber und Munitionsverfuegbarkeit:</strong> Waffen in gaengigen Kalibern wie 9mm Para, .308 Winchester oder .22 LR sind leichter zu verkaufen als solche in exotischen oder obsoleten Kalibern. Die Munitionsverfuegbarkeit beeinflusst direkt die Nachfrage: Eine Buechse im Kaliber 7x64 laesst sich in der Schweiz leichter verkaufen als eine im seltenen 6.5x68mm Schuler. Allerdings koennen gerade seltene Kaliber bei spezialisierten Sammlern hohe Preise erzielen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              <strong className="text-brand-dark">Marktangebot und Nachfrage:</strong> Wie bei jedem Markt bestimmen Angebot und Nachfrage den Preis. Wenn viele K31 gleichzeitig angeboten werden, sinkt der Durchschnittspreis. Umgekehrt steigen die Preise, wenn ein Modell knapp wird. Saisonale Schwankungen spielen ebenfalls eine Rolle: Vor der Jagdsaison steigt die Nachfrage nach Jagdwaffen, waehrend Sportpistolen im Fruehling — zum Start der Schiesssaison — besonders gefragt sind.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Preistabelle: Top-20 Waffenmodelle Schweiz 2026
            </h2>
            <p className="mb-4 text-sm text-neutral-500">
              Preise basierend auf aktuellen Inseraten auf GunMarket.ch. Alle Angaben in CHF, gerundet.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-border">
                    <th className="py-3 pr-4 font-semibold text-brand-dark">Modell</th>
                    <th className="py-3 pr-4 font-semibold text-brand-dark">Kategorie</th>
                    <th className="py-3 font-semibold text-brand-dark">Preisspanne (CHF)</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-600">
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4"><Link href="/wissen/waffen/k31" className="text-brand-green hover:underline">Karabiner 31 (K31)</Link></td>
                    <td className="py-2.5 pr-4">Ordonnanz</td>
                    <td className="py-2.5">400 — 1&apos;200</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Sturmgewehr 57 (Stgw 57)</td>
                    <td className="py-2.5 pr-4">Ordonnanz</td>
                    <td className="py-2.5">800 — 2&apos;000</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Sturmgewehr 90 (Stgw 90)</td>
                    <td className="py-2.5 pr-4">Ordonnanz</td>
                    <td className="py-2.5">800 — 1&apos;800</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4"><Link href="/wissen/waffen/sig-p210" className="text-brand-green hover:underline">SIG P210</Link></td>
                    <td className="py-2.5 pr-4">Ordonnanz / Pistole</td>
                    <td className="py-2.5">1&apos;500 — 4&apos;000</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4"><Link href="/wissen/waffen/glock-17" className="text-brand-green hover:underline">Glock 17</Link></td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">400 — 650</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Glock 19</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">450 — 700</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">SIG P226</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">600 — 1&apos;200</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">SIG P320</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">500 — 900</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Heckler &amp; Koch USP</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">500 — 1&apos;000</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">CZ 75</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">350 — 700</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Walther PPQ / PDP</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">450 — 800</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Beretta 92FS</td>
                    <td className="py-2.5 pr-4">Pistole</td>
                    <td className="py-2.5">400 — 750</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4"><Link href="/wissen/waffen/blaser-r8" className="text-brand-green hover:underline">Blaser R8</Link></td>
                    <td className="py-2.5 pr-4">Jagdbuechse</td>
                    <td className="py-2.5">2&apos;000 — 6&apos;000</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Sako 85</td>
                    <td className="py-2.5 pr-4">Jagdbuechse</td>
                    <td className="py-2.5">1&apos;200 — 2&apos;500</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Tikka T3x</td>
                    <td className="py-2.5 pr-4">Jagdbuechse</td>
                    <td className="py-2.5">600 — 1&apos;200</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Mauser M18</td>
                    <td className="py-2.5 pr-4">Jagdbuechse</td>
                    <td className="py-2.5">500 — 900</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Beretta A400</td>
                    <td className="py-2.5 pr-4">Flinte</td>
                    <td className="py-2.5">800 — 1&apos;600</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Benelli M2</td>
                    <td className="py-2.5 pr-4">Flinte</td>
                    <td className="py-2.5">700 — 1&apos;400</td>
                  </tr>
                  <tr className="border-b border-brand-border/50">
                    <td className="py-2.5 pr-4">Smith &amp; Wesson 686</td>
                    <td className="py-2.5 pr-4">Revolver</td>
                    <td className="py-2.5">600 — 1&apos;200</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4">Parabellum P06/08</td>
                    <td className="py-2.5 pr-4">Sammler</td>
                    <td className="py-2.5">2&apos;000 — 6&apos;000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Tipps fuer Verkaeufer: So erzielen Sie den besten Preis
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Wenn Sie eine Waffe verkaufen moechten, gibt es einige Massnahmen, die den erzielbaren Preis deutlich erhoehen koennen. Zunaechst sollten Sie die Waffe gruendlich reinigen und pflegen, bevor Sie sie fotografieren. Saubere, gut beleuchtete Fotos aus verschiedenen Winkeln — inklusive Nahaufnahmen des Laufs, der Markierungen und allfaelliger Gebrauchsspuren — schaffen Vertrauen und erhoehen die Chancen auf einen schnellen Verkauf.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Bieten Sie die Waffe mit allem vorhandenen Zubehoer an: Originalmagazine, Griffschalen, Werkzeug, Reinigungsgeraet, Originalverpackung und Kaufbeleg. Jedes dieser Elemente steigert den Wert. Wenn Sie einen Pruefbericht eines Buechsenmachers vorweisen koennen, ist das ein zusaetzliches Verkaufsargument, das Kaeufer bereit sein laesst, einen hoeheren Preis zu zahlen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Setzen Sie einen realistischen Preis an, indem Sie vergleichbare Inserate auf GunMarket.ch studieren. Ein ueberzogener Preis schreckt potenzielle Kaeufer ab und fuehrt zu langen Standzeiten. Nutzen Sie unsere <Link href="/markt" className="font-medium text-brand-green hover:underline">Marktanalyse</Link>, um den aktuellen Median-Preis fuer Ihr Modell zu ermitteln. Ein Inserat, das leicht unter dem Marktdurchschnitt liegt, verkauft sich in der Regel deutlich schneller.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Beschreiben Sie die Waffe ehrlich und detailliert: Kaliber, Lauflaenge, Zustand, Schussanzahl (falls bekannt), Modifikationen und der Grund fuer den Verkauf. Eine transparente Beschreibung minimiert Rueckfragen und erhoet das Vertrauen potenzieller Kaeufer. Auf GunMarket.ch ist das Inserieren kostenlos — nutzen Sie diese Moeglichkeit, um Ihre Waffe dem groessten Schweizer Publikum zu praesentieren.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-brand-border bg-brand-grey/30 p-8 text-center">
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Marktpreise vergleichen oder inserieren
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              Nutzen Sie die Marktanalyse von GunMarket.ch oder inserieren Sie Ihre Waffe kostenlos.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/markt"
                className="inline-flex items-center rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Aktuelle Marktpreise ansehen
              </Link>
              <Link
                href="/inserat/neu"
                className="inline-flex items-center rounded-lg border border-brand-green px-8 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green-light"
              >
                Jetzt inserieren
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
