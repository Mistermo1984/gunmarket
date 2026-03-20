"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Locale, LOCALES, TranslationKey, t as translate } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "de",
  setLocale: () => {},
  t: (key) => key,
});

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "de";
  const lang = navigator.language?.substring(0, 2);
  if (lang === "fr") return "fr";
  if (lang === "it") return "it";
  if (lang === "en") return "en";
  if (lang === "rm") return "rm";
  return "de";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");

  useEffect(() => {
    const stored = localStorage.getItem("gunmarket_locale") as Locale | null;
    if (stored && LOCALES.includes(stored)) {
      setLocaleState(stored);
    } else {
      setLocaleState(detectBrowserLocale());
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("gunmarket_locale", newLocale);
    document.cookie = `gunmarket_locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translate(locale, key),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
