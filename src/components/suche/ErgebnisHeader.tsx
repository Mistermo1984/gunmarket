"use client";

import React from "react";
import { LayoutGrid, List, Map, SlidersHorizontal } from "lucide-react";

interface ErgebnisHeaderProps {
  resultCount: number;
  sort: string;
  onSortChange: (sort: string) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  activeFilterCount: number;
  onOpenMobileFilter: () => void;
  showMap?: boolean;
  onToggleMap?: () => void;
}

const SORT_OPTIONS = [
  { value: "neueste", label: "Neueste" },
  { value: "aelteste", label: "Älteste" },
  { value: "preis-asc", label: "Preis aufsteigend" },
  { value: "preis-desc", label: "Preis absteigend" },
  { value: "relevanz", label: "Relevanz" },
];

export default function ErgebnisHeader({
  resultCount,
  sort,
  onSortChange,
  view,
  onViewChange,
  activeFilterCount,
  onOpenMobileFilter,
  showMap,
  onToggleMap,
}: ErgebnisHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Mobile filter button */}
        <button
          onClick={onOpenMobileFilter}
          className="relative inline-flex items-center gap-2 rounded-lg border border-brand-border px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-brand-grey lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filter
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <h1 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark md:text-2xl">
          {resultCount} Inserate
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-brand-border bg-white px-3 py-2 text-xs text-neutral-700 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Map toggle */}
        {onToggleMap && (
          <button
            onClick={onToggleMap}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              showMap
                ? "border-brand-green bg-brand-green text-white"
                : "border-brand-border text-neutral-600 hover:border-brand-green hover:text-brand-green"
            }`}
          >
            <Map size={14} />
            Karte
          </button>
        )}

        {/* View toggle */}
        <div className="hidden items-center rounded-lg border border-brand-border sm:flex">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-2 ${
              view === "grid"
                ? "bg-brand-green text-white"
                : "text-neutral-500 hover:text-brand-dark"
            } rounded-l-lg transition-colors`}
            aria-label="Grid-Ansicht"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-2 ${
              view === "list"
                ? "bg-brand-green text-white"
                : "text-neutral-500 hover:text-brand-dark"
            } rounded-r-lg transition-colors`}
            aria-label="Listen-Ansicht"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
