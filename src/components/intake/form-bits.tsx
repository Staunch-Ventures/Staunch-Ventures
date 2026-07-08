"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Uppercase eyebrow label used across the intake forms. */
export function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline gap-2 text-xs uppercase tracking-wider text-muted-foreground"
    >
      {children}
      {optional && <span className="normal-case tracking-normal text-muted-foreground/60">optional</span>}
    </label>
  );
}

/** Selectable chip row — single (radio-like) or multi (checkbox-like). */
export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: readonly T[];
  value: T[];
  onChange: (next: T[]) => void;
  multi?: boolean;
}) {
  const toggle = (opt: T) => {
    if (multi) {
      onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
    } else {
      onChange([opt]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={selected}
            onClick={() => toggle(opt)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium border transition-colors",
              selected
                ? "bg-primary/10 border-primary/40 text-primary"
                : "bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:border-border-strong"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Live character counter for capped textareas. */
export function CharCount({ value, max }: { value: string; max: number }) {
  const over = value.length > max;
  return (
    <span className={cn("text-xs tabular-nums", over ? "text-destructive" : "text-muted-foreground/60")}>
      {value.length}/{max}
    </span>
  );
}

/** Toggleable checkbox row with a text label. */
export function CheckRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 text-left text-sm transition-colors hover:border-border-strong"
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
          checked ? "bg-primary border-primary" : "border-border-strong bg-transparent"
        )}
        aria-hidden
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-primary-foreground" fill="none">
            <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className={checked ? "text-foreground" : "text-muted-foreground"}>{children}</span>
    </button>
  );
}
