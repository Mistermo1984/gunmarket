"use client";

import React from "react";
import { KANTONE, ZUSTAND_OPTIONEN } from "@/lib/constants";
import { isCaliberRequired } from "@/lib/calibers";
import CaliberSelect from "@/components/ui/CaliberSelect";

export interface InseratDetails {
  titel: string;
  marke: string;
  modell: string;
  kaliber: string;
  zustand: string;
  baujahr: string;
  lauflaenge: string;
  magazinkapazitaet: string;
  preis: string;
  verhandelbar: boolean;
  tausch: boolean;
  kanton: string;
  ortschaft: string;
  beschreibung: string;
  anbieterTyp: string;
}

interface DetailsStepProps {
  details: InseratDetails;
  errors: Partial<Record<keyof InseratDetails, string>>;
  onChange: (field: keyof InseratDetails, value: string | boolean) => void;
  onBack: () => void;
  onNext: () => void;
  hauptkategorie?: string;
}

const MARKEN = [
  "SIG Sauer", "Glock", "Beretta", "CZ", "Walther", "Heckler & Koch",
  "Smith & Wesson", "Ruger", "FN Herstal", "Browning", "Blaser",
  "Sauer", "Tikka", "Mauser", "Schmidt-Rubin", "Benelli", "Franchi",
  "Winchester", "Remington", "Steyr", "Taurus", "Andere",
];

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-500">{error}</p>;
}

export default function DetailsStep({
  details,
  errors,
  onChange,
  onBack,
  onNext,
  hauptkategorie = "",
}: DetailsStepProps) {
  const caliberRequired = isCaliberRequired(hauptkategorie);
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-1 font-display text-xl font-bold text-brand-dark">Details</h2>
      <p className="mb-6 text-sm text-neutral-500">
        Beschreiben Sie Ihr Inserat möglichst genau
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Linke Spalte */}
        <div className="space-y-5">
          {/* Titel */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Titel <span className="text-red-500">*</span>
            </label>
            <input
              value={details.titel}
              onChange={(e) => onChange("titel", e.target.value)}
              maxLength={80}
              placeholder="z.B. SIG Sauer P226 Legion 9mm"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                errors.titel ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
              }`}
            />
            <div className="mt-1 flex items-center justify-between">
              <FieldError error={errors.titel} />
              <span className="text-[10px] text-neutral-400">{details.titel.length}/80</span>
            </div>
          </div>

          {/* Marke */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Marke <span className="text-red-500">*</span>
            </label>
            <select
              value={details.marke}
              onChange={(e) => onChange("marke", e.target.value)}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                errors.marke ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
              }`}
            >
              <option value="">Bitte wählen...</option>
              {MARKEN.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <FieldError error={errors.marke} />
          </div>

          {/* Modell */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Modell <span className="text-red-500">*</span>
            </label>
            <input
              value={details.modell}
              onChange={(e) => onChange("modell", e.target.value)}
              placeholder="z.B. P226 Legion SAO"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                errors.modell ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
              }`}
            />
            <FieldError error={errors.modell} />
          </div>

          {/* Kaliber */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Kaliber{caliberRequired && <span className="text-red-500"> *</span>}
            </label>
            <CaliberSelect
              value={details.kaliber}
              onChange={(v) => onChange("kaliber", v)}
              required={caliberRequired}
              placeholder={caliberRequired ? "Kaliber wählen..." : "Optional — Kaliber wählen..."}
              error={errors.kaliber}
            />
          </div>

          {/* Zustand */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Zustand <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ZUSTAND_OPTIONEN.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => onChange("zustand", z.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    details.zustand === z.id
                      ? "border-brand-green bg-brand-green-light text-brand-green"
                      : "border-brand-border text-neutral-600 hover:border-brand-green/30"
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>
            <FieldError error={errors.zustand} />
          </div>

          {/* Optional fields row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">Baujahr</label>
              <input
                type="number"
                value={details.baujahr}
                onChange={(e) => onChange("baujahr", e.target.value)}
                placeholder="z.B. 2022"
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">Lauflänge</label>
              <input
                type="number"
                value={details.lauflaenge}
                onChange={(e) => onChange("lauflaenge", e.target.value)}
                placeholder="mm"
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">Magazin</label>
              <input
                type="number"
                value={details.magazinkapazitaet}
                onChange={(e) => onChange("magazinkapazitaet", e.target.value)}
                placeholder="Schuss"
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
          </div>
        </div>

        {/* Rechte Spalte */}
        <div className="space-y-5">
          {/* Preis */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Preis (CHF) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={details.preis}
              onChange={(e) => onChange("preis", e.target.value)}
              placeholder="0"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                errors.preis ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
              }`}
            />
            <FieldError error={errors.preis} />
            <div className="mt-3 flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={details.verhandelbar}
                  onChange={() => onChange("verhandelbar", !details.verhandelbar)}
                  className="h-4 w-4 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-600">Verhandelbar</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={details.tausch}
                  onChange={() => onChange("tausch", !details.tausch)}
                  className="h-4 w-4 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-600">Tausch möglich</span>
              </label>
            </div>
          </div>

          {/* Kanton + Ortschaft */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">
                Kanton <span className="text-red-500">*</span>
              </label>
              <select
                value={details.kanton}
                onChange={(e) => onChange("kanton", e.target.value)}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                  errors.kanton ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
                }`}
              >
                <option value="">Bitte wählen...</option>
                {KANTONE.map((k) => (
                  <option key={k.id} value={k.id}>{k.label}</option>
                ))}
              </select>
              <FieldError error={errors.kanton} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">
                Ortschaft <span className="text-red-500">*</span>
              </label>
              <input
                value={details.ortschaft}
                onChange={(e) => onChange("ortschaft", e.target.value)}
                placeholder="z.B. Thun"
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                  errors.ortschaft ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
                }`}
              />
              <FieldError error={errors.ortschaft} />
            </div>
          </div>

          {/* Beschreibung */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">
              Beschreibung <span className="text-red-500">*</span>
            </label>
            <textarea
              value={details.beschreibung}
              onChange={(e) => onChange("beschreibung", e.target.value)}
              rows={6}
              maxLength={2000}
              placeholder="Beschreiben Sie Ihr Inserat möglichst detailliert: Zustand, Besonderheiten, Zubehör, Grund des Verkaufs..."
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                errors.beschreibung ? "border-red-300 focus:border-red-500" : "border-brand-border focus:border-brand-green"
              }`}
            />
            <div className="mt-1 flex items-center justify-between">
              <FieldError error={errors.beschreibung} />
              <span className="text-[10px] text-neutral-400">
                {details.beschreibung.length}/2000
              </span>
            </div>
          </div>

          {/* Anbieter-Typ */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-dark">Anbieter-Typ</label>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-brand-border bg-gray-50 px-4 py-2.5 text-sm text-neutral-500">
                {details.anbieterTyp}
              </span>
              <span className="text-xs text-neutral-400">Aus Ihrem Profil</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between border-t border-brand-border pt-6">
        <button
          onClick={onBack}
          className="rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-gray-50"
        >
          Zurück
        </button>
        <button
          onClick={onNext}
          className="rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
