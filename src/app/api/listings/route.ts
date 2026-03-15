import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbAll, dbRun } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

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
    const userId = searchParams.get("user_id");
    const suche = searchParams.get("suche");
    const sortierung = searchParams.get("sort") || "neueste";
    const seite = parseInt(searchParams.get("seite") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (seite - 1) * limit;

    let where = userId ? "WHERE l.status != 'geloescht'" : "WHERE l.status = 'aktiv'";
    const params: (string | number)[] = [];

    if (userId) {
      where += " AND l.user_id = ?";
      params.push(userId);
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

    let orderBy = "ORDER BY l.created_at DESC";
    if (sortierung === "preis-asc") orderBy = "ORDER BY l.preis ASC";
    if (sortierung === "preis-desc") orderBy = "ORDER BY l.preis DESC";
    if (sortierung === "aufrufe") orderBy = "ORDER BY l.aufrufe DESC";

    const countRow = await dbGet<{ total: number }>(
      `SELECT COUNT(*) as total FROM listings l ${where}`,
      params
    );

    const listings = await dbAll(
      `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ
       FROM listings l
       JOIN users u ON l.user_id = u.id
       ${where} ${orderBy}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Attach images
    const listingIds = listings.map((l) => l.id as string);
    if (listingIds.length > 0) {
      const placeholders = listingIds.map(() => "?").join(",");
      const images = await dbAll(
        `SELECT * FROM listing_images WHERE listing_id IN (${placeholders}) ORDER BY position`,
        listingIds
      );

      const imageMap = new Map<string, Record<string, unknown>[]>();
      for (const img of images) {
        const lid = img.listing_id as string;
        if (!imageMap.has(lid)) imageMap.set(lid, []);
        imageMap.get(lid)!.push(img);
      }
      for (const l of listings) {
        l.images = imageMap.get(l.id as string) || [];
      }
    }

    return NextResponse.json({
      listings,
      total: countRow?.total ?? 0,
      seite,
      totalSeiten: Math.ceil((countRow?.total ?? 0) / limit),
    });
  } catch (error) {
    console.error("GET /api/listings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const body = await req.json();

    const {
      user_id, titel, beschreibung, hauptkategorie, unterkategorie,
      rechtsstatus, marke, modell, kaliber, zustand, baujahr,
      lauflaenge, magazin, preis, verhandelbar, tausch,
      kanton, ortschaft, plz, lat, lng,
    } = body;

    if (!user_id || !titel || !beschreibung || !hauptkategorie || !unterkategorie || !rechtsstatus || !zustand || !preis || !kanton || !ortschaft) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = uuidv4();

    await dbRun(
      `INSERT INTO listings (id, user_id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus, marke, modell, kaliber, zustand, baujahr, lauflaenge, magazin, preis, verhandelbar, tausch, kanton, ortschaft, plz, lat, lng)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, user_id, titel, beschreibung, hauptkategorie, unterkategorie,
        rechtsstatus, marke || null, modell || null, kaliber || null,
        zustand, baujahr || null, lauflaenge || null, magazin || null,
        preis, verhandelbar ? 1 : 0, tausch ? 1 : 0,
        kanton, ortschaft, plz || null, lat || null, lng || null,
      ]
    );

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/listings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
