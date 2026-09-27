import { Footer, MobileMenu, Nav, Overlays } from "@/components/capital/chrome";
import {
  FaqSection,
  FinalSection,
  FundSection,
  Hero,
  HowSection,
  InvestSection,
  MandateSection,
  ManifestoSection,
  Marquee,
  PlatformSection,
} from "@/components/capital/sections";
import CapitalFX from "@/components/capital/capital-fx";

export default function CapitalPage() {
  return (
    <>
      <Overlays />
      <Nav />
      <MobileMenu />
      <main id="main">
        <Hero />
        <Marquee />
        <ManifestoSection />
        <HowSection />
        <FundSection />
        <PlatformSection />
        <MandateSection />
        <InvestSection />
        <FaqSection />
        <FinalSection />
      </main>
      <Footer />
      <CapitalFX />
    </>
  );
}
