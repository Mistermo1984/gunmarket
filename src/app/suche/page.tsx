"use client";

import React, { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import FilterSidebar, {
  INITIAL_FILTERS,
  type FilterState,
  type FilterCounts,
} from "@/components/suche/FilterSidebar";
import ErgebnisHeader from "@/components/suche/ErgebnisHeader";
import ListingGrid from "@/components/suche/ListingGrid";
import { HAUPTKATEGORIEN, KANTONE } from "@/lib/constants";
import { apiListingToCard } from "@/lib/listing-helpers";
import { useLocale } from "@/lib/locale-context";
import type { ListingCardData } from "@/components/ui/ListingCard";

export default function SuchePage() {
  return (
    <Suspense>
      <SucheContent />
    </Suspense>
  );
}

function SucheContent() {
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const [filters, setFilters] = useState<FilterState>(() => {
    const initial = { ...INITIAL_FILTERS };
    const q = searchParams.get("q");
    const kat = searchParams.get("kategorie");
    const kanton = searchParams.get("kanton");
    if (kat) initial.kategorien = [kat];
    if (kanton) initial.kantone = kanton.split(",").map((k) => k.toLowerCase());
    if (q) initial.marke = q; // reuse marke field for text search
    return initial;
  });

  const [sort, setSort] = useState("preis-asc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [listings, setListings] = useState<ListingCardData[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCounts, setFilterCounts] = useState<FilterCounts | null>(null);

  // Fetch filter counts once on mount
  useEffect(() => {
    fetch("/api/listings/counts")
      .then((res) => res.json())
      .then((data) => setFilterCounts(data))
      .catch(() => {});
  }, []);

  // Build shared filter params
  const buildFilterParams = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.kategorien.length > 0) {
      params.set("kategorie", filters.kategorien.join(","));
    }
    if (filters.unterkategorien.length > 0) {
      params.set("unterkategorie", filters.unterkategorien.join(","));
    }
    if (filters.rechtsstatus.length > 0) {
      params.set("rechtsstatus", filters.rechtsstatus.join(","));
    }
    if (filters.kantone.length > 0) {
      const labels = filters.kantone.map((id) => {
        const kt = KANTONE.find((k) => k.id === id);
        return kt?.label ?? id;
      });
      params.set("kanton", labels.join(","));
    }
    if (filters.zustand.length > 0) {
      params.set("zustand", filters.zustand.join(","));
    }
    if (filters.kaliber.length > 0) {
      params.set("kaliber", filters.kaliber.join(","));
    }
    if (filters.preisMin) params.set("minPreis", filters.preisMin);
    if (filters.preisMax) params.set("maxPreis", filters.preisMax);
    if (filters.marke) params.set("suche", filters.marke);
    return params;
  }, [filters]);

  // Fetch paginated listings for the grid
  useEffect(() => {
    setIsLoading(true);
    const params = buildFilterParams();
    params.set("sort", sort || "preis-asc");
    params.set("seite", String(page));
    params.set("limit", "12");

    fetch(`/api/listings?${params}`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.listings || []).map((l: Record<string, unknown>) =>
          apiListingToCard(l)
        );
        setListings(mapped);
        setTotalResults(data.total || 0);
        setTotalPages(data.totalSeiten || 1);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [filters, sort, page, buildFilterParams]);

  // Count active filters
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

  // Active category label for breadcrumb
  const activeKatLabel = useMemo(() => {
    if (filters.kategorien.length === 1) {
      return HAUPTKATEGORIEN.find((h) => h.id === filters.kategorien[0])?.label;
    }
    return null;
  }, [filters.kategorien]);

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilters(f);
    setPage(1);
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-brand-border bg-brand-grey/50">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-green transition-colors">
            {t("breadcrumb_home")}
          </Link>
          <ChevronRight size={12} className="text-neutral-300" />
          <Link href="/suche" className="hover:text-brand-green transition-colors">
            {t("breadcrumb_search")}
          </Link>
          {activeKatLabel && (
            <>
              <ChevronRight size={12} className="text-neutral-300" />
              <span className="text-brand-dark">{activeKatLabel}</span>
            </>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto rounded-xl border border-brand-border bg-white">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              resultCount={totalResults}
              counts={filterCounts}
            />
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <ErgebnisHeader
            resultCount={totalResults}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
            activeFilterCount={activeFilterCount}
            onOpenMobileFilter={() => setMobileFilterOpen(true)}
          />

          <ListingGrid
            listings={listings}
            view={view}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Mobile Filter — Bottom Sheet */}
      {mobileFilterOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-bg lg:hidden"
            onClick={() => setMobileFilterOpen(false)}
          />
          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white shadow-[var(--shadow-modal)] lg:hidden animate-slide-up">
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

      {/* Mobile FAB: Inserat aufgeben */}
      <Link
        href="/dashboard/inserat-erstellen"
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg animate-bounce-in lg:hidden hover:bg-brand-green-dark transition-colors"
        aria-label={t("nav_create_long")}
      >
        <Plus size={24} />
      </Link>
    </>
  );
}
