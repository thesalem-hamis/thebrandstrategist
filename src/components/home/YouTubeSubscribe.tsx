"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const BUTTON_COLOR = "#5D1F17";

export function YouTubeSubscribe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const videoBaseUrl =
    "https://www.youtube.com/embed/jctWR-t0k24?si=mx-BkwMhzIIitUr7";
  const videoSrc = isInView
    ? `${videoBaseUrl}&autoplay=1&mute=1`
    : videoBaseUrl;

  return (
    <section className="relative w-full bg-white text-neutral-900 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{ backgroundColor: BUTTON_COLOR }}
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <Reveal>
          <div ref={containerRef} className="relative w-full">
            {/* ================= HEADER ================= */}
            <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.03em] text-neutral-950">
                Connect with me on YouTube.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-neutral-500 max-w-lg mx-auto">
                Practical insights on brand strategy, storytelling, and building
                authentic brands that last.
              </p>
            </div>

            {/* ================= VIDEO FRAME ================= */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-2xl border border-black/10 bg-black z-10 transition-transform duration-500 hover:scale-[1.005]">
                <iframe
                  src={videoSrc}
                  title="YouTube video player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {/* ================= SUBSCRIBE BUTTON ================= */}
            <div className="mt-10 sm:mt-14 flex justify-center relative z-10">
              <motion.a
                href="https://www.youtube.com/@itsbnm?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg transition-all duration-300 hover:shadow-xl hover:opacity-95"
                style={{ backgroundColor: BUTTON_COLOR }}
              >
                <span>Subscribe On Youtube</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default YouTubeSubscribe;