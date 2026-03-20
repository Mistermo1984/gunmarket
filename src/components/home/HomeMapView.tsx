"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { MapPin } from "lucide-react";

export interface MapMarker {
  id: string;
  titel: string;
  preis: number;
  lat: number;
  lng: number;
  rechtsstatus: string;
  image_url: string | null;
}

export interface MapHandle {
  flyTo: (lat: number, lng: number, zoom: number) => void;
  resetView: () => void;
  invalidateSize: () => void;
}

interface HomeMapViewProps {
  markers: MapMarker[];
  onClusterClick?: (latlng: { lat: number; lng: number }, count: number) => void;
}

const SWITZERLAND_CENTER: [number, number] = [46.8, 8.2];
const SWITZERLAND_ZOOM = 8;

const HomeMapView = forwardRef<MapHandle, HomeMapViewProps>(function HomeMapView(
  { markers, onClusterClick },
  ref
) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clusterRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onClusterClickRef = useRef(onClusterClick);
  onClusterClickRef.current = onClusterClick;

  useImperativeHandle(ref, () => ({
    flyTo(lat: number, lng: number, zoom: number) {
      try { mapRef.current?.flyTo([lat, lng], zoom, { duration: 1.2 }); } catch { /* ignore */ }
    },
    resetView() {
      try { mapRef.current?.flyTo(SWITZERLAND_CENTER, SWITZERLAND_ZOOM, { duration: 1.0 }); } catch { /* ignore */ }
    },
    invalidateSize() {
      try { setTimeout(() => mapRef.current?.invalidateSize(), 100); } catch { /* ignore */ }
    },
  }));

  // Load Leaflet + MarkerCluster dynamically (SSR-safe)
  useEffect(() => {
    let cancelled = false;
    async function loadLeaflet() {
      try {
        // Inject CSS
        const cssUrls = [
          "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
          "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css",
          "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css",
        ];
        for (const href of cssUrls) {
          if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
          }
        }

        const L = await import("leaflet");
        // MarkerCluster needs L on window to attach itself
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).L = L;
        await import("leaflet.markercluster");

        if (cancelled) return;
        LRef.current = L;
        setReady(true);
      } catch (err) {
        console.error("HomeMapView: failed to load Leaflet", err);
        if (!cancelled) setError("Karte konnte nicht geladen werden");
      }
    }
    loadLeaflet();
    return () => { cancelled = true; };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!ready || !mapContainerRef.current || mapRef.current) return;
    try {
      const L = LRef.current;
      const map = L.map(mapContainerRef.current, {
        center: SWITZERLAND_CENTER,
        zoom: SWITZERLAND_ZOOM,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false,
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);
      mapRef.current = map;

      // Custom cluster styles
      const style = document.createElement("style");
      style.textContent = `
        .gun-cluster {
          background: rgba(22, 163, 74, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .gun-cluster-inner {
          background: #16a34a;
          color: white;
          border: 2px solid white;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,.25);
        }
        .leaflet-marker-icon:not(.marker-cluster):not(.gun-cluster-icon) {
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .leaflet-cluster-anim .leaflet-marker-icon,
        .leaflet-cluster-spider-leg {
          display: none !important;
        }
        .marker-cluster-small,
        .marker-cluster-medium,
        .marker-cluster-large {
          background: none !important;
        }
        .marker-cluster div {
          background: none !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        try { map.remove(); } catch { /* ignore */ }
        mapRef.current = null;
      };
    } catch (err) {
      console.error("HomeMapView: failed to init map", err);
      setError("Kartenfehler");
    }
  }, [ready]);

  // Update markers
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    try {
      const L = LRef.current;
      const map = mapRef.current;

      if (clusterRef.current) {
        try { map.removeLayer(clusterRef.current); } catch { /* ignore */ }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MCG = (L as any).MarkerClusterGroup || (L as any).markerClusterGroup;
      if (!MCG) {
        console.error("HomeMapView: MarkerClusterGroup not available");
        // Fallback: add markers directly without clustering
        for (const m of markers) {
          if (!m.lat || !m.lng) continue;
          L.circleMarker([m.lat, m.lng], {
            radius: 4, color: "#16a34a", fillColor: "#16a34a", fillOpacity: 0.6, weight: 1,
          }).addTo(map);
        }
        return;
      }

      const cluster = new MCG({
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: false,
        spiderfyDistanceMultiplier: 0,
        zoomToBoundsOnClick: false,
        showCoverageOnHover: false,
        singleMarkerMode: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconCreateFunction: (c: any) => {
          const count = c.getChildCount();
          const size = count < 10 ? 36 : count < 50 ? 44 : 52;
          const inner = size - 10;
          return L.divIcon({
            html: `<div class="gun-cluster" style="width:${size}px;height:${size}px"><div class="gun-cluster-inner" style="width:${inner}px;height:${inner}px">${count}</div></div>`,
            className: "gun-cluster-icon",
            iconSize: L.point(size, size),
          });
        },
      });

      // Cluster click → pass lat/lng + count to parent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.on("clusterclick", (e: any) => {
        try {
          const latlng = e.layer.getLatLng();
          const count = e.layer.getChildCount();
          console.log("[HomeMapView] clusterclick fired", { lat: latlng.lat, lng: latlng.lng, count });
          if (onClusterClickRef.current) {
            onClusterClickRef.current({ lat: latlng.lat, lng: latlng.lng }, count);
          }
        } catch (err) {
          console.error("[HomeMapView] clusterclick error:", err);
        }
      });

      for (const m of markers) {
        if (!m.lat || !m.lng) continue;
        const icon = L.divIcon({
          html: "",
          className: "gun-hidden-marker",
          iconSize: L.point(0, 0),
        });
        const marker = L.marker([m.lat, m.lng], { icon, _listingId: m.id });
        cluster.addLayer(marker);
      }

      map.addLayer(cluster);
      clusterRef.current = cluster;
    } catch (err) {
      console.error("HomeMapView: failed to update markers", err);
    }
  }, [ready, markers]);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#f1f5f1] text-neutral-500">
        <MapPin size={32} className="mb-2 text-neutral-300" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#f1f5f1]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#16a34a] border-t-transparent" />
          <span className="text-xs text-neutral-400">Karte wird geladen…</span>
        </div>
      </div>
    );
  }

  return <div ref={mapContainerRef} className="h-full w-full" />;
});

export default HomeMapView;
