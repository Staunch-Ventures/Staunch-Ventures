"use client";

import * as React from "react";
import { mockDeals } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DealsPage() {
  const [deals, setDeals] = React.useState(mockDeals);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sectorFilter, setSectorFilter] = React.useState("all");
  const [stageFilter, setStageFilter] = React.useState("all");

  const sectors = ["all", ...Array.from(new Set(mockDeals.map(d => d.sector)))];
  const stages = ["all", ...Array.from(new Set(mockDeals.map(d => d.stage)))];

  React.useEffect(() => {
    let filteredDeals = mockDeals;

    if (searchTerm) {
      filteredDeals = filteredDeals.filter(deal =>
        deal.startupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sectorFilter !== "all") {
      filteredDeals = filteredDeals.filter(deal => deal.sector === sectorFilter);
    }

    if (stageFilter !== "all") {
      filteredDeals = filteredDeals.filter(deal => deal.stage === stageFilter);
    }

    setDeals(filteredDeals);
  }, [searchTerm, sectorFilter, stageFilter]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Screener</p>
        <h1 className="text-3xl font-semibold tracking-tight">Startup Screener</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Filter and search for investment opportunities.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            placeholder="Search by startup name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card"
          />
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Filter by sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector === "all" ? "All sectors" : sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage === "all" ? "All stages" : stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-card border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[36%]">Startup</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Funding Ask</TableHead>
                <TableHead className="w-[120px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => {
                const initials = deal.startupName
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                const hash = Array.from(deal.startupName).reduce(
                  (acc, ch) => acc + ch.charCodeAt(0),
                  0
                );
                const hue = hash % 360;
                return (
                  <TableRow key={deal.startupName}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-semibold"
                          style={{ background: `hsl(${hue}, 30%, 18%)` }}
                        >
                          {initials}
                        </div>
                        <span className="font-medium">{deal.startupName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{deal.sector}</Badge>
                    </TableCell>
                    <TableCell>{deal.stage}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      R{deal.fundingAsk.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        View Deck
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {deals.length === 0 && (
            <div className="text-center p-12 text-sm text-muted-foreground">
              No startups found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
