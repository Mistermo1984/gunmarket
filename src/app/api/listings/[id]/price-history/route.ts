import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbAll } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeSchema();
    const { id } = await params;

    const history = await dbAll(
      "SELECT id, listing_id, preis, recorded_at FROM listing_price_history WHERE listing_id = ? ORDER BY recorded_at ASC",
      [id]
    );

    return NextResponse.json({ history });
  } catch (error) {
    console.error("GET /api/listings/[id]/price-history error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
