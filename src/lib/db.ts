import { neon } from "@neondatabase/serverless";

/**
 * Neon serverless client (HTTP driver — no pools to manage, works in
 * serverless functions). `sql` is a tagged template: sql`SELECT ... ${param}`
 * with automatic parameterisation.
 *
 * Nothing on the startup-pitch path uses this any more — pitches go straight
 * to the Notion Venture Pipeline. The Neon project itself has been shut down,
 * so `DATABASE_URL` is unset in every environment and the remaining callers
 * (`/invest` and the `/admin` dashboard) are dormant: their UI is kept intact
 * so it can be picked up again later, and each one checks
 * `isDatabaseConfigured()` first so it degrades to an "archived" state instead
 * of throwing. Point `DATABASE_URL` at a new Postgres and they come back to
 * life unchanged.
 */

/** True when a database is wired up. Dormant features check this first. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}
