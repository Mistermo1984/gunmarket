"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Store, Lock, AlertTriangle, Loader2 } from "lucide-react";
import AuthPanel from "@/components/auth/AuthPanel";
import PasswordStrength from "@/components/ui/PasswordStrength";
import { KANTONE } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [anbieterTyp, setAnbieterTyp] = useState<"privat" | "haendler">("privat");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [kanton, setKanton] = useState("");
  const [telefon, setTelefon] = useState("");
  const [nationalitaet, setNationalitaet] = useState("");

  // Händler fields
  const [firmenname, setFirmenname] = useState("");
  const [uidNummer, setUidNummer] = useState("");
  const [bewilligungsNr, setBewilligungsNr] = useState("");
  const [bewilligungsKanton, setBewilligungsKanton] = useState("");
  const [website, setWebsite] = useState("");

  // Checkboxes
  const [alter, setAlter] = useState(false);
  const [nutzung, setNutzung] = useState(false);
  const [gesetz, setGesetz] = useState(false);
  const [erwerbBerechtigung, setErwerbBerechtigung] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== passwordConfirm) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          vorname,
          nachname,
          anbieterTyp,
          telefon: telefon ? `+41 ${telefon}` : "",
          kanton,
          firmenname,
          uidNummer,
          bewilligungsNr,
          website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registrierung fehlgeschlagen");
        setLoading(false);
        return;
      }

      setLoading(false);

      // Redirect to verification page instead of auto-login
      router.push(`/email-bestaetigung?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[1.5fr_1fr]">
      {/* Left: Atmosphere Panel */}
      <AuthPanel />

      {/* Right: Register Form */}
      <div className="flex items-start justify-center overflow-y-auto px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="mb-2 font-display text-3xl font-black text-brand-dark">
            Konto erstellen
          </h1>
          <p className="mb-8 text-sm text-neutral-500">
            Bereits registriert?{" "}
            <Link href="/login" className="font-medium text-brand-green hover:underline">
              Anmelden &rarr;
            </Link>
          </p>

          {/* Anbieter-Typ */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAnbieterTyp("privat")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-colors ${
                anbieterTyp === "privat"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-brand-border bg-white hover:border-neutral-300"
              }`}
            >
              <User
                size={28}
                className={anbieterTyp === "privat" ? "text-brand-green" : "text-neutral-400"}
              />
              <span
                className={`text-sm font-semibold ${
                  anbieterTyp === "privat" ? "text-brand-green" : "text-brand-dark"
                }`}
              >
                Privat
              </span>
              <span className="text-[11px] text-neutral-500">Privatperson</span>
            </button>
            <button
              type="button"
              onClick={() => setAnbieterTyp("haendler")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-colors ${
                anbieterTyp === "haendler"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-brand-border bg-white hover:border-neutral-300"
              }`}
            >
              <Store
                size={28}
                className={anbieterTyp === "haendler" ? "text-brand-green" : "text-neutral-400"}
              />
              <span
                className={`text-sm font-semibold ${
                  anbieterTyp === "haendler" ? "text-brand-green" : "text-brand-dark"
                }`}
              >
                Händler
              </span>
              <span className="text-[11px] text-neutral-500">Gewerblicher Waffenhändler</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="vorname" className="mb-1.5 block text-sm font-medium text-brand-dark">
                  Vorname
                </label>
                <input
                  id="vorname"
                  type="text"
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                  required
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
              <div>
                <label htmlFor="nachname" className="mb-1.5 block text-sm font-medium text-brand-dark">
                  Nachname
                </label>
                <input
                  id="nachname"
                  type="text"
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  required
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-brand-dark">
                E-Mail
              </label>
              <input
                id="reg-email"
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
              <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Passwort
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 Zeichen"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 pr-11 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="reg-password-confirm" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Passwort bestätigen
              </label>
              <div className="relative">
                <input
                  id="reg-password-confirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Passwort wiederholen"
                  required
                  className={`w-full rounded-lg border bg-white px-4 py-3 pr-11 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                    passwordConfirm && passwordConfirm !== password
                      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                      : "border-brand-border focus:border-brand-green focus:ring-brand-green/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordConfirm && passwordConfirm !== password && (
                <p className="mt-1 text-xs text-red-500">Passwörter stimmen nicht überein</p>
              )}
            </div>

            {/* Kanton */}
            <div>
              <label htmlFor="kanton" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Kanton
              </label>
              <select
                id="kanton"
                value={kanton}
                onChange={(e) => setKanton(e.target.value)}
                required
                className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              >
                <option value="">Kanton wählen...</option>
                {KANTONE.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nationalität / Aufenthaltsstatus */}
            <div>
              <label htmlFor="nationalitaet" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Nationalität / Aufenthaltsstatus
              </label>
              <select
                id="nationalitaet"
                value={nationalitaet}
                onChange={(e) => setNationalitaet(e.target.value)}
                required
                className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              >
                <option value="">Bitte wählen...</option>
                <option value="ch-c">Schweizer Bürger / Niederlassungsbewilligung C</option>
                <option value="b">Aufenthaltsbewilligung B</option>
                <option value="andere">Andere / Ausland</option>
              </select>
              <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-200 p-3">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-800">
                  Gemäss Art. 12 WV sind Staatsangehörige folgender Länder vom Waffenerwerb in der
                  Schweiz ausgeschlossen: Serbien, Bosnien-Herzegowina, Kosovo, Nordmazedonien,
                  Türkei, Sri Lanka, Algerien, Albanien. Personen mit Aufenthaltsbewilligung B
                  benötigen für alle Waffen zwingend einen Waffenerwerbsschein (WES).
                </p>
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="telefon" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Telefon <span className="text-neutral-400">(optional)</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-brand-border bg-brand-grey px-3 text-sm text-neutral-500">
                  +41
                </span>
                <input
                  id="telefon"
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="79 123 45 67"
                  className="w-full rounded-r-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
            </div>

            {/* Händler fields */}
            {anbieterTyp === "haendler" && (
              <div className="space-y-4 rounded-xl border border-brand-border bg-brand-grey/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Händler-Angaben
                </p>

                <div>
                  <label htmlFor="firmenname" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Firmenname
                  </label>
                  <input
                    id="firmenname"
                    type="text"
                    value={firmenname}
                    onChange={(e) => setFirmenname(e.target.value)}
                    required
                    className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>

                <div>
                  <label htmlFor="uid" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    UID-Nummer
                  </label>
                  <input
                    id="uid"
                    type="text"
                    value={uidNummer}
                    onChange={(e) => setUidNummer(e.target.value)}
                    placeholder="CHE-123.456.789"
                    className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>

                <div>
                  <label htmlFor="bewilligung" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Waffenhandelsbewilligungs-Nr.
                  </label>
                  <input
                    id="bewilligung"
                    type="text"
                    value={bewilligungsNr}
                    onChange={(e) => setBewilligungsNr(e.target.value)}
                    required
                    className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>

                <div>
                  <label htmlFor="bew-kanton" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Kanton der Bewilligung
                  </label>
                  <select
                    id="bew-kanton"
                    value={bewilligungsKanton}
                    onChange={(e) => setBewilligungsKanton(e.target.value)}
                    required
                    className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  >
                    <option value="">Kanton wählen...</option>
                    {KANTONE.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Website <span className="text-neutral-400">(optional)</span>
                  </label>
                  <input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.beispiel.ch"
                    className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>
              </div>
            )}

            {/* Pflicht-Checkboxen */}
            <div className="space-y-3 rounded-xl border border-brand-border bg-white p-4">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={alter}
                  onChange={() => setAlter(!alter)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-700">
                  Ich bestätige, dass ich mindestens 18 Jahre alt bin
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={nutzung}
                  onChange={() => setNutzung(!nutzung)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-700">
                  Ich habe die{" "}
                  <Link href="/agb" className="text-brand-green hover:underline">
                    AGB
                  </Link>{" "}
                  gelesen und akzeptiere diese
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={gesetz}
                  onChange={() => setGesetz(!gesetz)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-700">
                  Ich bestätige, die gesetzlichen Voraussetzungen für Waffenerwerb und -verkauf in
                  der Schweiz zu kennen
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={erwerbBerechtigung}
                  onChange={() => setErwerbBerechtigung(!erwerbBerechtigung)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-brand-green"
                />
                <span className="text-sm text-neutral-700">
                  Ich bestätige, dass ich gemäss Art. 12 WV zum Erwerb von Waffen in der Schweiz
                  berechtigt bin.
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Wird erstellt..." : "Konto erstellen"}
            </button>
          </form>

          {/* Trust line */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
            <Lock size={12} />
            <span>Kostenlos</span>
            <span>·</span>
            <span>Kein Spam</span>
            <span>·</span>
            <span>Jederzeit löschbar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
