import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * GET /api/listings/map?kategorie=...&rechtsstatus=...
 * Returns lightweight markers (id, titel, preis, lat, lng) for all matching listings with coordinates.
 * No images, no pagination — optimized for map display.
 */
export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);

    const kategorie = searchParams.get("kategorie");
    const rechtsstatus = searchParams.get("rechtsstatus");
    const kanton = searchParams.get("kanton");
    const zustand = searchParams.get("zustand");
    const minPreis = searchParams.get("minPreis");
    const maxPreis = searchParams.get("maxPreis");
    const suche = searchParams.get("suche");

    let where = "WHERE l.status = 'aktiv' AND l.lat IS NOT NULL AND l.lng IS NOT NULL";
    const params: (string | number)[] = [];

    if (kategorie) {
      where += " AND (l.hauptkategorie = ? OR l.unterkategorie = ?)";
      params.push(kategorie, kategorie);
    }
    if (rechtsstatus) {
      where += " AND l.rechtsstatus = ?";
      params.push(rechtsstatus);
    }
    if (kanton) {
      where += " AND l.kanton = ?";
      params.push(kanton);
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

    const markers = db
      .prepare(
        `SELECT l.id, l.titel, l.preis, l.lat, l.lng
         FROM listings l
         ${where}
         LIMIT 5000`
      )
      .all(...params);

    return NextResponse.json({ markers });
  } catch (error) {
    console.error("GET /api/listings/map error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
