import { z } from "zod";

/**
 * Shared vocabulary for the intake pipeline (public forms + admin dashboard).
 * Sector and stage lists mirror the Staunch mandate so submissions arrive
 * pre-structured along the dimensions any future screener will gate on:
 * sector fit, stage fit, and African nexus.
 */

export const SECTORS = [
  "EdTech",
  "HealthTech / MedTech",
  "FinTech",
  "AgriTech",
  "Clean Energy",
  "Water & Sanitation",
  "Logistics & Supply Chain",
  "Other",
] as const;

export const STAGES = ["Idea", "Pre-Seed", "Seed", "Series A", "Series B+"] as const;

export const INVESTOR_TYPES = [
  "Angel",
  "VC Fund",
  "Family Office",
  "Corporate / CVC",
  "DFI / Impact",
  "Other",
] as const;

export const TICKET_SIZES = [
  "Under $25K",
  "$25K – $100K",
  "$100K – $500K",
  "$500K – $1M",
  "$1M+",
] as const;

/**
 * Pipeline stages for the admin board. Columns run left → right; drag a card
 * to advance it. `dot`/`column` are full Tailwind class literals (the JIT
 * scanner reads this file). Terminal stages (backed/passed) sit rightmost.
 */
export const STARTUP_STATUSES = [
  { value: "new", label: "New", dot: "bg-primary" },
  { value: "reviewing", label: "Reviewing", dot: "bg-[hsl(210_90%_60%)]" },
  { value: "meeting", label: "Meeting", dot: "bg-[hsl(38_92%_58%)]" },
  { value: "backed", label: "Backed", dot: "bg-success" },
  { value: "passed", label: "Passed", dot: "bg-muted-foreground/60" },
] as const;

export const INVESTOR_STATUSES = [
  { value: "new", label: "New", dot: "bg-primary" },
  { value: "contacted", label: "Contacted", dot: "bg-[hsl(210_90%_60%)]" },
  { value: "in-conversation", label: "In Conversation", dot: "bg-[hsl(38_92%_58%)]" },
  { value: "committed", label: "Committed", dot: "bg-success" },
  { value: "passed", label: "Passed", dot: "bg-muted-foreground/60" },
] as const;

export type StartupStatus = (typeof STARTUP_STATUSES)[number]["value"];
export type InvestorStatus = (typeof INVESTOR_STATUSES)[number]["value"];

export const CAPS = {
  founderMessage: 600,
  teamDescription: 800,
  traction: 300,
  investorMessage: 600,
} as const;

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
  founderName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  linkedin: z.string().trim().max(300).optional().or(z.literal("")),
  hqCountry: z.string().trim().min(1).max(80),
  africaHq: z.boolean(),
  africaCustomers: z.boolean(),
  africaExpansion: z.boolean(),
  sectors: z.array(z.enum(SECTORS)).min(1).max(SECTORS.length),
  stage: z.enum(STAGES),
  raiseAmount: z.string().trim().max(120).optional().or(z.literal("")),
  traction: z.string().trim().max(CAPS.traction).optional().or(z.literal("")),
  teamDescription: z.string().trim().min(1).max(CAPS.teamDescription),
  founderMessage: z.string().trim().min(1).max(CAPS.founderMessage),
  deck: uploadedFileSchema,
  supportingDocs: z.array(uploadedFileSchema).max(MAX_SUPPORTING_DOCS),
});

export type PitchPayload = z.infer<typeof pitchSchema>;

export const investSchema = z.object({
  name: z.string().trim().min(1).max(120),
  firm: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  linkedin: z.string().trim().max(300).optional().or(z.literal("")),
  investorType: z.enum(INVESTOR_TYPES),
  ticketSize: z.enum(TICKET_SIZES).optional(),
  sectors: z.array(z.enum(SECTORS)).max(SECTORS.length),
  message: z.string().trim().max(CAPS.investorMessage).optional().or(z.literal("")),
});

export type InvestPayload = z.infer<typeof investSchema>;
