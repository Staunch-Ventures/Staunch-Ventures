
/**
 * A photograph of the team on the ground, rendered via <FieldImage>. Leave
 * `src` unset until the real photo is ready — the slot renders a styled
 * placeholder (with `hint` describing the shot that belongs there) so layout
 * and captions can be judged before the photography lands.
 */
export type FieldPhoto = {
  src?: string;
  alt: string;
  /** Small uppercase label, e.g. "Founder House". */
  eyebrow?: string;
  /** Documentary caption: place + event + date, e.g. "Cape Town — March 2026". */
  caption?: string;
  /** Placeholder-only note describing the intended shot. */
  hint?: string;
};

export type Initiative = {
  title: string;
  description: string;
  /** Short category label shown as a badge above the title. */
  tag?: string;
  /** Links to a dedicated detail page at /ecosystem/<slug>. */
  slug?: string;
  /** Fallback CTA link when there's no detail page (e.g. /contact). */
  href?: string;
  /** Label for the card's call-to-action. */
  ctaLabel?: string;
  /** Concrete facts shown as small chips (e.g. "15 founders", "Cape Town"). */
  meta?: string[];
  /** On-the-ground photo shown at the top of the initiative card. */
  photo?: FieldPhoto;
  logo?: string;
  logoHint?: string;
};

export type GrowthPartner = {
    name: string;
    tag: string;
    description: string;
    logo: string;
    logoHint: string;
    website: string;
};

export type Video = {
  /** The YouTube video ID — the part after `watch?v=` or `youtu.be/`. */
  youtubeId: string;
  title: string;
  description: string;
  /** Optional grouping label shown as a badge (e.g. "Founder Story", "Event"). */
  category?: string;
};

export type Venture = {
  companyName: string;
  sector: string;
  description: string;
  logo: string;
  logoHint: string;
  slug?: string;
  website?: string;
};

/**
 * Startups the Staunch team has personally cofounded across their careers —
 * all revenue-generating. A team track-record stat (distinct from the current
 * `ventures` portfolio), used to prove operator credibility in the hero.
 */
export const startupsCofounded = 11;

export const ventures: Venture[] = [
  {
    companyName: 'Bag Learning',
    sector: 'EDTECH',
    description: 'Bag Learning helps South African university students study more effectively and efficiently, building an all-in-one platform that enhances personalised learning.',
    logo: '/bag-learning-logo.png',
    logoHint: 'abstract logo purple',
    slug: 'bag-learning',
    website: 'https://www.baglearning.com',
  },
];

export const growthPartners: GrowthPartner[] = [
    {
        name: "Unknown Group",
        tag: "Ecosystem Enabler",
        description: "A global venture engine that partners with industry leaders to find, fund, and scale impact-driven startups to solve global challenges.",
        logo: "/unknown-logo.svg",
        logoHint: "abstract logo",
        website: "https://unknowngroup.com/"
    },
    {
        name: "Youth Energy Summit",
        tag: "Events Company",
        description: "The world's largest Youth Gathering in the Energy Sector.",
        logo: "/yes-logo.png",
        logoHint: "minimalist logo",
        website: "https://youth-energy-summit.com/"
    },
    {
        name: "Unknown University of Applied Sciences",
        tag: "Academic Institution",
        description: "Europe's #1 university for future founders.",
        logo: "/unknown-university-logo.png",
        logoHint: "university logo",
        website: "https://www.unknown-universityas.com/"
    },
    {
        name: "Get In The Ring",
        tag: "Pitch Competition",
        description: "A global startup competition that connects founders with industry leaders and investors to help them scale their solutions to real-world challenges.",
        logo: "/gitr-logo.png",
        logoHint: "colorful logo",
        website: "https://getinthering.co/"
    },
    {
        name: "Akela Hub",
        tag: "Tech Giant",
        description: "An AI-powered solutions provider that intelligently connects the business ecosystem by building teams, generating leads, and sparking collaborations.",
        logo: "/akela-hub-logo.jpeg",
        logoHint: "tech logo abstract",
        website: "https://www.akelahub.com/"
    },
    {
        name: "AQVC",
        tag: "Venture Capital",
        description: "A tech-enabled Fund of Funds democratising investor access to the world's leading venture capital funds.",
        logo: "/aqvc-logo.jpeg",
        logoHint: "geometric logo",
        website: "https://www.aqvc.com/"
    },
];

export const initiatives: Initiative[] = [
  {
    title: "Get In The Ring",
    slug: "get-in-the-ring",
    tag: "Pitch Competition",
    description: "Our flagship pitch competition, run with the global Get In The Ring platform. We put Africa's most promising founders on stage in front of international investors and partners.",
    ctaLabel: "View initiative",
    meta: ["Pan-African", "Global investors", "Annual"],
    photo: {
      alt: "Founders pitching on stage at Get In The Ring",
      eyebrow: "On stage",
      caption: "Get In The Ring — Cape Town",
      hint: "Wide shot of the pitch stage or the room mid-event",
    },
    logo: "/gitr-logo.png",
    logoHint: "colorful logo",
  },
  {
    title: "Founder House Cape Town",
    tag: "Founder Immersion",
    description: "Fifteen international founders, one city, one month. Each cohort embeds inside Cape Town's startup ecosystem — connecting with local founders, operators and investors to build a genuine network of networks across borders.",
    href: "/contact",
    ctaLabel: "Express interest",
    meta: ["15 founders", "Cape Town", "Cross-border"],
    photo: {
      alt: "Founder House cohort working together in Cape Town",
      eyebrow: "The house",
      caption: "Cohort in session — Cape Town",
      hint: "Candid of the cohort working or exploring the city",
    },
  },
];

/**
 * "In the field" filmstrip on the /team page — candid shots of the team on
 * the ground at events, inside ventures, and with partners. Captions follow
 * the documentary format: place + event (+ date once known). Keep this
 * curated — rotate photos in and out rather than appending forever; five or
 * six strong shots beat twenty average ones.
 */
export const fieldPhotos: FieldPhoto[] = [
  {
    alt: "The Staunch team at the Get In The Ring finals",
    eyebrow: "Pitch night",
    caption: "Get In The Ring — Cape Town",
    hint: "Team on the floor at GITR finals",
  },
  {
    alt: "Working session inside Bag Learning",
    eyebrow: "On-site",
    caption: "With Bag Learning — Stellenbosch",
    hint: "Hands-on working session inside a venture",
  },
  {
    alt: "Founder House cohort session in Cape Town",
    eyebrow: "Founder House",
    caption: "Cohort session — Cape Town",
    hint: "Candid from inside the house",
  },
  {
    alt: "The team with partners at the Youth Energy Summit",
    eyebrow: "Ecosystem",
    caption: "Youth Energy Summit",
    hint: "With partners at YES",
  },
  {
    alt: "Mentor circle round table in progress",
    eyebrow: "Mentor circle",
    caption: "Founder round table",
    hint: "Mid-conversation, whiteboard or table visible",
  },
];

/**
 * Videos featured on the /media page. To add one, grab the YouTube video ID
 * (the part after `watch?v=` or `youtu.be/`) and append an entry — no layout
 * changes needed. The page renders them in order, so newest on top.
 */
export const videos: Video[] = [
  {
    youtubeId: "cXA8hpsCVrE",
    title: "Always Keep on Walking & Iterating with Venture Builder Oliver Christodoulou | Unknown Stories Ep.2",
    description: "Venture builder Oliver Christodoulou on iterating relentlessly and building through uncertainty.",
    category: "Podcast",
  },
  {
    youtubeId: "zoG-X2a3Rtc",
    title: "Real Talk About Raising Money in Africa",
    description: "An honest conversation about what it really takes to raise capital as a founder on the continent.",
    category: "Podcast",
  },
];
