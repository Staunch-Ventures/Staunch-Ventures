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
      <div className="flex min-h-screen w-full bg-muted/40">
        <DashboardDisclaimer title="Welcome to the Investor Dashboard Demo" description={disclaimerDescription} />
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/50 backdrop-blur-xl sticky top-0 z-[70]">
            <SidebarTrigger className="-ml-1" />
            <div className="font-semibold text-lg">Investor Dashboard</div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
