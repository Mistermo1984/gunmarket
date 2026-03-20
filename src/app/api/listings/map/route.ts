import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbAll } from "@/lib/db";
import { haversineDistance } from "@/lib/geocoding";
import { kantonToFullName } from "@/lib/plz-coordinates";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await initializeSchema();
    const { searchParams } = new URL(req.url);

    const kategorie = searchParams.get("kategorie");
    const rechtsstatus = searchParams.get("rechtsstatus");
    const kanton = searchParams.get("kanton");
    const zustand = searchParams.get("zustand");
    const minPreis = searchParams.get("minPreis");
    const maxPreis = searchParams.get("maxPreis");
    const suche = searchParams.get("suche");

    // Optional radius search params
    const centerLat = searchParams.get("lat") ? parseFloat(searchParams.get("lat")!) : null;
    const centerLng = searchParams.get("lng") ? parseFloat(searchParams.get("lng")!) : null;
    const radius = parseFloat(searchParams.get("radius") || "50");

    let where = "WHERE l.status = 'aktiv' AND l.lat IS NOT NULL AND l.lng IS NOT NULL";
    const params: (string | number)[] = [];

    // If center is set, use bounding box pre-filter
    if (centerLat && centerLng) {
      const latDelta = radius / 111;
      const lngDelta = radius / (111 * Math.cos((centerLat * Math.PI) / 180));
      where += " AND l.lat BETWEEN ? AND ? AND l.lng BETWEEN ? AND ?";
      params.push(
        centerLat - latDelta, centerLat + latDelta,
        centerLng - lngDelta, centerLng + lngDelta
      );
    }

    if (kategorie) {
      where += " AND (l.hauptkategorie = ? OR l.unterkategorie = ?)";
      params.push(kategorie, kategorie);
    }
    if (rechtsstatus) {
      where += " AND l.rechtsstatus = ?";
      params.push(rechtsstatus);
    }
    if (kanton) {
      const kantone = kanton.split(",").map((k) => k.trim()).filter(Boolean)
        .map((k) => kantonToFullName(k) || k);
      if (kantone.length === 1) {
        where += " AND l.kanton = ?";
        params.push(kantone[0]);
      } else if (kantone.length > 1) {
        where += ` AND l.kanton IN (${kantone.map(() => "?").join(",")})`;
        params.push(...kantone);
      }
    }
    if (zustand) {
      where += " AND l.zustand = ?";
      params.push(zustand);
    }
    if (minPreis) {
      where += " AND l.preis >= ?";
      params.push(parseFloat(minPreis));
    }
    if (maxPreis) {
      where += " AND l.preis <= ?";
      params.push(parseFloat(maxPreis));
    }
    if (suche) {
      where += " AND (l.titel LIKE ? OR l.beschreibung LIKE ? OR l.marke LIKE ?)";
      const term = `%${suche}%`;
      params.push(term, term, term);
    }

    let markers = await dbAll<{
      id: string; titel: string; preis: number; lat: number; lng: number;
      zustand: string; kanton: string; rechtsstatus: string; ortschaft: string;
      hauptkategorie: string; image_url: string | null;
    }>(
      `SELECT l.id, l.titel, l.preis, l.lat, l.lng,
              l.zustand, l.kanton, l.rechtsstatus, l.ortschaft, l.hauptkategorie,
              (SELECT url FROM listing_images WHERE listing_id = l.id ORDER BY position LIMIT 1) as image_url
       FROM listings l
       ${where}
       LIMIT 5000`,
      params
    );

    // Exact haversine filter when center is set
    if (centerLat && centerLng) {
      markers = markers.filter(
        (m) => haversineDistance(centerLat, centerLng, m.lat, m.lng) <= radius
      );
    }

    return NextResponse.json({ markers });
  } catch (error) {
    console.error("GET /api/listings/map error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
