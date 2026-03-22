"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { PistolenIcon, RepetierIcon, BockflinteIcon, OptikIcon } from "@/components/ui/WeaponIcons";
import { useLocale } from "@/lib/locale-context";

export interface ListingCardData {
  id: string;
  titel: string;
  kaliber: string;
  preis: number;
  zustand: string;
  kanton: string;
  kategorie: string;
  rechtsstatus: string;
  rechtsstatusLabel: string;
  rechtsstatusFarbe: string;
  rechtsstatusTextfarbe: string;
  anbieterTyp: "Privat" | "Händler";
  datum: string;
  waffenTyp: "kurzwaffe" | "langwaffe" | "flinte" | "zubehoer";
  aufrufe?: number;
  verhandelbar?: boolean;
  bildAnzahl?: number;
  source?: string;
  sourceUrl?: string | null;
  imageUrl?: string | null;
  imageUrls?: string[];
  createdAt?: string;
  goodDealCount?: number;
  priceChangePct?: number;
}

const waffenIconMap = {
  kurzwaffe: PistolenIcon,
  langwaffe: RepetierIcon,
  flinte: BockflinteIcon,
  zubehoer: OptikIcon,
};

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const { t } = useLocale();
  const [current, setCurrent] = useState(0);

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="group/slider relative h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[current]}
        alt={alt}
        className="h-full w-full object-contain object-center"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.fallback) {
            target.dataset.fallback = "1";
            target.src = "/images/placeholder-waffe.svg";
          }
        }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/slider:opacity-100 max-sm:opacity-70"
            aria-label={t("listing_prev_image")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/slider:opacity-100 max-sm:opacity-70"
            aria-label={t("listing_next_image")}
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  i === current ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ListingCardProps {
  listing: ListingCardData;
  variant?: "grid" | "list";
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

export default function ListingCard({ listing, variant = "grid", onFavoriteToggle }: ListingCardProps) {
  const { t } = useLocale();
  const WaffenIcon = waffenIconMap[listing.waffenTyp];
  const [isFav, setIsFav] = useState(false);

  function handleFavClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(!isFav);
    onFavoriteToggle?.(listing.id, !isFav);
    window.dispatchEvent(new Event('merkliste-updated'));
  }

  const images = listing.imageUrls && listing.imageUrls.length > 0
    ? listing.imageUrls
    : listing.imageUrl
      ? [listing.imageUrl]
      : [];
  const imageCount = listing.bildAnzahl ?? images.length;
  const href = `/inserat/${listing.id}`;

  function saveScrollPosition() {
    try {
      sessionStorage.setItem("gm_search_scroll", String(window.scrollY));
    } catch { /* ignore */ }
  }

  // ── LIST VARIANT ──
  if (variant === "list") {
    return (
      <Link href={href} onClick={saveScrollPosition} className="group flex overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
        {/* Photo */}
        <div className="relative flex shrink-0 items-center justify-center overflow-hidden" style={{ width: 120, height: 90, background: "#f8faf8" }}>
          {images.length > 0 ? (
            <ImageSlider images={images} alt={`${listing.titel} — ${listing.kategorie} kaufen Schweiz`} />
          ) : (
            <WaffenIcon size={36} className="text-gray-300" />
          )}
          {imageCount > 0 && (
            <span className="absolute left-1.5 top-1.5 z-20 flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[11px] text-neutral-500">
              <Camera size={10} />{imageCount}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-3">
          <h3 className="truncate text-sm font-medium text-brand-dark">
            {listing.titel}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <p className="font-display text-xl font-bold text-green-700">
              CHF {listing.preis.toLocaleString("de-CH")}
            </p>
            {listing.verhandelbar && (
              <span className="text-xs text-neutral-400">VB</span>
            )}
          </div>
          <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={10} />{listing.kanton}
            </span>
            <span>{listing.datum}</span>
          </div>
        </div>
      </Link>
    );
  }

  // ── GRID VARIANT ──
  return (
    <Link href={href} onClick={saveScrollPosition} className="group flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", background: "#f8faf8" }}>
        {images.length > 0 ? (
          <ImageSlider images={images} alt={`${listing.titel} — ${listing.kategorie} kaufen Schweiz`} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <WaffenIcon size={48} className="text-gray-300" />
          </div>
        )}

        {/* New listing badge — only if created < 24h ago */}
        {listing.createdAt && (() => {
          const diffHours = (Date.now() - new Date(listing.createdAt).getTime()) / (1000 * 60 * 60);
          return diffHours < 24;
        })() && (
          <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-[#eef5e8] border border-[#4d8230] rounded-full px-2 py-0.5 text-[11px] font-semibold text-[#3a6224] shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#4d8230] rounded-full" />
            {t("badge_new_listing")}
          </div>
        )}

        {/* Top-right: star button */}
        <button
          onClick={handleFavClick}
          className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 hover:scale-110"
          aria-label={t("listing_favorite")}
        >
          <Star
            size={16}
            className={isFav ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title: 1 line truncate */}
        <h3 className="mb-1 truncate text-sm font-medium text-brand-dark">
          {listing.titel}
        </h3>

        {/* Price */}
        <div className="mb-2 flex items-baseline gap-1.5">
          <p className="font-display text-xl font-bold text-green-700">
            CHF {listing.preis.toLocaleString("de-CH")}
          </p>
          {listing.verhandelbar && (
            <span className="text-xs text-neutral-400">VB</span>
          )}
        </div>

        {/* Badges: good deal + price drop */}
        {((listing.goodDealCount ?? 0) >= 3 || (listing.priceChangePct ?? 0) <= -5) && (
          <div className="mb-2 flex flex-wrap gap-1">
            {(listing.goodDealCount ?? 0) >= 3 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                👍 {listing.goodDealCount}
              </span>
            )}
            {(listing.priceChangePct ?? 0) <= -5 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                ↓ {Math.round(listing.priceChangePct!)}%
              </span>
            )}
          </div>
        )}

        {/* Footer: location left, date right */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={10} className="text-gray-400" />{listing.kanton}
          </span>
          <span>{listing.datum}</span>
        </div>
      </div>
    </Link>
  );
}
