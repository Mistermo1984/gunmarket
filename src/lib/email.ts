import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return _resend;
}

const FROM_EMAIL = process.env.EMAIL_FROM || "GunMarket.ch <noreply@gunmarket.ch>";
const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string, vorname: string) {
  const verifyUrl = `${BASE_URL}/api/auth/verify?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "E-Mail bestätigen — GunMarket.ch",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="display: inline-block; background: #16a34a; color: white; font-weight: 900; font-size: 18px; width: 40px; height: 40px; line-height: 40px; border-radius: 8px; text-align: center;">✚</span>
          <span style="font-weight: 900; font-size: 22px; margin-left: 8px; color: #1a1a2e;">GunMarket<span style="color: #16a34a;">.ch</span></span>
        </div>

        <h1 style="font-size: 24px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px;">Willkommen, ${vorname}!</h1>
        <p style="color: #6b7280; font-size: 15px; line-height: 1.6;">
          Vielen Dank für Ihre Registrierung bei GunMarket.ch. Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${verifyUrl}" style="display: inline-block; background: #16a34a; color: white; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
            E-Mail bestätigen
          </a>
        </div>

        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
          Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
          <a href="${verifyUrl}" style="color: #16a34a; word-break: break-all;">${verifyUrl}</a>
        </p>

        <p style="color: #9ca3af; font-size: 13px;">
          Dieser Link ist 24 Stunden gültig.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

        <p style="color: #d1d5db; font-size: 11px; text-align: center;">
          Falls Sie sich nicht bei GunMarket.ch registriert haben, können Sie diese E-Mail ignorieren.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string, vorname: string) {
  const resetUrl = `${BASE_URL}/passwort-reset?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Passwort zurücksetzen — GunMarket.ch",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="display: inline-block; background: #16a34a; color: white; font-weight: 900; font-size: 18px; width: 40px; height: 40px; line-height: 40px; border-radius: 8px; text-align: center;">✚</span>
          <span style="font-weight: 900; font-size: 22px; margin-left: 8px; color: #1a1a2e;">GunMarket<span style="color: #16a34a;">.ch</span></span>
        </div>

        <h1 style="font-size: 24px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px;">Passwort zurücksetzen</h1>
        <p style="color: #6b7280; font-size: 15px; line-height: 1.6;">
          Hallo ${vorname}, Sie haben ein neues Passwort für Ihr GunMarket.ch-Konto angefordert. Klicken Sie auf den folgenden Button, um ein neues Passwort zu wählen.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: #1a1a2e; color: white; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
            Neues Passwort wählen
          </a>
        </div>

        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
          Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
          <a href="${resetUrl}" style="color: #16a34a; word-break: break-all;">${resetUrl}</a>
        </p>

        <p style="color: #9ca3af; font-size: 13px;">
          Dieser Link ist 1 Stunde gültig. Falls Sie kein neues Passwort angefordert haben, können Sie diese E-Mail ignorieren.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

        <p style="color: #d1d5db; font-size: 11px; text-align: center;">
          Diese E-Mail wurde von GunMarket.ch gesendet.
        </p>
      </div>
    `,
  });
}
