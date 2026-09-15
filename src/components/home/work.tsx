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
import { motion } from "framer-motion";
import mcZeekImage from "@/assets/Mc.png";
import sparaImage from "@/assets/spara.png";
import schoolImage from "@/assets/schoolofex.png";

interface WorkItem {
  number: string;
  category: string;
  client: string;
  description: string;
  image: string;
  slug: string;
}

const workItems: WorkItem[] = [
  {
    number: "01",
    category: "BRAND STRATEGY",
    client: "MCZEEK ADVISORY",
    description: "Positioned parent-division entity for C-suite engagement and high-value growth",
    image: mcZeekImage,
    slug: "mczeek-advisory",
  },
  {
    number: "02",
    category: "BRAND STRATEGY",
    client: "SPARA",
    description: "Architected scalable design systems and high-impact digital messaging frameworks",
    image: sparaImage,
    slug: "spara",
  },
  {
    number: "03",
    category: "BRAND STRATEGY",
    client: "WINNIE'S SCHOOL",
    description: "Built high-converting trust content frameworks tailored for institutional authority",
    image: schoolImage,
    slug: "winnies-school-of-excellence",
  },
];

export function Work() {
  return (
    <section className="w-full bg-black px-6 py-16 sm:px-12 sm:py-24 lg:px-16 font-sans text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16">
          
          {/* Left Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 max-w-2xl"
          >
            <p className="text-[11px] font-bold font-sans uppercase tracking-[0.2em] text-neutral-300">
              SELECTED WORK
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-semibold font-sans tracking-tight text-white leading-[1.05]">
              Brands Built To <br />
              <span className="font-sans font-semibold  text-white">
                Create Impact
              </span>
            </h2>
          </motion.div>

          {/* Right Description & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col items-start gap-4 lg:items-end lg:text-right"
          >
            <p className="max-w-xs sm:max-w-sm text-xs sm:text-sm leading-relaxed text-neutral-400 font-normal">
              A closer look at strategic projects and brand transformations that drive growth and measurable results
            </p>

            <a
              href="/projects"
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors duration-300"
            >
              <span>VIEW ALL CASE STUDIES</span>
              <svg
                className="h-3.5 w-3.5 text-[#8B261D] transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <motion.a
              href={`/projects/${item.slug}`}
              key={`${item.client}-${item.number}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.12,
              }}
              /* Glassmorphic subtle border with light backdrop blur & subtle highlight */
              className="group overflow-hidden rounded-[22px] border border-white/20 bg-white/[0.02] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/35 hover:bg-white/[0.04] flex flex-col justify-between cursor-pointer"
            >
              {/* Taller Image Section */}
              <div className="relative aspect-[3/3.2] w-full overflow-hidden bg-neutral-900 flex items-center justify-center p-6">
                <img
                  src={item.image}
                  alt={`${item.client} — ${item.category}`}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Details Section */}
              <div className="grid grid-cols-[1fr_1px_2fr] items-start gap-4 px-6 pt-5 pb-8 bg-transparent">
                
                {/* Left Side: Top-Aligned Number & Client */}
                <div className="flex flex-col items-start gap-2 pr-1 min-w-0">
                  <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-white leading-none">
                    {item.number}
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-full">
                    {item.client}
                  </span>
                </div>

                {/* Vertical Glass Divider Line */}
                <div className="h-11 w-[1px] bg-white/25 self-center shrink-0" />

                {/* Right Side: Top-Aligned Category & Description */}
                <div className="flex flex-col items-start gap-1.5 pl-1 min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight">
                    {item.category}
                  </p>
                  <p className="text-[11px] leading-relaxed text-neutral-400 font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>

              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Work;