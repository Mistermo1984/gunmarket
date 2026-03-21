import { NextRequest, NextResponse } from "next/server";
import { dbAll } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const kategorie = searchParams.get("kategorie") || "alle";
  const days = parseInt(searchParams.get("days") || "30");

  try {
    const snapshots = await dbAll<{
      snapshot_date: string;
      median_price: number;
      avg_price: number;
      total_listings: number;
    }>(
      `SELECT snapshot_date, median_price, avg_price, total_listings
       FROM market_snapshots
       WHERE kategorie = ? AND snapshot_date >= date('now', '-' || ? || ' days')
       ORDER BY snapshot_date ASC`,
      [kategorie, days]
    );

    const hasData = snapshots.length >= 2;
    let trend: { direction: string; changePct: string } | null = null;

    if (hasData) {
      const first = Number(snapshots[0].median_price);
      const last = Number(snapshots[snapshots.length - 1].median_price);
      const changePct =
        first > 0 ? ((last - first) / first * 100).toFixed(1) : "0";
      trend = {
        direction: last > first ? "up" : last < first ? "down" : "stable",
        changePct,
      };
    }

    return NextResponse.json({ snapshots, hasData, trend, kategorie, days });
  } catch {
    return NextResponse.json({
      snapshots: [],
      hasData: false,
      trend: null,
      kategorie,
      days,
    });
  }
}
