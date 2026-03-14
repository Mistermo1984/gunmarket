import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();

    const result = db
      .prepare("UPDATE listings SET aufrufe = aufrufe + 1 WHERE id = ? AND status = 'aktiv'")
      .run(params.id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/listings/[id]/view error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
