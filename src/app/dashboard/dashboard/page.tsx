"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, ArrowUp } from "lucide-react";
import { mockInvestments } from "@/lib/mock-data";

const investmentBySector = mockInvestments.reduce((acc, investment) => {
  const { sector, currentValue } = investment;
  if (!acc[sector]) {
    acc[sector] = 0;
  }
  acc[sector] += currentValue;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(investmentBySector).map(([name, value]) => ({
  name,
  value,
}));

export default function DashboardAnalyticsPage() {
  const totalNav = mockInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);
  const totalInvested = mockInvestments.reduce((acc, inv) => acc + inv.investedAmount, 0);
  
  // Mock data for MRR and Burn Rate
  const mrr = 450000;
  const burnRate = 120000;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your Staunch Ventures investment dashboard.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total NAV</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">R{totalNav.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +R{(totalNav - totalInvested).toLocaleString()} unrealized gains
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio MRR</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{mrr.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Burn Rate</CardTitle>
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{burnRate.toLocaleString()}/mo</div>
            <p className="text-xs text-muted-foreground mt-1">-1.8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Investment Value by Sector</CardTitle>
            <CardDescription>Current value of portfolio companies grouped by sector.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
             <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R${Number(value) / 1000000}m`} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                    }}
                    cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Recent capital movements and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockInvestments.slice(0, 5).map((inv) => (
                <div key={inv.companyName} className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <ArrowUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New valuation for {inv.companyName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Value increased by {(((inv.currentValue - inv.investedAmount) / inv.investedAmount) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="ml-auto font-medium">R{inv.currentValue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
