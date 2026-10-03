import { Pool } from 'pg';

/**
 * Shared Postgres pool (Supabase transaction pooler). Kept on globalThis so
 * dev-server hot reloads reuse it instead of opening a new pool each time.
 */
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export const db =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pgPool = db;
