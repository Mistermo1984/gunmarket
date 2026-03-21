import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbAll, dbRun } from "@/lib/db";
import { kantonToFullName } from "@/lib/plz-coordinates";
import { CATEGORY_ALIASES } from "@/lib/constants";
import { v4 as uuidv4 } from "uuid";
import { sendListingApprovedEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await initializeSchema();
    const { searchParams } = new URL(req.url);

    const kategorie = searchParams.get("kategorie");
    const unterkategorie = searchParams.get("unterkategorie");
    const rechtsstatus = searchParams.get("rechtsstatus");
    const kanton = searchParams.get("kanton");
    const zustand = searchParams.get("zustand");
    const kaliber = searchParams.get("kaliber");
    const minPreis = searchParams.get("minPreis");
    const maxPreis = searchParams.get("maxPreis");
    const userId = searchParams.get("user_id");
    const suche = searchParams.get("suche");
    const sortierung = searchParams.get("sort") || "preis-asc";
    const seite = parseInt(searchParams.get("seite") || "1");
    const limit = parseInt(searchParams.get("limit") || "25");
    const offset = (seite - 1) * limit;

    let where = userId ? "WHERE l.status != 'geloescht'" : "WHERE l.status = 'aktiv'";
    const params: (string | number)[] = [];

    if (userId) {
      where += " AND l.user_id = ?";
      params.push(userId);
    }
    if (kategorie) {
      const kats = kategorie.split(",").map((k) => k.trim()).filter(Boolean)
        .map((k) => CATEGORY_ALIASES[k] || k);
      if (kats.length === 1) {
        where += " AND l.hauptkategorie = ?";
        params.push(kats[0]);
      } else if (kats.length > 1) {
        where += ` AND l.hauptkategorie IN (${kats.map(() => "?").join(",")})`;
        params.push(...kats);
      }
    }
    if (unterkategorie) {
      const uks = unterkategorie.split(",").map((k) => k.trim()).filter(Boolean);
      if (uks.length === 1) {
        where += " AND l.unterkategorie = ?";
        params.push(uks[0]);
      } else if (uks.length > 1) {
        where += ` AND l.unterkategorie IN (${uks.map(() => "?").join(",")})`;
        params.push(...uks);
      }
    }
    if (rechtsstatus) {
      const rss = rechtsstatus.split(",").map((k) => k.trim()).filter(Boolean);
      if (rss.length === 1) {
        where += " AND l.rechtsstatus = ?";
        params.push(rss[0]);
      } else if (rss.length > 1) {
        where += ` AND l.rechtsstatus IN (${rss.map(() => "?").join(",")})`;
        params.push(...rss);
      }
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
      const zs = zustand.split(",").map((z) => z.trim()).filter(Boolean);
      if (zs.length === 1) {
        where += " AND l.zustand = ?";
        params.push(zs[0]);
      } else if (zs.length > 1) {
        where += ` AND l.zustand IN (${zs.map(() => "?").join(",")})`;
        params.push(...zs);
      }
    }
    if (kaliber) {
      const kals = kaliber.split(",").map((k) => k.trim()).filter(Boolean);
      if (kals.length === 1) {
        where += " AND l.kaliber LIKE ?";
        params.push(`%${kals[0]}%`);
      } else if (kals.length > 1) {
        where += ` AND (${kals.map(() => "l.kaliber LIKE ?").join(" OR ")})`;
        params.push(...kals.map((k) => `%${k}%`));
      }
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
      where += " AND (l.titel LIKE ? OR l.beschreibung LIKE ? OR l.marke LIKE ? OR l.modell LIKE ? OR l.kaliber LIKE ?)";
      const term = `%${suche}%`;
      params.push(term, term, term, term, term);
    }
    const neuSeitTagen = searchParams.get("neu_seit_tagen");
    if (neuSeitTagen) {
      const days = parseInt(neuSeitTagen);
      if (days > 0) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        where += " AND l.created_at >= ?";
        params.push(cutoff.toISOString().replace("T", " ").slice(0, 19));
      }
    }

    // Sort: default to price ascending. CAST ensures numeric sort even if column type changes.
    // For price sorts, exclude price=0 ("Auf Anfrage") and outliers >50k so real listings show first.
    let orderBy: string;
    let priceWhere = "";
    switch (sortierung) {
      case "preis-desc":
        orderBy = "ORDER BY CAST(l.preis AS REAL) DESC";
        priceWhere = " AND l.preis > 1 AND l.preis < 50000";
        break;
      case "neueste":
        orderBy = "ORDER BY l.created_at DESC";
        break;
      case "aelteste":
        orderBy = "ORDER BY l.created_at ASC";
        break;
      case "aufrufe":
        orderBy = "ORDER BY l.aufrufe DESC";
        break;
      case "preis-asc":
      default:
        orderBy = "ORDER BY CAST(l.preis AS REAL) ASC";
        priceWhere = " AND l.preis > 1 AND l.preis < 50000";
        break;
    }

    const countRow = await dbGet<{ total: number }>(
      `SELECT COUNT(*) as total FROM listings l ${where}${priceWhere}`,
      params
    );

    const listings = await dbAll(
      `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ
       FROM listings l
       JOIN users u ON l.user_id = u.id
       ${where}${priceWhere} ${orderBy}
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

    // Send listing confirmation email (non-blocking)
    try {
      const user = await dbGet<{ email: string }>(
        "SELECT email FROM users WHERE id = ?",
        [user_id]
      );
      if (user?.email) {
        await sendListingApprovedEmail(user.email, titel, id);
      }
    } catch (emailErr) {
      console.error("Listing email error:", emailErr);
    }

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/listings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
