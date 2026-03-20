"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

export default function KontaktPage() {
  const { t, locale } = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok)
        setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
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

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
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
          disabled={status === "loading"}
          className="w-full rounded-lg bg-brand-green py-3 font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-50"
        >
          {status === "loading" ? t("contact_sending") : t("contact_send")}
        </button>
        {status === "success" && (
          <p className="text-center text-sm text-green-600">{t("contact_success")}</p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-600">{t("contact_error")}</p>
        )}
      </form>
    </main>
  );
}
