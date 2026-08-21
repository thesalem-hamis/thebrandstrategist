import About from "@/components/home/About";
import CTA from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import HowIWork from "@/components/home/HowIWork";
import Partner from "@/components/home/Partners";
import Pricing from "@/components/home/Pricing";
import Service from "@/components/home/Service";
import Testimonials from "@/components/home/Testimonials";
import Work from "@/components/home/work";
import Footer from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollColorProvider } from "@/components/providers/ScrollColorContext";
import { ColorSection } from "@/components/providers/ColorSection";
import { BackgroundLayer } from "@/components/layouts/BackgroundLayer";
import { ScrollProgress } from "@/components/layouts/ScrollProgress";

export default function AppRouter() {
  return (
    <SmoothScroll>
      <ScrollColorProvider>
        <BackgroundLayer />
        <ScrollProgress />
        <Navbar />

        <ColorSection color="#ffffff">
          <Hero />
        </ColorSection>

        <ColorSection color="#ffffff">
          <Partner />
        </ColorSection>

        <ColorSection color="#ffffff">
          <About />
        </ColorSection>

        <ColorSection color="#000000">
          <Work />
        </ColorSection>

        <ColorSection color="#F8F9FA">
          <Service />
        </ColorSection>

        <ColorSection color="#ffffff">
          <Pricing />
        </ColorSection>

        <ColorSection color="#000000">
          <Testimonials />
        </ColorSection>

        <ColorSection color="#FBFAF8">
          <HowIWork />
        </ColorSection>

        {/* Set these two to CTA's and Footer's actual bg colors */}
        <ColorSection color="#000000">
          <CTA />
        </ColorSection>

        <ColorSection color="#000000">
          <Footer />
        </ColorSection>
      </ScrollColorProvider>
    </SmoothScroll>
  );
}