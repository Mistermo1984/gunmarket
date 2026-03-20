import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbBatch } from "@/lib/db";
import { classifyRechtsstatus } from "@/lib/rechtsstatus-classifier";

export const dynamic = "force-dynamic";

export async function POST() {
  await initializeSchema();

  // Reclassify ALL listings (crawled + user-created)
  const rows = await dbAll<{ id: string; titel: string; beschreibung: string; hauptkategorie: string; unterkategorie: string }>(
    "SELECT id, titel, beschreibung, hauptkategorie, unterkategorie FROM listings"
  );

  const stats: Record<string, number> = {};
  const statements: { sql: string; args: (string | number | null)[] }[] = [];

  for (const row of rows) {
    const status = classifyRechtsstatus({
      titel: row.titel || "",
      beschreibung: row.beschreibung || "",
      hauptkategorie: row.hauptkategorie || "",
      unterkategorie: row.unterkategorie || "",
    });
    statements.push({
      sql: "UPDATE listings SET rechtsstatus = ? WHERE id = ?",
      args: [status, row.id],
    });
    stats[status] = (stats[status] || 0) + 1;
  }

  await dbBatch(statements);

  return NextResponse.json({
    success: true,
    total: rows.length,
    stats,
  });
}
