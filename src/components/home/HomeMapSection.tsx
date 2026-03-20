"use client";

import React, { useState, useEffect, useMemo, useRef, lazy, Suspense, useCallback } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, PackageOpen, X } from "lucide-react";
import type { MapHandle, MapMarker } from "./HomeMapView";

const HomeMapView = lazy(() => import("./HomeMapView"));

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

// ─── Filters & badges ───────────────────────────────────────────

const KATEGORIE_FILTERS = [
  { value: "", label: "Alle" },
  { value: "kurzwaffen", label: "Kurzwaffen" },
  { value: "buechsen", label: "Büchsen" },
  { value: "flinten", label: "Flinten" },
  { value: "jagdwaffen", label: "Jagdwaffen" },
  { value: "ordonnanzwaffen", label: "Ordonnanz" },
  { value: "optik", label: "Optik" },
];

const PREIS_FILTERS = [
  { value: "", label: "Alle" },
  { value: "0-500", label: "< 500" },
  { value: "500-1500", label: "500–1'500" },
  { value: "1500-3000", label: "1'500–3'000" },
  { value: "3000-999999", label: "3'000+" },
];

const RECHTS_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  frei: { label: "Frei", bg: "#dcfce7", text: "#166534" },
  wes: { label: "WES", bg: "#fef9c3", text: "#854d0e" },
  kaufvertrag: { label: "Kaufvertrag", bg: "#dbeafe", text: "#1e40af" },
  "abk-klein": { label: "ABK", bg: "#fee2e2", text: "#991b1b" },
  "abk-gross": { label: "ABK", bg: "#fee2e2", text: "#991b1b" },
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
  const [loading, setLoading] = useState(true);
  const [kantonCounts, setKantonCounts] = useState<Record<string, number>>({});
  const [katFilter, setKatFilter] = useState("");
  const [preisFilter, setPreisFilter] = useState("");

  // Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelLabel, setPanelLabel] = useState("");
  const [clusterMarkerIds, setClusterMarkerIds] = useState<Set<string> | null>(null);

  const mapHandleRef = useRef<MapHandle>(null);

  // Fetch listings
  useEffect(() => {
    fetch("/api/listings/map")
      .then((r) => r.json())
      .then((data) => {
        try {
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
        } catch { /* ignore */ }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Canton-filtered listings
  const cantonFiltered = useMemo(() => {
    if (selectedKantone.size === 0) return allListings;
    return allListings.filter((m) => {
      const abbr = CANTON_NAME_TO_ABBR[m.kanton];
      return abbr && selectedKantone.has(abbr);
    });
  }, [allListings, selectedKantone]);

  // Quick-filter
  const fullyFiltered = useMemo(() => {
    let result = cantonFiltered;
    if (katFilter) result = result.filter((l) => l.hauptkategorie === katFilter);
    if (preisFilter) {
      const [min, max] = preisFilter.split("-").map(Number);
      result = result.filter((l) => l.preis >= min && l.preis <= max);
    }
    return result;
  }, [cantonFiltered, katFilter, preisFilter]);

  // Panel listings: cluster subset or full canton-filtered
  const panelListings = useMemo(() => {
    if (clusterMarkerIds) return fullyFiltered.filter((l) => clusterMarkerIds.has(l.id));
    return fullyFiltered;
  }, [fullyFiltered, clusterMarkerIds]);

  const displayPanel = panelListings.slice(0, 50);

  // Map markers
  const mapMarkers: MapMarker[] = useMemo(
    () => fullyFiltered.filter((l) => l.lat && l.lng).map((l) => ({
      id: l.id, titel: l.titel, preis: l.preis, lat: l.lat!, lng: l.lng!,
      rechtsstatus: l.rechtsstatus, image_url: l.image_url,
    })),
    [fullyFiltered]
  );

  // Canton click
  function handleKantonClick(abbr: string) {
    setClusterMarkerIds(null);
    setKatFilter("");
    setPreisFilter("");
    setSelectedKantone((prev) => {
      const next = new Set(prev);
      if (next.has(abbr)) next.delete(abbr); else next.add(abbr);

      if (next.size === 1) {
        const single = Array.from(next)[0];
        const center = CANTON_CENTERS[single];
        if (center) mapHandleRef.current?.flyTo(center.lat, center.lng, center.zoom);
        setPanelLabel(KANTONE.find((k) => k.abbr === single)?.label || single);
        setPanelOpen(true);
      } else if (next.size > 1) {
        mapHandleRef.current?.resetView();
        setPanelLabel(`${next.size} Kantone`);
        setPanelOpen(true);
      } else {
        mapHandleRef.current?.resetView();
        setPanelOpen(false);
        setPanelLabel("");
      }
      // Resize map after panel toggle
      setTimeout(() => mapHandleRef.current?.invalidateSize(), 150);
      return next;
    });
  }

  function handleReset() {
    setSelectedKantone(new Set());
    setKatFilter("");
    setPreisFilter("");
    setPanelOpen(false);
    setPanelLabel("");
    setClusterMarkerIds(null);
    mapHandleRef.current?.resetView();
    setTimeout(() => mapHandleRef.current?.invalidateSize(), 150);
  }

  function handleClosePanel() {
    setPanelOpen(false);
    setClusterMarkerIds(null);
    setTimeout(() => mapHandleRef.current?.invalidateSize(), 150);
  }

  // Cluster click
  const handleClusterClick = useCallback((markerIds: string[]) => {
    setClusterMarkerIds(new Set(markerIds));
    setPanelLabel(`${markerIds.length} Inserate`);
    setPanelOpen(true);
    setTimeout(() => mapHandleRef.current?.invalidateSize(), 150);
  }, []);

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
    <section className="py-10 md:py-14" style={{ backgroundColor: "#f8faf8" }}>
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
            <span className="font-bold text-[#16a34a]">{fullyFiltered.length.toLocaleString("de-CH")}</span>{" "}
            Inserate — {locationLabel}
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left: Canton filter (25%) */}
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
            </div>
          </div>

          {/* Right: Map + Panel */}
          <div
            className="relative flex-1 overflow-hidden rounded-xl border"
            style={{ borderColor: "#e5e7eb", height: 600 }}
          >
            {/* Map container — shrinks when panel is open */}
            <div
              className="absolute inset-0 transition-[right] duration-300 ease-in-out"
              style={{ right: panelOpen ? 340 : 0 }}
            >
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center bg-[#f1f5f1]">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#16a34a] border-t-transparent" />
                  </div>
                }
              >
                <HomeMapView
                  ref={mapHandleRef}
                  markers={mapMarkers}
                  onClusterClick={handleClusterClick}
                />
              </Suspense>
            </div>

            {/* Listing panel — right edge, 340px */}
            <div
              className="absolute bottom-0 top-0 hidden flex-col bg-white lg:flex"
              style={{
                width: 340,
                right: panelOpen ? 0 : -340,
                borderLeft: "1px solid #e5e7eb",
                transition: "right 0.3s ease-in-out",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "#e5e7eb" }}>
                <div>
                  <p className="text-[13px] font-bold text-[#1a2e1a]">
                    {panelListings.length.toLocaleString("de-CH")} Inserate
                  </p>
                  <p className="text-[11px] text-neutral-400">{panelLabel}</p>
                </div>
                <button
                  onClick={handleClosePanel}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-[#f3f4f6] hover:text-neutral-600"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Quick filter pills */}
              {panelListings.length > 20 && (
                <div className="border-b px-4 py-2.5" style={{ borderColor: "#f3f4f6" }}>
                  <div className="mb-1.5 flex flex-wrap gap-1">
                    {KATEGORIE_FILTERS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setKatFilter(f.value)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                          katFilter === f.value
                            ? "bg-[#16a34a] text-white"
                            : "bg-[#f3f4f6] text-[#374151] hover:bg-[#dcfce7]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {PREIS_FILTERS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setPreisFilter(f.value)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                          preisFilter === f.value
                            ? "bg-[#16a34a] text-white"
                            : "bg-[#f3f4f6] text-[#374151] hover:bg-[#dcfce7]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Scrollable listing cards */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#16a34a #f3f4f6" }}
              >
                {loading ? (
                  <div>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 border-b px-4 py-2.5" style={{ borderColor: "#f3f4f6" }}>
                        <div className="h-14 w-14 shrink-0 animate-pulse rounded-md bg-[#f3f4f6]" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-3/4 animate-pulse rounded bg-[#f3f4f6]" />
                          <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#f3f4f6]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : displayPanel.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <PackageOpen size={32} className="mb-2 text-neutral-300" />
                    <p className="text-xs font-medium text-neutral-500">Keine Inserate</p>
                    <p className="mt-0.5 text-[10px] text-neutral-400">Filter ändern oder anderen Kanton wählen</p>
                  </div>
                ) : (
                  <div>
                    {displayPanel.map((l) => {
                      const rs = RECHTS_BADGE[l.rechtsstatus] || { label: l.rechtsstatus || "—", bg: "#f3f4f6", text: "#374151" };
                      return (
                        <a
                          key={l.id}
                          href={`/inserat/${l.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 border-b px-4 py-2.5 transition-colors hover:border-l-[3px] hover:border-l-[#16a34a] hover:bg-[#f0fdf4]"
                          style={{ borderBottomColor: "#f3f4f6" }}
                        >
                          {/* Image 56x56 */}
                          {l.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={l.image_url}
                              alt=""
                              className="h-14 w-14 shrink-0 rounded-md object-cover"
                              style={{ borderRadius: 6 }}
                            />
                          ) : (
                            <div
                              className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#f3f4f6] text-neutral-300"
                              style={{ borderRadius: 6 }}
                            >
                              <PackageOpen size={18} />
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold text-[#1a2e1a] group-hover:text-[#16a34a]">
                              {l.titel}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-neutral-400">
                              {l.ortschaft}{l.kanton ? `, ${l.kanton}` : ""}
                            </p>
                            <div className="mt-1 flex items-center gap-1.5">
                              <span
                                className="inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold"
                                style={{ backgroundColor: rs.bg, color: rs.text }}
                              >
                                {rs.label}
                              </span>
                            </div>
                          </div>

                          {/* Price right-aligned */}
                          <span className="shrink-0 text-[13px] font-bold text-[#16a34a]">
                            {l.preis > 0 ? `CHF ${l.preis.toLocaleString("de-CH")}` : "Anfrage"}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {panelListings.length > 50 && (
                <div className="border-t px-4 py-3" style={{ borderColor: "#e5e7eb" }}>
                  <Link
                    href={searchLink}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#16a34a] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#15803d]"
                  >
                    Alle {panelListings.length.toLocaleString("de-CH")} Inserate
                    <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: listing cards below map */}
        {panelOpen && (
          <div className="mt-4 lg:hidden">
            <div className="rounded-xl border bg-white" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "#f3f4f6" }}>
                <p className="text-xs font-bold text-[#1a2e1a]">
                  {panelListings.length.toLocaleString("de-CH")} Inserate — {panelLabel}
                </p>
                <button onClick={handleClosePanel} className="text-neutral-400 hover:text-neutral-600">
                  <X size={14} />
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "#f3f4f6" }}>
                {displayPanel.slice(0, 10).map((l) => {
                  const rs = RECHTS_BADGE[l.rechtsstatus] || { label: l.rechtsstatus || "—", bg: "#f3f4f6", text: "#374151" };
                  return (
                    <a
                      key={l.id}
                      href={`/inserat/${l.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-[#f0fdf4]"
                    >
                      {l.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={l.image_url} alt="" className="h-14 w-14 shrink-0 rounded-md object-cover" />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#f3f4f6] text-neutral-300">
                          <PackageOpen size={18} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#1a2e1a]">{l.titel}</p>
                        <p className="mt-0.5 text-xs text-neutral-400">{l.ortschaft}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: rs.bg, color: rs.text }}>
                            {rs.label}
                          </span>
                          <span className="text-sm font-bold text-[#16a34a]">
                            {l.preis > 0 ? `CHF ${l.preis.toLocaleString("de-CH")}` : "Anfrage"}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="shrink-0 text-neutral-300" />
                    </a>
                  );
                })}
              </div>
              {panelListings.length > 10 && (
                <div className="border-t px-3 py-2.5" style={{ borderColor: "#f3f4f6" }}>
                  <Link
                    href={searchLink}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[#f0fdf4] px-3 py-2 text-xs font-semibold text-[#16a34a] hover:bg-[#dcfce7]"
                  >
                    Alle {panelListings.length.toLocaleString("de-CH")} anzeigen
                    <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
