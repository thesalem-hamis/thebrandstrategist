import About from "@/components/home/About";
import CTA from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import HowIWork from "@/components/home/HowIWork";
import Partner from "@/components/home/Partners";
import Pricing from "@/components/home/Pricing";
import Service from "@/components/home/Service";
import Testimonials from "@/components/home/Testimonials";
import Work from "@/components/home/work";
import { ColorSection } from "@/components/providers/ColorSection";

export default function HomePage() {
  return (
    <>
      <ColorSection color="#ffffff"><Hero /></ColorSection>
      <ColorSection color="#ffffff"><Partner /></ColorSection>
      <ColorSection color="#ffffff"><About /></ColorSection>
      <ColorSection color="#000000"><Work /></ColorSection>
      <ColorSection color="#F8F9FA"><Service /></ColorSection>
      <ColorSection color="#ffffff"><Pricing /></ColorSection>
      <ColorSection color="#000000"><Testimonials /></ColorSection>
      <ColorSection color="#FBFAF8"><HowIWork /></ColorSection>
      <ColorSection color="#000000"><CTA /></ColorSection>
    </>
  );
}