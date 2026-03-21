"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Brand {
  marke: string;
  count: number;
  median_price: number;
  avg_price: number;
  min_price: number;
  max_price: number;
}

type SortKey = "count" | "median_price" | "avg_price";

export default function BrandMedianTable() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("count");

  useEffect(() => {
    fetch("/api/markt/marken")
      .then((r) => r.json())
      .then((d) => {
        setBrands(d.brands || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...brands].sort((a, b) => b[sortBy] - a[sortBy]);

  if (!loading && brands.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#4d8230]/20 bg-[#111f0d] p-5 md:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-[#4d8230]" />
          <div>
            <h2 className="text-base font-bold text-white">Medianpreise nach Marke</h2>
            <p className="text-xs text-gray-500">Basierend auf aktiven Inseraten</p>
          </div>
        </div>
        <div className="flex gap-1 rounded-lg bg-[#1a2e12] p-1">
          {(
            [
              ["count", "Anzahl"],
              ["median_price", "Median"],
              ["avg_price", "Ø Preis"],
            ] as [SortKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                sortBy === key ? "bg-[#4d8230] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#4d8230] border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#4d8230]/20">
                <th className="py-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">#</th>
                <th className="py-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">Marke</th>
                <th className="py-2 pr-4 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500">Inserate</th>
                <th className="py-2 pr-4 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500">Median</th>
                <th className="py-2 pr-4 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500">Ø Preis</th>
                <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500">Spanne</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b, i) => (
                <tr key={b.marke} className="group border-b border-[#4d8230]/10 transition-colors hover:bg-[#1a2e12]">
                  <td className="py-3 pr-4 text-[11px] text-gray-600">{i + 1}</td>
                  <td className="py-3 pr-4">
                    <Link
                      href={`/?suche=${encodeURIComponent(b.marke)}`}
                      className="font-semibold text-white transition-colors group-hover:text-[#7dc855]"
                    >
                      {b.marke}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="font-semibold text-[#7dc855]">{b.count}</span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="font-bold text-white">CHF {b.median_price.toLocaleString("de-CH")}</span>
                  </td>
                  <td className="py-3 pr-4 text-right text-gray-400">CHF {b.avg_price.toLocaleString("de-CH")}</td>
                  <td className="py-3 text-right text-[11px] text-gray-500">
                    {b.min_price.toLocaleString("de-CH")} – {b.max_price.toLocaleString("de-CH")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
