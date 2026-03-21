"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SellerValuePropInner() {
  const searchParams = useSearchParams();
  const hasSearch = searchParams.get("suche") || searchParams.get("q") || searchParams.get("kategorie");

  if (hasSearch) return null;

  const steps = [
    { step: "1", title: "Inserat erstellen", desc: "Kategorie wählen, Fotos hochladen, Preis festlegen." },
    { step: "2", title: "Schweizweit sichtbar", desc: "Dein Inserat erscheint sofort für Käufer aus allen Kantonen." },
    { step: "3", title: "Direkt kontaktiert", desc: "Interessenten melden sich direkt bei dir — kein Mittelsmann." },
  ];

  return (
    <section className="border-y border-[#4d8230]/10 bg-[#f5faf2] py-10">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Deine Waffe verkaufen — kostenlos &amp; sicher
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            In 3 Minuten aufgegeben. Schweizweit sichtbar.
          </p>
        </div>
        <div className="mx-auto mb-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#4d8230] text-lg font-bold text-white">
                {s.step}
              </div>
              <p className="mb-1 text-sm font-semibold text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/dashboard/inserat-erstellen"
            className="inline-flex items-center gap-2 rounded-xl bg-[#4d8230] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a9a38]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Jetzt kostenlos inserieren
          </Link>
          <p className="mt-2 text-xs text-gray-400">
            Kostenlos · Kein Konto nötig für Käufer
          </p>
        </div>
      </div>
    </section>
  );
}

export default function SellerValueProp() {
  return (
    <Suspense fallback={null}>
      <SellerValuePropInner />
    </Suspense>
  );
}
