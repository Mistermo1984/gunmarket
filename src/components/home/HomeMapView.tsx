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
  openPanel: (title: string, fetchUrl: string, searchLink: string) => void;
  closePanel: () => void;
}

interface HomeMapViewProps {
  markers: MapMarker[];
}

interface PanelListing {
  id: string;
  titel: string;
  preis: number;
  ortschaft: string;
  zustand: string;
  image_url: string | null;
}

interface PanelState {
  open: boolean;
  listings: PanelListing[];
  title: string;
  loading: boolean;
  searchLink: string;
}

const PANEL_INIT: PanelState = { open: false, listings: [], title: "", loading: false, searchLink: "/suche" };

const SWITZERLAND_CENTER: [number, number] = [46.8, 8.2];
const SWITZERLAND_ZOOM = 8;

function parsePanelListings(raw: Record<string, unknown>[]): PanelListing[] {
  return raw.map((l) => {
    let imgUrl: string | null = null;
    if (l.image_url) imgUrl = String(l.image_url);
    else if (Array.isArray(l.images) && l.images.length > 0) {
      const first = l.images[0] as Record<string, unknown>;
      if (first?.url) imgUrl = String(first.url);
    }
    return {
      id: String(l.id || ""),
      titel: String(l.titel || ""),
      preis: Number(l.preis) || 0,
      ortschaft: String(l.ortschaft || ""),
      zustand: String(l.zustand || ""),
      image_url: imgUrl,
    };
  });
}

const HomeMapView = forwardRef<MapHandle, HomeMapViewProps>(function HomeMapView(
  { markers },
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
  const [panel, setPanel] = useState<PanelState>(PANEL_INIT);

  function fetchPanel(title: string, fetchUrl: string, searchLink: string) {
    console.log("[MapPanel] fetchPanel:", title, fetchUrl);
    setPanel({ open: true, listings: [], title, loading: true, searchLink });

    fetch(fetchUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data.listings || []);
        const items = parsePanelListings(raw);
        console.log("[MapPanel] results:", items.length);
        setPanel((p) => ({ ...p, listings: items, loading: false, title: `${items.length} Inserate` }));
      })
      .catch((err) => {
        console.error("[MapPanel] fetch failed:", err);
        setPanel(PANEL_INIT);
      });
  }

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
    openPanel(title: string, fetchUrl: string, searchLink: string) {
      fetchPanel(title, fetchUrl, searchLink);
    },
    closePanel() {
      setPanel(PANEL_INIT);
    },
  }));

  // Invalidate map size when panel opens/closes
  useEffect(() => {
    const timer = setTimeout(() => {
      try { mapRef.current?.invalidateSize(); } catch { /* ignore */ }
    }, 350);
    return () => clearTimeout(timer);
  }, [panel.open]);

  // Load Leaflet + MarkerCluster dynamically (SSR-safe)
  useEffect(() => {
    let cancelled = false;
    async function loadLeaflet() {
      try {
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
        .gun-cluster-icon { cursor: pointer !important; }
        .leaflet-marker-icon:not(.marker-cluster):not(.gun-cluster-icon) {
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
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

      // Cluster click → open panel with nearby listings
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.on("clusterclick", (e: any) => {
        try {
          const center = e.layer.getLatLng();
          const count = e.layer.getChildCount();
          console.log("[MapPanel] clusterclick fired", { lat: center.lat, lng: center.lng, count });
          fetchPanel(
            `${count} Inserate`,
            `/api/listings/nearby?lat=${center.lat}&lng=${center.lng}&radius=15&limit=40`,
            "/suche"
          );
        } catch (err) {
          console.error("[MapPanel] clusterclick error:", err);
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

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div ref={mapContainerRef} style={{ flex: 1, minWidth: 0 }} />
      {panel.open && (
        <div
          style={{
            width: 320,
            overflowY: "auto",
            background: "white",
            borderLeft: "1px solid #e5e7eb",
            scrollbarWidth: "thin" as const,
            scrollbarColor: "#16a34a #f3f4f6",
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 1,
            }}
          >
            <strong style={{ fontSize: 14, color: "#1a2e1a" }}>{panel.title}</strong>
            <button
              onClick={() => setPanel(PANEL_INIT)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#9ca3af",
                padding: "4px 8px",
                borderRadius: 6,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              ✕
            </button>
          </div>

          {/* Loading */}
          {panel.loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>
              <div
                style={{
                  width: 24, height: 24, border: "2px solid #16a34a", borderTopColor: "transparent",
                  borderRadius: "50%", animation: "spin 1s linear infinite",
                  margin: "0 auto 8px",
                }}
              />
              <span style={{ fontSize: 12 }}>Lade Inserate…</span>
            </div>
          )}

          {/* Listings */}
          {!panel.loading && panel.listings.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#9ca3af", fontSize: 12 }}>
              Keine Inserate gefunden
            </div>
          )}

          {!panel.loading && panel.listings.map((l) => (
            <div
              key={l.id}
              onClick={() => window.open(`/inserat/${l.id}`, "_blank")}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                borderBottom: "1px solid #f3f4f6",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f0fdf4"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.image_url || "/placeholder.jpg"}
                alt=""
                style={{ width: 52, height: 52, borderRadius: 6, objectFit: "cover", background: "#f3f4f6" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {l.titel}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                  {l.ortschaft}{l.ortschaft && l.zustand ? " · " : ""}{l.zustand}
                </div>
              </div>
              <div style={{ fontWeight: 700, color: "#16a34a", fontSize: 13, whiteSpace: "nowrap" }}>
                CHF {l.preis.toLocaleString("de-CH")}
              </div>
            </div>
          ))}

          {/* Footer */}
          {!panel.loading && panel.listings.length > 0 && (
            <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", position: "sticky", bottom: 0, background: "white" }}>
              <a
                href={panel.searchLink}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  background: "#16a34a", color: "white", borderRadius: 8, padding: "8px 12px",
                  fontSize: 12, fontWeight: 600, textDecoration: "none",
                }}
              >
                Alle Inserate anzeigen →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default HomeMapView;
