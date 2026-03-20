"use client";

import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, PackageOpen } from "lucide-react";

const HomeMapView = lazy(() => import("./HomeMapView"));

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

const ZUSTAND_LABELS: Record<string, string> = {
  neu: "Neu", "sehr-gut": "Sehr gut", gut: "Gut", akzeptabel: "Akzeptabel", defekt: "Defekt",
};

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

export default function HomeMapSection() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [selectedKantone, setSelectedKantone] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [kantonCounts, setKantonCounts] = useState<Record<string, number>>({});
  const [katFilter, setKatFilter] = useState("");
  const [preisFilter, setPreisFilter] = useState("");

  // Fetch listings with coordinates for map
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
        } catch {
          // Silently handle malformed data
        }
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

  // Quick-filter on top of canton filter
  const fullyFiltered = useMemo(() => {
    let result = cantonFiltered;
    if (katFilter) {
      result = result.filter((l) => l.hauptkategorie === katFilter);
    }
    if (preisFilter) {
      const [min, max] = preisFilter.split("-").map(Number);
      result = result.filter((l) => l.preis >= min && l.preis <= max);
    }
    return result;
  }, [cantonFiltered, katFilter, preisFilter]);

  // Map markers from filtered listings
  const mapMarkers = useMemo(
    () =>
      fullyFiltered
        .filter((l) => l.lat && l.lng)
        .map((l) => ({
          id: l.id,
          titel: l.titel,
          preis: l.preis,
          lat: l.lat!,
          lng: l.lng!,
          rechtsstatus: l.rechtsstatus,
          image_url: l.image_url,
        })),
    [fullyFiltered]
  );

  const displayListings = fullyFiltered.slice(0, 30);

  function handleKantonClick(abbr: string) {
    setSelectedKantone((prev) => {
      const next = new Set(prev);
      if (next.has(abbr)) next.delete(abbr);
      else next.add(abbr);
      return next;
    });
    setKatFilter("");
    setPreisFilter("");
  }

  function handleReset() {
    setSelectedKantone(new Set());
    setKatFilter("");
    setPreisFilter("");
  }

  // Sort cantons by count descending, filter out empty
  const sortedKantone = KANTONE
    .filter((k) => (kantonCounts[k.abbr] || 0) > 0)
    .sort((a, b) => (kantonCounts[b.abbr] || 0) - (kantonCounts[a.abbr] || 0));

  const selCount = selectedKantone.size;

  const searchLink = selCount > 0
    ? `/suche?kanton=${Array.from(selectedKantone).join(",")}`
    : "/suche";

  let locationLabel = "Schweizweit";
  if (selCount === 1) {
    const abbr = Array.from(selectedKantone)[0];
    locationLabel = KANTONE.find((k) => k.abbr === abbr)?.label || abbr;
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

        {/* Main layout: canton filter + map with overlay */}
        <div className="flex flex-col gap-4 lg:flex-row" style={{ height: "auto" }}>
          {/* Left: Canton filter panel (30%) */}
          <div className="shrink-0 lg:w-[280px]">
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
                style={{ maxHeight: 480, scrollbarWidth: "thin", scrollbarColor: "#16a34a #f3f4f6" }}
              >
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

          {/* Right: Map (70%) with overlay listing panel */}
          <div className="relative flex-1 overflow-hidden rounded-xl border" style={{ borderColor: "#e5e7eb", height: 600 }}>
            {/* Leaflet map — fills entire right panel */}
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-[#f1f5f1]">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#16a34a] border-t-transparent" />
                </div>
              }
            >
              <HomeMapView markers={mapMarkers} />
            </Suspense>

            {/* Overlay listing panel — positioned on top of map */}
            <div
              className="absolute bottom-3 right-3 top-3 hidden w-[320px] flex-col overflow-hidden rounded-xl border bg-white/95 shadow-lg backdrop-blur-sm lg:flex"
              style={{ borderColor: "#e5e7eb" }}
            >
              {/* Quick filters */}
              <div className="border-b px-3 py-2.5" style={{ borderColor: "#f3f4f6" }}>
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

              {/* Count bar */}
              <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: "#f3f4f6" }}>
                <p className="text-xs font-semibold text-[#1a2e1a]">
                  {fullyFiltered.length.toLocaleString("de-CH")} Inserate
                </p>
                <span className="text-[10px] text-neutral-400">{locationLabel}</span>
              </div>

              {/* Scrollable listing cards */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#16a34a #f3f4f6" }}
              >
                {loading ? (
                  <div className="divide-y" style={{ borderColor: "#f3f4f6" }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2.5">
                        <div className="h-12 w-12 shrink-0 animate-pulse rounded-md bg-[#f3f4f6]" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2.5 w-3/4 animate-pulse rounded bg-[#f3f4f6]" />
                          <div className="h-2 w-1/2 animate-pulse rounded bg-[#f3f4f6]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : displayListings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <PackageOpen size={32} className="mb-2 text-neutral-300" />
                    <p className="text-xs font-medium text-neutral-500">Keine Inserate gefunden</p>
                    <p className="mt-0.5 text-[10px] text-neutral-400">Anderen Kanton oder Filter wählen</p>
                  </div>
                ) : (
                  <div>
                    {displayListings.map((l) => {
                      const rs = RECHTS_BADGE[l.rechtsstatus] || { label: l.rechtsstatus || "—", bg: "#f3f4f6", text: "#374151" };
                      const zLabel = ZUSTAND_LABELS[l.zustand] || "";
                      return (
                        <a
                          key={l.id}
                          href={`/inserat/${l.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2.5 border-b px-3 py-2.5 transition-colors hover:bg-[#f0fdf4]"
                          style={{ borderBottomColor: "#f3f4f6" }}
                        >
                          {l.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={l.image_url}
                              alt=""
                              className="h-12 w-12 shrink-0 rounded-md object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#f3f4f6] text-neutral-300">
                              <PackageOpen size={16} />
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-[#1a2e1a] group-hover:text-[#16a34a]">
                              {l.titel}
                            </p>
                            <p className="mt-0.5 truncate text-[10px] text-neutral-400">
                              {l.ortschaft}{l.kanton ? `, ${l.kanton}` : ""}
                              {zLabel && ` · ${zLabel}`}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1.5">
                              <span
                                className="inline-block rounded px-1 py-0.5 text-[9px] font-semibold"
                                style={{ backgroundColor: rs.bg, color: rs.text }}
                              >
                                {rs.label}
                              </span>
                              <span className="text-xs font-bold text-[#16a34a]">
                                {l.preis > 0 ? `CHF ${l.preis.toLocaleString("de-CH")}` : "Auf Anfrage"}
                              </span>
                            </div>
                          </div>

                          <ChevronRight size={12} className="shrink-0 text-neutral-300 group-hover:text-[#16a34a]" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* "Show all" link */}
              {fullyFiltered.length > 30 && (
                <div className="border-t px-3 py-2" style={{ borderColor: "#f3f4f6" }}>
                  <Link
                    href={searchLink}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[#f0fdf4] px-3 py-2 text-xs font-semibold text-[#16a34a] transition-colors hover:bg-[#dcfce7]"
                  >
                    Alle {fullyFiltered.length.toLocaleString("de-CH")} anzeigen
                    <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: listing cards below map */}
        <div className="mt-4 lg:hidden">
          <div className="rounded-xl border bg-white" style={{ borderColor: "#e5e7eb" }}>
            {/* Mobile quick filters */}
            <div className="border-b px-3 py-2.5" style={{ borderColor: "#f3f4f6" }}>
              <div className="flex flex-wrap gap-1">
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
            </div>

            <div className="divide-y" style={{ borderColor: "#f3f4f6" }}>
              {displayListings.slice(0, 10).map((l) => {
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
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                          style={{ backgroundColor: rs.bg, color: rs.text }}
                        >
                          {rs.label}
                        </span>
                        <span className="text-sm font-bold text-[#16a34a]">
                          {l.preis > 0 ? `CHF ${l.preis.toLocaleString("de-CH")}` : "Auf Anfrage"}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="shrink-0 text-neutral-300" />
                  </a>
                );
              })}
            </div>

            {fullyFiltered.length > 10 && (
              <div className="border-t px-3 py-2.5" style={{ borderColor: "#f3f4f6" }}>
                <Link
                  href={searchLink}
                  className="flex items-center justify-center gap-1 rounded-lg bg-[#f0fdf4] px-3 py-2 text-xs font-semibold text-[#16a34a] hover:bg-[#dcfce7]"
                >
                  Alle {fullyFiltered.length.toLocaleString("de-CH")} anzeigen
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
