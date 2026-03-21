import { NextResponse } from "next/server";
import { dbAll } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const topSearches = await dbAll<{
      query: string;
      count: number;
      avg_results: number;
    }>(
      `SELECT query, COUNT(*) as count, ROUND(AVG(results_count)) as avg_results
       FROM search_logs
       WHERE created_at >= datetime('now', '-7 days') AND LENGTH(query) >= 2
       GROUP BY query ORDER BY count DESC LIMIT 10`
    );

    const topKategorien = await dbAll<{ kategorie: string; count: number }>(
      `SELECT kategorie, COUNT(*) as count FROM search_logs
       WHERE created_at >= datetime('now', '-7 days') AND kategorie IS NOT NULL AND kategorie != ''
       GROUP BY kategorie ORDER BY count DESC`
    );

    return NextResponse.json({
      topSearches,
      topKategorien,
      hasSufficientData: topSearches.length > 0,
    });
  } catch {
    return NextResponse.json({
      topSearches: [],
      topKategorien: [],
      hasSufficientData: false,
    });
  }
}
