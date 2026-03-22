import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot
    if (body.website) {
      return NextResponse.json({ error: "Spam" }, { status: 400 });
    }

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
    }

    await getResend().emails.send({
      from: process.env.EMAIL_FROM || "GunMarket.ch <noreply@gunmarket.ch>",
      to: "maurice.acker@gmail.com",
      replyTo: body.email,
      subject: `[GunMarket Kontakt] ${body.subject || "Allgemeine Anfrage"} — ${body.name}`,
      text: `Name: ${body.name}\nE-Mail: ${body.email}\nBetreff: ${body.subject || "—"}\n\nNachricht:\n${body.message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Fehler beim Senden" },
      { status: 500 }
    );
  }
}
