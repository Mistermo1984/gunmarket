import { NextRequest, NextResponse } from "next/server";
import { runCrawl } from "@/lib/crawl-waffengebraucht";
import { initializeSchema } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function randomDelay(maxMinutes: number): Promise<void> {
  const ms = Math.floor(Math.random() * maxMinutes * 60 * 1000);
  console.log(`[Cron] Random delay: ${Math.round(ms / 60000)} minutes`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Vercel Cron calls this endpoint daily at 00:00 UTC
// Random delay 0–120 min so we don't always hit sources at the same time
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initializeSchema();
    await randomDelay(120);

    const result = await runCrawl();

    console.log(
      `[Cron] Done: ${result.inserted} new, ${result.updated} updated, ${result.unchanged} unchanged, ${result.deleted} removed in ${result.duration}ms`
    );
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[Cron] Crawl error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
