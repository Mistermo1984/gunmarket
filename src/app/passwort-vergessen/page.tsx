"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react";

export default function PasswortVergessenPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Senden");
      } else {
        setSent(true);
      }
    } catch {
      setError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
    }

    setLoading(false);
  }

  if (sent) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="mb-2 font-display text-2xl font-black text-brand-dark">
            E-Mail gesendet
          </h1>
          <p className="mb-2 text-sm text-neutral-500">
            Falls ein Konto mit dieser Adresse existiert, haben wir einen Link zum Zurücksetzen des Passworts an
          </p>
          <p className="mb-6 text-sm font-semibold text-brand-dark">{email}</p>
          <p className="mb-8 text-sm text-neutral-500">
            gesendet. Der Link ist 1 Stunde gültig. Prüfen Sie auch Ihren Spam-Ordner.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-dark"
        >
          <ArrowLeft size={16} />
          Zurück zur Anmeldung
        </Link>

        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
          <Mail size={28} className="text-amber-600" />
        </div>

        <h1 className="mb-2 font-display text-2xl font-black text-brand-dark">
          Passwort vergessen?
        </h1>
        <p className="mb-8 text-sm text-neutral-500">
          Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@beispiel.ch"
              required
              className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Wird gesendet..." : "Link senden"}
          </button>
        </form>
      </div>
    </div>
  );
}
