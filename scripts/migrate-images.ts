import { createClient } from "@libsql/client";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://waffengebraucht.ch";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Scrape ALL full-size image URLs from a waffengebraucht.ch detail page */
async function scrapeDetailImages(sourceUrl: string): Promise<string[]> {
  try {
    const res = await fetch(sourceUrl, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    if (!res.ok) return [];
    const html = await res.text();
    const matches = html.match(/"photo\/\d+[^"]+1920\/1080/g);
    if (!matches || matches.length === 0) return [];
    const unique = Array.from(new Set(matches.map((m) => m.replace(/^"/, ""))));
    return unique.map((path) => `${BASE_URL}/${path}`);
  } catch {
    return [];
  }
}

/** Download image and upload to Vercel Blob */
async function downloadAndUpload(imageUrl: string, listingId: string, index: number): Promise<string | null> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        "Referer": "https://waffengebraucht.ch/",
      },
    });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 500) return null;
    const blob = await put(`listings/${listingId}-img${index}-${Date.now()}.jpg`, buffer, {
      access: "public",
      contentType: response.headers.get("content-type") || "image/jpeg",
    });
    return blob.url;
  } catch {
    return null;
  }
}

async function main() {
  const client = createClient({ url: "file:gunmarket.db" });

  // Get all waffengebraucht listings that have images (to scrape detail pages for ALL images)
  const listings = await client.execute(
    `SELECT DISTINCT l.id, l.source_url, l.source
     FROM listings l
     JOIN listing_images li ON li.listing_id = l.id
     WHERE l.source IN ('waffengebraucht', 'nextgun')
       AND l.status = 'aktiv'
     ORDER BY l.created_at DESC`
  );

  console.log(`Found ${listings.rows.length} listings to migrate`);

  const BATCH_SIZE = 5;
  let totalMigrated = 0;
  let totalImages = 0;
  let totalFailed = 0;

  for (let i = 0; i < listings.rows.length; i += BATCH_SIZE) {
    const batch = listings.rows.slice(i, i + BATCH_SIZE);
    console.log(`\nBatch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(listings.rows.length / BATCH_SIZE)} (${i}/${listings.rows.length})`);

    for (const row of batch) {
      const listingId = row.id as string;
      const sourceUrl = row.source_url as string;
      const source = row.source as string;

      let imageUrls: string[] = [];

      if (source === "waffengebraucht" && sourceUrl) {
        // Scrape detail page for ALL images
        imageUrls = await scrapeDetailImages(sourceUrl);
        await delay(300);
      }

      if (imageUrls.length === 0 && source === "nextgun") {
        // NextGun only has 1 image — get current URL from DB
        const existing = await client.execute({
          sql: "SELECT url FROM listing_images WHERE listing_id = ? LIMIT 1",
          args: [listingId],
        });
        if (existing.rows.length > 0) {
          imageUrls = [existing.rows[0].url as string];
        }
      }

      if (imageUrls.length === 0) {
        // Fall back to existing image URLs from DB
        const existing = await client.execute({
          sql: "SELECT url FROM listing_images WHERE listing_id = ? ORDER BY position",
          args: [listingId],
        });
        imageUrls = existing.rows.map((r) => r.url as string).filter((u) => !u.includes("vercel"));
        if (imageUrls.length === 0) continue;
      }

      // Delete old image records for this listing
      await client.execute({
        sql: "DELETE FROM listing_images WHERE listing_id = ?",
        args: [listingId],
      });

      // Download all images and create new records
      let uploaded = 0;
      for (let j = 0; j < imageUrls.length; j++) {
        const blobUrl = await downloadAndUpload(imageUrls[j], listingId, j);
        if (blobUrl) {
          await client.execute({
            sql: "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
            args: [uuidv4(), listingId, blobUrl, j, j === 0 ? 1 : 0],
          });
          uploaded++;
        }
        if (j < imageUrls.length - 1) await delay(200);
      }

      if (uploaded > 0) {
        totalMigrated++;
        totalImages += uploaded;
        console.log(`  ${listingId}: ${uploaded}/${imageUrls.length} images uploaded`);
      } else {
        totalFailed++;
        console.log(`  ${listingId}: FAILED (0/${imageUrls.length})`);
      }
    }

    if (i + BATCH_SIZE < listings.rows.length) {
      await delay(1000);
    }
  }

  console.log(`\n=== MIGRATION COMPLETE ===`);
  console.log(`Listings migrated: ${totalMigrated}`);
  console.log(`Total images uploaded: ${totalImages}`);
  console.log(`Listings failed: ${totalFailed}`);

  // Verify
  const verify = await client.execute(
    "SELECT listing_id, COUNT(*) as cnt FROM listing_images WHERE url LIKE '%vercel%' GROUP BY listing_id ORDER BY cnt DESC LIMIT 10"
  );
  console.log(`\n=== TOP 10 LISTINGS BY IMAGE COUNT ===`);
  for (const row of verify.rows) {
    console.log(`  ${row.listing_id}: ${row.cnt} images`);
  }

  const total = await client.execute("SELECT COUNT(*) as c FROM listing_images WHERE url LIKE '%vercel%'");
  console.log(`\nTotal blob images in DB: ${total.rows[0].c}`);
}

main().catch(console.error);
