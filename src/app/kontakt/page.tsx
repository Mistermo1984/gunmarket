"use client";

import { useState } from "react";

const content = {
  de: {
    title: "Kontakt",
    subtitle:
      "Hast du Fragen, Anregungen oder ein Problem? Schreib uns – wir antworten so schnell wie möglich.",
    name: "Name",
    email: "E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    send: "Absenden",
    sending: "Senden...",
    success: "Deine Nachricht wurde gesendet. Wir melden uns bald!",
    error: "Fehler beim Senden. Bitte versuche es erneut.",
    address: "GunMarket\nAarestr. 62\n3613 Steffisburg\nSchweiz",
    addressLabel: "Adresse",
  },
  fr: {
    title: "Contact",
    subtitle:
      "Vous avez des questions ou des suggestions ? Écrivez-nous – nous répondrons dès que possible.",
    name: "Nom",
    email: "E-mail",
    subject: "Objet",
    message: "Message",
    send: "Envoyer",
    sending: "Envoi...",
    success: "Votre message a été envoyé. Nous vous répondrons bientôt !",
    error: "Erreur lors de l'envoi. Veuillez réessayer.",
    address: "GunMarket\nAarestr. 62\n3613 Steffisburg\nSuisse",
    addressLabel: "Adresse",
  },
  it: {
    title: "Contatto",
    subtitle:
      "Hai domande o suggerimenti? Scrivici – risponderemo il prima possibile.",
    name: "Nome",
    email: "E-mail",
    subject: "Oggetto",
    message: "Messaggio",
    send: "Invia",
    sending: "Invio...",
    success: "Il tuo messaggio è stato inviato. Ti risponderemo presto!",
    error: "Errore durante l'invio. Riprova.",
    address: "GunMarket\nAarestr. 62\n3613 Steffisburg\nSvizzera",
    addressLabel: "Indirizzo",
  },
};

type Locale = "de" | "fr" | "it";

export default function KontaktPage() {
  const [locale, setLocale] = useState<Locale>("de");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const c = content[locale];

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
      <div className="mb-8 flex gap-2">
        {(["de", "fr", "it"] as Locale[]).map((l) => (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={`rounded border px-3 py-1 text-sm font-medium ${
              locale === l
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <h1 className="mb-3 text-3xl font-bold text-gray-900">{c.title}</h1>
      <p className="mb-10 text-gray-500">{c.subtitle}</p>

      <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">
          {c.addressLabel}
        </h2>
        <p className="whitespace-pre-line text-sm text-gray-600">
          {c.address}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {c.name}
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
              {c.email}
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
            {c.subject}
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
            {c.message}
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
          {status === "loading" ? c.sending : c.send}
        </button>
        {status === "success" && (
          <p className="text-center text-sm text-green-600">{c.success}</p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-600">{c.error}</p>
        )}
      </form>
    </main>
  );
}
