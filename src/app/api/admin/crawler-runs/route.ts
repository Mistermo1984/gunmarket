import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeSchema, dbAll, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await initializeSchema();

    // Last 50 runs, newest first
    const runs = await dbAll<Record<string, unknown>>(
      "SELECT * FROM crawler_runs ORDER BY started_at DESC LIMIT 50"
    );

    // Summary stats
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const weekStats = await dbGet<{ new_total: number; removed_total: number; run_count: number; avg_duration: number }>(
      `SELECT
        COALESCE(SUM(new_listings), 0) as new_total,
        COALESCE(SUM(removed_listings), 0) as removed_total,
        COUNT(*) as run_count,
        COALESCE(AVG(duration_ms), 0) as avg_duration
      FROM crawler_runs WHERE started_at > ?`,
      [weekAgo]
    );

    // Source health: last successful run per source
    const sourceHealth = await dbAll<{ source: string; last_success: string; last_status: string }>(
      `SELECT source, MAX(started_at) as last_success, status as last_status
       FROM crawler_runs WHERE status = 'completed'
       GROUP BY source`
    );

    // Mapping coverage
    const mappingStats = await dbGet<{ total: number; url_conf: number; title_conf: number; fallback_conf: number }>(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN kategorie_confidence = 'url' THEN 1 ELSE 0 END) as url_conf,
        SUM(CASE WHEN kategorie_confidence = 'title' THEN 1 ELSE 0 END) as title_conf,
        SUM(CASE WHEN kategorie_confidence = 'fallback' THEN 1 ELSE 0 END) as fallback_conf
      FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun') AND status = 'aktiv'`
    );

    // Image coverage
    const imageStats = await dbGet<{ total: number; with_images: number }>(
      `SELECT
        COUNT(*) as total,
        (SELECT COUNT(DISTINCT listing_id) FROM listing_images WHERE listing_id IN (SELECT id FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun') AND status = 'aktiv')) as with_images
      FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun') AND status = 'aktiv'`
    );

    return NextResponse.json({
      runs,
      summary: {
        weekNewListings: weekStats?.new_total || 0,
        weekRemovedListings: weekStats?.removed_total || 0,
        weekRunCount: weekStats?.run_count || 0,
        avgDurationMs: Math.round(weekStats?.avg_duration || 0),
      },
      sourceHealth,
      health: {
        mappingCoverage: mappingStats?.total
          ? Math.round(((mappingStats.url_conf + mappingStats.title_conf) / mappingStats.total) * 100)
          : 100,
        mappingTotal: mappingStats?.total || 0,
        mappingFallback: mappingStats?.fallback_conf || 0,
        imageCoverage: imageStats?.total
          ? Math.round((imageStats.with_images / imageStats.total) * 100)
          : 100,
        imageTotal: imageStats?.total || 0,
        imageWithImages: imageStats?.with_images || 0,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
