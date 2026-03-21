"use client";

import { useState, useEffect } from "react";

const KATEGORIEN = [
  { key: "alle", label: "Alle" },
  { key: "kurzwaffen", label: "Kurzwaffen" },
  { key: "langwaffen", label: "Langwaffen" },
  { key: "ordonnanzwaffen", label: "Ordonnanz" },
  { key: "zubehoer", label: "Zubehör" },
  { key: "munition", label: "Munition" },
];

const PRICE_RANGES = [
  { label: "< 100", min: 0, max: 100 },
  { label: "100–300", min: 100, max: 300 },
  { label: "300–500", min: 300, max: 500 },
  { label: "500–1k", min: 500, max: 1000 },
  { label: "1k–2k", min: 1000, max: 2000 },
  { label: "2k–5k", min: 2000, max: 5000 },
  { label: "5000+", min: 5000, max: 999999 },
];

interface Stats {
  total: number;
  avg: number;
  median: number;
  ranges: { label: string; count: number; pct: number }[];
}

export default function PriceDistributionChart() {
  const [activeKat, setActiveKat] = useState("alle");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url =
      activeKat === "alle"
        ? "/api/listings?limit=2000&sort=preis-asc"
        : `/api/listings?kategorie=${activeKat}&limit=2000&sort=preis-asc`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const prices = ((d.listings || []) as { preis: number }[])
          .map((l) => l.preis)
          .filter((p) => p > 0 && p < 50000);

        if (prices.length === 0) {
          setStats({ total: 0, avg: 0, median: 0, ranges: PRICE_RANGES.map((r) => ({ label: r.label, count: 0, pct: 0 })) });
          setLoading(false);
          return;
        }

        const sorted = [...prices].sort((a, b) => a - b);
        const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
        const median = sorted[Math.floor(sorted.length / 2)];

        const ranges = PRICE_RANGES.map((r) => {
          const count = prices.filter((p) => p >= r.min && p < r.max).length;
          return { label: r.label, count, pct: Math.round((count / prices.length) * 100) };
        });

        setStats({ total: prices.length, avg, median, ranges });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeKat]);

  const maxCount = stats ? Math.max(...stats.ranges.map((r) => r.count), 1) : 1;

  return (
    <div className="rounded-2xl border border-[#4d8230]/20 bg-[#111f0d] p-5 md:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-[#4d8230]" />
        <div>
          <h2 className="text-base font-bold text-white">Preisverteilung (CHF)</h2>
          <p className="text-xs text-gray-500">Verteilung der Inseratspreise nach Kategorie</p>
        </div>
      </div>

      {/* Kategorie-Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {KATEGORIEN.map((k) => (
          <button
            key={k.key}
            onClick={() => setActiveKat(k.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              activeKat === k.key
                ? "bg-[#4d8230] text-white"
                : "bg-[#1a2e12] text-gray-400 hover:bg-[#2d4a20] hover:text-white"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      {stats && !loading && (
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: "Durchschnitt", value: `CHF ${stats.avg.toLocaleString("de-CH")}` },
            { label: "Median", value: `CHF ${stats.median.toLocaleString("de-CH")}` },
            { label: "Inserate", value: stats.total.toLocaleString("de-CH") },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-[#1a2e12] p-3 text-center">
              <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-500">{s.label}</p>
              <p className="text-sm font-bold text-[#7dc855]">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Bar Chart */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#4d8230] border-t-transparent" />
        </div>
      ) : stats ? (
        <div className="flex h-40 items-end gap-2">
          {stats.ranges.map((r, i) => (
            <div key={i} className="group flex flex-1 cursor-default flex-col items-center gap-1">
              <span className="h-4 text-[10px] font-bold text-[#7dc855] opacity-0 transition-opacity group-hover:opacity-100">
                {r.pct > 0 ? `${r.pct}%` : ""}
              </span>
              <div
                className="relative w-full overflow-hidden rounded-t-lg transition-all duration-500"
                style={{
                  height: r.count > 0 ? `${Math.max((r.count / maxCount) * 120, 4)}px` : "4px",
                  background: r.count > 0 ? "linear-gradient(180deg, #7dc855 0%, #4d8230 100%)" : "#1a2e12",
                  opacity: r.count > 0 ? 1 : 0.3,
                }}
              >
                <div className="absolute inset-0 bg-white/5 transition-colors group-hover:bg-white/10" />
              </div>
              <span className="text-center text-[9px] leading-tight text-gray-500">{r.label}</span>
              <span className="text-[11px] font-semibold text-gray-300">{r.count}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center text-sm text-gray-500">Keine Daten verfügbar</div>
      )}
    </div>
  );
}
