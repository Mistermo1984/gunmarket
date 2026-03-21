import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await initializeSchema();
    const userId = new URL(req.url).searchParams.get("user_id");
    if (!userId) {
      return NextResponse.json({ count: 0 });
    }

    const row = await dbGet<{ count: number }>(
      `SELECT COUNT(*) as count FROM favorites f
       JOIN listings l ON f.listing_id = l.id
       WHERE f.user_id = ? AND l.status IN ('aktiv', 'inaktiv')`,
      [userId]
    );

    return NextResponse.json({ count: row?.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
