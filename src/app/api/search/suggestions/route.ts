import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbAll } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await initializeSchema();
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    if (q.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const term = `%${q}%`;
    const rows = await dbAll(
      `SELECT DISTINCT titel FROM listings
       WHERE status = 'aktiv' AND titel LIKE ?
       ORDER BY titel
       LIMIT 8`,
      [term]
    ) as { titel: string }[];

    const suggestions = rows.map((r) => r.titel);

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("Search suggestions error:", err);
    return NextResponse.json({ suggestions: [] });
  }
}
