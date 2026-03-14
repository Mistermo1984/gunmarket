"use client";

import dynamic from "next/dynamic";
import type { MapListing } from "./MapView";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-neutral-400">
      Karte wird geladen...
    </div>
  ),
});

interface DynamicMapProps {
  listings: MapListing[];
  center?: { lat: number; lng: number };
  radius?: number;
  hoveredId?: string | null;
  onMarkerClick?: (id: string) => void;
}

export default function DynamicMap(props: DynamicMapProps) {
  return <MapView {...props} />;
}
