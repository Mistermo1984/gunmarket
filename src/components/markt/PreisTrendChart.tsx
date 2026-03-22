"use client";

import { useState, useEffect, useRef } from "react";

const KATEGORIEN = [
  { key: "alle", label: "Alle" },
  { key: "kurzwaffen", label: "Kurzwaffen" },
  { key: "langwaffen", label: "Langwaffen" },
  { key: "ordonnanzwaffen", label: "Ordonnanz" },
  { key: "zubehoer", label: "Zubehör" },
];

const TIME_RANGES = [
  { days: 7, label: "7T" },
  { days: 30, label: "30T" },
  { days: 90, label: "90T" },
  { days: 365, label: "1J" },
];

interface Snapshot {
  snapshot_date: string;
  median_price: number;
  total_listings: number;
}

interface TrendData {
  snapshots: Snapshot[];
  hasData: boolean;
  trend: { direction: string; changePct: string } | null;
}

export default function PreisTrendChart() {
  const [activeKat, setActiveKat] = useState("alle");
  const [activeDays, setActiveDays] = useState(30);
  const [data, setData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/markt/preistrend?kategorie=${activeKat}&days=${activeDays}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeKat, activeDays]);

  useEffect(() => {
    if (!data?.hasData || !canvasRef.current) return;

    import("chart.js").then(({ Chart, registerables }) => {
      Chart.register(...registerables);
      if (chartRef.current) chartRef.current.destroy();

      const ctx = canvasRef.current!.getContext("2d")!;
      const labels = data.snapshots.map((s) =>
        new Date(s.snapshot_date).toLocaleDateString("de-CH", {
          day: "2-digit",
          month: "2-digit",
        })
      );
      const prices = data.snapshots.map((s) => Number(s.median_price));

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              data: prices,
              borderColor: "#7dc855",
              borderWidth: 2,
              pointRadius: activeDays <= 14 ? 3 : 0,
              pointBackgroundColor: "#4d8230",
              tension: 0.35,
              fill: true,
              backgroundColor: "rgba(77,130,48,0.15)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  " CHF " + Math.round(ctx.parsed.y ?? 0).toLocaleString("de-CH"),
              },
              backgroundColor: "#1a2e12",
              borderColor: "rgba(77,130,48,0.4)",
              borderWidth: 1,
              titleColor: "#9ca3af",
              bodyColor: "#7dc855",
            },
          },
          scales: {
            x: {
              ticks: { color: "#6b7280", font: { size: 9 }, maxTicksLimit: 6 },
              grid: { color: "rgba(255,255,255,0.04)" },
            },
            y: {
              ticks: {
                color: "#6b7280",
                font: { size: 9 },
                callback: (v) =>
                  "CHF " + Math.round(Number(v)).toLocaleString("de-CH"),
              },
              grid: { color: "rgba(255,255,255,0.06)" },
            },
          },
        },
      });
    });
  }, [data, activeDays]);

  return (
    <div className="rounded-2xl border border-[#4d8230]/20 bg-[#111f0d] p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <div className="h-0.5 w-7 rounded-full bg-[#4d8230]" />
            <div className="h-0.5 w-4 rounded-full bg-[#4d8230] opacity-40" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Preisentwicklung</h2>
            <p className="text-[11px] text-gray-500">Medianpreis im Zeitverlauf</p>
          </div>
        </div>
        {data?.trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              data.trend.direction === "up"
                ? "bg-red-500/15 text-red-400"
                : data.trend.direction === "down"
                  ? "bg-green-500/15 text-green-400"
                  : "bg-gray-500/15 text-gray-400"
            }`}
          >
            {data.trend.direction === "up" ? "↑" : data.trend.direction === "down" ? "↓" : "→"}
            {data.trend.changePct}%
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <div className="mr-1 flex gap-1 rounded-lg bg-[#1a2e12] p-0.5">
          {TIME_RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setActiveDays(r.days)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                activeDays === r.days
                  ? "bg-[#4d8230] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        {KATEGORIEN.map((k) => (
          <button
            key={k.key}
            onClick={() => setActiveKat(k.key)}
            className={`rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-all ${
              activeKat === k.key
                ? "bg-[#4d8230] text-white"
                : "bg-[#1a2e12] text-gray-400 hover:text-white"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      {/* Chart or Placeholder */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4d8230] border-t-transparent" />
        </div>
      ) : !data?.hasData ? (
        <div className="flex h-44 flex-col items-center justify-center gap-4">
          {/* Animated placeholder line */}
          <svg viewBox="0 0 320 70" className="w-full opacity-20">
            <defs>
              <linearGradient id="pgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4d8230" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4d8230" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 35 Q80 33 160 37 Q240 31 320 35 L320 70 L0 70 Z"
              fill="url(#pgGrad)"
            />
            <path
              d="M0 35 Q80 33 160 37 Q240 31 320 35"
              stroke="#4d8230"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="5,4"
            />
          </svg>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-500">Daten werden gesammelt</p>
            <p className="mt-1 text-[11px] text-gray-600">
              Preistrends erscheinen ab dem 2. Tag
              <br />
              Täglich um 04:00 Uhr neue Snapshots
            </p>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", height: "160px" }}>
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}
