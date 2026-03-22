import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbRun, dbGet } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeSchema();
    const { urls } = await req.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    const listingId = params.id;

    for (let i = 0; i < urls.length; i++) {
      await dbRun(
        "INSERT INTO listing_images (id, listing_id, url, position) VALUES (?, ?, ?, ?)",
        [uuidv4(), listingId, urls[i], i]
      );
    }

    // Set main image on the listing
    await dbRun(
      "UPDATE listings SET image_url = ? WHERE id = ?",
      [urls[0], listingId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/listings/[id]/images error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeSchema();
    const { imageId, newUrl } = await req.json();

    if (!imageId || !newUrl) {
      return NextResponse.json({ error: "imageId and newUrl required" }, { status: 400 });
    }

    const listingId = params.id;

    // Update the image URL
    await dbRun(
      "UPDATE listing_images SET url = ? WHERE id = ? AND listing_id = ?",
      [newUrl, imageId, listingId]
    );

    // If this was the first image (position 0), also update the listing's main image_url
    const img = await dbGet<{ position: number }>(
      "SELECT position FROM listing_images WHERE id = ? AND listing_id = ?",
      [imageId, listingId]
    );
    if (img && img.position === 0) {
      await dbRun(
        "UPDATE listings SET image_url = ? WHERE id = ?",
        [newUrl, listingId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/listings/[id]/images error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
