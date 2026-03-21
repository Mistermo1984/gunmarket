"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import ListingCard, { type ListingCardData } from "@/components/ui/ListingCard";
import FilterSidebar, {
  INITIAL_FILTERS,
  type FilterState,
} from "@/components/suche/FilterSidebar";
import { apiListingToCard } from "@/lib/listing-helpers";
import { useLocale } from "@/lib/locale-context";

const LIMIT = 25;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const delta = 2;
    pages.push(1);
    if (currentPage - delta > 2) pages.push("...");
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage + delta < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-8 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#4d8230] hover:text-[#4d8230] transition-colors"
      >
        &larr; Zurück
      </button>
      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-sm text-gray-400">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-9 h-9 text-sm rounded-lg transition-colors border ${
              currentPage === page
                ? "bg-[#4d8230] text-white border-[#4d8230] font-medium"
                : "border-gray-200 text-gray-600 hover:border-[#4d8230] hover:text-[#4d8230]"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#4d8230] hover:text-[#4d8230] transition-colors"
      >
        Weiter &rarr;
      </button>
    </div>
  );
}

export default function HomeContent() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [listings, setListings] = useState<ListingCardData[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { t } = useLocale();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Fetch listings based on filters + page
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (filters.kategorien.length > 0) params.set("kategorie", filters.kategorien.join(","));
    if (filters.unterkategorien.length > 0) params.set("unterkategorie", filters.unterkategorien.join(","));
    if (filters.rechtsstatus.length > 0) params.set("rechtsstatus", filters.rechtsstatus.join(","));
    if (filters.kantone.length > 0) params.set("kanton", filters.kantone.join(","));
    if (filters.zustand.length > 0) params.set("zustand", filters.zustand.join(","));
    if (filters.kaliber.length > 0) params.set("kaliber", filters.kaliber.join(","));
    if (filters.preisMin) params.set("minPreis", filters.preisMin);
    if (filters.preisMax) params.set("maxPreis", filters.preisMax);
    if (filters.marke) params.set("suche", filters.marke);
    if (filters.neuSeitTagen) params.set("neu_seit_tagen", String(filters.neuSeitTagen));
    params.set("sort", "neueste");
    params.set("limit", String(LIMIT));
    params.set("seite", String(currentPage));

    fetch(`/api/listings?${params}`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.listings || []).map((l: Record<string, unknown>) =>
          apiListingToCard(l)
        );
        setListings(mapped);
        setTotalResults(data.total || 0);
        setTotalPages(data.totalSeiten || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters, currentPage]);

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
    if (filters.neuSeitTagen) c++;
    return c;
  }, [filters]);

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilters(f);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              {activeFilterCount > 0 ? t("listings_title_filtered") : t("listings_title")}
            </h2>
            <p className="mt-0.5 text-sm text-neutral-500">
              {totalResults} {t("home_found")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-2 text-xs font-medium text-neutral-600 lg:hidden"
            >
              <SlidersHorizontal size={14} />
              {t("filter_title")}
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
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
              {t("home_clear_filters")} ({activeFilterCount})
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
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-base font-semibold text-brand-dark">{t("listings_no_results")}</p>
            <p className="mt-1 text-sm text-neutral-500">
              {t("home_no_results_hint")}
            </p>
            <button
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="mt-3 text-sm font-medium text-brand-green hover:underline"
            >
              {t("listings_reset_filters")}
            </button>
          </div>
        )}

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
