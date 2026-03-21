/**
 * Run the full crawler locally.
 * Usage: npx tsx src/scripts/crawl.ts
 */
import { initializeSchema } from "../lib/db";
import { runCrawl } from "../lib/crawl-waffengebraucht";

async function main() {
  await initializeSchema();
  console.log("Starting crawl...\n");

  const result = await runCrawl();

  console.log(`\nCrawl complete:`);
  console.log(`  Inserted:  ${result.inserted}`);
  console.log(`  Updated:   ${result.updated}`);
  console.log(`  Unchanged: ${result.unchanged}`);
  console.log(`  Deleted:   ${result.deleted}`);
  console.log(`  Duration:  ${(result.duration / 1000).toFixed(1)}s`);
  if (result.stopped) console.log(`  (stopped early)`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Crawl error:", err);
    process.exit(1);
  });
