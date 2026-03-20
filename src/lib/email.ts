import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return _resend;
}

const FROM = process.env.EMAIL_FROM || "GunMarket.ch <noreply@gunmarket.ch>";
const BASE_URL = process.env.NEXTAUTH_URL || "https://gunmarket.ch";

type Locale = "de" | "fr" | "it";

// ─── Übersetzungen ────────────────────────────────────────────────────────────

const t = {
  welcome: {
    subject: {
      de: "Willkommen bei GunMarket!",
      fr: "Bienvenue sur GunMarket !",
      it: "Benvenuto su GunMarket!",
    },
    heading: {
      de: "Willkommen bei GunMarket",
      fr: "Bienvenue sur GunMarket",
      it: "Benvenuto su GunMarket",
    },
    body: {
      de: (name: string) =>
        `Hallo ${name},<br><br>vielen Dank für deine Registrierung auf GunMarket – dem Schweizer Marktplatz für Waffen und Zubehör.<br><br>Du kannst jetzt Inserate erstellen, suchen und mit anderen Nutzern in Kontakt treten.`,
      fr: (name: string) =>
        `Bonjour ${name},<br><br>merci de vous être inscrit sur GunMarket – la marketplace suisse pour armes et accessoires.<br><br>Vous pouvez maintenant créer des annonces, rechercher et contacter d'autres utilisateurs.`,
      it: (name: string) =>
        `Ciao ${name},<br><br>grazie per esserti registrato su GunMarket – il marketplace svizzero per armi e accessori.<br><br>Ora puoi creare annunci, cercare e contattare altri utenti.`,
    },
    cta: {
      de: "Jetzt loslegen",
      fr: "Commencer maintenant",
      it: "Inizia ora",
    },
  },
  verify: {
    subject: {
      de: "E-Mail bestätigen — GunMarket.ch",
      fr: "Confirmez votre e-mail — GunMarket.ch",
      it: "Conferma la tua email — GunMarket.ch",
    },
    heading: {
      de: (name: string) => `Willkommen, ${name}!`,
      fr: (name: string) => `Bienvenue, ${name} !`,
      it: (name: string) => `Benvenuto, ${name}!`,
    },
    body: {
      de: "Vielen Dank für Ihre Registrierung bei GunMarket.ch. Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren.",
      fr: "Merci de votre inscription sur GunMarket.ch. Veuillez confirmer votre adresse e-mail pour activer votre compte.",
      it: "Grazie per la registrazione su GunMarket.ch. Conferma il tuo indirizzo email per attivare il tuo account.",
    },
    cta: {
      de: "E-Mail bestätigen",
      fr: "Confirmer l'e-mail",
      it: "Conferma email",
    },
    fallback: {
      de: "Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:",
      fr: "Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :",
      it: "Se il pulsante non funziona, copia questo link nel tuo browser:",
    },
    expire: {
      de: "Dieser Link ist 24 Stunden gültig.",
      fr: "Ce lien est valable 24 heures.",
      it: "Questo link è valido per 24 ore.",
    },
    ignore: {
      de: "Falls Sie sich nicht bei GunMarket.ch registriert haben, können Sie diese E-Mail ignorieren.",
      fr: "Si vous ne vous êtes pas inscrit sur GunMarket.ch, vous pouvez ignorer cet e-mail.",
      it: "Se non ti sei registrato su GunMarket.ch, puoi ignorare questa email.",
    },
  },
  passwordReset: {
    subject: {
      de: "Passwort zurücksetzen — GunMarket.ch",
      fr: "Réinitialisation du mot de passe — GunMarket.ch",
      it: "Reimpostazione della password — GunMarket.ch",
    },
    heading: {
      de: "Passwort zurücksetzen",
      fr: "Réinitialiser votre mot de passe",
      it: "Reimposta la tua password",
    },
    body: {
      de: (name: string) =>
        `Hallo ${name}, Sie haben ein neues Passwort für Ihr GunMarket.ch-Konto angefordert. Klicken Sie auf den folgenden Button, um ein neues Passwort zu wählen.`,
      fr: (name: string) =>
        `Bonjour ${name}, vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton pour définir un nouveau mot de passe.`,
      it: (name: string) =>
        `Ciao ${name}, hai richiesto la reimpostazione della tua password. Clicca sul pulsante per impostare una nuova password.`,
    },
    cta: {
      de: "Neues Passwort wählen",
      fr: "Réinitialiser le mot de passe",
      it: "Reimposta la password",
    },
    expire: {
      de: "Dieser Link ist 1 Stunde gültig. Falls Sie kein neues Passwort angefordert haben, können Sie diese E-Mail ignorieren.",
      fr: "Ce lien est valable 1 heure. Si vous n'avez pas fait cette demande, ignorez cet e-mail.",
      it: "Questo link è valido per 1 ora. Se non hai effettuato questa richiesta, ignora questa email.",
    },
  },
  contactSeller: {
    subject: {
      de: (title: string) => `Neue Nachricht zu deinem Inserat: ${title}`,
      fr: (title: string) => `Nouveau message concernant votre annonce : ${title}`,
      it: (title: string) => `Nuovo messaggio per il tuo annuncio: ${title}`,
    },
    heading: {
      de: "Neue Nachricht",
      fr: "Nouveau message",
      it: "Nuovo messaggio",
    },
    body: {
      de: (buyerName: string, listingTitle: string, message: string) =>
        `${buyerName} hat eine Nachricht zu deinem Inserat <strong>${listingTitle}</strong> gesendet:<br><br><em>&laquo;${message}&raquo;</em>`,
      fr: (buyerName: string, listingTitle: string, message: string) =>
        `${buyerName} a envoyé un message concernant votre annonce <strong>${listingTitle}</strong> :<br><br><em>&laquo; ${message} &raquo;</em>`,
      it: (buyerName: string, listingTitle: string, message: string) =>
        `${buyerName} ha inviato un messaggio per il tuo annuncio <strong>${listingTitle}</strong>:<br><br><em>&laquo;${message}&raquo;</em>`,
    },
    cta: {
      de: "Inserat ansehen",
      fr: "Voir l'annonce",
      it: "Vedi l'annuncio",
    },
  },
  listingApproved: {
    subject: {
      de: (title: string) => `Dein Inserat ist jetzt live: ${title}`,
      fr: (title: string) => `Votre annonce est maintenant en ligne : ${title}`,
      it: (title: string) => `Il tuo annuncio è ora attivo: ${title}`,
    },
    heading: {
      de: "Inserat aktiviert",
      fr: "Annonce activée",
      it: "Annuncio attivato",
    },
    body: {
      de: (title: string) =>
        `Dein Inserat <strong>${title}</strong> ist jetzt auf GunMarket sichtbar.`,
      fr: (title: string) =>
        `Votre annonce <strong>${title}</strong> est maintenant visible sur GunMarket.`,
      it: (title: string) =>
        `Il tuo annuncio <strong>${title}</strong> è ora visibile su GunMarket.`,
    },
    cta: {
      de: "Inserat ansehen",
      fr: "Voir l'annonce",
      it: "Vedi l'annuncio",
    },
  },
  contact: {
    subject: {
      de: (name: string) => `Neue Kontaktanfrage von ${name}`,
      fr: (name: string) => `Nouvelle demande de contact de ${name}`,
      it: (name: string) => `Nuova richiesta di contatto da ${name}`,
    },
    heading: {
      de: "Neue Kontaktanfrage",
      fr: "Nouvelle demande de contact",
      it: "Nuova richiesta di contatto",
    },
  },
};

// ─── HTML-Template ────────────────────────────────────────────────────────────

function emailTemplate(
  heading: string,
  body: string,
  ctaText?: string,
  ctaUrl?: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
          <td style="background:#1a1a2e;padding:24px 40px;">
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">GunMarket<span style="color:#4ade80;">.ch</span></span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#1a1a2e;">${heading}</h1>
            <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#4b5563;">${body}</p>
            ${
              ctaText && ctaUrl
                ? `<a href="${ctaUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:15px;font-weight:600;">${ctaText}</a>`
                : ""
            }
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:13px;color:#9ca3af;">GunMarket.ch &mdash; Der Schweizer Marktplatz<br>
            <a href="https://gunmarket.ch" style="color:#6b7280;">gunmarket.ch</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── E-Mail Funktionen ────────────────────────────────────────────────────────

export async function sendVerificationEmail(
  email: string,
  token: string,
  vorname: string,
  locale: Locale = "de"
) {
  const verifyUrl = `${BASE_URL}/api/auth/verify?token=${token}`;

  return getResend().emails.send({
    from: FROM,
    to: email,
    subject: t.verify.subject[locale],
    html: emailTemplate(
      t.verify.heading[locale](vorname),
      `${t.verify.body[locale]}<br><br><small style="color:#9ca3af;">${t.verify.fallback[locale]}<br><a href="${verifyUrl}" style="color:#16a34a;word-break:break-all;">${verifyUrl}</a></small><br><br><small style="color:#9ca3af;">${t.verify.expire[locale]}</small>`,
      t.verify.cta[locale],
      verifyUrl
    ),
  });
}

export async function sendWelcomeEmail(
  to: string,
  name: string,
  locale: Locale = "de"
) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: t.welcome.subject[locale],
    html: emailTemplate(
      t.welcome.heading[locale],
      t.welcome.body[locale](name),
      t.welcome.cta[locale],
      `${BASE_URL}/suche`
    ),
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  vorname: string,
  locale: Locale = "de"
) {
  const resetUrl = `${BASE_URL}/passwort-reset?token=${token}`;

  return getResend().emails.send({
    from: FROM,
    to: email,
    subject: t.passwordReset.subject[locale],
    html: emailTemplate(
      t.passwordReset.heading[locale],
      `${t.passwordReset.body[locale](vorname)}<br><br><small style="color:#9ca3af;">${t.passwordReset.expire[locale]}</small>`,
      t.passwordReset.cta[locale],
      resetUrl
    ),
  });
}

export async function sendContactSellerEmail(
  to: string,
  buyerName: string,
  listingTitle: string,
  listingId: string,
  message: string,
  locale: Locale = "de"
) {
  const listingUrl = `${BASE_URL}/inserat/${listingId}`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: t.contactSeller.subject[locale](listingTitle),
    html: emailTemplate(
      t.contactSeller.heading[locale],
      t.contactSeller.body[locale](buyerName, listingTitle, message),
      t.contactSeller.cta[locale],
      listingUrl
    ),
  });
}

export async function sendListingApprovedEmail(
  to: string,
  listingTitle: string,
  listingId: string,
  locale: Locale = "de"
) {
  const listingUrl = `${BASE_URL}/inserat/${listingId}`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: t.listingApproved.subject[locale](listingTitle),
    html: emailTemplate(
      t.listingApproved.heading[locale],
      t.listingApproved.body[locale](listingTitle),
      t.listingApproved.cta[locale],
      listingUrl
    ),
  });
}

export async function sendContactFormEmail(
  name: string,
  email: string,
  messageText: string,
  locale: Locale = "de"
) {
  return getResend().emails.send({
    from: FROM,
    to: "info@gunmarket.ch",
    replyTo: email,
    subject: t.contact.subject[locale](name),
    html: emailTemplate(
      t.contact.heading[locale],
      `<strong>${name}</strong> (${email}):<br><br>${messageText}`
    ),
  });
}
