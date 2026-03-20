import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeSchema();

    const base = "WHERE status = 'aktiv'";

    // 1. Overview stats
    const totalRow = await dbGet<{ c: number }>(`SELECT COUNT(*) as c FROM listings ${base}`);
    const avgRow = await dbGet<{ a: number }>(`SELECT AVG(preis) as a FROM listings ${base} AND preis > 0`);
    const todayRow = await dbGet<{ c: number }>(
      `SELECT COUNT(*) as c FROM listings ${base} AND DATE(created_at) = DATE('now')`
    );
    const topCatRow = await dbGet<{ hauptkategorie: string; c: number }>(
      `SELECT hauptkategorie, COUNT(*) as c FROM listings ${base} AND hauptkategorie IS NOT NULL GROUP BY hauptkategorie ORDER BY c DESC LIMIT 1`
    );
    const topKaliberRow = await dbGet<{ kaliber: string; c: number }>(
      `SELECT kaliber, COUNT(*) as c FROM listings ${base} AND kaliber IS NOT NULL AND kaliber != '' GROUP BY kaliber ORDER BY c DESC LIMIT 1`
    );

    // 2. Average price by category
    const avgByCategory = await dbAll<{ hauptkategorie: string; avg_preis: number; count: number }>(
      `SELECT hauptkategorie, ROUND(AVG(preis), 0) as avg_preis, COUNT(*) as count
       FROM listings ${base} AND preis > 0 AND hauptkategorie IS NOT NULL
       GROUP BY hauptkategorie ORDER BY avg_preis DESC`
    );

    // 3. Listings by condition
    const byZustand = await dbAll<{ zustand: string; count: number }>(
      `SELECT zustand, COUNT(*) as count FROM listings ${base} AND zustand IS NOT NULL AND zustand != '' GROUP BY zustand ORDER BY count DESC`
    );

    // 4. Price distribution
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
       FROM listings ${base} AND preis > 0
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

    // 7. Top 10 calibers
    const topKaliber = await dbAll<{ kaliber: string; count: number }>(
      `SELECT kaliber, COUNT(*) as count FROM listings ${base} AND kaliber IS NOT NULL AND kaliber != '' GROUP BY kaliber ORDER BY count DESC LIMIT 10`
    );

    // 8. Listings by canton
    const byKanton = await dbAll<{ kanton: string; count: number }>(
      `SELECT kanton, COUNT(*) as count FROM listings ${base} AND kanton IS NOT NULL AND kanton != '' GROUP BY kanton ORDER BY count DESC`
    );

    // 9. Cheapest per category
    const cheapestPerCategory = await dbAll<{
      id: string; titel: string; preis: number; hauptkategorie: string; image_url: string | null;
    }>(
      `SELECT l.id, l.titel, l.preis, l.hauptkategorie,
              (SELECT url FROM listing_images WHERE listing_id = l.id ORDER BY position LIMIT 1) as image_url
       FROM listings l
       WHERE l.status = 'aktiv' AND l.preis > 0
       AND l.hauptkategorie IS NOT NULL
       AND l.id IN (
         SELECT id FROM (
           SELECT id, ROW_NUMBER() OVER (PARTITION BY hauptkategorie ORDER BY preis ASC) as rn
           FROM listings WHERE status = 'aktiv' AND preis > 0 AND hauptkategorie IS NOT NULL
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
        topKaliber: topKaliberRow?.kaliber ?? "",
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
