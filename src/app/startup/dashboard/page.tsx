"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, PiggyBank } from "lucide-react";

// Mock data for a single startup
const userGrowthData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 550 },
  { month: "Mar", users: 720 },
  { month: "Apr", users: 890 },
  { month: "May", users: 1100 },
  { month: "Jun", users: 1300 },
];

const startupMetrics = {
  mrr: 25000,
  activeUsers: 1300,
  burnRate: 15000,
  cashInBank: 250000,
};

const recentActivity = [
    { description: "You received a new message from an investor.", time: "2 hours ago"},
    { description: "Your pitch deck was viewed by 'AQVC'.", time: "1 day ago"},
    { description: "Milestone 'User Growth to 1k' was achieved.", time: "3 days ago"},
    { description: "You submitted your monthly update.", time: "5 days ago"},
]

export default function StartupDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's a snapshot of your startup's performance.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{startupMetrics.mrr.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{startupMetrics.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+21% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Burn Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{startupMetrics.burnRate.toLocaleString()}/mo</div>
            <p className="text-xs text-muted-foreground mt-1">Net burn is stable</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash in Bank</CardTitle>
            <PiggyBank className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{startupMetrics.cashInBank.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">16 months runway remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Your active user growth over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
             <ResponsiveContainer width="100%" height={350}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${Number(value) / 1000}k`} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                    }}
                    cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Updates and actions related to your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                     <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {activity.time}
                    </p>
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
