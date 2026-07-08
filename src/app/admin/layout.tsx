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
      <header className="sticky top-0 z-50 divider-fade-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-9xl flex h-14 items-center justify-between px-4 lg:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={110} height={28} />
            <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Internal
            </span>
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-9xl px-4 lg:px-8 py-10">{children}</main>
    </div>
  );
}
