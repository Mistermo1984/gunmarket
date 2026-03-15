import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbAll, dbRun } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    await initializeSchema();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json({ error: "user_id required" }, { status: 400 });
    }

    const messages = await dbAll(
      `SELECT m.*,
         s.vorname as sender_vorname, s.nachname as sender_nachname,
         r.vorname as receiver_vorname, r.nachname as receiver_nachname,
         l.titel as listing_titel
       FROM messages m
       JOIN users s ON m.sender_id = s.id
       JOIN users r ON m.receiver_id = r.id
       LEFT JOIN listings l ON m.listing_id = l.id
       WHERE m.sender_id = ? OR m.receiver_id = ?
       ORDER BY m.created_at DESC`,
      [userId, userId]
    );

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const body = await req.json();
    const { sender_id, receiver_id, listing_id, content } = body;

    if (!sender_id || !receiver_id || !content) {
      return NextResponse.json(
        { error: "sender_id, receiver_id and content required" },
        { status: 400 }
      );
    }

    const id = uuidv4();
    await dbRun(
      `INSERT INTO messages (id, sender_id, receiver_id, listing_id, content)
       VALUES (?, ?, ?, ?, ?)`,
      [id, sender_id, receiver_id, listing_id || null, content]
    );

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
