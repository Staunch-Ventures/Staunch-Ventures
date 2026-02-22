"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockFunds } from "@/lib/mock-data";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const portfolioValueOverTime = [
  { date: "Jan '23", value: 1800000 },
  { date: "Apr '23", value: 2500000 },
  { date: "Jul '23", value: 2300000 },
  { date: "Oct '23", value: 3100000 },
  { date: "Jan '24", value: 4200000 },
  { date: "Apr '24", value: 5300000 },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Investment Funds</h1>
        <p className="text-muted-foreground mt-2">An overview of your fund investments.</p>
      </header>
       <Card>
        <CardHeader>
          <CardTitle>Portfolio Value Over Time</CardTitle>
          <CardDescription>Total Net Asset Value (NAV) of your investments.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={portfolioValueOverTime}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="portfolioValueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R${Number(value) / 1000000}m`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
                cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                formatter={(value: number) => [`R${value.toLocaleString()}`, "Portfolio Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#portfolioValueGradient)"
                dot={{
                  r: 4,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockFunds.map((fund) => {
          const totalNav = fund.investments.reduce((acc, inv) => acc + inv.currentValue, 0);
          const investorEquityValue = totalNav * fund.investorEquity;

          return (
            <Card key={fund.id} className="flex flex-col p-0 overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:scale-105 hover:bg-glass-gradient-primary">
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="text-2xl">{fund.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-6 space-y-4">
                <div className="flex items-baseline gap-2">
                    <p className="text-sm text-muted-foreground">Total NAV</p>
                    <p className="text-3xl font-bold text-foreground">
                        R{totalNav.toLocaleString()}
                    </p>
                </div>
                 <div className="flex items-baseline gap-2">
                    <p className="text-sm text-muted-foreground">Your Equity</p>
                    <p className="text-3xl font-bold text-foreground">
                        {(fund.investorEquity * 100).toFixed(0)}%
                    </p>
                </div>
                 <div className="flex items-baseline gap-2">
                    <p className="text-sm text-muted-foreground">Equity Value</p>
                    <p className="text-3xl font-bold text-foreground">
                        R{investorEquityValue.toLocaleString()}
                    </p>
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-black/20 mt-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-md shadow-primary-glow">
                  <Link href={`/dashboard/portfolio/${fund.id}`}>
                    View Fund Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
