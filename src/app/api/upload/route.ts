import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import path from "path";
import { mkdir } from "fs/promises";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 8;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_DIMENSION = 1200;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const listingId = formData.get("listing_id") as string;
    const files = formData.getAll("images") as File[];

    if (!listingId) {
      return NextResponse.json(
        { error: "listing_id required" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    await initializeSchema();

    const existing = await dbGet<{ c: number }>(
      "SELECT COUNT(*) as c FROM listing_images WHERE listing_id = ?",
      [listingId]
    );

    const existingCount = existing?.c ?? 0;

    if (existingCount + files.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `Maximal ${MAX_IMAGES} Bilder erlaubt. Bereits ${existingCount} vorhanden.` },
        { status: 400 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const uploadedImages: { id: string; url: string; position: number }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Ungültiger Dateityp: ${file.type}. Erlaubt: JPG, PNG, WEBP` },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Datei zu gross (max. 10MB): ${file.name}` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageId = uuidv4();
      const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const filename = `${imageId}.${ext}`;

      await sharp(buffer)
        .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
        .toFile(path.join(UPLOAD_DIR, filename));

      const url = `/uploads/${filename}`;
      const position = existingCount + i;
      const isMain = existingCount === 0 && i === 0 ? 1 : 0;

      await dbRun(
        "INSERT INTO listing_images (id, listing_id, url, position, is_main) VALUES (?, ?, ?, ?, ?)",
        [imageId, listingId, url, position, isMain]
      );

      uploadedImages.push({ id: imageId, url, position });
    }

    return NextResponse.json({ images: uploadedImages }, { status: 201 });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
