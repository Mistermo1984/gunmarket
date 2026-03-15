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

    const favorites = await dbAll(
      `SELECT f.id, f.created_at, l.*
       FROM favorites f
       JOIN listings l ON f.listing_id = l.id
       WHERE f.user_id = ? AND l.status = 'aktiv'
       ORDER BY f.created_at DESC`,
      [userId]
    );

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("GET /api/favorites error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const body = await req.json();
    const { user_id, listing_id } = body;

    if (!user_id || !listing_id) {
      return NextResponse.json(
        { error: "user_id and listing_id required" },
        { status: 400 }
      );
    }

    const id = uuidv4();
    await dbRun(
      "INSERT OR IGNORE INTO favorites (id, user_id, listing_id) VALUES (?, ?, ?)",
      [id, user_id, listing_id]
    );

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/favorites error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
