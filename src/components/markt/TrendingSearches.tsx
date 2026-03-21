"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SearchEntry {
  query: string;
  count: number;
  avg_results: number;
}

interface TrendingData {
  topSearches: SearchEntry[];
  hasSufficientData: boolean;
}

export default function TrendingSearches() {
  const [data, setData] = useState<TrendingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/markt/trending")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-[#4d8230]/20 bg-[#111f0d] p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex flex-col gap-1">
          <div className="h-0.5 w-7 rounded-full bg-[#4d8230]" />
          <div className="h-0.5 w-4 rounded-full bg-[#4d8230] opacity-40" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Meistgesucht</h2>
          <p className="text-[10px] text-gray-500">Letzte 7 Tage auf GunMarket.ch</p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4d8230] border-t-transparent" />
        </div>
      ) : !data?.hasSufficientData ? (
        /* Placeholder — no data yet */
        <div className="flex h-44 flex-col items-center justify-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4d8230"
            strokeWidth="1.5"
            className="opacity-40"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-500">Noch keine Suchdaten</p>
            <p className="mt-1 text-[10px] text-gray-600">
              Erscheint sobald User suchen
              <br />
              Tracking läuft ab sofort
            </p>
          </div>
          {/* Ghost rows as visual placeholder */}
          <div className="mt-2 w-full space-y-2 opacity-15">
            {[80, 60, 45, 30, 20].map((w, i) => (
              <div key={i} className="flex items-center gap-3 px-2">
                <div className="h-3 w-4 rounded bg-[#4d8230]" />
                <div
                  className="h-3 flex-1 rounded bg-[#4d8230]"
                  style={{ maxWidth: `${w}%` }}
                />
                <div className="h-3 w-10 rounded bg-[#4d8230]" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {data.topSearches.map((s, i) => (
            <Link
              key={s.query}
              href={`/?suche=${encodeURIComponent(s.query)}`}
              className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[#1a2e12]"
            >
              <span className="w-4 shrink-0 text-center text-[10px] font-bold text-gray-600">
                {i + 1}
              </span>
              <span className="flex-1 text-xs font-medium capitalize text-gray-300 transition-colors group-hover:text-white">
                {s.query}
              </span>
              <span className="shrink-0 text-[10px] text-gray-600">
                {s.avg_results} Treffer
              </span>
              <div className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-[#0f1a0a]">
                <div
                  className="h-full rounded-full bg-[#4d8230]"
                  style={{
                    width: `${Math.round((s.count / data.topSearches[0].count) * 100)}%`,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
