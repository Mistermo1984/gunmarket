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

  const users = await dbAll(`
    SELECT
      u.id, u.email, u.vorname, u.nachname, u.anbieter_typ, u.telefon, u.kanton,
      u.firmenname, u.is_admin, u.created_at,
      (SELECT COUNT(*) FROM listings WHERE user_id = u.id AND status != 'geloescht') as listing_count,
      (SELECT COALESCE(SUM(aufrufe), 0) FROM listings WHERE user_id = u.id) as total_aufrufe,
      (SELECT COUNT(*) FROM messages WHERE sender_id = u.id) as messages_sent,
      (SELECT COUNT(*) FROM messages WHERE receiver_id = u.id) as messages_received
    FROM users u
    ORDER BY u.created_at DESC
  `);

  return NextResponse.json({ users });
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const body = await request.json();
  const { user_id, is_admin } = body;

  if (!user_id) {
    return NextResponse.json({ error: "user_id erforderlich" }, { status: 400 });
  }

  await initializeSchema();

  if (typeof is_admin === "number") {
    await dbRun("UPDATE users SET is_admin = ? WHERE id = ?", [is_admin, user_id]);
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "user_id erforderlich" }, { status: 400 });
  }

  if (userId === session.user.id) {
    return NextResponse.json({ error: "Eigenen Account kann nicht gelöscht werden" }, { status: 400 });
  }

  await initializeSchema();
  await dbRun("DELETE FROM users WHERE id = ?", [userId]);

  return NextResponse.json({ success: true });
}
