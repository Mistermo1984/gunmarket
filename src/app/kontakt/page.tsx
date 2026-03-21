"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

const subjects = [
  "Allgemeine Frage",
  "Problem mit einem Inserat melden",
  "Technischer Fehler",
  "Datenschutz-Anfrage",
  "Rechtliche Anfrage",
  "Zusammenarbeit / Partnerschaft",
  "Sonstiges",
];

export default function KontaktPage() {
  const { t, locale } = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-3 text-3xl font-bold text-gray-900">{t("contact_title")}</h1>
      <p className="mb-10 text-gray-500">{t("contact_subtitle")}</p>

      <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">
          {t("contact_address")}
        </h2>
        <p className="whitespace-pre-line text-sm text-gray-600">
          {"GunMarket\nAarestr. 62\n3613 Steffisburg\nSchweiz"}
        </p>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-[#4d8230] bg-[#eef5e8] p-6 text-[#3a6224]">
          <p className="text-lg font-semibold">Nachricht gesendet</p>
          <p className="mt-1 text-sm">
            Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("contact_name")}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("contact_email")}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("contact_subject")}
            </label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("contact_message")}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-green py-3 font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-50"
          >
            {loading ? "Wird gesendet..." : t("contact_send")}
          </button>
          {error && (
            <p className="text-center text-sm text-red-600">{t("contact_error")}</p>
          )}
        </form>
      )}
    </main>
  );
}
