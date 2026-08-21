// import { Routes, Route } from "react-router-dom";

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


export default function AppRouter() {
  return (
    //   <Routes>
    //     <Route path="/" element={<MainLayout />}>
    //       <Route index element={<Home />} />
    //       <Route path="/shop" element={<Shop />} />
    //       <Route path="/contact" element={<Contact />} />
    //       <Route path="/our-story" element={<About />} />
    //     </Route>
    //   </Routes>
    <>
    <Navbar  />
    <Hero/>
    <Partner />
    <About />
    <Work />
    <Service />
    <Pricing />
    <Testimonials />
    <HowIWork />
    <CTA />
    <Footer />
    
    </>
    
  );
}