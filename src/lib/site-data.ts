
export type Initiative = {
  title: string;
  description: string;
  slug?: string;
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
    description: "Our flagship annual pitch competition connecting the most promising startups with global investors.",
    logo: "/gitr-logo.png",
    logoHint: "colorful logo",
  },
{
    title: "Founder House Cape Town",
    description: "Bringing together a group of international founders to immerse in the Cape Town ecosystem - meet other founders and build a global Network of Networks.",
  },
];
