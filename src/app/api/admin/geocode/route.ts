import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getPlzCoordinates, getCityCoordinates } from "@/lib/plz-coordinates";

/**
 * POST /api/admin/geocode
 * Batch-update all listings without coordinates.
 * Tries: PLZ lookup → city name lookup
 */
export async function POST() {
  const db = getDb();

  const rows = db.prepare(
    "SELECT id, plz, ortschaft FROM listings WHERE lat IS NULL OR lng IS NULL"
  ).all() as { id: string; plz: string; ortschaft: string }[];

  const update = db.prepare("UPDATE listings SET lat = ?, lng = ? WHERE id = ?");
  // Also fix swapped PLZ/ortschaft
  const updateWithFix = db.prepare("UPDATE listings SET lat = ?, lng = ?, plz = ?, ortschaft = ? WHERE id = ?");

  let updated = 0;
  const tx = db.transaction(() => {
    for (const row of rows) {
      // 1. Try PLZ directly
      let coords = row.plz ? getPlzCoordinates(row.plz) : null;
      if (coords) {
        update.run(coords.lat, coords.lng, row.id);
        updated++;
        continue;
      }

      // 2. Check if PLZ and ortschaft are swapped (PLZ contains city name, ortschaft contains number)
      if (row.plz && /^[A-Za-zÀ-ÿ]/.test(row.plz) && row.ortschaft && /^\d{4}$/.test(row.ortschaft)) {
        coords = getPlzCoordinates(row.ortschaft);
        if (coords) {
          updateWithFix.run(coords.lat, coords.lng, row.ortschaft, row.plz, row.id);
          updated++;
          continue;
        }
      }

      // 3. Try city name from ortschaft
      coords = row.ortschaft ? getCityCoordinates(row.ortschaft) : null;
      if (coords) {
        update.run(coords.lat, coords.lng, row.id);
        updated++;
        continue;
      }

      // 4. Try city name from plz field (if it contains a city name instead of number)
      if (row.plz && /^[A-Za-zÀ-ÿ]/.test(row.plz)) {
        coords = getCityCoordinates(row.plz);
        if (coords) {
          update.run(coords.lat, coords.lng, row.id);
          updated++;
          continue;
        }
      }
    }
  });
  tx();

  return NextResponse.json({
    success: true,
    total: rows.length,
    updated,
    remaining: rows.length - updated,
    message: `${updated} von ${rows.length} Inseraten mit Koordinaten aktualisiert.`,
  });
}
