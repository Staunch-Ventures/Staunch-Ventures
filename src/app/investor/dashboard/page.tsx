"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText, Megaphone, Sparkles } from "lucide-react";
import { mockInvestments } from "@/lib/mock-data";

const investmentBySector = mockInvestments.reduce((acc, investment) => {
  const { sector, currentValue } = investment;
  acc[sector] = (acc[sector] ?? 0) + currentValue;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(investmentBySector).map(([name, value]) => ({
  name,
  value,
}));

function KPI({
  label,
  value,
  delta,
  trend,
  emphasize,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  emphasize?: boolean;
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null;
  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={`mt-3 text-3xl font-semibold tabular-nums ${
          emphasize ? "text-foreground" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {delta && (
        <div className={`mt-2 flex items-center gap-1 text-xs ${trendColor}`}>
          {TrendIcon && <TrendIcon className="h-3.5 w-3.5" />}
          <span className="tabular-nums">{delta}</span>
        </div>
      )}
    </Card>
  );
}

export default function DashboardAnalyticsPage() {
  const totalNav = mockInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);
  const totalInvested = mockInvestments.reduce((acc, inv) => acc + inv.investedAmount, 0);
  const unrealized = totalNav - totalInvested;
  const mrr = 450_000;
  const burnRate = 120_000;

  // Map activity events to distinct icons/colors instead of repeating one
  const activity = mockInvestments.slice(0, 5).map((inv, i) => {
    const types = ["valuation", "doc", "announcement"] as const;
    const type = types[i % types.length];
    const delta = ((inv.currentValue - inv.investedAmount) / inv.investedAmount) * 100;
    return { ...inv, type, delta };
  });

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          A snapshot of your portfolio performance.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KPI
          label="Total NAV"
          value={`R${totalNav.toLocaleString()}`}
          delta={`+R${unrealized.toLocaleString()} unrealized`}
          trend="up"
          emphasize
        />
        <KPI
          label="Portfolio MRR"
          value={`R${mrr.toLocaleString()}`}
          delta="+5.2% from last month"
          trend="up"
        />
        <KPI
          label="Avg. Burn Rate"
          value={`R${burnRate.toLocaleString()} / mo`}
          delta="-1.8% from last month"
          trend="down"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Investment value by sector</CardTitle>
            <CardDescription>Current portfolio value, grouped by sector.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
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
                  cursor={{ fill: "hsl(var(--muted) / 0.6)" }}
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 8px 24px -8px rgba(0,0,0,0.45)",
                  }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                  formatter={(value: number) => [`R${value.toLocaleString()}`, "Value"]}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Capital movements and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {activity.map((inv) => {
                const Icon =
                  inv.type === "valuation" ? Sparkles : inv.type === "doc" ? FileText : Megaphone;
                const tone =
                  inv.type === "valuation"
                    ? "text-success bg-success/10 border-success/20"
                    : inv.type === "doc"
                    ? "text-info bg-info/10 border-info/20"
                    : "text-primary bg-primary/10 border-primary/20";
                const label =
                  inv.type === "valuation"
                    ? `New valuation for ${inv.companyName}`
                    : inv.type === "doc"
                    ? `Document filed by ${inv.companyName}`
                    : `${inv.companyName} posted an update`;
                return (
                  <div key={inv.companyName} className="flex items-start gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border ${tone}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                        {inv.delta > 0 ? "+" : ""}
                        {inv.delta.toFixed(1)}%  ·  R{inv.currentValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
