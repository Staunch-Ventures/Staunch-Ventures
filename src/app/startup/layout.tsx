import { StartupSidebar } from "@/components/startup/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardDisclaimer } from "@/components/ui/dashboard-disclaimer";

export default function StartupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const disclaimerDescription = (
    <>
      <p>
        Please note: The data and features in this dashboard are for demonstration purposes only. This is a preview of how you will be able to track key metrics, manage your company profile, and send updates to investors.
      </p>
    </>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <DashboardDisclaimer title="Welcome to the Startup Dashboard Demo" description={disclaimerDescription} />
        <StartupSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/50 backdrop-blur-xl sticky top-0 z-[70]">
            <SidebarTrigger className="-ml-1" />
            <div className="font-semibold text-lg">Startup Dashboard</div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
