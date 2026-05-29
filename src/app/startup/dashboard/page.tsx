"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Eye,
  Trophy,
  FileText,
} from "lucide-react";

const userGrowthData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 550 },
  { month: "Mar", users: 720 },
  { month: "Apr", users: 890 },
  { month: "May", users: 1100 },
  { month: "Jun", users: 1300 },
];

const startupMetrics = {
  mrr: 25_000,
  activeUsers: 1300,
  burnRate: 15_000,
  cashInBank: 250_000,
};

const recentActivity = [
  { icon: Mail, tone: "info", description: "New message from an investor.", time: "2 hours ago" },
  { icon: Eye, tone: "primary", description: "Your pitch deck was viewed by 'AQVC'.", time: "1 day ago" },
  { icon: Trophy, tone: "success", description: "Milestone 'User Growth to 1k' was achieved.", time: "3 days ago" },
  { icon: FileText, tone: "muted", description: "You submitted your monthly update.", time: "5 days ago" },
];

const toneClass = {
  primary: "text-primary bg-primary/10 border-primary/20",
  success: "text-success bg-success/10 border-success/20",
  info: "text-info bg-info/10 border-info/20",
  muted: "text-muted-foreground bg-muted border-border",
} as const;

function KPI({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
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
      <p className="mt-3 text-3xl font-semibold tabular-nums text-foreground">{value}</p>
      {delta && (
        <div className={`mt-2 flex items-center gap-1 text-xs ${trendColor}`}>
          {TrendIcon && <TrendIcon className="h-3.5 w-3.5" />}
          <span className="tabular-nums">{delta}</span>
        </div>
      )}
    </Card>
  );
}

export default function StartupDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          A snapshot of your startup&apos;s performance.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPI
          label="MRR"
          value={`R${startupMetrics.mrr.toLocaleString()}`}
          delta="+12.5% from last month"
          trend="up"
        />
        <KPI
          label="Active Users"
          value={startupMetrics.activeUsers.toLocaleString()}
          delta="+21% from last month"
          trend="up"
        />
        <KPI
          label="Burn Rate"
          value={`R${startupMetrics.burnRate.toLocaleString()} / mo`}
          delta="Net burn stable"
          trend="flat"
        />
        <KPI
          label="Cash in Bank"
          value={`R${startupMetrics.cashInBank.toLocaleString()}`}
          delta="≈ 16 months runway"
          trend="flat"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">User growth</CardTitle>
            <CardDescription>Active users over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={userGrowthData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
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
                  tickFormatter={(value) => `${Number(value) / 1000}k`}
                  width={36}
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
                  formatter={(value: number) => [value.toLocaleString(), "Users"]}
                />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Updates and actions related to your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                      toneClass[activity.tone as keyof typeof toneClass]
                    }`}
                  >
                    <activity.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
