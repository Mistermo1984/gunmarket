import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeSchema();

    const base = "WHERE status = 'aktiv'";
    // Filter out outliers: price > 0 AND price < 50000 (exclude fake/test data)
    const priceFilter = "AND preis > 0 AND preis < 50000";

    // 1. Overview stats
    const totalRow = await dbGet<{ c: number }>(`SELECT COUNT(*) as c FROM listings ${base}`);
    const avgRow = await dbGet<{ a: number }>(`SELECT AVG(preis) as a FROM listings ${base} ${priceFilter}`);
    const todayRow = await dbGet<{ c: number }>(
      `SELECT COUNT(*) as c FROM listings ${base} AND DATE(created_at) = DATE('now')`
    );
    const topCatRow = await dbGet<{ hauptkategorie: string; c: number }>(
      `SELECT hauptkategorie, COUNT(*) as c FROM listings ${base} AND hauptkategorie IS NOT NULL GROUP BY hauptkategorie ORDER BY c DESC LIMIT 1`
    );

    // 2. Average price by category (with outlier filter)
    const avgByCategory = await dbAll<{ hauptkategorie: string; avg_preis: number; count: number }>(
      `SELECT hauptkategorie, ROUND(AVG(preis), 0) as avg_preis, COUNT(*) as count
       FROM listings ${base} ${priceFilter} AND hauptkategorie IS NOT NULL
       GROUP BY hauptkategorie ORDER BY avg_preis DESC`
    );

    // 3. Listings by condition
    const byZustand = await dbAll<{ zustand: string; count: number }>(
      `SELECT zustand, COUNT(*) as count FROM listings ${base} AND zustand IS NOT NULL AND zustand != '' GROUP BY zustand ORDER BY count DESC`
    );

    // 4. Price distribution (with outlier filter)
    const priceRanges = await dbAll<{ range_label: string; count: number }>(
      `SELECT
        CASE
          WHEN preis < 500 THEN '< 500'
          WHEN preis >= 500 AND preis < 1500 THEN '500–1500'
          WHEN preis >= 1500 AND preis < 3000 THEN '1500–3000'
          WHEN preis >= 3000 AND preis < 5000 THEN '3000–5000'
          ELSE '5000+'
        END as range_label,
        COUNT(*) as count
       FROM listings ${base} ${priceFilter}
       GROUP BY range_label
       ORDER BY MIN(preis)`
    );

    // 5. By legal status
    const byRechtsstatus = await dbAll<{ rechtsstatus: string; count: number }>(
      `SELECT rechtsstatus, COUNT(*) as count FROM listings ${base} AND rechtsstatus IS NOT NULL GROUP BY rechtsstatus ORDER BY count DESC`
    );

    // 6. Top 10 brands
    const topMarken = await dbAll<{ marke: string; count: number }>(
      `SELECT marke, COUNT(*) as count FROM listings ${base} AND marke IS NOT NULL AND marke != '' GROUP BY marke ORDER BY count DESC LIMIT 10`
    );

    // 7. Top calibers — normalize common variants, then group
    const rawKaliber = await dbAll<{ kaliber: string; count: number }>(
      `SELECT kaliber, COUNT(*) as count FROM listings ${base} AND kaliber IS NOT NULL AND kaliber != '' GROUP BY kaliber ORDER BY count DESC`
    );

    // Caliber normalization map
    const CALIBER_NORMALIZE: Record<string, string> = {
      "9mm": "9x19 Para", "9x19": "9x19 Para", "9x19mm": "9x19 Para", "9mm para": "9x19 Para",
      "9mm luger": "9x19 Para", "9 mm luger": "9x19 Para", "9 mm": "9x19 Para", "9x19 luger": "9x19 Para",
      ".308": ".308 Win", "308 win": ".308 Win", ".308 win": ".308 Win", "7.62x51": ".308 Win",
      "7.62×51": ".308 Win", ".308 win / 7.62×51": ".308 Win",
      "7.5": "7.5x55 Swiss", "7.5x55": "7.5x55 Swiss", "7.5x55 swiss": "7.5x55 Swiss",
      "7.5×55 swiss": "7.5x55 Swiss", "gp11": "7.5x55 Swiss",
      ".223": ".223 Rem", ".223 rem": ".223 Rem", "223 rem": ".223 Rem",
      "5.56x45": ".223 Rem", "5.56×45": ".223 Rem", ".223 rem / 5.56×45": ".223 Rem",
      ".22 lr": ".22 LR", "22 lr": ".22 LR", ".22": ".22 LR",
      ".357 mag": ".357 Magnum", ".357 magnum": ".357 Magnum", "357 magnum": ".357 Magnum",
      ".45 acp": ".45 ACP", "45 acp": ".45 ACP", ".45": ".45 ACP",
      "12/70": "12/70", "12/76": "12/76",
      "6.5 creedmoor": "6.5 Creedmoor", "6.5cm": "6.5 Creedmoor",
      ".300 win mag": ".300 Win Mag", "300 win mag": ".300 Win Mag",
      ".30-06": ".30-06 Springfield", "30-06": ".30-06 Springfield",
    };

    const kaliberGrouped = new Map<string, number>();
    for (const row of rawKaliber) {
      const normalized = CALIBER_NORMALIZE[row.kaliber.toLowerCase().trim()] || row.kaliber;
      kaliberGrouped.set(normalized, (kaliberGrouped.get(normalized) || 0) + row.count);
    }
    const topKaliber = Array.from(kaliberGrouped.entries())
      .map(([kaliber, count]) => ({ kaliber, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top kaliber for overview
    const topKaliberName = topKaliber.length > 0 ? topKaliber[0].kaliber : "";

    // 8. Listings by canton
    const byKanton = await dbAll<{ kanton: string; count: number }>(
      `SELECT kanton, COUNT(*) as count FROM listings ${base} AND kanton IS NOT NULL AND kanton != '' GROUP BY kanton ORDER BY count DESC`
    );

    // 9. Cheapest per category (with outlier filter)
    const cheapestPerCategory = await dbAll<{
      id: string; titel: string; preis: number; hauptkategorie: string; image_url: string | null;
    }>(
      `SELECT l.id, l.titel, l.preis, l.hauptkategorie,
              (SELECT url FROM listing_images WHERE listing_id = l.id ORDER BY position LIMIT 1) as image_url
       FROM listings l
       WHERE l.status = 'aktiv' AND l.preis > 0 AND l.preis < 50000
       AND l.hauptkategorie IS NOT NULL
       AND l.id IN (
         SELECT id FROM (
           SELECT id, ROW_NUMBER() OVER (PARTITION BY hauptkategorie ORDER BY preis ASC) as rn
           FROM listings WHERE status = 'aktiv' AND preis > 0 AND preis < 50000 AND hauptkategorie IS NOT NULL
         ) WHERE rn = 1
       )
       ORDER BY l.hauptkategorie`
    );

    return NextResponse.json({
      overview: {
        total: totalRow?.c ?? 0,
        avgPreis: Math.round(avgRow?.a ?? 0),
        todayNew: todayRow?.c ?? 0,
        topKategorie: topCatRow?.hauptkategorie ?? "",
        topKaliber: topKaliberName,
      },
      avgByCategory,
      byZustand,
      priceRanges,
      byRechtsstatus,
      topMarken,
      topKaliber,
      byKanton,
      cheapestPerCategory,
    });
  } catch (error) {
    console.error("GET /api/stats/market error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
