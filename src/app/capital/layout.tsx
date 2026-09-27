import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./capital.css";

/*
 * Staunch Capital runs on the Kanso design language, not the Staunch Ventures
 * one: its own fonts, tokens and motion, all scoped under .capital so none of
 * it reaches the rest of the site (and Staunch's Tailwind tokens, which share
 * names like --gold and --muted, never reach in).
 */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const title = "Staunch Capital: Backing Africa's boldest founders";
const description =
  "Staunch Capital invests $100k–$400k in disruptive African technology companies from Pre-Seed through Series A, bringing foreign and domestic capital to Africa's boldest founders.";

export const metadata: Metadata = {
  metadataBase: new URL("https://capital.staunchventures.com"),
  alternates: { canonical: "/" },
  title: { absolute: title },
  description,
  applicationName: "Staunch Capital",
  // Explicit, because the root layout's `icons` would otherwise win over a
  // file-convention icon in this segment and show the orange Staunch mark.
  icons: {
    icon: "/capital-icon.svg",
    shortcut: "/capital-icon.svg",
    apple: "/capital-apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Staunch Capital",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
  colorScheme: "dark",
};

export default function CapitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`capital ${satoshi.variable} ${cormorant.variable}`}>
      {/* Pre-paint flags: must run before first render to avoid FOUC. They live
          on <html>, which the root layout marks suppressHydrationWarning. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var d=document.documentElement;d.classList.add("js");if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("reduced");else d.classList.add("is-loading");})();`,
        }}
      />
      {children}
    </div>
  );
}
