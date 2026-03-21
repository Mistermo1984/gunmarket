import { NextResponse } from "next/server";
import { initializeSchema, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeSchema();

    const inserate = (
      await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings WHERE status = 'aktiv'")
    )?.c ?? 0;

    const haendler = (
      await dbGet<{ c: number }>("SELECT COUNT(DISTINCT COALESCE(user_id, source)) as c FROM listings WHERE status = 'aktiv'")
    )?.c ?? 0;

    const kantone = (
      await dbGet<{ c: number }>("SELECT COUNT(DISTINCT kanton) as c FROM listings WHERE status = 'aktiv' AND kanton IS NOT NULL AND kanton != ''")
    )?.c ?? 0;

    return NextResponse.json({ inserate, haendler, kantone });
  } catch {
    return NextResponse.json({ inserate: 0, haendler: 0, kantone: 0 });
  }
}
