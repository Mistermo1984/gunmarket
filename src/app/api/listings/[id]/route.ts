import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbAll, dbRun } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeSchema();
    const listing = await dbGet(
      `SELECT l.*, u.vorname, u.nachname, u.anbieter_typ as verkaeufer_typ, u.created_at as user_created_at
       FROM listings l
       JOIN users u ON l.user_id = u.id
       WHERE l.id = ?`,
      [params.id]
    );

    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const images = await dbAll(
      "SELECT * FROM listing_images WHERE listing_id = ? ORDER BY position",
      [params.id]
    );

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
    await initializeSchema();
    const body = await req.json();

    const existing = await dbGet("SELECT id FROM listings WHERE id = ?", [params.id]);
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

    await dbRun(`UPDATE listings SET ${fields.join(", ")} WHERE id = ?`, values);

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
    await initializeSchema();

    const result = await dbRun(
      "UPDATE listings SET status = 'geloescht', updated_at = datetime('now') WHERE id = ?",
      [params.id]
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/listings/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
