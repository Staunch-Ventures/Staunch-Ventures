import { Footer, MobileMenu, Nav, Overlays } from "@/components/capital/chrome";
import {
  FaqSection,
  FinalSection,
  FundSection,
  Hero,
  InvestSection,
  MandateSection,
  ManifestoSection,
  Marquee,
  PlatformSection,
  WhySection,
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
        <FundSection />
        <ManifestoSection />
        <WhySection />
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
