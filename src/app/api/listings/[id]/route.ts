import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();
    const listing = db
      .prepare(
        `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ, u.created_at as user_created_at
         FROM listings l
         JOIN users u ON l.user_id = u.id
         WHERE l.id = ?`
      )
      .get(params.id) as Record<string, unknown> | undefined;

    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const images = db
      .prepare("SELECT * FROM listing_images WHERE listing_id = ? ORDER BY position")
      .all(params.id);

    listing.images = images;

    return NextResponse.json(listing);
  } catch (error) {
    console.error("GET /api/listings/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();
    const body = await req.json();

    const existing = db.prepare("SELECT id FROM listings WHERE id = ?").get(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const fields: string[] = [];
    const values: (string | number | null)[] = [];

    const allowedFields = [
      "titel", "beschreibung", "hauptkategorie", "unterkategorie", "rechtsstatus",
      "marke", "modell", "kaliber", "zustand", "baujahr", "lauflaenge", "magazin",
      "preis", "verhandelbar", "tausch", "kanton", "ortschaft", "plz", "lat", "lng", "status",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    fields.push("updated_at = datetime('now')");
    values.push(params.id);

    db.prepare(`UPDATE listings SET ${fields.join(", ")} WHERE id = ?`).run(...values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/listings/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();

    const result = db
      .prepare("UPDATE listings SET status = 'geloescht', updated_at = datetime('now') WHERE id = ?")
      .run(params.id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/listings/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
