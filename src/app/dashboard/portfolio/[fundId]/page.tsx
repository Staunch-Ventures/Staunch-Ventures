"use client";

import * as React from "react";
import { mockFunds } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FundDetailPage({ params }: { params: { fundId: string } }) {
  const resolvedParams = React.use(params as any);
  const fund = mockFunds.find(f => f.id === resolvedParams.fundId);

  if (!fund) {
    notFound();
  }

  const totalNav = fund.investments.reduce((acc, inv) => acc + inv.currentValue, 0);
  const totalInvested = fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0);
  const unrealizedGains = totalNav - totalInvested;
  const equityValue = totalNav * fund.investorEquity;

  const fundValueOverTime = [
    { date: "Jan '23", value: fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0) * 0.8 },
    { date: "Apr '23", value: fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0) * 1.1 },
    { date: "Jul '23", value: fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0) * 1.0 },
    { date: "Oct '23", value: fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0) * 1.3 },
    { date: "Jan '24", value: fund.investments.reduce((acc, inv) => acc + inv.investedAmount, 0) * 1.5 },
    { date: "Apr '24", value: totalNav },
  ].map(d => ({ ...d, value: Math.round(d.value) }));


  return (
    <div className="flex flex-col gap-8">
      <header>
        <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/dashboard/portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Funds
            </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tighter">{fund.name}</h1>
        <p className="text-muted-foreground mt-2">Details for your investment in {fund.name}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total NAV</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">R{totalNav.toLocaleString()}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Unrealized Gains</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">R{unrealizedGains.toLocaleString()}</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Equity Value</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">R{equityValue.toLocaleString()}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Your Equity</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{(fund.investorEquity * 100).toFixed(0)}%</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Fund Value Over Time</CardTitle>
          <CardDescription>Total Net Asset Value (NAV) of {fund.name}.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={fundValueOverTime}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="fundValueGradient" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(value: number) => [`R${value.toLocaleString()}`, "Fund Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#fundValueGradient)"
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

      <Card>
        <CardHeader>
            <CardTitle>Portfolio Companies</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Company</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead className="text-right">Invested</TableHead>
                        <TableHead className="text-right">Current Value</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {fund.investments.map((investment) => (
                        <TableRow key={investment.companyName}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center p-1 border">
                                <Image 
                                src={`https://picsum.photos/seed/${investment.companyName.replace(/\s/g, '-')}/100/100`}
                                width={40}
                                height={40}
                                alt={`${investment.companyName} logo`}
                                data-ai-hint="logo abstract"
                                className="rounded-sm"
                                />
                            </div>
                            <span className="font-medium">{investment.companyName}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="secondary">{investment.sector}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">R{investment.investedAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-mono">R{investment.currentValue.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
