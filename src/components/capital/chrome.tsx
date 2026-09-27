import { INVEST_EMAIL, PITCH_URL } from "@/lib/intake";
import { mainUrl } from "@/lib/sites";
import { CapitalLockup, CapitalLogo } from "./marks";

/** The parent site's home. Absolute on production, where "/" is this page. */
const MAIN_SITE = mainUrl("/");
/* Team, mission and the rest of the shared context live on the parent site
   only; the fund links there rather than repeating them. */
const TEAM_URL = mainUrl("/about#team");
export const BRIEF_MAILTO = `mailto:${INVEST_EMAIL}?subject=${encodeURIComponent(
  "Staunch Capital: investor brief",
)}`;
export { INVEST_EMAIL, PITCH_URL };

const LINKS = [
  { href: "#thesis", label: "Thesis" },
  { href: "#fund", label: "The Fund" },
  { href: "#mandate", label: "Mandate" },
  { href: "#faq", label: "FAQ" },
];

export function Overlays() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="preloader" id="preloader" aria-hidden="true">
        <div className="preloader__mark">
          <CapitalLogo className="preloader__word" />
          <span className="preloader__line"></span>
        </div>
      </div>

      <div className="grain" aria-hidden="true"></div>

      <div className="progress" aria-hidden="true">
        <div className="progress__fill" id="scrollProgress"></div>
      </div>

      <div className="cursor-ring" aria-hidden="true"></div>
      <div className="cursor-dot" aria-hidden="true"></div>
    </>
  );
}

export function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav__inner">
        <a className="brand" href="#top" aria-label="Staunch Capital, back to top">
          <CapitalLockup />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {/* The way home. Set apart by a hairline so it reads as leaving the
              fund, not as another section of it. */}
          <a className="nav__parent" href={MAIN_SITE}>
            <span aria-hidden="true">&larr;</span> Staunch Ventures
          </a>
          {LINKS.map((l) => (
            <a className="nav__link" href={l.href} key={l.href}>
              {l.label}
            </a>
          ))}
          <a className="nav__link" href={TEAM_URL}>
            Team
          </a>
          <a className="nav__cta" href="#invest">
            Investor brief
          </a>
        </nav>
        <button
          className="burger"
          id="burger"
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu" aria-hidden="true">
      <button className="mobile-menu__close" id="menuClose" type="button" aria-label="Close menu">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {LINKS.map((l) => (
        <a href={l.href} data-menu-link key={l.href}>
          {l.label}
        </a>
      ))}
      <a href={TEAM_URL}>Team</a>
      <a className="cta" href="#invest" data-menu-link>
        Request the investor brief
      </a>
      <a className="mobile-menu__parent" href={MAIN_SITE}>
        &larr; Back to Staunch Ventures
      </a>
      <p className="mobile-menu__meta">
        <a href={`mailto:${INVEST_EMAIL}`}>{INVEST_EMAIL}</a> &middot; South Africa{" "}
        <span data-time></span>
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__meta">
          &copy; {new Date().getFullYear()} Staunch Capital &middot; A Staunch fund &middot;{" "}
          <span className="footer__time" data-time></span>
        </p>
        <nav className="footer__links" aria-label="Footer">
          <a href={MAIN_SITE}>Staunch Ventures</a>
          <a href={TEAM_URL}>Team</a>
          <a href={mainUrl(PITCH_URL)}>Pitch</a>
          <a href={BRIEF_MAILTO}>Investor brief</a>
          <a href="https://www.linkedin.com/company/staunchventures" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
