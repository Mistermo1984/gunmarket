"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart3, TrendingUp, Clock, ExternalLink, ChevronRight } from "lucide-react";
import PriceDistributionChart from "@/components/markt/PriceDistributionChart";
import BrandMedianTable from "@/components/markt/BrandMedianTable";
import PreisfinderWidget from "@/components/markt/PreisfinderWidget";

// ─── Types ──────────────────────────────────────────────────────

interface MarketData {
  overview: {
    total: number;
    avgPreis: number;
    medianPreis: number;
    todayNew: number;
    weekNew: number;
    topKategorie: string;
    topKategoriePct: number;
    topKaliber: string;
    topKanton: string;
    topKantonCount: number;
  };
  avgByCategory: { hauptkategorie: string; avg_preis: number; count: number }[];
  medianByCategory: { hauptkategorie: string; median: number; count: number }[];
  byZustand: { zustand: string; count: number }[];
  byRechtsstatus: { rechtsstatus: string; count: number }[];
  topMarken: { marke: string; count: number }[];
  topKaliber: { kaliber: string; count: number }[];
  byKanton: { kanton: string; count: number }[];
  cheapestPerCategory: {
    id: string; titel: string; preis: number; hauptkategorie: string; image_url: string | null;
  }[];
  ordonnanzData: { name: string; count: number; median: number }[];
}

// ─── Label Maps ─────────────────────────────────────────────────

const KATEGORIE_LABELS: Record<string, string> = {
  kurzwaffen: "Kurzwaffen",
  langwaffen: "Langwaffen",
  ordonnanzwaffen: "Ordonnanz",
  luftdruckwaffen: "Luftdruck",
  optik: "Optik",
  munition: "Munition",
  zubehoer: "Zubehör",
  buechsen: "Langwaffen",
  flinten: "Langwaffen",
  jagdwaffen: "Langwaffen",
  "freie-waffen": "Luftdruck",
};

const KATEGORIE_ICONS: Record<string, string> = {
  kurzwaffen: "🔫",
  langwaffen: "🎯",
  ordonnanzwaffen: "🏅",
  luftdruckwaffen: "💨",
  optik: "🔭",
  munition: "🔴",
  zubehoer: "🔧",
};

const RECHTS_LABELS: Record<string, { label: string; color: string }> = {
  frei: { label: "Frei erwerbbar", color: "#4ade80" },
  wes: { label: "WES-pflichtig", color: "#f59e0b" },
  kaufvertrag: { label: "Kaufvertrag", color: "#60a5fa" },
  "abk-klein": { label: "ABK (Klein)", color: "#f87171" },
  "abk-gross": { label: "ABK (Gross)", color: "#ef4444" },
};

const KANTON_ABBREV: Record<string, string> = {
  "Zürich": "ZH", "Bern": "BE", "Luzern": "LU", "Uri": "UR", "Schwyz": "SZ",
  "Obwalden": "OW", "Nidwalden": "NW", "Glarus": "GL", "Zug": "ZG", "Freiburg": "FR",
  "Solothurn": "SO", "Basel-Stadt": "BS", "Basel-Landschaft": "BL", "Schaffhausen": "SH",
  "Appenzell A.": "AR", "Appenzell I.": "AI", "St. Gallen": "SG", "Graubünden": "GR",
  "Aargau": "AG", "Thurgau": "TG", "Tessin": "TI", "Waadt": "VD", "Wallis": "VS",
  "Neuenburg": "NE", "Genf": "GE", "Jura": "JU",
};

// ─── Reusable Components ────────────────────────────────────────

function HBar({ value, max, color = "#4ade80" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.max((value / max) * 100, 2) : 0;
  return (
    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] p-4 md:p-5">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ade80]/60 to-transparent" />
      <div className="absolute -left-2 -top-2 text-3xl opacity-10">{icon}</div>
      <div className="mb-1 text-lg">{icon}</div>
      <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">{label}</p>
      <p className="font-display text-xl font-black text-white md:text-2xl">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-[#86efac]">{sub}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#2d4a2d] bg-[#111f0d] p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-6 w-1 rounded-full bg-[#4d8230]" />
      <span className="text-xl">{icon}</span>
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────

export default function MarktInsightsPage() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [neuHeute, setNeuHeute] = useState<{ id: string; titel: string; preis: number; kanton: string; image_url: string | null; images?: { url: string }[] }[]>([]);
  const [topDeals, setTopDeals] = useState<{ id: string; titel: string; preis: number; kanton: string; image_url: string | null; good_deal_count: number; images?: { url: string }[] }[]>([]);

  useEffect(() => {
    fetch("/api/stats/market")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
    fetch("/api/listings?sort=neueste&limit=6")
      .then((r) => r.json())
      .then((d) => setNeuHeute((d.listings || []).map((l: Record<string, unknown>) => ({
        id: l.id as string, titel: l.titel as string, preis: l.preis as number, kanton: l.kanton as string,
        image_url: (l.image_url as string) || null,
        images: l.images as { url: string }[] | undefined,
      }))))
      .catch(() => {});
    fetch("/api/listings?sort=good_deal&limit=6")
      .then((r) => r.json())
      .then((d) => setTopDeals((d.listings || []).map((l: Record<string, unknown>) => ({
        id: l.id as string, titel: l.titel as string, preis: l.preis as number, kanton: l.kanton as string,
        image_url: (l.image_url as string) || null,
        good_deal_count: (l.good_deal_count as number) || 0,
        images: l.images as { url: string }[] | undefined,
      }))))
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1a0f]">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="flex items-center justify-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4ade80] border-t-transparent" />
            <p className="text-[#9ca3af]">Marktdaten werden geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.overview) {
    return (
      <div className="min-h-screen bg-[#0f1a0f]">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <p className="text-[#9ca3af]">Marktdaten konnten nicht geladen werden.</p>
        </div>
      </div>
    );
  }

  const o = data.overview;
  const byRechtsstatus = data.byRechtsstatus || [];
  const topMarken = data.topMarken || [];
  const topKaliber = data.topKaliber || [];
  const byKanton = data.byKanton || [];
  const medianByCategory = data.medianByCategory || [];
  const ordonnanzData = data.ordonnanzData || [];

  const totalRecht = byRechtsstatus.reduce((s, r) => s + (r.count || 0), 0);
  const maxMarke = topMarken.length > 0 ? Math.max(...topMarken.map((m) => m.count || 0), 1) : 1;
  const maxKanton = byKanton.length > 0 ? Math.max(...byKanton.map((k) => k.count || 0), 1) : 1;

  const today = new Date().toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });

  // Rechtsstatus stacked bar data
  const rechtsItems = byRechtsstatus
    .map((r) => {
      const info = RECHTS_LABELS[r.rechtsstatus] || { label: r.rechtsstatus, color: "#9ca3af" };
      const pct = totalRecht > 0 ? Math.round((r.count / totalRecht) * 100) : 0;
      return { ...info, count: r.count, pct, key: r.rechtsstatus };
    })
    .filter((r) => r.pct > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-[#0f1a0f]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">

        {/* ═══ 1. HERO HEADER ═══ */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#4ade80]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4ade80]">Live Daten</span>
            </div>
            <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              GunMarket <span className="text-[#4ade80]">Insights</span>
            </h1>
            <p className="mt-2 max-w-lg text-sm text-[#9ca3af]">
              Preisanalysen, Trends und Marktdaten — was ist meine Waffe wert?
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#2d4a2d] bg-[#1a2e1a] px-4 py-2.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
            <span className="text-xs text-[#9ca3af]">Aktualisiert: {today}</span>
          </div>
        </div>

        {/* ═══ 1b. STAT CARDS ═══ */}
        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          <StatCard icon="📋" label="Aktive Inserate" value={o.total.toLocaleString("de-CH")} />
          <StatCard icon="💰" label="Ø Preis" value={`CHF ${o.avgPreis.toLocaleString("de-CH")}`} sub={`Median: CHF ${o.medianPreis.toLocaleString("de-CH")}`} />
          <StatCard icon="🔫" label="Top Kategorie" value={KATEGORIE_LABELS[o.topKategorie] || o.topKategorie} sub={o.topKategoriePct > 0 ? `${o.topKategoriePct}% aller Inserate` : undefined} />
          <StatCard icon="📍" label="Top Kanton" value={o.topKanton || "—"} sub={o.topKantonCount > 0 ? `${o.topKantonCount} Inserate` : undefined} />
          <div className="relative overflow-hidden rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] p-4 md:p-5">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ade80]/60 to-transparent" />
            <div className="mb-1 flex items-center gap-1.5 text-lg">
              ✨ <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
            </div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              {o.todayNew > 0 ? "Heute neu" : "Diese Woche"}
            </p>
            <p className="font-display text-xl font-black text-white md:text-2xl">
              {o.todayNew > 0 ? o.todayNew : o.weekNew || 0}
            </p>
            <p className="mt-0.5 text-[11px] text-[#86efac]">
              {o.todayNew > 0 ? "in den letzten 24h" : "letzte 7 Tage"}
            </p>
          </div>
        </div>

        {/* ═══ 2. HEUTE NEU EINGETROFFEN ═══ */}
        {neuHeute.length > 0 && (
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#7dc855]" />
                Heute neu eingetroffen
                <span className="ml-1 text-sm font-normal text-[#9ca3af]">{neuHeute.length} Inserate</span>
              </h2>
              <Link href="/?sort=neueste" className="text-sm text-[#4ade80] hover:underline">Alle neuen →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {neuHeute.map((listing) => {
                const imgUrl = listing.images?.[0]?.url || listing.image_url;
                return (
                  <Link key={listing.id} href={`/inserat/${listing.id}`}
                    className="group overflow-hidden rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] transition-all hover:border-[#4ade80]/50">
                    <div className="relative aspect-square overflow-hidden bg-[#0f1a0f]">
                      {imgUrl ? (
                        <img src={imgUrl} alt={listing.titel} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#2d4a2d]"><BarChart3 size={24} /></div>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="truncate text-xs leading-tight text-[#9ca3af]">{listing.titel?.substring(0, 30)}</div>
                      <div className="mt-0.5 text-sm font-bold text-[#4ade80]">CHF {listing.preis?.toLocaleString("de-CH")}</div>
                      {listing.kanton && <div className="mt-0.5 text-[10px] text-[#6b7280]">{listing.kanton}</div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ 3. PREISFINDER (prominent, full width) ═══ */}
        <div className="mb-10">
          <PreisfinderWidget />
        </div>

        {/* ═══ 4. SCHWEIZER ORDONNANZ-SPOTLIGHT ═══ */}
        {ordonnanzData.some((m) => m.count > 0) && (
          <div className="mb-10">
            <Card>
              <SectionHeader icon="🇨🇭" title="Schweizer Ordonnanz-Markt" subtitle="Preise für klassische Schweizer Militärwaffen" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {ordonnanzData.map((m) => (
                  <Link
                    key={m.name}
                    href={`/?suche=${encodeURIComponent(m.name)}`}
                    className="group rounded-xl bg-[#1a2e12] p-3 text-center transition-colors hover:bg-[#2d4a20]"
                  >
                    <p className="mb-1 text-sm font-bold text-white transition-colors group-hover:text-[#7dc855]">{m.name}</p>
                    {m.count > 0 ? (
                      <>
                        <p className="text-lg font-black text-[#7dc855]">CHF {m.median.toLocaleString("de-CH")}</p>
                        <p className="text-[10px] text-gray-600">{m.count} Inserate</p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-600">Keine Inserate</p>
                    )}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ═══ 5. MEDIANPREIS NACH KATEGORIE ═══ */}
        {medianByCategory.length > 0 && (
          <div className="mb-10">
            <Card>
              <SectionHeader icon="📊" title="Medianpreis nach Kategorie" subtitle="Typischer Preis pro Waffenkategorie" />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {medianByCategory.map((cat) => (
                  <Link
                    key={cat.hauptkategorie}
                    href={`/?kategorie=${encodeURIComponent(cat.hauptkategorie)}`}
                    className="group rounded-xl border border-[#4d8230]/20 bg-[#1a2e12] p-4 transition-all hover:border-[#4d8230]"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xl">{KATEGORIE_ICONS[cat.hauptkategorie] || "📦"}</span>
                      <span className="text-xs font-semibold text-gray-400 transition-colors group-hover:text-white">
                        {KATEGORIE_LABELS[cat.hauptkategorie] || cat.hauptkategorie}
                      </span>
                    </div>
                    <p className="mb-0.5 text-xl font-black text-white">
                      CHF {cat.median.toLocaleString("de-CH")}
                    </p>
                    <p className="text-[10px] text-gray-600">Median · {cat.count} Inserate</p>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ═══ 6. PREISVERTEILUNG + KANTON ═══ */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <PriceDistributionChart />

          {/* Kanton Chart */}
          <Card>
            <SectionHeader icon="📍" title="Inserate nach Kanton" subtitle={`Top ${Math.min(byKanton.length, 10)} Kantone`} />
            <div className="space-y-2.5">
              {byKanton.slice(0, 10).map((k, i) => {
                const abbrev = KANTON_ABBREV[k.kanton] || k.kanton.slice(0, 2).toUpperCase();
                return (
                  <Link
                    key={k.kanton}
                    href={`/?kanton=${encodeURIComponent(abbrev)}`}
                    className="group flex items-center gap-3"
                  >
                    <span className="w-4 shrink-0 text-[11px] text-gray-600">{i + 1}</span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#4d8230]/20 bg-[#1a2e12] transition-colors group-hover:border-[#4d8230]">
                      <span className="text-[10px] font-bold text-[#7dc855]">{abbrev}</span>
                    </div>
                    <span className="w-20 shrink-0 text-sm text-gray-300 transition-colors group-hover:text-white">{k.kanton}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded-full bg-[#0f1a0a]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(k.count / maxKanton) * 100}%`, background: "linear-gradient(90deg, #2d5a1b, #7dc855)" }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-sm font-semibold text-[#7dc855]">{k.count}</span>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ 7. TOP MARKEN + RECHTSSTATUS ═══ */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          {/* Top Marken */}
          <Card>
            <SectionHeader icon="🏷️" title="Top 10 Marken" subtitle="Nach Anzahl Inserate" />
            <div className="space-y-3">
              {topMarken.map((m, i) => (
                <Link
                  key={m.marke}
                  href={`/?suche=${encodeURIComponent(m.marke)}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                >
                  <span className="w-5 shrink-0 font-mono text-xs text-[#4ade80]">{i + 1}</span>
                  <span className="w-28 shrink-0 text-sm font-medium text-white transition-colors group-hover:text-[#4ade80]">{m.marke}</span>
                  <HBar value={m.count} max={maxMarke} />
                  <span className="w-12 shrink-0 text-right font-mono text-sm text-[#86efac]">{m.count}</span>
                  <ExternalLink size={12} className="shrink-0 text-[#2d4a2d] transition-colors group-hover:text-[#4ade80]" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Rechtsstatus — stacked bar */}
          <Card>
            <SectionHeader icon="⚖️" title="Rechtsstatus" subtitle="Verteilung nach Erwerbsart" />

            {/* Stacked 100% bar */}
            <div className="mb-5 flex h-10 gap-0.5 overflow-hidden rounded-xl">
              {rechtsItems.map((r) => (
                <div
                  key={r.key}
                  className="flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    width: `${Math.max(r.pct, 2)}%`,
                    backgroundColor: r.color,
                    color: r.color === "#f59e0b" || r.color === "#fbbf24" ? "#000" : "#fff",
                  }}
                >
                  {r.pct >= 8 ? `${r.pct}%` : ""}
                </div>
              ))}
            </div>

            {/* Legend grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {rechtsItems.map((r) => (
                <div key={r.key} className="text-center">
                  <div className="mx-auto mb-1 h-3 w-3 rounded-sm" style={{ backgroundColor: r.color }} />
                  <p className="text-sm font-semibold text-white">{r.count.toLocaleString("de-CH")}</p>
                  <p className="text-[10px] text-gray-500">{r.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ═══ 8. BRAND MEDIAN TABLE ═══ */}
        <div className="mb-10">
          <BrandMedianTable />
        </div>

        {/* ═══ 9. COMMUNITY TOP-DEALS or CTA ═══ */}
        <div className="mb-10">
          {topDeals.filter((l) => l.good_deal_count > 0).length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👍</span>
                  <div>
                    <h2 className="text-lg font-bold text-white">Community Top-Deals</h2>
                    <p className="text-xs text-[#9ca3af]">Von der Community als gutes Angebot bewertet</p>
                  </div>
                </div>
                <Link href="/?sort=good_deal" className="text-sm text-[#7dc855] hover:underline">Alle ansehen →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {topDeals.filter((l) => l.good_deal_count > 0).map((listing) => {
                  const imgUrl = listing.images?.[0]?.url || listing.image_url;
                  return (
                    <Link key={listing.id} href={`/inserat/${listing.id}`}
                      className="group overflow-hidden rounded-2xl border border-[#4d8230]/20 bg-[#1a2e12] transition-all hover:border-[#4d8230]">
                      <div className="relative aspect-square overflow-hidden bg-[#0f1f0a]">
                        {imgUrl ? (
                          <img src={imgUrl} alt={listing.titel} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#4d8230] opacity-30"><BarChart3 size={32} /></div>
                        )}
                        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#4d8230] px-2 py-1 text-[10px] font-bold text-white">
                          👍 {listing.good_deal_count}
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="mb-1 truncate text-xs font-medium leading-tight text-white">{listing.titel}</p>
                        <p className="text-sm font-bold text-[#7dc855]">CHF {listing.preis?.toLocaleString("de-CH")}</p>
                        {listing.kanton && <p className="mt-0.5 text-[10px] text-[#6b7280]">{listing.kanton}</p>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <Card className="text-center">
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="text-4xl">👍</div>
                <h3 className="text-lg font-bold text-white">Bewerte Inserate als &quot;Gutes Angebot&quot;</h3>
                <p className="max-w-md text-sm text-[#9ca3af]">
                  Hilf der Community — besuche Inserate und markiere faire Preise.
                  Die besten Deals erscheinen dann hier.
                </p>
                <Link href="/" className="mt-2 text-sm font-medium text-[#7dc855] hover:underline">
                  Inserate durchsuchen →
                </Link>
              </div>
            </Card>
          )}
        </div>

        {/* ═══ 10. COMING SOON ═══ */}
        <Card className="text-center">
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2d4a2d] bg-[#0f1a0f]">
              <TrendingUp className="h-6 w-6 text-[#4ade80]" />
            </div>
            <h3 className="font-display text-lg font-bold uppercase text-white">Preisverlauf — Demnächst</h3>
            <p className="max-w-md text-sm text-[#9ca3af]">
              Preistrends werden verfügbar, sobald genügend historische Daten gesammelt wurden.
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <Clock size={14} className="text-[#4ade80]" />
              <span className="text-xs font-medium text-[#4ade80]">In Entwicklung</span>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
