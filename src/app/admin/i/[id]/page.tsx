import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSql } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

async function setStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "reviewed"].includes(status)) return;
  const sql = getSql();
  await sql`UPDATE investor_inquiries SET status = ${status} WHERE id = ${id}::uuid`;
  revalidatePath(`/admin/i/${id}`);
  revalidatePath("/admin");
}

export default async function InvestorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sql = getSql();
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await sql`SELECT * FROM investor_inquiries WHERE id = ${id}::uuid`;
  } catch {
    notFound();
  }
  if (rows.length === 0) notFound();
  const r = rows[0] as {
    id: string;
    created_at: string;
    name: string;
    firm: string | null;
    email: string;
    linkedin: string | null;
    investor_type: string;
    ticket_size: string | null;
    sectors: string[];
    message: string | null;
    status: string;
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="pl-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin?tab=investors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All investors
          </Link>
        </Button>
        <form action={setStatus}>
          <input type="hidden" name="id" value={r.id} />
          <input type="hidden" name="status" value={r.status === "new" ? "reviewed" : "new"} />
          <Button type="submit" variant="outline" size="pill-sm">
            {r.status === "new" ? "Mark as reviewed" : "Mark as new"}
          </Button>
        </form>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">{r.name}</h1>
          {r.status === "new" ? (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">New</Badge>
          ) : (
            <Badge variant="secondary" className="bg-muted/60 text-muted-foreground">Reviewed</Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          {r.firm && `${r.firm} · `}
          <a href={`mailto:${r.email}`} className="hover:text-foreground transition-colors">{r.email}</a>
          {r.linkedin && (
            <>
              {" · "}
              <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-0.5">
                LinkedIn
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Received {dateFmt.format(new Date(r.created_at))}</p>
      </div>

      <Card className="p-6 md:p-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Investor type</p>
            <p className="font-medium">{r.investor_type}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Typical ticket</p>
            <p className="font-medium">{r.ticket_size || "—"}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Sectors of interest</p>
          {r.sectors.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {r.sectors.map((s) => (
                <span key={s} className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[11px] font-medium text-primary">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Not specified</p>
          )}
        </div>
        {r.message && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</p>
            <p className="text-pretty leading-relaxed">{r.message}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
