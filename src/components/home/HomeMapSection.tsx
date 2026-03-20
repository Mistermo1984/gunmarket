"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import type { MapHandle, MapMarker } from "./HomeMapView";

// Lazy-load map only on client
import dynamic from "next/dynamic";
const HomeMapView = dynamic(() => import("./HomeMapView"), { ssr: false });

// ─── Canton data ────────────────────────────────────────────────

const KANTONE = [
  { abbr: "ZH", label: "Zürich" },
  { abbr: "BE", label: "Bern" },
  { abbr: "LU", label: "Luzern" },
  { abbr: "UR", label: "Uri" },
  { abbr: "SZ", label: "Schwyz" },
  { abbr: "OW", label: "Obwalden" },
  { abbr: "NW", label: "Nidwalden" },
  { abbr: "GL", label: "Glarus" },
  { abbr: "ZG", label: "Zug" },
  { abbr: "FR", label: "Freiburg" },
  { abbr: "SO", label: "Solothurn" },
  { abbr: "BS", label: "Basel-Stadt" },
  { abbr: "BL", label: "Basel-Land" },
  { abbr: "SH", label: "Schaffhausen" },
  { abbr: "AR", label: "Appenzell A.Rh." },
  { abbr: "AI", label: "Appenzell I.Rh." },
  { abbr: "SG", label: "St. Gallen" },
  { abbr: "GR", label: "Graubünden" },
  { abbr: "AG", label: "Aargau" },
  { abbr: "TG", label: "Thurgau" },
  { abbr: "TI", label: "Tessin" },
  { abbr: "VD", label: "Waadt" },
  { abbr: "VS", label: "Wallis" },
  { abbr: "NE", label: "Neuenburg" },
  { abbr: "GE", label: "Genf" },
  { abbr: "JU", label: "Jura" },
];

const CANTON_NAME_TO_ABBR: Record<string, string> = {
  "Zürich": "ZH", "Bern": "BE", "Luzern": "LU", "Uri": "UR", "Schwyz": "SZ",
  "Obwalden": "OW", "Nidwalden": "NW", "Glarus": "GL", "Zug": "ZG", "Freiburg": "FR",
  "Solothurn": "SO", "Basel-Stadt": "BS", "Basel-Landschaft": "BL", "Schaffhausen": "SH",
  "Appenzell A.": "AR", "Appenzell I.": "AI", "St. Gallen": "SG", "Graubünden": "GR",
  "Aargau": "AG", "Thurgau": "TG", "Tessin": "TI", "Waadt": "VD", "Wallis": "VS",
  "Neuenburg": "NE", "Genf": "GE", "Jura": "JU",
};

const CANTON_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ZH: { lat: 47.41, lng: 8.65, zoom: 11 }, BE: { lat: 46.95, lng: 7.45, zoom: 10 },
  LU: { lat: 47.05, lng: 8.30, zoom: 11 }, UR: { lat: 46.88, lng: 8.63, zoom: 11 },
  SZ: { lat: 47.02, lng: 8.65, zoom: 11 }, OW: { lat: 46.87, lng: 8.25, zoom: 12 },
  NW: { lat: 46.93, lng: 8.38, zoom: 12 }, GL: { lat: 46.98, lng: 9.07, zoom: 12 },
  ZG: { lat: 47.17, lng: 8.52, zoom: 12 }, FR: { lat: 46.80, lng: 7.15, zoom: 11 },
  SO: { lat: 47.21, lng: 7.53, zoom: 11 }, BS: { lat: 47.56, lng: 7.59, zoom: 12 },
  BL: { lat: 47.48, lng: 7.73, zoom: 11 }, SH: { lat: 47.70, lng: 8.63, zoom: 12 },
  AR: { lat: 47.37, lng: 9.28, zoom: 12 }, AI: { lat: 47.31, lng: 9.41, zoom: 13 },
  SG: { lat: 47.42, lng: 9.37, zoom: 11 }, GR: { lat: 46.66, lng: 9.58, zoom: 9 },
  AG: { lat: 47.39, lng: 8.16, zoom: 11 }, TG: { lat: 47.55, lng: 9.00, zoom: 11 },
  TI: { lat: 46.17, lng: 8.80, zoom: 10 }, VD: { lat: 46.57, lng: 6.56, zoom: 10 },
  VS: { lat: 46.20, lng: 7.54, zoom: 10 }, NE: { lat: 46.99, lng: 6.93, zoom: 11 },
  GE: { lat: 46.21, lng: 6.14, zoom: 12 }, JU: { lat: 47.36, lng: 7.24, zoom: 11 },
};

// ─── Types ──────────────────────────────────────────────────────

interface Listing {
  id: string;
  titel: string;
  preis: number;
  zustand: string;
  kanton: string;
  rechtsstatus: string;
  ortschaft: string;
  image_url: string | null;
  hauptkategorie?: string;
  lat?: number;
  lng?: number;
}

// ─── Component ──────────────────────────────────────────────────

export default function HomeMapSection() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [selectedKantone, setSelectedKantone] = useState<Set<string>>(new Set());
  const [kantonCounts, setKantonCounts] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  const mapHandleRef = useRef<MapHandle>(null);

  // Client-side mount check
  useEffect(() => { setMounted(true); }, []);

  // Fetch listings — wrapped in try/catch, never crashes component
  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const res = await fetch("/api/listings/map");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const raw = Array.isArray(data?.markers) ? data.markers : [];
        const listings: Listing[] = raw.map((l: Record<string, unknown>) => ({
          id: String(l.id || ""),
          titel: String(l.titel || ""),
          preis: Number(l.preis) || 0,
          zustand: String(l.zustand || ""),
          kanton: String(l.kanton || ""),
          rechtsstatus: String(l.rechtsstatus || ""),
          ortschaft: String(l.ortschaft || ""),
          hauptkategorie: String(l.hauptkategorie || ""),
          image_url: (l.image_url as string) || null,
          lat: Number(l.lat) || 0,
          lng: Number(l.lng) || 0,
        }));
        setAllListings(listings);
        const counts: Record<string, number> = {};
        for (const m of listings) {
          if (m.kanton) {
            const abbr = CANTON_NAME_TO_ABBR[m.kanton];
            if (abbr) counts[abbr] = (counts[abbr] || 0) + 1;
          }
        }
        setKantonCounts(counts);
      } catch (err) {
        console.error("HomeMapSection: fetch failed", err);
        // Don't crash — just show empty map
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  // Canton-filtered listings
  const filtered = useMemo(() => {
    if (selectedKantone.size === 0) return allListings;
    return allListings.filter((m) => {
      const abbr = CANTON_NAME_TO_ABBR[m.kanton];
      return abbr && selectedKantone.has(abbr);
    });
  }, [allListings, selectedKantone]);

  // Map markers
  const mapMarkers: MapMarker[] = useMemo(
    () => filtered.filter((l) => l.lat && l.lng).map((l) => ({
      id: l.id, titel: l.titel, preis: l.preis, lat: l.lat!, lng: l.lng!,
      rechtsstatus: l.rechtsstatus, image_url: l.image_url,
    })),
    [filtered]
  );

  // Canton click — simple toggle + fly
  function handleKantonClick(abbr: string) {
    setSelectedKantone((prev) => {
      const next = new Set(prev);
      if (next.has(abbr)) next.delete(abbr); else next.add(abbr);

      if (next.size === 1) {
        const single = Array.from(next)[0];
        const center = CANTON_CENTERS[single];
        if (center) mapHandleRef.current?.flyTo(center.lat, center.lng, center.zoom);
      } else {
        mapHandleRef.current?.resetView();
      }
      return next;
    });
  }

  function handleReset() {
    setSelectedKantone(new Set());
    mapHandleRef.current?.resetView();
  }

  // Cluster click — no-op for now (stable version)
  const handleClusterClick = useCallback(() => {}, []);

  // Canton list sorted by count
  const sortedKantone = KANTONE
    .filter((k) => (kantonCounts[k.abbr] || 0) > 0)
    .sort((a, b) => (kantonCounts[b.abbr] || 0) - (kantonCounts[a.abbr] || 0));

  const selCount = selectedKantone.size;
  const searchLink = selCount > 0 ? `/suche?kanton=${Array.from(selectedKantone).join(",")}` : "/suche";

  let locationLabel = "Schweizweit";
  if (selCount === 1) {
    locationLabel = KANTONE.find((k) => k.abbr === Array.from(selectedKantone)[0])?.label || "";
  } else if (selCount > 1) {
    locationLabel = `${selCount} Kantone`;
  }

  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: "#f8faf8", minHeight: 400 }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#16a34a]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
                Inserate auf der Karte
              </span>
            </div>
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1a2e1a] md:text-3xl">
              Waffen <span className="text-[#16a34a]">in deiner Nähe</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500">
            <span className="font-bold text-[#16a34a]">{filtered.length.toLocaleString("de-CH")}</span>{" "}
            Inserate — {locationLabel}
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left: Canton filter */}
          <div className="shrink-0 lg:w-[240px]">
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "#e5e7eb" }}>
              <h3 className="mb-3 text-sm font-semibold text-[#1a2e1a]">Nach Kanton filtern</h3>
              <button
                onClick={handleReset}
                className="mb-3 w-full rounded-lg bg-[#16a34a] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#15803d]"
              >
                Alle Kantone
              </button>
              {selCount > 0 && (
                <p className="mb-2 text-[11px] font-medium text-neutral-500">
                  {selCount} {selCount === 1 ? "Kanton" : "Kantone"} ausgewählt
                </p>
              )}
              <div
                className="flex gap-1.5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-1.5 lg:overflow-y-auto lg:overflow-x-visible"
                style={{ maxHeight: 500, scrollbarWidth: "thin", scrollbarColor: "#16a34a #f3f4f6" }}
              >
                {sortedKantone.map((k) => {
                  const count = kantonCounts[k.abbr] || 0;
                  const isSelected = selectedKantone.has(k.abbr);
                  return (
                    <button
                      key={k.abbr}
                      onClick={() => handleKantonClick(k.abbr)}
                      className={`flex w-full shrink-0 items-center justify-between rounded-lg px-2 py-1.5 text-[11px] transition-colors ${
                        isSelected
                          ? "bg-[#16a34a] text-white"
                          : "bg-[#f8faf8] text-[#374151] hover:bg-[#f0fdf4]"
                      }`}
                    >
                      <span className="truncate font-medium">{k.label}</span>
                      <span
                        className={`ml-1 shrink-0 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-[#dcfce7] text-[#16a34a]"
                        }`}
                        style={{ minWidth: 28 }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selCount > 0 && (
                <Link
                  href={searchLink}
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-[#f0fdf4] px-3 py-2 text-xs font-semibold text-[#16a34a] hover:bg-[#dcfce7]"
                >
                  Alle Inserate anzeigen
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* Right: Map only */}
          <div
            className="relative flex-1 overflow-hidden rounded-xl border bg-[#f1f5f1]"
            style={{ borderColor: "#e5e7eb", height: 600 }}
          >
            {mounted ? (
              <HomeMapView
                ref={mapHandleRef}
                markers={mapMarkers}
                onClusterClick={handleClusterClick}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#16a34a] border-t-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
