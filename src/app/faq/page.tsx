import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Häufige Fragen",
  description:
    "Häufig gestellte Fragen zu GunMarket.ch — Dem grössten Schweizer Waffenmarktplatz. Waffenkauf, Waffenerwerbsschein, Kategorien und mehr.",
};

const faqs = [
  {
    q: "Was ist GunMarket.ch?",
    a: "GunMarket.ch ist der grösste Schweizer Online-Marktplatz für den Kauf und Verkauf von legalen Waffen, Munition, Optik und Zubehör. Die Plattform ist 100% kostenlos für Käufer und Verkäufer.",
  },
  {
    q: "Ist es legal, Waffen in der Schweiz online zu kaufen?",
    a: "Ja, der private Kauf und Verkauf von legalen Waffen ist in der Schweiz unter Einhaltung des Waffengesetzes (WG) erlaubt. Viele Waffen sind frei erhältlich, andere benötigen einen Waffenerwerbsschein (WES). Weitere Informationen finden Sie auf unserer Waffenrecht-Seite.",
  },
  {
    q: "Wie kann ich auf GunMarket.ch ein Inserat aufgeben?",
    a: 'Registrieren Sie sich kostenlos auf GunMarket.ch, klicken Sie auf "+ Inserat" und füllen Sie das Formular aus. Das Aufgeben von Inseraten ist vollständig kostenlos.',
  },
  {
    q: "Welche Waffen kann ich auf GunMarket.ch kaufen?",
    a: "Auf GunMarket.ch finden Sie Kurzwaffen (Pistolen, Revolver), Langwaffen (Büchsen, Flinten), Ordonnanzwaffen (K31, StG57, SIG P210), Luftdruckwaffen, Optik, Munition, Messer und Wiederladen-Zubehör — alle in der Schweiz legalen Kategorien.",
  },
  {
    q: "In welchen Kantonen sind Inserate verfügbar?",
    a: "GunMarket.ch deckt alle 26 Schweizer Kantone ab — von Zürich bis Genf, von Basel bis Tessin. Mit der Kartensuche finden Sie Waffen in Ihrer Nähe.",
  },
  {
    q: "Ist GunMarket.ch auch auf Französisch oder Italienisch verfügbar?",
    a: "Ja! GunMarket.ch ist auf Deutsch, Französisch, Italienisch, Englisch und Rumantsch verfügbar — für alle Sprachregionen der Schweiz.",
  },
  {
    q: "Wo kann ich in der Schweiz eine gebrauchte SIG P210 kaufen?",
    a: "Auf GunMarket.ch finden Sie regelmässig gebrauchte SIG P210 (Pistole 49) Angebote aus der ganzen Schweiz. Die SIG P210 ist eine ikonische Schweizer Ordonnanzpistole und bei Sammlern sehr begehrt.",
  },
  {
    q: "Was ist der Karabiner 31 (K31)?",
    a: "Der Karabiner 31 (K31) ist ein Schweizer Militärgewehr im Kaliber 7.5x55 Swiss, das von 1931 bis in die 1970er Jahre als Ordonnanzwaffe diente. Heute ist er ein beliebtes Sammlerstück und Sportgewehr. Auf GunMarket.ch finden Sie viele K31-Angebote.",
  },
  {
    q: "Wie unterscheidet sich GunMarket.ch von waffengebraucht.ch?",
    a: "GunMarket.ch ist moderner, mehrsprachig (DE/FR/IT/EN/RM), hat eine Kartensuche, ein Waffen-Wiki und deckt alle Schweizer Kantone ab. Zudem ist die Plattform 100% kostenlos.",
  },
  {
    q: "Benötige ich einen Waffenerwerbsschein (WES) für eine Pistole?",
    a: "In der Schweiz benötigen Sie für die meisten Kurzwaffen (Pistolen, Revolver) einen Waffenerwerbsschein (WES), der beim kantonalen Waffenbüro erhältlich ist. Ausnahmen gelten z.B. für bestimmte Sammlerwaffen. Details finden Sie auf unserer Waffenrecht-Seite.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-black uppercase tracking-tight text-brand-dark mb-2">
        Häufige Fragen
      </h1>
      <p className="text-neutral-500 mb-10">
        Alles was Sie über GunMarket.ch wissen müssen.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-brand-border bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-brand-dark mb-2">
              {faq.q}
            </h2>
            <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
