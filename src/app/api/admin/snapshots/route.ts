import { NextResponse } from "next/server";
import { dbRun, dbAll } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const kategorien = [
      "kurzwaffen",
      "langwaffen",
      "ordonnanzwaffen",
      "luftdruckwaffen",
      "munition",
      "zubehoer",
      "alle",
    ];

    let count = 0;
    for (const kat of kategorien) {
      const whereKat =
        kat === "alle" ? "" : " AND hauptkategorie = ?";
      const args: (string | number)[] =
        kat === "alle" ? [] : [kat];

      const rows = await dbAll<{ preis: number }>(
        `SELECT preis FROM listings
         WHERE status = 'aktiv' AND preis > 0 AND preis < 50000${whereKat}
         ORDER BY preis`,
        args
      );

      if (rows.length === 0) continue;

      const prices = rows.map((r) => r.preis);
      const median = prices[Math.floor(prices.length / 2)];
      const avg = Math.round(
        prices.reduce((a, b) => a + b, 0) / prices.length
      );

      await dbRun(
        `INSERT OR REPLACE INTO market_snapshots
         (snapshot_date, kategorie, total_listings, avg_price, median_price, min_price, max_price)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [today, kat, prices.length, avg, median, prices[0], prices[prices.length - 1]]
      );
      count++;
    }

    return NextResponse.json({ success: true, date: today, categories: count });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: String(e) },
      { status: 500 }
    );
  }
}
