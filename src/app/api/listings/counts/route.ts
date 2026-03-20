import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeSchema();

    const [categories, conditions, statuses, types, total] = await Promise.all([
      dbAll<{ hauptkategorie: string; cnt: number }>(
        `SELECT hauptkategorie, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' GROUP BY hauptkategorie`
      ),
      dbAll<{ zustand: string; cnt: number }>(
        `SELECT zustand, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' AND zustand != '' GROUP BY zustand`
      ),
      dbAll<{ rechtsstatus: string; cnt: number }>(
        `SELECT rechtsstatus, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' AND rechtsstatus != '' GROUP BY rechtsstatus`
      ),
      dbAll<{ anbieter_typ: string; cnt: number }>(
        `SELECT COALESCE(u.anbieter_typ, 'Privat') as anbieter_typ, COUNT(*) as cnt
         FROM listings l LEFT JOIN users u ON l.user_id = u.id
         WHERE l.status = 'aktiv' GROUP BY anbieter_typ`
      ),
      dbGet<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM listings WHERE status = 'aktiv'`),
    ]);

    return NextResponse.json({
      total: total?.cnt ?? 0,
      categories: Object.fromEntries(categories.map((c) => [c.hauptkategorie, c.cnt])),
      conditions: Object.fromEntries(conditions.map((c) => [c.zustand, c.cnt])),
      statuses: Object.fromEntries(statuses.map((c) => [c.rechtsstatus, c.cnt])),
      types: Object.fromEntries(types.map((c) => [c.anbieter_typ, c.cnt])),
    });
  } catch (error) {
    console.error("GET /api/listings/counts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
