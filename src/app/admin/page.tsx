import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSql } from "@/lib/db";
import { SECTORS, STAGES } from "@/lib/intake";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type StartupRow = {
  id: string;
  created_at: string;
  company_name: string;
  founder_name: string;
  hq_country: string;
  africa_hq: boolean;
  africa_customers: boolean;
  africa_expansion: boolean;
  sectors: string[];
  stage: string;
  raise_amount: string | null;
  status: string;
};

type InvestorRow = {
  id: string;
  created_at: string;
  name: string;
  firm: string | null;
  email: string;
  investor_type: string;
  ticket_size: string | null;
  sectors: string[];
  status: string;
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

function StatusBadge({ status }: { status: string }) {
  return status === "new" ? (
    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">New</Badge>
  ) : (
    <Badge variant="secondary" className="bg-muted/60 text-muted-foreground">Reviewed</Badge>
  );
}

function africaSummary(r: StartupRow): string {
  const parts = [];
  if (r.africa_hq) parts.push("HQ");
  if (r.africa_customers) parts.push("Customers");
  if (r.africa_expansion) parts.push("Expanding");
  return parts.length ? parts.join(" · ") : "—";
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const tab = params.tab === "investors" ? "investors" : "startups";
  const sector = typeof params.sector === "string" ? params.sector : "";
  const stage = typeof params.stage === "string" ? params.stage : "";
  const africaOnly = params.africa === "1";

  const sql = getSql();
  const [startups, investors] = (await Promise.all([
    sql`SELECT id, created_at, company_name, founder_name, hq_country,
               africa_hq, africa_customers, africa_expansion,
               sectors, stage, raise_amount, status
        FROM startup_applications ORDER BY created_at DESC LIMIT 500`,
    sql`SELECT id, created_at, name, firm, email, investor_type, ticket_size, sectors, status
        FROM investor_inquiries ORDER BY created_at DESC LIMIT 500`,
  ])) as [StartupRow[], InvestorRow[]];

  const filteredStartups = startups.filter((r) => {
    if (sector && !r.sectors.includes(sector)) return false;
    if (stage && r.stage !== stage) return false;
    if (africaOnly && !(r.africa_hq || r.africa_customers || r.africa_expansion)) return false;
    return true;
  });
  const filteredInvestors = investors.filter((r) => !sector || r.sectors.includes(sector));

  const tabLink = (t: string) => `/admin?tab=${t}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Deal flow</p>
          <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">
            {tab === "startups" ? "Startup applications" : "Investor interest"}
          </h1>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
          {[
            { key: "startups", label: `Startups (${startups.length})` },
            { key: "investors", label: `Investors (${investors.length})` },
          ].map((t) => (
            <Link
              key={t.key}
              href={tabLink(t.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                tab === t.key ? "bg-muted text-foreground border border-border-strong" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Filters — plain GET form so the page stays a server component */}
      <form method="get" className="flex flex-wrap items-center gap-3">
        <input type="hidden" name="tab" value={tab} />
        <select
          name="sector"
          defaultValue={sector}
          className="h-9 rounded-full border border-border bg-card/60 px-4 text-sm text-foreground"
        >
          <option value="">All sectors</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {tab === "startups" && (
          <>
            <select
              name="stage"
              defaultValue={stage}
              className="h-9 rounded-full border border-border bg-card/60 px-4 text-sm text-foreground"
            >
              <option value="">All stages</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" name="africa" value="1" defaultChecked={africaOnly} className="accent-[hsl(16_90%_56%)]" />
              African nexus only
            </label>
          </>
        )}
        <button type="submit" className="h-9 rounded-full border border-border bg-muted px-4 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors">
          Apply
        </button>
        {(sector || stage || africaOnly) && (
          <Link href={tabLink(tab)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Clear
          </Link>
        )}
      </form>

      {tab === "startups" ? (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Sectors</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Africa</th>
                <th className="px-4 py-3 font-medium">Raise</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStartups.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No applications{sector || stage || africaOnly ? " match these filters" : " yet"}.
                  </td>
                </tr>
              )}
              {filteredStartups.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/s/${r.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {r.company_name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{r.founder_name} · {r.hq_country}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.sectors.map((s) => (
                        <span key={s} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.stage}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{africaSummary(r)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.raise_amount || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{dateFmt.format(new Date(r.created_at))}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Investor</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Sectors</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No investor inquiries{sector ? " match this filter" : " yet"}.
                  </td>
                </tr>
              )}
              {filteredInvestors.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/i/${r.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {r.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{r.firm || r.email}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.investor_type}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.ticket_size || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.sectors.map((s) => (
                        <span key={s} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{dateFmt.format(new Date(r.created_at))}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
