import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbBatch } from "@/lib/db";
import {
  getPlzCoordinates,
  getCityCoordinates,
  kantonFromCity,
} from "@/lib/plz-coordinates";

export const dynamic = "force-dynamic";

// PLZ-to-kanton lookup (same as crawler)
function kantonFromPlz(plz: string): string {
  const p = parseInt(plz, 10);
  if (isNaN(p) || p < 1000 || p > 9999) return "";
  if (p >= 1000 && p <= 1299) return "Waadt";
  if (p >= 1300 && p <= 1399) return "Waadt";
  if (p >= 1400 && p <= 1699) return "Freiburg";
  if (p >= 1700 && p <= 1799) return "Freiburg";
  if (p >= 1800 && p <= 1899) return "Waadt";
  if (p >= 1900 && p <= 1999) return "Wallis";
  if (p >= 2000 && p <= 2299) return "Neuenburg";
  if (p >= 2300 && p <= 2799) return "Bern";
  if (p >= 2800 && p <= 2999) return "Jura";
  if (p >= 3000 && p <= 3999) return "Bern";
  if (p >= 4000 && p <= 4099) return "Basel-Stadt";
  if (p >= 4100 && p <= 4299) return "Basel-Landschaft";
  if (p >= 4300 && p <= 4599) return "Solothurn";
  if (p >= 4600 && p <= 4699) return "Aargau";
  if (p >= 4700 && p <= 4799) return "Solothurn";
  if (p >= 4800 && p <= 5999) return "Aargau";
  if (p >= 6000 && p <= 6299) return "Luzern";
  if (p >= 6300 && p <= 6399) return "Zug";
  if (p >= 6400 && p <= 6499) return "Schwyz";
  if (p >= 6500 && p <= 6999) return "Tessin";
  if (p >= 7000 && p <= 7799) return "Graubünden";
  if (p >= 8000 && p <= 8499) return "Zürich";
  if (p >= 8500 && p <= 8599) return "Thurgau";
  if (p >= 8600 && p <= 8799) return "Zürich";
  if (p >= 8800 && p <= 8899) return "Schwyz";
  if (p >= 8900 && p <= 8999) return "Aargau";
  if (p >= 9000 && p <= 9099) return "St. Gallen";
  if (p >= 9100 && p <= 9199) return "Appenzell A.";
  if (p >= 9200 && p <= 9499) return "St. Gallen";
  if (p >= 9500 && p <= 9599) return "Thurgau";
  if (p >= 9600 && p <= 9999) return "St. Gallen";
  return "";
}

export async function POST() {
  try {
    await initializeSchema();

    // 1. Fix listings where plz contains a city name (swapped fields)
    // Use CAST/typeof to detect non-numeric plz values
    const swapped = await dbAll<{ id: string; ortschaft: string; plz: string; kanton: string }>(
      `SELECT id, ortschaft, plz, kanton FROM listings
       WHERE plz IS NOT NULL AND plz != ''
       AND SUBSTR(plz, 1, 1) NOT BETWEEN '0' AND '9'
       AND status = 'aktiv'`
    );

    const swapStatements: { sql: string; args: (string | number | null)[] }[] = [];
    for (const row of swapped) {
      const cityName = row.plz; // city name is in plz field
      const ortschaft = row.ortschaft || cityName;
      const kanton = kantonFromCity(cityName) || row.kanton;
      const coords = getCityCoordinates(cityName);
      swapStatements.push({
        sql: "UPDATE listings SET ortschaft = ?, plz = '', kanton = ?, lat = COALESCE(lat, ?), lng = COALESCE(lng, ?) WHERE id = ?",
        args: [ortschaft, kanton, coords?.lat ?? null, coords?.lng ?? null, row.id],
      });
    }

    // 2. Fix listings with empty kanton but valid PLZ (4 digits)
    const noKantonWithPlz = await dbAll<{ id: string; plz: string; ortschaft: string }>(
      `SELECT id, plz, ortschaft FROM listings
       WHERE (kanton IS NULL OR kanton = '')
       AND plz IS NOT NULL AND LENGTH(plz) = 4
       AND SUBSTR(plz, 1, 1) BETWEEN '0' AND '9'
       AND status = 'aktiv'`
    );

    const plzStatements: { sql: string; args: (string | number | null)[] }[] = [];
    for (const row of noKantonWithPlz) {
      const kanton = kantonFromPlz(row.plz);
      if (kanton) {
        const coords = getPlzCoordinates(row.plz);
        plzStatements.push({
          sql: "UPDATE listings SET kanton = ?, lat = COALESCE(lat, ?), lng = COALESCE(lng, ?) WHERE id = ?",
          args: [kanton, coords?.lat ?? null, coords?.lng ?? null, row.id],
        });
      }
    }

    // 3. Fix listings with empty kanton but valid ortschaft (city name)
    const noKantonWithCity = await dbAll<{ id: string; ortschaft: string; plz: string }>(
      `SELECT id, ortschaft, plz FROM listings
       WHERE (kanton IS NULL OR kanton = '')
       AND ortschaft IS NOT NULL AND ortschaft != ''
       AND status = 'aktiv'`
    );

    const cityStatements: { sql: string; args: (string | number | null)[] }[] = [];
    for (const row of noKantonWithCity) {
      const kanton = kantonFromCity(row.ortschaft);
      if (kanton) {
        const coords = getCityCoordinates(row.ortschaft) || (row.plz ? getPlzCoordinates(row.plz) : null);
        cityStatements.push({
          sql: "UPDATE listings SET kanton = ?, lat = COALESCE(lat, ?), lng = COALESCE(lng, ?) WHERE id = ?",
          args: [kanton, coords?.lat ?? null, coords?.lng ?? null, row.id],
        });
      }
    }

    // 4. Fix listings with no coordinates but valid PLZ or city
    const noCoords = await dbAll<{ id: string; plz: string; ortschaft: string }>(
      `SELECT id, plz, ortschaft FROM listings
       WHERE (lat IS NULL OR lng IS NULL)
       AND status = 'aktiv'`
    );

    const coordStatements: { sql: string; args: (string | number | null)[] }[] = [];
    for (const row of noCoords) {
      const coords = (row.plz ? getPlzCoordinates(row.plz) : null) ?? getCityCoordinates(row.ortschaft);
      if (coords) {
        coordStatements.push({
          sql: "UPDATE listings SET lat = ?, lng = ? WHERE id = ?",
          args: [coords.lat, coords.lng, row.id],
        });
      }
    }

    // Execute all fixes
    await dbBatch([...swapStatements, ...plzStatements, ...cityStatements, ...coordStatements]);

    return NextResponse.json({
      fixed: {
        swappedFields: swapStatements.length,
        kantonFromPlz: plzStatements.length,
        kantonFromCity: cityStatements.length,
        coordinatesFixed: coordStatements.length,
      },
      total: swapStatements.length + plzStatements.length + cityStatements.length + coordStatements.length,
    });
  } catch (error) {
    console.error("Fix locations error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
