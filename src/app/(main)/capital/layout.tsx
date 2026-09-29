import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./capital.css";

/*
 * Staunch Capital is a page of the main site, inside the shared nav and
 * footer. SiteShell re-themes that shell to black and gold here; this layout
 * adds the page's own type (Cormorant + Satoshi) and styles, all scoped under
 * .capital so they never reach other pages.
 */
const satoshi = localFont({
  src: [
    { path: "../../fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
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
  "Staunch Capital is a permanent capital vehicle investing $100k–$400k in disruptive African technology companies from Pre-Seed through Series A.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://www.staunchventures.com/capital" },
  openGraph: {
    type: "website",
    url: "https://www.staunchventures.com/capital",
    siteName: "Staunch Capital",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
};

export default function CapitalLayout({ children }: { children: React.ReactNode }) {
  return <div className={`capital ${satoshi.variable} ${cormorant.variable}`}>{children}</div>;
}
