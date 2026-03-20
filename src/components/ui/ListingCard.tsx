"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Camera, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
  }

  const images = listing.imageUrls && listing.imageUrls.length > 0
    ? listing.imageUrls
    : listing.imageUrl
      ? [listing.imageUrl]
      : [];
  const imageCount = listing.bildAnzahl ?? images.length;
  const isExternal = !!listing.source && listing.source !== "gunmarket";
  const sourceName = listing.source === "gebrauchtwaffen" ? "gebrauchtwaffen.com" : listing.source === "nextgun" ? "nextgun.ch" : listing.source;

  const href = `/inserat/${listing.id}`;

  // ── LIST VARIANT ──
  if (variant === "list") {
    return (
      <Link href={href} className="group flex overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
        {/* Photo */}
        <div className="relative flex shrink-0 items-center justify-center overflow-hidden" style={{ width: 120, height: 90, background: "#f8faf8" }}>
          {images.length > 0 ? (
            <ImageSlider images={images} alt={listing.titel} />
          ) : (
            <WaffenIcon size={36} className="text-gray-300" />
          )}
          {isExternal ? (
            <span className="absolute left-1.5 top-1.5 z-20 flex items-center gap-1 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
              <ExternalLink size={9} />extern
            </span>
          ) : imageCount > 0 ? (
            <span className="absolute left-1.5 top-1.5 z-20 flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] text-neutral-500">
              <Camera size={10} />{imageCount}
            </span>
          ) : null}
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
    <Link href={href} className="group flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", background: "#f8faf8" }}>
        {images.length > 0 ? (
          <ImageSlider images={images} alt={listing.titel} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <WaffenIcon size={48} className="text-gray-300" />
          </div>
        )}

        {/* Top-left badge */}
        {isExternal ? (
          <span className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <ExternalLink size={10} />{sourceName}
          </span>
        ) : imageCount > 0 ? (
          <span className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] text-neutral-500 backdrop-blur-sm">
            <Camera size={10} />{imageCount}
          </span>
        ) : null}

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
