import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { runCrawl, getCrawlStatus } from "@/lib/crawl-waffengebraucht";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.isAdmin === true;
}

// GET — crawl status
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const status = getCrawlStatus();
    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST — trigger manual crawl
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await runCrawl();
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
