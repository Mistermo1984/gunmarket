"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-xl bg-gray-900 p-5 text-white shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-gray-300">
          {t("cookie_text")}{" "}
          <Link
            href="/datenschutz"
            className="text-gray-400 underline hover:text-white"
          >
            {t("cookie_more")}
          </Link>
        </p>

        <button
          onClick={accept}
          className="whitespace-nowrap rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-dark"
        >
          {t("cookie_accept")}
        </button>
      </div>
    </div>
  );
}
