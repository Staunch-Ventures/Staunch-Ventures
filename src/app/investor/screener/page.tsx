"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Target,
  Boxes,
  Lock,
  Gauge,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Demo data — none of this is real. The "upload" loads a predetermined deck
// and the analysis below is a fixed, scripted response from a mock AI engine.
// ---------------------------------------------------------------------------

const DEMO_DECK = {
  name: "QuantumLeap — Series A Deck.pdf",
  size: "8.4 MB",
  slides: 24,
};

const ANALYSIS_STEPS = [
  "Extracting slides & text",
  "Parsing financial model",
  "Benchmarking against sector",
  "Scoring team & traction",
  "Compiling investment memo",
];

type Dimension = {
  label: string;
  score: number;
  icon: React.ElementType;
  note: string;
};

const DIMENSIONS: Dimension[] = [
  { label: "Team", score: 88, icon: Users, note: "2x exited founders, deep domain PhDs" },
  { label: "Market", score: 82, icon: Target, note: "$14B TAM, 19% CAGR" },
  { label: "Product", score: 79, icon: Boxes, note: "Working prototype, 3 design partners" },
  { label: "Traction", score: 64, icon: TrendingUp, note: "Early revenue, pre-PMF signals" },
  { label: "Business Model", score: 71, icon: Gauge, note: "Usage-based, healthy gross margin" },
  { label: "Moat", score: 75, icon: Lock, note: "2 patents pending, data flywheel" },
];

const METRICS = [
  { label: "ARR", value: "R4.2M", sub: "+212% YoY" },
  { label: "Gross Margin", value: "78%", sub: "Software-like" },
  { label: "Monthly Burn", value: "R610K", sub: "18mo runway" },
  { label: "Raising", value: "R28M", sub: "Series A · R140M cap" },
];

const STRENGTHS = [
  "Founding team has two prior venture-backed exits in adjacent deep-tech markets.",
  "212% YoY revenue growth from a standing start, with three signed enterprise design partners.",
  "Defensible IP position: two patents pending plus a compounding proprietary data set.",
  "Gross margins of 78% indicate genuine software economics rather than services.",
];

const RISKS = [
  "Customer concentration: top account represents ~46% of current ARR.",
  "Pre product-market-fit: retention cohorts are too young to read confidently.",
  "Valuation cap (R140M) is rich relative to current ARR multiple for the stage.",
  "Go-to-market motion is founder-led; no repeatable sales engine yet.",
];

const BENCHMARK = [
  { label: "Growth rate", company: 92, sector: 58 },
  { label: "Capital efficiency", company: 71, sector: 64 },
  { label: "Team strength", company: 88, sector: 61 },
  { label: "Market timing", company: 80, sector: 55 },
];

const OVERALL_SCORE = 78;

type Stage = "idle" | "uploading" | "analyzing" | "complete";

function scoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 65) return "text-primary";
  if (score >= 50) return "text-info";
  return "text-destructive";
}

function barColor(score: number) {
  if (score >= 80) return "bg-success";
  if (score >= 65) return "bg-primary";
  if (score >= 50) return "bg-info";
  return "bg-destructive";
}

export default function ScreenerPage() {
  const [stage, setStage] = React.useState<Stage>("idle");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const reset = () => {
    setStage("idle");
    setUploadProgress(0);
    setActiveStep(0);
  };

  // Scripted upload → analyze → complete pipeline.
  const startDemo = React.useCallback(() => {
    if (stage !== "idle") return;
    setStage("uploading");
    setUploadProgress(0);
  }, [stage]);

  // Drive the fake upload progress bar.
  React.useEffect(() => {
    if (stage !== "uploading") return;
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + 8 + Math.random() * 10);
      });
    }, 90);
    return () => clearInterval(interval);
  }, [stage]);

  // When upload completes, move into analysis.
  React.useEffect(() => {
    if (stage === "uploading" && uploadProgress >= 100) {
      const t = setTimeout(() => setStage("analyzing"), 450);
      return () => clearTimeout(t);
    }
  }, [stage, uploadProgress]);

  // Step through the scripted analysis stages.
  React.useEffect(() => {
    if (stage !== "analyzing") return;
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= ANALYSIS_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setStage("complete"), 700);
        return;
      }
      setActiveStep(step);
    }, 900);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Screener</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">AI Pitch Deck Screener</h1>
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            Staunch Intelligence
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Upload a pitch deck and our custom diligence model returns a structured
          investment memo in seconds, scoring the team, market, traction and risk
          profile against thousands of deals in our network.
        </p>
      </header>

      <AnimatePresence mode="wait">
        {/* -------------------------------------------------- IDLE / UPLOAD */}
        {(stage === "idle" || stage === "uploading") && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Card
              role="button"
              tabIndex={stage === "idle" ? 0 : -1}
              onClick={startDemo}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && stage === "idle") {
                  e.preventDefault();
                  startDemo();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (stage === "idle") setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                startDemo();
              }}
              className={cn(
                "border-2 border-dashed transition-colors",
                stage === "idle" && "cursor-pointer hover:border-primary/60",
                dragging ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              <CardContent className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                {stage === "idle" ? (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                      <Upload className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-base font-medium">
                        Drag & drop a pitch deck, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF, PPTX or Keynote · up to 50 MB
                      </p>
                    </div>
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload a deck
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Demo loads a sample deck. No file actually leaves your device.
                    </p>
                  </>
                ) : (
                  <div className="w-full max-w-md space-y-4">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4 text-left">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-info/30 bg-info/10 text-info">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{DEMO_DECK.name}</p>
                        <p className="text-xs text-muted-foreground tabular-nums">
                          {DEMO_DECK.size} · {DEMO_DECK.slides} slides
                        </p>
                      </div>
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                    </div>
                    <div className="space-y-1.5">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground tabular-nums">
                        Uploading… {Math.round(uploadProgress)}%
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* -------------------------------------------------------- ANALYZING */}
        {stage === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center gap-8 py-16">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                  />
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-base font-medium">Analyzing {DEMO_DECK.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Running diligence model against the Staunch deal network…
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-3">
                  {ANALYSIS_STEPS.map((step, i) => {
                    const done = i < activeStep;
                    const active = i === activeStep;
                    return (
                      <div key={step} className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                            done && "border-success/30 bg-success/10 text-success",
                            active && "border-primary/30 bg-primary/10 text-primary",
                            !done && !active && "border-border text-muted-foreground/50"
                          )}
                        >
                          {done ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : active ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <span className="text-[11px] tabular-nums">{i + 1}</span>
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            done || active ? "text-foreground" : "text-muted-foreground/60"
                          )}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* --------------------------------------------------------- COMPLETE */}
        {stage === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Summary banner */}
            <Card variant="brand">
              <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-5">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                    <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 42}
                        initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                        animate={{
                          strokeDashoffset:
                            2 * Math.PI * 42 * (1 - OVERALL_SCORE / 100),
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-semibold tabular-nums">
                        {OVERALL_SCORE}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        / 100
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold tracking-tight">QuantumLeap</h2>
                      <Badge variant="secondary">DeepTech</Badge>
                      <Badge variant="secondary">Series A</Badge>
                    </div>
                    <Badge className="gap-1.5 bg-success/15 text-success border border-success/30 hover:bg-success/15">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Recommendation: Advance to Partner Review
                    </Badge>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <Button variant="outline" className="gap-2" onClick={reset}>
                    <RotateCcw className="h-4 w-4" />
                    Screen another deck
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Executive summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Executive summary</CardTitle>
                <CardDescription>Generated by Staunch Intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  QuantumLeap is an early-stage DeepTech company raising a R28M Series A.
                  The deck presents a strong, technically credible founding team and a
                  large, fast-growing market with clear timing tailwinds. Revenue is
                  growing rapidly off a small base, supported by genuine software
                  economics. The principal areas to probe in diligence are customer
                  concentration, the durability of early traction, and whether the
                  proposed valuation is justified at the current ARR multiple. On
                  balance, the opportunity scores in the top quartile of comparable
                  Series A decks we have processed and warrants a partner conversation.
                </p>
              </CardContent>
            </Card>

            {/* Key metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {METRICS.map((m) => (
                <Card key={m.label} className="p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums">{m.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.sub}</p>
                </Card>
              ))}
            </div>

            {/* Dimension scores + benchmark */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Diligence scorecard</CardTitle>
                  <CardDescription>Model confidence by dimension.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {DIMENSIONS.map((d) => (
                    <div key={d.label} className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <d.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                        <span className="text-sm font-medium">{d.label}</span>
                        <span
                          className={cn(
                            "ml-auto text-sm font-semibold tabular-nums",
                            scoreColor(d.score)
                          )}
                        >
                          {d.score}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className={cn("h-full rounded-full", barColor(d.score))}
                          initial={{ width: 0 }}
                          animate={{ width: `${d.score}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{d.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sector benchmark</CardTitle>
                  <CardDescription>
                    QuantumLeap vs. median DeepTech Series A in our network.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {BENCHMARK.map((b) => (
                    <div key={b.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{b.label}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {b.company} vs {b.sector}
                        </span>
                      </div>
                      <div className="relative h-2 w-full rounded-full bg-secondary">
                        <div
                          className="absolute inset-y-0 w-0.5 rounded-full bg-muted-foreground/70"
                          style={{ left: `${b.sector}%` }}
                          aria-hidden
                        />
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${b.company}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary" /> QuantumLeap
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-0.5 rounded-full bg-muted-foreground/70" />{" "}
                      Sector median
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strengths + risks */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {STRENGTHS.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Risks & open questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {RISKS.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Footer actions */}
            <Card variant="subtle">
              <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">Next step</p>
                  <p className="text-sm text-muted-foreground">
                    Forward this memo to the investment committee or request an intro
                    to the founders.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Export memo
                  </Button>
                  <Button className="gap-2">
                    Request intro
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
