import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbRun } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeSchema();

    const result = await dbRun(
      "UPDATE listings SET aufrufe = aufrufe + 1 WHERE id = ? AND status = 'aktiv'",
      [params.id]
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/listings/[id]/view error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
