"use client";

import React, { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
  return (
    <Suspense fallback={null}>
      <HomeContentInner />
    </Suspense>
  );
}

function HomeContentInner() {
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
  const searchParams = useSearchParams();

  // Sync URL params (suche, kanton, kategorie) into filter state
  useEffect(() => {
    const suche = searchParams.get("suche") || "";
    const kanton = searchParams.get("kanton");
    const kategorie = searchParams.get("kategorie");
    if (suche || kanton || kategorie) {
      setFilters((prev) => ({
        ...prev,
        marke: suche || prev.marke,
        kantone: kanton ? kanton.split(",") : prev.kantone,
        kategorien: kategorie ? kategorie.split(",") : prev.kategorien,
      }));
    }
  }, [searchParams]);

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
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-white shadow-2xl lg:hidden animate-slide-up"
            style={{ maxHeight: "92dvh" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="h-1 w-12 rounded-full bg-gray-200" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
              <h2 className="text-base font-bold text-gray-900">{t("filter_title")}</h2>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => setFilters(INITIAL_FILTERS)}
                    className="text-sm text-red-500 font-medium"
                  >
                    {t("home_clear_filters")}
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            {/* Filter Content */}
            <div className="overflow-y-auto flex-1">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onClose={() => setMobileFilterOpen(false)}
                resultCount={totalResults}
                isMobile
                counts={filterCounts}
              />
            </div>
            {/* CTA */}
            <div className="shrink-0 px-5 pb-8 pt-4 border-t border-gray-100 bg-white">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-2xl bg-[#4d8230] py-4 font-bold text-base text-white transition-colors hover:bg-[#5a9a38]"
              >
                {totalResults} {t("filter_show_listings")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
