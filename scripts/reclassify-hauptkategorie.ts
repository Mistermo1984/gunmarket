import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Maps raw/incorrect hauptkategorie values to our canonical categories
const HAUPTKATEGORIE_FIX: Record<string, string> = {
  verschiedenes: 'zubehoer',
  wiederladen: 'zubehoer',
  messer: 'zubehoer',
  jagd: 'zubehoer',
  luftdruck: 'luftdruckwaffen',
};

// Title-based reclassification for weapons hiding in zubehoer/andere
const WEAPON_PATTERNS: { pattern: RegExp; hauptkategorie: string; unterkategorie: string }[] = [
  // Ordonnanz
  { pattern: /\b(k31|k11|mousqueton\s?31|stgw\s?57|stgw\s?90|ordonnanz|sig\s?510|sig\s?550)\b/i, hauptkategorie: 'ordonnanzwaffen', unterkategorie: 'langwaffen-ordonnanz' },
  // Kurzwaffen
  { pattern: /\b(pistol[et]?|glock|sig\s?p\d|walther\s?(pp|p\d)|beretta\s?(px|apx|92|m9)|cz\s?\d|hk\s?(p|sfp|usp|vp)|browning\s?hp|p226|p220|p210|fnx|fn\s?five|canik|springfield|kimber|1911|smith\s?&?\s?wesson|s&w)\b/i, hauptkategorie: 'kurzwaffen', unterkategorie: 'pistolen' },
  { pattern: /\b(revolver|taurus|colt\s?(python|anaconda|cobra))\b/i, hauptkategorie: 'kurzwaffen', unterkategorie: 'revolver' },
  // Langwaffen - buechsen
  { pattern: /\b(büchse|buechse|karabiner|gewehr|rifle|fusil|carabine|carbine|halbautomat|repetierer|mauser|sauer\s?\d|blaser|merkel|tikka|sako|remington\s?\d|winchester|savage|ruger\s?(precision|american|ranch|mini)|haenel|oberland|desert\s?tech|sig\s?(55[016]|mcx|516|56\d|sauer)|mr223|ar[\s-]?15|hk\s?(mr|sl|g)|benelli\s?mr|cz\s?(557|600|bren)|steyr|zastava|vetterli|mousqueton|arme\s+d.{0,2}[ée]paule)\b/i, hauptkategorie: 'langwaffen', unterkategorie: 'buechsen' },
  // Langwaffen - flinten
  { pattern: /\b(flinte|schrotflinte|shotgun|drilling|bockflinte|doppelflinte|beretta\s?(686|69[0-9]|dt|sv|a[34]00)|browning\s?(b[25]|maxus|a5|cynergy)|benelli\s?(m[1-4]|super|ethos|vinci)|franchi|remington\s?8[78]|mossberg|pump\s?action)\b/i, hauptkategorie: 'langwaffen', unterkategorie: 'flinten' },
];

async function main() {
  const db = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });

  console.log('=== PHASE 1: Fix raw hauptkategorie values ===');
  let totalFixed = 0;

  for (const [raw, correct] of Object.entries(HAUPTKATEGORIE_FIX)) {
    const result = await db.execute({
      sql: 'UPDATE listings SET hauptkategorie = ? WHERE hauptkategorie = ? AND status = ?',
      args: [correct, raw, 'aktiv'],
    });
    console.log(`  ${raw} → ${correct}: ${result.rowsAffected} rows`);
    totalFixed += result.rowsAffected;
  }
  console.log(`  Total phase 1: ${totalFixed} rows fixed\n`);

  console.log('=== PHASE 2: Reclassify weapons in zubehoer/andere* ===');
  // Get all zubehoer entries with catch-all unterkategorien
  const candidates = await db.execute({
    sql: 'SELECT id, titel, hauptkategorie, unterkategorie FROM listings WHERE status = ? AND hauptkategorie = ? AND unterkategorie IN (?, ?, ?)',
    args: ['aktiv', 'zubehoer', 'andere', 'andere-zubehoer', 'verschiedenes'],
  });

  console.log(`  Found ${candidates.rows.length} candidates`);
  let reclassified = 0;

  for (const row of candidates.rows) {
    const titel = String(row.titel || '');
    let matched = false;

    for (const rule of WEAPON_PATTERNS) {
      if (rule.pattern.test(titel)) {
        await db.execute({
          sql: 'UPDATE listings SET hauptkategorie = ?, unterkategorie = ? WHERE id = ?',
          args: [rule.hauptkategorie, rule.unterkategorie, row.id],
        });
        console.log(`  ✓ ${titel} → ${rule.hauptkategorie}/${rule.unterkategorie}`);
        reclassified++;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Keep as zubehoer but normalize unterkategorie
      if (row.unterkategorie === 'andere' || row.unterkategorie === 'verschiedenes') {
        await db.execute({
          sql: 'UPDATE listings SET unterkategorie = ? WHERE id = ?',
          args: ['andere-zubehoer', row.id],
        });
      }
    }
  }
  console.log(`  Total phase 2: ${reclassified} reclassified\n`);

  console.log('=== PHASE 3: Reclassify weapons in langwaffen/andere ===');
  // Some langwaffen/andere entries are actually accessories, not weapons
  // Keep them as langwaffen/andere-langwaffen for now (they're at least in the right hauptkategorie)

  console.log('=== PHASE 4: Fix unterkategorie for verschiedenes entries ===');
  // Entries that were fixed from verschiedenes → zubehoer still have old unterkategorie like "bekleidung_1"
  const badUnter = await db.execute({
    sql: "SELECT id, unterkategorie FROM listings WHERE status = ? AND hauptkategorie = ? AND unterkategorie NOT IN (?, ?, ?, ?, ?, ?)",
    args: ['aktiv', 'zubehoer', 'andere-zubehoer', 'magazine', 'holster', 'lauefe-teile', 'reinigung', ''],
  });
  let unterFixed = 0;
  for (const row of badUnter.rows) {
    await db.execute({
      sql: 'UPDATE listings SET unterkategorie = ? WHERE id = ?',
      args: ['andere-zubehoer', row.id],
    });
    unterFixed++;
  }
  console.log(`  Fixed ${unterFixed} non-standard unterkategorie values\n`);

  // Final counts
  console.log('=== FINAL COUNTS ===');
  const r = await db.execute({ sql: 'SELECT hauptkategorie, COUNT(*) as count FROM listings WHERE status = ? GROUP BY hauptkategorie ORDER BY count DESC', args: ['aktiv'] });
  console.table(r.rows);

  const lw = await db.execute({ sql: 'SELECT unterkategorie, COUNT(*) as count FROM listings WHERE hauptkategorie = ? AND status = ? GROUP BY unterkategorie ORDER BY count DESC', args: ['langwaffen', 'aktiv'] });
  console.log('\nLangwaffen breakdown:');
  console.table(lw.rows);

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
