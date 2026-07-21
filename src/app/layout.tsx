import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Body copy + UI. Preloaded — it paints above the fold everywhere.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace is only used inside charts (chart.tsx), never above the fold.
// preload:false keeps it out of the critical request chain so it doesn't
// contend with the body/heading fonts for bandwidth on first paint.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

// Editorial display serif — the hero heading (LCP element on most pages).
// Keep it preloaded so the largest text paints without a late font swap.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = "https://staunchventures.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Staunch Ventures: Backing Africa's Boldest Founders",
    template: "%s · Staunch Ventures",
  },
  description:
    "A cross-border network for Africa's tech startups. Capital, expertise, and operators who've scaled before.",
  applicationName: "Staunch Ventures",
  authors: [{ name: "Staunch Ventures" }],
  keywords: [
    "Staunch Ventures",
    "Africa venture capital",
    "EdTech",
    "HealthTech",
    "African startups",
    "Venture studio",
  ],
  icons: {
    icon: "/Icon.png",
    shortcut: "/Icon.png",
    apple: "/Icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Staunch Ventures",
    title: "Staunch Ventures: Backing Africa's Boldest Founders",
    description:
      "A cross-border network for Africa's tech startups. Capital, expertise, and operators who've scaled before.",
    images: [
      {
        url: "/logo-square.png",
        width: 1200,
        height: 1200,
        alt: "Staunch Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Staunch Ventures: Backing Africa's Boldest Founders",
    description:
      "A cross-border network for Africa's tech startups.",
    images: ["/logo-square.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${mono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
