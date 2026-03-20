import { createClient } from "@libsql/client";
import { classifyCategory } from "../src/lib/category-classifier";
import { classifyRechtsstatus } from "../src/lib/rechtsstatus-classifier";

async function main() {
  const client = createClient({ url: "file:gunmarket.db" });

  // Before counts
  const beforeCat = await client.execute(
    "SELECT hauptkategorie, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' GROUP BY hauptkategorie ORDER BY cnt DESC"
  );
  console.log("=== BEFORE (hauptkategorie) ===");
  for (const row of beforeCat.rows) {
    console.log(`  ${row.hauptkategorie}: ${row.cnt}`);
  }

  // Get all active listings
  const listings = await client.execute(
    "SELECT id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus FROM listings WHERE status = 'aktiv'"
  );

  let catChanged = 0;
  let rechtsChanged = 0;
  const newCatCounts: Record<string, number> = {};

  for (const row of listings.rows) {
    const titel = String(row.titel || "");
    const beschreibung = String(row.beschreibung || "");
    const oldHaupt = String(row.hauptkategorie || "");
    const oldUnter = String(row.unterkategorie || "");

    const { hauptkategorie: newHaupt, unterkategorie: newUnter } = classifyCategory(titel, beschreibung);
    newCatCounts[newHaupt] = (newCatCounts[newHaupt] || 0) + 1;

    if (newHaupt !== oldHaupt || newUnter !== oldUnter) {
      catChanged++;
      await client.execute({
        sql: "UPDATE listings SET hauptkategorie = ?, unterkategorie = ? WHERE id = ?",
        args: [newHaupt, newUnter, row.id as string],
      });
    }

    // Also re-classify rechtsstatus since categories changed
    const newRechts = classifyRechtsstatus({
      titel,
      beschreibung,
      hauptkategorie: newHaupt,
      unterkategorie: newUnter,
    });
    if (newRechts !== String(row.rechtsstatus || "")) {
      rechtsChanged++;
      await client.execute({
        sql: "UPDATE listings SET rechtsstatus = ? WHERE id = ?",
        args: [newRechts, row.id as string],
      });
    }
  }

  console.log(`\n=== AFTER (hauptkategorie) ===`);
  const sorted = Object.entries(newCatCounts).sort((a, b) => b[1] - a[1]);
  for (const [cat, cnt] of sorted) {
    console.log(`  ${cat}: ${cnt}`);
  }

  console.log(`\nTotal: ${listings.rows.length}`);
  console.log(`Categories changed: ${catChanged}`);
  console.log(`Rechtsstatus changed: ${rechtsChanged}`);

  // Verify kurzwaffen
  console.log("\n=== KURZWAFFEN SAMPLE (first 20) ===");
  const kurzCheck = await client.execute(
    "SELECT titel FROM listings WHERE hauptkategorie = 'kurzwaffen' AND status = 'aktiv' LIMIT 20"
  );
  for (const row of kurzCheck.rows) {
    console.log(`  ${row.titel}`);
  }
}

main().catch(console.error);
