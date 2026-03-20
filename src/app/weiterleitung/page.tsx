"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function WeiterleitungPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}

function Content() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const titel = searchParams.get("titel") || "Inserat";
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!url) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [url]);

  if (!url) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <p className="text-sm text-neutral-500">Ungültiger Link.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="mx-auto mb-8 flex items-center justify-center">
          <Logo size={36} />
        </div>

        {/* External link icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
          <ExternalLink size={32} className="text-amber-600" />
        </div>

        <h1 className="mb-3 font-display text-2xl font-black text-brand-dark">
          Weiterleitung zu waffengebraucht.ch
        </h1>

        <div className="mx-auto mb-6 max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm leading-relaxed text-amber-800">
            Dieses Inserat <strong>&quot;{titel}&quot;</strong> ist ursprünglich von{" "}
            <strong>waffengebraucht.ch</strong>. Wir leiten Sie sofort weiter.
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <Loader2 size={18} className="animate-spin text-brand-green" />
          <p className="text-sm text-neutral-500">
            Weiterleitung in <span className="font-bold text-brand-dark">{countdown}</span> Sekunden...
          </p>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mb-8 h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-1000 ease-linear"
            style={{ width: `${((4 - countdown) / 4) * 100}%` }}
          />
        </div>

        {/* Manual links */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={url}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            <ExternalLink size={16} />
            Jetzt weiterleiten
          </a>
          <Link
            href="/suche"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-gray-50"
          >
            Zurück zur Suche
          </Link>
        </div>

        <p className="mt-8 text-[11px] text-neutral-400">
          GunMarket.ch ist nicht verantwortlich für Inhalte auf externen Webseiten.
          Prüfen Sie die Seriosität des Anbieters eigenständig.
        </p>
      </div>
    </div>
  );
}
