import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "E-Mail erforderlich" }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare("SELECT id, vorname, email_verified FROM users WHERE email = ?").get(email) as Record<string, unknown> | undefined;

    if (!user) {
      // Don't reveal whether email exists
      return NextResponse.json({ success: true });
    }

    if (user.email_verified === 1) {
      return NextResponse.json({ error: "E-Mail bereits bestätigt" }, { status: 400 });
    }

    // Invalidate old tokens
    db.prepare("UPDATE email_tokens SET used = 1 WHERE user_id = ? AND type = 'verify'").run(user.id);

    // Create new token
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    db.prepare(
      "INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, 'verify', ?)"
    ).run(uuidv4(), user.id, token, expiresAt);

    await sendVerificationEmail(email, token, user.vorname as string);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
