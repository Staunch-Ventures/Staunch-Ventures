"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockFunds } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const portfolioValueOverTime = [
  { date: "Jan '23", value: 1_800_000 },
  { date: "Apr '23", value: 2_500_000 },
  { date: "Jul '23", value: 2_300_000 },
  { date: "Oct '23", value: 3_100_000 },
  { date: "Jan '24", value: 4_200_000 },
  { date: "Apr '24", value: 5_300_000 },
];

export default function PortfolioPage() {
  const latest = portfolioValueOverTime[portfolioValueOverTime.length - 1].value;
  const earliest = portfolioValueOverTime[0].value;
  const totalGrowth = ((latest - earliest) / earliest) * 100;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Portfolio</p>
        <h1 className="text-3xl font-semibold tracking-tight">Investment Funds</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          An overview of your fund investments.
        </p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">Portfolio value over time</CardTitle>
            <CardDescription>Total Net Asset Value of your investments.</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Current NAV</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              R{latest.toLocaleString()}
            </p>
            <p className="text-xs text-success tabular-nums mt-0.5">
              +{totalGrowth.toFixed(1)}% since {portfolioValueOverTime[0].date}
            </p>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={portfolioValueOverTime}
              margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="portfolioValueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
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
                fill="url(#portfolioValueGradient)"
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

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockFunds.map((fund) => {
          const totalNav = fund.investments.reduce((acc, inv) => acc + inv.currentValue, 0);
          const investorEquityValue = totalNav * fund.investorEquity;

          return (
            <Link key={fund.id} href={`/dashboard/portfolio/${fund.id}`} className="flex group">
              <Card variant="interactive" className="w-full flex flex-col p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Fund</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">{fund.name}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Total NAV</dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      R{totalNav.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Your Equity</dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {(fund.investorEquity * 100).toFixed(0)}%
                    </dd>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-border">
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Equity Value</dt>
                    <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                      R{investorEquityValue.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
