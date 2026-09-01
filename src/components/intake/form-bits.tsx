"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
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

/**
 * A numeric answer.
 *
 * The value is held as a string by the caller so a half-typed number stays
 * editable, and `echo` renders the parsed value back — formatted rand, usually
 * — so a founder can see what we read before they submit it.
 */
export function NumberField({
  id,
  label,
  optional,
  hint,
  echo,
  value,
  onChange,
  placeholder,
  min = 0,
  step,
}: {
  id: string;
  label: React.ReactNode;
  optional?: boolean;
  hint?: React.ReactNode;
  echo?: React.ReactNode;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  min?: number;
  step?: number;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {echo && <p className="text-xs text-muted-foreground tabular-nums">{echo}</p>}
      {hint && <p className="text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

/**
 * Progress across a multi-step form.
 *
 * Completed steps are clickable so an answer can be changed without starting
 * over; steps ahead are not, because each one is validated before the form
 * lets you past it. On narrow screens only the current step keeps its label —
 * the rest collapse to their number rather than wrapping into three rows.
 */
export function Stepper({
  steps,
  current,
  onSelect,
}: {
  steps: readonly string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const isCurrent = i === current;
        return (
          <li key={label} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => done && onSelect(i)}
              disabled={!done}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isCurrent && "border-primary/40 bg-primary/10 text-primary",
                done &&
                  "border-border bg-muted/40 text-muted-foreground hover:border-border-strong hover:text-foreground",
                !done && !isCurrent && "border-border/60 text-muted-foreground/50"
              )}
            >
              <span className="tabular-nums">{i + 1}</span>
              <span className={cn("sm:inline", isCurrent ? "inline" : "hidden")}>{label}</span>
            </button>
            {i < steps.length - 1 && <span className="h-px w-3 bg-border sm:w-5" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
