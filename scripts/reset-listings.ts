import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  const before = await db.execute("SELECT COUNT(*) as cnt FROM listings");
  console.log(`Listings before: ${(before.rows[0] as Record<string, unknown>).cnt}`);

  // Delete images for crawled listings first (FK)
  await db.execute(
    `DELETE FROM listing_images WHERE listing_id IN (SELECT id FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun'))`
  );
  console.log("Crawled listing images deleted");

  // Delete crawled listings
  await db.execute(
    `DELETE FROM listings WHERE source IN ('gebrauchtwaffen', 'nextgun')`
  );
  console.log("Crawled listings deleted");

  // Clear crawl_meta
  try {
    await db.execute("DELETE FROM crawl_meta");
    console.log("Crawl meta cleared");
  } catch {
    console.log("No crawl_meta table — skipping");
  }

  const after = await db.execute("SELECT COUNT(*) as cnt FROM listings");
  console.log(`Listings after: ${(after.rows[0] as Record<string, unknown>).cnt}`);
  console.log("Done! Ready to crawl fresh.");

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
