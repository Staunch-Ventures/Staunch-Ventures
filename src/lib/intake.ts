import { z } from "zod";

/**
 * Shared vocabulary for the intake pipeline (public forms + admin dashboard).
 *
 * The option lists here are the contract with the Notion "Venture Pipeline"
 * database: these strings are sent as select/multi-select values and Notion
 * rejects any option it doesn't already know. Renaming an option here means
 * renaming it in Notion too (and vice versa).
 *
 * The pipeline is deliberately lean — a property earns its place by being
 * something the team actually filters, sorts, or decides on. Anything the
 * founder says in prose lives in one capped field rather than several.
 */

/**
 * Public-facing link targets. Startup pitches route to the in-house form at
 * /pitch, which writes straight into the Notion pipeline; investor inquiries
 * route to Oliver's inbox rather than /invest.
 */
export const PITCH_URL = "/pitch";
export const INVEST_EMAIL = "oliver@staunchventures.com";
export const INVEST_MAILTO = `mailto:${INVEST_EMAIL}`;

/** Mirrors Notion's `Sector` multi-select, character for character. */
export const SECTORS = [
  "EdTech",
  "HealthTech/MedTech",
  "AgriTech",
  "FinTech",
  "SaaS",
  "AI/ML",
  "Clean Energy/Climate Tech",
  "Other",
] as const;

/**
 * The round being raised — Notion's `Stage`. Distinct from `Company Stage`
 * (product maturity) and `Status` (our pipeline position), both of which the
 * team owns and the form never touches.
 */
export const STAGES = ["Idea", "Pre-Seed", "Seed", "Series A", "Series B+"] as const;

export const COMPANY_TYPES = [
  "For-profit company",
  "Non-profit / NPO",
  "Government / public entity",
  "Other",
] as const;

/**
 * Who actually pays. `Company Type` says what kind of organisation the
 * applicant is; this says who buys from them, which is a different question
 * and the one the mandate's view on selling to government turns on.
 */
export const CUSTOMER_TYPES = ["B2B", "B2C", "B2B2C", "B2G"] as const;

export const TECH_PROFILES = [
  "Tech product or platform",
  "Tech-enabled business",
  "Not technology-driven",
] as const;

/** Where the business actually operates today. */
export const PRIMARY_MARKETS = [
  "South Africa",
  "Africa — multiple markets",
  "Africa — one market (not South Africa)",
  "Outside Africa",
] as const;

/** Relationship to South Africa specifically — the mandate's anchor market. */
export const SA_CONNECTIONS = [
  "Based / operating in South Africa",
  "Expanding into South Africa",
  "No South African presence or plans",
] as const;

export const INVESTOR_TYPES = [
  "Angel",
  "VC Fund",
  "Family Office",
  "Corporate / CVC",
  "DFI / Impact",
  "Other",
] as const;

/**
 * Pipeline stages for the admin board (investor inquiries only — startup
 * pitches now live in Notion). `dot` values are full Tailwind class literals
 * because the JIT scanner reads this file.
 */
export const STARTUP_STATUSES = [
  { value: "new", label: "New", dot: "bg-primary" },
  { value: "reviewed", label: "Reviewed", dot: "bg-[hsl(210_90%_60%)]" },
  { value: "in-talks", label: "In Talks", dot: "bg-[hsl(38_92%_58%)]" },
  { value: "invested", label: "Invested", dot: "bg-success" },
] as const;

export const STARTUP_REJECTED = {
  value: "rejected",
  label: "Rejected",
  dot: "bg-muted-foreground/60",
} as const;

export const INVESTOR_STATUSES = [
  { value: "new", label: "New", dot: "bg-primary" },
  { value: "contacted", label: "Contacted", dot: "bg-[hsl(210_90%_60%)]" },
  { value: "in-conversation", label: "In Conversation", dot: "bg-[hsl(38_92%_58%)]" },
  { value: "committed", label: "Committed", dot: "bg-success" },
  { value: "passed", label: "Passed", dot: "bg-muted-foreground/60" },
] as const;

export type StartupStatus = (typeof STARTUP_STATUSES)[number]["value"];
export type InvestorStatus = (typeof INVESTOR_STATUSES)[number]["value"];

/**
 * Character limits.
 *
 * The narrative fields are deliberately tight. Each one lands in a Notion text
 * property that gets read at a glance, and the discipline is the point: a
 * founder who can't state the problem in 300 characters usually hasn't found
 * it yet. `problem` is the tightest for exactly that reason.
 *
 * `traction` is the tightest of the evidence fields on purpose: it asks for
 * three numbers, not a narrative. The numbers themselves are separate fields.
 */
export const CAPS = {
  problem: 300,
  solution: 400,
  whyNow: 250,
  traction: 300,
  teamDescription: 500,
  whyThisTeam: 400,
  investorMessage: 600,
} as const;

/**
 * Ceilings for the numeric answers. High enough never to bind on a real
 * early-stage raise, low enough that a runaway paste is caught here rather
 * than landing in Notion as a number nobody can sort around.
 */
const MAX_ZAR = 10_000_000_000;
const MAX_COUNT = 1_000_000_000;
/** 50 years. A runway answer beyond this is a units mistake, not a fact. */
const MAX_RUNWAY_MONTHS = 600;

/** Upload limits enforced both in the form UI and the blob token route. */
export const MAX_FILE_MB = 25;
export const MAX_SUPPORTING_DOCS = 5;

export const uploadedFileSchema = z.object({
  url: z.string().url().refine((u) => new URL(u).hostname.endsWith(".blob.vercel-storage.com"), {
    message: "File must be an uploaded document",
  }),
  filename: z.string().min(1).max(200),
});

export const pitchSchema = z.object({
  companyName: z.string().trim().min(1).max(120),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  /** CIPC registration, e.g. 2024/123456/07. Optional: idea-stage founders
   *  are in mandate and often haven't registered an entity yet. */
  registrationNumber: z.string().trim().max(60).optional().or(z.literal("")),
  founderName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  linkedin: z.string().trim().max(300).optional().or(z.literal("")),
  companyType: z.enum(COMPANY_TYPES),
  customerType: z.enum(CUSTOMER_TYPES),
  techProfile: z.enum(TECH_PROFILES),
  primaryMarket: z.enum(PRIMARY_MARKETS),
  saConnection: z.enum(SA_CONNECTIONS),
  sectors: z.array(z.enum(SECTORS)).min(1).max(SECTORS.length),
  stage: z.enum(STAGES),

  /* The pitch, as four questions: what's broken, how you fix it, why now,
     and — over in the team section — why you. */
  problem: z.string().trim().min(1).max(CAPS.problem),
  solution: z.string().trim().min(1).max(CAPS.solution),
  whyNow: z.string().trim().min(1).max(CAPS.whyNow),

  /*
   * Traction: numbers first, prose second.
   *
   * The counts are required and accept 0, so "pre-revenue" is a stated answer
   * rather than an ambiguous blank — a distinction that matters when the
   * pipeline is sorted on these columns. Burn and runway are optional: they
   * are the most confidential answers on the form and they are already in the
   * deck, so requiring them costs good applications and buys little.
   */
  revenueLast12m: z.number().min(0).max(MAX_ZAR),
  payingCustomers: z.number().int().min(0).max(MAX_COUNT),
  activeUsers: z.number().int().min(0).max(MAX_COUNT).optional().nullable(),
  /** The three numbers that best show traction — not a narrative. */
  traction: z.string().trim().min(1).max(CAPS.traction),
  monthlyExpenses: z.number().min(0).max(MAX_ZAR).optional().nullable(),
  runwayMonths: z.number().min(0).max(MAX_RUNWAY_MONTHS).optional().nullable(),

  /*
   * The raise.
   *
   * We ask for the round and the valuation, never for a percentage. Ownership
   * is arithmetic on those two (see `impliedRound`), and it is the more stable
   * pair: prior SAFEs, an already-committed slice, and any venture-building
   * component all move the percentage while leaving the round intact.
   */
  /** ZAR, and the *whole* round — not the portion Staunch might take. */
  raiseAmount: z.number().positive().max(MAX_ZAR),
  /** ZAR. Optional — plenty of rounds are still open on price. */
  preMoneyValuation: z.number().positive().max(MAX_ZAR).optional().nullable(),
  /** ZAR already committed or soft-circled. Says whether there's a lead and
   *  how much room is left, which the round size alone never does. */
  committedAmount: z.number().min(0).max(MAX_ZAR).optional().nullable(),
  /**
   * Whether the founders still hold a majority *after everything raised so
   * far*. A separate question from this round's price: a keen valuation says
   * nothing about what previous rounds already took off the table.
   */
  founderMajority: z.boolean(),

  teamDescription: z.string().trim().min(1).max(CAPS.teamDescription),
  /** Founder-market fit, in the founder's own words. Lands in Notion's
   *  `Founder-Market Fit` property, which is this answer and nothing else. */
  whyThisTeam: z.string().trim().min(1).max(CAPS.whyThisTeam),
  deck: uploadedFileSchema,
  supportingDocs: z.array(uploadedFileSchema).max(MAX_SUPPORTING_DOCS),
});

export type PitchPayload = z.infer<typeof pitchSchema>;

/**
 * What the form must put on the wire. Annotating the request body with this
 * turns a field the client fills wrongly into a compile error rather than a
 * validation failure the founder has to decipher.
 */
export type PitchInput = z.input<typeof pitchSchema>;

/* ------------------------------------------------------------------ *
 * The raise
 * ------------------------------------------------------------------ */

/** `R5,000,000` — deterministic, and readable to both SA and offshore eyes. */
export function formatZar(amount: number): string {
  return `R${Math.round(amount).toLocaleString("en-US")}`;
}

/** `20%`, `7.5%` — one decimal, and no trailing `.0`. */
export function formatPercent(pct: number): string {
  return `${Number(pct.toFixed(1))}%`;
}

/**
 * What a round of `raiseAmount` at `preMoney` implies: the company is worth
 * pre-money plus the new cash once the round closes, and this round's
 * investors collectively own the new cash as a share of that total.
 *
 * This is the direction the form asks in — round size and price — because
 * those are the two numbers a founder actually knows. The percentage falls
 * out; asking for it directly would be asking them to do this arithmetic
 * backwards, against a figure that prior instruments keep moving.
 *
 * Returns null unless both inputs are present and positive: a share derived
 * from a missing price is worse than no number at all.
 */
export function impliedRound(
  raiseAmount?: number | null,
  preMoney?: number | null
): { postMoney: number; newInvestorPct: number } | null {
  if (!raiseAmount || !preMoney) return null;
  if (raiseAmount <= 0 || preMoney <= 0) return null;
  const postMoney = preMoney + raiseAmount;
  return { postMoney, newInvestorPct: (raiseAmount / postMoney) * 100 };
}

/**
 * How much of the round is already spoken for, as a percentage.
 *
 * Null when there's nothing to report, and capped at 100 so an over-committed
 * answer reads as "full" rather than as a number that can't be true.
 */
export function committedShare(
  raiseAmount?: number | null,
  committed?: number | null
): number | null {
  if (!raiseAmount || raiseAmount <= 0) return null;
  if (committed === null || committed === undefined || committed <= 0) return null;
  return Math.min((committed / raiseAmount) * 100, 100);
}

/**
 * Human-readable form of the ask, for Notion's `Asking` text property — the
 * one place the three raise answers are read as a single sentence:
 * `R5,000,000 at R20,000,000 pre-money (20%) · R1,500,000 committed`.
 */
export function formatAsking(
  raiseAmount: number,
  preMoney?: number | null,
  committed?: number | null
): string {
  const round = impliedRound(raiseAmount, preMoney);
  let ask = formatZar(raiseAmount);
  if (round && preMoney) {
    ask += ` at ${formatZar(preMoney)} pre-money (${formatPercent(round.newInvestorPct)})`;
  }
  return committed && committed > 0
    ? `${ask} · ${formatZar(committed)} committed`
    : ask;
}

/* ------------------------------------------------------------------ *
 * Mandate screening
 * ------------------------------------------------------------------ */

/**
 * Hard mandate blockers, evaluated before anything reaches Notion.
 *
 * The point is cost: every row that lands in the Venture Pipeline gets picked
 * up by the screening agent, so a submission that can never pass the mandate
 * must be stopped *upstream of the write*. Disqualified applications are
 * never created as pipeline rows, so the agent never spends a token on them.
 *
 * `screenPitch` runs in two places from this one definition:
 *   - the pitch form, live as the founder answers (courtesy + no wasted upload)
 *   - /api/pitch, after validation and before the Notion call (authoritative)
 *
 * Client-side checks are a convenience only; the route is the real gate.
 */
export type ScreenInput = {
  companyType?: (typeof COMPANY_TYPES)[number];
  customerType?: (typeof CUSTOMER_TYPES)[number];
  techProfile?: (typeof TECH_PROFILES)[number];
  stage?: (typeof STAGES)[number];
  primaryMarket?: (typeof PRIMARY_MARKETS)[number];
  saConnection?: (typeof SA_CONNECTIONS)[number];
};

export type Disqualification = {
  /** Stable identifier, stored with declined submissions for reporting. */
  code: "not-for-profit" | "sells-to-government" | "not-tech" | "too-late-stage" | "no-africa-nexus";
  /** Which answer triggered it — the form highlights this field. */
  field: keyof ScreenInput;
  /** Shown to the founder. Written to be read by a person who just got a no. */
  reason: string;
};

/**
 * Returns the first mandate blocker the answers trip, or null if the
 * application is eligible. Partial input is expected (the form calls this on
 * every render, long before every question is answered) — a rule only fires
 * once the answers it depends on are present.
 */
export function screenPitch(input: ScreenInput): Disqualification | null {
  const { companyType, customerType, techProfile, stage, primaryMarket, saConnection } = input;

  // 1. For-profit only. Non-profits and public entities fall outside a
  //    venture-equity mandate entirely.
  if (companyType === "Non-profit / NPO" || companyType === "Government / public entity") {
    return {
      code: "not-for-profit",
      field: "companyType",
      reason:
        "Staunch invests equity in for-profit companies, so we're not able to consider non-profits or public entities.",
    };
  }

  // 2. Who pays. B2G is the case rule 1 misses entirely: a for-profit tech
  //    company can still sell primarily to government, and that revenue base
  //    sits outside the mandate. B2B2C is untouched — a government somewhere
  //    in the chain isn't the same as government being the customer.
  if (customerType === "B2G") {
    return {
      code: "sells-to-government",
      field: "customerType",
      reason:
        "Our mandate doesn't extend to companies selling primarily to government, so we're not able to take this one further.",
    };
  }

  // 3. Technology-driven, broadly defined — a tech-enabled business counts.
  if (techProfile === "Not technology-driven") {
    return {
      code: "not-tech",
      field: "techProfile",
      reason:
        "We back technology and tech-enabled businesses, and this one sits outside that focus.",
    };
  }

  // 4. Early stage only.
  if (stage === "Series B+") {
    return {
      code: "too-late-stage",
      field: "stage",
      reason:
        "We invest at the early stage — idea through Series A — so a Series B or later round is beyond our mandate.",
    };
  }

  // 5. African nexus: operating mainly in Africa, or based in / actively
  //    expanding into South Africa. Missing all three is out of mandate.
  if (
    primaryMarket === "Outside Africa" &&
    saConnection === "No South African presence or plans"
  ) {
    return {
      code: "no-africa-nexus",
      field: "primaryMarket",
      reason:
        "Our mandate requires an African nexus — operating in Africa, based in South Africa, or actively expanding into South Africa.",
    };
  }

  return null;
}

/**
 * A soft signal, not a gate: the application is in mandate and goes through to
 * Notion, but the founder is told where they sit against our focus so nobody
 * feels misled by a later pass.
 *
 * Series A is the case this exists for. We concentrate on South Africa at that
 * round, but a Series A elsewhere in Africa is still worth reading, so it must
 * never block a submission. The team sees `Stage` and `Primary Market` side by
 * side on the pipeline row and judges it there.
 */
export type Advisory = {
  code: "series-a-outside-sa";
  field: keyof ScreenInput;
  message: string;
};

export function advisePitch(input: ScreenInput): Advisory | null {
  if (input.stage === "Series A" && input.primaryMarket && input.primaryMarket !== "South Africa") {
    return {
      code: "series-a-outside-sa",
      field: "stage",
      message:
        "Worth knowing: at Series A our focus narrows to companies whose primary market is South Africa. You're welcome to apply — we'd just rather be upfront that the bar is higher here.",
    };
  }
  return null;
}

export const investSchema = z.object({
  name: z.string().trim().min(1).max(120),
  firm: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  linkedin: z.string().trim().max(300).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  investorType: z.enum(INVESTOR_TYPES),
  sectors: z.array(z.enum(SECTORS)).max(SECTORS.length),
  message: z.string().trim().max(CAPS.investorMessage).optional().or(z.literal("")),
});

export type InvestPayload = z.infer<typeof investSchema>;
