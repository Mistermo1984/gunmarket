"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const HomeMapView = dynamic(() => import("./HomeMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-xl bg-white text-sm text-neutral-400">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#16a34a] border-t-transparent" />
        Karte wird geladen...
      </div>
    </div>
  ),
});

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

// Map DB canton names → abbreviation
const CANTON_NAME_TO_ABBR: Record<string, string> = {
  "Zürich": "ZH", "Bern": "BE", "Luzern": "LU", "Uri": "UR", "Schwyz": "SZ",
  "Obwalden": "OW", "Nidwalden": "NW", "Glarus": "GL", "Zug": "ZG", "Freiburg": "FR",
  "Solothurn": "SO", "Basel-Stadt": "BS", "Basel-Landschaft": "BL", "Schaffhausen": "SH",
  "Appenzell A.": "AR", "Appenzell I.": "AI", "St. Gallen": "SG", "Graubünden": "GR",
  "Aargau": "AG", "Thurgau": "TG", "Tessin": "TI", "Waadt": "VD", "Wallis": "VS",
  "Neuenburg": "NE", "Genf": "GE", "Jura": "JU",
};

export interface MapMarker {
  id: string;
  titel: string;
  preis: number;
  lat: number;
  lng: number;
  zustand: string;
  kanton: string;
  rechtsstatus: string;
  ortschaft: string;
  image_url: string | null;
}

export default function HomeMapSection() {
  const [allMarkers, setAllMarkers] = useState<MapMarker[]>([]);
  const [selectedKantone, setSelectedKantone] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [kantonCounts, setKantonCounts] = useState<Record<string, number>>({});

  // Fetch all markers once on mount
  useEffect(() => {
    fetch("/api/listings/map")
      .then((r) => r.json())
      .then((data) => {
        const markers: MapMarker[] = data.markers || [];
        setAllMarkers(markers);
        const counts: Record<string, number> = {};
        for (const m of markers) {
          if (m.kanton) {
            const abbr = CANTON_NAME_TO_ABBR[m.kanton];
            if (abbr) counts[abbr] = (counts[abbr] || 0) + 1;
          }
        }
        setKantonCounts(counts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter markers client-side based on selected cantons
  const filteredMarkers = selectedKantone.size === 0
    ? allMarkers
    : allMarkers.filter((m) => {
        const abbr = CANTON_NAME_TO_ABBR[m.kanton];
        return abbr && selectedKantone.has(abbr);
      });

  function handleKantonClick(abbr: string) {
    setSelectedKantone((prev) => {
      const next = new Set(prev);
      if (next.has(abbr)) {
        next.delete(abbr);
      } else {
        next.add(abbr);
      }
      return next;
    });
  }

  function handleReset() {
    setSelectedKantone(new Set());
  }

  // Sort cantons by count descending, filter out empty
  const sortedKantone = KANTONE
    .filter((k) => (kantonCounts[k.abbr] || 0) > 0)
    .sort((a, b) => (kantonCounts[b.abbr] || 0) - (kantonCounts[a.abbr] || 0));

  const displayCount = filteredMarkers.length;
  const selCount = selectedKantone.size;

  // Build subtitle text
  let subtitleText: string;
  if (loading) {
    subtitleText = "Wird geladen...";
  } else if (selCount === 1) {
    const abbr = Array.from(selectedKantone)[0];
    const label = KANTONE.find((k) => k.abbr === abbr)?.label || abbr;
    subtitleText = `${displayCount.toLocaleString("de-CH")} Inserate in ${label}`;
  } else if (selCount > 1) {
    subtitleText = `${displayCount.toLocaleString("de-CH")} Inserate in ${selCount} Kantonen`;
  } else {
    subtitleText = `${displayCount.toLocaleString("de-CH")} Inserate in der ganzen Schweiz`;
  }

  return (
    <section className="py-10 md:py-14">
      <div
        className="mx-auto max-w-7xl rounded-xl border px-4 py-8 md:px-6 md:py-10"
        style={{ backgroundColor: "#f8faf8", borderColor: "#e5e7eb" }}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#16a34a]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
                Live Karte
              </span>
            </div>
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1a2e1a] md:text-3xl">
              Inserate auf der <span className="text-[#16a34a]">Karte</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500">
            <span className="font-bold text-[#16a34a]">{displayCount.toLocaleString("de-CH")}</span>{" "}
            {subtitleText.replace(/^\d[\d''']*\s*/, "")}
          </p>
        </div>

        {/* Main content: canton filter + map */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left: Canton filter panel */}
          <div className="shrink-0 lg:w-[300px]">
            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "#e5e7eb" }}>
              <h3 className="mb-3 text-sm font-semibold text-[#1a2e1a]">Nach Kanton filtern</h3>

              {/* Alle button */}
              <button
                onClick={handleReset}
                className="mb-3 w-full rounded-lg bg-[#16a34a] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#15803d]"
              >
                Alle Kantone
              </button>

              {/* Selection count */}
              {selCount > 0 && (
                <p className="mb-2 text-[11px] font-medium text-neutral-500">
                  {selCount} {selCount === 1 ? "Kanton" : "Kantone"} ausgewählt
                </p>
              )}

              {/* Canton pills — horizontal scroll on mobile, 2-col grid on desktop */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-1.5 lg:overflow-visible">
                {sortedKantone.map((k) => {
                  const count = kantonCounts[k.abbr] || 0;
                  const isSelected = selectedKantone.has(k.abbr);
                  return (
                    <button
                      key={k.abbr}
                      onClick={() => handleKantonClick(k.abbr)}
                      className={`flex w-full shrink-0 items-center justify-between rounded-lg px-2.5 py-2 text-[12px] transition-colors ${
                        isSelected
                          ? "bg-[#16a34a] text-white"
                          : "bg-[#f8faf8] text-[#374151] hover:bg-[#f0fdf4]"
                      }`}
                    >
                      <span className="truncate font-medium">{k.label}</span>
                      <span
                        className={`ml-1.5 shrink-0 rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-[#dcfce7] text-[#16a34a]"
                        }`}
                        style={{ minWidth: 32 }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="relative flex-1 overflow-hidden rounded-xl border" style={{ minHeight: 480, borderColor: "#e5e7eb" }}>
            <HomeMapView
              markers={filteredMarkers}
              selectedKantone={selectedKantone}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
