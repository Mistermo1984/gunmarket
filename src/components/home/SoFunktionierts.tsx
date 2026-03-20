import React from "react";
import Link from "next/link";
import { UserPlus, FileText, MessageCircle } from "lucide-react";

const SCHRITTE = [
  {
    nr: 1,
    icon: UserPlus,
    titel: "Konto erstellen",
    text: "Registriere dich kostenlos in unter einer Minute.",
  },
  {
    nr: 2,
    icon: FileText,
    titel: "Inserat aufgeben",
    text: "Fotos hochladen, beschreiben und Preis setzen.",
  },
  {
    nr: 3,
    icon: MessageCircle,
    titel: "Direkt kontaktieren",
    text: "Interessenten melden sich — ihr klärt alles direkt.",
  },
];

export default function SoFunktionierts() {
  return (
    <div className="mb-10">
      <h2 className="mb-6 font-display text-xl font-black uppercase tracking-tight text-brand-dark md:text-2xl">
        So funktioniert&apos;s
      </h2>

      {/* 3 Schritte */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SCHRITTE.map((schritt) => {
          const IconComp = schritt.icon;
          return (
            <div key={schritt.nr} className="rounded-xl border border-brand-border bg-white p-5 text-center">
              <div className="mb-3 inline-flex flex-col items-center">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light">
                  <IconComp size={22} className="text-brand-green" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
                    {schritt.nr}
                  </span>
                </div>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-brand-dark">
                {schritt.titel}
              </h3>
              <p className="text-xs leading-relaxed text-neutral-500">
                {schritt.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div
        className="rounded-xl border px-6 py-10 md:px-12"
        style={{
          backgroundColor: "#0d1a0d",
          backgroundImage: "radial-gradient(rgba(74,222,128,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          borderColor: "rgba(74,222,128,0.2)",
        }}
      >
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="text-center md:text-left">
            <span className="mb-3 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-green-400">
              Kostenlos &amp; sofort
            </span>
            <h3 className="mb-1.5 text-2xl font-bold text-white md:text-[28px]">
              Bereit loszulegen?
            </h3>
            <p className="text-sm text-[#9ca3af]">
              Erstelle jetzt dein kostenloses Konto und starte sofort.
            </p>
          </div>
          {/* Right: buttons */}
          <div className="flex shrink-0 gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-[#16a34a] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]"
            >
              Jetzt registrieren
            </Link>
            <Link
              href="/inserat/neu"
              className="rounded-lg border border-[#16a34a] px-7 py-3 text-sm font-semibold text-[#16a34a] transition-colors hover:bg-[#16a34a]/10"
            >
              Inserat aufgeben
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
