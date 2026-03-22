import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Jagdwaffen kaufen Schweiz — Büchsen, Flinten & Jagdgewehre | GunMarket.ch",
    description:
      "Jagdwaffen kaufen in der Schweiz: Repetierer, Einzellader, Kipplaufgewehre und Flinten. Aktuelle Inserate von Jägern und Händlern.",
    alternates: {
      canonical: "https://gunmarket.ch/kaufen/jagdwaffen",
    },
    openGraph: {
      title: "Jagdwaffen kaufen Schweiz — Büchsen, Flinten & Jagdgewehre | GunMarket.ch",
      description:
        "Jagdwaffen kaufen in der Schweiz: Repetierer, Einzellader, Kipplaufgewehre und Flinten. Aktuelle Inserate von Jägern und Händlern.",
      url: "https://gunmarket.ch/kaufen/jagdwaffen",
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
    { "@type": "ListItem", position: 3, name: "Jagdwaffen", item: "https://gunmarket.ch/kaufen/jagdwaffen" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Jagdwaffen kaufen Schweiz — Büchsen, Flinten & Jagdgewehre",
  description:
    "Jagdwaffen kaufen in der Schweiz: Repetierer, Einzellader, Kipplaufgewehre und Flinten. Aktuelle Inserate von Jägern und Händlern.",
  url: "https://gunmarket.ch/kaufen/jagdwaffen",
  publisher: {
    "@type": "Organization",
    name: "GunMarket.ch",
    url: "https://gunmarket.ch",
  },
};

export default function JagdwaffenKaufenPage() {
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
            <Link href="/kaufen/jagdwaffen" className="text-white">Jagdwaffen kaufen</Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Jagdwaffen kaufen in der Schweiz
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            Buechsen, Flinten und Jagdgewehre fuer die Schweizer Jagd. Kaufratgeber mit Kaliber-Empfehlungen, Modellvergleich und Rechtslage.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Jagdwaffen-Ratgeber fuer die Schweiz
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Schweiz bietet mit ihren vielfaeltigen Landschaften — von den Alpen ueber das Mittelland bis zum Jura — hervorragende Jagdmoeglichkeiten. Entsprechend breit gefaechert ist die Nachfrage nach Jagdwaffen. Ob Sie auf Gamswild in den Bergen, Rehe im Mittelland oder Wasservogel an den Seen jagen — die richtige Waffe ist entscheidend fuer den Jagderfolg und eine waidgerechte Erlegung. Auf GunMarket.ch finden Sie das groesste Angebot an gebrauchten Jagdwaffen in der Schweiz, angeboten von erfahrenen Jaegern und konzessionierten Waffenhaendlern aus allen Kantonen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Jagd in der Schweiz wird kantonal geregelt. Die meisten Kantone kennen das Patentsystem, waehrend einige (wie Graubuenden) das Reviersystem praktizieren. Unabhaengig vom System benoetigen Sie eine kantonale Jagdberechtigung, die in der Regel eine Jagdpruefung voraussetzt. Die Bernische Jegervereinigung BEJV und andere kantonale Jaegerverbande organisieren Ausbildungskurse und Pruefungen. Neben der Jagdberechtigung benoetigen Sie fuer den Waffenerwerb je nach Waffentyp einen Waffenerwerbsschein (WES) oder koennen bestimmte Jagdwaffen frei erwerben.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Beliebte Jagdbuechsen-Modelle
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die <Link href="/wissen/waffen/blaser-r8" className="font-medium text-brand-green hover:underline">Blaser R8</Link> ist die meistverkaufte Jagdbuechse in der Schweiz. Das modulare Geradezugsystem erlaubt einen schnellen Kaliber- und Laufwechsel und macht die R8 zur vielseitigsten Jagdbuechse auf dem Markt. Gebrauchte Blaser R8 sind ab CHF 2000 erhaeltlich, wobei gut ausgestattete Modelle mit Wechsellaeufen und Holzschaft CHF 4000 bis CHF 6000 erreichen koennen. Die hervorragende Verarbeitung und der hohe Wiederverkaufswert machen die R8 zu einer lohnenden Investition.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Sako 85 ist eine finnische Premium-Buechse, die fuer ihre herausragende Praezision und den aeusserst sauberen Abzug bekannt ist. Sie ist in zahlreichen Kalibern erhaeltlich und wird von vielen Schweizer Jaegern als die praeziseste Serienbuechse geschaetzt. Gebrauchte Sako 85 bewegen sich im Bereich von CHF 1200 bis CHF 2500.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die <Link href="/wissen/waffen/tikka-t3x" className="font-medium text-brand-green hover:underline">Tikka T3x</Link> bietet ein ausgezeichnetes Preis-Leistungs-Verhaeltnis und ist die beliebteste Einsteigerbuechse fuer Schweizer Jaeger. Produziert von der Sako-Tochter Tikka in Finnland, ueberzeugt sie durch einen glatten Kammerstengel, einen sauberen Abzug und eine bemerkenswerte Praezision ab Werk. Gebrauchte Tikka T3x sind bereits ab CHF 600 bis CHF 1200 zu haben.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Mauser M18 ist die modernste Interpretation der deutschen Jagdbuechsen-Tradition und bietet hochwertige Verarbeitung zu einem fairen Preis. Mit ihrem 3-Stellungs-Sicherungssystem und dem einstellbaren Abzug ist sie besonders bei preisbewussten Jaegern beliebt. Gebrauchte Mauser M18 starten bei rund CHF 500 bis CHF 900.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Kaliber-Empfehlungen fuer die Schweizer Jagd
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Wahl des richtigen Kalibers ist entscheidend fuer eine waidgerechte und effektive Jagd. Fuer die Rehjagd im Mittelland und die Gamsjagd in den Voralpen ist das Kaliber <Link href="/wissen/munition/308-winchester" className="font-medium text-brand-green hover:underline">.308 Winchester</Link> (7.62x51mm) die populaerste Wahl. Es bietet ausreichend Energie fuer mittelgrosses Wild, hat einen moderaten Rueckstoss und ist in der Schweiz weit verbreitet und guenstig in der Munition.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Das Kaliber 7x64 Brenneke ist das klassische europaeische Jagdkaliber und in der Schweiz nach wie vor sehr beliebt. Es bietet eine etwas hoehere Muendungsenergie als die .308 und eignet sich hervorragend fuer die Jagd auf Reh, Gams und auch groesseres Wild wie Hirsch. Die Patronen sind in der Schweiz breit erhaeltlich und bieten eine grosse Auswahl an Geschossen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Das Kaliber .30-06 Springfield ist ein vielseitiger Allrounder, der sich fuer nahezu alle Wildarten eignet, die in der Schweiz bejagt werden. Vom Reh bis zum Hirsch deckt die .30-06 ein breites Spektrum ab und ist in zahllosen Buechsenmodellen erhaeltlich. Ebenfalls zunehmend beliebt ist das Kaliber 6.5 Creedmoor, das dank seines geringen Rueckstosses und der hervorragenden Praezision auf laengere Distanzen immer mehr Anhaenger findet. Es eignet sich besonders fuer die Bergjagd auf Gams und Steinwild, wo weite Schuesse ueblich sein koennen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Flinten fuer die Jagd und den Schiesssport
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Fuer die Niederwildjagd, die Wasservogeljagd und den Tontaubensport sind Flinten unverzichtbar. Die <Link href="/wissen/waffen/beretta-a400" className="font-medium text-brand-green hover:underline">Beretta A400</Link> ist die beliebteste Halbautomatik-Flinte in der Schweiz. Sie ueberzeugt durch ihr geringes Rueckstoss-System (Kick-Off), zuverlaessige Funktion und hochwertige Verarbeitung. Gebrauchte Beretta A400 sind im Bereich von CHF 800 bis CHF 1600 zu finden.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die <Link href="/wissen/waffen/benelli-m2" className="font-medium text-brand-green hover:underline">Benelli M2</Link> ist eine weitere erstklassige Halbautomatik-Flinte, die fuer ihre Robustheit und Zuverlaessigkeit unter extremen Bedingungen bekannt ist. Das Inertia-System von Benelli arbeitet ohne Gaskolben und ist dadurch besonders wartungsarm. Gebrauchte Benelli M2 bewegen sich preislich zwischen CHF 700 und CHF 1400.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Fuer die klassische Jagd und den Parcours-Schiesssport sind Bockflinten von Browning und Beretta die erste Wahl. Die Browning B725 und die Beretta 686/694 bieten erstklassige Verarbeitung und sind in der Schweiz weit verbreitet. Gebrauchte Bockflinten beginnen bei rund CHF 800 und koennen je nach Ausfuehrung und Gravur mehrere tausend Franken kosten.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Rechtslage und kantonale Regelungen
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Die Rechtslage beim Jagdwaffenkauf in der Schweiz haengt vom Waffentyp ab. Einschuessige und mehrlaefige Jagdgewehre (Kipplauf-Buechsen, Bockbuechsflinten, Drillinge) sind gemaess Art. 10 WG fuer Personen ab 18 Jahren frei erwerbbar — es wird kein WES benoetigt. Fuer Repetierbuechsen (Bolt-Action) ist hingegen ein WES erforderlich. Halbautomatische Jagdbuechsen und -flinten fallen unter die ABK-Klein-Pflicht. Als Jaeger mit gueltigem Jagdpatent koennen Sie den berechtigten Grund fuer die ABK Klein in der Regel problemlos nachweisen.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Beachten Sie, dass seit 2024 Schalldaempfer fuer die Jagd unter bestimmten Auflagen bewilligt werden koennen (ABK Gross). Dies dient dem Gehoerschutz und der Laermminderung in bewohnten Gebieten. Informieren Sie sich bei Ihrem kantonalen Waffenbuero ueber die aktuellen Bestimmungen. Umfassende Informationen finden Sie auf unserer <Link href="/waffenrecht" className="font-medium text-brand-green hover:underline">Waffenrecht-Seite</Link>.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-brand-border bg-brand-grey/30 p-8 text-center">
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
              Jagdwaffen-Inserate durchsuchen
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              Finden Sie die perfekte Jagdwaffe auf GunMarket.ch — Buechsen, Flinten und Kombinationswaffen von Jaegern fuer Jaeger.
            </p>
            <Link
              href="/?hauptkategorie=langwaffen"
              className="inline-flex items-center rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Alle Jagdwaffen-Inserate ansehen
            </Link>
          </section>

        </div>
      </div>
    </>
  );
}
