"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  DayPicker,
  useNavigation,
  DayFlag,
  UI,
  type MonthCaptionProps,
} from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// DayPicker has a polymorphic union of modes. Use `any` for the props type to
// avoid the strict mode-narrowed signature, which surfaces as TS2322 when the
// caller passes `mode="single"` alongside `selected` / `onSelect`.
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mode?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: any
}

function CustomMonthCaption(props: MonthCaptionProps) {
  const { calendarMonth, displayIndex: _displayIndex, ...divProps } = props
  const { goToMonth, nextMonth, previousMonth } = useNavigation()

  return (
    <div
      {...divProps}
      className={cn(
        "grid grid-cols-[28px_1fr_28px] items-center pt-1 px-1",
        divProps.className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        className="h-7 w-7 p-0 text-white opacity-80 hover:opacity-100 hover:bg-white/10 disabled:opacity-30"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <span className="sr-only">Go to previous month</span>
        <ChevronLeft className="h-4 w-4 text-white" />
      </Button>

      <h2 className="justify-self-center text-sm font-medium text-foreground">
        {format(calendarMonth.date, "MMMM yyyy")}
      </h2>

      <Button
        type="button"
        variant="ghost"
        className="h-7 w-7 p-0 text-white opacity-80 hover:opacity-100 hover:bg-white/10 disabled:opacity-30"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <span className="sr-only">Go to next month</span>
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>
    </div>
  )
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 inline-block", className)}
      hideNavigation
      classNames={{
        [UI.Months]:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        [UI.Month]: "space-y-4",

        [UI.MonthCaption]: "relative",
        [UI.Nav]: "hidden",

        [UI.MonthGrid]: "w-full border-collapse space-y-1",

        [UI.Weekdays]: "flex w-full",
        [UI.Weekday]:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",

        [UI.Week]: "flex w-full mt-2",

        // Keep the cell neutral so you never get “full-bar” highlights.
        [UI.Day]: "h-9 w-9 p-0 text-center rounded-md overflow-hidden",

        // All visuals on the button: rounded hover and (if any aria-selected appears) rounded selected.
        [UI.DayButton]:
          "h-9 w-9 rounded-md p-0 font-normal text-sm text-foreground " +
          "hover:bg-white/10 hover:text-foreground " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 " +
          "aria-selected:bg-primary aria-selected:text-primary-foreground " +
          "aria-selected:hover:bg-primary aria-selected:hover:text-primary-foreground",

        [DayFlag.today]: "text-accent-foreground",
        [DayFlag.outside]: "text-muted-foreground opacity-50",
        [DayFlag.disabled]: "text-muted-foreground opacity-50",
        [DayFlag.hidden]: "invisible",

        ...classNames,
      }}
      components={{
        MonthCaption: CustomMonthCaption,
      }}
      {...props}
    />
  )
}
