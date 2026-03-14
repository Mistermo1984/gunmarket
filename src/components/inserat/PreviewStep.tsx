"use client";

import React from "react";
import Link from "next/link";
import { MapPin, User, Calendar, Tag, Shield, CheckCircle } from "lucide-react";
import { HAUPTKATEGORIEN, RECHTSSTATUS_FILTER, KANTONE, ZUSTAND_OPTIONEN } from "@/lib/constants";
import type { InseratDetails } from "./DetailsStep";

interface PreviewStepProps {
  hauptkategorie: string;
  unterkategorie: string;
  rechtsstatus: string;
  details: InseratDetails;
  photos: string[];
  checkboxes: boolean[];
  onCheckbox: (index: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const CHECKBOXES = [
  "Ich bin mindestens 18 Jahre alt",
  "Die angebotene Waffe befindet sich rechtmässig in meinem Besitz",
  "Ich werde den Käufer über den Rechtsstatus informieren und alle gesetzlichen Vorschriften einhalten (Art. 10a WG)",
  "Ich habe die AGB gelesen und akzeptiere sie",
  "Ich bin mir bewusst, dass die Identitätsprüfung des Käufers (Art. 10a WG) in meiner Verantwortung liegt und werde diese vor Übergabe der Waffe durchführen.",
];

export default function PreviewStep({
  hauptkategorie,
  unterkategorie,
  rechtsstatus,
  details,
  photos,
  checkboxes,
  onCheckbox,
  onBack,
  onSubmit,
}: PreviewStepProps) {
  const hk = HAUPTKATEGORIEN.find((h) => h.id === hauptkategorie);
  const uk = hk?.unterkategorien.find((u) => u.id === unterkategorie);
  const rs = RECHTSSTATUS_FILTER.find((r) => r.id === rechtsstatus);
  const kanton = KANTONE.find((k) => k.id === details.kanton);
  const zustand = ZUSTAND_OPTIONEN.find((z) => z.id === details.zustand);

  const allChecked = checkboxes.every(Boolean);

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-1 font-display text-xl font-bold text-brand-dark">Vorschau</h2>
      <p className="mb-6 text-sm text-neutral-500">
        Überprüfen Sie Ihr Inserat vor der Veröffentlichung
      </p>

      {/* Preview card */}
      <div className="mb-8 overflow-hidden rounded-xl border border-brand-border bg-white shadow-sm">
        {/* Main photo */}
        {photos.length > 0 && (
          <div className="relative aspect-video bg-gray-100">
            <img
              src={photos[0]}
              alt={details.titel}
              className="h-full w-full object-contain"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-brand-green px-2 py-0.5 text-[10px] font-semibold text-white">
                {uk?.label || hk?.label}
              </span>
              {rs && (
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${rs.farbe} ${rs.textfarbe}`}>
                  {rs.kurzlabel}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Photo strip */}
        {photos.length > 1 && (
          <div className="flex gap-1 overflow-x-auto border-b border-brand-border bg-gray-50 p-2">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-brand-border"
              >
                <img src={photo} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-5 md:p-6">
          <h1 className="mb-2 font-display text-2xl font-black text-brand-dark">
            {details.titel}
          </h1>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            {details.marke && (
              <span className="flex items-center gap-1">
                <Tag size={14} />
                {details.marke} {details.modell}
              </span>
            )}
            {details.kaliber && (
              <span className="font-mono text-xs">{details.kaliber}</span>
            )}
            {zustand && (
              <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium">
                {zustand.label}
              </span>
            )}
          </div>

          <p className="mb-4 font-display text-3xl font-black text-brand-green">
            CHF {Number(details.preis).toLocaleString("de-CH")}
            {details.verhandelbar && (
              <span className="ml-2 text-sm font-normal text-neutral-500">Verhandelbar</span>
            )}
            {details.tausch && (
              <span className="ml-2 text-sm font-normal text-neutral-500">· Tausch möglich</span>
            )}
          </p>

          {/* Details grid */}
          <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-4 text-sm sm:grid-cols-3">
            {kanton && (
              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin size={14} className="text-neutral-400" />
                {kanton.label}{details.ortschaft ? `, ${details.ortschaft}` : ""}
              </div>
            )}
            <div className="flex items-center gap-2 text-neutral-600">
              <User size={14} className="text-neutral-400" />
              {details.anbieterTyp}
            </div>
            {rs && (
              <div className="flex items-center gap-2 text-neutral-600">
                <Shield size={14} className="text-neutral-400" />
                {rs.label}
              </div>
            )}
            {details.baujahr && (
              <div className="flex items-center gap-2 text-neutral-600">
                <Calendar size={14} className="text-neutral-400" />
                Baujahr {details.baujahr}
              </div>
            )}
            {details.lauflaenge && (
              <div className="text-neutral-600">Lauflänge: {details.lauflaenge}mm</div>
            )}
            {details.magazinkapazitaet && (
              <div className="text-neutral-600">Magazin: {details.magazinkapazitaet} Schuss</div>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-brand-border pt-4">
            <h3 className="mb-2 text-sm font-semibold text-brand-dark">Beschreibung</h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-600">
              {details.beschreibung}
            </p>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mb-8 rounded-xl border border-brand-border bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-brand-dark">
          Bestätigung
        </h3>
        <div className="space-y-3">
          {CHECKBOXES.map((label, i) => (
            <label key={i} className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={checkboxes[i]}
                onChange={() => onCheckbox(i)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-green"
              />
              <span className="text-sm text-neutral-700">
                {label}
                {i === 3 && (
                  <>
                    {" "}
                    <Link href="/agb" className="text-brand-green underline hover:no-underline" target="_blank">
                      (AGB lesen)
                    </Link>
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between border-t border-brand-border pt-6">
        <button
          onClick={onBack}
          className="rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-gray-50"
        >
          Zurück
        </button>
        <button
          onClick={onSubmit}
          disabled={!allChecked}
          className="rounded-lg bg-brand-green px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            <CheckCircle size={18} />
            Inserat veröffentlichen
          </span>
        </button>
      </div>
    </div>
  );
}
