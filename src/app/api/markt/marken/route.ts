import { NextResponse } from "next/server";
import { dbAll } from "@/lib/db";

export async function GET() {
  try {
    const rows = await dbAll<{ marke: string; preis: number }>(
      `SELECT marke, preis FROM listings
       WHERE status = 'aktiv' AND preis > 0 AND preis < 50000
         AND marke IS NOT NULL AND marke != '' AND LENGTH(marke) > 1
       ORDER BY marke, preis`
    );

    const byBrand: Record<string, number[]> = {};
    for (const r of rows) {
      if (!byBrand[r.marke]) byBrand[r.marke] = [];
      byBrand[r.marke].push(r.preis);
    }

    const brands = Object.entries(byBrand)
      .filter(([, prices]) => prices.length >= 3)
      .map(([marke, prices]) => {
        const sorted = [...prices].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
        return {
          marke,
          count: prices.length,
          median_price: median,
          avg_price: avg,
          min_price: sorted[0],
          max_price: sorted[sorted.length - 1],
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    return NextResponse.json({ brands });
  } catch (e) {
    return NextResponse.json({ brands: [], error: String(e) });
  }
}
