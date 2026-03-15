import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeSchema, dbGet, dbAll } from "@/lib/db";

function unauthorized() {
  return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  await initializeSchema();

  const totalUsers = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM users"))?.c ?? 0;
  const haendler = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM users WHERE anbieter_typ = 'Händler'"))?.c ?? 0;
  const privat = totalUsers - haendler;
  const admins = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM users WHERE is_admin = 1"))?.c ?? 0;

  const totalListings = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings"))?.c ?? 0;
  const activeListings = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings WHERE status = 'aktiv'"))?.c ?? 0;
  const pausedListings = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings WHERE status = 'pausiert'"))?.c ?? 0;
  const deletedListings = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM listings WHERE status = 'geloescht'"))?.c ?? 0;
  const totalAufrufe = (await dbGet<{ s: number }>("SELECT COALESCE(SUM(aufrufe), 0) as s FROM listings"))?.s ?? 0;
  const avgPreis = (await dbGet<{ a: number }>("SELECT COALESCE(AVG(preis), 0) as a FROM listings WHERE status = 'aktiv'"))?.a ?? 0;

  const totalMessages = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM messages"))?.c ?? 0;
  const unreadMessages = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM messages WHERE read_at IS NULL"))?.c ?? 0;

  const totalFavorites = (await dbGet<{ c: number }>("SELECT COUNT(*) as c FROM favorites"))?.c ?? 0;

  const kategorien = await dbAll<{ hauptkategorie: string; count: number }>(
    "SELECT hauptkategorie, COUNT(*) as count FROM listings WHERE status != 'geloescht' GROUP BY hauptkategorie ORDER BY count DESC"
  );

  const kantone = await dbAll<{ kanton: string; count: number }>(
    "SELECT kanton, COUNT(*) as count FROM listings WHERE status != 'geloescht' GROUP BY kanton ORDER BY count DESC LIMIT 10"
  );

  const recentUsers = await dbAll(
    "SELECT id, email, vorname, nachname, anbieter_typ, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT 5"
  );

  const recentListings = await dbAll(
    "SELECT l.id, l.titel, l.preis, l.status, l.hauptkategorie, l.created_at, u.vorname, u.nachname FROM listings l JOIN users u ON l.user_id = u.id ORDER BY l.created_at DESC LIMIT 5"
  );

  return NextResponse.json({
    users: { total: totalUsers, privat, haendler, admins },
    listings: { total: totalListings, aktiv: activeListings, pausiert: pausedListings, geloescht: deletedListings, totalAufrufe, avgPreis: Math.round(avgPreis) },
    messages: { total: totalMessages, unread: unreadMessages },
    favorites: { total: totalFavorites },
    kategorien,
    kantone,
    recentUsers,
    recentListings,
  });
}
