"use client";

import { useState } from "react";
import Link from "next/link";

interface Result {
  count: number;
  median: number;
  avg: number;
  min: number;
  max: number;
  listings: { id: string; titel: string; preis: number; kanton: string; images?: { url: string }[]; image_url?: string }[];
}

export default function PreisfinderWidget() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/listings?suche=${encodeURIComponent(query.trim())}&limit=200&sort=preis-asc`);
      const d = await r.json();
      const listings = (d.listings || []) as Record<string, unknown>[];
      const prices = listings
        .map((l) => l.preis as number)
        .filter((p) => p > 0 && p < 50000)
        .sort((a, b) => a - b);

      if (prices.length === 0) {
        setResult({ count: 0, median: 0, avg: 0, min: 0, max: 0, listings: [] });
      } else {
        setResult({
          count: prices.length,
          median: prices[Math.floor(prices.length / 2)],
          avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
          min: prices[0],
          max: prices[prices.length - 1],
          listings: listings.slice(0, 3).map((l) => ({
            id: l.id as string,
            titel: l.titel as string,
            preis: l.preis as number,
            kanton: (l.kanton as string) || "",
            images: l.images as { url: string }[] | undefined,
            image_url: l.image_url as string | undefined,
          })),
        });
      }
    } catch {
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-[#4d8230]/30 bg-[#111f0d] p-5 md:p-6">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-2xl">🔍</span>
        <div>
          <h2 className="text-lg font-bold text-white">Preisfinder</h2>
          <p className="text-xs text-gray-500">Marktpreis für deine Waffe ermitteln</p>
        </div>
      </div>

      <div className="mb-2 mt-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="z.B. SIG P210, Glock 17, K31..."
          className="flex-1 rounded-xl border border-[#4d8230]/30 bg-[#1a2e12] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#4d8230]"
        />
        <button
          onClick={search}
          disabled={loading}
          className="rounded-xl bg-[#4d8230] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a9a38] disabled:opacity-50"
        >
          {loading ? "..." : "Suchen"}
        </button>
      </div>

      {result && (
        <div className="mt-4">
          {result.count === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              Keine Inserate gefunden für &quot;{query}&quot;
            </p>
          ) : (
            <>
              {/* Price stats */}
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "MEDIAN", value: `CHF ${result.median.toLocaleString("de-CH")}`, hl: true },
                  { label: "DURCHSCHNITT", value: `CHF ${result.avg.toLocaleString("de-CH")}`, hl: false },
                  { label: "GÜNSTIGSTER", value: `CHF ${result.min.toLocaleString("de-CH")}`, hl: false },
                  { label: "TEUERSTER", value: `CHF ${result.max.toLocaleString("de-CH")}`, hl: false },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-xl p-3 text-center ${s.hl ? "border border-[#4d8230]/40 bg-[#4d8230]/20" : "bg-[#1a2e12]"}`}
                  >
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">{s.label}</p>
                    <p className={`text-sm font-bold ${s.hl ? "text-[#7dc855]" : "text-white"}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Price range bar */}
              <div className="mb-4 rounded-xl bg-[#1a2e12] p-3">
                <p className="mb-2 text-[10px] text-gray-500">Preisspanne aus {result.count} Inseraten</p>
                <div className="relative h-6 overflow-hidden rounded-full bg-[#0f1a0a]">
                  <div
                    className="absolute inset-y-0 rounded-full"
                    style={{
                      left: "0%",
                      width: "100%",
                      background: "linear-gradient(90deg, #1a4010 0%, #4d8230 50%, #7dc855 100%)",
                      opacity: 0.6,
                    }}
                  />
                  {result.max > result.min && (
                    <div
                      className="absolute inset-y-0 w-0.5 bg-white"
                      style={{ left: `${((result.median - result.min) / (result.max - result.min)) * 100}%` }}
                    />
                  )}
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-gray-600">
                  <span>CHF {result.min.toLocaleString("de-CH")}</span>
                  <span className="text-[#7dc855]">▼ Median</span>
                  <span>CHF {result.max.toLocaleString("de-CH")}</span>
                </div>
              </div>

              {/* Sample listings */}
              <div className="space-y-2">
                {result.listings.map((l) => {
                  const imgUrl = l.images?.[0]?.url || l.image_url;
                  return (
                    <Link
                      key={l.id}
                      href={`/inserat/${l.id}`}
                      className="group flex items-center gap-3 rounded-xl bg-[#1a2e12] p-2.5 transition-colors hover:bg-[#2d4a20]"
                    >
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#0f1a0a]">
                        {imgUrl && (
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-white group-hover:text-[#7dc855]">{l.titel}</p>
                        <p className="text-[10px] text-gray-500">{l.kanton}</p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-[#7dc855]">
                        CHF {l.preis?.toLocaleString("de-CH")}
                      </p>
                    </Link>
                  );
                })}
                <Link
                  href={`/?suche=${encodeURIComponent(query)}`}
                  className="block pt-1 text-center text-xs text-[#4d8230] hover:text-[#7dc855]"
                >
                  Alle {result.count} Inserate ansehen →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
