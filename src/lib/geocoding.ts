import { getDb } from "./db";

interface GeoResult {
  lat: number;
  lng: number;
  display_name: string;
}

const GEOCODE_CACHE = new Map<string, GeoResult>();
let lastRequestTime = 0;
const MIN_INTERVAL = 1100; // 1 req/sec (Nominatim policy)

export async function geocodeOrtschaft(
  ortschaft: string,
  kanton: string
): Promise<GeoResult | null> {
  const cacheKey = `${ortschaft}-${kanton}`.toLowerCase();

  // Check memory cache
  if (GEOCODE_CACHE.has(cacheKey)) {
    return GEOCODE_CACHE.get(cacheKey)!;
  }

  // Check DB cache
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS geocode_cache (
      key TEXT PRIMARY KEY,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      display_name TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  const cached = db
    .prepare("SELECT lat, lng, display_name FROM geocode_cache WHERE key = ?")
    .get(cacheKey) as { lat: number; lng: number; display_name: string } | undefined;

  if (cached) {
    const result = { lat: cached.lat, lng: cached.lng, display_name: cached.display_name };
    GEOCODE_CACHE.set(cacheKey, result);
    return result;
  }

  // Rate limiting
  const now = Date.now();
  const waitTime = MIN_INTERVAL - (now - lastRequestTime);
  if (waitTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
  lastRequestTime = Date.now();

  try {
    const query = encodeURIComponent(`${ortschaft}, ${kanton}, Schweiz`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=ch`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "GunMarket.ch/1.0 (info@gunmarket.ch)",
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || data.length === 0) return null;

    const result: GeoResult = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };

    // Store in DB cache
    db.prepare(
      "INSERT OR REPLACE INTO geocode_cache (key, lat, lng, display_name) VALUES (?, ?, ?, ?)"
    ).run(cacheKey, result.lat, result.lng, result.display_name);

    GEOCODE_CACHE.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // km
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
