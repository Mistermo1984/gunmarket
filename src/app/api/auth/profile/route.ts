import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { user_id, vorname, nachname, telefon, kanton, ueber_mich, oldPassword, newPassword } = body;

    if (!user_id) {
      return NextResponse.json({ error: "user_id required" }, { status: 400 });
    }

    // Password change
    if (oldPassword && newPassword) {
      const user = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(user_id) as { password_hash: string } | undefined;
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (!bcrypt.compareSync(oldPassword, user.password_hash)) {
        return NextResponse.json({ error: "Falsches Passwort" }, { status: 400 });
      }

      const newHash = bcrypt.hashSync(newPassword, 10);
      db.prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").run(newHash, user_id);
      return NextResponse.json({ success: true });
    }

    // Profile update
    const fields: string[] = [];
    const values: (string | null)[] = [];

    if (vorname !== undefined) { fields.push("vorname = ?"); values.push(vorname); }
    if (nachname !== undefined) { fields.push("nachname = ?"); values.push(nachname); }
    if (telefon !== undefined) { fields.push("telefon = ?"); values.push(telefon || null); }
    if (kanton !== undefined) { fields.push("kanton = ?"); values.push(kanton || null); }
    if (ueber_mich !== undefined) { fields.push("ueber_mich = ?"); values.push(ueber_mich || null); }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    fields.push("updated_at = datetime('now')");
    values.push(user_id);

    db.prepare(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`).run(...values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/auth/profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
