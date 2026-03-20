"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LayoutList, ChevronRight, PackageOpen } from "lucide-react";

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
}

export default function HomeListingsSection() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [selectedKantone, setSelectedKantone] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [kantonCounts, setKantonCounts] = useState<Record<string, number>>({});
  const [katFilter, setKatFilter] = useState("");
  const [preisFilter, setPreisFilter] = useState("");

  // Fetch all listings once on mount
  useEffect(() => {
    fetch("/api/listings?limit=2000&sort=neueste")
      .then((r) => r.json())
      .then((data) => {
        const listings: Listing[] = (data.listings || []).map((l: Record<string, unknown>) => ({
          id: l.id,
          titel: l.titel,
          preis: l.preis,
          zustand: l.zustand,
          kanton: l.kanton,
          rechtsstatus: l.rechtsstatus,
          ortschaft: l.ortschaft,
          hauptkategorie: l.hauptkategorie,
          image_url: Array.isArray(l.images) && l.images.length > 0 ? (l.images[0] as Record<string, string>).url : null,
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

  const displayListings = fullyFiltered.slice(0, 50);
  const totalAfterCantonFilter = cantonFiltered.length;

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

  // Build "Alle X Inserate anzeigen" link
  const searchLink = selCount > 0
    ? `/suche?kanton=${Array.from(selectedKantone).join(",")}`
    : "/suche";

  // Header subtitle
  let locationLabel = "Schweizweit";
  if (selCount === 1) {
    const abbr = Array.from(selectedKantone)[0];
    locationLabel = KANTONE.find((k) => k.abbr === abbr)?.label || abbr;
  } else if (selCount > 1) {
    locationLabel = `${selCount} Kantone`;
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
              <LayoutList className="h-5 w-5 text-[#16a34a]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
                Aktuelle Inserate
              </span>
            </div>
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#1a2e1a] md:text-3xl">
              Inserate <span className="text-[#16a34a]">durchsuchen</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500">
            <span className="font-bold text-[#16a34a]">{fullyFiltered.length.toLocaleString("de-CH")}</span>{" "}
            Inserate — {locationLabel}
          </p>
        </div>

        {/* Main content: canton filter + listing cards */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left: Canton filter panel */}
          <div className="shrink-0 lg:w-[300px]">
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

          {/* Right: Listing cards panel */}
          <div className="flex-1 rounded-xl border bg-white" style={{ borderColor: "#e5e7eb" }}>
            {/* Quick filters bar — show when canton-filtered results > 20 */}
            {totalAfterCantonFilter > 20 && (
              <div className="border-b px-4 py-3" style={{ borderColor: "#f3f4f6" }}>
                {/* Kategorie row */}
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  {KATEGORIE_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setKatFilter(f.value)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                        katFilter === f.value
                          ? "bg-[#16a34a] text-white"
                          : "bg-[#f3f4f6] text-[#374151] hover:bg-[#dcfce7]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                {/* Divider */}
                <div className="mb-2 h-px bg-[#f3f4f6]" />
                {/* Preis row */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {PREIS_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setPreisFilter(f.value)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                        preisFilter === f.value
                          ? "bg-[#16a34a] text-white"
                          : "bg-[#f3f4f6] text-[#374151] hover:bg-[#dcfce7]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                  {(katFilter || preisFilter) && (
                    <span className="ml-2 text-[11px] text-neutral-400">
                      {fullyFiltered.length} von {totalAfterCantonFilter} Inseraten
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Header bar */}
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "#f3f4f6" }}>
              <p className="text-sm font-semibold text-[#1a2e1a]">
                {fullyFiltered.length.toLocaleString("de-CH")} Inserate
                <span className="font-normal text-neutral-400"> — {locationLabel}</span>
              </p>
            </div>

            {/* Scrollable listing cards */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: 520, scrollbarWidth: "thin", scrollbarColor: "#16a34a #f3f4f6" }}
            >
              {loading ? (
                // Skeleton loading
                <div className="divide-y" style={{ borderColor: "#f3f4f6" }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      <div className="h-16 w-16 shrink-0 animate-pulse rounded-md bg-[#f3f4f6]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 animate-pulse rounded bg-[#f3f4f6]" />
                        <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#f3f4f6]" />
                      </div>
                      <div className="h-4 w-16 animate-pulse rounded bg-[#f3f4f6]" />
                    </div>
                  ))}
                </div>
              ) : displayListings.length === 0 ? (
                // Empty state
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <PackageOpen size={40} className="mb-3 text-neutral-300" />
                  <p className="text-sm font-medium text-neutral-500">Keine Inserate gefunden</p>
                  <p className="mt-1 text-xs text-neutral-400">Versuche einen anderen Kanton oder Filter</p>
                </div>
              ) : (
                // Listing cards
                <div>
                  {displayListings.map((l) => {
                    const rs = RECHTS_BADGE[l.rechtsstatus] || { label: l.rechtsstatus, bg: "#f3f4f6", text: "#374151" };
                    const zLabel = ZUSTAND_LABELS[l.zustand] || l.zustand || "";
                    return (
                      <a
                        key={l.id}
                        href={`/inserat/${l.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border-b px-4 py-3 transition-colors hover:border-l-2 hover:border-l-[#16a34a] hover:bg-[#f0fdf4]"
                        style={{ borderBottomColor: "#f3f4f6" }}
                      >
                        {/* Image */}
                        {l.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={l.image_url}
                            alt=""
                            className="h-16 w-16 shrink-0 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-[#f3f4f6] text-neutral-300">
                            <PackageOpen size={20} />
                          </div>
                        )}

                        {/* Middle: title + location + badge */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#1a2e1a] group-hover:text-[#16a34a]">
                            {l.titel}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-neutral-400">
                            {l.ortschaft}{l.kanton ? `, ${l.kanton}` : ""}
                          </p>
                          <span
                            className="mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{ backgroundColor: rs.bg, color: rs.text }}
                          >
                            {rs.label}
                          </span>
                        </div>

                        {/* Right: price + condition + arrow */}
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-[#16a34a]">
                            {l.preis > 0 ? `CHF ${l.preis.toLocaleString("de-CH")}` : "Auf Anfrage"}
                          </p>
                          {zLabel && (
                            <span className="mt-0.5 inline-block rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[10px] text-neutral-500">
                              {zLabel}
                            </span>
                          )}
                          <ChevronRight size={14} className="mt-1 ml-auto text-neutral-300 group-hover:text-[#16a34a]" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* "Show all" link */}
            {fullyFiltered.length > 50 && (
              <div className="border-t px-4 py-3" style={{ borderColor: "#f3f4f6" }}>
                <Link
                  href={searchLink}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#f0fdf4] px-4 py-2.5 text-sm font-semibold text-[#16a34a] transition-colors hover:bg-[#dcfce7]"
                >
                  Alle {fullyFiltered.length.toLocaleString("de-CH")} Inserate anzeigen
                  <ChevronRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
