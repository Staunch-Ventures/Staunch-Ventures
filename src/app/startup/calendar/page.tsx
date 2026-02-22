"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { format } from "date-fns";
import { mockInvestors } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


const events = [
  {
    title: "O-Week Activation: Bag Learning",
    range: { from: new Date(2026, 1, 2), to: new Date(2026, 1, 20) },
    description: "Nation Wide Activation on campuses",
    color: "bg-primary/70",
  },
  {
    title: "Cape Town Founder House",
    range: { from: new Date(2026, 1, 6), to: new Date(2026, 1, 14) },
    description: "Cape Town",
    color: "bg-accent",
  },
  {
    title: "Regenerative Agriculture Think Tank",
    date: new Date(2026, 10, 15), // November is month 10
    description: "Johannesburg",
    color: "bg-accent",
  },
];

const modifiers = {
    oWeek: [
        { from: new Date(2026, 1, 2), to: new Date(2026, 1, 5) },
        { from: new Date(2026, 1, 15), to: new Date(2026, 1, 20) }
    ],
    founderHouse: { from: new Date(2026, 1, 6), to: new Date(2026, 1, 14) },
    thinkTank: new Date(2026, 10, 15),
};

const modifiersClassNames = {
  oWeek: "bg-primary/30",
  founderHouse: "bg-accent text-accent-foreground",
  thinkTank: "bg-accent text-accent-foreground rounded-full",
};


export default function StartupCalendarPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 1));
    const { toast } = useToast();

    const formatDate = (date: Date) => {
        return format(date, "MMMM d, yyyy");
    }

    const formatRange = (from: Date, to: Date) => {
        if (from.getMonth() === to.getMonth()) {
            const fromDay = format(from, "d");
            const toDay = format(to, "d");
            const year = format(from, "yyyy");
            const month = format(from, "MMMM");
            if (fromDay === toDay) {
                return `${month} ${fromDay}, ${year}`;
            }
            return `${month} ${fromDay}-${toDay}, ${year}`;
        }
        return `${formatDate(from)} - ${formatDate(to)}`;
    }

    const handleRequestMeeting = (investorName: string) => {
      toast({
        title: "Meeting Requested",
        description: `Your request to meet with ${investorName} has been sent.`,
      });
    }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Calendar & Events</h1>
      <Card>
        <CardContent className="grid md:grid-cols-[auto_1fr] gap-8 p-4 md:p-6">
            <div className="flex items-center justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    month={date}
                    onMonthChange={(month) => setDate(new Date(month.getFullYear(), month.getMonth(), 1))}
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                    className="rounded-md border w-full sm:w-auto"
                />
            </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight border-b pb-2">Upcoming Events</h2>
            <div className="space-y-4">
                {events.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                         <div className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${event.color}`} />
                         <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {event.range ? formatRange(event.range.from, event.range.to) : formatDate(event.date as Date)}
                            </p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                         </div>
                    </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Book a Meeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {mockInvestors.map((investor) => (
                <div key={investor.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={investor.avatar} alt={investor.name} data-ai-hint="person face" />
                            <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{investor.name}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {investor.sectors.map(sector => (
                                    <Badge key={sector} variant="secondary">{sector}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => handleRequestMeeting(investor.name)}>
                        Request Meeting
                    </Button>
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
