
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { format } from "date-fns";

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
  thinkTank: new Date(2026, 10, 15),
  founderHouse: { from: new Date(2026, 1, 6), to: new Date(2026, 1, 14) },
};

const modifiersClassNames = {
  oWeek: "bg-primary/30",
  founderHouse: "bg-accent text-accent-foreground",
  thinkTank: "bg-accent text-accent-foreground rounded-full",
};


export default function StartupMeetingsPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 1));

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

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Meetings & Events</h1>
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
    </div>
  );
}
