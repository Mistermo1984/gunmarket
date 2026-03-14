import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();

    // Try to get user_id from body for listing-based deletion
    let result;
    try {
      const body = await req.json();
      if (body.user_id) {
        // Delete by user_id + listing_id
        result = db
          .prepare("DELETE FROM favorites WHERE user_id = ? AND listing_id = ?")
          .run(body.user_id, params.id);
      } else {
        result = db.prepare("DELETE FROM favorites WHERE id = ?").run(params.id);
      }
    } catch {
      // No body, delete by favorite ID
      result = db.prepare("DELETE FROM favorites WHERE id = ?").run(params.id);
    }

    if (result.changes === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/favorites/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
