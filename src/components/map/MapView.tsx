"use client";

import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
const greenIcon = new L.Icon({
  iconUrl: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#2d6a4f"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>
  `),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

const pulseIcon = new L.Icon({
  iconUrl: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" width="30" height="42">
      <circle cx="15" cy="15" r="14" fill="#2d6a4f" opacity="0.3">
        <animate attributeName="r" values="14;20;14" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="1s" repeatCount="indefinite"/>
      </circle>
      <path d="M15 0C8.4 0 3 5.4 3 12c0 9 12 24 12 24s12-15 12-24C27 5.4 21.6 0 15 0z" fill="#2d6a4f"/>
      <circle cx="15" cy="12" r="5" fill="white"/>
    </svg>
  `),
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -42],
});

// Switzerland bounds
const SWISS_BOUNDS: L.LatLngBoundsExpression = [
  [45.8, 5.9],
  [47.8, 10.5],
];
const DEFAULT_CENTER: L.LatLngExpression = [46.8, 8.2];
const DEFAULT_ZOOM = 8;

export interface MapListing {
  id: string;
  titel: string;
  preis: number;
  lat: number;
  lng: number;
  kategorie?: string;
  imageUrl?: string;
}

interface MapViewProps {
  listings: MapListing[];
  center?: { lat: number; lng: number };
  radius?: number; // km
  hoveredId?: string | null;
  onMarkerClick?: (id: string) => void;
}

function FitBounds({ listings }: { listings: MapListing[] }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length > 0) {
      const bounds = L.latLngBounds(
        listings.map((l) => [l.lat, l.lng] as L.LatLngExpression)
      );
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    } else {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, [listings, map]);
  return null;
}

export default function MapView({
  listings,
  center,
  radius,
  hoveredId,
  onMarkerClick,
}: MapViewProps) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      maxBounds={SWISS_BOUNDS}
      minZoom={7}
      className="h-full w-full rounded-lg"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds listings={listings} />

      {center && radius && (
        <Circle
          center={[center.lat, center.lng]}
          radius={radius * 1000}
          pathOptions={{
            color: "#2d6a4f",
            fillColor: "#2d6a4f",
            fillOpacity: 0.08,
            weight: 2,
          }}
        />
      )}

      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          icon={hoveredId === listing.id ? pulseIcon : greenIcon}
          eventHandlers={{
            click: () => onMarkerClick?.(listing.id),
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              {listing.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={listing.imageUrl}
                  alt={listing.titel}
                  className="mb-2 h-24 w-full rounded object-cover"
                />
              )}
              <p className="text-sm font-semibold">{listing.titel}</p>
              <p className="text-sm font-bold text-[#2d6a4f]">
                CHF {listing.preis.toLocaleString("de-CH")}
              </p>
              <a
                href={`/inserat/${listing.id}`}
                className="mt-1 inline-block text-xs text-[#2d6a4f] hover:underline"
              >
                Anzeigen &rarr;
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
