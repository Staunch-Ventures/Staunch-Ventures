import { AuroraBackground } from "@/components/ui/aurora-background";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteShell } from "@/components/site-shell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <AuroraBackground />
      <MainNav />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </SiteShell>
  );
}
