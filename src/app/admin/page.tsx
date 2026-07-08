import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSql } from "@/lib/db";
import { DealBoard, type StartupCard, type InvestorCard } from "@/components/admin/deal-board";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const tab = params.tab === "investors" ? "investors" : "startups";

  const sql = getSql();
  const [startupRows, investorRows] = await Promise.all([
    sql`SELECT id, created_at, status_changed_at, company_name, founder_name, hq_country,
               africa_hq, africa_customers, africa_expansion,
               sectors, stage, raise_amount, status
        FROM startup_applications ORDER BY created_at DESC LIMIT 500`,
    sql`SELECT id, created_at, status_changed_at, name, firm, investor_type, location, sectors, status
        FROM investor_inquiries ORDER BY created_at DESC LIMIT 500`,
  ]);

  const startups: StartupCard[] = startupRows.map((r) => ({
    id: String(r.id),
    createdAt: String(r.created_at),
    statusChangedAt: String(r.status_changed_at),
    companyName: String(r.company_name),
    founderName: String(r.founder_name),
    hqCountry: String(r.hq_country),
    africaHq: Boolean(r.africa_hq),
    africaCustomers: Boolean(r.africa_customers),
    africaExpansion: Boolean(r.africa_expansion),
    sectors: (r.sectors as string[]) ?? [],
    stage: String(r.stage),
    raiseAmount: r.raise_amount ? String(r.raise_amount) : null,
    status: String(r.status),
  }));

  const investors: InvestorCard[] = investorRows.map((r) => ({
    id: String(r.id),
    createdAt: String(r.created_at),
    statusChangedAt: String(r.status_changed_at),
    name: String(r.name),
    firm: r.firm ? String(r.firm) : null,
    investorType: String(r.investor_type),
    location: r.location ? String(r.location) : null,
    sectors: (r.sectors as string[]) ?? [],
    status: String(r.status),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Deal flow</p>
          <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">
            {tab === "startups" ? "Startup pipeline" : "Investor pipeline"}
          </h1>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
          {[
            { key: "startups", label: `Startups (${startups.length})` },
            { key: "investors", label: `Investors (${investors.length})` },
          ].map((t) => (
            <Link
              key={t.key}
              href={`/admin?tab=${t.key}`}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                tab === t.key
                  ? "bg-muted text-foreground border border-border-strong"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      <DealBoard kind={tab} startups={startups} investors={investors} />
    </div>
  );
}
