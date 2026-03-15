import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbRun } from "@/lib/db";
import { getPlzCoordinates, getCityCoordinates } from "@/lib/plz-coordinates";

export async function POST() {
  await initializeSchema();

  const rows = await dbAll<{ id: string; plz: string; ortschaft: string }>(
    "SELECT id, plz, ortschaft FROM listings WHERE lat IS NULL OR lng IS NULL"
  );

  let updated = 0;

  for (const row of rows) {
    // 1. Try PLZ directly
    let coords = row.plz ? getPlzCoordinates(row.plz) : null;
    if (coords) {
      await dbRun("UPDATE listings SET lat = ?, lng = ? WHERE id = ?", [coords.lat, coords.lng, row.id]);
      updated++;
      continue;
    }

    // 2. Check if PLZ and ortschaft are swapped
    if (row.plz && /^[A-Za-zÀ-ÿ]/.test(row.plz) && row.ortschaft && /^\d{4}$/.test(row.ortschaft)) {
      coords = getPlzCoordinates(row.ortschaft);
      if (coords) {
        await dbRun(
          "UPDATE listings SET lat = ?, lng = ?, plz = ?, ortschaft = ? WHERE id = ?",
          [coords.lat, coords.lng, row.ortschaft, row.plz, row.id]
        );
        updated++;
        continue;
      }
    }

    // 3. Try city name from ortschaft
    coords = row.ortschaft ? getCityCoordinates(row.ortschaft) : null;
    if (coords) {
      await dbRun("UPDATE listings SET lat = ?, lng = ? WHERE id = ?", [coords.lat, coords.lng, row.id]);
      updated++;
      continue;
    }

    // 4. Try city name from plz field (if it contains a city name)
    if (row.plz && /^[A-Za-zÀ-ÿ]/.test(row.plz)) {
      coords = getCityCoordinates(row.plz);
      if (coords) {
        await dbRun("UPDATE listings SET lat = ?, lng = ? WHERE id = ?", [coords.lat, coords.lng, row.id]);
        updated++;
        continue;
      }
    }
  }

  return NextResponse.json({
    success: true,
    total: rows.length,
    updated,
    remaining: rows.length - updated,
    message: `${updated} von ${rows.length} Inseraten mit Koordinaten aktualisiert.`,
  });
}
