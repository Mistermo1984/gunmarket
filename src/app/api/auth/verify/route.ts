import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }

  await initializeSchema();

  const record = await dbGet<{ id: string; user_id: string; expires_at: string }>(
    "SELECT * FROM email_tokens WHERE token = ? AND type = 'verify' AND used = 0",
    [token]
  );

  if (!record) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }

  if (new Date(record.expires_at) < new Date()) {
    return NextResponse.redirect(new URL("/login?error=token-expired", req.url));
  }

  await dbRun("UPDATE users SET email_verified = 1 WHERE id = ?", [record.user_id]);
  await dbRun("UPDATE email_tokens SET used = 1 WHERE id = ?", [record.id]);

  return NextResponse.redirect(new URL("/login?verified=1", req.url));
}
