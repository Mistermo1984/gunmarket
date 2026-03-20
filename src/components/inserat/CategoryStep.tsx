"use client";

import React from "react";
import Link from "next/link";
import { Info, AlertTriangle } from "lucide-react";
import { HAUPTKATEGORIEN, RECHTSSTATUS_FILTER } from "@/lib/constants";

interface CategoryStepProps {
  hauptkategorie: string;
  unterkategorie: string;
  rechtsstatus: string;
  onHauptkategorie: (id: string) => void;
  onUnterkategorie: (id: string) => void;
  onRechtsstatus: (id: string) => void;
  onNext: () => void;
}

export default function CategoryStep({
  hauptkategorie,
  unterkategorie,
  rechtsstatus,
  onHauptkategorie,
  onUnterkategorie,
  onRechtsstatus,
  onNext,
}: CategoryStepProps) {
  const selectedHK = HAUPTKATEGORIEN.find((hk) => hk.id === hauptkategorie);
  const canProceed = hauptkategorie && unterkategorie && rechtsstatus;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Hauptkategorie */}
      <div className="mb-8">
        <h2 className="mb-1 font-display text-xl font-bold text-brand-dark">Hauptkategorie</h2>
        <p className="mb-4 text-sm text-neutral-500">Wählen Sie die passende Kategorie für Ihr Inserat</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {HAUPTKATEGORIEN.map((hk) => {
            const Icon = hk.iconComponent;
            const isSelected = hauptkategorie === hk.id;
            return (
              <button
                key={hk.id}
                onClick={() => {
                  onHauptkategorie(hk.id);
                  onUnterkategorie("");
                }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? "border-brand-green bg-brand-green-light shadow-sm"
                    : "border-brand-border bg-white hover:border-brand-green/30 hover:shadow-sm"
                }`}
              >
                <Icon size={28} className={isSelected ? "text-brand-green" : "text-neutral-400"} />
                <span className={`text-xs font-semibold ${isSelected ? "text-brand-green" : "text-neutral-600"}`}>
                  {hk.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Munitions-Hinweis */}
        {hauptkategorie === "munition" && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />
            <div>
              <p className="mb-1 text-sm font-semibold text-red-800">Wichtig: Munitionsverkauf</p>
              <p className="text-xs leading-relaxed text-red-700">
                Der Verkauf von Munition ist nur Personen gestattet, die zum Erwerb und Besitz der
                entsprechenden Munition berechtigt sind. Für den gewerbsmässigen Munitionshandel ist
                eine Waffenhandelsbewilligung erforderlich (Art. 17 WG). Bitte stellen Sie sicher,
                dass Sie zur Veräusserung dieser Munition gesetzlich berechtigt sind.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Unterkategorie */}
      {selectedHK && selectedHK.unterkategorien.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-1 font-display text-xl font-bold text-brand-dark">Unterkategorie</h2>
          <p className="mb-4 text-sm text-neutral-500">Wählen Sie die spezifische Kategorie</p>
          <div className="flex flex-wrap gap-3">
            {selectedHK.unterkategorien.map((uk) => {
              const Icon = uk.iconComponent;
              const isSelected = unterkategorie === uk.id;
              return (
                <button
                  key={uk.id}
                  onClick={() => onUnterkategorie(uk.id)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light shadow-sm"
                      : "border-brand-border bg-white hover:border-brand-green/30 hover:shadow-sm"
                  }`}
                >
                  <Icon size={20} className={isSelected ? "text-brand-green" : "text-neutral-400"} />
                  <span className={`text-sm font-semibold ${isSelected ? "text-brand-green" : "text-neutral-600"}`}>
                    {uk.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Auto-select unterkategorie for categories with none (Munition) */}
      {selectedHK && selectedHK.unterkategorien.length === 0 && !unterkategorie && (() => {
        // Set a default unterkategorie so canProceed works
        setTimeout(() => onUnterkategorie("allgemein"), 0);
        return null;
      })()}

      {/* Rechtsstatus */}
      {unterkategorie && (
        <div className="mb-8">
          <h2 className="mb-1 font-display text-xl font-bold text-brand-dark">Rechtsstatus</h2>
          <p className="mb-4 text-sm text-neutral-500">
            Geben Sie den waffenrechtlichen Status gemäss Schweizer Waffengesetz an
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RECHTSSTATUS_FILTER.map((rs) => {
              const isSelected = rechtsstatus === rs.id;
              return (
                <button
                  key={rs.id}
                  onClick={() => onRechtsstatus(rs.id)}
                  className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light shadow-sm"
                      : "border-brand-border bg-white hover:border-brand-green/30"
                  }`}
                >
                  <span
                    className={`mb-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${rs.farbe} ${rs.textfarbe}`}
                  >
                    {rs.kurzlabel}
                  </span>
                  <span className="text-sm font-semibold text-brand-dark">{rs.label}</span>
                  <span className="mt-1 line-clamp-2 text-xs text-neutral-500">{rs.tooltip}</span>
                </button>
              );
            })}
          </div>

          {/* Info box */}
          <div className="mt-4 flex items-start gap-3 rounded-lg bg-blue-50 p-4">
            <Info size={16} className="mt-0.5 shrink-0 text-blue-500" />
            <p className="text-xs leading-relaxed text-blue-800">
              Nicht sicher welcher Rechtsstatus?{" "}
              <Link href="/waffenrecht" className="font-semibold underline hover:no-underline">
                Hier finden Sie eine Übersicht &rarr;
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Next */}
      <div className="flex justify-end border-t border-brand-border pt-6">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
