import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const db = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });

  // Get all distinct source_url patterns for bad categories
  const badCats = await db.execute({ sql: 'SELECT source_url, COUNT(*) as count FROM listings WHERE status = ? AND hauptkategorie IN (?, ?, ?, ?, ?) GROUP BY source_url ORDER BY count DESC LIMIT 30', args: ['aktiv', 'verschiedenes', 'wiederladen', 'messer', 'luftdruck', 'jagd'] });
  console.log('=== Source URLs for unmapped hauptkategorien ===');
  for (const row of badCats.rows) {
    console.log(`  [${row.count}x] ${row.source_url}`);
  }

  // Check zubehoer/andere - what URL segments produce this?
  const andereUrls = await db.execute({ sql: 'SELECT source_url, COUNT(*) as count FROM listings WHERE status = ? AND hauptkategorie = ? AND unterkategorie = ? GROUP BY source_url ORDER BY count DESC LIMIT 20', args: ['aktiv', 'zubehoer', 'andere'] });
  console.log('\n=== Source URLs for zubehoer/andere ===');
  for (const row of andereUrls.rows) {
    console.log(`  [${row.count}x] ${row.source_url}`);
  }

  // nextgun.ch specific - what categories come from there?
  const ng = await db.execute({ sql: 'SELECT hauptkategorie, unterkategorie, COUNT(*) as count FROM listings WHERE status = ? AND source_url LIKE ? GROUP BY hauptkategorie, unterkategorie ORDER BY count DESC', args: ['aktiv', '%nextgun%'] });
  console.log('\n=== nextgun.ch category distribution ===');
  console.table(ng.rows);

  // Check what actual URL path segments exist for nextgun listings classified as zubehoer
  const ngZub = await db.execute({ sql: 'SELECT titel, source_url FROM listings WHERE status = ? AND source_url LIKE ? AND hauptkategorie = ? LIMIT 15', args: ['aktiv', '%nextgun%', 'zubehoer'] });
  console.log('\n=== nextgun.ch zubehoer samples ===');
  for (const row of ngZub.rows) {
    console.log(`  ${row.titel} | ${row.source_url}`);
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
