"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Reveal } from "./Reveal";

export function YouTubeSubscribe() {
  return (
    <section className="bg-black text-white py-16 sm:py-24 md:py-32 relative overflow-hidden w-full">
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
            "absolute inset-0 w-full h-full fill-white/5 stroke-white/5 pointer-events-none"
          )}
        />
      </div>

      <div className="container-edit px-6 sm:px-10 md:px-16 relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <Reveal>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Video className="h-6 w-6 text-white" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              YouTube Channel
            </span>
          </div>

          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal tracking-normal text-white leading-[1.2] text-balance">
            Subscribe on YouTube
            <br />
            <span className="font-serif italic font-normal text-white/90">
              for brand insights
            </span>
          </h2>

          <p className="mt-5 text-white/70 max-w-md mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Join the @itsbnm community for weekly brand strategy tips,
            behind-the-scenes breakdowns, and practical frameworks you
            can apply right away.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://www.youtube.com/@itsbnm?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#FF0000] text-white font-semibold text-xs tracking-wider uppercase transition-colors hover:bg-[#CC0000]"
            >
              <Video className="w-4 h-4" />
              <span>Subscribe Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default YouTubeSubscribe;
