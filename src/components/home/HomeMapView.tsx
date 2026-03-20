"use client";

import React, { useEffect, useRef, useState } from "react";

interface MapMarker {
  id: string;
  titel: string;
  preis: number;
  lat: number;
  lng: number;
  rechtsstatus: string;
  image_url: string | null;
}

interface HomeMapViewProps {
  markers: MapMarker[];
}

const RECHTS_COLORS: Record<string, string> = {
  frei: "#16a34a",
  wes: "#ca8a04",
  kaufvertrag: "#2563eb",
  "abk-klein": "#dc2626",
  "abk-gross": "#dc2626",
};

export default function HomeMapView({ markers }: HomeMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clusterRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  // Load Leaflet + MarkerCluster dynamically (SSR-safe)
  useEffect(() => {
    let cancelled = false;

    async function loadLeaflet() {
      // Inject CSS via CDN link tags
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
      await import("leaflet.markercluster");

      if (cancelled) return;
      LRef.current = L;
      setReady(true);
    }

    loadLeaflet();
    return () => { cancelled = true; };
  }, []);

  // Initialize map once Leaflet is ready
  useEffect(() => {
    if (!ready || !mapContainerRef.current || mapRef.current) return;

    const L = LRef.current;
    const map = L.map(mapContainerRef.current, {
      center: [46.8, 8.2],
      zoom: 8,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Add custom cluster CSS
    const style = document.createElement("style");
    style.textContent = `
      .gun-cluster {
        background: rgba(22, 163, 74, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gun-cluster-inner {
        background: #16a34a;
        color: white;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [ready]);

  // Update markers when data changes
  useEffect(() => {
    if (!ready || !mapRef.current) return;

    const L = LRef.current;
    const map = mapRef.current;

    // Remove old cluster layer
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cluster = new (L as any).MarkerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      iconCreateFunction: (c: any) => {
        const count = c.getChildCount();
        const size = count < 10 ? 36 : count < 50 ? 44 : 52;
        const inner = size - 10;
        return L.divIcon({
          html: `<div class="gun-cluster" style="width:${size}px;height:${size}px"><div class="gun-cluster-inner" style="width:${inner}px;height:${inner}px">${count}</div></div>`,
          className: "",
          iconSize: L.point(size, size),
        });
      },
    });

    for (const m of markers) {
      if (!m.lat || !m.lng) continue;

      const color = RECHTS_COLORS[m.rechtsstatus] || "#16a34a";
      const icon = L.divIcon({
        html: `<div style="width:12px;height:12px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`,
        className: "",
        iconSize: L.point(12, 12),
        iconAnchor: L.point(6, 6),
      });

      const marker = L.marker([m.lat, m.lng], { icon });

      // Tooltip on hover
      const priceStr = m.preis > 0 ? `CHF ${m.preis.toLocaleString("de-CH")}` : "Auf Anfrage";
      marker.bindTooltip(
        `<div style="font-size:12px;font-weight:600;max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.titel}</div><div style="font-size:11px;color:#16a34a;font-weight:700">${priceStr}</div>`,
        { direction: "top", offset: L.point(0, -8) }
      );

      // Click opens listing in new tab
      marker.on("click", () => {
        window.open(`/inserat/${m.id}`, "_blank");
      });

      cluster.addLayer(marker);
    }

    map.addLayer(cluster);
    clusterRef.current = cluster;
  }, [ready, markers]);

  if (!ready) {
    return (
      <div
        ref={mapContainerRef}
        className="flex h-full w-full items-center justify-center bg-[#f1f5f1]"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#16a34a] border-t-transparent" />
          <span className="text-xs text-neutral-400">Karte wird geladen…</span>
        </div>
      </div>
    );
  }

  return <div ref={mapContainerRef} className="h-full w-full" />;
}
