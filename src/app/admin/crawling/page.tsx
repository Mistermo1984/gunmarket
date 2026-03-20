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

interface CrawlStep {
  id: string;
  label: string;
}

interface CrawlStatus {
  lastCrawl: string | null;
  count: number;
  autoCrawlEnabled: boolean;
  autoCrawlTime: string;
  steps: CrawlStep[];
}

interface StepResult {
  id: string;
  label: string;
  inserted: number;
  deleted: number;
  status: "pending" | "running" | "done" | "error";
  error?: string;
}

export default function CrawlingPage() {
  const [status, setStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [crawling, setCrawling] = useState(false);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);
  const [, setCurrentStepIdx] = useState(-1);

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
    if (!status?.steps) return;
    setCrawling(true);
    setCurrentStepIdx(0);

    // Initialize step results
    const results: StepResult[] = status.steps.map((s) => ({
      id: s.id,
      label: s.label,
      inserted: 0,
      deleted: 0,
      status: "pending",
    }));
    setStepResults(results);

    for (let i = 0; i < status.steps.length; i++) {
      const step = status.steps[i];
      setCurrentStepIdx(i);

      // Mark current as running
      results[i].status = "running";
      setStepResults([...results]);

      try {
        const res = await fetch("/api/admin/crawl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: step.id }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          results[i].status = "done";
          results[i].inserted = data.inserted || 0;
          results[i].deleted = data.deleted || 0;
        } else {
          results[i].status = "error";
          results[i].error = data.error || "Unbekannter Fehler";
        }
      } catch {
        results[i].status = "error";
        results[i].error = "Netzwerkfehler";
      }

      setStepResults([...results]);
    }

    setCurrentStepIdx(-1);
    setCrawling(false);
    fetchStatus();
  }

  const totalInserted = stepResults.reduce((s, r) => s + r.inserted, 0);
  const totalDeleted = stepResults.reduce((s, r) => s + r.deleted, 0);
  const doneSteps = stepResults.filter((r) => r.status === "done").length;
  const errorSteps = stepResults.filter((r) => r.status === "error").length;
  const allDone = stepResults.length > 0 && !crawling;

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
          Inserate von gebrauchtwaffen.com und nextgun.ch importieren
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
              Crawlt alle Kategorien von gebrauchtwaffen.com und nextgun.ch Schritt für Schritt.
              Bereits vorhandene Inserate werden übersprungen, verkaufte werden entfernt.
            </p>

            <button
              onClick={handleCrawl}
              disabled={crawling}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {crawling ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Crawling läuft... ({doneSteps}/{stepResults.length})
                </>
              ) : (
                <>
                  <RefreshCw size={18} />
                  Jetzt crawlen
                </>
              )}
            </button>

            {/* Step-by-step progress */}
            {stepResults.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {stepResults.map((r) => (
                  <div
                    key={r.id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                      r.status === "running"
                        ? "bg-blue-50 text-blue-700"
                        : r.status === "done"
                        ? "bg-green-50 text-green-700"
                        : r.status === "error"
                        ? "bg-red-50 text-red-700"
                        : "bg-gray-50 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {r.status === "running" && <Loader2 size={12} className="animate-spin" />}
                      {r.status === "done" && <CheckCircle size={12} />}
                      {r.status === "error" && <AlertTriangle size={12} />}
                      {r.status === "pending" && <span className="h-3 w-3" />}
                      <span className="font-medium">{r.label}</span>
                    </div>
                    <div>
                      {r.status === "done" && (
                        <span>+{r.inserted} / -{r.deleted}</span>
                      )}
                      {r.status === "error" && (
                        <span className="text-red-600">{r.error}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            {allDone && stepResults.length > 0 && (
              <div
                className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${
                  errorSteps === 0
                    ? "border-green-200 bg-green-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                {errorSteps === 0 ? (
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-600" />
                ) : (
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                )}
                <div className="text-sm">
                  <p className={`font-semibold ${errorSteps === 0 ? "text-green-800" : "text-amber-800"}`}>
                    Crawling abgeschlossen{errorSteps > 0 ? ` (${errorSteps} Fehler)` : ""}
                  </p>
                  <p className={`mt-1 ${errorSteps === 0 ? "text-green-700" : "text-amber-700"}`}>
                    {totalInserted} neue Inserate importiert, {totalDeleted} verkaufte entfernt.
                  </p>
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
                  Täglich automatisch via Vercel Cron
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
                  <h3 className="font-semibold text-brand-dark">gebrauchtwaffen.com</h3>
                  <a
                    href="https://www.gebrauchtwaffen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  11 Kategorien. Echtes Web-Crawling aller Kategorieseiten mit Detail-Scraping.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Kurzwaffen", "Langwaffen", "Ordonnanz", "Luftdruck", "Optik", "Munition", "Messer", "Wiederladen", "Jagd", "Verschiedenes", "Selbstverteidigung"].map((cat) => (
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
                  Daten aus dem eingebetteten SvelteKit-JSON extrahiert.
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
