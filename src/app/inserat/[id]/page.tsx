"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  MapPin,
  Eye,
  Calendar,
  RefreshCw,
  Shield,
  CheckCircle,
  User,
  Award,
  Crosshair,
  Ruler,
  Layers,
  Box,
  Tag,
  ArrowLeft,
  MessageSquare,
  Share2,
  Flag,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ListingCard from "@/components/ui/ListingCard";
import ImageLightbox from "@/components/inserat/ImageLightbox";
import KontaktModal from "@/components/inserat/KontaktModal";
import MeldenModal from "@/components/inserat/MeldenModal";
import { apiListingToCard } from "@/lib/listing-helpers";
import { useLocale } from "@/lib/locale-context";

interface ListingData {
  id: string;
  titel: string;
  beschreibung: string;
  hauptkategorie: string;
  unterkategorie: string;
  rechtsstatus: string;
  marke: string;
  modell: string;
  kaliber: string;
  zustand: string;
  baujahr: string;
  lauflaenge: string;
  magazin: string;
  preis: number;
  verhandelbar: number;
  tausch: number;
  kanton: string;
  ortschaft: string;
  aufrufe: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  vorname: string;
  nachname: string;
  verkaeufer_typ: string;
  user_created_at: string;
  images: { id: string; url: string; position: number }[];
  source: string;
  source_url: string | null;
}

const RECHTS_MAP: Record<string, { label: string; variant: "amber" | "grey" | "red" }> = {
  frei: { label: "Frei", variant: "grey" },
  wes: { label: "WES", variant: "amber" },
  "abk-klein": { label: "ABK", variant: "red" },
  "abk-gross": { label: "ABK", variant: "red" },
  kaufvertrag: { label: "Frei", variant: "grey" },
};

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function InseratDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const { t } = useLocale();
  const id = params.id as string;

  const [listing, setListing] = useState<ListingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarListings, setSimilarListings] = useState<Record<string, unknown>[]>([]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [kontaktOpen, setKontaktOpen] = useState(false);
  const [meldenOpen, setMeldenOpen] = useState(false);
  const [isMerkliste, setIsMerkliste] = useState(false);
  const [beschreibungExpanded, setBeschreibungExpanded] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  // Fetch listing
  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);

        // Track view
        fetch(`/api/listings/${id}/view`);

        // Fetch similar
        fetch(`/api/listings?kategorie=${data.hauptkategorie}&limit=4`)
          .then((r) => r.json())
          .then((d) => {
            const similar = (d.listings || []).filter(
              (l: Record<string, unknown>) => l.id !== id
            );
            setSimilarListings(similar.slice(0, 4));
          });
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Check favorite status
  useEffect(() => {
    if (session?.user?.id && listing) {
      fetch(`/api/favorites?user_id=${session.user.id}`)
        .then((r) => r.json())
        .then((data) => {
          const favIds = (data.favorites || []).map((f: Record<string, unknown>) => f.id);
          setIsMerkliste(favIds.includes(listing.id));
        });
    }
  }, [session, listing]);

  const images = listing?.images?.map((img) => img.url) || [];
  if (images.length === 0 && listing) {
    images.push("/placeholder-weapon.svg");
  }

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxOpen || !images.length) return;
      if (e.key === "ArrowLeft") {
        setImageTransition(true);
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setImageTransition(true);
        setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    },
    [lightboxOpen, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (imageTransition) {
      const t = setTimeout(() => setImageTransition(false), 300);
      return () => clearTimeout(t);
    }
  }, [imageTransition, selectedImage]);

  const touchStartX = React.useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      setImageTransition(true);
      if (diff > 0) {
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else {
        setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    }
  }

  function selectImage(i: number) {
    setImageTransition(true);
    setSelectedImage(i);
  }

  async function toggleMerkliste() {
    if (!session?.user?.id) {
      window.location.href = "/login";
      return;
    }
    if (isMerkliste) {
      await fetch(`/api/favorites/${listing!.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id }),
      });
      setIsMerkliste(false);
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id, listing_id: listing!.id }),
      });
      setIsMerkliste(true);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold text-brand-dark">{t("detail_not_found")}</p>
        <Link href="/suche" className="text-brand-green hover:underline">
          {t("detail_back_search")}
        </Link>
      </div>
    );
  }

  const rechts = RECHTS_MAP[listing.rechtsstatus] || RECHTS_MAP.frei;
  const isExternal = !!listing.source && listing.source !== "gunmarket";
  const sourceName = listing.source === "gebrauchtwaffen" ? "gebrauchtwaffen.com" : listing.source === "nextgun" ? "nextgun.ch" : listing.source;
  const verkaeuferInitialen = isExternal
    ? sourceName.substring(0, 2).toUpperCase()
    : `${listing.vorname?.[0] || ""}${listing.nachname?.[0] || ""}`.toUpperCase();
  const verkaeuferName = isExternal ? sourceName : `${listing.vorname} ${listing.nachname?.[0]}.`;
  const mitgliedSeit = listing.user_created_at
    ? new Date(listing.user_created_at).toLocaleDateString("de-CH", { month: "long", year: "numeric" })
    : "";

  const SPECS = [
    { label: t("filter_brand"), value: listing.marke, icon: Tag },
    { label: "Modell", value: listing.modell, icon: Box },
    { label: t("filter_caliber"), value: listing.kaliber, icon: Crosshair },
    { label: t("filter_condition"), value: listing.zustand, icon: CheckCircle },
    { label: "Baujahr", value: listing.baujahr, icon: Calendar },
    { label: "Lauflänge", value: listing.lauflaenge, icon: Ruler },
    { label: "Magazin", value: listing.magazin, icon: Layers },
    { label: t("filter_category"), value: listing.unterkategorie, icon: Tag },
  ].filter((s) => s.value);

  return (
    <div className="bg-brand-grey min-h-screen pb-16 md:pb-16">
      {/* Back link + Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/suche"
            className="flex items-center gap-1 font-medium text-green-700 hover:underline"
          >
            <ArrowLeft size={14} />
            {t("listing_back")}
          </Link>
          <span className="text-gray-400">/</span>
          <nav className="flex items-center gap-1.5 text-neutral-500">
            <Link href="/" className="hover:text-brand-green transition-colors">
              {t("breadcrumb_home")}
            </Link>
            <ChevronRight size={14} className="text-neutral-300" />
            <Link
              href={`/suche?kategorie=${listing.hauptkategorie}`}
              className="hover:text-brand-green transition-colors"
            >
              {listing.hauptkategorie}
            </Link>
            <ChevronRight size={14} className="text-neutral-300" />
            <span className="text-brand-dark font-medium">{listing.titel}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* External listing banner */}
        {isExternal && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <ExternalLink size={20} className="shrink-0 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800">
                {t("detail_external_from")} <strong>{sourceName}</strong>
              </p>
              <p className="text-xs text-blue-600">
                {t("detail_external_hint")}
              </p>
            </div>
            {listing.source_url && (
              <a
                href={`/weiterleitung?url=${encodeURIComponent(listing.source_url)}&titel=${encodeURIComponent(listing.titel)}`}
                className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                {t("detail_view_original")}
              </a>
            )}
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left column (60%) */}
          <div className="lg:w-[60%] animate-fade-in">
            {/* Photo gallery */}
            <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm">
              <div
                className="relative cursor-pointer"
                onClick={() => images.length > 0 && setLightboxOpen(true)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {images.length > 0 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={images[selectedImage]}
                    alt={listing.titel}
                    className={`h-[400px] w-full object-cover transition-opacity duration-300 ${imageTransition ? "opacity-0" : "opacity-100"}`}
                  />
                ) : (
                  <div className="flex h-[400px] w-full items-center justify-center bg-gray-100 text-gray-300">
                    {t("detail_no_image")}
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
                      {selectedImage + 1} / {images.length}
                    </span>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => selectImage(i)}
                      className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        i === selectedImage
                          ? "border-brand-green shadow-md"
                          : "border-transparent hover:border-brand-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Bild ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + badges */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-3 flex flex-wrap items-start gap-2">
                <Badge variant={rechts.variant} size="md">
                  {rechts.label}
                </Badge>
              </div>
              <h1 className="mb-2 font-display text-2xl font-black uppercase text-brand-dark md:text-3xl">
                {listing.titel}
              </h1>
            </div>

            {/* Specifications */}
            {SPECS.length > 0 && (
              <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-display text-lg font-bold uppercase text-brand-dark">
                  {t("detail_specs")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {SPECS.map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-light">
                        <spec.icon size={16} className="text-brand-green" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">{spec.label}</p>
                        <p className="text-sm font-medium text-brand-dark">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-display text-lg font-bold uppercase text-brand-dark">
                {t("detail_description")}
              </h2>
              <p
                className={`text-sm leading-relaxed text-neutral-600 ${!beschreibungExpanded ? "line-clamp-5" : ""}`}
              >
                {listing.beschreibung}
              </p>
              {listing.beschreibung.length > 300 && (
                <button
                  onClick={() => setBeschreibungExpanded(!beschreibungExpanded)}
                  className="mt-2 text-sm font-medium text-brand-green hover:underline"
                >
                  {beschreibungExpanded ? t("detail_show_less") : t("detail_show_more")}
                </button>
              )}
            </div>
          </div>

          {/* Right column (40%) */}
          <div className="lg:w-[40%] animate-slide-in">
            <div className="lg:sticky lg:top-16 space-y-4">
              {/* Price */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-4xl font-bold text-amber-600">
                    CHF {listing.preis.toLocaleString("de-CH")}.–
                  </p>
                  {listing.verhandelbar === 1 && (
                    <Badge variant="amber" size="sm">
                      VB
                    </Badge>
                  )}
                </div>
              </div>

              {/* Contact */}
              {isExternal && listing.source_url ? (
                <a
                  href={`/weiterleitung?url=${encodeURIComponent(listing.source_url)}&titel=${encodeURIComponent(listing.titel)}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <ExternalLink size={20} />
                  {t("detail_view_on").replace("{source}", sourceName || "")}
                </a>
              ) : isExternal ? (
                <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 py-3 text-sm text-neutral-500">
                  <ExternalLink size={16} />
                  {t("detail_external_contact")} {sourceName}
                </div>
              ) : (
                <button
                  onClick={() => setKontaktOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <MessageSquare size={20} />
                  {t("detail_send_message")}
                </button>
              )}

              {/* Seller */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                {isExternal ? (
                  <>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-display text-lg font-bold text-white">
                        <ExternalLink size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-dark">{sourceName}</p>
                        <span className="text-sm text-neutral-500">{t("detail_external_listing")}</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500">
                      Dieses Inserat wird automatisch von {sourceName} importiert. Verkäufer-Kontakt nur über die Originalseite.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green font-display text-lg font-bold text-white">
                        {verkaeuferInitialen}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-dark">{verkaeuferName}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-neutral-500">
                            {listing.verkaeufer_typ === "Händler" ? t("reg_dealer") : t("detail_private_user")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <User size={14} />
                      {t("detail_active_since")} {mitgliedSeit}
                    </div>
                  </>
                )}
              </div>

              {/* Share + Report */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: listing.titel, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-2 text-sm text-neutral-600 transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  <Share2 size={14} />
                  {t("detail_share")}
                </button>
                <button
                  onClick={() => setMeldenOpen(true)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-2 text-sm text-neutral-600 transition-colors hover:border-red-300 hover:text-red-600"
                >
                  <Flag size={14} />
                  {t("detail_report")}
                </button>
              </div>

              {/* Watchlist */}
              <button
                onClick={toggleMerkliste}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all duration-200 touch-target ${
                  isMerkliste
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-brand-border bg-white text-neutral-600 hover:border-brand-green hover:text-brand-green"
                }`}
              >
                <Heart size={18} fill={isMerkliste ? "currentColor" : "none"} />
                {isMerkliste ? t("detail_watchlist_remove") : t("detail_watchlist_add")}
              </button>

              {/* Location */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  <MapPin size={16} className="text-brand-green" />
                  {t("listing_location")}
                </h3>
                <p className="mb-3 text-sm text-neutral-600">
                  {listing.ortschaft}, {t("filter_canton")} {listing.kanton}
                </p>
                <div className="h-40 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-neutral-400">
                  {t("detail_loading_map")}
                </div>
              </div>

              {/* Safety */}
              <div className="rounded-xl bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <Shield size={18} className="mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">{t("detail_safety_title")}</p>
                    <p className="mt-1 text-xs text-amber-700">
                      {t("detail_safety_text")}{" "}
                      <Link href="/sicherheit" className="font-medium underline hover:no-underline">
                        {t("detail_safety_more")}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 text-xs text-neutral-500 shadow-sm">
          <span className="flex items-center gap-1">
            <Award size={14} />
            {listing.id.slice(0, 8).toUpperCase()}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} />
            {listing.aufrufe} {t("detail_views")}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {t("detail_listed")} {formatDate(listing.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw size={14} />
            {t("detail_updated")} {formatDate(listing.updated_at)}
          </span>
        </div>

        {/* Similar */}
        {similarListings.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase text-brand-dark">
              {t("detail_similar")}
            </h2>
            <div className="snap-scroll scrollbar-hide flex gap-4 overflow-x-auto pb-4">
              {similarListings.map((l) => {
                const card = apiListingToCard(l);
                return (
                  <div key={card.id} className="w-72 shrink-0 snap-start">
                    <Link href={`/inserat/${card.id}`}>
                      <ListingCard listing={card} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-border bg-white p-3 shadow-lg md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-display text-lg font-bold text-amber-600">
              CHF {listing.preis.toLocaleString("de-CH")}.–
            </p>
          </div>
          {isExternal && listing.source_url ? (
            <a
              href={`/weiterleitung?url=${encodeURIComponent(listing.source_url)}&titel=${encodeURIComponent(listing.titel)}`}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white touch-target"
            >
              <ExternalLink size={16} />
              {t("detail_view_on").replace("{source}", sourceName || "")}
            </a>
          ) : !isExternal ? (
            <button
              onClick={() => setKontaktOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white touch-target"
            >
              <MessageSquare size={16} />
              {t("detail_send_message")}
            </button>
          ) : null}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <ImageLightbox
          images={images}
          currentIndex={selectedImage}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setSelectedImage}
        />
      )}

      {/* Contact Modal */}
      {kontaktOpen && (
        <KontaktModal
          inseratTitel={listing.titel}
          verkaeuferName={verkaeuferName}
          onClose={() => setKontaktOpen(false)}
          listingId={listing.id}
          sellerId={listing.user_id}
        />
      )}

      {/* Report Modal */}
      {meldenOpen && (
        <MeldenModal inseratId={listing.id} onClose={() => setMeldenOpen(false)} />
      )}
    </div>
  );
}
