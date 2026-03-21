import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeSchema, dbRun } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  await initializeSchema();

  const body = await req.formData();
  const id = body.get("id") as string;
  const hauptkategorie = body.get("hauptkategorie") as string;

  if (!id || !hauptkategorie) {
    return NextResponse.json({ error: "Fehlende Parameter" }, { status: 400 });
  }

  await dbRun(
    "UPDATE listings SET hauptkategorie = ?, kategorie_confidence = 'manual', updated_at = datetime('now') WHERE id = ?",
    [hauptkategorie, id]
  );

  return NextResponse.redirect(new URL("/admin/crawling/verifikation", req.url));
}
