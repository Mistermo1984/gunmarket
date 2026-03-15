import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "E-Mail erforderlich" }, { status: 400 });
    }

    await initializeSchema();
    const user = await dbGet<{ id: string; vorname: string; email_verified: number }>(
      "SELECT id, vorname, email_verified FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return NextResponse.json({ success: true });
    }

    if (user.email_verified === 1) {
      return NextResponse.json({ error: "E-Mail bereits bestätigt" }, { status: 400 });
    }

    await dbRun(
      "UPDATE email_tokens SET used = 1 WHERE user_id = ? AND type = 'verify'",
      [user.id]
    );

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await dbRun(
      "INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, 'verify', ?)",
      [uuidv4(), user.id, token, expiresAt]
    );

    await sendVerificationEmail(email, token, user.vorname);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
