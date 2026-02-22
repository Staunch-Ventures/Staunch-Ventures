"use client";

import * as React from "react";
import { mockDeals } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
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
        <h1 className="text-4xl font-bold tracking-tighter">Startup Screener</h1>
        <p className="text-muted-foreground mt-2">Filter and search for investment opportunities.</p>
      </header>
      
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search by startup name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card"
          />
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Filter by sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>{sector === 'all' ? 'All Sectors' : sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map(stage => (
                <SelectItem key={stage} value={stage}>{stage === 'all' ? 'All Stages' : stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Startup</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Funding Ask</TableHead>
                <TableHead className="w-[120px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.startupName}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center p-1 border">
                        <Image 
                          src={`https://picsum.photos/seed/${deal.startupName}/100/100`}
                          width={40}
                          height={40}
                          alt={`${deal.startupName} logo`}
                          data-ai-hint="logo abstract"
                          className="rounded-sm"
                        />
                        </div>
                        <span className="font-medium">{deal.startupName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{deal.sector}</Badge>
                  </TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell className="text-right font-mono">R{deal.fundingAsk.toLocaleString()}</TableCell>
                   <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      View Deck
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {deals.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                No startups found matching your criteria.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
