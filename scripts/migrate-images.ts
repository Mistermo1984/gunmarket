import { createClient } from "@libsql/client";
import { put } from "@vercel/blob";

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function downloadAndUpload(imageUrl: string, listingId: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        "Referer": "https://waffengebraucht.ch/",
      },
    });
    if (!response.ok) {
      console.log(`  HTTP ${response.status} for ${imageUrl}`);
      return null;
    }
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 100) {
      console.log(`  Too small (${buffer.byteLength} bytes), skipping`);
      return null;
    }
    const blob = await put(`listings/${listingId}-${Date.now()}.jpg`, buffer, {
      access: "public",
      contentType: response.headers.get("content-type") || "image/jpeg",
    });
    return blob.url;
  } catch (e) {
    console.error(`  Download failed:`, e);
    return null;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const client = createClient({ url: "file:gunmarket.db" });

  // Get all images from waffengebraucht.ch and nextgun that haven't been migrated yet
  const images = await client.execute(
    "SELECT li.id, li.listing_id, li.url FROM listing_images li WHERE li.url LIKE '%waffengebraucht.ch%' OR li.url LIKE '%nextgun.ch%'"
  );

  console.log(`Found ${images.rows.length} images to migrate`);

  const BATCH_SIZE = 10;
  let migrated = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < images.rows.length; i += BATCH_SIZE) {
    const batch = images.rows.slice(i, i + BATCH_SIZE);
    console.log(`\nBatch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(images.rows.length / BATCH_SIZE)} (${i}/${images.rows.length})`);

    const results = await Promise.all(
      batch.map(async (row) => {
        const imageId = row.id as string;
        const listingId = row.listing_id as string;
        const url = row.url as string;

        const blobUrl = await downloadAndUpload(url, listingId);
        if (blobUrl) {
          await client.execute({
            sql: "UPDATE listing_images SET url = ? WHERE id = ?",
            args: [blobUrl, imageId],
          });
          return "migrated";
        }
        return "failed";
      })
    );

    migrated += results.filter((r) => r === "migrated").length;
    failed += results.filter((r) => r === "failed").length;

    console.log(`  Batch done: ${results.filter((r) => r === "migrated").length} migrated, ${results.filter((r) => r === "failed").length} failed`);

    if (i + BATCH_SIZE < images.rows.length) {
      await delay(500);
    }
  }

  console.log(`\n=== MIGRATION COMPLETE ===`);
  console.log(`Total: ${images.rows.length}`);
  console.log(`Migrated: ${migrated}`);
  console.log(`Failed: ${failed}`);

  // Verify
  const verify = await client.execute(
    "SELECT li.id, li.url FROM listing_images li WHERE li.url LIKE '%vercel%' LIMIT 5"
  );
  console.log(`\n=== VERIFICATION (first 5 blob URLs) ===`);
  for (const row of verify.rows) {
    console.log(`  ${row.url}`);
  }
}

main().catch(console.error);
