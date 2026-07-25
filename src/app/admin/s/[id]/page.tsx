import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, Paperclip, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSql, isDatabaseConfigured } from "@/lib/db";
import { STARTUP_STATUSES, STARTUP_REJECTED } from "@/lib/intake";
import { updateStartupStatusForm } from "@/app/admin/actions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Vercel Blob serves ?download=1 with Content-Disposition: attachment. */
function downloadUrl(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}download=1`;
}

/** Pipeline control: one form per stage, current stage highlighted. Rejected
 *  sits apart — it removes the deal from the board into the rejected list. */
function StatusPills({ id, current }: { id: string; current: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {STARTUP_STATUSES.map((s) => (
        <form key={s.value} action={updateStartupStatusForm}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value={s.value} />
          <button
            type="submit"
            disabled={s.value === current}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              s.value === current
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-border-strong"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
            {s.label}
          </button>
        </form>
      ))}
      <span className="mx-1 h-4 w-px bg-border" aria-hidden />
      <form action={updateStartupStatusForm}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="status" value={STARTUP_REJECTED.value} />
        <button
          type="submit"
          disabled={current === STARTUP_REJECTED.value}
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            current === STARTUP_REJECTED.value
              ? "border-destructive/50 bg-destructive/15 text-destructive-foreground"
              : "border-border bg-card/60 text-muted-foreground hover:text-destructive-foreground hover:border-destructive/50 hover:bg-destructive/10"
          )}
        >
          {STARTUP_REJECTED.label}
        </button>
      </form>
    </div>
  );
}

export default async function StartupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Dormant without a database — /admin explains why; a deal detail can't.
  if (!isDatabaseConfigured()) notFound();

  const sql = getSql();
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await sql`SELECT * FROM startup_applications WHERE id = ${id}::uuid`;
  } catch {
    notFound();
  }
  if (rows.length === 0) notFound();
  const r = rows[0] as {
    id: string;
    created_at: string;
    company_name: string;
    website: string | null;
    founder_name: string;
    email: string;
    linkedin: string | null;
    hq_country: string;
    africa_hq: boolean;
    africa_customers: boolean;
    africa_expansion: boolean;
    sectors: string[];
    stage: string;
    raise_amount: string | null;
    traction: string | null;
    team_description: string;
    founder_message: string;
    deck_url: string;
    deck_filename: string | null;
    supporting_docs: { url: string; filename: string }[];
    status: string;
  };

  const africaFacts = [
    r.africa_hq && "Headquartered in Africa",
    r.africa_customers && "Active customers in Africa",
    r.africa_expansion && "Planning African expansion",
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="pl-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Pipeline
          </Link>
        </Button>
        <StatusPills id={r.id} current={r.status} />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">{r.company_name}</h1>
        </div>
        <p className="text-muted-foreground">
          {r.founder_name} · {r.email}
          {r.website && (
            <>
              {" · "}
              <a href={r.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-0.5">
                {r.website.replace(/^https?:\/\//, "")}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Submitted {dateFmt.format(new Date(r.created_at))}</p>
      </div>

      <Card className="p-6 md:p-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Stage</p>
            <p className="font-medium">{r.stage}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">HQ</p>
            <p className="font-medium">{r.hq_country}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Raise</p>
            <p className="font-medium">{r.raise_amount || "—"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">LinkedIn</p>
            {r.linkedin ? (
              <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                Profile
              </a>
            ) : (
              <p className="font-medium">—</p>
            )}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Sectors</p>
            <div className="flex flex-wrap gap-1.5">
              {r.sectors.map((s) => (
                <span key={s} className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[11px] font-medium text-primary">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">African nexus</p>
            {africaFacts.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {africaFacts.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">None stated</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 md:p-8 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Message from the founder</p>
          <p className="text-pretty leading-relaxed">{r.founder_message}</p>
        </div>
        <div className="pt-6 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">The team</p>
          <p className="text-pretty leading-relaxed">{r.team_description}</p>
        </div>
        {r.traction && (
          <div className="pt-6 border-t border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Traction</p>
            <p className="text-pretty leading-relaxed">{r.traction}</p>
          </div>
        )}
      </Card>

      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Documents</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
            <FileText className="h-5 w-5 text-primary shrink-0" strokeWidth={1.75} />
            <span className="flex-1 truncate text-sm font-medium">{r.deck_filename || "Pitch deck"}</span>
            <Button asChild variant="outline" size="pill-sm">
              <a href={r.deck_url} target="_blank" rel="noopener noreferrer">View</a>
            </Button>
            <Button asChild variant="brand" size="pill-sm">
              <a href={downloadUrl(r.deck_url)}>
                <Download className="mr-1 h-3.5 w-3.5" />
                Download
              </a>
            </Button>
          </div>
          {(r.supporting_docs ?? []).map((d) => (
            <div key={d.url} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-2.5">
              <Paperclip className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
              <span className="flex-1 truncate text-sm">{d.filename}</span>
              <Button asChild variant="ghost" size="pill-sm">
                <a href={d.url} target="_blank" rel="noopener noreferrer">View</a>
              </Button>
              <Button asChild variant="outline" size="pill-sm">
                <a href={downloadUrl(d.url)}>
                  <Download className="mr-1 h-3.5 w-3.5" />
                  Download
                </a>
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
