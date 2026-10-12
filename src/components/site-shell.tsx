"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Decides which arm of Staunch the visitor is in and themes the whole site
 * for it. data-site goes on this wrapper (correct on the server-rendered
 * first paint) and on <html> (so portals such as the mobile menu sheet,
 * which render outside this tree, follow along).
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const site = pathname === "/capital" || pathname.startsWith("/capital/") ? "capital" : "ventures";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.site = site;
    // The investor and startup areas live outside this shell. Without this,
    // leaving /capital for them by client-side navigation would strand
    // data-site="capital" on <html> and theme the whole app gold.
    return () => {
      delete root.dataset.site;
    };
  }, [site]);

  return (
    <div data-site={site} className="site-shell flex min-h-screen flex-col">
      {children}
    </div>
  );
}
