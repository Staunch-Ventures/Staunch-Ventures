
export type Investment = {
  companyName: string;
  sector: string;
  investedAmount: number;
  currentValue: number;
  logo: string;
};

export type Deal = {
  startupName: string;
  sector: string;
  fundingAsk: number;
  stage: string;
  logo: string;
};

export type Fund = {
  id: string;
  name: string;
  investorEquity: number; // e.g., 0.1 for 10%
  investments: Investment[];
};

export type MeetingRequest = {
  id: string;
  startupName: string;
  dateTime: Date;
  logo: string;
};

export type Investor = {
  id: string;
  name: string;
  sectors: string[];
  avatar: string;
};

const afriTech: Investment = {
    companyName: 'AfriTech Innovators',
    sector: 'FinTech',
    investedAmount: 500000,
    currentValue: 1200000,
    logo: '/logos/logo-1.svg',
};

const safariPay: Investment = {
    companyName: 'SafariPay Solutions',
    sector: 'FinTech',
    investedAmount: 750000,
    currentValue: 1500000,
    logo: '/logos/logo-2.svg',
};

const nairobiBionics: Investment = {
    companyName: 'Nairobi Bionics',
    sector: 'HealthTech',
    investedAmount: 300000,
    currentValue: 450000,
    logo: '/logos/logo-3.svg',
};

const eduVerse: Investment = {
    companyName: 'EduVerse',
    sector: 'EdTech',
    investedAmount: 1000000,
    currentValue: 3200000,
    logo: '/logos/logo-4.svg',
};

const lagosSolar: Investment = {
    companyName: 'Lagos Solar',
    sector: 'CleanTech',
    investedAmount: 600000,
    currentValue: 950000,
    logo: '/logos/logo-5.svg',
};

export const mockFunds: Fund[] = [
    {
        id: 'fintech-fund-a',
        name: 'FinTech Fund A',
        investorEquity: 0.10,
        investments: [afriTech, safariPay]
    },
    {
        id: 'healthtech-fund-b',
        name: 'HealthTech Fund B',
        investorEquity: 0.25,
        investments: [nairobiBionics]
    },
    {
        id: 'edtech-fund-b',
        name: 'EdTech Fund B',
        investorEquity: 0.12,
        investments: [eduVerse]
    },
    {
        id: 'cleantech-fund-a',
        name: 'CleanTech Fund A',
        investorEquity: 0.08,
        investments: [lagosSolar]
    },
];

export const mockInvestments: Investment[] = mockFunds.flatMap(fund => fund.investments);

export const mockDeals: Deal[] = [
  {
    startupName: 'EcoDrone',
    sector: 'AgriTech',
    fundingAsk: 250000,
    stage: 'Seed',
    logo: '/logos/logo-6.svg',
  },
  {
    startupName: 'HealthBot AI',
    sector: 'HealthTech',
    fundingAsk: 1200000,
    stage: 'Series A',
    logo: '/logos/logo-1.svg',
  },
  {
    startupName: 'FinConnect',
    sector: 'FinTech',
    fundingAsk: 800000,
    stage: 'Seed',
    logo: '/logos/logo-2.svg',
  },
  {
    startupName: 'Edify Online',
    sector: 'EdTech',
    fundingAsk: 450000,
    stage: 'Pre-Seed',
    logo: '/logos/logo-3.svg',
  },
  {
    startupName: 'QuantumLeap',
    sector: 'DeepTech',
    fundingAsk: 2500000,
    stage: 'Series A',
    logo: '/logos/logo-4.svg',
  },
  {
    startupName: 'SolarGrid',
    sector: 'CleanTech',
    fundingAsk: 1500000,
    stage: 'Series B',
    logo: '/logos/logo-5.svg',
  },
  {
    startupName: 'AquaPure',
    sector: 'CleanTech',
    fundingAsk: 300000,
    stage: 'Pre-Seed',
    logo: '/logos/logo-6.svg',
  },
  {
    startupName: 'BioSynth',
    sector: 'BioTech',
    fundingAsk: 1800000,
    stage: 'Series A',
    logo: '/logos/logo-1.svg',
  },
  {
    startupName: 'CyberShield',
    sector: 'Cybersecurity',
    fundingAsk: 950000,
    stage: 'Seed',
    logo: '/logos/logo-2.svg',
  },
  {
    startupName: 'LogisticsChain',
    sector: 'EdTech',
    fundingAsk: 600000,
    stage: 'Seed',
    logo: '/logos/logo-3.svg',
  }
];

export const mockMeetingRequests: MeetingRequest[] = [
  {
    id: 'req1',
    startupName: 'HealthBot AI',
    dateTime: new Date('2026-03-05T10:00:00'),
    logo: '/logos/logo-1.svg',
  },
  {
    id: 'req2',
    startupName: 'FinConnect',
    dateTime: new Date('2026-03-05T14:30:00'),
    logo: '/logos/logo-2.svg',
  },
  {
    id: 'req3',
    startupName: 'EcoDrone',
    dateTime: new Date('2026-03-08T11:00:00'),
    logo: '/logos/logo-6.svg',
  }
];

export const mockInvestors: Investor[] = [
  {
    id: "inv1",
    name: "Oliver Christodoulou",
    sectors: ["EdTech", "HealthTech", "AgriTech", "CleanTech"],
    avatar: "https://picsum.photos/seed/user-avatar/100/100",
  },
  {
    id: "inv2",
    name: "Venture Partner 1",
    sectors: ["FinTech", "DeepTech", "Cybersecurity"],
    avatar: "https://picsum.photos/seed/vp1-avatar/100/100",
  },
  {
    id: "inv3",
    name: "Venture Partner 2",
    sectors: ["BioTech", "AgriTech", "HealthTech"],
    avatar: "https://picsum.photos/seed/vp2-avatar/100/100",
  },
  {
    id: "inv4",
    name: "Limited Partner 1",
    sectors: ["FinTech", "EdTech"],
    avatar: "https://picsum.photos/seed/lp1-avatar/100/100",
  },
  {
    id: "inv5",
    name: "Limited Partner 2",
    sectors: ["CleanTech", "HealthTech"],
    avatar: "https://picsum.photos/seed/lp2-avatar/100/100",
  },
];
