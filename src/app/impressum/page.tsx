import LegalLayout, { Section, InfoBox } from "@/components/legal/LegalLayout";

const toc = [
  { id: "betreiber", label: "Betreiber" },
  { id: "kontakt", label: "Kontakt" },
  { id: "verantwortlich", label: "Verantwortlich für Inhalte" },
  { id: "haftung", label: "Haftungshinweis" },
  { id: "urheberrecht", label: "Urheberrecht" },
  { id: "streitbeilegung", label: "Streitbeilegung" },
];

export const metadata = {
  title: "Impressum — GunMarket.ch",
  description: "Impressum und rechtliche Angaben von GunMarket.ch — dem Schweizer Waffenmarktplatz.",
  alternates: {
    canonical: "https://gunmarket.ch/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum" updated="1. März 2026" toc={toc}>
      <Section id="betreiber" title="Betreiber">
        <p>
          <strong>Maurice Gerber</strong><br />
          Aarestr. 62<br />
          3613 Steffisburg<br />
          Schweiz
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Privat betriebene Plattform — kein Gewerbe, kein Waffenhandel.<br />
          Keine UID-Nummer (Privatperson, nicht im Handelsregister eingetragen).
        </p>
      </Section>

      <Section id="kontakt" title="Kontakt">
        <p>
          E-Mail: <a href="mailto:kontakt@gunmarket.ch" className="text-[#4d8230] hover:underline">kontakt@gunmarket.ch</a><br />
          Web: <a href="https://www.gunmarket.ch" className="text-[#4d8230] hover:underline">www.gunmarket.ch</a><br />
          Kontaktformular: <a href="/kontakt" className="text-[#4d8230] hover:underline">gunmarket.ch/kontakt</a>
        </p>
        <InfoBox>
          Für rechtliche Anfragen kontaktieren Sie uns per E-Mail an{" "}
          <a href="mailto:kontakt@gunmarket.ch" className="text-[#4d8230] hover:underline">kontakt@gunmarket.ch</a>.
        </InfoBox>
      </Section>

      <Section id="verantwortlich" title="Verantwortlich für Inhalte">
        <p>
          Verantwortlich für den redaktionellen Inhalt gemäss Schweizer Recht:
        </p>
        <p className="mt-2">
          <strong>Maurice Gerber</strong><br />
          Aarestr. 62<br />
          3613 Steffisburg<br />
          Schweiz
        </p>
      </Section>

      <Section id="haftung" title="Haftungshinweis">
        <p>
          Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.
        </p>
        <p>
          Als Plattformbetreiberin sind wir gemäss Art. 14 E-Commerce-Richtlinie nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei
          Bekanntwerden von Rechtsverletzungen werden wir entsprechende Inhalte umgehend entfernen.
        </p>
        <p>
          Für die Inhalte der Inserate sind ausschliesslich die jeweiligen Nutzer verantwortlich.
          GunMarket.ch übernimmt keine Haftung für nutzergenerierte Inhalte.
        </p>
      </Section>

      <Section id="urheberrecht" title="Urheberrecht">
        <p>
          Die durch die Betreiberin erstellten Inhalte und Werke auf dieser Website unterliegen
          dem Schweizer Urheberrecht (URG). Die Vervielfältigung, Bearbeitung, Verbreitung und
          jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der
          schriftlichen Zustimmung der Betreiberin.
        </p>
        <p>
          Von Nutzern hochgeladene Inhalte (Texte, Bilder) verbleiben im Eigentum der jeweiligen
          Nutzer. Mit dem Hochladen räumt der Nutzer der Betreiberin ein einfaches, unentgeltliches
          Nutzungsrecht zur Darstellung auf der Plattform ein.
        </p>
      </Section>

      <Section id="streitbeilegung" title="Streitbeilegung">
        <p>
          Gerichtsstand ist Thun, Schweiz. Es gilt ausschliesslich Schweizer Recht.
        </p>
        <p>
          Wir sind bemüht, Streitigkeiten aussergerichtlich beizulegen. Bei Beschwerden oder
          Anliegen nutzen Sie bitte unser <a href="/kontakt" className="text-[#4d8230] hover:underline">Kontaktformular</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
