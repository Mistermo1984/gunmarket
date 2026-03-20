"use client";

import { useLocale } from "@/lib/locale-context";
import { LOCALES, Locale } from "@/lib/i18n";

const LOCALE_LABELS: Record<Locale, string> = {
  de: "DE",
  fr: "FR",
  it: "IT",
  en: "EN",
  rm: "RM",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-0.5">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded px-1.5 py-1 text-[11px] font-medium transition-colors ${
            locale === l
              ? "bg-brand-green text-white"
              : "text-neutral-400 hover:text-brand-dark"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
