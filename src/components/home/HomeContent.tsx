"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import { type ListingCardData } from "@/components/ui/ListingCard";
import FilterSidebar, {
  INITIAL_FILTERS,
  type FilterState,
  type FilterCounts,
} from "@/components/suche/FilterSidebar";
import ErgebnisHeader from "@/components/suche/ErgebnisHeader";
import ListingGrid from "@/components/suche/ListingGrid";
import { apiListingToCard } from "@/lib/listing-helpers";
import { useLocale } from "@/lib/locale-context";

const LIMIT = 25;

export default function HomeContent() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [listings, setListings] = useState<ListingCardData[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("neueste");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCounts, setFilterCounts] = useState<FilterCounts | null>(null);
  const { t } = useLocale();

  // Fetch filter counts once on mount
  useEffect(() => {
    fetch("/api/listings/counts")
      .then((res) => res.json())
      .then((data) => setFilterCounts(data))
      .catch(() => {});
  }, []);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  // Fetch listings based on filters + sort + page
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
    params.set("sort", sortOrder);
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
  }, [filters, sortOrder, currentPage]);

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
      {/* Desktop Sidebar */}
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <div className="sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl border border-brand-border bg-white">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            resultCount={totalResults}
            counts={filterCounts}
          />
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Toolbar: result count + sort + view toggle + mobile filter */}
        <ErgebnisHeader
          resultCount={totalResults}
          sort={sortOrder}
          onSortChange={setSortOrder}
          view={viewMode}
          onViewChange={setViewMode}
          activeFilterCount={activeFilterCount}
          onOpenMobileFilter={() => setMobileFilterOpen(true)}
        />

        {/* Active filter chips */}
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

        {/* Listing Grid with pagination */}
        <ListingGrid
          listings={listings}
          view={viewMode}
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
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
              counts={filterCounts}
            />
          </div>
        </>
      )}
    </div>
  );
}
