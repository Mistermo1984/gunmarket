import { NextResponse } from "next/server";
import { initializeSchema, dbAll, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

// ─── Brand extraction from titles ───────────────────────────────
const KNOWN_BRANDS = [
  "SIG Sauer", "SIG", "Glock", "Beretta", "CZ", "Walther", "Smith & Wesson",
  "Colt", "Ruger", "Browning", "Heckler & Koch", "H&K", "HK", "Tikka", "Sauer",
  "Blaser", "Mauser", "Steyr", "Remington", "Winchester", "Mossberg", "Benelli",
  "Taurus", "Springfield", "Zastava", "Norinco", "Anschütz", "Diana", "Weihrauch",
  "Krieghoff", "Merkel", "Hammerli", "Hämmerli", "Schmidt & Bender", "Swarovski",
  "Zeiss", "Leupold", "Vortex", "Aimpoint", "Trijicon", "Kahles", "RUAG",
  "Waffenfabrik Bern", "Bettinsoli", "Franchi", "Fabarm", "Perazzi",
  "Dan Wesson", "Kimber", "FN", "FN Herstal", "Luger", "Savage",
  "Weatherby", "Marlin", "Henry", "Rossi", "Chiappa",
];

// Sort by length descending so "SIG Sauer" matches before "SIG"
const BRANDS_SORTED = [...KNOWN_BRANDS].sort((a, b) => b.length - a.length);

// Normalize brand variants
const BRAND_NORMALIZE: Record<string, string> = {
  "H&K": "Heckler & Koch",
  "HK": "Heckler & Koch",
  "FN Herstal": "FN Herstal",
  "Hämmerli": "Hammerli",
  "SIG": "SIG Sauer",
};

function extractBrand(titel: string): string | null {
  const titelLower = titel.toLowerCase();
  for (const brand of BRANDS_SORTED) {
    if (titelLower.includes(brand.toLowerCase())) {
      return BRAND_NORMALIZE[brand] || brand;
    }
  }
  return null;
}

// ─── Caliber extraction from titles ─────────────────────────────
const CALIBER_PATTERNS: [RegExp, string][] = [
  [/\b9\s*(?:x\s*19|mm)\s*(?:para|luger)?\b/i, "9x19 Para"],
  [/\b9\s*mm\b/i, "9x19 Para"],
  [/\.?308\s*win/i, ".308 Win"],
  [/7[.,]62\s*[x×]\s*51/i, ".308 Win"],
  [/7[.,]5\s*[x×]\s*55/i, "7.5x55 Swiss"],
  [/\bgp\s*11\b/i, "7.5x55 Swiss"],
  [/\.?223\s*rem/i, ".223 Rem"],
  [/5[.,]56\s*[x×]\s*45/i, ".223 Rem"],
  [/\.?22\s*lr\b/i, ".22 LR"],
  [/\.?357\s*mag/i, ".357 Magnum"],
  [/\.?45\s*acp/i, ".45 ACP"],
  [/\b12\s*\/\s*76\b/, "12/76"],
  [/\b12\s*\/\s*70\b/, "12/70"],
  [/\b20\s*\/\s*76\b/, "20/76"],
  [/6[.,]5\s*(?:creedmoor|cm)\b/i, "6.5 Creedmoor"],
  [/\.?300\s*win\s*mag/i, ".300 Win Mag"],
  [/\.?30[\s-]*06/i, ".30-06 Springfield"],
  [/\.?270\s*win/i, ".270 Win"],
  [/\.?243\s*win/i, ".243 Win"],
  [/7\s*mm\s*rem\s*mag/i, "7mm Rem Mag"],
  [/\.?338\s*lap/i, ".338 Lapua Mag"],
  [/\.?44\s*mag/i, ".44 Magnum"],
  [/\.?380\s*(?:acp|auto)/i, ".380 ACP"],
  [/10\s*mm\s*auto/i, "10mm Auto"],
  [/\.?40\s*s&w/i, ".40 S&W"],
];

function extractCaliber(titel: string): string | null {
  for (const [pattern, normalized] of CALIBER_PATTERNS) {
    if (pattern.test(titel)) return normalized;
  }
  return null;
}

// ─── Zustand normalization ──────────────────────────────────────
const ZUSTAND_NORMALIZE: Record<string, string> = {
  "neu": "neu",
  "wie neu": "wie-neu",
  "sehr gut": "sehr-gut",
  "gut": "gut",
  "akzeptabel": "akzeptabel",
  "defekt": "defekt",
  // Slug forms
  "wie-neu": "wie-neu",
  "sehr-gut": "sehr-gut",
};

// Caliber normalization map for DB kaliber field
const CALIBER_FIELD_NORMALIZE: Record<string, string> = {
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

export async function GET() {
  try {
    await initializeSchema();

    const base = "WHERE status = 'aktiv'";
    const priceFilter = "AND preis > 0 AND preis < 50000";

    // 1. Overview stats
    const totalRow = await dbGet<{ c: number }>(`SELECT COUNT(*) as c FROM listings ${base}`);
    const avgRow = await dbGet<{ a: number }>(`SELECT AVG(preis) as a FROM listings ${base} ${priceFilter}`);
    const todayRow = await dbGet<{ c: number }>(
      `SELECT COUNT(*) as c FROM listings ${base} AND DATE(created_at) = DATE('now')`
    );
    const weekRow = await dbGet<{ c: number }>(
      `SELECT COUNT(*) as c FROM listings ${base} AND created_at >= datetime('now', '-7 days')`
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

    // 3. Listings by condition — fetch raw zustand values
    const rawZustand = await dbAll<{ zustand: string; count: number }>(
      `SELECT zustand, COUNT(*) as count FROM listings ${base} GROUP BY zustand ORDER BY count DESC`
    );

    // Normalize zustand: group by normalized key, count empty as "unbekannt"
    const zustandGrouped = new Map<string, number>();
    for (const row of rawZustand) {
      const raw = (row.zustand || "").trim();
      if (!raw) {
        zustandGrouped.set("unbekannt", (zustandGrouped.get("unbekannt") || 0) + row.count);
      } else {
        const key = ZUSTAND_NORMALIZE[raw.toLowerCase()] || raw.toLowerCase();
        zustandGrouped.set(key, (zustandGrouped.get(key) || 0) + row.count);
      }
    }
    const byZustand = Array.from(zustandGrouped.entries())
      .map(([zustand, count]) => ({ zustand, count }))
      .sort((a, b) => b.count - a.count);

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

    // 6. Top brands — combine DB marke field + title extraction
    const allTitles = await dbAll<{ titel: string; marke: string | null }>(
      `SELECT titel, marke FROM listings ${base}`
    );

    const brandCounts = new Map<string, number>();
    for (const row of allTitles) {
      // Use DB marke if present
      let brand: string | null = null;
      if (row.marke && row.marke.trim()) {
        brand = BRAND_NORMALIZE[row.marke.trim()] || row.marke.trim();
      } else {
        // Extract from title
        brand = extractBrand(row.titel);
      }
      if (brand) {
        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
      }
    }
    const topMarken = Array.from(brandCounts.entries())
      .map(([marke, count]) => ({ marke, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 7. Top calibers — combine DB kaliber field + title extraction
    const allForCaliber = await dbAll<{ titel: string; kaliber: string | null }>(
      `SELECT titel, kaliber FROM listings ${base}`
    );

    const kaliberCounts = new Map<string, number>();
    for (const row of allForCaliber) {
      let cal: string | null = null;
      if (row.kaliber && row.kaliber.trim()) {
        const key = row.kaliber.toLowerCase().trim();
        cal = CALIBER_FIELD_NORMALIZE[key] || row.kaliber.trim();
      } else {
        cal = extractCaliber(row.titel);
      }
      if (cal) {
        kaliberCounts.set(cal, (kaliberCounts.get(cal) || 0) + 1);
      }
    }
    const topKaliber = Array.from(kaliberCounts.entries())
      .map(([kaliber, count]) => ({ kaliber, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

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

    const todayNew = todayRow?.c ?? 0;
    const weekNew = weekRow?.c ?? 0;

    // Top canton
    const topKantonRow = byKanton.length > 0 ? byKanton[0] : null;

    // Top category percentage
    const totalCount = totalRow?.c ?? 0;
    const topCatCount = topCatRow ? await dbGet<{ c: number }>(
      `SELECT COUNT(*) as c FROM listings ${base} AND hauptkategorie = ?`, [topCatRow.hauptkategorie]
    ) : null;
    const topCatPct = totalCount > 0 && topCatCount ? Math.round((topCatCount.c / totalCount) * 100) : 0;

    // Median price (overall)
    const allPricesForMedian = await dbAll<{ preis: number }>(
      `SELECT preis FROM listings ${base} ${priceFilter} ORDER BY preis`
    );
    const medianPreis = allPricesForMedian.length > 0
      ? allPricesForMedian[Math.floor(allPricesForMedian.length / 2)].preis
      : 0;

    // Median by category
    const catPrices = await dbAll<{ hauptkategorie: string; preis: number }>(
      `SELECT hauptkategorie, preis FROM listings ${base} ${priceFilter} AND hauptkategorie IS NOT NULL ORDER BY hauptkategorie, preis`
    );
    const catPriceMap = new Map<string, number[]>();
    for (const row of catPrices) {
      if (!catPriceMap.has(row.hauptkategorie)) catPriceMap.set(row.hauptkategorie, []);
      catPriceMap.get(row.hauptkategorie)!.push(row.preis);
    }
    const medianByCategory = Array.from(catPriceMap.entries()).map(([kat, prices]) => ({
      hauptkategorie: kat,
      median: prices[Math.floor(prices.length / 2)],
      count: prices.length,
    })).sort((a, b) => b.count - a.count);

    // Ordonnanz spotlight
    const ordonnanzModels = [
      { name: "K31", patterns: ["%K31%", "%Karabiner 31%"] },
      { name: "SIG P210", patterns: ["%P210%", "%SIG P210%"] },
      { name: "Stgw 57", patterns: ["%Stgw 57%", "%SIG 510%"] },
      { name: "P06/29", patterns: ["%P06%", "%Parabellum%", "%Luger 06%"] },
      { name: "Stgw 90", patterns: ["%Stgw 90%", "%SIG 550%", "%SIG 551%"] },
    ];
    const ordonnanzData = [];
    for (const model of ordonnanzModels) {
      const whereClauses = model.patterns.map(() => "l.titel LIKE ?").join(" OR ");
      const rows = await dbAll<{ preis: number }>(
        `SELECT l.preis FROM listings l WHERE l.status = 'aktiv' AND l.preis > 0 AND l.preis < 50000 AND (${whereClauses}) ORDER BY l.preis`,
        model.patterns
      );
      const prices = rows.map((r) => r.preis);
      ordonnanzData.push({
        name: model.name,
        count: prices.length,
        median: prices.length > 0 ? prices[Math.floor(prices.length / 2)] : 0,
      });
    }

    return NextResponse.json({
      overview: {
        total: totalRow?.c ?? 0,
        avgPreis: Math.round(avgRow?.a ?? 0),
        medianPreis: Math.round(medianPreis),
        todayNew,
        weekNew,
        topKategorie: topCatRow?.hauptkategorie ?? "",
        topKategoriePct: topCatPct,
        topKaliber: topKaliberName,
        topKanton: topKantonRow?.kanton ?? "",
        topKantonCount: topKantonRow?.count ?? 0,
      },
      avgByCategory,
      medianByCategory,
      byZustand,
      priceRanges,
      byRechtsstatus,
      topMarken,
      topKaliber,
      byKanton,
      cheapestPerCategory,
      ordonnanzData,
    });
  } catch (error) {
    console.error("GET /api/stats/market error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
