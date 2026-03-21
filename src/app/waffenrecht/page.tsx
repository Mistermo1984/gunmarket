import LegalLayout, { Section, InfoBox, WarnBox } from "@/components/legal/LegalLayout";
import WaffenrechtHeader from "@/components/legal/WaffenrechtHeader";

const toc = [
  { id: "ueberblick", label: "Überblick Schweizer Waffenrecht" },
  { id: "frei", label: "Frei erwerbbare Waffen" },
  { id: "wes", label: "WES-pflichtige Waffen" },
  { id: "abk-klein", label: "Ausnahmebewilligung Kanton (ABK Klein)" },
  { id: "abk-gross", label: "Ausnahmebewilligung Bund (ABK Gross)" },
  { id: "ordonnanz", label: "Ordonnanzwaffen" },
  { id: "verboten", label: "Verbotene Waffen" },
  { id: "handel", label: "Privater Waffenhandel" },
  { id: "aufbewahrung", label: "Aufbewahrung und Transport" },
  { id: "links", label: "Nützliche Links" },
];

export const metadata = {
  title: "Waffenrecht Schweiz — Waffengesetz, WES & Bewilligungen",
  description:
    "Übersicht zum Schweizer Waffengesetz (WG): Frei erwerbbare Waffen, WES-pflichtige Waffen, Ausnahmebewilligungen, Ordonnanzwaffen, verbotene Waffen, Aufbewahrung und Transport.",
  alternates: {
    canonical: "https://gunmarket.ch/waffenrecht",
  },
  openGraph: {
    title: "Waffenrecht Schweiz — GunMarket.ch",
    description: "Alles zum Schweizer Waffengesetz: Kategorien, Bewilligungen und Pflichten.",
    url: "https://gunmarket.ch/waffenrecht",
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welche Waffen sind in der Schweiz frei erwerbbar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In der Schweiz sind Waffen der Kategorie C (z.B. Repetiergewehre, Einzellader) für Personen ab 18 Jahren ohne Bewilligung frei erwerbbar, sofern kein Ausschlussgrund vorliegt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Waffenerwerbsschein (WES) in der Schweiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Waffenerwerbsschein (WES) ist eine Bewilligung für den Erwerb von Waffen der Kategorie B (z.B. Halbautomaten, Pistolen). Er wird beim kantonalen Waffenbüro beantragt und kostet je nach Kanton CHF 20–50.',
      },
    },
    {
      '@type': 'Question',
      name: 'Darf ich meine Ordonnanzwaffe nach dem Militärdienst behalten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Schweizer Militärangehörige können ihre persönliche Ordonnanzwaffe nach dem Dienst behalten. Das Sturmgewehr wird dabei auf halbautomatisch umgebaut und als Kategorie-B-Waffe eingetragen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie transportiere ich eine Waffe legal in der Schweiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Waffen müssen ungeladen und wenn möglich in einem geschlossenen Behältnis transportiert werden. Munition ist getrennt von der Waffe aufzubewahren. Für den Transport zum Schiessstand, Büchsenmacher oder auf die Jagd gelten Ausnahmen.',
      },
    },
  ],
};

export default function WaffenrechtPage() {
  return (
    <LegalLayout title="Waffenrecht Schweiz" updated="1. März 2026" toc={toc}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WaffenrechtHeader />
      <WarnBox>
        Diese Seite dient ausschliesslich der allgemeinen Information und ersetzt keine
        Rechtsberatung. Bei konkreten Fragen wenden Sie sich an Ihr kantonales Waffenbüro oder
        einen Rechtsanwalt.
      </WarnBox>

      <Section id="ueberblick" title="1. Überblick Schweizer Waffenrecht">
        <p>
          Das Schweizer Waffenrecht wird hauptsächlich durch das Bundesgesetz über Waffen,
          Waffenzubehör und Munition (Waffengesetz, WG; SR 514.54) und die zugehörige
          Waffenverordnung (WV; SR 514.541) geregelt.
        </p>
        <p>
          Seit der Umsetzung der EU-Waffenrichtlinie 2019 und der KAPO-Prüfpflicht ab Februar 2023
          gelten verschärfte Bestimmungen für bestimmte Waffenkategorien.
        </p>
        <p>
          Das Schweizer System unterscheidet mehrere Erwerbskategorien, die bestimmen, welche
          Dokumente und Bewilligungen für den Erwerb und Besitz einer Waffe erforderlich sind.
        </p>
      </Section>

      <Section id="frei" title="2. Frei erwerbbare Waffen">
        <p>
          Bestimmte Waffen können ohne Waffenerwerbsschein (WES) erworben werden. Es ist jedoch
          ein Mindestalter von 18 Jahren und ein sauberes Strafregister erforderlich.
        </p>
        <p className="mt-2 font-semibold">Dazu gehören:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Einschüssige und mehrläufige Jagdgewehre (Kipplauf)</li>
          <li>Druckluftwaffen unter 7,5 Joule</li>
          <li>Antike Waffen (hergestellt vor 1870)</li>
          <li>Repliken, die nicht mit scharfer Munition geladen werden können</li>
        </ul>
        <InfoBox>
          Auch für frei erwerbbare Waffen gelten die allgemeinen Voraussetzungen: Mindestalter 18,
          Handlungsfähigkeit und kein Eintrag im Strafregister für Gewaltdelikte.
        </InfoBox>
      </Section>

      <Section id="wes" title="3. WES-pflichtige Waffen">
        <p>
          Für die meisten Waffen in der Schweiz wird ein Waffenerwerbsschein (WES) benötigt. Dieser
          wird beim kantonalen Waffenbüro beantragt und ist nach Ausstellung 6 Monate gültig
          (9 Monate für Erbwaffen).
        </p>
        <p className="mt-2 font-semibold">WES-pflichtige Waffen:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Repetierwaffen (Bolt-Action, Unterhebelrepetierer)</li>
          <li>Halbautomatische Langwaffen mit max. 10 Schuss Magazin</li>
          <li>Einzellader-Pistolen und -Revolver</li>
        </ul>
        <p className="mt-2 font-semibold">Voraussetzungen für den WES:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Schweizer Bürger oder Ausländer mit Niederlassungsbewilligung C</li>
          <li>Mindestalter 18 Jahre</li>
          <li>Kein Eintrag im Strafregister (Prüfung durch KAPO seit Feb. 2023)</li>
          <li>Kein Beistandschafts- oder Vormundschaftsverhältnis</li>
          <li>Kein Grund zur Annahme von Selbst- oder Drittgefährdung</li>
        </ul>
      </Section>

      <Section id="abk-klein" title="4. Ausnahmebewilligung Kanton (ABK Klein)">
        <p>
          Seit der Umsetzung der EU-Waffenrichtlinie 2019 benötigen bestimmte Waffenkategorien eine
          kantonale Ausnahmebewilligung (ABK Klein) zusätzlich zum WES.
        </p>
        <p className="mt-2 font-semibold">ABK-Klein-pflichtige Waffen:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Halbautomatische Faustfeuerwaffen (Pistolen, Revolver mit Trommelmagazin)</li>
          <li>Halbautomatische Zentralfeuer-Langwaffen mit Magazin über 10 Schuss</li>
          <li>Pump-Action-Gewehre (seit 2019 für Privatpersonen bewilligungspflichtig)</li>
        </ul>
        <p className="mt-2 font-semibold">Voraussetzungen:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Alle WES-Voraussetzungen müssen erfüllt sein</li>
          <li>Nachweis eines berechtigten Grundes (Sportschütze, Sammler, Jäger)</li>
          <li>Sportschützen: Nachweis regelmässiger Schiesstätigkeit</li>
          <li>Sammler: Darlegung des Sammelkonzepts</li>
        </ul>
        <InfoBox>
          Die Bearbeitungszeit für ABK-Klein-Gesuche variiert je nach Kanton erheblich —
          rechnen Sie mit 4 bis 12 Wochen.
        </InfoBox>
      </Section>

      <Section id="abk-gross" title="5. Ausnahmebewilligung Bund (ABK Gross)">
        <p>
          Für besonders regulierte Waffen ist eine Ausnahmebewilligung des Bundes (fedpol)
          erforderlich. Diese wird nur in Ausnahmefällen erteilt.
        </p>
        <p className="mt-2 font-semibold">ABK-Gross-pflichtige Waffen:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Vollautomatische Waffen</li>
          <li>Schalldämpfer (seit 2024 für Jagd unter Auflagen erlaubt)</li>
          <li>Laserpointer über 1 mW an Waffen</li>
          <li>Granatwerfer und Abschussgeräte</li>
        </ul>
        <WarnBox>
          ABK-Gross-Bewilligungen werden nur in begründeten Ausnahmefällen erteilt, insbesondere
          für Museen, anerkannte Sammler und konzessionierte Waffenhändler.
        </WarnBox>
      </Section>

      <Section id="ordonnanz" title="6. Ordonnanzwaffen">
        <p>
          Schweizer Armeeangehörige können ihre persönliche Waffe nach Dienstende übernehmen.
          Für den Erwerb von Ordonnanzwaffen gelten besondere Bestimmungen.
        </p>
        <p className="mt-2 font-semibold">Regelung:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>WES erforderlich</li>
          <li>Bestätigung des Armeelogistikcenters (ALC) über Waffentyp und Seriennummer</li>
          <li>Sturmgewehr wird vor Übergabe auf Halbautomatik umgebaut</li>
          <li>Historische Ordonnanzwaffen (z. B. K31, K11) benötigen nur einen WES</li>
        </ul>
        <InfoBox>
          Der Erwerb von Ordonnanzwaffen ab Lager (ALC) ist besonders günstig. Informieren Sie
          sich direkt beim ALC über verfügbare Modelle und Preise.
        </InfoBox>
      </Section>

      <Section id="verboten" title="7. Verbotene Waffen">
        <p>
          Art. 5 WG definiert Waffen, die in der Schweiz grundsätzlich verboten sind. Deren Erwerb,
          Besitz und Übertragung ist strafbar.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Sprengmittel und militärische Sprengvorrichtungen</li>
          <li>Tragbare Raketenwerfer und schwere Waffen</li>
          <li>Getarnte Waffen (z. B. als Stock oder Regenschirm)</li>
          <li>Messer mit automatischem Öffnungsmechanismus (Ausnahme: Einhandmesser)</li>
          <li>Wurfmesser und Wurfsterne</li>
        </ul>
        <WarnBox>
          Der Handel mit verbotenen Waffen ist auf GunMarket.ch strengstens untersagt und wird
          zur Anzeige gebracht. Inserate werden umgehend gelöscht und das Konto gesperrt.
        </WarnBox>
      </Section>

      <Section id="handel" title="8. Privater Waffenhandel">
        <p>
          Beim privaten Waffenverkauf müssen folgende Regeln eingehalten werden:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Der Verkäufer muss die Berechtigung des Käufers prüfen (WES, ABK etc.)</li>
          <li>Ein schriftlicher Vertrag wird empfohlen</li>
          <li>Kopien des WES müssen 10 Jahre aufbewahrt werden</li>
          <li>Die Übergabe sollte persönlich und an einem geeigneten Ort stattfinden</li>
          <li>Versand von Waffen ist nur über konzessionierte Waffenhändler oder per Einschreiben zulässig</li>
        </ul>
        <InfoBox>
          Tipp: Führen Sie die Übergabe auf einem Schiessstand oder bei einem Waffenhändler
          durch. So haben Sie Zeugen und können die Waffe direkt prüfen.
        </InfoBox>
      </Section>

      <Section id="aufbewahrung" title="9. Aufbewahrung und Transport">
        <p>
          Waffen müssen sorgfältig aufbewahrt und vor dem Zugriff Dritter geschützt werden
          (Art. 26 WG).
        </p>
        <p className="mt-2 font-semibold">Aufbewahrung:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Waffen und Munition getrennt aufbewahren (empfohlen)</li>
          <li>Waffenschrank oder abschliessbarer Raum empfohlen</li>
          <li>Zugriff durch Unbefugte verhindern</li>
        </ul>
        <p className="mt-2 font-semibold">Transport:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Waffen ungeladen und in geeigneter Verpackung transportieren</li>
          <li>Munition getrennt von der Waffe transportieren</li>
          <li>Direkter Weg zum Zielort (Schiessstand, Waffenhändler etc.)</li>
          <li>Kein offenes Tragen in der Öffentlichkeit</li>
        </ul>
      </Section>

      <Section id="links" title="10. Nützliche Links">
        <p>Weiterführende Informationen finden Sie hier:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Waffengesetz (WG):</strong> SR 514.54 — fedlex.admin.ch</li>
          <li><strong>Waffenverordnung (WV):</strong> SR 514.541 — fedlex.admin.ch</li>
          <li><strong>fedpol Waffen:</strong> fedpol.admin.ch/fedpol/de/home/sicherheit/waffen.html</li>
          <li><strong>Kantonale Waffenbüros:</strong> Kontaktdaten über Ihre Kantonspolizei</li>
        </ul>
        <InfoBox>
          Bei Unsicherheiten kontaktieren Sie immer zuerst Ihr kantonales Waffenbüro. Die
          Mitarbeiter sind in der Regel sehr hilfsbereit und geben gerne Auskunft.
        </InfoBox>
      </Section>
    </LegalLayout>
  );
}
