import LegalLayout, { Section, InfoBox, WarnBox } from "@/components/legal/LegalLayout";

const toc = [
  { id: "grundregeln", label: "Grundregeln beim Waffenhandel" },
  { id: "betrug", label: "Betrug erkennen" },
  { id: "uebergabe", label: "Sichere Übergabe" },
  { id: "zahlung", label: "Sichere Bezahlung" },
  { id: "dokumente", label: "Dokumente prüfen" },
  { id: "versand", label: "Sicherer Versand" },
  { id: "melden", label: "Verdacht melden" },
  { id: "checkliste", label: "Checkliste für Käufer und Verkäufer" },
];

export const metadata = {
  title: "Sicherheitstipps — Sicherer Waffenhandel in der Schweiz",
  description:
    "Sicherheitstipps für den Waffenhandel: Betrug erkennen, sichere Übergabe und Bezahlung, Dokumente prüfen, sicherer Versand. Checkliste für Käufer und Verkäufer.",
  alternates: {
    canonical: "https://gunmarket.ch/sicherheit",
  },
  openGraph: {
    title: "Sicherheitstipps — GunMarket.ch",
    description: "Sicherheitstipps für den sicheren Waffenhandel auf GunMarket.ch.",
    url: "https://gunmarket.ch/sicherheit",
  },
};

export default function SicherheitPage() {
  return (
    <LegalLayout title="Sicherheitstipps" updated="1. März 2026" toc={toc}>
      <InfoBox>
        Ihre Sicherheit hat für uns höchste Priorität. Beachten Sie diese Hinweise, um Betrug
        zu vermeiden und Transaktionen sicher durchzuführen.
      </InfoBox>

      <Section id="grundregeln" title="1. Grundregeln beim Waffenhandel">
        <p>
          Der Handel mit Waffen erfordert besondere Sorgfalt. Halten Sie sich an diese Grundregeln,
          um sich und andere zu schützen:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Handeln Sie nur mit Personen, die sich ausweisen können</li>
          <li>Prüfen Sie immer die erforderlichen Dokumente (WES, ABK etc.)</li>
          <li>Vertrauen Sie Ihrem Bauchgefühl — wenn etwas zu gut klingt, ist es das oft auch</li>
          <li>Dokumentieren Sie jede Transaktion schriftlich</li>
          <li>Bewahren Sie Kopien aller Dokumente mindestens 10 Jahre auf</li>
        </ul>
      </Section>

      <Section id="betrug" title="2. Betrug erkennen">
        <p>Achten Sie auf folgende Warnsignale:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Unrealistisch tiefe Preise:</strong> Wenn ein Angebot zu gut klingt, ist Vorsicht geboten</li>
          <li><strong>Drängen auf schnellen Abschluss:</strong> Seriöse Verkäufer geben Ihnen Zeit zum Überlegen</li>
          <li><strong>Nur Vorauszahlung:</strong> Bestehen Sie auf sichere Zahlungsmethoden</li>
          <li><strong>Kein persönliches Treffen:</strong> Misstrauen Sie Verkäufern, die nur per Post handeln wollen</li>
          <li><strong>Fehlende Dokumente:</strong> Seriöse Verkäufer können alle nötigen Dokumente vorweisen</li>
          <li><strong>Druckausübung:</strong> «Nur noch heute verfügbar» oder ähnliche Taktiken</li>
          <li><strong>Ausweichende Antworten:</strong> Auf konkrete Fragen zum Zustand oder zur Herkunft</li>
        </ul>
        <WarnBox>
          Überweisen Sie niemals Geld an unbekannte Personen, bevor Sie die Waffe persönlich
          geprüft haben. Nutzen Sie bei Versand eine Treuhand-Lösung.
        </WarnBox>
      </Section>

      <Section id="uebergabe" title="3. Sichere Übergabe">
        <p>Für eine sichere persönliche Übergabe:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Öffentlicher Ort:</strong> Treffen Sie sich an einem Schiessstand, bei einem Waffenhändler oder auf einer Polizeistation</li>
          <li><strong>Begleitung:</strong> Nehmen Sie eine Vertrauensperson mit</li>
          <li><strong>Tageslicht:</strong> Vereinbaren Sie Treffen bei Tageslicht</li>
          <li><strong>Dokumente prüfen:</strong> Kontrollieren Sie WES/ABK und Personalausweis vor der Übergabe</li>
          <li><strong>Waffe prüfen:</strong> Untersuchen Sie die Waffe gründlich auf Zustand und Vollständigkeit</li>
          <li><strong>Übergabeprotokoll:</strong> Erstellen Sie ein schriftliches Protokoll mit Seriennummer, Zustand und Datum</li>
        </ul>
        <InfoBox>
          Viele Schützenstände bieten einen Raum für Waffenübergaben an. Fragen Sie bei Ihrem
          lokalen Schiessverein nach.
        </InfoBox>
      </Section>

      <Section id="zahlung" title="4. Sichere Bezahlung">
        <p>Empfohlene Zahlungsmethoden:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Barzahlung bei Übergabe:</strong> Die sicherste Methode bei persönlichem Treffen</li>
          <li><strong>Banküberweisung:</strong> Nur an verifizierte Schweizer Bankkonten (IBAN beginnt mit CH)</li>
          <li><strong>TWINT:</strong> Für kleinere Beträge geeignet, mit Transaktionsnachweis</li>
        </ul>
        <p className="mt-2 font-semibold">Vermeiden Sie:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Überweisungen ins Ausland</li>
          <li>Kryptowährungen</li>
          <li>Gutscheinkarten oder Prepaid-Karten</li>
          <li>Western Union oder ähnliche Dienste</li>
        </ul>
      </Section>

      <Section id="dokumente" title="5. Dokumente prüfen">
        <p>Prüfen Sie bei jeder Transaktion folgende Dokumente:</p>
        <p className="mt-2 font-semibold">Käufer muss vorlegen:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Gültiger Ausweis (ID oder Pass)</li>
          <li>Waffenerwerbsschein (WES) — max. 6 Monate alt</li>
          <li>Bei ABK-pflichtigen Waffen: gültige Ausnahmebewilligung</li>
        </ul>
        <p className="mt-2 font-semibold">Verkäufer muss vorlegen:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Gültiger Ausweis</li>
          <li>Herkunftsnachweis der Waffe (Kaufvertrag, Erbschein etc.)</li>
          <li>Bei Händlern: gültige Waffenhandelsbewilligung</li>
        </ul>
        <WarnBox>
          Akzeptieren Sie niemals Kopien oder Fotos von Dokumenten als Ersatz für Originale.
          Prüfen Sie die Übereinstimmung von Name und Waffenbezeichnung auf dem WES.
        </WarnBox>
      </Section>

      <Section id="versand" title="6. Sicherer Versand">
        <p>
          Wenn ein persönliches Treffen nicht möglich ist, beachten Sie beim Versand:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Versand nur per Einschreiben (Post) oder über konzessionierten Waffenhändler</li>
          <li>Waffe ungeladen und gesichert verpacken</li>
          <li>Munition separat versenden</li>
          <li>Keine Kenntlichmachung des Inhalts auf dem Paket</li>
          <li>Versicherung für den Warenwert abschliessen</li>
          <li>Tracking-Nummer mit dem Käufer teilen</li>
        </ul>
        <InfoBox>
          Tipp: Viele Waffenhändler bieten einen Versandservice an. Gegen eine kleine Gebühr
          übernehmen sie Verpackung, Versand und Dokumentenprüfung.
        </InfoBox>
      </Section>

      <Section id="melden" title="7. Verdacht melden">
        <p>
          Melden Sie verdächtige Aktivitäten umgehend:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>An GunMarket.ch:</strong> Nutzen Sie die Meldefunktion im Inserat oder unser <a href="/kontakt" className="text-[#4d8230] hover:underline">Kontaktformular</a></li>
          <li><strong>An die Polizei:</strong> Bei konkretem Verdacht auf Straftaten, Notruf 117</li>
          <li><strong>An fedpol:</strong> Bei Verdacht auf illegalen Waffenhandel</li>
        </ul>
        <p>
          Wir nehmen jede Meldung ernst und prüfen sie innerhalb von 24 Stunden. Bei akuter
          Gefahr informieren wir umgehend die zuständigen Behörden.
        </p>
      </Section>

      <Section id="checkliste" title="8. Checkliste für Käufer und Verkäufer">
        <p className="font-semibold">Checkliste Käufer:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>WES oder ABK vor der Kontaktaufnahme besorgen</li>
          <li>Inserat genau studieren und Fragen stellen</li>
          <li>Marktpreis recherchieren — Vergleichspreise prüfen</li>
          <li>Persönliches Treffen vereinbaren</li>
          <li>Waffe vor Ort prüfen (Zustand, Seriennummer, Funktion)</li>
          <li>Übergabeprotokoll erstellen und unterschreiben</li>
          <li>Kopie des WES beim Verkäufer hinterlegen</li>
        </ul>

        <p className="mt-4 font-semibold">Checkliste Verkäufer:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Inserat mit korrektem Rechtsstatus erstellen</li>
          <li>Realistische Preisvorstellung angeben</li>
          <li>WES/ABK des Käufers vor Übergabe prüfen</li>
          <li>Ausweis des Käufers kontrollieren</li>
          <li>Übergabeprotokoll erstellen und unterschreiben</li>
          <li>Kopie des WES 10 Jahre aufbewahren</li>
          <li>Transaktion dokumentieren (Datum, Käuferdaten, Waffe)</li>
        </ul>
      </Section>
    </LegalLayout>
  );
}
