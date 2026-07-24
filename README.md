# Staunch Ventures

Marketing site and product demos for [Staunch Ventures](https://staunchventures.com) — a cross-border network backing Africa's tech startups with capital, expertise, and operators who've scaled before.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS with a custom design system (see [docs/design-system.md](docs/design-system.md))
- shadcn/ui + Radix primitives, Framer Motion for interaction
- Deployed on Vercel; pushes to `main` go straight to production

## Development

```bash
npm install
npm run dev        # dev server on http://localhost:9003
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Structure

| Path | What it is |
| --- | --- |
| `src/app/(main)/` | Marketing site: home, about, ventures, team, ecosystem, media, contact |
| `src/app/investor/`, `src/app/startup/` | Product demo dashboards |
| `src/lib/site-data.ts` | **Single source of content**: ventures, growth partners, initiatives, team field photos, videos |
| `src/components/marketing/` | Marketing-specific components (`HeroVisual`, `FieldImage`, `VideoCard`) |
| `src/components/ui/` | Design-system primitives (cards, spotlight/tilt effects, marquee, scroll reveals) |
| `design-source/` | Original/unoptimised assets (brand pattern SVGs, source photos) — not shipped |
| `docs/` | Design blueprint and design-system reference |

## Deal-flow intake

Founders apply at `/pitch` (deck upload + structured mandate fields), investors
introduce themselves at `/invest`. Startup pitches write **straight into the
Notion "Venture Pipeline" database** — see [docs/notion-intake.md](docs/notion-intake.md)
for setup and the full field mapping. Investor inquiries still land in the team
dashboard at `/admin` — shared team password, sessions last 30 days.

- **Pipeline**: Notion `Venture Pipeline`. New applications arrive at
  **Status = Sourced, Source = Form**; every judgment field is left empty for
  the team and the screening agent. `npm run notion:check` verifies the Notion
  schema still matches the form.
- **Database**: Neon Postgres (project `Staunch-Intake`) is now investor-side
  only — `investor_inquiries`, plus the dormant `startup_applications`
  (historic pitches, still readable in `/admin`). The pitch path never touches
  it.
- **Files**: pitch decks and supporting docs go to Vercel Blob (store
  `staunch-decks`) via client uploads — the 4.5MB serverless body limit
  doesn't apply. Notion links them as external files, so nothing large moves
  through the API route. URLs are unguessable but public: don't share them.
- **Env vars** (set in Vercel + `.env.local`, never committed):
  `NOTION_TOKEN`, `NOTION_PITCH_DATABASE_ID`, `DATABASE_URL`,
  `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD`. Rotating `ADMIN_PASSWORD` signs
  everyone out.
- **Hard mandate gate before the write** — `screenPitch()` in
  `src/lib/intake.ts` blocks non-profits, non-tech, Series B+, and applications
  with no African nexus (Series A outside South Africa is a non-blocking
  advisory, not a block). Declines are logged and never become pipeline rows, so
  the screening agent only ever sees deals we could actually invest in. The form
  runs the same rules live; the API route is the authoritative one.

## Conventions

- **Content lives in `site-data.ts`**, not in page components. Adding a partner, venture, video, or field photo means editing one array — the pages, counts, and marquees update themselves.
- **Photos always render through `FieldImage`** (uniform frame, grade, and captions) and are never cropped: size containers close to the photo's native aspect ratio.
- **Images ship optimised**: photos ~1600px long edge JPEG, logos sized near their display size. Keep originals out of `public/` (put them in `design-source/`) — everything in `public/` deploys. The Next image optimizer serves AVIF/WebP at the edge.
- Page containers share the home layout: `mx-auto max-w-9xl px-4 lg:px-8`.
