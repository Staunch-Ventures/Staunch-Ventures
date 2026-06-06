"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { format } from "date-fns";
import { mockMeetingRequests, type MeetingRequest } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Event type definition
type CalendarEvent = {
  id: string;
  title: string;
  range?: { from: Date; to: Date };
  date?: Date;
  description: string;
  color: string;
  type: 'event' | 'meeting';
};


// Initial static events
const initialEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "O-Week Activation: Bag Learning",
    range: { from: new Date(2026, 1, 2), to: new Date(2026, 1, 20) },
    description: "Nation Wide Activation on campuses",
    color: "bg-primary/70",
    type: 'event',
  },
  {
    id: "event-3",
    title: "Cape Town Founder House",
    range: { from: new Date(2026, 1, 6), to: new Date(2026, 1, 14) },
    description: "Cape Town",
    color: "bg-accent",
    type: 'event',
  },
  {
    id: "event-4",
    title: "Regenerative Agriculture Think Tank",
    date: new Date(2026, 10, 15),
    description: "Johannesburg",
    color: "bg-accent",
    type: 'event',
  },
];


const modifiersClassNames = {
  oWeek: "bg-primary/30",
  founderHouse: "bg-accent text-accent-foreground",
  thinkTank: "bg-accent text-accent-foreground rounded-full",
  acceptedMeeting: "bg-green-500/50 text-white rounded-full",
};


export default function CalendarPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 1));
    const [events, setEvents] = React.useState<CalendarEvent[]>(initialEvents);
    const [meetingRequests, setMeetingRequests] = React.useState<MeetingRequest[]>(mockMeetingRequests);
    const { toast } = useToast();

    const modifiers = React.useMemo(() => {
        const founderHouseRange = { from: new Date(2026, 1, 6), to: new Date(2026, 1, 14) };

        const mods: Record<string, any> = {
            founderHouse: founderHouseRange,
            oWeek: [
                { from: new Date(2026, 1, 2), to: new Date(2026, 1, 5) },
                { from: new Date(2026, 1, 15), to: new Date(2026, 1, 20) }
            ],
            thinkTank: new Date(2026, 10, 15),
        };
        
        const acceptedMeetings = events.filter(e => e.type === 'meeting' && e.date);
        if (acceptedMeetings.length > 0) {
            mods.acceptedMeeting = acceptedMeetings.map(m => m.date as Date);
        }

        return mods;
    }, [events]);

    const handleAccept = (requestId: string) => {
        const request = meetingRequests.find(r => r.id === requestId);
        if (!request) return;

        const newMeeting: CalendarEvent = {
            id: `meeting-${request.id}`,
            title: `Meeting: ${request.startupName}`,
            date: request.dateTime,
            description: `1-on-1 meeting with ${request.startupName}`,
            color: 'bg-green-500', // A distinct color for meetings
            type: 'meeting',
        };

        setEvents(prevEvents => [...prevEvents, newMeeting].sort((a,b) => ((a.date || a.range?.from) as Date).getTime() - ((b.date || b.range?.from) as Date).getTime()));
        setMeetingRequests(requests => requests.filter(r => r.id !== requestId));

        toast({
            title: "Meeting Accepted",
            description: `Meeting with ${request?.startupName} has been added to your calendar.`,
        });
    };

    const handleReject = (requestId: string) => {
        const request = meetingRequests.find(r => r.id === requestId);
        setMeetingRequests(requests => requests.filter(r => r.id !== requestId));
        toast({
            title: "Meeting Rejected",
            description: `You have rejected the meeting with ${request?.startupName}.`,
            variant: "destructive"
        });
    };
    
    const handleCancelMeeting = (eventId: string) => {
        const eventToCancel = events.find(e => e.id === eventId);
        setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
        toast({
            title: "Meeting Cancelled",
            description: `You have cancelled the meeting: ${eventToCancel?.title}.`,
            variant: "destructive",
        });
    }

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
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-primary mb-2">Schedule</p>
        <h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Events, founder houses, and meeting requests.
        </p>
      </header>
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
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {events.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 group">
                         <div className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${event.color}`} />
                         <div className="flex-grow">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {event.range ? formatRange(event.range.from, event.range.to) : event.date ? format(event.date, "MMMM d, yyyy 'at' h:mm a") : ''}
                            </p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                         </div>
                         {event.type === 'meeting' && (
                             <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCancelMeeting(event.id)}>
                                 <Trash2 className="h-4 w-4 text-destructive" />
                                 <span className="sr-only">Cancel Meeting</span>
                             </Button>
                         )}
                    </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Requested Meetings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {meetingRequests.length > 0 ? (
                meetingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            {(() => {
                                const initials = request.startupName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                                const hash = Array.from(request.startupName).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
                                const hue = hash % 360;
                                return (
                                    <div
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-semibold text-foreground/90"
                                        style={{ background: `hsl(${hue}, 30%, 18%)` }}
                                    >
                                        {initials}
                                    </div>
                                );
                            })()}
                            <div>
                                <p className="font-semibold">{request.startupName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(request.dateTime, "MMMM d, yyyy 'at' h:mm a")}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => handleAccept(request.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Accept & Add to Calendar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
                                <X className="mr-2 h-4 w-4" />
                                Reject
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground text-center py-8">No pending meeting requests.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
