"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  StopCircle,
} from "lucide-react";

interface CrawlStep {
  id: string;
  label: string;
}

interface CrawlerState {
  status: string;
  started_at: string | null;
  stopped_at: string | null;
  current_source: string | null;
  current_category: string | null;
  processed_count: number;
  created_count: number;
  updated_count: number;
  unchanged_count: number;
}

interface CrawlStatus {
  lastCrawl: string | null;
  count: number;
  autoCrawlEnabled: boolean;
  autoCrawlTime: string;
  crawlerState?: CrawlerState;
  steps: CrawlStep[];
}

interface StepResult {
  id: string;
  label: string;
  inserted: number;
  updated: number;
  unchanged: number;
  deleted: number;
  status: "pending" | "running" | "done" | "error";
  error?: string;
}

type BadgeStatus = "idle" | "running" | "stopping" | "stopped";

function StatusBadge({ status }: { status: BadgeStatus }) {
  const config: Record<BadgeStatus, { label: string; dot: string; bg: string; text: string }> = {
    idle:     { label: "Idle",     dot: "bg-gray-400",   bg: "bg-gray-100",   text: "text-gray-600" },
    running:  { label: "Running",  dot: "bg-green-500 animate-pulse", bg: "bg-green-50", text: "text-green-700" },
    stopping: { label: "Stopping", dot: "bg-orange-500 animate-pulse", bg: "bg-orange-50", text: "text-orange-700" },
    stopped:  { label: "Stopped",  dot: "bg-red-500",   bg: "bg-red-50",     text: "text-red-700" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`h-2 w-2 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export default function CrawlingPage() {
  const [status, setStatus] = useState<CrawlStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [crawling, setCrawling] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);
  const [, setCurrentStepIdx] = useState(-1);
  const stopRef = useRef(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/crawl");
      const data = await res.json();
      setStatus(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Auto-refresh: 5s when running, 30s when idle
  useEffect(() => {
    const cs = status?.crawlerState;
    const interval = cs?.status === "running" || crawling ? 5000 : 30000;
    const id = setInterval(fetchStatus, interval);
    return () => clearInterval(id);
  }, [status?.crawlerState?.status, crawling, fetchStatus]);

  async function handleStop() {
    setStopping(true);
    stopRef.current = true;
    try {
      await fetch("/api/admin/crawl", { method: "DELETE" });
    } catch {
      // ignore
    }
  }

  async function handleCrawl() {
    if (!status?.steps) return;
    setCrawling(true);
    setStopping(false);
    stopRef.current = false;
    setCurrentStepIdx(0);

    const results: StepResult[] = status.steps.map((s) => ({
      id: s.id,
      label: s.label,
      inserted: 0,
      updated: 0,
      unchanged: 0,
      deleted: 0,
      status: "pending",
    }));
    setStepResults(results);

    for (let i = 0; i < status.steps.length; i++) {
      if (stopRef.current) {
        for (let j = i; j < results.length; j++) {
          results[j].status = "error";
          results[j].error = "Abgebrochen";
        }
        setStepResults([...results]);
        break;
      }

      const step = status.steps[i];
      setCurrentStepIdx(i);

      results[i].status = "running";
      setStepResults([...results]);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 290000);
        const res = await fetch("/api/admin/crawl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: step.id }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        const data = await res.json();

        if (res.ok && data.success) {
          results[i].status = "done";
          results[i].inserted = data.inserted || 0;
          results[i].updated = data.updated || 0;
          results[i].unchanged = data.unchanged || 0;
          results[i].deleted = data.deleted || 0;
        } else {
          results[i].status = "error";
          results[i].error = data.error || "Unbekannter Fehler";
        }
      } catch (err) {
        results[i].status = "error";
        results[i].error = `Netzwerkfehler: ${err instanceof Error ? err.message : String(err)}`;
      }

      setStepResults([...results]);
    }

    setCurrentStepIdx(-1);
    setCrawling(false);
    setStopping(false);
    stopRef.current = false;
    fetchStatus();
  }

  const totalInserted = stepResults.reduce((s, r) => s + r.inserted, 0);
  const totalUpdated = stepResults.reduce((s, r) => s + r.updated, 0);
  const totalUnchanged = stepResults.reduce((s, r) => s + r.unchanged, 0);
  const totalDeleted = stepResults.reduce((s, r) => s + r.deleted, 0);
  const doneSteps = stepResults.filter((r) => r.status === "done").length;
  const errorSteps = stepResults.filter((r) => r.status === "error").length;
  const allDone = stepResults.length > 0 && !crawling;

  // Determine badge status
  const cs = status?.crawlerState;
  const badgeStatus: BadgeStatus =
    stopping || cs?.status === "stopping" ? "stopping"
    : crawling || cs?.status === "running" ? "running"
    : cs?.status === "stopped" ? "stopped"
    : "idle";

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
        <div className="flex items-center gap-3 mb-1">
          <RefreshCw size={20} className="text-red-600" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
            Crawling
          </h1>
          <StatusBadge status={badgeStatus} />
        </div>
        <p className="text-sm text-neutral-500">
          Inserate von gebrauchtwaffen.com und nextgun.ch importieren
        </p>
      </div>

      {/* Verification Link */}
      <a
        href="/admin/crawling/verifikation"
        className="flex items-center gap-3 mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
      >
        <AlertTriangle size={18} className="text-amber-600 shrink-0" />
        <div>
          <div className="text-sm font-medium text-amber-800">Kategorie-Verifikation</div>
          <div className="text-xs text-amber-600">Listings mit unsicherer Kategorisierung pruefen</div>
        </div>
      </a>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Manual Crawl Card */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Manuelles Crawling</h2>
          </div>
          <div className="p-5">
            <p className="mb-4 text-sm text-neutral-600">
              Crawlt alle Kategorien von gebrauchtwaffen.com und nextgun.ch Schritt für Schritt.
              Smart Upsert: Preisänderungen und neue Bilder werden erkannt und aktualisiert.
            </p>

            {/* Buttons */}
            <button
              onClick={handleCrawl}
              disabled={crawling || badgeStatus === "running"}
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                crawling || badgeStatus === "running"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {crawling ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Crawling läuft... ({doneSteps}/{stepResults.length})
                </>
              ) : badgeStatus === "running" ? (
                "Crawling läuft..."
              ) : (
                <>
                  <RefreshCw size={18} />
                  Jetzt crawlen
                </>
              )}
            </button>

            {(crawling || badgeStatus === "running") && (
              <button
                onClick={handleStop}
                disabled={stopping}
                className="flex w-full items-center justify-center gap-2 mt-2 rounded-lg border border-red-300 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                <StopCircle size={16} />
                {stopping ? "Wird gestoppt..." : "Crawling stoppen"}
              </button>
            )}

            {/* Live progress from crawler_state (when cron or another tab started the crawl) */}
            {badgeStatus === "running" && cs && !crawling && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium text-green-700">Crawling aktiv</span>
                </div>
                <div className="text-gray-600">
                  {cs.current_source}{cs.current_category && cs.current_category !== cs.current_source ? ` → ${cs.current_category}` : ""}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-semibold text-green-600">{cs.created_count}</div>
                    <div className="text-xs text-gray-400">Neu</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-600">{cs.updated_count}</div>
                    <div className="text-xs text-gray-400">Aktualisiert</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600">{cs.unchanged_count}</div>
                    <div className="text-xs text-gray-400">Unverändert</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-step progress (local manual crawl) */}
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
                        <span>
                          +{r.inserted} · ~{r.updated} · ={r.unchanged}{r.deleted > 0 ? ` · -${r.deleted}` : ""}
                        </span>
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
                    {totalInserted} neu, {totalUpdated} aktualisiert, {totalUnchanged} unverändert, {totalDeleted} entfernt.
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
            {/* Live crawler state */}
            {cs && cs.status !== "idle" && (
              <div className={`flex items-center gap-3 rounded-lg p-4 ${
                cs.status === "running" ? "bg-green-50" : cs.status === "stopped" ? "bg-red-50" : "bg-gray-50"
              }`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  cs.status === "running" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {cs.status === "running" ? (
                    <Loader2 size={20} className="animate-spin text-green-600" />
                  ) : (
                    <StopCircle size={20} className="text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-brand-dark">
                      {cs.current_source || (cs.status === "running" ? "Startet..." : "Beendet")}
                    </p>
                    {cs.processed_count > 0 && (
                      <span className="text-xs text-neutral-400">— {cs.processed_count} verarbeitet</span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    <span className="text-green-600 font-medium">{cs.created_count} neu</span>
                    <span className="text-blue-600 font-medium">{cs.updated_count} aktualisiert</span>
                    <span className="text-neutral-500">{cs.unchanged_count} unverändert</span>
                  </div>
                </div>
              </div>
            )}

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
                  Auto-Crawling: täglich 01:00–03:00 Uhr CET
                </p>
                <p className="text-xs text-neutral-500">
                  Vercel Cron um Mitternacht UTC + zufällige Verzögerung 0–120 Min
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
                  11 Kategorien. Web-Crawling aller Kategorieseiten mit Detail-Scraping.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Kurzwaffen", "Langwaffen", "Ordonnanz", "Luftdruck", "Optik", "Messer", "Wiederladen", "Bogenschiessen", "Jagd", "Verschiedenes", "Selbstverteidigung"].map((cat) => (
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
