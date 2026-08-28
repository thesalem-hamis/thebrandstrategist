import AboutHero from "@/components/about/AboutHero";
import AboutJourney from "@/components/about/AboutJourney";
import CTA from "@/components/home/CTA";
import { ColorSection } from "@/components/providers/ColorSection";

export default function AboutPage() {
  return (
    <>
      <ColorSection color="#ffffff">
        <AboutHero />
      </ColorSection>

      
      <ColorSection color="#FBFAF8">
        <AboutJourney />
      </ColorSection>

      <ColorSection color="#000000">
        <CTA />
      </ColorSection>
    </>
  );
}
