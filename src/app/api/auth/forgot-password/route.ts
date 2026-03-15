import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "E-Mail erforderlich" }, { status: 400 });
    }

    await initializeSchema();
    const user = await dbGet<{ id: string; vorname: string }>(
      "SELECT id, vorname FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return NextResponse.json({ success: true });
    }

    await dbRun(
      "UPDATE email_tokens SET used = 1 WHERE user_id = ? AND type = 'reset'",
      [user.id]
    );

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await dbRun(
      "INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, 'reset', ?)",
      [uuidv4(), user.id, token, expiresAt]
    );

    await sendPasswordResetEmail(email, token, user.vorname);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
