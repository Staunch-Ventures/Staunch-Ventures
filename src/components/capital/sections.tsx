import { BRIEF_MAILTO, INVEST_EMAIL, PITCH_URL, TEAM_URL } from "./chrome";
import { mainUrl } from "@/lib/sites";

/*
 * Staunch Capital is a fund page, not a brochure. Each block answers one
 * question a prospective investor arrives with, and nothing else:
 *   Hero    — what is this?
 *   Thesis  — why this fund?
 *   Fund    — what exactly? (the terms, and who stands behind it)
 *   Invest  — how do I get in?
 * Team, mission and the wider platform live on the main site; this page links
 * there instead of repeating them.
 */

const TERMS = [
  { key: "Focus", value: "Disruptive African technology" },
  { key: "Stage", value: "Pre-Seed to Series A" },
  { key: "Cheque size", value: "$100k – $400k" },
  { key: "Vehicle", value: "Permanent capital vehicle" },
  { key: "Reach", value: "Africa, the US, Europe and Asia" },
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
          We invest in disruptive technology companies across Africa, from Pre-Seed to Series A.
        </p>
        <div className="hero-cta-row" data-hero>
          <a className="cta" href="#invest" data-magnetic>
            Request the investor brief
          </a>
          <a className="textlink" href={TEAM_URL}>
            or meet the team &rarr;
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
        <p className="body fund-note" data-reveal="fade">
          Staunch Capital is part of <a href={mainUrl("/")}>Staunch</a>, a cross-border venture
          platform connecting Africa with the United States, Europe and Asia.{" "}
          <a href={TEAM_URL}>Meet the team &rarr;</a>
        </p>
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
          <a href={mainUrl(PITCH_URL)}>pitch us here</a>
        </p>
        <p className="final-legal" data-reveal="fade">
          Nothing on this page is an offer to sell, or a solicitation of an offer to buy, any
          security.
        </p>
      </div>
    </section>
  );
}
