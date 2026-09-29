import { Footer, MobileMenu, Nav, Overlays } from "@/components/capital/chrome";
import { FundSection, Hero, InvestSection, ThesisSection } from "@/components/capital/sections";
import CapitalFX from "@/components/capital/capital-fx";
import PatternLight from "@/components/capital/pattern-light";

export default function CapitalPage() {
  return (
    <>
      <Overlays />
      <PatternLight />
      <Nav />
      <MobileMenu />
      <main id="main">
        <Hero />
        <ThesisSection />
        <FundSection />
        <InvestSection />
      </main>
      <Footer />
      <CapitalFX />
    </>
  );
}
