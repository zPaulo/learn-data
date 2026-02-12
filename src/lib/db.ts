import { createClient } from '@libsql/client';

function getDbClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error('TURSO_DATABASE_URL e TURSO_AUTH_TOKEN devem estar configurados no .env.local');
  }

  return createClient({ url, authToken });
}

let db: ReturnType<typeof createClient> | null = null;

export function getDb() {
  if (!db) {
    db = getDbClient();
  }
  return db;
}

export async function initDb() {
  const client = getDb();

  await client.batch([
    {
      sql: `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL UNIQUE,
        completed_skills TEXT NOT NULL DEFAULT '[]',
        completed_projects TEXT NOT NULL DEFAULT '[]',
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,
      args: [],
    },
  ]);
}
