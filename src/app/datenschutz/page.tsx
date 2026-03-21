import LegalLayout, { Section, InfoBox } from "@/components/legal/LegalLayout";

const toc = [
  { id: "verantwortlich", label: "Verantwortliche Stelle" },
  { id: "erhebung", label: "Erhebung personenbezogener Daten" },
  { id: "zweck", label: "Zweck der Datenverarbeitung" },
  { id: "rechtsgrundlagen", label: "Rechtsgrundlagen" },
  { id: "weitergabe", label: "Weitergabe an Dritte" },
  { id: "cookies", label: "Cookies und Tracking" },
  { id: "speicherung", label: "Speicherung und Löschung" },
  { id: "rechte", label: "Ihre Rechte" },
  { id: "sicherheit", label: "Datensicherheit" },
  { id: "aenderungen", label: "Änderungen dieser Erklärung" },
];

export const metadata = {
  title: "Datenschutz — GunMarket.ch",
  description: "Datenschutzerklärung von GunMarket.ch gemäss dem neuen Schweizer Datenschutzgesetz (nDSG).",
  alternates: {
    canonical: "https://gunmarket.ch/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" updated="1. März 2026" toc={toc}>
      <InfoBox>
        Diese Datenschutzerklärung richtet sich nach dem revidierten Bundesgesetz über den
        Datenschutz (nDSG), in Kraft seit 1. September 2023, sowie der
        Datenschutzverordnung (DSV).
      </InfoBox>

      <Section id="verantwortlich" title="1. Verantwortliche Stelle">
        <p>Verantwortlich für die Datenbearbeitung ist:</p>
        <p className="mt-2">
          <strong>gunmarket.ch</strong><br />
          Aarestr. 62<br />
          3613 Steffisburg<br />
          Schweiz
        </p>
        <p className="mt-2">
          Kontakt: <a href="/kontakt" className="text-[#4d8230] hover:underline">Kontaktformular</a>
        </p>
      </Section>

      <Section id="erhebung" title="2. Erhebung personenbezogener Daten">
        <p>Wir erheben folgende personenbezogene Daten:</p>
        <p className="mt-2 font-semibold">Bei der Registrierung:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Vor- und Nachname</li>
          <li>E-Mail-Adresse</li>
          <li>Passwort (verschlüsselt gespeichert)</li>
          <li>Kanton / Standort</li>
          <li>Kontotyp (Privat oder Händler)</li>
          <li>Bei Händlern: Firmenname, UID-Nummer, Waffenhandelsbewilligung</li>
        </ul>
        <p className="mt-2 font-semibold">Bei der Nutzung der Plattform:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>IP-Adresse und Browser-Informationen</li>
          <li>Inseratedaten (Titel, Beschreibung, Bilder, Preis, Kategorie)</li>
          <li>Suchanfragen und Filtereinstellungen</li>
          <li>Nachrichten an andere Nutzer</li>
          <li>Zeitstempel der Aktivitäten</li>
        </ul>
      </Section>

      <Section id="zweck" title="3. Zweck der Datenverarbeitung">
        <p>Ihre Daten werden ausschliesslich für folgende Zwecke verwendet:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Bereitstellung und Betrieb der Plattform</li>
          <li>Verwaltung Ihres Benutzerkontos</li>
          <li>Veröffentlichung und Verwaltung Ihrer Inserate</li>
          <li>Ermöglichung der Kommunikation zwischen Nutzern</li>
          <li>Verbesserung unserer Dienste und Nutzererfahrung</li>
          <li>Einhaltung gesetzlicher Pflichten (z.B. Waffengesetz)</li>
          <li>Missbrauchsprävention und Sicherheit</li>
        </ul>
      </Section>

      <Section id="rechtsgrundlagen" title="4. Rechtsgrundlagen">
        <p>Die Verarbeitung Ihrer Daten erfolgt gestützt auf:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Einwilligung (Art. 6 Abs. 6 nDSG):</strong> Für optionale Dienste und Kommunikation</li>
          <li><strong>Vertragserfüllung (Art. 6 Abs. 3 nDSG):</strong> Für die Erbringung unserer Plattform-Dienste</li>
          <li><strong>Gesetzliche Pflicht (Art. 6 Abs. 3 nDSG):</strong> Für die Einhaltung des Waffengesetzes und anderer Vorschriften</li>
          <li><strong>Überwiegendes Interesse (Art. 6 Abs. 1 nDSG):</strong> Für Sicherheit und Missbrauchsprävention</li>
        </ul>
      </Section>

      <Section id="weitergabe" title="5. Weitergabe an Dritte">
        <p>
          Ihre Daten werden grundsätzlich nicht an Dritte weitergegeben. Ausnahmen bestehen in
          folgenden Fällen:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Hosting-Provider für den Betrieb der Plattform (Auftragsverarbeitung in der Schweiz)</li>
          <li>Strafverfolgungsbehörden bei richterlicher Anordnung oder gesetzlicher Pflicht</li>
          <li>Kantonale Waffenbüros bei begründetem Verdacht auf Gesetzesverstösse</li>
        </ul>
        <InfoBox>
          Es findet keine Datenübermittlung ins Ausland statt. Alle Daten werden auf Servern in
          der Schweiz gespeichert und verarbeitet.
        </InfoBox>
      </Section>

      <Section id="cookies" title="6. Cookies und Tracking">
        <p>
          GunMarket.ch verwendet ausschliesslich technisch notwendige Cookies für den Betrieb der
          Plattform. Wir setzen keine Tracking-, Werbe- oder Analyse-Cookies ein.
        </p>
        <p className="mt-2 font-semibold">Verwendete Cookies:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Session-Cookie:</strong> Für die Anmeldesitzung (wird beim Schliessen des Browsers gelöscht)</li>
          <li><strong>Angemeldet-bleiben-Cookie:</strong> Optionaler Cookie für die Dauersitzung (max. 30 Tage)</li>
        </ul>
        <p>
          Es werden keine Daten an Drittanbieter wie Google Analytics oder Social-Media-Plattformen
          übermittelt.
        </p>
      </Section>

      <Section id="speicherung" title="7. Speicherung und Löschung">
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen
          Verarbeitungszweck erforderlich ist:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Kontodaten:</strong> Bis zur Löschung des Kontos durch den Nutzer</li>
          <li><strong>Inserate:</strong> Bis zur Löschung durch den Nutzer oder 90 Tage nach Ablauf</li>
          <li><strong>Nachrichten:</strong> Bis zur Löschung des Kontos</li>
          <li><strong>Server-Logs:</strong> Maximal 90 Tage</li>
          <li><strong>Gesetzliche Aufbewahrung:</strong> 10 Jahre für Daten, die dem Waffengesetz unterliegen</li>
        </ul>
        <p>
          Nach Ablauf der Aufbewahrungsfrist werden die Daten unwiderruflich gelöscht oder
          anonymisiert.
        </p>
      </Section>

      <Section id="rechte" title="8. Ihre Rechte">
        <p>
          Gemäss dem neuen Datenschutzgesetz (nDSG) haben Sie folgende Rechte:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Auskunftsrecht (Art. 25 nDSG):</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
          <li><strong>Berichtigungsrecht (Art. 32 Abs. 1 nDSG):</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
          <li><strong>Löschungsrecht (Art. 32 Abs. 2 lit. c nDSG):</strong> Sie können die Löschung Ihrer Daten verlangen</li>
          <li><strong>Datenherausgabe (Art. 28 nDSG):</strong> Sie können Ihre Daten in einem gängigen Format anfordern</li>
          <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen</li>
        </ul>
        <InfoBox>
          Zur Ausübung Ihrer Rechte nutzen Sie bitte unser <a href="/kontakt" className="text-[#4d8230] hover:underline">Kontaktformular</a>. Wir
          beantworten Ihre Anfrage innerhalb von 30 Tagen.
        </InfoBox>
        <p>
          Sie haben zudem das Recht, Beschwerde beim Eidgenössischen Datenschutz- und
          Öffentlichkeitsbeauftragten (EDÖB) einzureichen.
        </p>
      </Section>

      <Section id="sicherheit" title="9. Datensicherheit">
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen zum Schutz Ihrer
          Daten gemäss Art. 8 nDSG:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Verschlüsselte Datenübertragung (TLS/SSL)</li>
          <li>Verschlüsselte Speicherung von Passwörtern (bcrypt)</li>
          <li>Regelmässige Sicherheitsupdates</li>
          <li>Zugriffsbeschränkungen und Protokollierung</li>
          <li>Hosting ausschliesslich in der Schweiz</li>
        </ul>
      </Section>

      <Section id="aenderungen" title="10. Änderungen dieser Erklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die aktuelle
          Version ist stets auf dieser Seite abrufbar. Bei wesentlichen Änderungen informieren wir
          registrierte Nutzer per E-Mail.
        </p>
      </Section>
    </LegalLayout>
  );
}
