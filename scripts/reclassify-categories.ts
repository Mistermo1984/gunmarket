import { createClient } from "@libsql/client";
import { classifyRechtsstatus } from "../src/lib/rechtsstatus-classifier";

/**
 * Migrate all listings from old category IDs to new category IDs:
 * - buechsen → langwaffen (subcategory: buechsen)
 * - flinten → langwaffen (subcategory: flinten)
 * - jagdwaffen → langwaffen (subcategory: jagdwaffen)
 * - freie-waffen → luftdruckwaffen (subcategory detected)
 *
 * Also detect and set unterkategorie for all listings.
 * Also re-run rechtsstatus classification with updated classifier.
 */

// Subcategory detection (same logic as crawler)
function detectSubcategory(hauptkategorie: string, titel: string, beschreibung: string): string {
  const text = `${titel} ${beschreibung}`.toLowerCase();

  switch (hauptkategorie) {
    case "kurzwaffen": {
      if (/revolver|python|king\s*cobra|anaconda|detective|tracker|judge|raging|blackhawk|wrangler|vaquero/i.test(text)) return "revolver";
      return "pistolen";
    }
    case "langwaffen": {
      if (/flinte|schrotflinte|bockflinte|querflinte|drilling|12\/70|20\/70|12\/76|20\/76|superpos|juxtapos|over[\s/-]?under|side[\s/-]?by/i.test(text)) return "flinten";
      if (/jagd|kirrung|kipplauf|bockb[üu]chs|pirsch|ansitz/i.test(text)) return "jagdwaffen";
      if (/b[üu]chse|karabiner|repetier|halbautomat|sturmgewehr|bolt[\s-]?action|einzellad/i.test(text)) return "buechsen";
      return "andere-langwaffen";
    }
    case "ordonnanzwaffen": {
      if (/p[\s.-]?210|p[\s.-]?49|p[\s.-]?75|ordonnanzpistol|ordonanz.*pistol|pistol.*ordon/i.test(text)) return "kurzwaffen-ordonnanz";
      return "langwaffen-ordonnanz";
    }
    case "luftdruckwaffen": {
      if (/luftpistol|air\s*pistol|co2[\s-]?pistol/i.test(text)) return "luftpistolen";
      if (/co2|softair|airsoft|bb[\s-]?gun|gbb|aeg|hpa/i.test(text)) return "co2-waffen";
      return "luftgewehre";
    }
    case "optik": {
      if (/zielfernrohr|scope|variable|fix.*x|zf\b/i.test(text)) return "zielfernrohre";
      if (/rotpunkt|red[\s-]?dot|reflex|holosun|aimpoint|eotech/i.test(text)) return "rotpunktvisiere";
      if (/fernglas|spektiv|binocular/i.test(text)) return "fernglaeser";
      if (/montage|picatinny|ring|rail|weaver/i.test(text)) return "montagen";
      return "zielfernrohre";
    }
    case "zubehoer": {
      if (/magazin|ladevorrichtung|charger/i.test(text)) return "magazine";
      if (/holster|tasche|futteral|koffer/i.test(text)) return "holster";
      if (/lauf|verschluss|schaft|kolben|abzug|schlitten|griffst[üu]ck|teil/i.test(text)) return "lauefe-teile";
      if (/reinigung|pflege|[öo]l\b|putzstock|borste/i.test(text)) return "reinigung";
      return "andere-zubehoer";
    }
    case "munition":
      return "";
    default:
      return "";
  }
}

// Map old hauptkategorie to new
const CATEGORY_MIGRATION: Record<string, string> = {
  buechsen: "langwaffen",
  flinten: "langwaffen",
  jagdwaffen: "langwaffen",
  "freie-waffen": "luftdruckwaffen",
};

async function main() {
  const client = createClient({ url: "file:gunmarket.db" });

  // Before counts
  const beforeCats = await client.execute(
    "SELECT hauptkategorie, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' GROUP BY hauptkategorie ORDER BY cnt DESC"
  );
  console.log("=== BEFORE (hauptkategorie) ===");
  for (const row of beforeCats.rows) {
    console.log(`  ${row.hauptkategorie}: ${row.cnt}`);
  }

  const beforeRechts = await client.execute(
    "SELECT rechtsstatus, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' GROUP BY rechtsstatus ORDER BY cnt DESC"
  );
  console.log("\n=== BEFORE (rechtsstatus) ===");
  for (const row of beforeRechts.rows) {
    console.log(`  ${row.rechtsstatus}: ${row.cnt}`);
  }

  // Get all listings
  const listings = await client.execute(
    "SELECT id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus FROM listings WHERE status = 'aktiv'"
  );

  let catChanged = 0;
  let subChanged = 0;
  let rechtsChanged = 0;
  const newCatCounts: Record<string, number> = {};
  const newSubCounts: Record<string, number> = {};
  const newRechtsCounts: Record<string, number> = {};

  for (const row of listings.rows) {
    const oldHk = String(row.hauptkategorie || "");
    const oldUk = String(row.unterkategorie || "");
    const oldRechts = String(row.rechtsstatus || "");
    const titel = String(row.titel || "");
    const beschreibung = String(row.beschreibung || "");

    // Migrate hauptkategorie
    const newHk = CATEGORY_MIGRATION[oldHk] || oldHk;

    // Detect subcategory
    const newUk = detectSubcategory(newHk, titel, beschreibung) || oldUk;

    // Reclassify rechtsstatus with new category
    const newRechts = classifyRechtsstatus({
      titel,
      beschreibung,
      hauptkategorie: newHk,
      unterkategorie: newUk,
    });

    newCatCounts[newHk] = (newCatCounts[newHk] || 0) + 1;
    if (newUk) newSubCounts[newUk] = (newSubCounts[newUk] || 0) + 1;
    newRechtsCounts[newRechts] = (newRechtsCounts[newRechts] || 0) + 1;

    // Update if anything changed
    if (newHk !== oldHk || newUk !== oldUk || newRechts !== oldRechts) {
      await client.execute({
        sql: "UPDATE listings SET hauptkategorie = ?, unterkategorie = ?, rechtsstatus = ? WHERE id = ?",
        args: [newHk, newUk, newRechts, row.id as string],
      });
      if (newHk !== oldHk) catChanged++;
      if (newUk !== oldUk) subChanged++;
      if (newRechts !== oldRechts) rechtsChanged++;
    }
  }

  console.log(`\n=== AFTER (${listings.rows.length} listings) ===`);
  console.log(`  Categories changed: ${catChanged}`);
  console.log(`  Subcategories set: ${subChanged}`);
  console.log(`  Rechtsstatus changed: ${rechtsChanged}`);

  console.log("\n--- hauptkategorie ---");
  for (const [cat, count] of Object.entries(newCatCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }

  console.log("\n--- unterkategorie ---");
  for (const [sub, count] of Object.entries(newSubCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${sub}: ${count}`);
  }

  console.log("\n--- rechtsstatus ---");
  for (const [rs, count] of Object.entries(newRechtsCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${rs}: ${count}`);
  }
}

main().catch(console.error);
