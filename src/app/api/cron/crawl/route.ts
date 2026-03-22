import { NextRequest, NextResponse } from "next/server";
import { runCrawlStep, getCrawlSteps, ensureCrawlMetaTable } from "@/lib/crawl-waffengebraucht";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Step-based crawler: each hourly invocation processes ONE crawl step.
 * Tracks progress in crawl_meta table. With 13 steps and hourly cron,
 * a full cycle completes in ~13 hours.
 *
 * Query params:
 *   ?step=<id>   — run a specific step (skip auto-advance)
 *   ?reset=true  — reset to step 0 and start fresh cycle
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initializeSchema();
    await ensureCrawlMetaTable();

    const steps = getCrawlSteps();
    const { searchParams } = new URL(req.url);
    const explicitStep = searchParams.get("step");
    const reset = searchParams.get("reset") === "true";

    // Ensure tracking key exists
    await dbRun(
      "INSERT OR IGNORE INTO crawl_meta (key, value) VALUES ('crawl_step_index', '0')"
    );

    let stepIndex: number;

    if (explicitStep) {
      const idx = steps.findIndex((s) => s.id === explicitStep);
      if (idx === -1) {
        return NextResponse.json({ error: `Unknown step: ${explicitStep}` }, { status: 400 });
      }
      stepIndex = idx;
    } else if (reset) {
      stepIndex = 0;
      await dbRun("INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('crawl_step_index', '0')");
      await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'");
    } else {
      const row = await dbGet<{ value: string }>(
        "SELECT value FROM crawl_meta WHERE key = 'crawl_step_index'"
      );
      stepIndex = parseInt(row?.value || "0");

      // Completed all steps — start new cycle
      if (stepIndex >= steps.length) {
        stepIndex = 0;
        await dbRun("INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('crawl_step_index', '0')");
        await dbRun("DELETE FROM crawl_meta WHERE key = 'live_source_ids'");
      }
    }

    const step = steps[stepIndex];
    console.log(`[Cron] Step ${stepIndex + 1}/${steps.length}: ${step.label}`);

    const result = await runCrawlStep(step.id);

    // Advance to next step (unless explicit step was requested)
    if (!explicitStep) {
      await dbRun(
        "INSERT OR REPLACE INTO crawl_meta (key, value) VALUES ('crawl_step_index', ?)",
        [String(stepIndex + 1)]
      );
    }

    const isComplete = stepIndex + 1 >= steps.length;

    console.log(
      `[Cron] ${step.id}: ${result.inserted} new, ${result.updated} updated, ${result.unchanged} unchanged` +
      (isComplete ? " — CYCLE COMPLETE" : "")
    );

    return NextResponse.json({
      success: true,
      step: step.id,
      stepNumber: stepIndex + 1,
      totalSteps: steps.length,
      cycleComplete: isComplete,
      ...result,
    });
  } catch (err) {
    console.error("[Cron] Crawl error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
