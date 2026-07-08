"use client";

import * as React from "react";
import Link from "next/link";
import { Search, MapPin, Archive, ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SECTORS,
  STAGES,
  STARTUP_STATUSES,
  STARTUP_REJECTED,
  INVESTOR_STATUSES,
  INVESTOR_TYPES,
} from "@/lib/intake";
import { updateStartupStatus, updateInvestorStatus } from "@/app/admin/actions";

/**
 * Deal-flow board. Pipeline-CRM conventions: status columns are the default
 * lens, drag a card right to advance it, group-by pivots re-slice the same
 * records, and a time-in-stage age chip flags stale deals (amber ≥7d, red
 * ≥14d). Rejected startups leave the board entirely — they live in a list
 * behind the Rejected rail, which doubles as the drop target for rejecting.
 */

export type StartupCard = {
  id: string;
  createdAt: string;
  statusChangedAt: string;
  companyName: string;
  founderName: string;
  hqCountry: string;
  africaHq: boolean;
  africaCustomers: boolean;
  africaExpansion: boolean;
  sectors: string[];
  stage: string;
  raiseAmount: string | null;
  status: string;
};

export type InvestorCard = {
  id: string;
  createdAt: string;
  statusChangedAt: string;
  name: string;
  firm: string | null;
  investorType: string;
  location: string | null;
  sectors: string[];
  status: string;
};

type Kind = "startups" | "investors";
type GroupBy = "status" | "sector" | "stage" | "type";

const GROUPERS: Record<Kind, { key: GroupBy; label: string }[]> = {
  startups: [
    { key: "status", label: "Status" },
    { key: "sector", label: "Sector" },
    { key: "stage", label: "Stage" },
  ],
  investors: [
    { key: "status", label: "Status" },
    { key: "type", label: "Type" },
    { key: "sector", label: "Sector" },
  ],
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

function daysAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

/** Time-in-stage chip — the staleness signal. */
function AgeChip({ since }: { since: string }) {
  const d = daysAgo(since);
  const label = d <= 0 ? "today" : `${d}d`;
  return (
    <span
      className={cn(
        "text-[11px] tabular-nums font-medium shrink-0",
        d >= 14 ? "text-destructive" : d >= 7 ? "text-[hsl(38_92%_58%)]" : "text-muted-foreground/60"
      )}
      title={`${d <= 0 ? "Moved today" : `${d} days`} in this column`}
    >
      {label}
    </span>
  );
}

function StatusDot({ status, kind }: { status: string; kind: Kind }) {
  const vocab = kind === "startups" ? [...STARTUP_STATUSES, STARTUP_REJECTED] : INVESTOR_STATUSES;
  const s = vocab.find((v) => v.value === status) ?? vocab[0];
  return <span className={cn("inline-block h-2 w-2 rounded-full shrink-0", s.dot)} title={s.label} />;
}

function nexusLabel(c: StartupCard): string | null {
  const parts = [];
  if (c.africaHq) parts.push("HQ");
  if (c.africaCustomers) parts.push("Customers");
  if (c.africaExpansion) parts.push("Expanding");
  return parts.length ? parts.join(" · ") : null;
}

export function DealBoard({
  kind,
  startups,
  investors,
}: {
  kind: Kind;
  startups: StartupCard[];
  investors: InvestorCard[];
}) {
  const [groupBy, setGroupBy] = React.useState<GroupBy>("status");
  const [query, setQuery] = React.useState("");
  const [showRejected, setShowRejected] = React.useState(false);
  // Optimistic status overrides so drops land instantly; the server action
  // confirms in the background and we revert on failure.
  const [overrides, setOverrides] = React.useState<Record<string, string>>({});
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [hoverCol, setHoverCol] = React.useState<string | null>(null);

  React.useEffect(() => {
    setGroupBy("status");
    setQuery("");
    setShowRejected(false);
    setOverrides({});
  }, [kind]);

  const statusVocab = kind === "startups" ? STARTUP_STATUSES : INVESTOR_STATUSES;

  const statusOf = (row: { id: string; status: string }) => {
    const v = overrides[row.id] ?? row.status;
    if (kind === "startups" && v === STARTUP_REJECTED.value) return v;
    return statusVocab.some((s) => s.value === v) ? v : statusVocab[0].value;
  };

  const q = query.trim().toLowerCase();
  const matches = (row: StartupCard | InvestorCard) => {
    if (!q) return true;
    if (kind === "startups") {
      const r = row as StartupCard;
      return (
        r.companyName.toLowerCase().includes(q) ||
        r.founderName.toLowerCase().includes(q) ||
        r.hqCountry.toLowerCase().includes(q)
      );
    }
    const r = row as InvestorCard;
    return r.name.toLowerCase().includes(q) || (r.firm ?? "").toLowerCase().includes(q);
  };

  const allRows: (StartupCard | InvestorCard)[] = kind === "startups" ? startups : investors;
  const rejected = kind === "startups"
    ? (startups.filter((r) => statusOf(r) === STARTUP_REJECTED.value) as StartupCard[])
    : [];
  const active = allRows.filter((r) => statusOf(r) !== STARTUP_REJECTED.value && matches(r));

  type Column = { key: string; label: string; dot?: string };
  const groupKey = (row: StartupCard | InvestorCard): string => {
    if (groupBy === "status") return statusOf(row);
    if (groupBy === "sector") return (row.sectors[0] as string) ?? "Other";
    if (groupBy === "stage") return (row as StartupCard).stage;
    return (row as InvestorCard).investorType;
  };

  let columns: Column[];
  if (groupBy === "status") {
    columns = statusVocab.map((s) => ({ key: s.value, label: s.label, dot: s.dot }));
  } else {
    const source: readonly string[] =
      groupBy === "sector" ? SECTORS : groupBy === "stage" ? STAGES : INVESTOR_TYPES;
    columns = source
      .filter((c) => active.some((r) => groupKey(r) === c))
      .map((c) => ({ key: c, label: c }));
  }

  const byColumn = (key: string) => active.filter((r) => groupKey(r) === key);

  const moveTo = (id: string, next: string) => {
    const row = allRows.find((r) => r.id === id);
    if (!row || statusOf(row) === next) return;
    const previous = statusOf(row);
    setOverrides((o) => ({ ...o, [id]: next }));
    const action = kind === "startups" ? updateStartupStatus : updateInvestorStatus;
    action(id, next).catch(() => setOverrides((o) => ({ ...o, [id]: previous })));
  };

  const onDropColumn = (e: React.DragEvent, col: string) => {
    e.preventDefault();
    setHoverCol(null);
    const id = dragId ?? e.dataTransfer.getData("text/plain");
    setDragId(null);
    if (id && groupBy === "status") moveTo(id, col);
  };

  const dragHandlers = (id: string) =>
    groupBy === "status"
      ? {
          draggable: true,
          onDragStart: (e: React.DragEvent) => {
            e.dataTransfer.setData("text/plain", id);
            e.dataTransfer.effectAllowed = "move";
            setDragId(id);
          },
          onDragEnd: () => {
            setDragId(null);
            setHoverCol(null);
          },
        }
      : { draggable: false };

  const dropHandlers = (col: string) =>
    groupBy === "status"
      ? {
          onDragOver: (e: React.DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (hoverCol !== col) setHoverCol(col);
          },
          onDragLeave: (e: React.DragEvent) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setHoverCol((h) => (h === col ? null : h));
            }
          },
          onDrop: (e: React.DragEvent) => onDropColumn(e, col),
        }
      : {};

  // ---- Rejected list view (startups only) ----
  if (showRejected && kind === "startups") {
    const list = rejected.filter(matches).sort((a, b) => b.statusChangedAt.localeCompare(a.statusChangedAt));
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowRejected(false)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pipeline
          </button>
          <SearchBox kind={kind} value={query} onChange={setQuery} />
        </div>

        <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Archive className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
            <h2 className="text-sm font-semibold">Rejected</h2>
            <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[11px] tabular-nums text-muted-foreground">
              {list.length}
            </span>
          </div>
          {list.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-muted-foreground/60">
              Nothing here — rejected applications will collect in this list.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {list.map((r) => (
                <li key={r.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors">
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/s/${r.id}`} className="font-medium text-sm text-foreground hover:text-primary transition-colors">
                      {r.companyName}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      {r.founderName} · {r.hqCountry} · {r.stage}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-1 max-w-[240px]">
                    {r.sectors.slice(0, 2).map((s) => (
                      <span key={s} className="rounded-full bg-muted/50 border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="hidden sm:block text-xs text-muted-foreground tabular-nums">
                    {dateFmt.format(new Date(r.createdAt))}
                  </span>
                  <button
                    type="button"
                    onClick={() => moveTo(r.id, "new")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
                    title="Restore to New"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // ---- Board view ----
  return (
    <div className="space-y-4">
      {/* Toolbar: search · group-by · rejected */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchBox kind={kind} value={query} onChange={setQuery} />
        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-card/60 p-0.5 text-sm">
          {GROUPERS[kind].map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setGroupBy(g.key)}
              className={cn(
                "rounded-[7px] px-3 py-1 text-[13px] font-medium transition-colors",
                groupBy === g.key
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
        {groupBy === "sector" && (
          <p className="text-xs text-muted-foreground">Grouped by primary sector</p>
        )}
        {kind === "startups" && (
          <button
            type="button"
            onClick={() => setShowRejected(true)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
          >
            <Archive className="h-3.5 w-3.5" strokeWidth={1.75} />
            Rejected
            <span className="tabular-nums text-xs text-muted-foreground/70">{rejected.length}</span>
          </button>
        )}
      </div>

      {/* Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {columns.map((col) => {
          const cards = byColumn(col.key);
          return (
            <div
              key={col.key}
              {...dropHandlers(col.key)}
              className={cn(
                "flex w-[280px] shrink-0 flex-col rounded-xl border transition-colors",
                hoverCol === col.key && dragId
                  ? "border-primary/60 bg-primary/[0.06]"
                  : "border-border/70 bg-card/30"
              )}
            >
              <div className="flex items-center gap-2 px-3.5 pt-3 pb-2">
                {col.dot && <span className={cn("h-2 w-2 rounded-full", col.dot)} />}
                <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {col.label}
                </h2>
                <span className="ml-auto text-[11px] tabular-nums text-muted-foreground/60">
                  {cards.length}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 px-2 pb-2.5 min-h-[120px]">
                {cards.length === 0 && (
                  <div
                    className={cn(
                      "mx-0.5 rounded-lg border border-dashed px-2 py-8 text-center text-xs transition-colors",
                      hoverCol === col.key && dragId
                        ? "border-primary/50 text-primary"
                        : "border-border/60 text-muted-foreground/40"
                    )}
                  >
                    {dragId && groupBy === "status" ? "Drop here" : "Empty"}
                  </div>
                )}
                {cards.map((row) =>
                  kind === "startups" ? (
                    <StartupCardView
                      key={row.id}
                      card={row as StartupCard}
                      currentStatus={statusOf(row)}
                      showStatusDot={groupBy !== "status"}
                      dragging={dragId === row.id}
                      handlers={dragHandlers(row.id)}
                    />
                  ) : (
                    <InvestorCardView
                      key={row.id}
                      card={row as InvestorCard}
                      currentStatus={statusOf(row)}
                      showStatusDot={groupBy !== "status"}
                      dragging={dragId === row.id}
                      handlers={dragHandlers(row.id)}
                    />
                  )
                )}
              </div>
            </div>
          );
        })}

        {/* Reject rail — drop target + door to the rejected list */}
        {kind === "startups" && groupBy === "status" && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (hoverCol !== "rejected") setHoverCol("rejected");
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setHoverCol((h) => (h === "rejected" ? null : h));
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHoverCol(null);
              const id = dragId ?? e.dataTransfer.getData("text/plain");
              setDragId(null);
              if (id) moveTo(id, STARTUP_REJECTED.value);
            }}
            onClick={() => setShowRejected(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowRejected(true)}
            title="Drop a card here to reject it, or click to open the rejected list"
            className={cn(
              "flex w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border transition-colors",
              hoverCol === "rejected" && dragId
                ? "border-destructive/60 bg-destructive/10 text-destructive-foreground"
                : "border-dashed border-border/70 bg-card/20 text-muted-foreground/50 hover:text-muted-foreground hover:border-border-strong"
            )}
          >
            <Archive className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-[10px] uppercase tracking-wider font-semibold [writing-mode:vertical-rl]">
              Reject{rejected.length > 0 ? `ed · ${rejected.length}` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBox({ kind, value, onChange }: { kind: Kind; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={kind === "startups" ? "Search companies, founders…" : "Search investors, firms…"}
        className="h-8 w-60 rounded-lg border border-border bg-card/60 pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  );
}

type CardChrome = {
  currentStatus: string;
  showStatusDot: boolean;
  dragging: boolean;
  handlers: React.HTMLAttributes<HTMLAnchorElement> & { draggable: boolean };
};

function cardClass(dragging: boolean, draggable: boolean) {
  return cn(
    "group block rounded-lg border border-border/80 bg-card/90 px-3 py-2.5 shadow-sm transition-all",
    "hover:border-border-strong hover:bg-card",
    draggable && "cursor-grab active:cursor-grabbing",
    dragging && "opacity-40"
  );
}

function StartupCardView({
  card,
  currentStatus,
  showStatusDot,
  dragging,
  handlers,
}: { card: StartupCard } & CardChrome) {
  const nexus = nexusLabel(card);
  return (
    <Link href={`/admin/s/${card.id}`} {...handlers} className={cardClass(dragging, handlers.draggable)}>
      <div className="flex items-center gap-2">
        {showStatusDot && <StatusDot status={currentStatus} kind="startups" />}
        <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
          {card.companyName}
        </p>
        <AgeChip since={card.statusChangedAt} />
      </div>
      <p className="mt-0.5 truncate text-xs text-muted-foreground">
        {card.founderName} · {card.hqCountry}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1">
        <span className="rounded-md bg-muted/50 border border-border px-1.5 py-0.5 text-[11px] font-medium text-foreground/75">
          {card.stage}
        </span>
        {card.sectors.slice(0, 2).map((s) => (
          <span key={s} className="rounded-md bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[11px] font-medium text-primary">
            {s}
          </span>
        ))}
        {card.sectors.length > 2 && (
          <span className="text-[11px] text-muted-foreground/70">+{card.sectors.length - 2}</span>
        )}
      </div>

      {(nexus || card.raiseAmount) && (
        <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
          {nexus && (
            <span className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0 text-primary/60" strokeWidth={2} />
              <span className="truncate">{nexus}</span>
            </span>
          )}
          {card.raiseAmount && <span className="ml-auto shrink-0">{card.raiseAmount}</span>}
        </div>
      )}
    </Link>
  );
}

function InvestorCardView({
  card,
  currentStatus,
  showStatusDot,
  dragging,
  handlers,
}: { card: InvestorCard } & CardChrome) {
  return (
    <Link href={`/admin/i/${card.id}`} {...handlers} className={cardClass(dragging, handlers.draggable)}>
      <div className="flex items-center gap-2">
        {showStatusDot && <StatusDot status={currentStatus} kind="investors" />}
        <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
          {card.name}
        </p>
        <AgeChip since={card.statusChangedAt} />
      </div>
      <p className="mt-0.5 truncate text-xs text-muted-foreground">
        {card.firm || card.investorType}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1">
        <span className="rounded-md bg-muted/50 border border-border px-1.5 py-0.5 text-[11px] font-medium text-foreground/75">
          {card.investorType}
        </span>
        {card.sectors.slice(0, 2).map((s) => (
          <span key={s} className="rounded-md bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[11px] font-medium text-primary">
            {s}
          </span>
        ))}
        {card.sectors.length > 2 && (
          <span className="text-[11px] text-muted-foreground/70">+{card.sectors.length - 2}</span>
        )}
      </div>

      {card.location && (
        <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0 text-primary/60" strokeWidth={2} />
          <span className="truncate">{card.location}</span>
        </div>
      )}
    </Link>
  );
}
