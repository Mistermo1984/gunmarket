"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Search,
  MapPin,
  Globe,
  Mail,
  ExternalLink,
  Info,
  Map,
  List,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { VEREINE, ALLE_KANTONE, ALLE_DISZIPLINEN, type Verein } from "@/lib/vereine-data";

// Dynamic import for Leaflet map
const DynamicMap = dynamic(() => import("@/components/map/DynamicMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-lg bg-gray-100 text-neutral-400">
      Karte wird geladen...
    </div>
  ),
});

export default function VereinePage() {
  const [suche, setSuche] = useState("");
  const [kanton, setKanton] = useState("");
  const [selectedDisziplinen, setSelectedDisziplinen] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);

  function toggleDisziplin(d: string) {
    setSelectedDisziplinen((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  const filtered = useMemo(() => {
    return VEREINE.filter((v) => {
      const sucheLower = suche.toLowerCase();
      if (
        suche &&
        !v.name.toLowerCase().includes(sucheLower) &&
        !v.ortschaft.toLowerCase().includes(sucheLower)
      )
        return false;
      if (kanton && v.kanton !== kanton) return false;
      if (
        selectedDisziplinen.length > 0 &&
        !selectedDisziplinen.some((d) => v.disziplinen.includes(d))
      )
        return false;
      return true;
    });
  }, [suche, kanton, selectedDisziplinen]);

  const mapListings = useMemo(
    () =>
      filtered.map((v) => ({
        id: v.id,
        titel: v.name,
        preis: 0,
        lat: v.lat,
        lng: v.lng,
      })),
    [filtered]
  );

  return (
    <div className="min-h-screen bg-brand-grey">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Schützenvereine Schweiz',
        description: 'Verzeichnis aller Schweizer Schützenvereine nach Kanton.',
        url: 'https://gunmarket.ch/vereine',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gunmarket.ch' },
            { '@type': 'ListItem', position: 2, name: 'Schützenvereine', item: 'https://gunmarket.ch/vereine' },
          ],
        },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Schützenvereine Schweiz',
        description: 'Verzeichnis aller Schweizer Schützenvereine nach Kanton',
        url: 'https://gunmarket.ch/vereine',
        numberOfItems: 26,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Schützenvereine Zürich', url: 'https://gunmarket.ch/vereine?kanton=ZH' },
          { '@type': 'ListItem', position: 2, name: 'Schützenvereine Bern', url: 'https://gunmarket.ch/vereine?kanton=BE' },
          { '@type': 'ListItem', position: 3, name: 'Schützenvereine Luzern', url: 'https://gunmarket.ch/vereine?kanton=LU' },
          { '@type': 'ListItem', position: 4, name: 'Schützenvereine St. Gallen', url: 'https://gunmarket.ch/vereine?kanton=SG' },
          { '@type': 'ListItem', position: 5, name: 'Schützenvereine Aargau', url: 'https://gunmarket.ch/vereine?kanton=AG' },
          { '@type': 'ListItem', position: 6, name: 'Schützenvereine Graubünden', url: 'https://gunmarket.ch/vereine?kanton=GR' },
        ],
      }) }} />
      {/* Hero */}
      <div className="bg-brand-dark py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 font-display text-3xl font-black uppercase text-white md:text-4xl animate-fade-in">
            Schützenvereine in der Schweiz
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-neutral-300">
            Finden Sie einen Schützenverein in Ihrer Nähe. Ob Pistole, Gewehr,
            300m oder IPSC — die Schweiz hat eine reiche Schiesstradition.
          </p>
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-lg bg-white p-1.5 shadow-lg">
            <Search size={18} className="ml-2 text-neutral-400" />
            <input
              type="text"
              placeholder="Verein oder Ortschaft suchen..."
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              className="flex-1 bg-transparent py-2 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Filter-Leiste */}
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
          <select
            value={kanton}
            onChange={(e) => setKanton(e.target.value)}
            className="rounded-lg border border-brand-border px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
          >
            {ALLE_KANTONE.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-1.5">
            {ALLE_DISZIPLINEN.map((d) => {
              const active = selectedDisziplinen.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => toggleDisziplin(d)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-brand-green text-white"
                      : "bg-gray-100 text-neutral-600 hover:bg-gray-200"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

        </div>

        {/* Counter + View toggle */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            <span className="font-semibold text-brand-dark">{filtered.length}</span> Verein
            {filtered.length !== 1 ? "e" : ""} gefunden
          </p>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-1.5 rounded-lg border border-brand-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-brand-green hover:text-brand-green"
          >
            {showMap ? <List size={14} /> : <Map size={14} />}
            {showMap ? "Liste" : "Karte"}
          </button>
        </div>

        {/* Karte */}
        {showMap && (
          <div className="mb-6 overflow-hidden rounded-xl border border-brand-border shadow-sm animate-fade-in">
            <div className="h-[400px]">
              <DynamicMap
                listings={mapListings}
                onMarkerClick={() => {}}
              />
            </div>
          </div>
        )}

        {/* Vereins-Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((verein) => (
            <VereinCard key={verein.id} verein={verein} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold text-brand-dark">Keine Vereine gefunden</p>
            <p className="mt-2 text-sm text-neutral-500">
              Versuchen Sie es mit anderen Suchbegriffen oder Filtern.
            </p>
          </div>
        )}

        {/* SSV Info-Box */}
        <div className="mt-8 rounded-xl bg-brand-green-light p-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="mt-0.5 shrink-0 text-brand-green" />
            <div>
              <h3 className="font-semibold text-brand-green">
                Schweizer Schiesssportverband (SSV)
              </h3>
              <p className="mt-1 text-sm text-brand-green/80">
                Das vollständige Verzeichnis aller dem SSV angeschlossenen
                Vereine finden Sie auf der offiziellen SSV-Website. Der SSV
                organisiert nationale Wettkämpfe, das Eidgenössische
                Feldschiessen und vieles mehr.
              </p>
              <a
                href="https://www.swissshooting.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-green hover:underline"
              >
                swissshooting.ch (SSV/FSTV)
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-neutral-400">
          Angaben ohne Gewähr. Bitte direkt beim Verein anfragen für aktuelle
          Informationen zu Trainingszeiten, Mitgliedschaft und Disziplinen.
        </p>
      </div>
    </div>
  );
}

// ─── Verein Card Component ────────────────────────────────────

function VereinCard({ verein }: { verein: Verein }) {
  const kantonLabel = ALLE_KANTONE.find((k) => k.id === verein.kanton)?.label || verein.kanton;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-display text-lg font-bold text-brand-dark">
          {verein.name}
        </h3>
      </div>

      <div className="mb-3 flex items-center gap-1.5 text-sm text-neutral-500">
        <MapPin size={14} className="text-brand-green" />
        {verein.ortschaft}, {kantonLabel}
      </div>

      {verein.beschreibung && (
        <p className="mb-3 text-xs leading-relaxed text-neutral-500">
          {verein.beschreibung}
        </p>
      )}

      <div className="mb-3 flex flex-wrap gap-1.5">
        {verein.disziplinen.map((d) => (
          <Badge key={d} variant="grey" size="sm">
            {d}
          </Badge>
        ))}
      </div>

      <div className="border-t border-brand-border pt-3">
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          {verein.email && (
            <a
              href={`mailto:${verein.email}`}
              className="flex items-center gap-1 transition-colors hover:text-brand-green"
            >
              <Mail size={12} />
              Kontakt
            </a>
          )}
          {verein.website && (
            <a
              href={verein.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-brand-green"
            >
              <Globe size={12} />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
