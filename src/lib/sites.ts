/**
 * Where each site in the Staunch ecosystem lives. Set per environment in
 * next.config.ts: absolute production hosts on production, same-deployment
 * paths on previews and localhost.
 */
export const CAPITAL_URL = process.env.NEXT_PUBLIC_CAPITAL_URL ?? "/capital";
const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? "";

/** A path on the main Staunch site, safe to use from the Capital subdomain. */
export const mainUrl = (path = "/") => `${MAIN_URL}${path}`;
