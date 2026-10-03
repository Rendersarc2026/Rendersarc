import { Pool } from 'pg';

/**
 * Shared Postgres pool (Supabase transaction pooler). Kept on globalThis so
 * dev-server hot reloads reuse it instead of opening a new pool each time.
 */
const globalForDb = globalThis as unknown as { pgPool?: Pool };

// Without it pg silently falls back to localhost:5432, which fails the build
// with a bare ECONNREFUSED.
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not set. Add it (with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_BUCKET) to .env.local, or to the Vercel project for deploys.',
  );
}

export const db =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pgPool = db;
