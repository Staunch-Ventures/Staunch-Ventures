import Link from "next/link";
import { INVEST_EMAIL, PITCH_URL } from "@/lib/intake";

/*
 * Staunch Capital is a fund page, not a brochure. Each block answers one
 * question a prospective investor arrives with:
 *   Hero       — what is this?
 *   Thesis     — why this fund?
 *   Fund       — what exactly?
 *   Structure  — what does "permanent capital" mean, and why does it matter?
 *   Platform   — what stands behind the cheque, and who runs it?
 *   Invest     — how do I get in?
 * The team is shared across Staunch and lives on /about; this page links there.
 */

const BRIEF_MAILTO = `mailto:${INVEST_EMAIL}?subject=${encodeURIComponent("Staunch Capital: investor brief")}`;

const TERMS = [
  { key: "Focus", value: "Disruptive African technology" },
  { key: "Stage", value: "Pre-Seed to Series A" },
  { key: "Cheque size", value: "$100k – $400k" },
  { key: "Vehicle", value: "Permanent capital vehicle" },
  { key: "Reach", value: "Africa, the US, Europe and Asia" },
];

const STRUCTURE = [
  {
    title: "No forced exits",
    desc: "We never have to sell a company because a fund term is running out. We hold our best companies for as long as holding is the right call.",
  },
  {
    title: "Returns go back to work",
    desc: "Proceeds from exits can be reinvested in new founders, so the fund's capacity grows with its track record instead of resetting every vintage.",
  },
  {
    title: "Built for Africa's timeline",
    desc: "African technology rewards patience. The best companies compound for years before the rest of the market notices them. Permanent capital is built for that.",
  },
];

const PLATFORM = [
  {
    kicker: "Staunch Ventures",
    title: "Source",
    body: "Our venture studio and co-investment network open doors for founders early in their growth, so we see companies long before they reach a data room.",
  },
  {
    kicker: "Staunch Capital",
    title: "Invest",
    body: "The fund writes $100k–$400k cheques from Pre-Seed to Series A into the companies that clear our mandate.",
  },
  {
    kicker: "Africa · US · Europe · Asia",
    title: "Scale",
    body: "Our co-investment network brings in follow-on capital from Seed to Pre-IPO, and opens routes to customers and investors in the US, Europe and Asia.",
  },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow"></div>
        <div className="hero-vignette"></div>
      </div>
      <div className="hero-content">
        <div className="hero-meta" data-hero>
          <span className="label">Staunch Capital</span>
        </div>
        <h1 className="hero-headline" data-lines>
          Backing Africa&rsquo;s boldest founders.
        </h1>
        <p className="hero-body" data-hero>
          A permanent capital vehicle investing in disruptive technology companies across Africa,
          from Pre-Seed to Series A.
        </p>
        <div className="hero-cta-row" data-hero>
          <a className="cta" href="#invest" data-magnetic>
            Request the investor brief
          </a>
          <a className="textlink" href="#thesis">
            or read the thesis &darr;
          </a>
        </div>
      </div>
      <button className="hero-scroll" id="scrollCue" type="button" aria-label="Scroll to content">
        <span className="hero-scroll__label">Scroll</span>
        <span className="hero-scroll__line"></span>
      </button>
    </section>
  );
}

export function ThesisSection() {
  return (
    <section className="section section--vast manifesto plate--deep" id="thesis">
      <div className="container container--narrow">
        <span className="label" data-reveal="up">
          The Thesis
        </span>
        <p className="manifesto__text" data-scrub-words>
          Africa&rsquo;s defining technology companies are being started now. We back their
          founders from the first cheque, with <em>capital that stays</em>, and open the doors to
          the United States, Europe and Asia.
        </p>
      </div>
    </section>
  );
}

export function FundSection() {
  return (
    <section className="section" id="fund">
      <div className="container">
        <span className="label" data-reveal="up">
          The Fund
        </span>
        <dl className="rows rows--terms" data-reveal-group=".row" data-rules=".rule--x">
          {TERMS.map((t) => (
            <div className="row" key={t.key}>
              <span className="rule rule--x" aria-hidden="true"></span>
              <dt className="row__key">{t.key}</dt>
              <dd className="row__main">
                <span className="row__line">{t.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function StructureSection() {
  return (
    <section className="section" id="structure">
      <div className="container">
        <div className="head">
          <span className="label" data-reveal="up">
            Why Permanent Capital
          </span>
          <h2 className="display h-section" data-lines>
            A fund without a clock.
          </h2>
          <p className="body structure-intro" data-reveal="up">
            Most venture funds have about ten years to invest, grow and return their capital, and
            every decision bends toward that deadline. Staunch Capital is a permanent capital
            vehicle. It has no end date.
          </p>
        </div>
        <div className="rows rows--folio" data-reveal-group=".row" data-rules=".rule--x">
          {STRUCTURE.map((row, i) => (
            <div className="row" key={row.title}>
              <span className="rule rule--x" aria-hidden="true"></span>
              <span className="row__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="row__title">{row.title}</h3>
              <p className="row__desc">{row.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlatformSection() {
  return (
    <section className="section" id="platform">
      <div className="container">
        <div className="head">
          <span className="label" data-reveal="up">
            The Platform
          </span>
          <h2 className="display h-section" data-lines>
            More than a cheque.
          </h2>
          <p className="body structure-intro" data-reveal="up">
            The fund is one arm of Staunch, a cross-border venture platform connecting Africa with
            the United States, Europe and Asia, and the same team runs all of it.{" "}
            <Link className="inline-link" href="/about#team">
              Meet the team &rarr;
            </Link>
          </p>
        </div>
        <div className="pillars" data-reveal-group=".pillar" data-rules=".rule--y">
          {PLATFORM.map((p, i) => (
            <div className="pillar" key={p.title}>
              {i > 0 && <span className="rule rule--y" aria-hidden="true"></span>}
              <p className="pillar__kicker">{p.kicker}</p>
              <p className="pillar__title">{p.title}</p>
              <p className="pillar__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InvestSection() {
  return (
    <section className="section section--vast final" id="invest">
      <div className="container">
        <span className="label" data-reveal="up">
          Investors
        </span>
        <h2 className="display h-section" data-lines>
          Invest alongside us.
        </h2>
        <p className="body final-body" data-reveal="up">
          We share fund documentation privately with prospective investors.
        </p>
        <div data-reveal="up">
          <a className="cta" href={BRIEF_MAILTO} data-magnetic>
            Request the investor brief
          </a>
        </div>
        <p className="final-contact" data-reveal="fade">
          <a href={`mailto:${INVEST_EMAIL}`}>{INVEST_EMAIL}</a> &middot; Founders,{" "}
          <Link href={PITCH_URL}>pitch us here</Link>
        </p>
        <p className="final-legal" data-reveal="fade">
          Nothing on this page is an offer to sell, or a solicitation of an offer to buy, any
          security.
        </p>
      </div>
    </section>
  );
}
