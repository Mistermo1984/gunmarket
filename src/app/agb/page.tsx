import LegalLayout, { Section, InfoBox, WarnBox } from "@/components/legal/LegalLayout";

const toc = [
  { id: "geltungsbereich", label: "Geltungsbereich" },
  { id: "plattformrolle", label: "Rolle der Plattform / Kein Vermittler" },
  { id: "leistungen", label: "Leistungen der Plattform" },
  { id: "registrierung", label: "Registrierung und Konto" },
  { id: "inserate", label: "Inserate und Inhalte" },
  { id: "rechtsstatus", label: "Waffenrechtlicher Status" },
  { id: "transaktionen", label: "Transaktionen zwischen Nutzern" },
  { id: "pflichten", label: "Pflichten der Nutzer" },
  { id: "haftung", label: "Haftungsausschluss" },
  { id: "sperrung", label: "Sperrung und Kündigung" },
  { id: "schlussbestimmungen", label: "Schlussbestimmungen" },
];

export const metadata = {
  title: "AGB — GunMarket.ch",
  description: "Allgemeine Geschäftsbedingungen von GunMarket.ch — dem grössten Schweizer Waffenmarktplatz.",
  alternates: {
    canonical: "https://gunmarket.ch/agb",
  },
};

export default function AGBPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" updated="1. März 2026" toc={toc}>
      <Section id="geltungsbereich" title="§ 1 — Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (nachfolgend «AGB») regeln die Nutzung der
          Online-Plattform GunMarket.ch (nachfolgend «Plattform»), privat betrieben mit Sitz in
          Steffisburg, Schweiz (nachfolgend «Betreiber»).
        </p>
        <p>
          Mit der Registrierung oder Nutzung der Plattform akzeptieren Sie diese AGB vollumfänglich.
          Die Betreiberin behält sich vor, die AGB jederzeit anzupassen. Änderungen werden den
          registrierten Nutzern per E-Mail mitgeteilt und treten 30 Tage nach Benachrichtigung in
          Kraft, sofern kein Widerspruch erfolgt.
        </p>
        <InfoBox>
          Diese AGB unterliegen ausschliesslich Schweizer Recht, insbesondere dem Obligationenrecht
          (OR) und dem Bundesgesetz über Waffen, Waffenzubehör und Munition (Waffengesetz, WG).
        </InfoBox>
      </Section>

      <Section id="plattformrolle" title="§ 1a — Rolle der Plattform / Kein Waffenvermittler">
        <p>
          GunMarket.ch betreibt eine Inserateplattform für den privaten und gewerblichen
          Waffenhandel in der Schweiz. GunMarket.ch ist ausdrücklich KEIN Vermittler im Sinne des
          Waffengesetzes (Art. 33 Abs. 1 lit. g WG).
        </p>
        <p>
          Sämtliche Transaktionen kommen ausschliesslich zwischen Käufer und Verkäufer zustande.
          GunMarket.ch ist zu keinem Zeitpunkt Vertragspartei beim Waffenkauf.
        </p>
        <p>
          Die Pflicht zur Identitätsprüfung des Käufers gemäss Art. 10a WG liegt ausschliesslich
          beim Verkäufer (übertragende Person). Der Verkäufer ist verpflichtet, Identität und Alter
          des Erwerbers anhand eines amtlichen Ausweises zu prüfen, bevor die Waffe übergeben wird.
        </p>
        <p>
          GunMarket.ch übernimmt keine Haftung für die Rechtmässigkeit der auf der Plattform
          angebotenen Transaktionen. Die Einhaltung aller waffenrechtlichen Vorschriften liegt in
          der alleinigen Verantwortung von Käufer und Verkäufer.
        </p>
        <p>
          GunMarket.ch behält sich vor, Inserate zu entfernen, die gegen das Waffengesetz
          verstossen oder bei denen ein begründeter Verdacht auf missbräuchliche Nutzung besteht.
          Eine Pflicht zur aktiven Überwachung aller Inserate besteht nicht.
        </p>
      </Section>

      <Section id="leistungen" title="§ 2 — Leistungen der Plattform">
        <p>
          GunMarket.ch stellt eine kostenlose Online-Plattform zur Verfügung, auf der registrierte
          Nutzer Inserate für Waffen, Waffenzubehör und Munition veröffentlichen können. Die
          Plattform dient ausschliesslich als Vermittlerin und ist nicht Vertragspartei bei
          Transaktionen zwischen Nutzern.
        </p>
        <p>Die Plattform umfasst insbesondere:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Veröffentlichung und Verwaltung von Inseraten</li>
          <li>Suchfunktionen und Filtermöglichkeiten</li>
          <li>Kontaktaufnahme zwischen Käufern und Verkäufern</li>
          <li>Informationen zum Schweizer Waffenrecht</li>
        </ul>
        <p>
          Die Betreiberin garantiert keine ununterbrochene Verfügbarkeit der Plattform und behält
          sich Wartungsarbeiten vor.
        </p>
      </Section>

      <Section id="registrierung" title="§ 3 — Registrierung und Konto">
        <p>
          Für das Aufgeben von Inseraten und die Kontaktaufnahme mit Verkäufern ist eine
          Registrierung erforderlich. Der Nutzer verpflichtet sich, wahrheitsgemässe und
          vollständige Angaben zu machen.
        </p>
        <p>
          Jede natürliche Person darf nur ein Konto erstellen. Das Mindestalter für die
          Registrierung beträgt 18 Jahre. Händler müssen zusätzlich ihre Geschäftsdaten und eine
          gültige Waffenhandelsbewilligung angeben.
        </p>
        <WarnBox>
          Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten allein verantwortlich. Jede
          Aktivität unter seinem Konto wird ihm zugerechnet.
        </WarnBox>
      </Section>

      <Section id="inserate" title="§ 4 — Inserate und Inhalte">
        <p>
          Inserate müssen wahrheitsgemäss, vollständig und rechtlich zulässig sein. Jedes Inserat
          muss den korrekten waffenrechtlichen Status gemäss Schweizer Waffengesetz angeben.
        </p>
        <p>Es ist insbesondere verboten:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Verbotene Waffen gemäss Art. 5 WG zu inserieren</li>
          <li>Waffen ohne korrekte Statusangabe anzubieten</li>
          <li>Irreführende oder falsche Angaben zu machen</li>
          <li>Inserate für illegale Gegenstände oder Dienstleistungen zu veröffentlichen</li>
          <li>Preise absichtlich falsch anzugeben</li>
        </ul>
        <p>
          Die Betreiberin behält sich das Recht vor, Inserate ohne Vorankündigung zu entfernen, die
          gegen diese AGB oder geltendes Recht verstossen.
        </p>
      </Section>

      <Section id="rechtsstatus" title="§ 5 — Waffenrechtlicher Status">
        <p>
          Jedes Inserat muss mit dem korrekten waffenrechtlichen Status versehen werden. Die
          Plattform unterscheidet folgende Kategorien gemäss Schweizer Waffengesetz:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Frei erwerbbar:</strong> Kein Dokument erforderlich (z. B. K31-Repetierer vor 1900)</li>
          <li><strong>WES-pflichtig:</strong> Waffenerwerbsschein erforderlich (Einzellader, Repetierwaffen)</li>
          <li><strong>ABK Klein:</strong> Ausnahmebewilligung Kanton (Faustfeuerwaffen, Pump-Action)</li>
          <li><strong>ABK Gross:</strong> Ausnahmebewilligung Bund (Vollautomaten, Schalldämpfer)</li>
          <li><strong>Ordonnanz:</strong> Waffenerwerbsschein + Bestätigung (Militärwaffen)</li>
        </ul>
        <WarnBox>
          Falsche Angaben zum waffenrechtlichen Status können strafrechtliche Konsequenzen haben.
          Nutzer sind selbst dafür verantwortlich, den korrekten Status ihrer Waffen zu kennen und
          anzugeben.
        </WarnBox>
      </Section>

      <Section id="transaktionen" title="§ 6 — Transaktionen zwischen Nutzern">
        <p>
          GunMarket.ch ist ausschliesslich Vermittlerin. Kaufverträge kommen direkt zwischen den
          Nutzern zustande. Die Betreiberin haftet nicht für die Erfüllung von Verträgen,
          Zahlungsabwicklung, Versand oder Zustand der gehandelten Waren.
        </p>
        <p>
          Beide Parteien sind verpflichtet, bei jeder Transaktion die gesetzlichen Vorschriften
          einzuhalten, insbesondere die Überprüfung der erforderlichen Dokumente (WES, ABK etc.)
          und die Meldepflichten gemäss WG.
        </p>
        <InfoBox>
          Bei Privatverkäufen mit WES-pflichtigen Waffen muss der Verkäufer den
          Waffenerwerbsschein des Käufers vor der Übergabe prüfen und eine Kopie 10 Jahre
          aufbewahren.
        </InfoBox>
      </Section>

      <Section id="pflichten" title="§ 7 — Pflichten der Nutzer">
        <p>Der Nutzer verpflichtet sich:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Alle anwendbaren Gesetze einzuhalten, insbesondere das Waffengesetz (WG)</li>
          <li>Nur Gegenstände zu inserieren, zu deren Verkauf er berechtigt ist</li>
          <li>Keine betrügerischen oder irreführenden Handlungen vorzunehmen</li>
          <li>Die Plattform nicht für illegale Zwecke zu missbrauchen</li>
          <li>Andere Nutzer respektvoll zu behandeln</li>
          <li>Verdächtige Aktivitäten der Betreiberin zu melden</li>
        </ul>
      </Section>

      <Section id="haftung" title="§ 8 — Haftungsausschluss">
        <p>
          Die Betreiberin haftet nicht für Schäden, die aus der Nutzung der Plattform, aus
          Transaktionen zwischen Nutzern oder aus der Verfügbarkeit der Plattform entstehen, soweit
          gesetzlich zulässig.
        </p>
        <p>
          Insbesondere übernimmt die Betreiberin keine Haftung für die Richtigkeit der
          Inserateangaben, die Identität der Nutzer, die Einhaltung waffenrechtlicher Vorschriften
          durch Nutzer oder die Qualität und Sicherheit der gehandelten Waren.
        </p>
        <p>
          Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit keine zwingenden
          gesetzlichen Bestimmungen entgegenstehen.
        </p>
      </Section>

      <Section id="sperrung" title="§ 9 — Sperrung und Kündigung">
        <p>
          Die Betreiberin kann Nutzerkonten vorübergehend oder dauerhaft sperren bei Verstössen
          gegen diese AGB, gegen geltendes Recht oder bei begründetem Verdacht auf Missbrauch.
        </p>
        <p>
          Der Nutzer kann sein Konto jederzeit kündigen. Die Kündigung wird nach Ablauf einer
          angemessenen Bearbeitungsfrist wirksam. Bestehende Verpflichtungen aus laufenden
          Transaktionen bleiben von der Kündigung unberührt.
        </p>
      </Section>

      <Section id="schlussbestimmungen" title="§ 10 — Schlussbestimmungen">
        <p>
          Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist der Sitz der Betreiberin.
          Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der
          übrigen Bestimmungen unberührt.
        </p>
        <p>
          Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform. Die Betreiberin behält
          sich vor, diese AGB jederzeit zu aktualisieren.
        </p>
        <InfoBox>
          Bei Fragen zu diesen AGB kontaktieren Sie uns unter legal@gunmarket.ch.
        </InfoBox>
      </Section>
    </LegalLayout>
  );
}
