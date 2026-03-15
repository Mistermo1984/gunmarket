"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Camera, ExternalLink } from "lucide-react";
import { PistolenIcon, RepetierIcon, BockflinteIcon, OptikIcon } from "@/components/ui/WeaponIcons";

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
}

const waffenIconMap = {
  kurzwaffe: PistolenIcon,
  langwaffe: RepetierIcon,
  flinte: BockflinteIcon,
  zubehoer: OptikIcon,
};

interface ListingCardProps {
  listing: ListingCardData;
  variant?: "grid" | "list";
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

export default function ListingCard({ listing, variant = "grid", onFavoriteToggle }: ListingCardProps) {
  const WaffenIcon = waffenIconMap[listing.waffenTyp];
  const [isFav, setIsFav] = useState(false);

  function handleFavClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(!isFav);
    onFavoriteToggle?.(listing.id, !isFav);
  }

  const imageCount = listing.bildAnzahl ?? 3;
  const isExternal = !!listing.source && listing.source !== "gunmarket";
  const sourceName = listing.source === "waffengebraucht" ? "waffengebraucht.ch" : listing.source === "nextgun" ? "nextgun.ch" : listing.source;

  const href = `/inserat/${listing.id}`;

  // ── LIST VARIANT ──
  if (variant === "list") {
    return (
      <Link href={href} className="group flex overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
        {/* Photo */}
        <div className="relative flex h-[100px] w-[120px] shrink-0 items-center justify-center overflow-hidden bg-gray-100">
          {listing.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={listing.imageUrl} alt={listing.titel} className="h-full w-full object-cover" />
          ) : (
            <WaffenIcon size={36} className="text-gray-300" />
          )}
          {isExternal ? (
            <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
              <ExternalLink size={9} />extern
            </span>
          ) : (
            <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] text-neutral-500">
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
    <Link href={href} className="group flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {listing.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={listing.imageUrl} alt={listing.titel} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <WaffenIcon size={48} className="text-gray-300" />
          </div>
        )}

        {/* Top-left badge */}
        {isExternal ? (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <ExternalLink size={10} />{sourceName}
          </span>
        ) : (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] text-neutral-500 backdrop-blur-sm">
            <Camera size={10} />{imageCount}
          </span>
        )}

        {/* Top-right: star button */}
        <button
          onClick={handleFavClick}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 hover:scale-110"
          aria-label="Merken"
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
