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

    const startsWith = `${q}%`;
    const contains = `%${q}%`;

    // Prioritize titles starting with query, then containing it.
    // Also search marke, modell, kaliber, beschreibung — same fields as listings API.
    const rows = await dbAll<{ val: string; prio: number }>(
      `SELECT val, MIN(prio) as prio FROM (
        SELECT titel as val, 1 as prio FROM listings
        WHERE status = 'aktiv' AND titel LIKE ?
        UNION ALL
        SELECT titel as val, 2 as prio FROM listings
        WHERE status = 'aktiv' AND titel LIKE ? AND titel NOT LIKE ?
        UNION ALL
        SELECT marke as val, 1 as prio FROM listings
        WHERE status = 'aktiv' AND marke LIKE ? AND marke IS NOT NULL AND marke != ''
        UNION ALL
        SELECT modell as val, 2 as prio FROM listings
        WHERE status = 'aktiv' AND modell LIKE ? AND modell IS NOT NULL AND modell != ''
        UNION ALL
        SELECT kaliber as val, 2 as prio FROM listings
        WHERE status = 'aktiv' AND kaliber LIKE ? AND kaliber IS NOT NULL AND kaliber != ''
        UNION ALL
        SELECT titel as val, 3 as prio FROM listings
        WHERE status = 'aktiv' AND beschreibung LIKE ? AND titel NOT LIKE ?
      ) GROUP BY val ORDER BY prio, val LIMIT 8`,
      [startsWith, contains, startsWith, startsWith, startsWith, startsWith, contains, contains]
    );

    const suggestions = rows.map((r) => r.val);

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("Search suggestions error:", err);
    return NextResponse.json({ suggestions: [] });
  }
}
