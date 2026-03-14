import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { classifyRechtsstatus } from "@/lib/rechtsstatus-classifier";

/**
 * POST /api/admin/reclassify
 * Re-classify the Rechtsstatus for all crawled listings based on the algorithm.
 */
export async function POST() {
  const db = getDb();

  const rows = db.prepare(
    "SELECT id, titel, beschreibung, hauptkategorie, unterkategorie FROM listings WHERE source IN ('waffengebraucht', 'nextgun')"
  ).all() as { id: string; titel: string; beschreibung: string; hauptkategorie: string; unterkategorie: string }[];

  const update = db.prepare("UPDATE listings SET rechtsstatus = ? WHERE id = ?");

  const stats: Record<string, number> = {};

  const tx = db.transaction(() => {
    for (const row of rows) {
      const status = classifyRechtsstatus({
        titel: row.titel,
        beschreibung: row.beschreibung,
        hauptkategorie: row.hauptkategorie,
        unterkategorie: row.unterkategorie,
      });
      update.run(status, row.id);
      stats[status] = (stats[status] || 0) + 1;
    }
  });
  tx();

  return NextResponse.json({
    success: true,
    total: rows.length,
    stats,
  });
}
