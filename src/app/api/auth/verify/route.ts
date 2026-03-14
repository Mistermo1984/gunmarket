import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }

  const db = getDb();

  const record = db.prepare(
    "SELECT * FROM email_tokens WHERE token = ? AND type = 'verify' AND used = 0"
  ).get(token) as Record<string, unknown> | undefined;

  if (!record) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }

  // Check expiration
  if (new Date(record.expires_at as string) < new Date()) {
    return NextResponse.redirect(new URL("/login?error=token-expired", req.url));
  }

  // Mark email as verified
  db.prepare("UPDATE users SET email_verified = 1 WHERE id = ?").run(record.user_id);

  // Mark token as used
  db.prepare("UPDATE email_tokens SET used = 1 WHERE id = ?").run(record.id);

  return NextResponse.redirect(new URL("/login?verified=1", req.url));
}
