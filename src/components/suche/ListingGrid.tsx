"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard, { type ListingCardData } from "@/components/ui/ListingCard";
import { SucheEmpty } from "@/components/ui/EmptyState";

// ── Skeleton Loading ──

function SkeletonCard({ variant }: { variant: "grid" | "list" }) {
  if (variant === "list") {
    return (
      <div className="flex overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="skeleton m-3 h-[120px] w-[120px] shrink-0 rounded-lg" />
        <div className="flex flex-1 flex-col justify-center gap-2 py-3 pr-4">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-6 w-1/3" />
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
      <div className="skeleton aspect-[4/3] w-full" style={{ borderRadius: 0 }} />
      <div className="flex flex-col gap-2 p-3.5">
        <div className="skeleton h-5 w-1/3" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="mt-2 flex justify-between border-t border-brand-border pt-2.5">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ view, count = 6 }: { view: "grid" | "list"; count?: number }) {
  return view === "grid" ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="grid" />
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="list" />
      ))}
    </div>
  );
}

// ── Component ──

interface ListingGridProps {
  listings: ListingCardData[];
  view: "grid" | "list";
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function ListingGrid({
  listings,
  view,
  page,
  totalPages,
  onPageChange,
  isLoading = false,
}: ListingGridProps) {
  // Build page numbers
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  if (isLoading) {
    return <SkeletonGrid view={view} count={6} />;
  }

  // Empty state
  if (listings.length === 0) {
    return <SucheEmpty />;
  }

  return (
    <div className="animate-fade-in">
      {/* Grid / List */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} variant="list" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1.5">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-neutral-500 transition-all hover:bg-brand-grey hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30 touch-target"
          >
            <ChevronLeft size={16} />
          </button>
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-2 text-sm text-neutral-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all touch-target ${
                  page === p
                    ? "bg-brand-green text-white shadow-md"
                    : "border border-brand-border text-neutral-700 hover:bg-brand-grey hover:shadow-sm"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-neutral-500 transition-all hover:bg-brand-grey hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30 touch-target"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
