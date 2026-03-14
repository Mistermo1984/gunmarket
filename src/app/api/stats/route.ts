import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const inserate = (
      db.prepare("SELECT COUNT(*) as c FROM listings WHERE status = 'aktiv'").get() as { c: number }
    ).c;

    const verkaeufer = (
      db.prepare("SELECT COUNT(DISTINCT user_id) as c FROM listings WHERE status = 'aktiv'").get() as { c: number }
    ).c;

    const kantone = (
      db.prepare("SELECT COUNT(DISTINCT kanton) as c FROM listings WHERE status = 'aktiv'").get() as { c: number }
    ).c;

    return NextResponse.json({ inserate, verkaeufer, kantone });
  } catch {
    return NextResponse.json({ inserate: 0, verkaeufer: 0, kantone: 0 });
  }
}
