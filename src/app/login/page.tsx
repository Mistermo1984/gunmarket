"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Info, Loader2, CheckCircle, MailWarning } from "lucide-react";
import AuthPanel from "@/components/auth/AuthPanel";
import { RECHTLICHER_DISCLAIMER } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

// Metadata must be in a separate layout since this is a client component
// See: src/app/login/layout.tsx

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const verified = searchParams.get("verified") === "1";
  const tokenError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerifyHint, setShowVerifyHint] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShowVerifyHint(false);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error.includes("EMAIL_NOT_VERIFIED")) {
        setShowVerifyHint(true);
        setError("Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.");
      } else {
        setError("E-Mail oder Passwort ist falsch");
      }
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  async function handleResendVerification() {
    if (!email) {
      setError("Bitte geben Sie Ihre E-Mail-Adresse ein");
      return;
    }
    setResending(true);
    await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResending(false);
    setResendSuccess(true);
  }

  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[1.5fr_1fr]">
      {/* Left: Atmosphere Panel */}
      <AuthPanel />

      {/* Right: Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          {/* Verification success banner */}
          {verified && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
              <CheckCircle size={20} className="shrink-0 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-green-800">E-Mail bestätigt!</p>
                <p className="text-xs text-green-600">Sie können sich jetzt anmelden.</p>
              </div>
            </div>
          )}

          {/* Token error banner */}
          {tokenError === "invalid-token" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-4">
              <MailWarning size={20} className="shrink-0 text-red-600" />
              <p className="text-sm text-red-700">Ungültiger Bestätigungslink. Bitte fordern Sie einen neuen an.</p>
            </div>
          )}
          {tokenError === "token-expired" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
              <MailWarning size={20} className="shrink-0 text-amber-600" />
              <p className="text-sm text-amber-700">Der Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.</p>
            </div>
          )}

          <h1 className="mb-2 font-display text-3xl font-black text-brand-dark">
            Willkommen zurück
          </h1>
          <p className="mb-8 text-sm text-neutral-500">
            Noch kein Konto?{" "}
            <Link href="/register" className="font-medium text-brand-green hover:underline">
              Jetzt registrieren &rarr;
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark">
                E-Mail
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Passwort
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben"
                  required
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 pr-11 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-600">Angemeldet bleiben</span>
              </label>
              <Link href="/passwort-vergessen" className="text-xs text-neutral-500 hover:text-brand-green">
                Passwort vergessen?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Resend verification */}
            {showVerifyHint && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <p className="text-xs text-amber-800 mb-2">
                  Prüfen Sie Ihren Posteingang. Falls Sie keine E-Mail erhalten haben:
                </p>
                {resendSuccess ? (
                  <p className="text-xs font-semibold text-green-700">Bestätigungsmail wurde erneut gesendet!</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="text-xs font-semibold text-amber-700 underline hover:text-amber-900"
                  >
                    {resending ? "Wird gesendet..." : "Bestätigungsmail erneut senden"}
                  </button>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Wird angemeldet..." : "Anmelden"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-brand-border" />
            <span className="text-xs text-neutral-400">oder</span>
            <div className="h-px flex-1 bg-brand-border" />
          </div>

          {/* Info box */}
          <div className="flex gap-3 rounded-lg bg-amber-50 p-4">
            <Info size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-xs leading-relaxed text-amber-800">
              Sie benötigen ein Konto um Inserate aufzugeben oder Verkäufer zu kontaktieren.
            </p>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-[10px] leading-relaxed text-neutral-400">
            {RECHTLICHER_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}
