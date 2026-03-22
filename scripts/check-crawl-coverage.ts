import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const db = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });

  // Check crawler state
  const state = await db.execute('SELECT * FROM crawler_state WHERE id = 1');
  console.log('=== Crawler state ===');
  console.table(state.rows);

  // Check crawl meta for last crawl timestamp
  try {
    const meta = await db.execute("SELECT * FROM crawl_meta");
    console.log('\n=== Crawl meta ===');
    for (const row of meta.rows) {
      if (String(row.key) === 'live_source_ids') {
        const ids = JSON.parse(String(row.value));
        console.log(`  live_source_ids: ${ids.length} IDs`);
      } else {
        console.log(`  ${row.key}: ${row.value}`);
      }
    }
  } catch { console.log('  (no crawl_meta table)'); }

  // Check source breakdown
  const sources = await db.execute({ sql: 'SELECT source, hauptkategorie, COUNT(*) as count FROM listings WHERE status = ? GROUP BY source, hauptkategorie ORDER BY source, count DESC', args: ['aktiv'] });
  console.log('\n=== Source × hauptkategorie ===');
  console.table(sources.rows);

  // Check how many listings we have per source
  const bySource = await db.execute({ sql: 'SELECT source, COUNT(*) as total, SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as active, SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as inactive FROM listings GROUP BY source', args: ['aktiv', 'inaktiv'] });
  console.log('\n=== Total per source (active vs inactive) ===');
  console.table(bySource.rows);

  // Check when listings were last seen
  const lastSeen = await db.execute({ sql: "SELECT source, MIN(last_seen_at) as oldest, MAX(last_seen_at) as newest, COUNT(*) as count FROM listings WHERE source IN (?, ?) AND status = ? GROUP BY source", args: ['gebrauchtwaffen', 'nextgun', 'aktiv'] });
  console.log('\n=== Last seen dates ===');
  console.table(lastSeen.rows);

  // Check created_at distribution to see if crawl stopped mid-way
  const recentCreated = await db.execute({ sql: "SELECT DATE(created_at) as day, source, COUNT(*) as count FROM listings WHERE source IN (?, ?) GROUP BY day, source ORDER BY day DESC LIMIT 20", args: ['gebrauchtwaffen', 'nextgun'] });
  console.log('\n=== Recent crawl activity (created_at) ===');
  console.table(recentCreated.rows);

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
