import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbRun } from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeSchema();

    let result;
    try {
      const body = await req.json();
      if (body.user_id) {
        result = await dbRun(
          "DELETE FROM favorites WHERE user_id = ? AND listing_id = ?",
          [body.user_id, params.id]
        );
      } else {
        result = await dbRun("DELETE FROM favorites WHERE id = ?", [params.id]);
      }
    } catch {
      result = await dbRun("DELETE FROM favorites WHERE id = ?", [params.id]);
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
