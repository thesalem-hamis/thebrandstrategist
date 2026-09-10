// import { motion } from "framer-motion";
// import workImage from "@/assets/BIMPE.png";

// interface WorkItem {
//   number: string;
//   category: string;
//   client: string;
//   description: string;
//   image: string;
// }

// const workItems: WorkItem[] = [
//   {
//     number: "01",
//     category: "Brand Strategy",
//     client: "McZeek Group",
//     description: "Repositioned a luxury brand for global relevance",
//     image: workImage,
//   },
//   {
//     number: "02",
//     category: "Brand Strategy",
//     client: "McZeek Group",
//     description: "Repositioned a luxury brand for global relevance",
//     image: workImage,
//   },
//   {
//     number: "03",
//     category: "Brand Strategy",
//     client: "McZeek Group",
//     description: "Repositioned a luxury brand for global relevance",
//     image: workImage,
//   },
// ];

// export function Work() {
//   return (
//     <section className="w-full bg-black px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
//       <div className="mx-auto max-w-7xl">
//         {/* Header Section */}
//         <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
//           {/* Headline */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="space-y-3"
//           >
//             <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
//               Selected Work
//             </p>
//             <h2 className="text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl">
//               Brands Built To
//               <span className="block font-serif italic text-white">
//                 Create Impact
//               </span>
//             </h2>
//           </motion.div>

//           {/* Description & CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
//             className="flex flex-col items-start gap-4 lg:items-end lg:text-right"
//           >
//             <p className="max-w-md text-sm leading-relaxed text-zinc-400">
//               A closer look at strategic projects and brand transformations
//               that drive growth and measurable results
//             </p>

//             <a
//               href="#case-studies"
//               className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B33B2C] transition-colors duration-300 hover:text-[#d14a38]"
//             >
//               View All Case Studies
//               <svg
//                 className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </a>
//           </motion.div>
//         </div>

//         {/* Cards Grid */}
//         <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {workItems.map((item, index) => (
//             <motion.div
//               key={`${item.client}-${item.number}`}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{
//                 duration: 0.6,
//                 ease: "easeOut",
//                 delay: index * 0.12,
//               }}
//               className="group overflow-hidden rounded-3xl border border-zinc-800 bg-[#080808]"
//             >
//               {/* Image Container */}
//               <div className="relative aspect-[16/10] w-full overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={`${item.client} — ${item.category}`}
//                   className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//               </div>

//               {/* Card Content with Vertical Divider */}
//               <div className="grid grid-cols-[1fr_auto_2fr] items-center gap-6 p-6">
//                 {/* Left Side */}
//                 <div className="flex flex-col gap-1">
//                   <span className="text-2xl font-semibold leading-none text-white">
//                     {item.number}
//                   </span>
//                   <span className="text-xs font-medium text-zinc-400">
//                     {item.client}
//                   </span>
//                 </div>

//                 {/* Vertical Divider Line */}
//                 <div className="h-10 w-[1px] bg-zinc-800" />

//                 {/* Right Side */}
//                 <div className="flex flex-col gap-1">
//                   <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-200">
//                     {item.category}
//                   </p>
//                   <p className="text-xs leading-relaxed text-zinc-400">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Work;
import { motion } from "framer-motion";
import workImage from "@/assets/BIMPE.png";

interface WorkItem {
  number: string;
  category: string;
  client: string;
  description: string;
  image: string;
}

const workItems: WorkItem[] = [
  {
    number: "01",
    category: "BRAND STRATEGY",
    client: "McZeek Group",
    description: "Repositioned a luxury brand for global relevance",
    image: workImage,
  },
  {
    number: "02",
    category: "BRAND STRATEGY",
    client: "McZeek Group",
    description: "Repositioned a luxury brand for global relevance",
    image: workImage,
  },
  {
    number: "03",
    category: "BRAND STRATEGY",
    client: "McZeek Group",
    description: "Repositioned a luxury brand for global relevance",
    image: workImage,
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
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300">
              SELECTED WORK
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-medium tracking-tight text-white leading-[1.05]">
              Brands Built To <br />
              <span className="font-serif italic font-normal text-white">
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
            <motion.div
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
              className="group overflow-hidden rounded-[22px] border border-white/20 bg-white/[0.02] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/35 hover:bg-white/[0.04] flex flex-col justify-between"
            >
              {/* Taller Image Section */}
              <div className="relative aspect-[3/3.2] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={`${item.client} — ${item.category}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Details Section */}
              <div className="grid grid-cols-[1fr_1px_2fr] items-start gap-4 px-6 pt-5 pb-8 bg-transparent">
                
                {/* Left Side: Top-Aligned Number & Client */}
                <div className="flex flex-col items-start gap-2 pr-1">
                  <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-white leading-none">
                    {item.number}
                  </span>
                  <span className="text-xs font-bold text-white whitespace-nowrap">
                    {item.client}
                  </span>
                </div>

                {/* Vertical Glass Divider Line */}
                <div className="h-11 w-[1px] bg-white/25 self-center" />

                {/* Right Side: Top-Aligned Category & Description */}
                <div className="flex flex-col items-start gap-1.5 pl-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight">
                    {item.category}
                  </p>
                  <p className="text-[11px] leading-relaxed text-neutral-400 font-medium">
                    {item.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Work;


