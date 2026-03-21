import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbAll } from "@/lib/db";
import { kantonToFullName } from "@/lib/plz-coordinates";
import { CATEGORY_ALIASES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await initializeSchema();
    const { searchParams } = new URL(req.url);

    let where = "WHERE status = 'aktiv' AND preis > 0 AND preis < 50000";
    const params: (string | number)[] = [];

    const kategorie = searchParams.get("kategorie");
    if (kategorie) {
      const kats = kategorie.split(",").map((k) => k.trim()).filter(Boolean)
        .map((k) => CATEGORY_ALIASES[k] || k);
      if (kats.length === 1) {
        where += " AND hauptkategorie = ?";
        params.push(kats[0]);
      } else if (kats.length > 1) {
        where += ` AND hauptkategorie IN (${kats.map(() => "?").join(",")})`;
        params.push(...kats);
      }
    }

    const kanton = searchParams.get("kanton");
    if (kanton) {
      const kantone = kanton.split(",").map((k) => k.trim()).filter(Boolean)
        .map((k) => kantonToFullName(k) || k);
      if (kantone.length === 1) {
        where += " AND kanton = ?";
        params.push(kantone[0]);
      } else if (kantone.length > 1) {
        where += ` AND kanton IN (${kantone.map(() => "?").join(",")})`;
        params.push(...kantone);
      }
    }

    const rechtsstatus = searchParams.get("rechtsstatus");
    if (rechtsstatus) {
      const rss = rechtsstatus.split(",").map((k) => k.trim()).filter(Boolean);
      if (rss.length === 1) {
        where += " AND rechtsstatus = ?";
        params.push(rss[0]);
      } else if (rss.length > 1) {
        where += ` AND rechtsstatus IN (${rss.map(() => "?").join(",")})`;
        params.push(...rss);
      }
    }

    const zustand = searchParams.get("zustand");
    if (zustand) {
      const zs = zustand.split(",").map((z) => z.trim()).filter(Boolean);
      if (zs.length === 1) {
        where += " AND zustand = ?";
        params.push(zs[0]);
      } else if (zs.length > 1) {
        where += ` AND zustand IN (${zs.map(() => "?").join(",")})`;
        params.push(...zs);
      }
    }

    const rows = await dbAll<{ preis: number }>(
      `SELECT CAST(preis AS REAL) as preis FROM listings ${where}`,
      params
    );

    const prices = rows.map((r) => r.preis).sort((a, b) => a - b);

    if (prices.length === 0) {
      return NextResponse.json({ min: 0, max: 5000, buckets: [], bucketSize: 250, total: 0 });
    }

    const min = 0;
    const max = Math.ceil(Math.max(...prices) / 500) * 500 || 5000;
    const BUCKET_COUNT = 24;
    const bucketSize = Math.ceil(max / BUCKET_COUNT);

    const buckets: number[] = Array(BUCKET_COUNT).fill(0);
    prices.forEach((p) => {
      const i = Math.min(Math.floor(p / bucketSize), BUCKET_COUNT - 1);
      buckets[i]++;
    });

    return NextResponse.json({ min, max, buckets, bucketSize, total: prices.length });
  } catch (error) {
    console.error("GET /api/listings/price-histogram error:", error);
    return NextResponse.json({ min: 0, max: 5000, buckets: [], bucketSize: 250, total: 0 });
  }
}
