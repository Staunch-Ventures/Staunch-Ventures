"use client";

import * as React from "react";
import Link from "next/link";
import { Search, MapPin, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SECTORS,
  STAGES,
  STARTUP_STATUSES,
  INVESTOR_STATUSES,
  INVESTOR_TYPES,
} from "@/lib/intake";
import { updateStartupStatus, updateInvestorStatus } from "@/app/admin/actions";

/**
 * Deal-flow kanban. Design follows pipeline-CRM/ATS conventions:
 * - status pipeline is the default lens; drag a card right to advance it
 * - group-by pivots (sector / stage / type) re-slice the same records
 * - cards carry triage-level info only; click through for the full memo
 * - time-in-stage aging turns amber at 7 days, red at 14 — stale deals
 *   should be impossible to ignore
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
  ticketSize: string | null;
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
        "text-[11px] tabular-nums font-medium",
        d >= 14 ? "text-destructive" : d >= 7 ? "text-[hsl(38_92%_58%)]" : "text-muted-foreground/70"
      )}
      title={`${label === "today" ? "Moved today" : `${d} days`} in this column`}
    >
      {label}
    </span>
  );
}

function StatusDot({ status, kind }: { status: string; kind: Kind }) {
  const vocab = kind === "startups" ? STARTUP_STATUSES : INVESTOR_STATUSES;
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
  // Optimistic status overrides so drops land instantly; the server action
  // confirms in the background and we revert on failure.
  const [overrides, setOverrides] = React.useState<Record<string, string>>({});
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [hoverCol, setHoverCol] = React.useState<string | null>(null);

  React.useEffect(() => {
    // New tab or fresh data — reset transient state, keep it simple.
    setGroupBy("status");
    setQuery("");
    setOverrides({});
  }, [kind]);

  const statusVocab = kind === "startups" ? STARTUP_STATUSES : INVESTOR_STATUSES;

  const status = (row: { id: string; status: string }) => {
    const v = overrides[row.id] ?? row.status;
    return statusVocab.some((s) => s.value === v) ? v : statusVocab[0].value;
  };

  const q = query.trim().toLowerCase();
  const rows: (StartupCard | InvestorCard)[] =
    kind === "startups"
      ? startups.filter(
          (r) =>
            !q ||
            r.companyName.toLowerCase().includes(q) ||
            r.founderName.toLowerCase().includes(q) ||
            r.hqCountry.toLowerCase().includes(q)
        )
      : investors.filter(
          (r) =>
            !q ||
            r.name.toLowerCase().includes(q) ||
            (r.firm ?? "").toLowerCase().includes(q)
        );

  // Column definitions per grouping. Status shows every pipeline column even
  // when empty (an empty stage is information); other pivots hide empties.
  type Column = { key: string; label: string; dot?: string };
  let columns: Column[];
  const groupKey = (row: StartupCard | InvestorCard): string => {
    if (groupBy === "status") return status(row);
    if (groupBy === "sector") return (row.sectors[0] as string) ?? "Other";
    if (groupBy === "stage") return (row as StartupCard).stage;
    return (row as InvestorCard).investorType;
  };

  if (groupBy === "status") {
    columns = statusVocab.map((s) => ({ key: s.value, label: s.label, dot: s.dot }));
  } else {
    const source: readonly string[] =
      groupBy === "sector" ? SECTORS : groupBy === "stage" ? STAGES : INVESTOR_TYPES;
    columns = source
      .filter((c) => rows.some((r) => groupKey(r) === c))
      .map((c) => ({ key: c, label: c }));
  }

  const byColumn = (key: string) => rows.filter((r) => groupKey(r) === key);

  const onDrop = (col: string) => {
    setHoverCol(null);
    if (!dragId || groupBy !== "status") return;
    const id = dragId;
    setDragId(null);
    const row = rows.find((r) => r.id === id);
    if (!row || status(row) === col) return;
    const previous = status(row);
    setOverrides((o) => ({ ...o, [id]: col }));
    const action = kind === "startups" ? updateStartupStatus : updateInvestorStatus;
    action(id, col).catch(() => {
      setOverrides((o) => ({ ...o, [id]: previous }));
    });
  };

  return (
    <div className="space-y-5">
      {/* Toolbar: search + group-by pivot */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={kind === "startups" ? "Search companies, founders…" : "Search investors, firms…"}
            className="h-9 w-64 rounded-full border border-border bg-card/60 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 text-sm">
          <span className="px-2.5 text-xs uppercase tracking-wider text-muted-foreground/70">Group by</span>
          {GROUPERS[kind].map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setGroupBy(g.key)}
              className={cn(
                "rounded-full px-3.5 py-1 font-medium transition-colors",
                groupBy === g.key
                  ? "bg-muted text-foreground border border-border-strong"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {groupBy === "sector" && (
        <p className="text-xs text-muted-foreground -mt-2">Grouped by primary sector.</p>
      )}

      {/* Board */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1">
        {columns.map((col) => {
          const cards = byColumn(col.key);
          return (
            <div
              key={col.key}
              onDragOver={
                groupBy === "status"
                  ? (e) => {
                      e.preventDefault();
                      setHoverCol(col.key);
                    }
                  : undefined
              }
              onDragLeave={groupBy === "status" ? () => setHoverCol((h) => (h === col.key ? null : h)) : undefined}
              onDrop={groupBy === "status" ? () => onDrop(col.key) : undefined}
              className={cn(
                "flex w-[290px] shrink-0 flex-col rounded-2xl border bg-card/40 transition-colors",
                hoverCol === col.key && dragId ? "border-primary/50 bg-primary/5" : "border-border"
              )}
            >
              <div className="flex items-center gap-2 px-4 pt-3.5 pb-2.5">
                {col.dot && <span className={cn("h-2 w-2 rounded-full", col.dot)} />}
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {col.label}
                </h2>
                <span className="ml-auto rounded-full bg-muted/60 px-2 py-0.5 text-[11px] tabular-nums text-muted-foreground">
                  {cards.length}
                </span>
              </div>

              <div className="flex flex-col gap-2 px-2.5 pb-3 min-h-[80px]">
                {cards.length === 0 && (
                  <p className="px-2 py-6 text-center text-xs text-muted-foreground/50">
                    {groupBy === "status" && dragId ? "Drop here" : "Empty"}
                  </p>
                )}
                {cards.map((row) =>
                  kind === "startups" ? (
                    <StartupCardView
                      key={row.id}
                      card={row as StartupCard}
                      currentStatus={status(row)}
                      showStatusDot={groupBy !== "status"}
                      draggable={groupBy === "status"}
                      dragging={dragId === row.id}
                      onDragStart={() => setDragId(row.id)}
                      onDragEnd={() => {
                        setDragId(null);
                        setHoverCol(null);
                      }}
                    />
                  ) : (
                    <InvestorCardView
                      key={row.id}
                      card={row as InvestorCard}
                      currentStatus={status(row)}
                      showStatusDot={groupBy !== "status"}
                      draggable={groupBy === "status"}
                      dragging={dragId === row.id}
                      onDragStart={() => setDragId(row.id)}
                      onDragEnd={() => {
                        setDragId(null);
                        setHoverCol(null);
                      }}
                    />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type CardChrome = {
  currentStatus: string;
  showStatusDot: boolean;
  draggable: boolean;
  dragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
};

function cardClass(dragging: boolean, draggable: boolean) {
  return cn(
    "group block rounded-xl border border-border bg-card/80 px-3.5 py-3 transition-all",
    "hover:border-border-strong hover:bg-card",
    draggable && "cursor-grab active:cursor-grabbing",
    dragging && "opacity-40 rotate-1"
  );
}

function StartupCardView({
  card,
  currentStatus,
  showStatusDot,
  draggable,
  dragging,
  onDragStart,
  onDragEnd,
}: { card: StartupCard } & CardChrome) {
  const nexus = nexusLabel(card);
  return (
    <Link
      href={`/admin/s/${card.id}`}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={cardClass(dragging, draggable)}
    >
      <div className="flex items-start gap-2">
        {showStatusDot && (
          <span className="mt-1.5">
            <StatusDot status={currentStatus} kind="startups" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {card.companyName}
          </p>
          <p className="truncate text-xs text-muted-foreground mt-0.5">
            {card.founderName} · {card.hqCountry}
          </p>
        </div>
        {draggable && (
          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors" />
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-muted/60 border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/80">
          {card.stage}
        </span>
        {card.sectors.slice(0, 2).map((s) => (
          <span key={s} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-medium text-primary">
            {s}
          </span>
        ))}
        {card.sectors.length > 2 && (
          <span className="text-[11px] text-muted-foreground">+{card.sectors.length - 2}</span>
        )}
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1 truncate">
          {nexus && (
            <>
              <MapPin className="h-3 w-3 shrink-0 text-primary/70" strokeWidth={2} />
              <span className="truncate">{nexus}</span>
            </>
          )}
          {!nexus && card.raiseAmount && <span className="truncate">Raising {card.raiseAmount}</span>}
        </span>
        <AgeChip since={card.statusChangedAt} />
      </div>
    </Link>
  );
}

function InvestorCardView({
  card,
  currentStatus,
  showStatusDot,
  draggable,
  dragging,
  onDragStart,
  onDragEnd,
}: { card: InvestorCard } & CardChrome) {
  return (
    <Link
      href={`/admin/i/${card.id}`}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={cardClass(dragging, draggable)}
    >
      <div className="flex items-start gap-2">
        {showStatusDot && (
          <span className="mt-1.5">
            <StatusDot status={currentStatus} kind="investors" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {card.name}
          </p>
          <p className="truncate text-xs text-muted-foreground mt-0.5">
            {card.firm || card.investorType}
          </p>
        </div>
        {draggable && (
          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors" />
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-muted/60 border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/80">
          {card.investorType}
        </span>
        {card.ticketSize && (
          <span className="rounded-full bg-muted/60 border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/80">
            {card.ticketSize}
          </span>
        )}
        {card.sectors.slice(0, 2).map((s) => (
          <span key={s} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-medium text-primary">
            {s}
          </span>
        ))}
        {card.sectors.length > 2 && (
          <span className="text-[11px] text-muted-foreground">+{card.sectors.length - 2}</span>
        )}
      </div>

      <div className="mt-2.5 flex items-center justify-end text-[11px]">
        <AgeChip since={card.statusChangedAt} />
      </div>
    </Link>
  );
}
