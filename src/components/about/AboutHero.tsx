"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import aboutHeroImg from "@/assets/BIMPE.jpg";
import { TextAnimate } from "@/components/ui/text-animate";

export function AboutHero() {
  return (
    <section className="w-full bg-white text-neutral-900 font-sans py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl">
        
        {/* 1. Single Line Headline with increased top margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 mt-10 sm:mt-16 lg:mt-20"
        >
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-semibold sm:font-light uppercase tracking-tight leading-none text-neutral-900 whitespace-nowrap">
            MEET BIMPE MOHAMMED
          </h1>
        </motion.div>

        {/* 2. Sub-header Two-Column Copy + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
              At our core, clarity, position, and brand strategy shape every detail. Driven by purpose and executive insight, we engineer timeless brand systems that elevate your business with quiet confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-5"
          >
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
              Brand building is a discipline where intention, visual identity, and strategic direction converge to create meaningful differentiation and long-term enterprise value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 flex justify-start md:justify-end items-start"
          >
            <a
              href="/book-a-session"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#5D1F17] hover:text-neutral-900 transition-colors group"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* 3. Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto mb-16 sm:mb-24 flex justify-center overflow-hidden"
        >
          <img
            src={aboutHeroImg}
            alt="Bimpe Mohammed - Executive Brand Strategist"
            className="w-full h-[400px] sm:h-[540px] lg:h-[580px] object-cover object-[center_25%] rounded-none grayscale contrast-105"
            />
        </motion.div>

        {/* 4. Centered Narrative Statement with TextAnimate */}
        <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-28 px-4">
          <TextAnimate
            animation="blurIn"
            as="p"
            className="text-xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-neutral-800 leading-snug"
          >
            Discover a new approach to brand authority built on strategy and precision. Rooted in research and execution, our frameworks combine timeless aesthetics, audience positioning, and brand momentum.
          </TextAnimate>
        </div>

        {/* 5. Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-neutral-200 pt-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 uppercase">
              INSIDE <span className="font-serif italic text-[#5D1F17]">BIMPE</span>
            </h2>
          </motion.div>

          <div className="lg:col-span-8 divide-y divide-neutral-200">
            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-12 gap-4 py-8 items-start"
            >
              <span className="col-span-2 text-xs font-mono text-neutral-400 font-medium">01</span>
              <h3 className="col-span-4 text-xl sm:text-2xl font-medium text-neutral-900 tracking-tight">
                Our Vision
              </h3>
              <p className="col-span-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We view brand strategy as an operational asset. It is a tool for driving clarity, pricing authority, and market leadership through elevated visual systems and positioning.
              </p>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-12 gap-4 py-8 items-start"
            >
              <span className="col-span-2 text-xs font-mono text-neutral-400 font-medium">02</span>
              <h3 className="col-span-4 text-xl sm:text-2xl font-medium text-neutral-900 tracking-tight">
                Our Mission
              </h3>
              <p className="col-span-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We are dedicated to building identity architectures that connect strategy with high-impact design—crafting sustainable brand systems engineered to scale and endure.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutHero;