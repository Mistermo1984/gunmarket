import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCrawlSteps, runCrawlStep, getCrawlStatus } from "@/lib/crawl-waffengebraucht";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.isAdmin === true;
}

// GET — crawl status + available steps
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const status = await getCrawlStatus();
    const steps = getCrawlSteps();
    return NextResponse.json({ ...status, steps });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST — run a single crawl step (or all steps sequentially)
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const stepId = body.step as string | undefined;

    if (!stepId) {
      return NextResponse.json({ error: "Missing 'step' parameter" }, { status: 400 });
    }

    const steps = getCrawlSteps();
    if (!steps.find((s) => s.id === stepId)) {
      return NextResponse.json({ error: `Unknown step: ${stepId}` }, { status: 400 });
    }

    const result = await runCrawlStep(stepId);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
