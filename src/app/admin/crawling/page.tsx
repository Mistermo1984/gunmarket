"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  Clock,
  Database,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Globe,
  Timer,
  ExternalLink,
} from "lucide-react";

interface CrawlStatus {
  lastCrawl: string | null;
  count: number;
  autoCrawlEnabled: boolean;
  autoCrawlTime: string;
}

interface CrawlResult {
  success: boolean;
  inserted: number;
  deleted: number;
  duration: number;
  error?: string;
}

export default function CrawlingPage() {
  const [status, setStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [crawling, setCrawling] = useState(false);
  const [lastResult, setLastResult] = useState<CrawlResult | null>(null);

  const fetchStatus = useCallback(() => {
    fetch("/api/admin/crawl")
      .then((r) => r.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  async function handleCrawl() {
    setCrawling(true);
    setLastResult(null);

    try {
      const res = await fetch("/api/admin/crawl", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setLastResult(data);
        fetchStatus();
      } else {
        setLastResult({ success: false, inserted: 0, deleted: 0, duration: 0, error: data.error });
      }
    } catch {
      setLastResult({ success: false, inserted: 0, deleted: 0, duration: 0, error: "Netzwerkfehler" });
    }

    setCrawling(false);
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function timeSince(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    if (hours > 24) return `vor ${Math.floor(hours / 24)} Tagen`;
    if (hours > 0) return `vor ${hours}h ${minutes}min`;
    return `vor ${minutes} Minuten`;
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <RefreshCw size={20} className="text-red-600" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
            Crawling
          </h1>
        </div>
        <p className="text-sm text-neutral-500">
          Inserate von waffengebraucht.ch importieren und verwalten
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Manual Crawl Card */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Manuelles Crawling</h2>
          </div>
          <div className="p-5">
            <p className="mb-4 text-sm text-neutral-600">
              Löscht alle bestehenden gecrawlten Inserate und importiert die aktuellen Daten neu von waffengebraucht.ch.
            </p>

            <button
              onClick={handleCrawl}
              disabled={crawling}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {crawling ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Crawling läuft...
                </>
              ) : (
                <>
                  <RefreshCw size={18} />
                  Jetzt crawlen
                </>
              )}
            </button>

            {/* Result */}
            {lastResult && (
              <div
                className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${
                  lastResult.success
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                {lastResult.success ? (
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-600" />
                ) : (
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />
                )}
                <div className="text-sm">
                  {lastResult.success ? (
                    <>
                      <p className="font-semibold text-green-800">Crawling erfolgreich!</p>
                      <p className="mt-1 text-green-700">
                        {lastResult.deleted} alte Inserate gelöscht, {lastResult.inserted} neue Inserate importiert
                        in {lastResult.duration}ms.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-red-800">Crawling fehlgeschlagen</p>
                      <p className="mt-1 text-red-700">{lastResult.error}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Card */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Status</h2>
          </div>
          <div className="p-5 space-y-4">
            {/* Crawled count */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Database size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-brand-dark">{status?.count || 0}</p>
                <p className="text-xs text-neutral-500">Gecrawlte Inserate</p>
              </div>
            </div>

            {/* Last crawl */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <Clock size={20} className="text-amber-500" />
              </div>
              <div>
                {status?.lastCrawl ? (
                  <>
                    <p className="text-sm font-semibold text-brand-dark">{formatDate(status.lastCrawl)}</p>
                    <p className="text-xs text-neutral-500">{timeSince(status.lastCrawl)}</p>
                  </>
                ) : (
                  <p className="text-sm text-neutral-500">Noch nie gecrawlt</p>
                )}
              </div>
            </div>

            {/* Auto-crawl */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <Timer size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark">
                  Auto-Crawling: {status?.autoCrawlTime || "17:00"} Uhr
                </p>
                <p className="text-xs text-neutral-500">
                  Täglich automatisch — nächste Ausführung um 17:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Source Info Cards */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Quelle 1</h2>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Globe size={24} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-brand-dark">waffengebraucht.ch</h3>
                  <a
                    href="https://www.waffengebraucht.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  ~1&apos;800 Inserate aus allen Kategorien. Echtes Web-Crawling aller Kategorieseiten.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Kurzwaffen", "Langwaffen", "Ordonnanz", "Optik", "Munition", "Zubehör"].map((cat) => (
                    <span key={cat} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Quelle 2</h2>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                <Globe size={24} className="text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-brand-dark">marketplace.nextgun.ch</h3>
                  <a
                    href="https://marketplace.nextgun.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  ~190 Inserate. Daten werden aus dem eingebetteten SvelteKit-JSON extrahiert.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Firearms", "Accessories", "Equipment", "Ammunition", "Knives"].map((cat) => (
                    <span key={cat} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
