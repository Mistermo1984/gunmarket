import React from "react";
import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import Logo from "@/components/ui/Logo";

const footerSections = [
  {
    title: "Marktplatz",
    links: [
      { label: "Alle Inserate", href: "/suche" },
      { label: "Inserat aufgeben", href: "/inserat/neu" },
      { label: "Karte", href: "/karte" },
      { label: "Schützenvereine", href: "/vereine" },
    ],
  },
  {
    title: "Waffen-Wiki",
    links: [
      { label: "Waffen-Wiki", href: "/wissen/waffen" },
      { label: "Kaliber-Guide", href: "/wissen/munition" },
      { label: "Waffenrecht CH", href: "/waffenrecht" },
      { label: "Sicherheit", href: "/sicherheit" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "AGB", href: "/agb" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Impressum", href: "/impressum" },
    ],
  },
];

const KATEGORIE_LINKS = [
  { label: "Kurzwaffen", href: "/kategorien/kurzwaffen" },
  { label: "Langwaffen", href: "/kategorien/buechsen" },
  { label: "Flinten", href: "/kategorien/flinten" },
  { label: "Ordonnanzwaffen", href: "/kategorien/ordonnanzwaffen" },
  { label: "Luftdruckwaffen", href: "/kategorien/freie-waffen" },
  { label: "Zubehör", href: "/kategorien/zubehoer" },
];

const KANTON_LINKS = [
  { label: "Zürich", slug: "zuerich" },
  { label: "Bern", slug: "bern" },
  { label: "Luzern", slug: "luzern" },
  { label: "St. Gallen", slug: "st-gallen" },
  { label: "Aargau", slug: "aargau" },
  { label: "Basel", slug: "basel-stadt" },
  { label: "Graubünden", slug: "graubuenden" },
  { label: "Wallis", slug: "wallis" },
  { label: "Waadt", slug: "waadt" },
  { label: "Genf", slug: "genf" },
  { label: "Tessin", slug: "tessin" },
  { label: "Thurgau", slug: "thurgau" },
  { label: "Solothurn", slug: "solothurn" },
  { label: "Freiburg", slug: "freiburg" },
  { label: "Schwyz", slug: "schwyz" },
  { label: "Schaffhausen", slug: "schaffhausen" },
  { label: "Zug", slug: "zug" },
  { label: "Neuenburg", slug: "neuenburg" },
  { label: "Jura", slug: "jura" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-grey">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Logo + Beschreibung */}
          <div>
            <Link href="/" className="mb-4 inline-flex">
              <Logo />
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-neutral-500">
              Der kostenlose Schweizer Waffenmarktplatz für Private und Händler.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:info@gunmarket.ch"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-neutral-500 transition-colors hover:border-brand-green hover:text-brand-green"
                aria-label="E-Mail"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-neutral-500 transition-colors hover:border-brand-green hover:text-brand-green"
                aria-label="Externe Links"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Spalten 2–4: Link-Gruppen */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-brand-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Kategorien Links — SEO */}
        <div className="mt-10 border-t border-brand-border pt-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-dark">
            Kategorien
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {KATEGORIE_LINKS.map((kat) => (
              <Link
                key={kat.href}
                href={kat.href}
                className="text-xs text-neutral-500 transition-colors hover:text-brand-green"
              >
                {kat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Kantone Links — SEO */}
        <div className="mt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-dark">
            Waffen kaufen nach Kanton
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {KANTON_LINKS.map((k) => (
              <Link
                key={k.slug}
                href={`/kanton/${k.slug}`}
                className="text-xs text-neutral-500 transition-colors hover:text-brand-green"
              >
                {k.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <p className="text-center text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} GunMarket.ch — Alle Rechte vorbehalten. GunMarket.ch
            übernimmt keine Verantwortung für Inserate. Staatsangehörige bestimmter Länder sind
            gemäss Art. 12 WV vom Waffenerwerb ausgeschlossen. Ausländische Personen mit
            Aufenthaltsbewilligung B benötigen für alle Waffenkäufe zwingend einen WES.
          </p>
        </div>
      </div>
    </footer>
  );
}
