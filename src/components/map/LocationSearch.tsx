"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import Button from "@/components/ui/Button";

interface LocationSearchProps {
  onLocationChange: (location: { lat: number; lng: number; label: string } | null) => void;
  onRadiusChange: (radius: number) => void;
  radius: number;
}

const RADIUS_OPTIONS = [10, 25, 50, 100];

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export default function LocationSearch({
  onLocationChange,
  onRadiusChange,
  radius,
}: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query + ", Schweiz"
          )}&format=json&limit=5&countrycodes=ch&accept-language=de`,
          { headers: { "User-Agent": "GunMarket.ch/1.0", "Accept-Language": "de" } }
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = (result: NominatimResult) => {
    const parts = result.display_name.split(",");
    const label = parts.slice(0, 2).join(",").trim();
    setQuery(label);
    setShowSuggestions(false);
    onLocationChange({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      label,
    });
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setQuery("Mein Standort");
        onLocationChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Mein Standort",
        });
      },
      () => {
        setLocating(false);
        alert("Standort konnte nicht ermittelt werden.");
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    onLocationChange(null);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ort suchen..."
              className="w-full rounded-lg border border-brand-border py-2 pl-9 pr-3 text-sm placeholder:text-neutral-400 focus:border-brand-green focus:outline-none"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                &times;
              </button>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleGeolocation}
            loading={locating}
            icon={<Navigation size={14} />}
            title="In meiner Nähe"
          >
            <span className="hidden sm:inline">Mein Standort</span>
          </Button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-30 mt-1 w-full rounded-lg border border-brand-border bg-white shadow-lg">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSelect(s)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-brand-green-light"
                >
                  <MapPin size={14} className="shrink-0 text-brand-green" />
                  <span className="line-clamp-1">{s.display_name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Radius Slider */}
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-neutral-500">
          <span>Radius</span>
          <span className="font-medium text-brand-dark">{radius} km</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={radius}
            onChange={(e) => onRadiusChange(parseInt(e.target.value))}
            className="flex-1 accent-brand-green"
          />
          <div className="flex gap-1">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => onRadiusChange(r)}
                className={`rounded px-2 py-0.5 text-xs transition-colors ${
                  radius === r
                    ? "bg-brand-green text-white"
                    : "bg-gray-100 text-neutral-600 hover:bg-gray-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
