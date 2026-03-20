"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Clock, X } from "lucide-react";
import ListingCard, { type ListingCardData } from "@/components/ui/ListingCard";
import { apiListingToCard } from "@/lib/listing-helpers";
import { useLocale } from "@/lib/locale-context";

const KANTONE = [
  "AG","AI","AR","BE","BL","BS","FR","GE","GL","GR","JU","LU",
  "NE","NW","OW","SG","SH","SO","SZ","TG","TI","UR","VD","VS","ZG","ZH",
];

const DAY_BUTTONS = [1, 2, 3, 5, 7];

export default function NeusteInserate() {
  const { t } = useLocale();
  const [listings, setListings] = useState<(ListingCardData & { createdAt: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxDays, setMaxDays] = useState(7);
  const [filterKanton, setFilterKanton] = useState("");
  const [filterRecht, setFilterRecht] = useState("");

  useEffect(() => {
    fetch("/api/listings?sort=neueste&limit=12")
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.listings || []).map((l: Record<string, unknown>) => ({
          ...apiListingToCard(l),
          createdAt: new Date(l.created_at as string).getTime(),
        }));
        setListings(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeFilterCount =
    (maxDays < 7 ? 1 : 0) +
    (filterKanton ? 1 : 0) +
    (filterRecht ? 1 : 0);

  function resetFilters() {
    setMaxDays(7);
    setFilterKanton("");
    setFilterRecht("");
  }

  const filtered = useMemo(() => {
    const cutoff = Date.now() - maxDays * 86400000;
    return listings.filter((l) => {
      if (l.createdAt < cutoff) return false;
      if (filterKanton && l.kanton !== filterKanton) return false;
      if (filterRecht && l.rechtsstatus !== filterRecht) return false;
      return true;
    });
  }, [listings, maxDays, filterKanton, filterRecht]);

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark md:text-2xl">
          {t("listings_title")}
        </h2>
        <Link
          href="/suche"
          className="hidden text-sm font-medium text-brand-green hover:underline sm:inline-flex"
        >
          {t("listings_show_all")}
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-brand-border bg-brand-grey p-3">
        {/* Freshness */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-neutral-500" />
          <div className="flex gap-1">
            {DAY_BUTTONS.map((d) => (
              <button
                key={d}
                onClick={() => setMaxDays(d)}
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                  maxDays === d
                    ? "bg-brand-green text-white"
                    : "bg-white text-neutral-600 hover:text-brand-green"
                }`}
              >
                {d === 1 ? "24h" : `${d}T`}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden h-5 w-px bg-brand-border sm:block" />

        {/* Kanton filter */}
        <select
          value={filterKanton}
          onChange={(e) => setFilterKanton(e.target.value)}
          className="rounded-md border border-brand-border bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-green/30"
        >
          <option value="">{t("filter_all_cantons")}</option>
          {KANTONE.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        {/* Recht filter */}
        <select
          value={filterRecht}
          onChange={(e) => setFilterRecht(e.target.value)}
          className="rounded-md border border-brand-border bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-green/30"
        >
          <option value="">{t("filter_all_status")}</option>
          <option value="frei">Frei</option>
          <option value="wes">WES</option>
          <option value="abk-klein">ABK Klein</option>
          <option value="ordonnanz">Ordonnanz</option>
        </select>

        {/* Reset */}
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-neutral-500 transition hover:text-red-600"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[9px] font-bold text-white">
              {activeFilterCount}
            </span>
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-base font-semibold text-brand-dark">{t("listings_no_results")}</p>
          <p className="mt-1 text-sm text-neutral-500">
            {t("listings_no_results_hint")}
          </p>
          <button
            onClick={resetFilters}
            className="mt-3 text-sm font-medium text-brand-green hover:underline"
          >
            {t("listings_reset_filters")}
          </button>
        </div>
      )}

      {/* Mobile "Alle anzeigen" */}
      <div className="mt-4 text-center sm:hidden">
        <Link
          href="/suche"
          className="text-sm font-medium text-brand-green hover:underline"
        >
          {t("listings_show_all")}
        </Link>
      </div>
    </div>
  );
}
