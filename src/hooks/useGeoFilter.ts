"use client";

import { useMemo } from "react";

interface GeoItem {
  lat: number | null;
  lng: number | null;
  [key: string]: unknown;
}

interface GeoFilterResult<T extends GeoItem> {
  filtered: (T & { distance: number })[];
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useGeoFilter<T extends GeoItem>(
  items: T[],
  center: { lat: number; lng: number } | null,
  radiusKm: number
): GeoFilterResult<T> {
  const filtered = useMemo(() => {
    if (!center) return [];

    return items
      .filter((item) => item.lat != null && item.lng != null)
      .map((item) => ({
        ...item,
        distance: haversineDistance(
          center.lat,
          center.lng,
          item.lat!,
          item.lng!
        ),
      }))
      .filter((item) => item.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }, [items, center, radiusKm]);

  return { filtered };
}
