"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

const KANTONE_LINKS = [
  { label: "Zürich", kanton: "ZH" },
  { label: "Bern", kanton: "BE" },
  { label: "Luzern", kanton: "LU" },
  { label: "Uri", kanton: "UR" },
  { label: "Schwyz", kanton: "SZ" },
  { label: "Obwalden", kanton: "OW" },
  { label: "Nidwalden", kanton: "NW" },
  { label: "Glarus", kanton: "GL" },
  { label: "Zug", kanton: "ZG" },
  { label: "Freiburg", kanton: "FR" },
  { label: "Solothurn", kanton: "SO" },
  { label: "Basel-Stadt", kanton: "BS" },
  { label: "Basel-Land", kanton: "BL" },
  { label: "Schaffhausen", kanton: "SH" },
  { label: "Appenzell AR", kanton: "AR" },
  { label: "Appenzell AI", kanton: "AI" },
  { label: "St. Gallen", kanton: "SG" },
  { label: "Graubünden", kanton: "GR" },
  { label: "Aargau", kanton: "AG" },
  { label: "Thurgau", kanton: "TG" },
  { label: "Tessin", kanton: "TI" },
  { label: "Waadt", kanton: "VD" },
  { label: "Wallis", kanton: "VS" },
  { label: "Neuenburg", kanton: "NE" },
  { label: "Genf", kanton: "GE" },
  { label: "Jura", kanton: "JU" },
];

export default function SeoLinksSection() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 font-display text-xl font-black uppercase tracking-tight text-brand-dark">
          {t("seo_section_title")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {KANTONE_LINKS.map((k) => (
            <Link
              key={k.kanton}
              href={`/suche?kanton=${k.kanton}`}
              className="rounded-full border border-brand-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green"
            >
              {t("seo_buy_in")} {k.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
