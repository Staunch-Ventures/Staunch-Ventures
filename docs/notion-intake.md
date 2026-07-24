# Pitch intake → Notion

The `/pitch` form writes straight into the Notion **Venture Pipeline** database.
Notion is the only store this path touches — no Neon, no other database.

```
founder fills /pitch
   ↓  deck + docs upload straight to Vercel Blob
   ↓  POST /api/pitch
   ├─ fails a hard mandate blocker → server log line
   │                                  founder sees a courteous decline
   │                                  ✗ never reaches Notion, agent never runs
   └─ eligible → Notion row created
                 Status = Sourced, Source = Form
```

The screening gate lives **in front of** the Notion write on purpose. Anything
that lands in the pipeline is work for the screening agent, so disqualified
applications must never become rows.

## Environment

```
NOTION_TOKEN=ntn_…                                  # "Pitch Form" integration
NOTION_PITCH_DATABASE_ID=94a2ced491de4288b85506df62243044
```

Set in `.env.local` and in Vercel → Project → Settings → Environment Variables.
The integration must be connected to the database (Notion → ••• →
Connections → *Pitch Form*), or every call 404s.

Run `npm run notion:check` after any schema edit in Notion. It is read-only and
names the exact mismatch — a renamed property or a deleted option otherwise
fails silently at the API boundary.

## Field mapping

| Form question | Notion property | Type |
| --- | --- | --- |
| Company name | `Company` | title |
| Website | `Website` | url |
| What kind of organisation are you? | `Company Type` | select |
| How central is technology? | `Tech Profile` | select |
| Which round are you raising? | `Stage` | select |
| Where do you mainly operate? | `Primary Market` | select |
| Connection to South Africa | `SA Connection` | select |
| Sectors | `Sector` | multi-select |
| In a sentence or two, what do you do? | `Summary` | text (400 cap) |
| Traction so far | `Traction` | text (300 cap) |
| How much are you raising? + equity % | `Asking` | text — e.g. `R5,000,000 for 10% equity` |
| *(derived)* | `Pre-money (ZAR)` | number |
| Your name | `Founder(s)` | text |
| Email | `Email` | email |
| LinkedIn | `LinkedIn` | url |
| Who's building this? | `Team` | text (500 cap) |
| Pitch deck | `Pitch Deck` | files (external → Blob) |
| Anything else? | `Supporting Docs` | files (external → Blob) |
| *(automatic)* | `Source` = **Form** | select |
| *(automatic)* | `Status` = **Sourced** | status |

Files stay in Vercel Blob and attach to Notion as external URLs, so nothing
large passes through the API route.

**`Stage` vs `Status`** are easy to confuse: `Stage` is the round being raised,
`Status` is our pipeline position. Different properties.

### Implied valuation

The form asks for the raise amount and the equity offered as two numbers rather
than one free-text line, which makes the valuation derivable:

```
post-money = raise ÷ (equity ÷ 100)
pre-money  = post-money − raise
```

`R5,000,000` for `10%` → post `R50,000,000`, pre **`R45,000,000`**.

The founder sees this live under the fields before submitting, so they can
correct the numbers if the implied valuation isn't what they meant. Only
`Pre-money (ZAR)` is written; it's arithmetic on stated facts, not a judgment.
If equity is left blank (fair — it's often still open), no valuation is written
and `Asking` records the amount alone.

### Source is automatic

`Source` is never typed by hand. The form writes **Form** on every submission,
and the database template defaults to **Manual**, so anything added by a person
is labelled correctly without anyone thinking about it.

### Team-owned properties

`Owner` · `Notes` · `Track` · `Geography` · `Conviction` · `Founder-Market Fit`
· `Company Stage` · `Added`, plus the `Agent Analysis` files property, where the
external screening agent uploads its PDF. **The form never writes any of these.**
No judgment field is ever set by an applicant.

## Screening rules

Defined once in `screenPitch()` in `src/lib/intake.ts`, enforced in two places
from that single definition: live in the form (courtesy, and saves the founder
an upload) and in `/api/pitch` before the Notion call (authoritative).

| Blocker | Fires when | Code |
| --- | --- | --- |
| Not for-profit | Company type is *Non-profit / NPO* or *Government / public entity* | `not-for-profit` |
| Not technology-driven | Tech profile is *Not technology-driven* | `not-tech` |
| Too late stage | Stage is *Series B+* | `too-late-stage` |
| No African nexus | Primary market *Outside Africa* **and** no SA presence or plans | `no-africa-nexus` |

*Tech-enabled* businesses pass the tech gate — "tech" is read broadly, as
intended. *Idea* stage passes the stage gate.

**Series A outside South Africa is deliberately not a blocker.** It surfaces as
a non-blocking advisory (`advisePitch()`): the founder is told our focus narrows
to South Africa at that round, and the application goes through regardless. The
team judges it from `Stage` and `Primary Market` on the row.

A declined submission returns HTTP 200 with `{ declined: true, reason }` — the
request succeeded, the answer is just no.

## Form order

Questions are ordered so the five mandate questions come **second**, right after
the company's name — before any prose or uploads. A founder who can't qualify
finds out after five taps rather than after writing a pitch and uploading a
deck, and the section says so plainly rather than pretending it's routine.

1. **The company** — name, website
2. **Fit check** — the five gate questions
3. **What you're building** — sectors, summary, traction
4. **The raise** — amount, equity, live implied valuation
5. **You and the team** — name, email, LinkedIn, team
6. **Documents** — deck, supporting files

## Declines

Auto-declined applications are written to the server log (`[pitch] declined`,
visible in Vercel's runtime logs) and stored nowhere else. They must never
enter the Venture Pipeline — that database is the agent's work queue, and a
reject sitting in it re-introduces the exact cost the gate exists to prevent.

If decline analytics ever justify a real store, `logDecline()` in
`src/app/api/pitch/route.ts` is the only function to change.
