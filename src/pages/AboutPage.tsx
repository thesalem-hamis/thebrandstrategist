import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
// import AboutFramework from "@/components/about/AboutFramework";
import AboutJourney from "@/components/about/AboutJourney";
import CTA from "@/components/home/CTA";
import { ColorSection } from "@/components/providers/ColorSection";


export default function AboutPage() {
  return (
    <>
      <ColorSection color="#ffffff">
        <AboutHero />
      </ColorSection>

      <ColorSection color="#ffffff">
        <AboutStory />
      </ColorSection>

      {/* <ColorSection color="#FBFAF8">
        <AboutFramework />
      </ColorSection> */}

      <ColorSection color="#ffffff">
        <AboutJourney />
      </ColorSection>

      <ColorSection color="#000000">
        <CTA />
      </ColorSection>
    </>
  );
}