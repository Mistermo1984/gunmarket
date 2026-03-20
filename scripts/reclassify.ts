import { createClient } from "@libsql/client";
import { classifyRechtsstatus } from "../src/lib/rechtsstatus-classifier";

async function main() {
  const client = createClient({ url: "file:gunmarket.db" });

  // Get before counts
  const beforeResult = await client.execute(
    "SELECT rechtsstatus, COUNT(*) as cnt FROM listings WHERE status = 'aktiv' GROUP BY rechtsstatus ORDER BY cnt DESC"
  );
  console.log("=== BEFORE ===");
  for (const row of beforeResult.rows) {
    console.log(`  ${row.rechtsstatus}: ${row.cnt}`);
  }

  // Get all listings
  const listings = await client.execute(
    "SELECT id, titel, beschreibung, hauptkategorie, unterkategorie, rechtsstatus FROM listings WHERE status = 'aktiv'"
  );

  let changed = 0;
  let total = 0;
  const newCounts: Record<string, number> = {};

  for (const row of listings.rows) {
    total++;
    const newStatus = classifyRechtsstatus({
      titel: String(row.titel || ""),
      beschreibung: String(row.beschreibung || ""),
      hauptkategorie: String(row.hauptkategorie || ""),
      unterkategorie: String(row.unterkategorie || ""),
    });

    newCounts[newStatus] = (newCounts[newStatus] || 0) + 1;

    if (newStatus !== row.rechtsstatus) {
      await client.execute({
        sql: "UPDATE listings SET rechtsstatus = ? WHERE id = ?",
        args: [newStatus, row.id as string],
      });
      changed++;
    }
  }

  console.log(`\n=== AFTER (${total} listings, ${changed} changed) ===`);
  const sorted = Object.entries(newCounts).sort((a, b) => b[1] - a[1]);
  for (const [status, count] of sorted) {
    console.log(`  ${status}: ${count}`);
  }
}

main().catch(console.error);
