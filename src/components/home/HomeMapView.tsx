"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { MapMarker } from "./HomeMapSection";

// Canton approximate centers for zoom
const KANTON_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  ZH: { lat: 47.38, lng: 8.55, zoom: 11 },
  BE: { lat: 46.95, lng: 7.45, zoom: 9 },
  LU: { lat: 47.05, lng: 8.3, zoom: 11 },
  UR: { lat: 46.88, lng: 8.64, zoom: 11 },
  SZ: { lat: 47.02, lng: 8.65, zoom: 11 },
  OW: { lat: 46.87, lng: 8.25, zoom: 12 },
  NW: { lat: 46.93, lng: 8.38, zoom: 12 },
  GL: { lat: 47.04, lng: 9.06, zoom: 11 },
  ZG: { lat: 47.17, lng: 8.52, zoom: 12 },
  FR: { lat: 46.8, lng: 7.15, zoom: 11 },
  SO: { lat: 47.21, lng: 7.53, zoom: 11 },
  BS: { lat: 47.56, lng: 7.59, zoom: 13 },
  BL: { lat: 47.48, lng: 7.73, zoom: 12 },
  SH: { lat: 47.7, lng: 8.63, zoom: 12 },
  AR: { lat: 47.38, lng: 9.28, zoom: 12 },
  AI: { lat: 47.33, lng: 9.41, zoom: 13 },
  SG: { lat: 47.42, lng: 9.37, zoom: 10 },
  GR: { lat: 46.73, lng: 9.62, zoom: 9 },
  AG: { lat: 47.39, lng: 8.15, zoom: 11 },
  TG: { lat: 47.58, lng: 9.1, zoom: 11 },
  TI: { lat: 46.33, lng: 8.96, zoom: 10 },
  VD: { lat: 46.62, lng: 6.63, zoom: 10 },
  VS: { lat: 46.23, lng: 7.6, zoom: 10 },
  NE: { lat: 46.99, lng: 6.78, zoom: 12 },
  GE: { lat: 46.2, lng: 6.15, zoom: 12 },
  JU: { lat: 47.37, lng: 7.16, zoom: 12 },
};

const ZUSTAND_LABELS: Record<string, string> = {
  neu: "Neu", "sehr-gut": "Sehr gut", gut: "Gut", akzeptabel: "Akzeptabel", defekt: "Defekt",
};

const RECHTS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  frei: { label: "Frei", bg: "#dcfce7", text: "#166534" },
  wes: { label: "WES", bg: "#fef9c3", text: "#854d0e" },
  kaufvertrag: { label: "Kaufvertrag", bg: "#dbeafe", text: "#1e40af" },
  "abk-klein": { label: "ABK", bg: "#fee2e2", text: "#991b1b" },
  "abk-gross": { label: "ABK", bg: "#fee2e2", text: "#991b1b" },
};

// Small green circle marker
const circleIcon = new L.DivIcon({
  html: '<div style="width:12px;height:12px;background:#16a34a;border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.25);"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  className: "",
});

function buildTooltipHtml(m: MapMarker): string {
  const rs = RECHTS_LABELS[m.rechtsstatus] || { label: m.rechtsstatus, bg: "#f3f4f6", text: "#374151" };
  const zLabel = ZUSTAND_LABELS[m.zustand] || m.zustand || "";
  const priceStr = m.preis > 0 ? `CHF ${m.preis.toLocaleString("de-CH")}` : "Auf Anfrage";
  const imgHtml = m.image_url
    ? `<img src="${m.image_url}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:6px;flex-shrink:0;" />`
    : `<div style="width:80px;height:80px;background:#f3f4f6;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#9ca3af;font-size:11px;">Kein Bild</div>`;

  return `
    <div style="display:flex;gap:10px;min-width:240px;max-width:300px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      ${imgHtml}
      <div style="flex:1;min-width:0;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#1a1a2e;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${m.titel}</p>
        <p style="margin:0 0 6px;font-size:15px;font-weight:800;color:#16a34a;">${priceStr}</p>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          ${zLabel ? `<span style="font-size:10px;padding:2px 6px;border-radius:4px;background:#f3f4f6;color:#374151;font-weight:500;">${zLabel}</span>` : ""}
          <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:${rs.bg};color:${rs.text};font-weight:600;">${rs.label}</span>
        </div>
        <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">${m.ortschaft}${m.kanton ? `, ${m.kanton}` : ""}</p>
      </div>
    </div>
  `;
}

interface HomeMapViewProps {
  markers: MapMarker[];
  selectedKantone: Set<string>;
}

export default function HomeMapView({ markers, selectedKantone }: HomeMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [46.8, 8.2],
      zoom: 8,
      maxBounds: [[45.6, 5.7], [48.0, 10.7]],
      minZoom: 7,
      maxZoom: 17,
      zoomControl: true,
    });

    // Light CartoDB tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when data or selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old cluster layer
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
      clusterRef.current = null;
    }

    const cluster = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (c) => {
        const count = c.getChildCount();
        return L.divIcon({
          html: `<div style="
            width:36px;height:36px;border-radius:50%;
            background:#16a34a;
            border:2px solid white;
            display:flex;align-items:center;justify-content:center;
            font-size:12px;font-weight:700;color:white;
            box-shadow:0 2px 8px rgba(0,0,0,0.2);
          ">${count}</div>`,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
      },
    });

    const valid = markers.filter((m) => m.lat != null && m.lng != null && !isNaN(m.lat) && !isNaN(m.lng));

    for (const m of valid) {
      const marker = L.marker([m.lat, m.lng], { icon: circleIcon });

      marker.bindTooltip(buildTooltipHtml(m), {
        direction: "top",
        offset: [0, -8],
        opacity: 1,
        className: "home-map-tooltip",
      });

      marker.on("click", () => {
        window.open(`/inserat/${m.id}`, "_blank");
      });

      cluster.addLayer(marker);
    }

    map.addLayer(cluster);
    clusterRef.current = cluster;

    // Zoom logic
    const kantoneArr = Array.from(selectedKantone);
    if (kantoneArr.length === 1 && KANTON_CENTERS[kantoneArr[0]]) {
      const c = KANTON_CENTERS[kantoneArr[0]];
      map.flyTo([c.lat, c.lng], c.zoom, { duration: 0.8 });
    } else if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map((m) => [m.lat, m.lng] as L.LatLngExpression));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    } else {
      map.setView([46.8, 8.2], 8);
    }
  }, [markers, selectedKantone]);

  return (
    <>
      <style>{`
        .home-map-tooltip {
          background: white !important;
          border: none !important;
          border-left: 3px solid #16a34a !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
          padding: 10px !important;
          max-width: 320px !important;
        }
        .home-map-tooltip .leaflet-tooltip-tip {
          display: none !important;
        }
        .leaflet-container {
          background: white !important;
        }
      `}</style>
      <div ref={containerRef} className="h-full w-full" style={{ minHeight: 480 }} />
    </>
  );
}
