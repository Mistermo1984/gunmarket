"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Camera, CheckCircle, Loader2 } from "lucide-react";
import { KANTONE } from "@/lib/constants";

export default function ProfilPage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    kanton: "",
    ueber: "",
  });

  const isHaendler = session?.user?.anbieterTyp === "Händler";

  // Load user data from session
  useEffect(() => {
    if (session?.user) {
      setForm({
        vorname: session.user.vorname || "",
        nachname: session.user.nachname || "",
        email: session.user.email || "",
        telefon: "",
        kanton: "",
        ueber: "",
      });
    }
  }, [session]);

  const initials = form.vorname && form.nachname
    ? `${form.vorname[0]}${form.nachname[0]}`.toUpperCase()
    : "??";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user?.id) return;

    setSaving(true);
    await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: session.user.id,
        vorname: form.vorname,
        nachname: form.nachname,
        telefon: form.telefon,
        kanton: form.kanton,
        ueber_mich: form.ueber,
      }),
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-8 font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
        Profil
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left: Avatar */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-green text-3xl font-bold text-white">
                {initials}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-neutral-500 transition-colors hover:bg-gray-200"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="text-sm font-medium text-brand-dark">{form.vorname} {form.nachname}</p>
            <p className="mt-0.5 text-xs text-neutral-500">{session?.user?.email}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-brand-green" />
              <span className="text-xs font-medium text-brand-green">
                {isHaendler ? "Händler" : "Privat"}
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-xl border border-brand-border bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-display text-lg font-bold text-brand-dark">
              Persönliche Angaben
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="vorname" className="mb-1.5 block text-sm font-medium text-brand-dark">
                  Vorname
                </label>
                <input
                  id="vorname"
                  name="vorname"
                  value={form.vorname}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
              <div>
                <label htmlFor="nachname" className="mb-1.5 block text-sm font-medium text-brand-dark">
                  Nachname
                </label>
                <input
                  id="nachname"
                  name="nachname"
                  value={form.nachname}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-dark">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                readOnly
                className="w-full rounded-lg border border-brand-border bg-gray-50 px-4 py-2.5 text-sm text-neutral-500"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="telefon" className="mb-1.5 block text-sm font-medium text-brand-dark">
                  Telefon <span className="text-neutral-400">(optional)</span>
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  value={form.telefon}
                  onChange={handleChange}
                  placeholder="+41 79 000 00 00"
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
              <div>
                <label htmlFor="kanton" className="mb-1.5 block text-sm font-medium text-brand-dark">
                  Kanton
                </label>
                <select
                  id="kanton"
                  name="kanton"
                  value={form.kanton}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                >
                  <option value="">Kanton wählen...</option>
                  {KANTONE.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="ueber" className="mb-1.5 block text-sm font-medium text-brand-dark">
                Über mich <span className="text-neutral-400">(optional)</span>
              </label>
              <textarea
                id="ueber"
                name="ueber"
                value={form.ueber}
                onChange={handleChange}
                rows={3}
                placeholder="Erzählen Sie potenziellen Käufern etwas über sich..."
                className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              {saved && (
                <span className="flex items-center gap-1 text-sm text-brand-green">
                  <CheckCircle size={14} />
                  Gespeichert
                </span>
              )}
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                Änderungen speichern
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
