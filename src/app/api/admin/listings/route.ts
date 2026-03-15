import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeSchema, dbAll, dbRun } from "@/lib/db";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  await initializeSchema();

  const listings = await dbAll(`
    SELECT
      l.*,
      u.vorname, u.nachname, u.email as user_email, u.anbieter_typ,
      (SELECT COUNT(*) FROM favorites WHERE listing_id = l.id) as favorite_count,
      (SELECT COUNT(*) FROM messages WHERE listing_id = l.id) as message_count
    FROM listings l
    JOIN users u ON l.user_id = u.id
    ORDER BY l.created_at DESC
  `);

  return NextResponse.json({ listings });
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const body = await request.json();
  const { listing_id, status } = body;

  if (!listing_id) {
    return NextResponse.json({ error: "listing_id erforderlich" }, { status: 400 });
  }

  await initializeSchema();

  if (status) {
    await dbRun(
      "UPDATE listings SET status = ?, updated_at = datetime('now') WHERE id = ?",
      [status, listing_id]
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get("listing_id");

  if (!listingId) {
    return NextResponse.json({ error: "listing_id erforderlich" }, { status: 400 });
  }

  await initializeSchema();
  await dbRun("DELETE FROM listings WHERE id = ?", [listingId]);

  return NextResponse.json({ success: true });
}
