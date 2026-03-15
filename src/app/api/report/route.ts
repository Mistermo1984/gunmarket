import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbRun } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const body = await req.json();
    const { listing_id, reason, details } = body;

    if (!listing_id || !reason) {
      return NextResponse.json(
        { error: "listing_id and reason are required" },
        { status: 400 }
      );
    }

    await dbRun(
      "INSERT INTO reports (listing_id, reason, details) VALUES (?, ?, ?)",
      [listing_id, reason, details || null]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
