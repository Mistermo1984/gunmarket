import { NextRequest, NextResponse } from "next/server";
import { getCrawlSteps, runCrawlStep } from "@/lib/crawl-waffengebraucht";
import { dbRun } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min for Pro, ignored on Hobby

// Vercel Cron calls this endpoint daily at 17:00 CET (15:00 UTC)
export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const steps = getCrawlSteps();
    let totalInserted = 0;
    let totalDeleted = 0;

    // Reset live_source_ids before starting
    await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'").catch(() => {});

    for (const step of steps) {
      console.log(`[Cron] Running step: ${step.id}`);
      const result = await runCrawlStep(step.id);
      totalInserted += result.inserted;
      totalDeleted += result.deleted;
      console.log(`[Cron] Step ${step.id}: +${result.inserted} -${result.deleted}`);
    }

    console.log(`[Cron] Done: ${totalInserted} new, ${totalDeleted} removed`);
    return NextResponse.json({
      success: true,
      inserted: totalInserted,
      deleted: totalDeleted,
    });
  } catch (err) {
    console.error("[Cron] Crawl error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
