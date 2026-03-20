"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart3, TrendingUp, Clock, ExternalLink } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────

interface MarketData {
  overview: {
    total: number;
    avgPreis: number;
    todayNew: number;
    topKategorie: string;
    topKaliber: string;
  };
  avgByCategory: { hauptkategorie: string; avg_preis: number; count: number }[];
  byZustand: { zustand: string; count: number }[];
  priceRanges: { range_label: string; count: number }[];
  byRechtsstatus: { rechtsstatus: string; count: number }[];
  topMarken: { marke: string; count: number }[];
  topKaliber: { kaliber: string; count: number }[];
  byKanton: { kanton: string; count: number }[];
  cheapestPerCategory: {
    id: string; titel: string; preis: number; hauptkategorie: string; image_url: string | null;
  }[];
}

// ─── Label Maps ─────────────────────────────────────────────────

const KATEGORIE_LABELS: Record<string, string> = {
  kurzwaffen: "Kurzwaffen",
  buechsen: "Büchsen",
  flinten: "Flinten",
  jagdwaffen: "Jagdwaffen",
  ordonnanzwaffen: "Ordonnanz",
  "freie-waffen": "Freie Waffen",
  optik: "Optik",
  munition: "Munition",
  zubehoer: "Zubehör",
};

const ZUSTAND_LABELS: Record<string, string> = {
  neu: "Neu",
  "sehr-gut": "Sehr gut",
  gut: "Gut",
  akzeptabel: "Akzeptabel",
  defekt: "Defekt",
};

const RECHTS_LABELS: Record<string, { label: string; color: string }> = {
  frei: { label: "Frei erwerbbar", color: "#4ade80" },
  wes: { label: "WES-pflichtig", color: "#fbbf24" },
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
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] p-5">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#9ca3af]">{label}</p>
      <p className="font-display text-2xl font-black text-white md:text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-[#86efac]">{sub}</p>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-white md:text-xl">
      <span className="h-5 w-1 rounded-full bg-[#4ade80]" />
      {children}
    </h2>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────

export default function MarktInsightsPage() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats/market")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
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

  const { overview, avgByCategory, byZustand, priceRanges, byRechtsstatus, topMarken, topKaliber, byKanton, cheapestPerCategory } = data;

  const totalZustand = byZustand.reduce((s, z) => s + z.count, 0);
  const totalRecht = byRechtsstatus.reduce((s, r) => s + r.count, 0);
  const maxPrice = Math.max(...priceRanges.map((p) => p.count), 1);
  const maxMarke = Math.max(...topMarken.map((m) => m.count), 1);
  const maxKaliber = Math.max(...topKaliber.map((k) => k.count), 1);
  const maxKanton = Math.max(...byKanton.map((k) => k.count), 1);
  const maxAvgCat = Math.max(...avgByCategory.map((c) => c.avg_preis), 1);

  const today = new Date().toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#0f1a0f]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">

        {/* ═══ HERO HEADER ═══ */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#4ade80]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4ade80]">Live Daten</span>
            </div>
            <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              GunMarket <span className="text-[#4ade80]">Insights</span>
            </h1>
            <p className="mt-2 max-w-lg text-sm text-[#9ca3af]">
              Preisanalysen, Trends und Marktdaten basierend auf unseren Inseraten
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#2d4a2d] bg-[#1a2e1a] px-4 py-2.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
            <span className="text-xs text-[#9ca3af]">Aktualisiert: {today}</span>
          </div>
        </div>

        {/* ═══ SECTION 1: MARKTÜBERSICHT ═══ */}
        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          <StatCard label="Aktive Inserate" value={overview.total.toLocaleString("de-CH")} />
          <StatCard label="Ø Preis" value={`CHF ${overview.avgPreis.toLocaleString("de-CH")}`} />
          <StatCard label="Top Kategorie" value={KATEGORIE_LABELS[overview.topKategorie] || overview.topKategorie} />
          <StatCard label="Top Kaliber" value={overview.topKaliber || "—"} />
          <StatCard label="Heute neu" value={String(overview.todayNew)} sub="in den letzten 24h" />
        </div>

        {/* ═══ SECTION 2: AVG PRICE + ZUSTAND ═══ */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          {/* Left: Average price by category */}
          <Card>
            <SectionTitle>Durchschnittspreis nach Kategorie</SectionTitle>
            <div className="space-y-3">
              {avgByCategory.map((cat) => (
                <div key={cat.hauptkategorie} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs font-medium text-[#9ca3af]">
                    {KATEGORIE_LABELS[cat.hauptkategorie] || cat.hauptkategorie}
                  </span>
                  <HBar value={cat.avg_preis} max={maxAvgCat} />
                  <span className="w-20 shrink-0 text-right font-mono text-sm font-bold text-white">
                    CHF {cat.avg_preis.toLocaleString("de-CH")}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Right: By condition */}
          <Card>
            <SectionTitle>Inserate nach Zustand</SectionTitle>
            <div className="space-y-4">
              {byZustand.map((z) => {
                const pct = totalZustand > 0 ? Math.round((z.count / totalZustand) * 100) : 0;
                return (
                  <div key={z.zustand}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{ZUSTAND_LABELS[z.zustand] || z.zustand}</span>
                      <span className="text-xs text-[#9ca3af]">{z.count.toLocaleString("de-CH")} ({pct}%)</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-[#4ade80] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ SECTION 3: PRICE DISTRIBUTION + LEGAL STATUS ═══ */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          {/* Left: Price distribution */}
          <Card>
            <SectionTitle>Preisverteilung (CHF)</SectionTitle>
            <div className="flex items-end gap-2 pt-4" style={{ height: 200 }}>
              {priceRanges.map((r) => {
                const hPct = maxPrice > 0 ? Math.max((r.count / maxPrice) * 100, 5) : 5;
                return (
                  <div key={r.range_label} className="flex flex-1 flex-col items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{r.count}</span>
                    <div className="w-full overflow-hidden rounded-t-md bg-white/5" style={{ height: `${hPct}%` }}>
                      <div className="h-full w-full rounded-t-md bg-gradient-to-t from-[#166534] to-[#4ade80]" />
                    </div>
                    <span className="text-[10px] leading-tight text-[#9ca3af]">{r.range_label}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Right: Legal status */}
          <Card>
            <SectionTitle>Rechtsstatus</SectionTitle>
            <div className="space-y-5">
              {byRechtsstatus.map((r) => {
                const info = RECHTS_LABELS[r.rechtsstatus] || { label: r.rechtsstatus, color: "#9ca3af" };
                const pct = totalRecht > 0 ? Math.round((r.count / totalRecht) * 100) : 0;
                return (
                  <div key={r.rechtsstatus}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: info.color }} />
                        <span className="text-sm font-semibold text-white">{info.label}</span>
                      </div>
                      <span className="font-mono text-sm text-[#86efac]">{r.count.toLocaleString("de-CH")} <span className="text-[#9ca3af]">({pct}%)</span></span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: info.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ SECTION 4: TOP BRANDS ═══ */}
        <div className="mb-10">
          <Card>
            <SectionTitle>Top 10 Marken</SectionTitle>
            <div className="space-y-3">
              {topMarken.map((m, i) => (
                <Link
                  key={m.marke}
                  href={`/suche?suche=${encodeURIComponent(m.marke)}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                >
                  <span className="w-5 shrink-0 font-mono text-xs text-[#4ade80]">{i + 1}</span>
                  <span className="w-32 shrink-0 text-sm font-medium text-white group-hover:text-[#4ade80] transition-colors">{m.marke}</span>
                  <HBar value={m.count} max={maxMarke} />
                  <span className="w-12 shrink-0 text-right font-mono text-sm text-[#86efac]">{m.count}</span>
                  <ExternalLink size={12} className="shrink-0 text-[#2d4a2d] group-hover:text-[#4ade80] transition-colors" />
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* ═══ SECTION 5: TOP CALIBERS ═══ */}
        <div className="mb-10">
          <Card>
            <SectionTitle>Beliebteste Kaliber</SectionTitle>
            <div className="space-y-3">
              {topKaliber.map((k, i) => (
                <div key={k.kaliber} className="flex items-center gap-3 px-2 py-1.5">
                  <span className="w-5 shrink-0 font-mono text-xs text-[#4ade80]">{i + 1}</span>
                  <span className="w-32 shrink-0 text-sm font-medium text-white">{k.kaliber}</span>
                  <HBar value={k.count} max={maxKaliber} color={i < 5 ? "#4ade80" : "#2dd4bf"} />
                  <span className="w-12 shrink-0 text-right font-mono text-sm text-[#86efac]">{k.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ═══ SECTION 6: BY CANTON ═══ */}
        <div className="mb-10">
          <Card>
            <SectionTitle>Inserate nach Kanton</SectionTitle>
            <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {byKanton.map((k) => {
                const abbrev = KANTON_ABBREV[k.kanton] || k.kanton.slice(0, 2).toUpperCase();
                return (
                  <Link
                    key={k.kanton}
                    href={`/suche?kanton=${encodeURIComponent(abbrev)}`}
                    className="group flex items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-white/5"
                  >
                    <span className="w-8 shrink-0 font-mono text-xs font-bold text-[#4ade80]">{abbrev}</span>
                    <HBar value={k.count} max={maxKanton} />
                    <span className="w-10 shrink-0 text-right font-mono text-xs text-[#86efac]">{k.count}</span>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ SECTION 7: SWISS FACTS ═══ */}
        <div className="mb-10">
          <SectionTitle>Schweizer Waffenmarkt Fakten</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "~150'000", label: "WES ausgestellt", sub: "pro Jahr (Schätzung 2023)" },
              { value: "~2.3 Mio", label: "Waffen im Privatbesitz", sub: "Schätzung Schweiz" },
              { value: "~3'000", label: "Schützenvereine", sub: "in der Schweiz aktiv" },
              { value: "SR 514.54", label: "Waffengesetz WG", sub: "in Kraft seit 1999" },
            ].map((fact) => (
              <div key={fact.label} className="rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] p-5 text-center">
                <p className="font-display text-2xl font-black text-[#4ade80]">{fact.value}</p>
                <p className="mt-1 text-sm font-semibold text-white">{fact.label}</p>
                <p className="mt-0.5 text-xs text-[#9ca3af]">{fact.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SECTION 8: CHEAPEST PER CATEGORY ═══ */}
        {cheapestPerCategory.length > 0 && (
          <div className="mb-10">
            <SectionTitle>Günstigste pro Kategorie</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cheapestPerCategory.map((item) => (
                <Link
                  key={item.id}
                  href={`/inserat/${item.id}`}
                  className="group overflow-hidden rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] transition-all hover:border-[#4ade80]/40 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#0f1a0f]">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.titel}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#2d4a2d]">
                        <BarChart3 size={32} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="mb-1 inline-block rounded bg-[#4ade80]/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#4ade80]">
                      {KATEGORIE_LABELS[item.hauptkategorie] || item.hauptkategorie}
                    </span>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-white group-hover:text-[#4ade80] transition-colors">
                      {item.titel}
                    </p>
                    <p className="mt-2 font-display text-xl font-black text-[#4ade80]">
                      CHF {item.preis.toLocaleString("de-CH")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ═══ SECTION 9: COMING SOON ═══ */}
        <Card className="text-center">
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2d4a2d] bg-[#0f1a0f]">
              <TrendingUp className="h-6 w-6 text-[#4ade80]" />
            </div>
            <h3 className="font-display text-lg font-bold uppercase text-white">Preisverlauf — Demnächst</h3>
            <p className="max-w-md text-sm text-[#9ca3af]">
              Preistrends werden verfügbar, sobald genügend historische Daten gesammelt wurden.
              Verfolgen Sie die Preisentwicklung nach Kategorie, Marke und Kaliber.
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
