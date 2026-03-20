"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const HomeMapView = dynamic(() => import("./HomeMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-xl bg-[#1a2e1a] text-sm text-[#9ca3af]">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#4ade80] border-t-transparent" />
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
  { abbr: "AR", label: "Appenzell AR" },
  { abbr: "AI", label: "Appenzell AI" },
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
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedKanton, setSelectedKanton] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [kantonCounts, setKantonCounts] = useState<Record<string, number>>({});

  const fetchMarkers = useCallback(async (kanton: string | null) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (kanton) params.set("kanton", kanton);
    const res = await fetch(`/api/listings/map?${params}`);
    const data = await res.json();
    setMarkers(data.markers || []);
    setLoading(false);
  }, []);

  // Fetch all markers initially + compute canton counts
  useEffect(() => {
    fetch("/api/listings/map")
      .then((r) => r.json())
      .then((data) => {
        const allMarkers: MapMarker[] = data.markers || [];
        setMarkers(allMarkers);
        // Compute counts per canton
        const counts: Record<string, number> = {};
        for (const m of allMarkers) {
          if (m.kanton) {
            // Find abbreviation for this canton name
            const found = KANTONE.find((k) => {
              const fullNames: Record<string, string> = {
                ZH: "Zürich", BE: "Bern", LU: "Luzern", UR: "Uri", SZ: "Schwyz",
                OW: "Obwalden", NW: "Nidwalden", GL: "Glarus", ZG: "Zug", FR: "Freiburg",
                SO: "Solothurn", BS: "Basel-Stadt", BL: "Basel-Landschaft", SH: "Schaffhausen",
                AR: "Appenzell A.", AI: "Appenzell I.", SG: "St. Gallen", GR: "Graubünden",
                AG: "Aargau", TG: "Thurgau", TI: "Tessin", VD: "Waadt", VS: "Wallis",
                NE: "Neuenburg", GE: "Genf", JU: "Jura",
              };
              return fullNames[k.abbr] === m.kanton || k.label === m.kanton;
            });
            if (found) {
              counts[found.abbr] = (counts[found.abbr] || 0) + 1;
            }
          }
        }
        setKantonCounts(counts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleKantonClick(abbr: string) {
    if (selectedKanton === abbr) {
      setSelectedKanton(null);
      fetchMarkers(null);
    } else {
      setSelectedKanton(abbr);
      fetchMarkers(abbr);
    }
  }

  function handleReset() {
    setSelectedKanton(null);
    fetchMarkers(null);
  }

  const displayCount = markers.length;
  const selectedLabel = selectedKanton
    ? KANTONE.find((k) => k.abbr === selectedKanton)?.label || selectedKanton
    : null;

  return (
    <section
      className="py-12 md:py-16"
      style={{
        backgroundColor: "#0d1a0d",
        backgroundImage: "radial-gradient(rgba(74,222,128,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#4ade80]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4ade80]">
                Live Karte
              </span>
            </div>
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
              Inserate auf der <span className="text-[#4ade80]">Karte</span>
            </h2>
          </div>
          <p className="text-sm text-[#9ca3af]">
            {loading ? "Wird geladen..." : (
              <>
                <span className="font-bold text-[#4ade80]">{displayCount.toLocaleString("de-CH")}</span>{" "}
                Inserate {selectedLabel ? `in ${selectedLabel}` : "in der ganzen Schweiz"}
              </>
            )}
          </p>
        </div>

        {/* Main content: canton filter + map */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left: Canton filter panel */}
          <div className="shrink-0 lg:w-[280px]">
            <div className="rounded-xl border border-[#2d4a2d] bg-[#1a2e1a] p-4">
              <h3 className="mb-3 text-sm font-semibold text-white">Nach Kanton filtern</h3>

              {/* Alle button */}
              <button
                onClick={handleReset}
                className={`mb-3 w-full rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  !selectedKanton
                    ? "bg-[#16a34a] text-white"
                    : "bg-[#0f1a0f] text-[#9ca3af] hover:bg-[#1a2e1a] hover:text-white"
                }`}
              >
                Alle Kantone
              </button>

              {/* Canton pills — scrollable on mobile, grid on desktop */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-1.5 lg:overflow-visible">
                {KANTONE.map((k) => {
                  const count = kantonCounts[k.abbr] || 0;
                  const isSelected = selectedKanton === k.abbr;
                  return (
                    <button
                      key={k.abbr}
                      onClick={() => handleKantonClick(k.abbr)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                        isSelected
                          ? "bg-[#16a34a] text-white"
                          : "bg-[#0f1a0f] text-[#9ca3af] hover:bg-[#2d4a2d] hover:text-white"
                      }`}
                    >
                      <span className="font-bold">{k.abbr}</span>
                      {count > 0 && (
                        <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-[#2d4a2d] text-[#4ade80]"
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="relative flex-1 overflow-hidden rounded-xl border border-[#2d4a2d]" style={{ minHeight: 480 }}>
            {/* Vignette overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-[500] rounded-xl"
              style={{
                boxShadow: "inset 0 0 60px rgba(13,26,13,0.6)",
              }}
            />
            <HomeMapView
              markers={markers}
              selectedKanton={selectedKanton}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
