import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

function unauthorized() {
  return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
}

// GET /api/admin/listings — All listings with user info
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const db = getDb();

  const listings = db.prepare(`
    SELECT
      l.*,
      u.vorname, u.nachname, u.email as user_email, u.anbieter_typ,
      (SELECT COUNT(*) FROM favorites WHERE listing_id = l.id) as favorite_count,
      (SELECT COUNT(*) FROM messages WHERE listing_id = l.id) as message_count
    FROM listings l
    JOIN users u ON l.user_id = u.id
    ORDER BY l.created_at DESC
  `).all();

  return NextResponse.json({ listings });
}

// PUT /api/admin/listings — Admin update (status change, etc.)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const body = await request.json();
  const { listing_id, status } = body;

  if (!listing_id) {
    return NextResponse.json({ error: "listing_id erforderlich" }, { status: 400 });
  }

  const db = getDb();

  if (status) {
    db.prepare("UPDATE listings SET status = ?, updated_at = datetime('now') WHERE id = ?").run(status, listing_id);
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/admin/listings — Hard delete listing
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get("listing_id");

  if (!listingId) {
    return NextResponse.json({ error: "listing_id erforderlich" }, { status: 400 });
  }

  const db = getDb();
  db.prepare("DELETE FROM listings WHERE id = ?").run(listingId);

  return NextResponse.json({ success: true });
}
