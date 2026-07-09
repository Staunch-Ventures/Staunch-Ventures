import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deal Flow | Staunch Ventures",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* App backdrop — the body paints opaque navy (no aurora on /admin);
          this adds just the brand linework, barely-there. The tool should
          feel quieter than the site. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linework opacity-[0.06]" />
        <div className="absolute inset-0 bg-grain opacity-[0.03] mix-blend-overlay" />
      </div>

      <header className="sticky top-0 z-50 border-b border-primary/25 bg-primary/15 backdrop-blur-lg overflow-hidden">
        {/* The brand accent: the whole bar, translucent ember — not a corner glow. */}
        <div className="pointer-events-none absolute inset-0 bg-linework opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto max-w-9xl flex h-12 items-center gap-3 px-4 lg:px-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={96} height={24} />
            <span className="h-4 w-px bg-border" aria-hidden />
            <span className="text-[13px] font-semibold tracking-tight text-foreground">Deal Flow</span>
          </Link>
          <span className="rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Internal
          </span>
          <form action="/api/admin/logout" method="post" className="ml-auto">
            <button
              type="submit"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-9xl px-4 lg:px-8 py-6">{children}</main>
    </div>
  );
}
