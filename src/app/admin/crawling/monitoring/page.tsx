"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  Image,
  Tag,
  ExternalLink,
  Zap,
} from "lucide-react";

interface CrawlerRun {
  id: string;
  started_at: string;
  completed_at: string | null;
  step: string;
  source: string;
  status: "running" | "completed" | "failed";
  total_scraped: number;
  new_listings: number;
  updated_listings: number;
  removed_listings: number;
  unchanged_listings: number;
  image_errors: number;
  mapping_errors: number;
  parse_errors: number;
  new_listing_ids: string;
  removed_listing_ids: string;
  mapping_issues: string;
  image_issues: string;
  error_log: string;
  duration_ms: number | null;
  pages_crawled: number;
}

interface DashboardData {
  runs: CrawlerRun[];
  summary: {
    weekNewListings: number;
    weekRemovedListings: number;
    weekRunCount: number;
    avgDurationMs: number;
  };
  sourceHealth: { source: string; last_success: string; last_status: string }[];
  health: {
    mappingCoverage: number;
    mappingTotal: number;
    mappingFallback: number;
    imageCoverage: number;
    imageTotal: number;
    imageWithImages: number;
  };
}

function StatusPill({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    completed: { bg: "bg-green-50", text: "text-green-700", label: "OK" },
    failed: { bg: "bg-red-50", text: "text-red-700", label: "Fehler" },
    running: { bg: "bg-blue-50", text: "text-blue-700", label: "Läuft" },
  };
  const c = config[status] || config.completed;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.bg} ${c.text}`}>
      {status === "running" && <Loader2 size={10} className="animate-spin" />}
      {status === "completed" && <CheckCircle size={10} />}
      {status === "failed" && <XCircle size={10} />}
      {c.label}
    </span>
  );
}

function formatDuration(ms: number | null): string {
  if (!ms) return "—";
  if (ms < 1000) return `${ms}ms`;
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return `${min}m ${s}s`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeSince(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours > 24) return `vor ${Math.floor(hours / 24)}d`;
  if (hours > 0) return `vor ${hours}h ${minutes}m`;
  return `vor ${minutes}m`;
}

function issueCount(run: CrawlerRun): number {
  return run.image_errors + run.mapping_errors + run.parse_errors;
}

function RunDetail({ run }: { run: CrawlerRun }) {
  const newIds: string[] = safeJson(run.new_listing_ids);
  const removedIds: string[] = safeJson(run.removed_listing_ids);
  const mappingIssues: { field?: string; value?: string; listingId?: string }[] = safeJson(run.mapping_issues);
  const imageIssues: { listingId?: string; url?: string; error?: string }[] = safeJson(run.image_issues);
  const errorLog: string[] = safeJson(run.error_log);

  const hasDetails = newIds.length > 0 || removedIds.length > 0 || mappingIssues.length > 0 || imageIssues.length > 0 || errorLog.length > 0;

  if (!hasDetails) {
    return <p className="px-4 py-3 text-xs text-gray-400 italic">Keine Details verfügbar.</p>;
  }

  return (
    <div className="space-y-3 px-4 py-3">
      {/* New listings */}
      {newIds.length > 0 && (
        <div>
          <h4 className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-green-700">
            <Plus size={12} /> {newIds.length} neue Inserate
          </h4>
          <div className="flex flex-wrap gap-1">
            {newIds.slice(0, 20).map((id) => (
              <a
                key={id}
                href={`/inserat/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] text-green-600 hover:bg-green-100 hover:underline"
              >
                {id.slice(0, 8)}… <ExternalLink size={8} className="inline" />
              </a>
            ))}
            {newIds.length > 20 && (
              <span className="px-1.5 py-0.5 text-[10px] text-gray-400">+{newIds.length - 20} weitere</span>
            )}
          </div>
        </div>
      )}

      {/* Removed listings */}
      {removedIds.length > 0 && (
        <div>
          <h4 className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-700">
            <Minus size={12} /> {removedIds.length} entfernte Inserate
          </h4>
          <div className="flex flex-wrap gap-1">
            {removedIds.slice(0, 20).map((id) => (
              <span key={id} className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] text-red-600">
                {id.slice(0, 8)}…
              </span>
            ))}
            {removedIds.length > 20 && (
              <span className="px-1.5 py-0.5 text-[10px] text-gray-400">+{removedIds.length - 20} weitere</span>
            )}
          </div>
        </div>
      )}

      {/* Mapping issues */}
      {mappingIssues.length > 0 && (
        <div>
          <h4 className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <Tag size={12} /> {mappingIssues.length} Mapping-Probleme
          </h4>
          <div className="space-y-0.5">
            {mappingIssues.slice(0, 10).map((issue, i) => (
              <p key={i} className="text-[10px] text-amber-600">
                {issue.field}: &quot;{issue.value}&quot; → kein Mapping{issue.listingId ? ` (${issue.listingId.slice(0, 8)}…)` : ""}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Image issues */}
      {imageIssues.length > 0 && (
        <div>
          <h4 className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-orange-700">
            <Image size={12} /> {imageIssues.length} Bild-Fehler
          </h4>
          <div className="space-y-0.5">
            {imageIssues.slice(0, 10).map((issue, i) => (
              <p key={i} className="truncate text-[10px] text-orange-600">
                {issue.url || "unbekannte URL"}: {issue.error || "Fehler"}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Error log */}
      {errorLog.length > 0 && (
        <div>
          <h4 className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-700">
            <XCircle size={12} /> Fehler-Log
          </h4>
          <div className="rounded bg-red-50 p-2">
            {errorLog.map((err, i) => (
              <p key={i} className="text-[10px] font-mono text-red-700 break-all">{err}</p>
            ))}
          </div>
        </div>
      )}

      {/* Run metadata */}
      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-2 text-[10px] text-gray-400">
        {run.pages_crawled > 0 && <span>Seiten: {run.pages_crawled}</span>}
        {run.total_scraped > 0 && <span>Total gescraped: {run.total_scraped}</span>}
        <span>Dauer: {formatDuration(run.duration_ms)}</span>
        <span>ID: {run.id.slice(0, 8)}</span>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeJson<T = any>(val: string | null | undefined): T[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export default function MonitoringPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedRun, setExpandedRun] = useState<string | null>(null);
  const [triggeringStep, setTriggeringStep] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/crawler-runs");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 15s
  useEffect(() => {
    const id = setInterval(fetchData, 15000);
    return () => clearInterval(id);
  }, [fetchData]);

  async function handleTrigger(stepId: string) {
    setTriggeringStep(stepId);
    try {
      await fetch("/api/admin/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: stepId }),
      });
      await fetchData();
    } catch {
      // ignore
    } finally {
      setTriggeringStep(null);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-red-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-neutral-500">Daten konnten nicht geladen werden.</div>
    );
  }

  const lastRun = data.runs[0];

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/crawling"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <ArrowLeft size={18} />
        </Link>
        <Activity size={20} className="text-red-600" />
        <div>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
            Crawler Monitoring
          </h1>
          <p className="text-sm text-neutral-500">Crawler-Läufe, Statistiken und Health-Indikatoren</p>
        </div>
        <button
          onClick={fetchData}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50"
        >
          <RefreshCw size={12} />
          Aktualisieren
        </button>
      </div>

      {/* A) Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Last run */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
            <Clock size={12} />
            Letzter Lauf
          </div>
          {lastRun ? (
            <>
              <div className="mb-1 text-sm font-semibold text-brand-dark">{formatDate(lastRun.started_at)}</div>
              <div className="flex items-center gap-2">
                <StatusPill status={lastRun.status} />
                <span className="text-[11px] text-gray-400">{timeSince(lastRun.started_at)}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">Keine Läufe</p>
          )}
        </div>

        {/* Week new */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
            <Plus size={12} />
            Diese Woche neu
          </div>
          <div className="text-2xl font-black text-green-600">{data.summary.weekNewListings}</div>
          <div className="text-[11px] text-gray-400">Inserate hinzugefügt</div>
        </div>

        {/* Week removed */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
            <Minus size={12} />
            Diese Woche entfernt
          </div>
          <div className="text-2xl font-black text-red-600">{data.summary.weekRemovedListings}</div>
          <div className="text-[11px] text-gray-400">Inserate deaktiviert</div>
        </div>

        {/* Avg duration */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
            <Zap size={12} />
            Ø Dauer
          </div>
          <div className="text-2xl font-black text-brand-dark">{formatDuration(data.summary.avgDurationMs)}</div>
          <div className="text-[11px] text-gray-400">{data.summary.weekRunCount} Läufe diese Woche</div>
        </div>
      </div>

      {/* E) Health Indicators */}
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {/* Mapping coverage */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Tag size={14} className="text-amber-500" />
            <span className="text-sm font-semibold text-brand-dark">Mapping-Abdeckung</span>
          </div>
          <div className="mb-1 flex items-baseline gap-1">
            <span className={`text-2xl font-black ${data.health.mappingCoverage >= 95 ? "text-green-600" : data.health.mappingCoverage >= 80 ? "text-amber-600" : "text-red-600"}`}>
              {data.health.mappingCoverage}%
            </span>
            <span className="text-xs text-gray-400">kategorisiert</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div className={`h-full rounded-full ${data.health.mappingCoverage >= 95 ? "bg-green-500" : data.health.mappingCoverage >= 80 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${data.health.mappingCoverage}%` }} />
          </div>
          <p className="mt-1 text-[10px] text-gray-400">{data.health.mappingFallback} unsicher von {data.health.mappingTotal}</p>
        </div>

        {/* Image coverage */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Image size={14} className="text-blue-500" />
            <span className="text-sm font-semibold text-brand-dark">Bild-Abdeckung</span>
          </div>
          <div className="mb-1 flex items-baseline gap-1">
            <span className={`text-2xl font-black ${data.health.imageCoverage >= 90 ? "text-green-600" : data.health.imageCoverage >= 70 ? "text-amber-600" : "text-red-600"}`}>
              {data.health.imageCoverage}%
            </span>
            <span className="text-xs text-gray-400">mit Bildern</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div className={`h-full rounded-full ${data.health.imageCoverage >= 90 ? "bg-green-500" : data.health.imageCoverage >= 70 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${data.health.imageCoverage}%` }} />
          </div>
          <p className="mt-1 text-[10px] text-gray-400">{data.health.imageWithImages} von {data.health.imageTotal} Inseraten</p>
        </div>

        {/* Source health */}
        <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-sm font-semibold text-brand-dark">Quellen-Status</span>
          </div>
          <div className="space-y-2">
            {data.sourceHealth.length > 0 ? data.sourceHealth.map((sh) => (
              <div key={sh.source} className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">{sh.source}</span>
                <span className="text-[10px] text-gray-400">{timeSince(sh.last_success)}</span>
              </div>
            )) : (
              <p className="text-xs text-gray-400">Keine Daten</p>
            )}
          </div>
        </div>
      </div>

      {/* D) Manual Trigger */}
      <div className="mb-6 rounded-xl border border-brand-border bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-brand-dark">Einzelnen Step auslösen</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "gw-kurzwaffen", label: "Kurzwaffen" },
            { id: "gw-langwaffen", label: "Langwaffen" },
            { id: "nextgun", label: "NextGun" },
            { id: "cleanup", label: "Cleanup" },
          ].map((step) => (
            <button
              key={step.id}
              onClick={() => handleTrigger(step.id)}
              disabled={triggeringStep !== null}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              {triggeringStep === step.id ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* B) Runs Table */}
      <div className="rounded-xl border border-brand-border bg-white shadow-sm">
        <div className="border-b border-brand-border px-5 py-4">
          <h2 className="font-display text-lg font-bold text-brand-dark">Crawler-Läufe</h2>
          <p className="text-xs text-gray-400">Letzte 50 Läufe</p>
        </div>

        {/* Table header */}
        <div className="hidden border-b border-gray-100 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 md:grid md:grid-cols-[1fr_80px_120px_70px_60px_60px_60px_60px_80px_60px]">
          <span>Zeitpunkt</span>
          <span>Step</span>
          <span>Quelle</span>
          <span>Status</span>
          <span className="text-right">Gescraped</span>
          <span className="text-right text-green-600">Neu</span>
          <span className="text-right text-blue-600">Update</span>
          <span className="text-right text-red-600">Entfernt</span>
          <span className="text-right">Dauer</span>
          <span className="text-right">Issues</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {data.runs.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-400">Noch keine Crawler-Läufe aufgezeichnet.</div>
          )}
          {data.runs.map((run) => {
            const issues = issueCount(run);
            const isExpanded = expandedRun === run.id;
            const rowColor =
              run.status === "failed" ? "bg-red-50/50"
              : issues > 0 ? "bg-amber-50/30"
              : "";

            return (
              <div key={run.id} className={rowColor}>
                <button
                  onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                  className="w-full px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                >
                  {/* Mobile layout */}
                  <div className="flex items-center justify-between md:hidden">
                    <div className="flex items-center gap-2">
                      {isExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                      <div>
                        <div className="text-xs font-medium text-gray-700">{run.step}</div>
                        <div className="text-[10px] text-gray-400">{formatDate(run.started_at)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {run.new_listings > 0 && <span className="text-[10px] font-semibold text-green-600">+{run.new_listings}</span>}
                      <StatusPill status={run.status} />
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_80px_120px_70px_60px_60px_60px_60px_80px_60px] md:items-center">
                    <div className="flex items-center gap-2">
                      {isExpanded ? <ChevronDown size={12} className="text-gray-400" /> : <ChevronRight size={12} className="text-gray-400" />}
                      <span className="text-xs text-gray-700">{formatDate(run.started_at)}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{run.step.replace("gw-", "")}</span>
                    <span className="text-xs text-gray-500">{run.source}</span>
                    <StatusPill status={run.status} />
                    <span className="text-right text-xs text-gray-600">{run.total_scraped || "—"}</span>
                    <span className={`text-right text-xs font-medium ${run.new_listings > 0 ? "text-green-600" : "text-gray-300"}`}>
                      {run.new_listings > 0 ? `+${run.new_listings}` : "0"}
                    </span>
                    <span className={`text-right text-xs ${run.updated_listings > 0 ? "text-blue-600" : "text-gray-300"}`}>
                      {run.updated_listings || "0"}
                    </span>
                    <span className={`text-right text-xs ${run.removed_listings > 0 ? "text-red-600" : "text-gray-300"}`}>
                      {run.removed_listings > 0 ? `-${run.removed_listings}` : "0"}
                    </span>
                    <span className="text-right text-xs text-gray-500">{formatDuration(run.duration_ms)}</span>
                    <span className={`text-right text-xs ${issues > 0 ? "font-medium text-amber-600" : "text-gray-300"}`}>
                      {issues > 0 ? (
                        <span className="flex items-center justify-end gap-0.5">
                          <AlertTriangle size={10} /> {issues}
                        </span>
                      ) : "—"}
                    </span>
                  </div>
                </button>

                {/* C) Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50">
                    <RunDetail run={run} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
