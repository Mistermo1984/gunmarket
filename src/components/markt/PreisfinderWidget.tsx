"use client";

import { useState } from "react";
import Link from "next/link";

interface ListingItem {
  id: string;
  titel: string;
  preis: number;
  kanton: string;
  images?: { url: string }[];
  image_url?: string;
}

interface Result {
  count: number;
  totalCount: number;
  median: number;
  avg: number;
  min: number;
  max: number;
  listings: ListingItem[];
  outliersRemoved: ListingItem[];
  outlierReason: string;
}

function removeOutliers(listings: ListingItem[]): {
  clean: ListingItem[];
  removed: ListingItem[];
  reason: string;
} {
  if (listings.length < 5) return { clean: listings, removed: [], reason: "" };

  const prices = listings.map((l) => l.preis).sort((a, b) => a - b);

  // IQR-based outlier filter (Tukey's method)
  const q1 = prices[Math.floor(prices.length * 0.25)];
  const q3 = prices[Math.floor(prices.length * 0.75)];
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  // Absolute minimum: anything below 40% of rough median = accessories/parts
  const roughMedian = prices[Math.floor(prices.length / 2)];
  const absoluteMin = roughMedian * 0.4;

  // Combine both methods — stricter wins
  const effectiveLower = Math.max(lowerFence, absoluteMin, 0);

  const clean = listings.filter((l) => l.preis >= effectiveLower && l.preis <= upperFence);
  const removed = listings.filter((l) => l.preis < effectiveLower || l.preis > upperFence);

  let reason = "";
  if (removed.length > 0) {
    const removedLow = removed.filter((l) => l.preis < effectiveLower).length;
    const removedHigh = removed.filter((l) => l.preis > upperFence).length;
    const parts: string[] = [];
    if (removedLow > 0) parts.push(`${removedLow} Tiefpreiser (Zubehör/Einzelteile)`);
    if (removedHigh > 0) parts.push(`${removedHigh} Ausreisser oben`);
    reason = parts.join(", ");
  }

  return { clean, removed, reason };
}

function calcStats(prices: number[]) {
  if (prices.length === 0) return { median: 0, avg: 0, min: 0, max: 0 };
  const sorted = [...prices].sort((a, b) => a - b);
  return {
    median: sorted[Math.floor(sorted.length / 2)],
    avg: Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length),
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
}

export default function PreisfinderWidget() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOutliers, setShowOutliers] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setShowOutliers(false);
    try {
      const r = await fetch(`/api/listings?suche=${encodeURIComponent(query.trim())}&limit=200&sort=preis-asc`);
      const d = await r.json();
      const rawListings = (d.listings || []) as Record<string, unknown>[];

      // Map to typed listings with valid prices
      const allListings: ListingItem[] = rawListings
        .filter((l) => (l.preis as number) > 0 && (l.preis as number) < 50000)
        .map((l) => ({
          id: l.id as string,
          titel: l.titel as string,
          preis: l.preis as number,
          kanton: (l.kanton as string) || "",
          images: l.images as { url: string }[] | undefined,
          image_url: l.image_url as string | undefined,
        }));

      if (allListings.length === 0) {
        setResult({
          count: 0, totalCount: 0, median: 0, avg: 0, min: 0, max: 0,
          listings: [], outliersRemoved: [], outlierReason: "",
        });
      } else {
        // Outlier removal (IQR + absolute minimum)
        const { clean, removed, reason } = removeOutliers(allListings);
        const stats = calcStats(clean.map((l) => l.preis));

        setResult({
          count: clean.length,
          totalCount: allListings.length,
          ...stats,
          listings: clean.slice(0, 3),
          outliersRemoved: removed,
          outlierReason: reason,
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
        <div className="flex gap-0.5">
          <div className="h-6 w-1 rounded-full bg-[#4d8230]" />
          <div className="h-6 w-0.5 rounded-full bg-[#4d8230]/40" />
        </div>
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
          {result.count === 0 && result.totalCount === 0 ? (
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
                <p className="mb-2 text-[10px] text-gray-500">
                  Preisspanne aus {result.count} Inseraten
                  {result.totalCount > result.count && (
                    <span className="text-gray-600"> (von {result.totalCount} total)</span>
                  )}
                </p>
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

                {/* Outlier hint */}
                {result.outliersRemoved.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" className="shrink-0">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <p className="text-[11px] text-amber-600">
                      {result.outlierReason} ausgeschlossen{" "}
                      <button
                        onClick={() => setShowOutliers((s) => !s)}
                        className="underline hover:no-underline"
                      >
                        {showOutliers ? "ausblenden" : "anzeigen"}
                      </button>
                    </p>
                  </div>
                )}
              </div>

              {/* Outlier listings (toggle) */}
              {showOutliers && result.outliersRemoved.length > 0 && (
                <div className="mb-4 rounded-xl border border-amber-500/20 bg-[#1a1a0a] p-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                    Ausgeschlossene Inserate ({result.outliersRemoved.length})
                  </p>
                  <div className="space-y-1.5">
                    {result.outliersRemoved.slice(0, 8).map((l) => (
                      <Link
                        key={l.id}
                        href={`/inserat/${l.id}`}
                        className="flex items-center justify-between rounded-lg bg-[#1a2e12]/50 px-3 py-2 text-xs transition-colors hover:bg-[#2d4a20]/50"
                      >
                        <span className="mr-3 min-w-0 truncate text-gray-400">{l.titel}</span>
                        <span className="shrink-0 font-medium text-amber-500">
                          CHF {l.preis.toLocaleString("de-CH")}
                        </span>
                      </Link>
                    ))}
                    {result.outliersRemoved.length > 8 && (
                      <p className="pt-1 text-center text-[10px] text-gray-600">
                        +{result.outliersRemoved.length - 8} weitere
                      </p>
                    )}
                  </div>
                </div>
              )}

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
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
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
                  Alle {result.totalCount} Inserate ansehen →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
