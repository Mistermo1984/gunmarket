import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { haversineDistance } from "@/lib/geocoding";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const radius = parseFloat(searchParams.get("radius") || "50");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "lat and lng parameters required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Rough bounding box filter (1 degree ≈ 111km)
    const latDelta = radius / 111;
    const lngDelta = radius / (111 * Math.cos((lat * Math.PI) / 180));

    const listings = db
      .prepare(
        `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ
         FROM listings l
         JOIN users u ON l.user_id = u.id
         WHERE l.status = 'aktiv'
           AND l.lat BETWEEN ? AND ?
           AND l.lng BETWEEN ? AND ?
         ORDER BY l.created_at DESC`
      )
      .all(
        lat - latDelta,
        lat + latDelta,
        lng - lngDelta,
        lng + lngDelta
      ) as { lat: number; lng: number; [key: string]: unknown }[];

    // Exact Haversine filter
    const filtered = listings
      .map((l) => ({
        ...l,
        distance: haversineDistance(lat, lng, l.lat, l.lng),
      }))
      .filter((l) => l.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return NextResponse.json({ listings: filtered, total: filtered.length });
  } catch (error) {
    console.error("GET /api/listings/nearby error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
