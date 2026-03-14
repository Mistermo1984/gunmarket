import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

function unauthorized() {
  return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
}

// GET /api/admin — Full admin stats
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) return unauthorized();

  const db = getDb();

  // User stats
  const totalUsers = (db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number }).c;
  const haendler = (db.prepare("SELECT COUNT(*) as c FROM users WHERE anbieter_typ = 'Händler'").get() as { c: number }).c;
  const privat = totalUsers - haendler;
  const admins = (db.prepare("SELECT COUNT(*) as c FROM users WHERE is_admin = 1").get() as { c: number }).c;

  // Listing stats
  const totalListings = (db.prepare("SELECT COUNT(*) as c FROM listings").get() as { c: number }).c;
  const activeListings = (db.prepare("SELECT COUNT(*) as c FROM listings WHERE status = 'aktiv'").get() as { c: number }).c;
  const pausedListings = (db.prepare("SELECT COUNT(*) as c FROM listings WHERE status = 'pausiert'").get() as { c: number }).c;
  const deletedListings = (db.prepare("SELECT COUNT(*) as c FROM listings WHERE status = 'geloescht'").get() as { c: number }).c;
  const totalAufrufe = (db.prepare("SELECT COALESCE(SUM(aufrufe), 0) as s FROM listings").get() as { s: number }).s;
  const avgPreis = (db.prepare("SELECT COALESCE(AVG(preis), 0) as a FROM listings WHERE status = 'aktiv'").get() as { a: number }).a;

  // Message stats
  const totalMessages = (db.prepare("SELECT COUNT(*) as c FROM messages").get() as { c: number }).c;
  const unreadMessages = (db.prepare("SELECT COUNT(*) as c FROM messages WHERE read_at IS NULL").get() as { c: number }).c;

  // Favorite stats
  const totalFavorites = (db.prepare("SELECT COUNT(*) as c FROM favorites").get() as { c: number }).c;

  // Listings by category
  const kategorien = db.prepare(
    "SELECT hauptkategorie, COUNT(*) as count FROM listings WHERE status != 'geloescht' GROUP BY hauptkategorie ORDER BY count DESC"
  ).all() as { hauptkategorie: string; count: number }[];

  // Listings by kanton
  const kantone = db.prepare(
    "SELECT kanton, COUNT(*) as count FROM listings WHERE status != 'geloescht' GROUP BY kanton ORDER BY count DESC LIMIT 10"
  ).all() as { kanton: string; count: number }[];

  // Recent users
  const recentUsers = db.prepare(
    "SELECT id, email, vorname, nachname, anbieter_typ, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT 5"
  ).all();

  // Recent listings
  const recentListings = db.prepare(
    "SELECT l.id, l.titel, l.preis, l.status, l.hauptkategorie, l.created_at, u.vorname, u.nachname FROM listings l JOIN users u ON l.user_id = u.id ORDER BY l.created_at DESC LIMIT 5"
  ).all();

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
