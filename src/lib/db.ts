import { createClient, Client, InStatement, Row } from "@libsql/client";

let client: Client;
let usingLocal = false;

function createTursoClient(): Client {
  const remoteUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (remoteUrl && authToken) {
    return createClient({ url: remoteUrl, authToken });
  }
  return createClient({ url: "file:gunmarket.db" });
}

function createLocalClient(): Client {
  usingLocal = true;
  return createClient({ url: "file:gunmarket.db" });
}

export function getClient(): Client {
  if (!client) {
    client = usingLocal ? createLocalClient() : createTursoClient();
  }
  return client;
}

/** Switch to local SQLite if Turso is blocked */
function fallbackToLocal(): Client {
  if (usingLocal) throw new Error("Local DB also failed");
  console.warn("[db] Turso blocked — falling back to local gunmarket.db");
  client = createLocalClient();
  return client;
}

/** Convert a libsql Row to a plain JS object (strips numeric index keys) */
function toPlain(row: Row): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    if (!/^\d+$/.test(key)) {
      obj[key] = value;
    }
  }
  return obj;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isBlocked(err: any): boolean {
  return err?.code === "BLOCKED" || String(err?.message || "").includes("BLOCKED");
}

async function execute(sql: string, args: (string | number | null | undefined)[]) {
  const sanitized = args.map((a) => a ?? null);
  try {
    return await getClient().execute({ sql, args: sanitized });
  } catch (err) {
    if (isBlocked(err) && !usingLocal) {
      return await fallbackToLocal().execute({ sql, args: sanitized });
    }
    throw err;
  }
}

export async function dbGet<T = Record<string, unknown>>(
  sql: string,
  args: (string | number | null | undefined)[] = []
): Promise<T | undefined> {
  const result = await execute(sql, args);
  if (result.rows.length === 0) return undefined;
  return toPlain(result.rows[0]) as T;
}

export async function dbAll<T = Record<string, unknown>>(
  sql: string,
  args: (string | number | null | undefined)[] = []
): Promise<T[]> {
  const result = await execute(sql, args);
  return result.rows.map((r) => toPlain(r)) as T[];
}

export async function dbRun(
  sql: string,
  args: (string | number | null | undefined)[] = []
): Promise<{ changes: number }> {
  const result = await execute(sql, args);
  return { changes: result.rowsAffected };
}

export async function dbBatch(statements: InStatement[]): Promise<void> {
  if (statements.length === 0) return;
  const CHUNK_SIZE = 500;
  try {
    const db = getClient();
    for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
      await db.batch(statements.slice(i, i + CHUNK_SIZE), "write");
    }
  } catch (err) {
    if (isBlocked(err) && !usingLocal) {
      const db = fallbackToLocal();
      for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
        await db.batch(statements.slice(i, i + CHUNK_SIZE), "write");
      }
      return;
    }
    throw err;
  }
}

export async function dbExec(sql: string): Promise<void> {
  try {
    await getClient().executeMultiple(sql);
  } catch (err) {
    if (isBlocked(err) && !usingLocal) {
      await fallbackToLocal().executeMultiple(sql);
      return;
    }
    throw err;
  }
}

let schemaInitialized = false;

export async function initializeSchema(): Promise<void> {
  if (schemaInitialized) return;
  schemaInitialized = true;

  await dbExec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      vorname TEXT NOT NULL,
      nachname TEXT NOT NULL,
      anbieter_typ TEXT NOT NULL DEFAULT 'Privat',
      telefon TEXT,
      kanton TEXT,
      ueber_mich TEXT,
      firmenname TEXT,
      uid_nummer TEXT,
      bewilligungs_nr TEXT,
      website TEXT,
      email_verified INTEGER DEFAULT 0,
      is_admin INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      titel TEXT NOT NULL,
      beschreibung TEXT NOT NULL,
      hauptkategorie TEXT NOT NULL,
      unterkategorie TEXT NOT NULL,
      rechtsstatus TEXT NOT NULL,
      marke TEXT,
      modell TEXT,
      kaliber TEXT,
      zustand TEXT NOT NULL,
      baujahr TEXT,
      lauflaenge TEXT,
      magazin TEXT,
      preis REAL NOT NULL,
      verhandelbar INTEGER DEFAULT 0,
      tausch INTEGER DEFAULT 0,
      kanton TEXT NOT NULL,
      ortschaft TEXT NOT NULL,
      plz TEXT,
      lat REAL,
      lng REAL,
      status TEXT DEFAULT 'aktiv',
      aufrufe INTEGER DEFAULT 0,
      source TEXT DEFAULT 'gunmarket',
      source_url TEXT,
      source_id TEXT,
      price_updated_at TEXT,
      images_updated_at TEXT,
      last_seen_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS listing_images (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      url TEXT NOT NULL,
      position INTEGER DEFAULT 0,
      is_main INTEGER DEFAULT 0,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      UNIQUE(user_id, listing_id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      sender_id TEXT NOT NULL,
      receiver_id TEXT NOT NULL,
      listing_id TEXT,
      content TEXT NOT NULL,
      read_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS email_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id TEXT NOT NULL,
      reason TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_email_tokens_token ON email_tokens(token);
    CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
    CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
    CREATE INDEX IF NOT EXISTS idx_listings_kategorie ON listings(hauptkategorie);
    CREATE INDEX IF NOT EXISTS idx_listings_kanton ON listings(kanton);
    CREATE INDEX IF NOT EXISTS idx_listings_lat_lng ON listings(lat, lng);
    CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
    CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
    CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
    CREATE INDEX IF NOT EXISTS idx_listings_source_id ON listings(source_id);

    CREATE TABLE IF NOT EXISTS good_deal_votes (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      user_id TEXT,
      fingerprint TEXT NOT NULL,
      ip_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      UNIQUE(listing_id, fingerprint)
    );

    CREATE TABLE IF NOT EXISTS listing_price_history (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      preis REAL NOT NULL,
      recorded_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS crawler_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      status TEXT DEFAULT 'idle',
      started_at TEXT,
      stopped_at TEXT,
      stop_requested INTEGER DEFAULT 0,
      current_source TEXT,
      current_category TEXT,
      processed_count INTEGER DEFAULT 0,
      created_count INTEGER DEFAULT 0,
      updated_count INTEGER DEFAULT 0,
      unchanged_count INTEGER DEFAULT 0
    );
    INSERT OR IGNORE INTO crawler_state (id) VALUES (1);
  `);

  // Add columns to listings (SQLite lacks IF NOT EXISTS for ALTER TABLE)
  try { await dbRun("ALTER TABLE listings ADD COLUMN good_deal_count INTEGER DEFAULT 0"); } catch {}
  try { await dbRun("ALTER TABLE listings ADD COLUMN price_change_pct REAL DEFAULT 0"); } catch {}
}
