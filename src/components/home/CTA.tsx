"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section
      id="contact"
      className="bg-black text-white py-16 sm:py-24 md:py-32 relative overflow-hidden text-center w-full"
    >
      {/* Full-Container Grid Pattern Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
          ]}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "absolute inset-0 w-full h-full fill-white/10 stroke-white/10 pointer-events-none"
          )}
        />
      </div>

      <div className="container-edit px-6 sm:px-10 md:px-16 relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <Reveal>
          {/* Reduced Font Size Headline */}
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal tracking-normal text-white leading-[1.2] text-balance">
            Ready To Build A Brand That <br />
            <span className="font-serif italic font-normal text-white/90">
              Creates Impact
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-white/70 max-w-md mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Book a strategy session today and take the next step towards building a brand that lasts. Get in touch with me.
          </p>

          {/* CTA Button */}
          <div className="mt-7 sm:mt-8 flex justify-center">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>BOOK A CONSULTATION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CTA;