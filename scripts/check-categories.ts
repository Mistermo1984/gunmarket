import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const db = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });

  const r = await db.execute({ sql: 'SELECT hauptkategorie, COUNT(*) as count FROM listings WHERE status = ? GROUP BY hauptkategorie ORDER BY count DESC', args: ['aktiv'] });
  console.log('=== Hauptkategorie counts ===');
  console.table(r.rows);

  const lw = await db.execute({ sql: 'SELECT unterkategorie, COUNT(*) as count FROM listings WHERE hauptkategorie = ? AND status = ? GROUP BY unterkategorie ORDER BY count DESC', args: ['langwaffen', 'aktiv'] });
  console.log('\n=== Langwaffen breakdown ===');
  console.table(lw.rows);

  const misc = await db.execute({ sql: 'SELECT hauptkategorie, unterkategorie, COUNT(*) as count FROM listings WHERE status = ? AND (unterkategorie IN (?, ?, ?, ?) OR hauptkategorie IN (?, ?)) GROUP BY hauptkategorie, unterkategorie ORDER BY count DESC', args: ['aktiv', 'andere', 'verschiedenes', 'andere-zubehoer', 'andere-langwaffen', 'verschiedenes', 'andere'] });
  console.log('\n=== Catch-all entries ===');
  console.table(misc.rows);

  // Sample zubehoer/andere-zubehoer
  const samples = await db.execute({ sql: 'SELECT id, titel, source_url FROM listings WHERE status = ? AND hauptkategorie = ? AND unterkategorie = ? LIMIT 40', args: ['aktiv', 'zubehoer', 'andere-zubehoer'] });
  console.log('\n=== Sample zubehoer/andere-zubehoer titles ===');
  for (const row of samples.rows) {
    const url = row.source_url ? String(row.source_url).substring(0, 80) : 'no-url';
    console.log(`  ${row.titel} | ${url}`);
  }

  // Confidence distribution
  const conf = await db.execute({ sql: 'SELECT kategorie_confidence, hauptkategorie, COUNT(*) as count FROM listings WHERE status = ? GROUP BY kategorie_confidence, hauptkategorie ORDER BY kategorie_confidence, count DESC', args: ['aktiv'] });
  console.log('\n=== Confidence distribution ===');
  console.table(conf.rows);

  // Check fallback entries - what are they?
  const fallbacks = await db.execute({ sql: 'SELECT id, titel, hauptkategorie, unterkategorie, source_url FROM listings WHERE status = ? AND kategorie_confidence = ? LIMIT 20', args: ['aktiv', 'fallback'] });
  console.log('\n=== Fallback-classified titles ===');
  for (const row of fallbacks.rows) {
    console.log(`  [${row.hauptkategorie}/${row.unterkategorie}] ${row.titel} | ${row.source_url ? String(row.source_url).substring(0, 80) : ''}`);
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
