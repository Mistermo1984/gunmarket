import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";
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

    await initializeSchema();

    const record = await dbGet<{ id: string; user_id: string; expires_at: string }>(
      "SELECT * FROM email_tokens WHERE token = ? AND type = 'reset' AND used = 0",
      [token]
    );

    if (!record) {
      return NextResponse.json({ error: "Ungültiger oder bereits verwendeter Link" }, { status: 400 });
    }

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: "Link ist abgelaufen. Bitte fordern Sie einen neuen an." }, { status: 400 });
    }

    const password_hash = bcrypt.hashSync(password, 10);
    await dbRun(
      "UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?",
      [password_hash, record.user_id]
    );

    await dbRun("UPDATE email_tokens SET used = 1 WHERE id = ?", [record.id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Fehler beim Zurücksetzen" }, { status: 500 });
  }
}
