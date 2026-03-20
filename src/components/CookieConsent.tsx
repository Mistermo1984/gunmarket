"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Locale = "de" | "fr" | "it";

const content = {
  de: {
    text: "Wir verwenden ausschliesslich technisch notwendige Cookies für die Authentifizierung (Session). Keine Tracking- oder Marketing-Cookies.",
    accept: "Verstanden",
    more: "Datenschutz",
  },
  fr: {
    text: "Nous utilisons uniquement des cookies techniquement nécessaires pour l'authentification (session). Aucun cookie de suivi ou marketing.",
    accept: "Compris",
    more: "Confidentialité",
  },
  it: {
    text: "Utilizziamo esclusivamente cookie tecnicamente necessari per l'autenticazione (sessione). Nessun cookie di tracciamento o marketing.",
    accept: "Capito",
    more: "Privacy",
  },
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);

    const lang = navigator.language?.substring(0, 2);
    if (lang === "fr") setLocale("fr");
    else if (lang === "it") setLocale("it");
    else setLocale("de");
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  const c = content[locale];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-xl bg-gray-900 p-5 text-white shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-gray-300">
          {c.text}{" "}
          <Link
            href="/datenschutz"
            className="text-gray-400 underline hover:text-white"
          >
            {c.more}
          </Link>
        </p>

        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="flex gap-1">
            {(["de", "fr", "it"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded px-2 py-1 text-xs ${
                  locale === l
                    ? "bg-gray-600 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={accept}
            className="whitespace-nowrap rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-dark"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
