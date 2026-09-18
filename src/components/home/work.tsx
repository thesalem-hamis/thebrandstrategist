// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ArrowUpRight } from "lucide-react";
// import mcZeekImage from "@/assets/Mc.png";
// import sparaImage from "@/assets/spara.png";
// import schoolImage from "@/assets/schoolofex.png";

// interface WorkItem {
//   number: string;
//   category: string;
//   client: string;
//   description: string;
//   image: string;
//   slug: string;
//   metric: string;
//   metricLabel: string;
// }

// const workItems: WorkItem[] = [
//   {
//     number: "01",
//     category: "Brand Architecture & Executive Strategy",
//     client: "MCZEEK ADVISORY",
//     description: "Positioned parent-division entity for C-suite engagement and high-value inbound growth across digital touchpoints.",
//     image: mcZeekImage,
//     slug: "mczeek-advisory",
//     metric: "3.4x",
//     metricLabel: "Executive Pipeline",
//   },
//   {
//     number: "02",
//     category: "Rebrand & Multi-Channel Positioning",
//     client: "SPARA",
//     description: "Architected scalable design systems, multi-channel positioning, and high-impact digital messaging frameworks.",
//     image: sparaImage,
//     slug: "spara",
//     metric: "+180%",
//     metricLabel: "Brand Reach",
//   },
//   {
//     number: "03",
//     category: "Institutional Identity & Messaging",
//     client: "WINNIE'S SCHOOL OF EXCELLENCE",
//     description: "Built high-converting trust content frameworks tailored for parent stakeholder conversion and institutional authority.",
//     image: schoolImage,
//     slug: "winnies-school-of-excellence",
//     metric: "+42%",
//     metricLabel: "Conversions",
//   },
// ];

// export function Work() {
//   return (
//     <section className="w-full bg-[#050505] text-white px-6 py-20 sm:px-12 sm:py-32 lg:px-20 border-b border-zinc-900">
//       <div className="mx-auto max-w-7xl">
        
//         {/* Header Section */}
//         <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between pb-12 border-b border-zinc-900">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="space-y-4"
//           >
//             <div className="flex items-center gap-2">
//               <span className="h-2 w-2 rounded-full bg-[#B33B2C] animate-pulse" />
//               <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
//                 Selected Work & Impact
//               </p>
//             </div>
//             <h2 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl uppercase leading-none">
//               Strategic Brands <br />
//               <span className="font-serif italic text-zinc-300 lowercase">
//                 engineered for growth
//               </span>
//             </h2>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
//             className="flex flex-col items-start gap-6 lg:items-end lg:text-right"
//           >
//             <p className="max-w-md text-xs sm:text-sm leading-relaxed text-zinc-400 font-normal">
//               Merging high-level brand strategy with digital distribution, content strategy, and measurable performance metrics.
//             </p>

//             <Link
//               to="/projects"
//               className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B33B2C] hover:text-white transition-colors duration-300"
//             >
//               <span>EXPLORE ALL CASE STUDIES</span>
//               <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* Cards Grid */}
//         <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
//           {workItems.map((item, index) => (
//             <motion.div
//               key={item.slug}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{
//                 duration: 0.6,
//                 ease: "easeOut",
//                 delay: index * 0.12,
//               }}
//             >
//               <Link
//                 to={`/projects/${item.slug}`}
//                 className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#09090b] transition-all duration-500 hover:border-[#B33B2C]/50 hover:shadow-2xl hover:shadow-[#B33B2C]/10"
//               >
//                 {/* Image Showcase Container — Full Uncropped Image */}
//                 <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/90 p-6 border-b border-zinc-800/80 flex items-center justify-center">
                  
//                   {/* Subtle Background Radial Accent */}
//                   <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent opacity-80" />

//                   {/* Project Index Tag */}
//                   <span className="absolute top-4 left-4 z-10 text-[10px] font-mono text-zinc-400 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-800">
//                     [{item.number}]
//                   </span>

//                   {/* Impact Metric Badge */}
//                   <div className="absolute top-4 right-4 z-10 bg-zinc-950/90 backdrop-blur-md border border-[#5D1F17] px-3 py-1.5 rounded-lg text-right shadow-lg">
//                     <span className="text-xs font-bold text-[#B33B2C] block leading-none font-mono">
//                       {item.metric}
//                     </span>
//                     <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block mt-0.5">
//                       {item.metricLabel}
//                     </span>
//                   </div>
                  
//                   {/* Full Uncropped Graphic */}
//                   <img
//                     src={item.image}
//                     alt={`${item.client} — ${item.category}`}
//                     className="relative z-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
//                   />
//                 </div>

//                 {/* Card Info Section */}
//                 <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
//                   <div className="space-y-3">
//                     <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#B33B2C] block">
//                       {item.category}
//                     </span>
//                     <h3 className="text-xl font-medium tracking-tight text-white uppercase group-hover:text-[#B33B2C] transition-colors duration-300">
//                       {item.client}
//                     </h3>
//                     <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-3">
//                       {item.description}
//                     </p>
//                   </div>

//                   {/* Action Link Footer */}
//                   <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
//                     <span>VIEW STRATEGY</span>
//                     <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#B33B2C] group-hover:bg-[#B33B2C]/10 transition-all">
//                       <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#B33B2C]" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// export default Work;
// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowUpRight, Instagram } from "lucide-react";

// import mcZeekImage from "@/assets/Mc.png";
// import sparaImage from "@/assets/spara.png";
// import schoolImage from "@/assets/schoolofex.png";

// interface WorkItem {
//   number: string;
//   category: string;
//   client: string;
//   handle: string;
//   description: string;
//   image: string;
//   slug: string;
//   services: string[];
//   accent: string;
// }

// const workItems: WorkItem[] = [
//   {
//     number: "01",
//     category: "SOCIAL & BRAND STRATEGY",
//     client: "McZeek Advisory",
//     handle: "@mczeekadvisory",
//     description:
//       "Positioning, messaging and content direction designed to strengthen executive visibility and audience trust.",
//     image: mcZeekImage,
//     slug: "mczeek-advisory",
//     services: ["Positioning", "Messaging", "Social Strategy"],
//     accent: "#8794B1",
//   },
//   {
//     number: "02",
//     category: "SOCIAL & DIGITAL STRATEGY",
//     client: "SPARA",
//     handle: "@spara",
//     description:
//       "A clearer digital presence built around consistent content direction, visual communication and audience engagement.",
//     image: sparaImage,
//     slug: "spara",
//     services: ["Content Strategy", "Digital", "Messaging"],
//     accent: "#8C9C96",
//   },
//   {
//     number: "03",
//     category: "CONTENT & SOCIAL STRATEGY",
//     client: "Winnie's School",
//     handle: "@winnies.school",
//     description:
//       "Trust-led content frameworks created to strengthen institutional authority and build a consistent social presence.",
//     image: schoolImage,
//     slug: "winnies-school-of-excellence",
//     services: ["Content", "Social Strategy", "Brand Voice"],
//     accent: "#6E91A7",
//   },
// ];

// interface SocialPreviewProps {
//   item: WorkItem;
// }

// /* ---------------------------------------------------------
//    SOCIAL ACCOUNT PREVIEW
// --------------------------------------------------------- */

// function SocialPreview({ item }: SocialPreviewProps) {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
//       {/* Soft background */}
//       <div
//         className="absolute inset-0 opacity-40 pointer-events-none"
//         style={{
//           background: `radial-gradient(
//             circle at 50% 45%,
//             ${item.accent}35 0%,
//             transparent 58%
//           )`,
//         }}
//       />

//       {/* Account window */}
//       <div
//         className="
//           relative
//           w-[78%]
//           max-w-[300px]
//           rounded-[12px]
//           border
//           border-white/[0.12]
//           bg-[#0d0d0d]
//           shadow-[0_25px_70px_rgba(0,0,0,0.5)]
//           overflow-hidden
//           transition-transform
//           duration-700
//           ease-out
//           group-hover:scale-[1.025]
//           group-hover:-translate-y-1
//         "
//       >
//         {/* Fake browser / social top bar */}
//         <div className="h-7 border-b border-white/[0.08] px-3 flex items-center justify-between">
//           <div className="flex gap-1">
//             <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
//             <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
//             <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
//           </div>

//           <Instagram
//             size={11}
//             strokeWidth={1.7}
//             className="text-white/50"
//           />
//         </div>

//         {/* Profile */}
//         <div className="px-4 pt-4 pb-3">
//           <div className="flex items-center gap-3">
//             {/* Avatar */}
//             <div
//               className="
//                 h-10
//                 w-10
//                 shrink-0
//                 overflow-hidden
//                 rounded-full
//                 border
//                 border-white/10
//                 bg-white
//                 flex
//                 items-center
//                 justify-center
//               "
//             >
//               <img
//                 src={item.image}
//                 alt={item.client}
//                 className="h-full w-full object-contain"
//               />
//             </div>

//             {/* Account info */}
//             <div className="min-w-0">
//               <p className="truncate text-[9px] font-semibold text-white">
//                 {item.handle}
//               </p>

//               <p className="mt-0.5 text-[7px] text-white/40">
//                 Social strategy
//               </p>
//             </div>

//             {/* Small action */}
//             <div className="ml-auto h-5 w-5 rounded-full border border-white/10 flex items-center justify-center">
//               <ArrowUpRight
//                 size={9}
//                 strokeWidth={1.8}
//                 className="text-white/50"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Content grid */}
//         <div className="grid grid-cols-3 gap-[2px] bg-black">
//           {/* Main visual */}
//           <div className="aspect-square overflow-hidden bg-[#171717]">
//             <img
//               src={item.image}
//               alt=""
//               className="h-full w-full object-contain p-2"
//             />
//           </div>

//           {/* Editorial tile */}
//           <div
//             className="aspect-square flex items-center justify-center p-2"
//             style={{
//               backgroundColor: item.accent,
//             }}
//           >
//             <span className="text-center text-[7px] font-bold uppercase leading-[1.15] tracking-[0.08em] text-black/70">
//               Strategy
//               <br />
//               That
//               <br />
//               Connects
//             </span>
//           </div>

//           {/* Image */}
//           <div className="aspect-square overflow-hidden bg-neutral-800">
//             <img
//               src={item.image}
//               alt=""
//               className="h-full w-full object-cover opacity-70 grayscale"
//             />
//           </div>

//           {/* Quote */}
//           <div className="aspect-square bg-[#e8e8e8] flex items-center justify-center p-2">
//             <span className="text-center text-[7px] font-semibold leading-[1.15] text-black/70">
//               BUILD
//               <br />
//               WITH
//               <br />
//               PURPOSE.
//             </span>
//           </div>

//           {/* Image */}
//           <div className="aspect-square overflow-hidden bg-neutral-800">
//             <img
//               src={item.image}
//               alt=""
//               className="h-full w-full object-cover opacity-80"
//             />
//           </div>

//           {/* Dark editorial tile */}
//           <div className="aspect-square bg-[#151515] flex items-center justify-center p-2">
//             <span className="text-center text-[7px] uppercase tracking-[0.1em] text-white/45">
//               Content
//               <br />
//               Direction
//             </span>
//           </div>
//         </div>

//         {/* Bottom account navigation */}
//         <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08]">
//           <span className="text-[6px] uppercase tracking-[0.12em] text-white/30">
//             Content
//           </span>

//           <span className="text-[6px] uppercase tracking-[0.12em] text-white/30">
//             Strategy
//           </span>

//           <span className="text-[6px] uppercase tracking-[0.12em] text-white/30">
//             Brand
//           </span>
//         </div>
//       </div>

//       {/* Strategy label */}
//       <div
//         className="
//           absolute
//           bottom-5
//           left-5
//           rounded-full
//           border
//           border-white/[0.12]
//           bg-black/60
//           px-3
//           py-1.5
//           backdrop-blur-md
//         "
//       >
//         <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/60">
//           Social strategy
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ---------------------------------------------------------
//    WORK SECTION
// --------------------------------------------------------- */

// export function Work() {
//   return (
//     <section className="w-full bg-black px-6 py-20 sm:px-12 sm:py-24 lg:px-16 lg:py-28 font-sans text-white">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-14 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
//           {/* Heading */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{
//               duration: 0.65,
//               ease: "easeOut",
//             }}
//             className="max-w-2xl"
//           >
//             <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px]">
//               Selected work
//             </p>

//             <h2
//               className="
//                 text-4xl
//                 font-semibold
//                 leading-[1.02]
//                 tracking-[-0.045em]
//                 text-white
//                 sm:text-5xl
//                 lg:text-[62px]
//               "
//             >
//               Brands built to
//               <br />
//               create impact.
//             </h2>
//           </motion.div>

//           {/* Description */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{
//               duration: 0.65,
//               ease: "easeOut",
//               delay: 0.12,
//             }}
//             className="flex flex-col items-start gap-5 lg:items-end lg:text-right"
//           >
//             <p className="max-w-sm text-xs leading-6 text-neutral-400 sm:text-sm">
//               A closer look at strategic work across social media,
//               positioning, content and brand communication.
//             </p>

//             <a
//               href="/projects"
//               className="
//                 group
//                 inline-flex
//                 items-center
//                 gap-2
//                 text-[10px]
//                 font-bold
//                 uppercase
//                 tracking-[0.14em]
//                 text-white
//                 transition-colors
//                 duration-300
//                 hover:text-neutral-300
//                 sm:text-[11px]
//               "
//             >
//               <span>View all case studies</span>

//               <ArrowUpRight
//                 size={15}
//                 strokeWidth={2}
//                 className="
//                   text-[#8B261D]
//                   transition-transform
//                   duration-300
//                   group-hover:translate-x-0.5
//                   group-hover:-translate-y-0.5
//                 "
//               />
//             </a>
//           </motion.div>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
//           {workItems.map((item, index) => (
//             <motion.div
//               key={`${item.client}-${item.number}`}
//               initial={{
//                 opacity: 0,
//                 y: 35,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               viewport={{
//                 once: true,
//                 margin: "-60px",
//               }}
//               transition={{
//                 duration: 0.65,
//                 ease: "easeOut",
//                 delay: index * 0.1,
//               }}
//             >
//               <a
//                 href={`/projects/${item.slug}`}
//                 className="
//                   group
//                   relative
//                   flex
//                   h-full
//                   flex-col
//                   overflow-hidden
//                   rounded-[20px]
//                   border
//                   border-white/[0.14]
//                   bg-[#111111]
//                   transition-all
//                   duration-500
//                   hover:border-white/[0.28]
//                   hover:bg-[#141414]
//                 "
//               >
//                 {/* Social preview */}
//                 <div
//                   className="
//                     relative
//                     h-[300px]
//                     overflow-hidden
//                     border-b
//                     border-white/[0.08]
//                     bg-[#151515]
//                     sm:h-[320px]
//                   "
//                 >
//                   {/* Number */}
//                   <span className="absolute left-5 top-5 z-20 text-[10px] font-bold tracking-[0.18em] text-neutral-500">
//                     {item.number}
//                   </span>

//                   <SocialPreview item={item} />
//                 </div>

//                 {/* Card information */}
//                 <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
//                   {/* Category */}
//                   <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[#A13A2D] sm:text-[10px]">
//                     {item.category}
//                   </p>

//                   {/* Client */}
//                   <h3 className="text-xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[22px]">
//                     {item.client}
//                   </h3>

//                   {/* Description */}
//                   <p className="mt-3 max-w-sm text-[11px] leading-5 text-neutral-400 sm:text-xs">
//                     {item.description}
//                   </p>

//                   {/* Services */}
//                   <div className="mt-6 flex flex-wrap gap-2">
//                     {item.services.map((service) => (
//                       <span
//                         key={service}
//                         className="
//                           rounded-full
//                           border
//                           border-white/[0.1]
//                           px-2.5
//                           py-1
//                           text-[8px]
//                           font-medium
//                           uppercase
//                           tracking-[0.08em]
//                           text-neutral-400
//                           transition-colors
//                           duration-300
//                           group-hover:border-white/[0.18]
//                           group-hover:text-neutral-300
//                           sm:text-[9px]
//                         "
//                       >
//                         {service}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Bottom CTA */}
//                   <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
//                     <span
//                       className="
//                         text-[9px]
//                         font-bold
//                         uppercase
//                         tracking-[0.14em]
//                         text-neutral-500
//                         transition-colors
//                         duration-300
//                         group-hover:text-white
//                       "
//                     >
//                       View case study
//                     </span>

//                     <ArrowUpRight
//                       size={15}
//                       strokeWidth={1.8}
//                       className="
//                         text-[#8B261D]
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-0.5
//                         group-hover:-translate-y-0.5
//                       "
//                     />
//                   </div>
//                 </div>
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Work;


// import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import mcZeekImage from "../../../public/Mc-bg.png";
import sparaImage from "../../../public/spara-bg.png";
import schoolImage from "../../../public/schoolofex-bg.png";

interface WorkItem {
  number: string;
  category: string;
  client: string;
  handle: string;
  description: string;
  slug: string;
  services: string[];
  logo: string;
  metrics: { label: string; value: string }[];
  quote: string;
}

const workItems: WorkItem[] = [
  {
    number: "01",
    category: "SOCIAL & BRAND STRATEGY",
    client: "McZeek Advisory",
    handle: "@mczeekadvisory",
    description:
      "Positioning, messaging and content direction designed to strengthen executive visibility and audience trust.",
    slug: "mczeek-advisory",
    services: ["Branding", "Website", "Marketing"],
    logo: mcZeekImage,
    metrics: [
      { label: "Reach Growth", value: "+140%" },
      { label: "Engagement", value: "4.8x" },
    ],
    quote: "Strengthening executive visibility & executive authority.",
  },
  {
    number: "02",
    category: "SOCIAL & DIGITAL STRATEGY",
    client: "SPARA",
    handle: "@spara",
    description:
      "A clearer digital presence built around consistent content direction, visual communication and audience engagement.",
    slug: "spara",
    services: ["Content", "Digital", "Strategy"],
    logo: sparaImage,
    metrics: [
      { label: "Brand Impression", value: "1.2M" },
      { label: "Retention Rate", value: "+85%" },
    ],
    quote: "Consistency driven through strategic content frameworks.",
  },
  {
    number: "03",
    category: "CONTENT & SOCIAL STRATEGY",
    client: "Winnie's School",
    handle: "@winnies.school",
    description:
      "Trust-led content frameworks created to strengthen institutional authority and build a consistent social presence.",
    slug: "winnies-school-of-excellence",
    services: ["Authority", "Social", "Voice"],
    logo: schoolImage,
    metrics: [
      { label: "Audience Trust", value: "92%" },
      { label: "Inquiries", value: "+210%" },
    ],
    quote: "Building institutional trust through authentic narrative.",
  },
];

export function Work() {
  return (
    <section className="w-full bg-neutral-950 px-6 py-20 sm:px-12 sm:py-24 lg:px-16 lg:py-28 font-sans text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px]">
              Selected work
            </p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[62px]">
              Brands built to
              <br />
              create impact.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
            className="flex flex-col items-start gap-5 lg:items-end lg:text-right"
          >
            <p className="max-w-sm text-xs leading-6 text-neutral-400 sm:text-sm">
              A closer look at strategic work across social media, positioning,
              content and brand communication.
            </p>
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:text-neutral-300 sm:text-[11px]"
            >
              <span>View all case studies</span>
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="text-[#8B261D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <motion.div
              key={`${item.client}-${item.number}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <a
                href={`/projects/${item.slug}`}
                className="group relative flex flex-col h-full transition-transform duration-500 hover:-translate-y-1.5"
              >
                {/* TOP TAB ROW WITH SERVICE TAGS (Floating above folder body) */}
                <div className="flex justify-end pr-2">
                  <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 border-b-0 rounded-t-xl px-3 py-1.5">
                    {item.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full bg-neutral-800/80 px-2.5 py-0.5 text-[8px] font-medium tracking-wider text-neutral-300"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* MAIN WHITE CARD CONTAINER */}
                <div className="relative flex-1 rounded-2xl rounded-tr-none bg-white p-7 text-neutral-900 shadow-2xl flex flex-col justify-between overflow-hidden border border-neutral-200 min-h-[360px]">
                  {/* Subtle Grid Accent Pattern in Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* TOP CONTENT: Client Logo + Title */}
                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Brand Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start gap-3">
                        {/* Uncontained, Longer Pure-Black Logo */}
                        <img
                          src={item.logo}
                          alt={item.client}
                          className="h-8 w-auto max-w-[160px] object-contain filter brightness-0"
                        />
                        <div>
                          
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B261D]">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bold Brand Name Title */}
                    <h3 className="text-3xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
                      {item.client}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-xs leading-relaxed text-neutral-600 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Impact Quote */}
                    <blockquote className="border-l-2 border-[#8B261D] pl-3 py-0.5 text-[11px] font-medium text-neutral-700 italic">
                      “{item.quote}”
                    </blockquote>
                  </div>

                  {/* BOTTOM FOOTER AREA inside the white card */}
                  <div className="relative z-10 mt-6 pt-5 border-t border-neutral-100 flex items-end justify-between gap-4">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-5">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                            {metric.label}
                          </p>
                          <p className="text-base font-extrabold tracking-tight text-neutral-900 mt-0.5">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Red Floating Action Button */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8B261D] text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a62d22]">
                      <ArrowUpRight size={20} strokeWidth={2.2} />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;