"use client";

import * as React from "react";
import { mockFunds } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function CompanyAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  // Deterministic hue from name
  const hash = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = hash % 360;
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-semibold text-foreground/90"
      style={{ background: `hsl(${hue}, 30%, 18%)` }}
    >
      {initials}
    </div>
  );
}

export default function FundDetailPage({ params }: { params: Promise<{ fundId: string }> }) {
  const { fundId } = React.use(params);
  const fund = mockFunds.find((f) => f.id === fundId);

  if (!fund) {
    notFound();
  }

  const totalNav = fund.investments.reduce((acc, inv) => acc + inv.currentValue, 0);
  const totalInvested = fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0);
  const unrealizedGains = totalNav - totalInvested;
  const equityValue = totalNav * fund.investorEquity;

  const fundValueOverTime = [
    { date: "Jan '23", value: totalInvested * 0.8 },
    { date: "Apr '23", value: totalInvested * 1.1 },
    { date: "Jul '23", value: totalInvested * 1.0 },
    { date: "Oct '23", value: totalInvested * 1.3 },
    { date: "Jan '24", value: totalInvested * 1.5 },
    { date: "Apr '24", value: totalNav },
  ].map((d) => ({ ...d, value: Math.round(d.value) }));

  const kpis = [
    { label: "Total NAV", value: `R${totalNav.toLocaleString()}` },
    { label: "Unrealized gains", value: `R${unrealizedGains.toLocaleString()}`, tone: "success" as const },
    { label: "Equity value", value: `R${equityValue.toLocaleString()}` },
    { label: "Your equity", value: `${(fund.investorEquity * 100).toFixed(0)}%` },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header>
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-3">
          <Link href="/dashboard/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all funds
          </Link>
        </Button>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Fund</p>
        <h1 className="text-3xl font-semibold tracking-tight">{fund.name}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Details for your investment in {fund.name}.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p
              className={`mt-3 text-2xl font-semibold tabular-nums ${
                k.tone === "success" ? "text-success" : "text-foreground"
              }`}
            >
              {k.value}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fund value over time</CardTitle>
          <CardDescription>Total NAV of {fund.name}.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fundValueOverTime} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fundValueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={4}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R${Number(value) / 1_000_000}m`}
                width={48}
              />
              <Tooltip
                cursor={{ stroke: "hsl(var(--primary) / 0.4)", strokeWidth: 1 }}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.45)",
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                formatter={(value: number) => [`R${value.toLocaleString()}`, "NAV"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#fundValueGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Portfolio companies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Company</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead className="text-right">Invested</TableHead>
                <TableHead className="text-right">Current value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fund.investments.map((investment) => (
                <TableRow key={investment.companyName}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CompanyAvatar name={investment.companyName} />
                      <span className="font-medium">{investment.companyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{investment.sector}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    R{investment.investedAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    R{investment.currentValue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
