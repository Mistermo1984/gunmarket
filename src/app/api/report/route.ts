import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

function getDb() {
  const dbPath = path.join(process.cwd(), "data", "reports.db");
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id TEXT NOT NULL,
      reason TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { listing_id, reason, details } = body;

    if (!listing_id || !reason) {
      return NextResponse.json(
        { error: "listing_id and reason are required" },
        { status: 400 }
      );
    }

    const db = getDb();
    const stmt = db.prepare(
      "INSERT INTO reports (listing_id, reason, details) VALUES (?, ?, ?)"
    );
    stmt.run(listing_id, reason, details || null);
    db.close();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
