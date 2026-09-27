import { Fragment } from "react";
import { BRIEF_MAILTO, INVEST_EMAIL, PITCH_URL } from "./chrome";
import { mainUrl } from "@/lib/sites";

/* ------------------------------------------------------------------ copy -- */

const TERMS = [
  { key: "Focus", value: "Disruptive African technology" },
  { key: "Stage", value: "Pre-Seed through Series A" },
  { key: "Cheque size", value: "$100k – $400k" },
  { key: "Reach", value: "Africa, the US, Europe and Asia" },
  { key: "Vehicle", value: "Permanent capital vehicle" },
];

const MARQUEE = [
  "Bold founders",
  "Disruptive technology",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Africa",
  "United States",
  "Europe",
  "Asia",
];

/* The fund's structure is one reason among four, not the headline. */
const HOW = [
  {
    title: "Early, and with conviction",
    desc: "We come in from Pre-Seed to Series A, when a $100k–$400k cheque and a clear yes change what a company can do next.",
  },
  {
    title: "Cross-border from the first cheque",
    desc: "Portfolio companies get routes to customers, partners and follow-on capital in the United States, Europe and Asia through the wider Staunch platform.",
  },
  {
    title: "Operators alongside the capital",
    desc: "The team behind the fund builds companies through Staunch Ventures. Founders get people who have scaled before, not just a name on the cap table.",
  },
  {
    title: "Capital that stays",
    desc: "Staunch Capital is a permanent capital vehicle. No fund clock forces an exit, so we can keep backing founders for as long as they're building something worth backing.",
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
    body: "The fund writes $100k–$400k cheques from Pre-Seed through Series A into the disruptive technology companies that clear our mandate.",
    deliverable: "Early ownership in Africa's boldest founders",
  },
  {
    num: "03",
    meta: "Africa · US · Europe · Asia",
    title: "Scale",
    body: "As companies grow, the Staunch network syndicates follow-on rounds from Seed through Pre-IPO and opens routes to customers and capital in the United States, Europe and Asia.",
    deliverable: "Global market access from the first cheque",
  },
];

const POINTS = [
  {
    title: "Africa's boldest founders",
    body: "Early ownership in disruptive technology companies, from Pre-Seed to Series A.",
  },
  {
    title: "Access you can't buy",
    body: "Deal flow from the Staunch studio and network, which work with founders from day zero.",
  },
  {
    title: "Cross-border upside",
    body: "Portfolio companies get routes into the US, Europe and Asia through the wider Staunch platform.",
  },
];

const FAQS = [
  {
    q: "What does Staunch Capital invest in?",
    a: "Disruptive technology companies with an African nexus, from Pre-Seed through Series A, with cheques of $100k to $400k.",
  },
  {
    q: "Who is behind the fund?",
    a: "The Staunch team, who also run the Staunch Ventures studio and co-investment network. You can meet them on the main Staunch site.",
  },
  {
    q: "How does Staunch Capital relate to Staunch Ventures?",
    a: "Both are part of Staunch, a cross-border venture platform connecting Africa with the United States, Europe and Asia. Staunch Ventures is the 0-to-1 venture studio and co-investment network, sourcing and syndicating deals from Seed through Pre-IPO. Staunch Capital is the platform's fund.",
  },
  {
    q: "Do you invest outside Africa?",
    a: "The mandate requires an African nexus: operating in Africa, or based in or actively expanding into South Africa. Companies can, and often should, sell into the US, Europe and Asia. That's where the rest of the platform comes in.",
  },
  {
    q: "What is a permanent capital vehicle?",
    a: "An investment vehicle with no fixed end date. A traditional venture fund raises money, invests it, and has to hand it back within roughly ten years, which forces sales on a timetable. A permanent capital vehicle can hold investments for as long as it makes sense and reinvest what it earns, so decisions follow the company's trajectory rather than the fund's calendar.",
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
      </div>
      <div className="hero-content">
        <div className="hero-meta" data-hero>
          <span className="label">Staunch Capital</span>
          <span className="hero-meta__sub">
            Pre-Seed to Series A &middot; Disruptive African technology &middot; South Africa{" "}
            <span data-time></span>
          </span>
        </div>
        <h1 className="hero-headline" data-lines>
          Backing Africa&rsquo;s boldest founders.
        </h1>
        <p className="hero-body" data-hero>
          Staunch Capital invests $100k&ndash;$400k in disruptive technology companies from
          Pre-Seed through Series A, bringing foreign and domestic capital to the founders
          building Africa&rsquo;s next category leaders.
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
            <span className="label__num">03</span>The Fund
          </span>
          <h2 className="display h-section" data-lines>
            The fund at a glance.
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
          Staunch Capital is the fund of Staunch, a cross-border venture platform connecting Africa
          with the United States, Europe and Asia to give high-growth founders and investors
          capital, execution and global market access.
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
          <span className="label__num">01</span>The Thesis
        </span>
        <p className="manifesto__text" data-scrub-words>
          The technology companies that will define Africa&rsquo;s next decade are being started
          now, by founders rebuilding education, health, finance and energy for more than a billion
          people. We exist to back <em>Africa&rsquo;s boldest founders</em> early, bring foreign
          and domestic capital to them, and connect them to the United States, Europe and Asia from
          day one.
        </p>
      </div>
    </section>
  );
}

export function HowSection() {
  return (
    <section className="section" id="how">
      <div className="container container--wide">
        <div className="head head--offset">
          <h2 className="display h-section" data-lines>
            How we back founders.
          </h2>
          <span className="label" data-reveal="right">
            <span className="label__num">02</span>Our Approach
          </span>
        </div>
        <div className="rows rows--folio" data-reveal-group=".row">
          {HOW.map((row, i) => (
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
    <section className="section" id="platform">
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
              <li>Disruptive, for-profit technology and tech-enabled companies.</li>
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
    <section className="section section--vast consult plate" id="invest">
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
          Staunch Capital brings foreign and domestic capital into South African and African
          technology, sourced and supported by a platform working across four markets. We share
          fund documentation privately with prospective investors.
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
        <p className="consult__team" data-reveal="fade">
          <a className="textlink" href={mainUrl("/about#team")}>
            Meet the team behind the fund &rarr;
          </a>
        </p>
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
    <section className="section section--vast final" id="contact">
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
          <a className="textlink" href={mainUrl(PITCH_URL)}>
            Founders: pitch Staunch Capital &rarr;
          </a>
        </div>
        <p className="final-contact" data-reveal="fade">
          Prefer email? <a href={`mailto:${INVEST_EMAIL}`}>{INVEST_EMAIL}</a> &middot; Part of{" "}
          <a href={mainUrl("/")}>Staunch</a>
        </p>
      </div>
    </section>
  );
}
