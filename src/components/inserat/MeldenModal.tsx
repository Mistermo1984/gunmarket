"use client";

import React, { useState } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";

const MELDE_GRUENDE = [
  { id: "betrug", label: "Verdacht auf Betrug" },
  { id: "illegal", label: "Mögliche illegale Waffe" },
  { id: "rechtsstatus", label: "Falscher Rechtsstatus" },
  { id: "andere", label: "Andere" },
];

interface MeldenModalProps {
  inseratId: string;
  onClose: () => void;
}

export default function MeldenModal({ inseratId, onClose }: MeldenModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggleReason(id: string) {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedReasons.length === 0) {
      setError("Bitte wählen Sie mindestens einen Grund aus.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: inseratId,
          reason: selectedReasons.join(", "),
          details,
        }),
      });

      if (!res.ok) throw new Error("Fehler beim Senden");
      setSubmitted(true);
    } catch {
      setError("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="font-display text-lg font-bold text-brand-dark">
              Inserat melden
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-neutral-400 hover:bg-brand-grey hover:text-brand-dark"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="mb-1 font-semibold text-brand-dark">Vielen Dank</p>
            <p className="mb-4 text-sm text-neutral-500">
              Ihre Meldung wurde erfolgreich übermittelt. Wir werden das Inserat überprüfen.
            </p>
            <button
              onClick={onClose}
              className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
            >
              Schliessen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4">
            <p className="mb-4 text-sm text-neutral-500">
              Warum möchten Sie dieses Inserat melden?
            </p>

            {/* Checkboxes */}
            <div className="mb-4 space-y-2">
              {MELDE_GRUENDE.map((grund) => (
                <label
                  key={grund.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-brand-border p-3 transition-colors hover:bg-brand-grey"
                >
                  <input
                    type="checkbox"
                    checked={selectedReasons.includes(grund.id)}
                    onChange={() => toggleReason(grund.id)}
                    className="h-4 w-4 rounded border-brand-border accent-brand-green"
                  />
                  <span className="text-sm text-brand-dark">{grund.label}</span>
                </label>
              ))}
            </div>

            {/* Details textarea */}
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Weitere Details (optional)..."
              rows={3}
              className="mb-4 w-full rounded-lg border border-brand-border p-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />

            {error && (
              <p className="mb-3 text-sm text-red-600">{error}</p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-brand-grey"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Melden"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
