import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
