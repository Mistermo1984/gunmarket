"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { HalbautomatIcon } from "@/components/ui/WeaponIcons";

interface Inserat {
  id: string;
  titel: string;
  kaliber: string;
  preis: number;
  kanton: string;
  status: string;
  aufrufe: number;
  datum: string;
}

const TABS = [
  { id: "alle", label: "Alle" },
  { id: "aktiv", label: "Aktiv" },
  { id: "pausiert", label: "Pausiert" },
] as const;

export default function MeineInseratePage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<string>("alle");
  const [inserate, setInserate] = useState<Inserat[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/listings?user_id=${session.user.id}&limit=50`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data.listings || []).map((l: Record<string, unknown>) => ({
          id: l.id as string,
          titel: l.titel as string,
          kaliber: (l.kaliber as string) || "",
          preis: l.preis as number,
          kanton: l.kanton as string,
          status: l.status as string,
          aufrufe: (l.aufrufe as number) || 0,
          datum: new Date(l.created_at as string).toLocaleDateString("de-CH"),
        }));
        setInserate(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const filtered = tab === "alle" ? inserate : inserate.filter((i) => i.status === tab);

  function toggleStatus(id: string) {
    const item = inserate.find((i) => i.id === id);
    if (!item) return;
    const next = item.status === "aktiv" ? "pausiert" : "aktiv";

    fetch(`/api/listings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    setInserate((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: next } : i))
    );
  }

  function handleDelete() {
    if (!deleteId) return;
    fetch(`/api/listings/${deleteId}`, { method: "DELETE" });
    setInserate((prev) => prev.filter((i) => i.id !== deleteId));
    setDeleteId(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (inserate.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 text-gray-200">
          <HalbautomatIcon size={80} />
        </div>
        <h2 className="mb-2 font-display text-xl font-bold text-brand-dark">
          Noch keine Inserate
        </h2>
        <p className="mb-6 text-sm text-neutral-500">
          Erstellen Sie Ihr erstes Inserat und erreichen Sie tausende Käufer.
        </p>
        <Link
          href="/dashboard/inserat-erstellen"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          <Plus size={16} />
          Erstes Inserat aufgeben
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
            Meine Inserate
          </h1>
          <span className="rounded-full bg-brand-green px-2.5 py-0.5 text-xs font-bold text-white">
            {inserate.length}
          </span>
        </div>
        <Link
          href="/dashboard/inserat-erstellen"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          <Plus size={16} />
          Neues Inserat erstellen
        </Link>
      </div>

      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
              tab === t.id
                ? "bg-white text-brand-dark shadow-sm"
                : "text-neutral-500 hover:text-brand-dark"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-brand-border bg-white shadow-sm">
        <div className="divide-y divide-brand-border">
          {filtered.map((inserat) => (
            <div
              key={inserat.id}
              className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50 md:px-5"
            >
              <div className="min-w-0 flex-1">
                <Link href={`/inserat/${inserat.id}`} className="truncate text-sm font-semibold text-brand-dark hover:text-brand-green">
                  {inserat.titel}
                </Link>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {inserat.kaliber && `${inserat.kaliber} · `}CHF {inserat.preis.toLocaleString("de-CH")} · {inserat.kanton}
                </p>
              </div>

              <button
                onClick={() => toggleStatus(inserat.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  inserat.status === "aktiv"
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {inserat.status === "aktiv" ? "● Aktiv" : "○ Pausiert"}
              </button>

              <span className="hidden items-center gap-1 text-xs text-neutral-400 md:flex">
                <Eye size={14} />
                {inserat.aufrufe}
              </span>

              <div className="flex items-center gap-1">
                <Link
                  href={`/dashboard/inserat-bearbeiten/${inserat.id}`}
                  className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-gray-100 hover:text-brand-dark"
                  title="Bearbeiten"
                >
                  <Pencil size={16} />
                </Link>
                <Link
                  href={`/inserat/${inserat.id}`}
                  className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-gray-100 hover:text-brand-dark"
                  title="Ansehen"
                >
                  <Eye size={16} />
                </Link>
                <button
                  onClick={() => setDeleteId(inserat.id)}
                  className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  title="Löschen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-neutral-400">
              Keine Inserate in dieser Kategorie
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-dark">
                Inserat wirklich löschen?
              </h3>
            </div>
            <p className="mb-6 text-sm text-neutral-500">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
