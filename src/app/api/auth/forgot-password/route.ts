import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "E-Mail erforderlich" }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare("SELECT id, vorname FROM users WHERE email = ?").get(email) as Record<string, unknown> | undefined;

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Invalidate old reset tokens
    db.prepare("UPDATE email_tokens SET used = 1 WHERE user_id = ? AND type = 'reset'").run(user.id);

    // Create new token (1 hour validity)
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    db.prepare(
      "INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, 'reset', ?)"
    ).run(uuidv4(), user.id, token, expiresAt);

    await sendPasswordResetEmail(email, token, user.vorname as string);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
