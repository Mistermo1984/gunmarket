import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#111613"/>
  <!-- Top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="#22c55e"/>

  <!-- GM logo box -->
  <rect x="440" y="190" width="64" height="64" rx="12" fill="#22c55e"/>
  <text x="472" y="234" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="900" fill="white">GM</text>

  <!-- GunMarket text -->
  <text x="520" y="218" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="900" fill="white">
    GunMarket<tspan fill="#22c55e">.ch</tspan>
  </text>

  <!-- Tagline -->
  <text x="600" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#a3a3a3">Der Schweizer Waffenmarktplatz</text>

  <!-- Feature dots and text -->
  <circle cx="258" cy="400" r="5" fill="#22c55e"/>
  <text x="272" y="407" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#d4d4d4">Kostenlose Inserate</text>

  <circle cx="498" cy="400" r="5" fill="#22c55e"/>
  <text x="512" y="407" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#d4d4d4">Privat &amp; Händler</text>

  <circle cx="718" cy="400" r="5" fill="#22c55e"/>
  <text x="732" y="407" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#d4d4d4">Alle 26 Kantone</text>

  <!-- Bottom URL -->
  <text x="600" y="590" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#525252">gunmarket.ch</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("Generated public/og-image.png (1200x630)");
