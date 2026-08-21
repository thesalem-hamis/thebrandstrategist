import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

interface Step {
  num: string;
  title: string;
  desc: string;
}

const workSteps: Step[] = [
  {
    num: "01",
    title: "Discovery & Onboarding",
    desc: "Understand the client's brand, target audience, goals, and market position.",
  },
  {
    num: "02",
    title: "Brand Strategy Development",
    desc: "Define the brand voice, messaging, content pillars, and overall positioning.",
  },
  {
    num: "03",
    title: "Campaign & Content Planning",
    desc: "Create content strategies and campaigns that align with the brand's objectives.",
  },
  {
    num: "04",
    title: "Execution & Brand Management",
    desc: "Oversee content production and ensure consistency across all platforms.",
  },
  {
    num: "05",
    title: "Performance Optimization",
    desc: "Oversee content production and ensure consistency across all platforms.",
  },
];

export function HowIWork() {
  return (
    <section
      id="how-i-work"
      className="bg-background text-foreground py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-foreground/[0.025] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.35) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container-edit px-6 sm:px-10 md:px-16 relative z-10">
        {/* Top Full-Width Two-Line Heading Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <Reveal>
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal tracking-tight text-foreground leading-[1.05]">
              The Process <br />
              <span className="font-serif italic font-normal text-muted-foreground text-[0.9em]">
                Behind The Work<span className="text-[#5D1F17] font-serif not-italic">.</span>
              </span>
            </h1>
          </Reveal>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Description Column */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-12 self-start">
            <Reveal>
              <p className="text-muted-foreground max-w-xs text-xs sm:text-sm leading-relaxed">
                A closer look at the ideas, processes, and outcomes behind the brands and digital experiences I've helped bring to life.
              </p>
            </Reveal>
          </div>

          {/* Right Animated Steps List */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <div className="border-t border-border/60">
              {workSteps.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-8 sm:py-10 px-2 border-b border-border/60 hover:bg-foreground/[0.015] transition-colors"
                  >
                    {/* Number Accent */}
                    <div className="col-span-2 md:col-span-2 text-xs sm:text-sm font-semibold text-[#5D1F17] tabular-nums">
                      {s.num}
                    </div>

                    {/* Title */}
                    <div className="col-span-10 md:col-span-6">
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-foreground group-hover:translate-x-1 transition-transform duration-500 tracking-tight">
                        {s.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="col-span-12 md:col-span-4 text-muted-foreground text-xs leading-relaxed md:pl-2 mt-2 md:mt-0">
                      {s.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowIWork;