import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token und Passwort erforderlich" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Passwort muss mindestens 8 Zeichen lang sein" }, { status: 400 });
    }

    const db = getDb();

    const record = db.prepare(
      "SELECT * FROM email_tokens WHERE token = ? AND type = 'reset' AND used = 0"
    ).get(token) as Record<string, unknown> | undefined;

    if (!record) {
      return NextResponse.json({ error: "Ungültiger oder bereits verwendeter Link" }, { status: 400 });
    }

    if (new Date(record.expires_at as string) < new Date()) {
      return NextResponse.json({ error: "Link ist abgelaufen. Bitte fordern Sie einen neuen an." }, { status: 400 });
    }

    // Update password
    const password_hash = bcrypt.hashSync(password, 10);
    db.prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").run(password_hash, record.user_id);

    // Mark token as used
    db.prepare("UPDATE email_tokens SET used = 1 WHERE id = ?").run(record.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Fehler beim Zurücksetzen" }, { status: 500 });
  }
}
