"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { LOCALES, Locale } from "@/lib/i18n";

const LOCALE_LABELS: Record<Locale, string> = {
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  en: "English",
  rm: "Rumantsch",
};

const LOCALE_FLAGS: Record<Locale, string> = {
  de: "DE",
  fr: "FR",
  it: "IT",
  en: "EN",
  rm: "RM",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-brand-grey hover:text-brand-dark"
        aria-label="Language"
      >
        <Globe size={15} />
        <span className="hidden sm:inline">{LOCALE_FLAGS[locale]}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[150px] overflow-hidden rounded-lg border border-brand-border bg-white py-1 shadow-lg animate-fade-in">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-brand-grey ${
                locale === l
                  ? "font-semibold text-brand-green"
                  : "text-neutral-600"
              }`}
            >
              <span className="w-6 text-center text-xs font-bold text-neutral-400">
                {LOCALE_FLAGS[l]}
              </span>
              {LOCALE_LABELS[l]}
              {locale === l && (
                <span className="ml-auto text-brand-green">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
