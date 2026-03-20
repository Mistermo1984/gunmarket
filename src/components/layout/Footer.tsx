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
      { label: "AGB", href: "/agb" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Impressum", href: "/impressum" },
    ],
  },
];

const KATEGORIE_LINKS = [
  { label: "Kurzwaffen", href: "/kategorien/kurzwaffen" },
  { label: "Büchsen", href: "/kategorien/buechsen" },
  { label: "Flinten", href: "/kategorien/flinten" },
  { label: "Jagdwaffen", href: "/kategorien/jagdwaffen" },
  { label: "Ordonnanzwaffen", href: "/kategorien/ordonnanzwaffen" },
  { label: "Freie Waffen", href: "/kategorien/freie-waffen" },
  { label: "Zubehör", href: "/kategorien/zubehoer" },
];

const KANTON_LINKS = [
  { label: "Zürich", k: "ZH" },
  { label: "Bern", k: "BE" },
  { label: "Luzern", k: "LU" },
  { label: "St. Gallen", k: "SG" },
  { label: "Aargau", k: "AG" },
  { label: "Basel", k: "BS" },
  { label: "Graubünden", k: "GR" },
  { label: "Wallis", k: "VS" },
  { label: "Waadt", k: "VD" },
  { label: "Genf", k: "GE" },
  { label: "Tessin", k: "TI" },
  { label: "Thurgau", k: "TG" },
  { label: "Solothurn", k: "SO" },
  { label: "Freiburg", k: "FR" },
  { label: "Schwyz", k: "SZ" },
  { label: "Schaffhausen", k: "SH" },
  { label: "Zug", k: "ZG" },
  { label: "Neuenburg", k: "NE" },
  { label: "Jura", k: "JU" },
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
                key={k.k}
                href={`/suche?kanton=${k.k}`}
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
