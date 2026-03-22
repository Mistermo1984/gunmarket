import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbGet, dbRun } from "@/lib/db";
import { wissenWaffen, wissenMunition } from "@/lib/wissen-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await initializeSchema();

    // Wiki articles with video coverage
    const articlesWithVideo = wissenWaffen.filter(
      (w) => !!w.youtubeVideoId
    ).length;

    // Wiki articles with inhalt > 500 words
    const articlesOver500Words = wissenWaffen.filter(
      (w) => w.inhalt.split(/\s+/).length > 500
    ).length;

    // Total active listings
    const activeListingsRow = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM listings WHERE status = 'aktiv'"
    );
    const totalActiveListings = activeListingsRow?.count ?? 0;

    // New listings in last 7 days
    const newListingsRow = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM listings WHERE status = 'aktiv' AND created_at > datetime('now', '-7 days')"
    );
    const newListings7d = newListingsRow?.count ?? 0;

    // Total wiki articles (waffen + munition)
    const totalWikiArticles = wissenWaffen.length + wissenMunition.length;

    const healthData = {
      timestamp: new Date().toISOString(),
      wiki: {
        totalArticles: totalWikiArticles,
        waffenArticles: wissenWaffen.length,
        munitionArticles: wissenMunition.length,
        articlesWithVideo,
        articlesOver500Words,
      },
      listings: {
        totalActive: totalActiveListings,
        newLast7Days: newListings7d,
      },
    };

    console.log("[SEO-Check] Health data:", JSON.stringify(healthData, null, 2));

    return NextResponse.json({ success: true, data: healthData });
  } catch (error) {
    console.error("[SEO-Check] Error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
