"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { X, SlidersHorizontal } from "lucide-react";
import ListingCard, { type ListingCardData } from "@/components/ui/ListingCard";
import FilterSidebar, {
  INITIAL_FILTERS,
  type FilterState,
} from "@/components/suche/FilterSidebar";
import { apiListingToCard } from "@/lib/listing-helpers";

export default function HomeContent() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [listings, setListings] = useState<ListingCardData[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch listings based on filters
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (filters.kategorien.length === 1) params.set("kategorie", filters.kategorien[0]);
    if (filters.rechtsstatus.length === 1) params.set("rechtsstatus", filters.rechtsstatus[0]);
    if (filters.kantone.length === 1) params.set("kanton", filters.kantone[0]);
    if (filters.zustand.length === 1) params.set("zustand", filters.zustand[0]);
    if (filters.preisMin) params.set("minPreis", filters.preisMin);
    if (filters.preisMax) params.set("maxPreis", filters.preisMax);
    if (filters.marke) params.set("suche", filters.marke);
    params.set("sort", "neueste");
    params.set("limit", "12");

    fetch(`/api/listings?${params}`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.listings || []).map((l: Record<string, unknown>) =>
          apiListingToCard(l)
        );
        setListings(mapped);
        setTotalResults(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.anbieter !== "alle") c++;
    c += filters.kategorien.length;
    c += filters.unterkategorien.length;
    c += filters.rechtsstatus.length;
    c += filters.kaliber.length;
    c += filters.zustand.length;
    if (filters.preisMin || filters.preisMax) c++;
    c += filters.kantone.length;
    if (filters.marke) c++;
    if (filters.mitFotos) c++;
    if (filters.neuEingestellt) c++;
    if (filters.preisreduziert) c++;
    return c;
  }, [filters]);

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilters(f);
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
      {/* Desktop Sidebar — same FilterSidebar as /suche */}
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <div className="sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl border border-brand-border bg-white">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            resultCount={totalResults}
          />
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark md:text-2xl">
              Neueste Inserate
            </h2>
            <p className="mt-0.5 text-sm text-neutral-500">
              {totalResults} Inserate gefunden
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-2 text-xs font-medium text-neutral-600 lg:hidden"
            >
              <SlidersHorizontal size={14} />
              Filter
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <Link
              href="/suche"
              className="hidden text-sm font-medium text-brand-green hover:underline sm:inline-flex"
            >
              Alle anzeigen &rarr;
            </Link>
          </div>
        </div>

        {/* Active filter chips (mobile + desktop) */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <X size={12} />
              Alle Filter löschen ({activeFilterCount})
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-base font-semibold text-brand-dark">Keine Inserate gefunden</p>
            <p className="mt-1 text-sm text-neutral-500">
              Versuche es mit weniger Filtern.
            </p>
            <button
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="mt-3 text-sm font-medium text-brand-green hover:underline"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}

        {/* Mobile "Alle anzeigen" */}
        <div className="mt-4 text-center sm:hidden">
          <Link
            href="/suche"
            className="text-sm font-medium text-brand-green hover:underline"
          >
            Alle anzeigen &rarr;
          </Link>
        </div>
      </div>

      {/* Mobile Filter — Bottom Sheet */}
      {mobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white shadow-xl lg:hidden animate-slide-up">
            <div className="mx-auto my-2 h-1 w-10 rounded-full bg-neutral-300" />
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onClose={() => setMobileFilterOpen(false)}
              resultCount={totalResults}
              isMobile
            />
          </div>
        </>
      )}
    </div>
  );
}
