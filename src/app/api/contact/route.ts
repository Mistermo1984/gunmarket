import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, locale } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });
    }
    await sendContactFormEmail(name, email, message, locale || "de");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden" },
      { status: 500 }
    );
  }
}
