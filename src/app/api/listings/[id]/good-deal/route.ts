import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

function getFingerprint(req: NextRequest): { fingerprint: string; ipHash: string } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const raw = `${ip}:${userAgent}`;
  const fingerprint = createHash("sha256").update(raw).digest("hex").slice(0, 32);
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  return { fingerprint, ipHash };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeSchema();
    const { id } = await params;
    const { fingerprint } = getFingerprint(req);

    const listing = await dbGet<{ good_deal_count: number }>(
      "SELECT good_deal_count FROM listings WHERE id = ?",
      [id]
    );

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const vote = await dbGet(
      "SELECT id FROM good_deal_votes WHERE listing_id = ? AND fingerprint = ?",
      [id, fingerprint]
    );

    return NextResponse.json({
      count: listing.good_deal_count ?? 0,
      hasVoted: !!vote,
    });
  } catch (error) {
    console.error("GET /api/listings/[id]/good-deal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeSchema();
    const { id } = await params;
    const { fingerprint, ipHash } = getFingerprint(req);

    // Check listing exists
    const listing = await dbGet<{ id: string; user_id: string }>(
      "SELECT id, user_id FROM listings WHERE id = ?",
      [id]
    );

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Get optional user_id from body
    let bodyUserId: string | null = null;
    try {
      const body = await req.json();
      bodyUserId = body.user_id || null;
    } catch {
      // No body is fine
    }

    // Don't allow voting on own listing
    if (bodyUserId && bodyUserId === listing.user_id) {
      return NextResponse.json(
        { error: "Cannot vote on your own listing" },
        { status: 403 }
      );
    }

    // Check if already voted
    const existingVote = await dbGet<{ id: string }>(
      "SELECT id FROM good_deal_votes WHERE listing_id = ? AND fingerprint = ?",
      [id, fingerprint]
    );

    if (existingVote) {
      // Remove vote
      await dbRun(
        "DELETE FROM good_deal_votes WHERE id = ?",
        [existingVote.id]
      );
      await dbRun(
        "UPDATE listings SET good_deal_count = MAX(0, good_deal_count - 1) WHERE id = ?",
        [id]
      );
    } else {
      // Add vote
      const voteId = uuidv4();
      await dbRun(
        "INSERT INTO good_deal_votes (id, listing_id, user_id, fingerprint, ip_hash) VALUES (?, ?, ?, ?, ?)",
        [voteId, id, bodyUserId, fingerprint, ipHash]
      );
      await dbRun(
        "UPDATE listings SET good_deal_count = good_deal_count + 1 WHERE id = ?",
        [id]
      );
    }

    // Return updated count
    const updated = await dbGet<{ good_deal_count: number }>(
      "SELECT good_deal_count FROM listings WHERE id = ?",
      [id]
    );

    return NextResponse.json({
      count: updated?.good_deal_count ?? 0,
      hasVoted: !existingVote,
    });
  } catch (error) {
    console.error("POST /api/listings/[id]/good-deal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
