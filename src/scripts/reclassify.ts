/**
 * Re-classify all crawled listings using the two-stage classification system.
 * Run with: npx tsx src/scripts/reclassify.ts
 */
import { initializeSchema, dbAll, dbRun } from "../lib/db";
import { classifyListing } from "../lib/crawl-waffengebraucht";

async function reclassify() {
  await initializeSchema();

  const listings = await dbAll<{
    id: string;
    source_url: string;
    titel: string;
    beschreibung: string;
    hauptkategorie: string;
    unterkategorie: string;
  }>(
    "SELECT id, source_url, titel, beschreibung, hauptkategorie, unterkategorie FROM listings WHERE source IS NOT NULL AND source != 'gunmarket'"
  );

  console.log(`Found ${listings.length} crawled listings to reclassify.\n`);

  let updated = 0;
  let unchanged = 0;
  let fallbacks = 0;

  for (const l of listings) {
    const { hauptkategorie, unterkategorie, confidence } = classifyListing(
      l.source_url || "",
      l.titel || "",
      l.beschreibung || ""
    );

    if (confidence === "fallback") fallbacks++;

    if (hauptkategorie !== l.hauptkategorie || unterkategorie !== l.unterkategorie) {
      await dbRun(
        "UPDATE listings SET hauptkategorie = ?, unterkategorie = ?, kategorie_confidence = ? WHERE id = ?",
        [hauptkategorie, unterkategorie, confidence, l.id]
      );
      console.log(
        `  ${l.titel?.substring(0, 45).padEnd(45)} | ${l.hauptkategorie.padEnd(18)} -> ${hauptkategorie.padEnd(18)} [${confidence}]`
      );
      updated++;
    } else {
      await dbRun(
        "UPDATE listings SET kategorie_confidence = ? WHERE id = ?",
        [confidence, l.id]
      );
      unchanged++;
    }
  }

  console.log(`\nRe-Klassifizierung abgeschlossen:`);
  console.log(`  Aktualisiert: ${updated}`);
  console.log(`  Unverändert:  ${unchanged}`);
  console.log(`  Fallbacks:    ${fallbacks} (manuell prüfen)`);
}

reclassify()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
