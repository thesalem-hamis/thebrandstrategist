"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  highlight: string;
}

const milestones: Milestone[] = [
  {
    year: "2014",
    title: "Where It Started",
    desc: "Began working with small businesses on identity and messaging, learning what actually moves a brand forward.",
    highlight: "BUILDING THE FOUNDATION OF STRATEGIC IDENTITY",
  },
  {
    year: "2017",
    title: "Foundations Of Strategy",
    desc: "Launched an independent consulting practice, taking on founders and executives as a strategic partner.",
    highlight: "ELEVATING EXECUTIVES & FOUNDER DIRECTION",
  },
  {
    year: "2020",
    title: "Scaling The Practice",
    desc: "Expanded into full brand systems — strategy, identity, and communication — for growth-stage companies.",
    highlight: "ENGINEERING SCALABLE ENTERPRISE BRAND SYSTEMS",
  },
  {
    year: "2023",
    title: "Integrated Solutions",
    desc: "Worked with global and regional brands, building a reputation for strategy that holds up under pressure.",
    highlight: "GLOBAL REPUTATION BUILT ON PURPOSE & PRECISION",
  },
];

export function AboutJourney() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => (s + 1) % milestones.length);
  const prev = () => setStep((s) => (s - 1 + milestones.length) % milestones.length);

  return (
    <section className="w-full bg-[#FBFAF8] text-neutral-900 font-sans py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
          MY JOURNEY
        </p>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-neutral-900 leading-tight max-w-2xl mb-12 sm:mb-16 uppercase">
          FROM BRAND STRATEGY <br />
          TO INTEGRATED SYSTEMS
        </h2>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Title, Description, and Nav Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 mb-3">
                  {milestones[step].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
                  {milestones[step].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons + Step Counter */}
            <div className="flex items-center gap-4 mt-8 pt-4">
              <button
                onClick={prev}
                aria-label="Previous milestone"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-neutral-500 tabular-nums">
                {String(step + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
              </span>

              <button
                onClick={next}
                aria-label="Next milestone"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-colors duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Typographic Display Card */}
          <div className="lg:col-span-7">
            <div className="relative h-[280px] sm:h-[360px] w-full border border-neutral-200 bg-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
              
              {/* Year Backdrop & Active Year */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={milestones[step].year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-start"
                >
                  <span className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight">
                    {milestones[step].year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5D1F17] border border-[#5D1F17]/20 px-2.5 py-1 rounded-full">
                    MILESTONE
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Highlight Statement using Font-Serif Style */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-neutral-800 leading-snug max-w-xl"
                >
                  "{milestones[step].highlight}"
                </motion.p>
              </AnimatePresence>

              {/* Watermark Background Number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.04 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -right-4 -bottom-10 text-[180px] sm:text-[220px] font-light leading-none select-none pointer-events-none text-neutral-900"
                >
                  {milestones[step].year.slice(2)}
                </motion.span>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Timeline Progress Line */}
        <div className="relative pt-6">
          <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-neutral-300 -translate-y-1/2" />
          <div className="relative flex justify-between items-center">
            {milestones.map((m, i) => (
              <button
                key={m.year}
                onClick={() => setStep(i)}
                className="relative flex flex-col items-center gap-2 bg-[#FBFAF8] px-3 transition-all"
              >
                <motion.span
                  animate={{
                    scale: step === i ? 1.3 : 1,
                    backgroundColor: step === i ? "#5D1F17" : "#d4d4d4",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2.5 h-2.5 rounded-full"
                />
                <span
                  className={`text-xs font-mono tracking-wider tabular-nums transition-colors duration-300 ${
                    step === i ? "text-[#5D1F17] font-medium" : "text-neutral-400"
                  }`}
                >
                  {m.year}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutJourney;