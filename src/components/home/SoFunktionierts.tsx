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
      <div className="rounded-xl bg-brand-green px-6 py-8 text-center">
        <h3 className="mb-2 font-display text-xl font-black uppercase text-white">
          Bereit loszulegen?
        </h3>
        <p className="mb-4 text-sm text-white/80">
          Erstelle jetzt dein kostenloses Konto und starte sofort.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-green transition-colors hover:bg-gray-50"
        >
          Jetzt kostenlos registrieren
        </Link>
      </div>
    </div>
  );
}
