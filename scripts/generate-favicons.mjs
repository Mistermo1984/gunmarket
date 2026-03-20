import sharp from "sharp";

const logoSvg = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="${size * 0.18}" fill="#22c55e"/>
  <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size * 0.5}" font-weight="900" fill="white">GM</text>
</svg>`;

// favicon.ico (32x32 PNG — browsers accept PNG favicons)
await sharp(Buffer.from(logoSvg(32))).png().toFile("public/favicon.ico");
console.log("Generated public/favicon.ico (32x32)");

// apple-touch-icon (180x180)
await sharp(Buffer.from(logoSvg(180))).png().toFile("public/apple-touch-icon.png");
console.log("Generated public/apple-touch-icon.png (180x180)");
