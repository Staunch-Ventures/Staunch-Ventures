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

## Conventions

- **Content lives in `site-data.ts`**, not in page components. Adding a partner, venture, video, or field photo means editing one array — the pages, counts, and marquees update themselves.
- **Photos always render through `FieldImage`** (uniform frame, grade, and captions) and are never cropped: size containers close to the photo's native aspect ratio.
- **Images ship optimised**: photos ~1600px long edge JPEG, logos sized near their display size. Keep originals out of `public/` (put them in `design-source/`) — everything in `public/` deploys. The Next image optimizer serves AVIF/WebP at the edge.
- Page containers share the home layout: `mx-auto max-w-9xl px-4 lg:px-8`.
