"use client";

import React from "react";
import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";

const footerSections: { titleKey: TranslationKey; links: { labelKey: TranslationKey; href: string }[] }[] = [
  {
    titleKey: "nav_listings",
    links: [
      { labelKey: "nav_all_listings", href: "/" },
      { labelKey: "nav_create_long", href: "/inserat/neu" },
      { labelKey: "map_title", href: "/karte" },
      { labelKey: "nav_clubs", href: "/vereine" },
    ],
  },
  {
    titleKey: "nav_wiki",
    links: [
      { labelKey: "nav_wiki", href: "/wissen/waffen" },
      { labelKey: "filter_caliber", href: "/wissen/munition" },
      { labelKey: "nav_law", href: "/waffenrecht" },
    ],
  },
  {
    titleKey: "footer_imprint",
    links: [
      { labelKey: "footer_faq" as TranslationKey, href: "/faq" },
      { labelKey: "footer_contact", href: "/kontakt" },
      { labelKey: "footer_agb", href: "/agb" },
      { labelKey: "footer_privacy", href: "/datenschutz" },
      { labelKey: "footer_imprint", href: "/impressum" },
    ],
  },
];

const KATEGORIE_LINKS = [
  { labelKey: "cat_kurzwaffen" as TranslationKey, href: "/kategorien/kurzwaffen" },
  { labelKey: "cat_langwaffen" as TranslationKey, href: "/kategorien/buechsen" },
  { labelKey: "cat_ordonnanz" as TranslationKey, href: "/kategorien/ordonnanzwaffen" },
  { labelKey: "cat_luftdruck" as TranslationKey, href: "/kategorien/luftdruckwaffen" },
  { labelKey: "cat_zubehoer" as TranslationKey, href: "/kategorien/zubehoer" },
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
  const { t } = useLocale();

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
              {t("footer_tagline")}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/kontakt"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-neutral-500 transition-colors hover:border-brand-green hover:text-brand-green"
                aria-label="Kontakt"
              >
                <Mail size={16} />
              </Link>
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
            <div key={section.titleKey}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-brand-green"
                    >
                      {t(link.labelKey)}
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
            {t("filter_category")}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {KATEGORIE_LINKS.map((kat) => (
              <Link
                key={kat.href}
                href={kat.href}
                className="text-xs text-neutral-500 transition-colors hover:text-brand-green"
              >
                {t(kat.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* Kantone Links — SEO */}
        <div className="mt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-dark">
            {t("filter_canton")}
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
