import { Fragment } from "react";
import { BarGhost, BarSymbol } from "./marks";
import { BRIEF_MAILTO, INVEST_EMAIL, MAIN_SITE, PITCH_URL } from "./chrome";

/* ------------------------------------------------------------------ copy -- */

const TERMS = [
  { key: "Vehicle", value: "Permanent capital vehicle" },
  { key: "Cheque size", value: "$100k – $400k" },
  { key: "Stage", value: "Pre-Seed through Series A" },
  { key: "Focus", value: "African technology companies" },
  { key: "Reach", value: "Africa, the United States and Europe" },
];

const MARQUEE = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Permanent capital",
  "Africa",
  "United States",
  "Europe",
  "Patient by design",
];

const WHY = [
  {
    title: "No forced exits",
    desc: "A closed-end fund has to sell when its term runs out, whatever a company is worth that year. We have no term, so we can hold our best companies for as long as holding is the right call.",
  },
  {
    title: "Returns go back to work",
    desc: "Proceeds from exits can be recycled into new investments instead of wound down, so the capacity to back founders builds with the track record rather than resetting every vintage.",
  },
  {
    title: "A horizon that fits the market",
    desc: "African technology rewards patience. Exits take longer, and the best companies often compound quietly for years before anyone notices them. Permanent capital is built for that timeline.",
  },
  {
    title: "One investor, for the life of the company",
    desc: "No Fund I, Fund II, Fund III, each with its own clock and its own agenda. Founders deal with the same vehicle from the first cheque onward.",
  },
];

const PLATFORM = [
  {
    num: "01",
    meta: "Staunch Ventures",
    title: "Source",
    body: "Our 0-to-1 venture studio and co-investment network work alongside African founders from day zero, so we see companies long before they reach a data room.",
    deliverable: "Deal flow built, not bought",
  },
  {
    num: "02",
    meta: "Staunch Capital",
    title: "Invest",
    body: "The fund writes $100k–$400k cheques from Pre-Seed through Series A into the technology companies that clear our mandate, and then holds.",
    deliverable: "Early ownership, held patiently",
  },
  {
    num: "03",
    meta: "Africa · US · Europe",
    title: "Scale",
    body: "As companies grow, the Staunch network syndicates follow-on rounds from Seed through Pre-IPO and opens routes to customers and capital in the United States and Europe.",
    deliverable: "Global market access from the first cheque",
  },
];

const POINTS = [
  {
    title: "Evergreen by design",
    body: "No fixed term and no forced exits. Capital stays invested while the portfolio compounds.",
  },
  {
    title: "Early entry",
    body: "Ownership from Pre-Seed to Series A, the stages where the Staunch platform has its deepest access.",
  },
  {
    title: "Cross-border upside",
    body: "Portfolio companies get routes into US and European markets through the wider Staunch network.",
  },
];

const FAQS = [
  {
    q: "What is a permanent capital vehicle?",
    a: "An investment vehicle with no fixed end date. A traditional venture fund raises money, invests it, and has to hand it back within roughly ten years, which forces sales on a timetable. A permanent capital vehicle can hold investments for as long as it makes sense and reinvest what it earns, so decisions follow the company's trajectory rather than the fund's calendar.",
  },
  {
    q: "How large are your cheques?",
    a: "Between $100k and $400k, from Pre-Seed through Series A.",
  },
  {
    q: "How does Staunch Capital relate to Staunch Ventures?",
    a: "Both are part of Staunch, a cross-border venture platform connecting Africa, the United States and Europe. Staunch Ventures is the 0-to-1 venture studio and co-investment network, sourcing and syndicating deals from Seed through Pre-IPO. Staunch Capital is the platform's first fund.",
  },
  {
    q: "Do you invest outside Africa?",
    a: "The mandate requires an African nexus: operating in Africa, or based in or actively expanding into South Africa. Companies can, and often should, sell into the US and Europe. That's where the rest of the platform comes in.",
  },
  {
    q: "How do founders apply?",
    a: "Through the Staunch pitch form. It asks for your deck and a few mandate questions, and applications that fit go straight into our pipeline.",
  },
  {
    q: "Who can invest in the fund?",
    a: "We speak with prospective investors individually. Get in touch and we'll walk you through the structure and share the fund documentation.",
  },
];

/* -------------------------------------------------------------- sections -- */

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow"></div>
        <div className="hero-vignette"></div>
        <div className="hero-mark">
          <BarSymbol id="heroMark" />
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-meta" data-hero>
          <span className="label">Staunch Capital</span>
          <span className="hero-meta__sub">
            Permanent Capital Vehicle &middot; Pre-Seed to Series A &middot; South Africa{" "}
            <span data-time></span>
          </span>
        </div>
        <h1 className="hero-headline" data-lines>
          Permanent capital for Africa&rsquo;s technology founders.
        </h1>
        <p className="hero-body" data-hero>
          $100k&ndash;$400k cheques into African technology startups, from Pre-Seed through
          Series A, from a fund that never has to sell.
        </p>
        <div className="hero-cta-row" data-hero>
          <a className="cta" href="#invest" data-magnetic>
            Request the investor brief
          </a>
          <a className="textlink" href="#fund">
            or read the terms &darr;
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

function MarqueeGroup() {
  return (
    <div className="marquee__group">
      {MARQUEE.map((word) => (
        <Fragment key={word}>
          <span className="marquee__item">{word}</span>
          <span className="marquee__dot">&#9679;</span>
        </Fragment>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}

export function FundSection() {
  return (
    <section className="section" id="fund">
      <div className="container container--wide">
        <div className="head" data-depth="0.05">
          <span className="label" data-reveal="up">
            <span className="label__num">01</span>The Fund
          </span>
          <h2 className="display h-section" data-lines>
            A venture fund with no end date.
          </h2>
        </div>
        {/* A term sheet, written in: hairline draws, numeral lands, terms follow. */}
        <dl className="rows rows--terms" data-reveal-group=".row" data-rules=".rule--x">
          {TERMS.map((t, i) => (
            <div className="row" key={t.key}>
              <span className="rule rule--x" aria-hidden="true"></span>
              <span className="row__num num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="row__key">{t.key}</dt>
              <dd className="row__main">
                <span className="row__line">{t.value}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="body problem-outro" data-reveal="up">
          Staunch Capital is the first fund from Staunch, a cross-border venture platform connecting
          Africa, the United States and Europe to give high-growth founders and investors capital,
          execution and global market access.
        </p>
      </div>
    </section>
  );
}

export function ManifestoSection() {
  return (
    <section className="section section--vast manifesto plate--deep" id="thesis">
      <div className="container container--narrow">
        <span className="label" data-reveal="up">
          <span className="label__num">02</span>The Thesis
        </span>
        <p className="manifesto__text" data-scrub-words>
          Most venture funds are built to leave. A ten-year clock starts the day the money arrives,
          and every decision after that bends toward the exit. Staunch Capital is a{" "}
          <em>permanent capital vehicle</em>. There is no clock. We back African founders early
          and stay while the value compounds.
        </p>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="section" id="why">
      <div className="container container--wide">
        <div className="head head--offset">
          <h2 className="display h-section" data-lines>
            Built for how African companies actually grow.
          </h2>
          <span className="label" data-reveal="right">
            <span className="label__num">03</span>Why Permanent
          </span>
        </div>
        <div className="rows rows--folio" data-reveal-group=".row">
          {WHY.map((row, i) => (
            <div className="row" key={row.title}>
              <span
                className="row__num"
                aria-hidden="true"
                data-depth={(0.03 + i * 0.012).toFixed(3)}
              >
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
    <section className="section section--ground section--scrim" id="platform">
      <BarGhost placement="upper-right" depth={0.11} />
      <div className="container">
        <div className="head head--rail">
          <span className="label" data-reveal="up">
            <span className="label__num">04</span>The Platform
          </span>
          <h2 className="display h-section" data-lines>
            A fund inside a cross-border platform.
          </h2>
        </div>
        <div className="process">
          <div className="process-line" aria-hidden="true">
            <div className="process-line__fill" id="processFill"></div>
          </div>
          {PLATFORM.map((step) => (
            <article className="pstep" data-reveal="up" key={step.num}>
              <div className="pstep__meta">
                <span className="num">{step.num}</span>
                <p className="pstep__days">{step.meta}</p>
              </div>
              <div className="pstep__main">
                <h3 className="pstep__title">{step.title}</h3>
                <p className="pstep__body">{step.body}</p>
                <p className="pstep__deliverable">{step.deliverable}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MandateSection() {
  return (
    <section className="section" id="mandate">
      <div className="container">
        <div className="head head--split">
          <span className="label" data-reveal="up">
            <span className="label__num">05</span>The Mandate
          </span>
          <h2 className="display h-section" data-lines>
            What we back, and what we don&rsquo;t.
          </h2>
          <p className="head__aside" data-reveal="right">
            A narrow mandate, applied the same way to every application. It&rsquo;s checked before a
            pitch reaches the team, so nobody waits weeks for an answer we could give today.
          </p>
        </div>
        <div className="who-grid">
          <div className="who-col who-col--primary" data-reveal="left">
            <p className="who-col__label">We invest in</p>
            <ul className="dash-list">
              <li>For-profit technology and tech-enabled companies.</li>
              <li>Pre-Seed, Seed and Series A rounds.</li>
              <li>Companies operating in Africa, or based in or expanding into South Africa.</li>
              <li>Businesses that sell to consumers and companies: B2C, B2B and B2B2C.</li>
            </ul>
          </div>
          <div className="who-col who-col--secondary" data-reveal="right">
            <p className="who-col__label">Outside our mandate</p>
            <ul className="dash-list">
              <li>Non-profits and public entities.</li>
              <li>Companies selling primarily to government.</li>
              <li>Businesses that aren&rsquo;t technology-driven.</li>
              <li>Series B and later rounds.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InvestSection() {
  return (
    <section className="section section--vast section--ground section--scrim consult plate" id="invest">
      <BarGhost placement="left" depth={0.12} />
      <div className="container">
        <div className="head">
          <span className="label" data-reveal="up">
            <span className="label__num">06</span>Invest in the Fund
          </span>
          <h2 className="display h-section" data-lines>
            Long-term exposure to African technology.
          </h2>
        </div>
        <p className="body consult__body" data-reveal="up">
          Staunch Capital gives investors direct, long-term exposure to early-stage African
          technology, sourced and supported by a platform that works across three continents. We
          share fund documentation privately with prospective investors.
        </p>
        <div className="consult-points" data-reveal-group=".point" data-rules=".rule--y">
          {POINTS.map((p, i) => (
            <div className="point" key={p.title}>
              {i > 0 && <span className="rule rule--y" aria-hidden="true"></span>}
              <p className="point__title">{p.title}</p>
              <p className="point__body">{p.body}</p>
            </div>
          ))}
        </div>
        <div data-reveal="up">
          <a className="cta" href={BRIEF_MAILTO} data-magnetic>
            Request the investor brief
          </a>
        </div>
        <p className="consult__note" data-reveal="fade">
          Conversations with prospective investors are private. Nothing on this page is an offer to
          sell, or a solicitation of an offer to buy, any security.
        </p>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <div className="head">
          <span className="label" data-reveal="up">
            <span className="label__num">07</span>Questions
          </span>
          <h2 className="display h-section" data-lines>
            What founders and investors ask first.
          </h2>
        </div>
        <div className="faq-list" data-reveal-group=".faq-item" data-rules=".rule--x">
          {FAQS.map((item, i) => {
            const n = i + 1;
            return (
              <div className="faq-item" key={item.q}>
                <span className="rule rule--x" aria-hidden="true"></span>
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded="false"
                  aria-controls={`faq-a-${n}`}
                  id={`faq-q-${n}`}
                >
                  <span className="faq-q__text">{item.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
                <div className="faq-a" id={`faq-a-${n}`} role="region" aria-labelledby={`faq-q-${n}`}>
                  <div className="faq-a__inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalSection() {
  return (
    /* The page closes on the only mark you see whole. Every ground above it is
       cropped by an edge; this one is contained and complete. */
    <section className="section section--vast section--ground final" id="contact">
      <BarGhost placement="seal" depth={0.05} />
      <div className="container">
        <span className="label" data-reveal="up">
          <span className="label__num">08</span>Get in Touch
        </span>
        <h2 className="display h-section" data-lines>
          Capital that stays.
        </h2>
        <p className="body final-body" data-reveal="up">
          Whether you&rsquo;re building an African technology company or looking to invest
          alongside us, the first step is a conversation.
        </p>
        <div className="hero-cta-row" data-reveal="up">
          <a className="cta" href={BRIEF_MAILTO} data-magnetic>
            Request the investor brief
          </a>
          <a className="textlink" href={PITCH_URL}>
            Founders: pitch Staunch Capital &rarr;
          </a>
        </div>
        <p className="final-contact" data-reveal="fade">
          Prefer email? <a href={`mailto:${INVEST_EMAIL}`}>{INVEST_EMAIL}</a> &middot; Part of{" "}
          <a href={MAIN_SITE}>Staunch</a>
        </p>
      </div>
    </section>
  );
}
