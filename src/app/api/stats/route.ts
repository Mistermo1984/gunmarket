import { NextResponse } from "next/server";
import { initializeSchema, dbGet } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initializeSchema();

    const inserate = (
      await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings WHERE status = 'aktiv'")
    )?.c ?? 0;

    const verkaeufer = (
      await dbGet<{ c: number }>("SELECT COUNT(DISTINCT user_id) as c FROM listings WHERE status = 'aktiv'")
    )?.c ?? 0;

    const kantone = (
      await dbGet<{ c: number }>("SELECT COUNT(DISTINCT kanton) as c FROM listings WHERE status = 'aktiv' AND kanton IS NOT NULL AND kanton != ''")
    )?.c ?? 0;

    return NextResponse.json({ inserate, verkaeufer, kantone });
  } catch {
    return NextResponse.json({ inserate: 0, verkaeufer: 0, kantone: 0 });
  }
}
