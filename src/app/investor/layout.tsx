import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardDisclaimer } from "@/components/ui/dashboard-disclaimer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const disclaimerDescription = (
    <>
      <p>
        Please note: The data presented in this dashboard is for illustrative purposes only and is not real.
      </p>
      <p>
        We offer our investors real-time updates on Net Asset Value Growth, the work we have been doing with different startups, a startup screener where you can find potential investment opportunities etc.
      </p>
    </>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[radial-gradient(130%_90%_at_50%_-10%,hsl(224_38%_12%)_0%,hsl(var(--navy))_55%,hsl(var(--navy-deep))_100%)]">
        <DashboardDisclaimer title="Welcome to the Investor Dashboard Demo" description={disclaimerDescription} />
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 bg-background/70 backdrop-blur-xl sticky top-0 z-[70]">
            <SidebarTrigger className="-ml-1 md:hidden" />
            <div className="text-sm font-medium text-muted-foreground">
              Investor Dashboard
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
