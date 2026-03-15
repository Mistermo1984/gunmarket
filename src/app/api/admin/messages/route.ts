import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeSchema, dbAll, dbRun } from "@/lib/db";

function unauthorized() {
  return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  await initializeSchema();

  const messages = await dbAll(`
    SELECT
      m.id, m.content, m.created_at, m.read_at, m.listing_id,
      m.sender_id, s.vorname as sender_vorname, s.nachname as sender_nachname, s.email as sender_email,
      m.receiver_id, r.vorname as receiver_vorname, r.nachname as receiver_nachname, r.email as receiver_email,
      l.titel as listing_titel
    FROM messages m
    JOIN users s ON m.sender_id = s.id
    JOIN users r ON m.receiver_id = r.id
    LEFT JOIN listings l ON m.listing_id = l.id
    ORDER BY m.created_at DESC
  `);

  return NextResponse.json({ messages });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const { searchParams } = new URL(request.url);
  const messageId = searchParams.get("message_id");

  if (!messageId) {
    return NextResponse.json({ error: "message_id erforderlich" }, { status: 400 });
  }

  await initializeSchema();
  await dbRun("DELETE FROM messages WHERE id = ?", [messageId]);

  return NextResponse.json({ success: true });
}
