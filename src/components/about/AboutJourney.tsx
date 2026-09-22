"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Stage {
  step: string;
  title: string;
  desc: string;
  highlight: string;
}

const stages: Stage[] = [
  {
    step: "01",
    title: "Zoom Out",
    desc: "The process begins with purpose, vision, mission, the broader audience and cultural context — understanding why a brand exists before deciding what it should say or look like.",
    highlight: "SEE THE BIGGER PICTURE FIRST",
  },
  {
    step: "02",
    title: "Zoom Mid",
    desc: "Ambition is translated into strategy — positioning, values, personality and customer segments — the choices required to create a distinctive, credible place in the market.",
    highlight: "DEFINE THE STRATEGIC POSITION",
  },
  {
    step: "03",
    title: "Zoom In",
    desc: "Strategy becomes experience — identity, messaging, tone of voice, content and every touchpoint. People don't experience a strategy document; they experience the evidence of it.",
    highlight: "MAKE THE STRATEGY TANGIBLE",
  },
];

const questions = [
  {
    num: "01",
    label: "Current Reality",
    q: "Where are you now?",
  },
  {
    num: "02",
    label: "Future Ambition",
    q: "Where do you want to go?",
  },
  {
    num: "03",
    label: "Strategic Execution",
    q: "What must we deliberately do today to get you there?",
  },
];

export function AboutJourney() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => (s + 1) % stages.length);
  const prev = () => setStep((s) => (s - 1 + stages.length) % stages.length);

  return (
    <section className="w-full border-b border-neutral-200/80 bg-[#FBFAF8] px-6 py-16 font-sans text-neutral-900 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Header Section */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5D1F17]" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
              Her Approach
            </p>
          </div>
          <h2 className="max-w-3xl font-sans text-3xl font-light leading-[1.15] tracking-tight uppercase text-neutral-900 sm:text-5xl">
            BRANDS AS COMPLETE <br />
            <span className="font-normal text-neutral-900">SYSTEMS, NOT TOUCHPOINTS</span>
          </h2>
        </div>

        {/* Clean Editorial Card Grid - 3 Core Questions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 rounded-sm border border-neutral-200/80 bg-white p-8 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.02)] sm:p-10"
        >
          <div className="mb-8 flex items-center justify-between border-b border-neutral-100 pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              Strategic Discovery
            </span>
            <span className="font-mono text-[11px] font-medium text-[#5D1F17]">
              03 CORE QUESTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {questions.map((item) => (
              <div
                key={item.num}
                className="group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#5D1F17]">
                    {item.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    {item.label}
                  </span>
                </div>

                <p className="font-serif text-lg italic leading-snug text-neutral-900 transition-colors duration-300 group-hover:text-[#5D1F17] sm:text-xl">
                  "{item.q}"
                </p>

                <div className="h-0.5 w-6 bg-neutral-200 transition-all duration-300 group-hover:w-full group-hover:bg-[#5D1F17]" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Framework Grid (Zoom Out, Mid, In) */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:mb-20 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Title, Narrative Description, & Controls */}
          <div className="flex h-full min-h-[240px] flex-col justify-between lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <div className="inline-block font-mono text-xs font-semibold uppercase tracking-widest text-[#5D1F17]">
                  Phase {stages[step].step}
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
                  {stages[step].title}
                </h3>
                <p className="max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
                  {stages[step].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons + Step Counter */}
            <div className="mt-8 flex items-center gap-4 pt-4 border-t border-neutral-200/60">
              <button
                onClick={prev}
                aria-label="Previous stage"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300/80 bg-white text-neutral-700 shadow-sm transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>

              <span className="font-mono text-xs tabular-nums text-neutral-500">
                <strong className="text-neutral-900">
                  {String(step + 1).padStart(2, "0")}
                </strong>{" "}
                / {String(stages.length).padStart(2, "0")}
              </span>

              <button
                onClick={next}
                aria-label="Next stage"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300/80 bg-white text-neutral-700 shadow-sm transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17] hover:text-white"
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Typographic Display Card */}
          <div className="lg:col-span-7">
            <div className="relative flex h-[300px] w-full flex-col justify-between overflow-hidden border border-neutral-200/80 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] sm:h-[380px] sm:p-12">
              
              {/* Card Header Tag */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stages[step].step}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start justify-between"
                >
                  <span className="font-sans text-5xl font-extralight tracking-tight text-neutral-900 sm:text-7xl">
                    {stages[step].step}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5D1F17]/15 bg-[#5D1F17]/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#5D1F17]">
                    <Sparkles className="h-2.5 w-2.5" /> STAGE
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Highlight Statement (Serif Editorial Accent) */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10 max-w-xl font-serif text-2xl italic leading-snug text-neutral-800 sm:text-3xl lg:text-4xl"
                >
                  "{stages[step].highlight}"
                </motion.p>
              </AnimatePresence>

              {/* Monogram Watermark Number Background */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.035, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute -bottom-12 -right-4 select-none font-sans text-[200px] font-light leading-none text-neutral-900 sm:text-[260px]"
                >
                  {stages[step].step}
                </motion.span>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Progress Line & Step Selector */}
        <div className="relative pt-6">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-neutral-300/80" />
          <div className="relative flex items-center justify-between">
            {stages.map((s, i) => {
              const isActive = step === i;
              return (
                <button
                  key={s.step}
                  onClick={() => setStep(i)}
                  className="group relative flex flex-col items-center gap-2.5 bg-[#FBFAF8] px-4 transition-all focus:outline-none"
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.35 : 1,
                      backgroundColor: isActive ? "#5D1F17" : "#D4D4D4",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-3 w-3 rounded-full ring-4 ring-[#FBFAF8]"
                  />
                  <span
                    className={`font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
                      isActive
                        ? "font-semibold text-[#5D1F17]"
                        : "text-neutral-400 group-hover:text-neutral-700"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* "Who She Works With" Bottom Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-1 items-stretch gap-8 border-t border-neutral-200/80 pt-12 sm:mt-20 lg:grid-cols-12 lg:gap-12"
        >
          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-4 bg-neutral-400" />
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Who She Works With
              </p>
            </div>
            <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Today, Adebimpe works with ambitious businesses, founders,
              executives, and professionals — building something new,
              outgrowing the brand that brought them this far, or preparing
              for a bigger stage.
            </p>
          </div>

          <div className="flex items-center border-l-0 border-neutral-200/80 pl-0 lg:col-span-7 lg:border-l lg:pl-10">
            <p className="font-serif text-xl italic leading-relaxed text-neutral-800 sm:text-2xl">
              The strongest brands do more than attract attention. They
              create meaning, change behaviour, and earn trust.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutJourney;




// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

// interface Stage {
//   step: string;
//   title: string;
//   desc: string;
//   highlight: string;
// }

// const stages: Stage[] = [
//   {
//     step: "01",
//     title: "Zoom Out",
//     desc: "The process begins with purpose, vision, mission, the broader audience and cultural context — understanding why a brand exists before deciding what it should say or look like.",
//     highlight: "SEE THE BIGGER PICTURE FIRST",
//   },
//   {
//     step: "02",
//     title: "Zoom Mid",
//     desc: "Ambition is translated into strategy — positioning, values, personality and customer segments — the choices required to create a distinctive, credible place in the market.",
//     highlight: "DEFINE THE STRATEGIC POSITION",
//   },
//   {
//     step: "03",
//     title: "Zoom In",
//     desc: "Strategy becomes experience — identity, messaging, tone of voice, content and every touchpoint. People don't experience a strategy document; they experience the evidence of it.",
//     highlight: "MAKE THE STRATEGY TANGIBLE",
//   },
// ];

// export function AboutJourney() {
//   const [step, setStep] = useState(0);

//   const next = () => setStep((s) => (s + 1) % stages.length);
//   const prev = () => setStep((s) => (s - 1 + stages.length) % stages.length);

//   return (
//     <section className="w-full border-b border-neutral-200/80 bg-[#FBFAF8] px-6 py-16 font-sans text-neutral-900 sm:px-12 sm:py-24 lg:px-20">
//       <div className="mx-auto max-w-7xl">
        
//         {/* Top Header Section */}
//         <div className="mb-12 sm:mb-16">
//           <div className="mb-3 inline-flex items-center gap-2">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#5D1F17]" />
//             <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
//               Her Approach
//             </p>
//           </div>
//           <h2 className="max-w-3xl font-sans text-3xl font-light leading-[1.15] tracking-tight text-neutral-900 uppercase sm:text-5xl">
//             BRANDS AS COMPLETE <br />
//             <span className="font-normal text-neutral-900">SYSTEMS, NOT TOUCHPOINTS</span>
//           </h2>
//         </div>

//         {/* Content Grid */}
//         <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:mb-20 lg:grid-cols-12 lg:gap-16">
          
//           {/* Left Column: Title, Narrative Description, & Controls */}
//           <div className="flex h-full min-h-[240px] flex-col justify-between lg:col-span-5">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={step}
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//                 className="space-y-3"
//               >
//                 <div className="inline-block font-mono text-xs font-semibold uppercase tracking-widest text-[#5D1F17]">
//                   Phase {stages[step].step}
//                 </div>
//                 <h3 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
//                   {stages[step].title}
//                 </h3>
//                 <p className="max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
//                   {stages[step].desc}
//                 </p>
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Buttons + Step Counter */}
//             <div className="mt-8 flex items-center gap-4 pt-4 border-t border-neutral-200/60">
//               <button
//                 onClick={prev}
//                 aria-label="Previous stage"
//                 className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300/80 bg-white text-neutral-700 shadow-sm transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17] hover:text-white"
//               >
//                 <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
//               </button>

//               <span className="font-mono text-xs tabular-nums text-neutral-500">
//                 <strong className="text-neutral-900">{String(step + 1).padStart(2, "0")}</strong> / {String(stages.length).padStart(2, "0")}
//               </span>

//               <button
//                 onClick={next}
//                 aria-label="Next stage"
//                 className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300/80 bg-white text-neutral-700 shadow-sm transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17] hover:text-white"
//               >
//                 <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Editorial Typographic Display Card */}
//           <div className="lg:col-span-7">
//             <div className="relative flex h-[300px] w-full flex-col justify-between overflow-hidden border border-neutral-200/80 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] sm:h-[380px] sm:p-12">
              
//               {/* Card Header Tag */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={stages[step].step}
//                   initial={{ opacity: 0, x: 15 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -15 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex items-start justify-between"
//                 >
//                   <span className="font-sans text-5xl font-extralight tracking-tight text-neutral-900 sm:text-7xl">
//                     {stages[step].step}
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5D1F17]/15 bg-[#5D1F17]/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#5D1F17]">
//                     <Sparkles className="h-2.5 w-2.5" /> STAGE
//                   </span>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Highlight Statement (Serif Editorial Accent) */}
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={step}
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -12 }}
//                   transition={{ duration: 0.35 }}
//                   className="relative z-10 max-w-xl font-serif text-2xl italic leading-snug text-neutral-800 sm:text-3xl lg:text-4xl"
//                 >
//                   "{stages[step].highlight}"
//                 </motion.p>
//               </AnimatePresence>

//               {/* Monogram Watermark Number Background */}
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={step}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 0.035, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="pointer-events-none absolute -bottom-12 -right-4 select-none font-sans text-[200px] font-light leading-none text-neutral-900 sm:text-[260px]"
//                 >
//                   {stages[step].step}
//                 </motion.span>
//               </AnimatePresence>

//             </div>
//           </div>

//         </div>

//         {/* Progress Line & Step Selector */}
//         <div className="relative pt-6">
//           <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-neutral-300/80" />
//           <div className="relative flex items-center justify-between">
//             {stages.map((s, i) => {
//               const isActive = step === i;
//               return (
//                 <button
//                   key={s.step}
//                   onClick={() => setStep(i)}
//                   className="group relative flex flex-col items-center gap-2.5 bg-[#FBFAF8] px-4 transition-all focus:outline-none"
//                 >
//                   <motion.span
//                     animate={{
//                       scale: isActive ? 1.35 : 1,
//                       backgroundColor: isActive ? "#5D1F17" : "#D4D4D4",
//                     }}
//                     transition={{ duration: 0.3 }}
//                     className="h-3 w-3 rounded-full ring-4 ring-[#FBFAF8]"
//                   />
//                   <span
//                     className={`font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
//                       isActive
//                         ? "font-semibold text-[#5D1F17]"
//                         : "text-neutral-400 group-hover:text-neutral-700"
//                     }`}
//                   >
//                     {s.title.split(" ")[1] || s.title}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* "Who She Works With" Bottom Block */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="mt-16 grid grid-cols-1 items-stretch gap-8 border-t border-neutral-200/80 pt-12 sm:mt-20 lg:grid-cols-12 lg:gap-12"
//         >
//           <div className="flex flex-col justify-center lg:col-span-5">
//             <div className="mb-2 flex items-center gap-2">
//               <span className="h-px w-4 bg-neutral-400" />
//               <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
//                 Who She Works With
//               </p>
//             </div>
//             <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
//               Today, Adebimpe works with ambitious businesses, founders,
//               executives, and professionals — building something new,
//               outgrowing the brand that brought them this far, or preparing
//               for a bigger stage.
//             </p>
//           </div>

//           <div className="flex items-center border-l-0 border-neutral-200/80 pl-0 lg:col-span-7 lg:border-l lg:pl-10">
//             <p className="font-serif text-xl italic leading-relaxed text-neutral-800 sm:text-2xl">
//               The strongest brands do more than attract attention. They
//               create meaning, change behaviour, and earn trust.
//             </p>
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

// export default AboutJourney;