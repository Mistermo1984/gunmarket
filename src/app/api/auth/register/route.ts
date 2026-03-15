import { NextRequest, NextResponse } from "next/server";
import { initializeSchema, dbGet, dbRun } from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const body = await req.json();

    const {
      email, password, vorname, nachname, anbieterTyp,
      telefon, kanton, firmenname, uidNummer, bewilligungsNr, website,
    } = body;

    if (!email || !password || !vorname || !nachname) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 8 Zeichen lang sein" },
        { status: 400 }
      );
    }

    const existing = await dbGet("SELECT id FROM users WHERE email = ?", [email]);

    if (existing) {
      return NextResponse.json(
        { error: "Diese E-Mail-Adresse ist bereits registriert" },
        { status: 409 }
      );
    }

    const id = uuidv4();
    const password_hash = bcrypt.hashSync(password, 10);

    await dbRun(
      `INSERT INTO users (id, email, password_hash, vorname, nachname, anbieter_typ, telefon, kanton, firmenname, uid_nummer, bewilligungs_nr, website)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, email, password_hash, vorname, nachname,
        anbieterTyp === "haendler" ? "Händler" : "Privat",
        telefon || null, kanton || null,
        firmenname || null, uidNummer || null, bewilligungsNr || null, website || null,
      ]
    );

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await dbRun(
      "INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, 'verify', ?)",
      [uuidv4(), id, token, expiresAt]
    );

    try {
      await sendVerificationEmail(email, token, vorname);
    } catch (emailError) {
      console.error("Email send error:", emailError);
    }

    return NextResponse.json({ id, emailSent: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json(
      { error: "Registrierung fehlgeschlagen" },
      { status: 500 }
    );
  }
}
