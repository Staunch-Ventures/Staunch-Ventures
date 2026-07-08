import { neon } from "@neondatabase/serverless";

/**
 * Neon serverless client (HTTP driver — no pools to manage, works in
 * serverless functions). `sql` is a tagged template: sql`SELECT ... ${param}`
 * with automatic parameterisation.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}
