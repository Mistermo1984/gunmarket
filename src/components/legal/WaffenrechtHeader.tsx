"use client";

import { AlertTriangle } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/locale-context";

export default function WaffenrechtHeader() {
  const { t, locale } = useLocale();

  return (
    <>
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      {locale !== "de" && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
          <AlertTriangle size={16} className="shrink-0 text-yellow-600" />
          {t(`waffenrecht_german_only_${locale}`)}
        </div>
      )}
    </>
  );
}
