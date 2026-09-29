import {
  FundSection,
  Hero,
  InvestSection,
  PlatformSection,
  StructureSection,
  ThesisSection,
} from "@/components/capital/sections";
import CapitalFX from "@/components/capital/capital-fx";
import PatternLight from "@/components/capital/pattern-light";

export default function CapitalPage() {
  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <PatternLight />
      <Hero />
      <ThesisSection />
      <FundSection />
      <StructureSection />
      <PlatformSection />
      <InvestSection />
      <CapitalFX />
    </>
  );
}
