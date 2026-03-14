import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "gunmarket.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initializeSchema(db);
  }
  return db;
}

function initializeSchema(db: Database.Database) {
  db.exec(`
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

    CREATE INDEX IF NOT EXISTS idx_email_tokens_token ON email_tokens(token);
    CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
    CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
    CREATE INDEX IF NOT EXISTS idx_listings_kategorie ON listings(hauptkategorie);
    CREATE INDEX IF NOT EXISTS idx_listings_kanton ON listings(kanton);
    CREATE INDEX IF NOT EXISTS idx_listings_lat_lng ON listings(lat, lng);
    CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
    CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
    CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
  `);
}
