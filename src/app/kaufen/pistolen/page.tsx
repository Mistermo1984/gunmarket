import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pistolen kaufen Schweiz — Gebrauchte Pistolen & Revolver | GunMarket.ch",
    description:
      "Gebrauchte Pistolen und Revolver in der Schweiz kaufen. Glock, SIG Sauer, Heckler & Koch — alle Kategorien, alle Kantone. Kostenlos inserieren.",
    alternates: {
      canonical: "https://gunmarket.ch/kaufen/pistolen",
    },
    openGraph: {
      title: "Pistolen kaufen Schweiz — Gebrauchte Pistolen & Revolver | GunMarket.ch",
      description:
        "Gebrauchte Pistolen und Revolver in der Schweiz kaufen. Glock, SIG Sauer, Heckler & Koch — alle Kategorien, alle Kantone.",
      url: "https://gunmarket.ch/kaufen/pistolen",
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
    { "@type": "ListItem", position: 3, name: "Pistolen", item: "https://gunmarket.ch/kaufen/pistolen" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pistolen kaufen Schweiz — Gebrauchte Pistolen & Revolver",
  description:
    "Gebrauchte Pistolen und Revolver in der Schweiz kaufen. Glock, SIG Sauer, Heckler & Koch — alle Kategorien, alle Kantone. Kostenlos inserieren.",
  url: "https://gunmarket.ch/kaufen/pistolen",
  publisher: {
    "@type": "Organization",
    name: "GunMarket.ch",
    url: "https://gunmarket.ch",
  },
};

export default function PistolenKaufenPage() {
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
            <Link href="/kaufen/pistolen" className="text-white">Pistolen kaufen</Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Pistolen kaufen in der Schweiz
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            Der umfassende Kaufratgeber fuer gebrauchte Pistolen und Revolver auf dem Schweizer Markt. Marken, Preise, Rechtslage und Tipps fuer Kaeufer.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Warum eine Pistole auf GunMarket.ch kaufen?
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Pistolen gehoeren zu den beliebtesten Kurzwaffen in der Schweiz. Ob fuer den Schiesssport, die Selbstverteidigung oder als Sammlerstueck — der Markt fuer gebrauchte Pistolen und Revolver ist in der Schweiz ausserordentlich lebendig. Auf GunMarket.ch finden Sie hunderte Inserate von privaten Verkaeufern und konzessionierten Haendlern aus allen 26 Kantonen. Der Kauf einer gebrauchten Pistole bietet gegenueber dem Neukauf erhebliche Vorteile: tiefere Preise, sofortige Verfuegbarkeit und haeufig bereits eingeschossene, zuverlaessige Waffen. Viele Schuetzen bevorzugen gebrauchte Modelle, weil sich deren Praezision und Zuverlaessigkeit bereits im Praxiseinsatz bewaehrt hat.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              GunMarket.ch ist der groesste Schweizer Online-Marktplatz fuer legale Waffen und bietet Ihnen eine uebersichtliche Plattform mit Filtern nach Kaliber, Marke, Zustand, Preis und Kanton. Das Inserieren ist vollstaendig kostenlos — sowohl fuer Kaeufer als auch fuer Verkaeufer. Alle Inserate werden vor der Veroeffentlichung geprueft, um die Sicherheit und Legalitaet auf unserer Plattform zu gewaehrleisten.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Beliebte Pistolenmarken in der Schweiz
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Der Schweizer Markt wird von einigen wenigen, aber hochwertigen Marken dominiert. An erster Stelle steht <Link href="/wissen/waffen/glock-17" className="font-medium text-brand-green hover:underline">Glock</Link>, insbesondere die Modelle Glock 17 und Glock 19. Die oesterreichischen Polymer-Pistolen sind fuer ihre Zuverlaessigkeit, einfache Handhabung und das grosse Zubehoersortiment bekannt. Gebrauchte Glock-Pistolen sind ab etwa CHF 400 erhaeltlich und gehoeren damit zu den erschwinglichsten Halbautomaten auf dem Markt.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              <Link href="/wissen/waffen/sig-p226" className="font-medium text-brand-green hover:underline">SIG Sauer</Link> ist die zweite grosse Marke, die in der Schweiz eine lange Tradition hat. Modelle wie die SIG P226, P228 und P320 sind bei Sportschuetzen und Sammlern gleichermassen beliebt. Besonders die P226 gilt als eine der praezisesten Dienstpistolen der Welt und wird auch von zahlreichen Polizeikorps eingesetzt. Gebrauchte SIG P226 sind im Bereich CHF 600 bis CHF 1200 zu finden.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              <Link href="/wissen/waffen/hk-usp" className="font-medium text-brand-green hover:underline">Heckler &amp; Koch</Link> bietet mit der USP-Serie und der VP9 ebenfalls erstklassige Pistolen, die fuer ihre Verarbeitungsqualitaet und Langlebigkeit geschaetzt werden. Die HK USP ist besonders bei Praezisionsschuetzen beliebt und erzielt gebraucht Preise zwischen CHF 500 und CHF 1000.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Weitere gefragte Marken sind <Link href="/wissen/waffen/cz-75" className="font-medium text-brand-green hover:underline">CZ</Link> mit der legendaeren CZ 75, die fuer ihr ergonomisches Design und den guenstigen Preis bekannt ist, sowie <Link href="/wissen/waffen/walther-ppq" className="font-medium text-brand-green hover:underline">Walther</Link> mit der PPQ und PDP. Auch Beretta ist mit der 92FS und der APX auf dem Schweizer Markt gut vertreten. Die italienische Traditionsmarke ueberzeugt mit hochwertiger Verarbeitung und einem hervorragenden Preis-Leistungs-Verhaeltnis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Rechtslage: Pistolenkauf in der Schweiz
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Fuer den Erwerb einer Pistole oder eines Revolvers in der Schweiz benoetigen Sie in den meisten Faellen einen Waffenerwerbsschein (WES). Dieser wird beim kantonalen Waffenbuero beantragt und kostet je nach Kanton zwischen CHF 20 und CHF 50. Der WES ist nach Ausstellung sechs Monate gueltig und berechtigt zum Erwerb einer einzelnen Waffe. Halbautomatische Pistolen fallen seit der Umsetzung der EU-Waffenrichtlinie 2019 zusaetzlich unter die kantonale Ausnahmebewilligung (ABK Klein), fuer die ein berechtigter Grund nachgewiesen werden muss — etwa die Mitgliedschaft in einem Schiessverein.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Voraussetzungen fuer den WES sind: Schweizer Buergerrecht oder Niederlassungsbewilligung C, Mindestalter 18 Jahre, kein Eintrag im Strafregister fuer Gewaltdelikte und kein Beistandschaftsverhaeltnis. Seit Februar 2023 prueft die Kantonspolizei (KAPO) den Strafregisterauszug automatisch, was den Prozess beschleunigt hat. Der Verkaeufer ist verpflichtet, eine Kopie des WES zehn Jahre lang aufzubewahren. Detaillierte Informationen zur Rechtslage finden Sie auf unserer <Link href="/waffenrecht" className="font-medium text-brand-green hover:underline">Waffenrecht-Seite</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Preise fuer gebrauchte Pistolen in der Schweiz
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Preisspanne fuer gebrauchte Pistolen in der Schweiz ist breit und haengt von Marke, Modell, Zustand und Seltenheit ab. Einsteigermodelle wie gebrauchte CZ 75 oder Glock 17 sind bereits ab CHF 300 bis CHF 500 erhaeltlich. Mittelklasse-Pistolen wie die SIG P226, HK USP oder Walther PPQ bewegen sich typischerweise im Bereich von CHF 500 bis CHF 1000. Premium-Modelle und limitierte Editionen koennen CHF 1500 bis CHF 2000 oder mehr kosten, insbesondere wenn sie sich in neuwertigem Zustand befinden oder seltene Ausfuehrungen darstellen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Revolver sind haeufig etwas guenstiger als halbautomatische Pistolen. Gebrauchte Smith &amp; Wesson oder Ruger Revolver beginnen bei rund CHF 300 und erreichen je nach Modell und Zustand bis zu CHF 1200. Besonders begehrt sind Modelle im Kaliber .357 Magnum, die auch mit .38 Special geladen werden koennen und damit vielseitig einsetzbar sind.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Worauf beim Pistolenkauf achten?
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Beim Kauf einer gebrauchten Pistole sollten Sie einige wichtige Punkte beachten. Pruefen Sie zunachst den aeusseren Zustand der Waffe: Gibt es Korrosionsspuren, starke Gebrauchsspuren am Finish oder sichtbare Beschaedigungen am Griffstueck oder Schlitten? Fordern Sie wenn moeglich Fotos des Laufs an oder besichtigen Sie die Waffe persoenlich. Ein gut gepflegter Lauf ohne Pittings oder Erosion ist entscheidend fuer die Praezision.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Achten Sie auf die Vollstaendigkeit: Originalmagazine, Griffschalen, Werkzeug und Originalverpackung erhoehen den Wert erheblich. Fragen Sie nach der Schussanzahl und ob die Waffe regelmaessig gewartet wurde. Ein Pruefbericht eines Buechsenmachers kann zusaetzliche Sicherheit bieten. Vereinbaren Sie die Uebergabe idealerweise auf einem Schiessstand oder bei einem Waffenhaendler, wo Sie die Waffe unter Aufsicht testen koennen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Vergleichen Sie Preise auf GunMarket.ch, bevor Sie ein Angebot annehmen. Unser Marktplatz bietet Ihnen die Moeglichkeit, aehnliche Modelle zu vergleichen und so den fairen Marktwert einzuschaetzen. Achten Sie darauf, dass der Verkaeufer Ihren gueltigen WES verlangt — dies ist ein Zeichen dafuer, dass er gesetzeskonform handelt.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-brand-border bg-brand-grey/30 p-8 text-center">
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Pistolen-Inserate durchsuchen
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              Finden Sie Ihre naechste Pistole auf GunMarket.ch — dem groessten Schweizer Waffenmarktplatz.
            </p>
            <Link
              href="/?hauptkategorie=kurzwaffen"
              className="inline-flex items-center rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Alle Pistolen-Inserate ansehen
            </Link>
          </section>

        </div>
      </div>
    </>
  );
}
