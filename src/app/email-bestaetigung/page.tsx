"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, RefreshCw, CheckCircle } from "lucide-react";

export default function EmailBestaetigungPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}

function Content() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleResend() {
    if (!email) return;
    setResending(true);
    await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResending(false);
    setResent(true);
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-light">
          <Mail size={32} className="text-brand-green" />
        </div>

        <h1 className="mb-2 font-display text-2xl font-black text-brand-dark">
          Prüfen Sie Ihren Posteingang
        </h1>
        <p className="mb-2 text-sm text-neutral-500">
          Wir haben eine Bestätigungsmail an
        </p>
        {email && (
          <p className="mb-6 text-sm font-semibold text-brand-dark">{email}</p>
        )}
        <p className="mb-8 text-sm text-neutral-500">
          Klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren. Der Link ist 24 Stunden gültig.
        </p>

        <div className="space-y-3">
          {resent ? (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 border border-green-200 py-3 text-sm font-medium text-green-700">
              <CheckCircle size={16} />
              E-Mail wurde erneut gesendet!
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending || !email}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-border bg-white py-3 text-sm font-medium text-brand-dark transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              <RefreshCw size={16} className={resending ? "animate-spin" : ""} />
              {resending ? "Wird gesendet..." : "E-Mail erneut senden"}
            </button>
          )}

          <Link
            href="/login"
            className="block w-full rounded-lg bg-brand-green py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Zur Anmeldung
          </Link>
        </div>

        <p className="mt-8 text-xs text-neutral-400">
          Tipp: Prüfen Sie auch Ihren Spam-Ordner.
        </p>
      </div>
    </div>
  );
}
