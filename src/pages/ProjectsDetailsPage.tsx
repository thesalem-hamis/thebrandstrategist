// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, ArrowUpRight } from "lucide-react";
// import { PROJECTS } from "@/constants/projects";

// export function ProjectDetailPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const project = PROJECTS.find((p) => p.slug === slug);

//   if (!project) {
//     return (
//       <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-32 px-6 text-center">
//         <h1 className="text-2xl sm:text-4xl font-semibold sm:font-light tracking-tight uppercase mb-4">
//           Project Not Found
//         </h1>
//         <Link
//           to="/projects"
//           className="text-xs font-mono text-[#5D1F17] hover:text-neutral-900 uppercase tracking-wider font-semibold"
//         >
//           ← Back to All Projects
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Back Link */}
//         <div className="mt-6 sm:mt-10 lg:mt-12 mb-8 sm:mb-12">
//           <Link
//             to="/projects"
//             className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#5D1F17] hover:text-neutral-900 transition-colors group"
//           >
//             <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
//             <span>BACK TO ALL WORK</span>
//           </Link>
//         </div>

//         {/* Page Header */}
//         <div className="border-b border-neutral-200 pb-12 mb-12 sm:mb-16">
//           <span className="text-xs font-mono text-[#5D1F17] font-semibold uppercase tracking-wider block mb-4">
//             {project.subtitle}
//           </span>
//           <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-semibold sm:font-light uppercase tracking-tight leading-none text-neutral-900 mb-6">
//             {project.title}
//           </h1>
//           <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal max-w-3xl">
//             {project.description}
//           </p>
//         </div>

//         {/* Hero Image Container */}
//         <div className="w-full max-w-6xl mx-auto mb-16 sm:mb-24 flex justify-center overflow-hidden border border-neutral-200">
//           <img
//             src={project.bannerImage}
//             alt={`${project.title} Banner`}
//             className="w-full h-[360px] sm:h-[520px] lg:h-[600px] object-cover object-center grayscale contrast-105"
//           />
//         </div>

//         {/* Case Study breakdown (Overview, Process, Outcome Grid Architecture) */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-neutral-200 pt-12">
          
//           {/* Metadata Sidebar Column */}
//           <div className="lg:col-span-4 space-y-8 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-8 lg:pb-0 lg:pr-8">
//             <div>
//               <span className="text-xs font-mono text-neutral-400 font-medium uppercase block mb-1">
//                 [YEAR]
//               </span>
//               <p className="text-xs sm:text-sm font-medium text-neutral-900">
//                 {project.year}
//               </p>
//             </div>

//             <div>
//               <span className="text-xs font-mono text-neutral-400 font-medium uppercase block mb-2">
//                 [PROJECT FOCUS]
//               </span>
//               <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-700 leading-relaxed">
//                 {project.focus.map((item, index) => (
//                   <li key={index} className="pl-1">
//                     <span className="-ml-1">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {project.link && project.link !== "#" && (
//               <div className="pt-4">
//                 <a
//                   href={project.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#5D1F17] hover:text-neutral-900 transition-colors group"
//                 >
//                   <span>VISIT LIVE SITE</span>
//                   <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                 </a>
//               </div>
//             )}
//           </div>

//           {/* Main Case Study Content Column */}
//           <div className="lg:col-span-8 divide-y divide-neutral-200">
            
//             {/* Section 01: Overview */}
//             <div className="grid grid-cols-12 gap-4 pb-8 items-start">
//               <span className="col-span-2 text-xs font-mono text-neutral-400 font-medium">01</span>
//               <div className="col-span-10 space-y-2">
//                 <h3 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 uppercase">
//                   PROJECT <span className="font-serif italic text-[#5D1F17]">OVERVIEW</span>
//                 </h3>
//                 <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
//                   {project.overview}
//                 </p>
//               </div>
//             </div>

//             {/* Section 02: Process */}
//             <div className="grid grid-cols-12 gap-4 py-8 items-start">
//               <span className="col-span-2 text-xs font-mono text-neutral-400 font-medium">02</span>
//               <div className="col-span-10 space-y-4">
//                 <h3 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 uppercase">
//                   STRATEGIC <span className="font-serif italic text-[#5D1F17]">PROCESS</span>
//                 </h3>
//                 <ul className="space-y-3 divide-y divide-neutral-100">
//                   {project.process.map((step, idx) => (
//                     <li key={idx} className="pt-3 first:pt-0 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
//                       {step}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Section 03: Outcome */}
//             <div className="grid grid-cols-12 gap-4 pt-8 items-start">
//               <span className="col-span-2 text-xs font-mono text-neutral-400 font-medium">03</span>
//               <div className="col-span-10 space-y-2">
//                 <h3 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 uppercase">
//                   BRAND <span className="font-serif italic text-[#5D1F17]">OUTCOME</span>
//                 </h3>
//                 <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
//                   {project.outcome}
//                 </p>
//               </div>
//             </div>

//           </div>

//         </div>

//       </div>
//     </main>
//   );
// }

// export default ProjectDetailPage;


import { useParams, Link } from "react-router-dom";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/projects";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="w-full bg-white text-neutral-950 font-sans min-h-screen py-32 px-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mb-4 text-neutral-950">
          Project Not Found
        </h1>
        <Link
          to="/projects"
          className="text-xs font-mono text-[#5D1F17] hover:text-neutral-950 uppercase tracking-wider font-bold"
        >
          ← Back to All Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full bg-white text-neutral-950 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-300">
      <div className="max-w-7xl mx-auto">
        
        {/* GO BACK Button Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pt-8 sm:pt-12 mb-8 sm:mb-12 flex justify-start"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="border-b border-neutral-300 pb-12 mb-12 sm:mb-16"
        >
          <span className="text-xs font-mono text-[#5D1F17] font-bold uppercase tracking-wider block mb-4">
            {project.subtitle}
          </span>
          <h1 className="text-3xl sm:text-6xl lg:text-[72px] font-bold uppercase tracking-tight leading-none text-neutral-950 mb-6">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-800 font-medium max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-6xl mx-auto mb-16 sm:mb-24 flex justify-center overflow-hidden border border-neutral-300 shadow-sm"
        >
          <img
            src={project.bannerImage}
            alt={`${project.title} Banner`}
            className="w-full h-[360px] sm:h-[520px] lg:h-[600px] object-cover object-center grayscale contrast-105 transition-transform duration-1000 ease-out hover:scale-[1.01]"
          />
        </motion.div>

        {/* Case Study breakdown Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-neutral-300 pt-12">
          
          {/* Metadata Sidebar Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8 border-b lg:border-b-0 lg:border-r border-neutral-300 pb-8 lg:pb-0 lg:pr-8"
          >
            <div>
              <span className="text-xs font-mono text-neutral-900 font-bold uppercase block mb-1">
                [YEAR]
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-950">
                {project.year}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-900 font-bold uppercase block mb-2">
                [PROJECT FOCUS]
              </span>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                {project.focus.map((item, index) => (
                  <li key={index} className="pl-1">
                    <span className="-ml-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.link && project.link !== "#" && (
              <div className="pt-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#5D1F17] hover:text-neutral-950 transition-colors group"
                >
                  <span>VISIT LIVE SITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Main Case Study Content Column */}
          <div className="lg:col-span-8 divide-y divide-neutral-300">
            
            {/* Section 01: Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="grid grid-cols-12 gap-4 pb-8 items-start"
            >
              <span className="col-span-2 text-xs font-mono text-neutral-950 font-bold">01</span>
              <div className="col-span-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 uppercase">
                  PROJECT <span className="font-serif italic font-semibold text-[#5D1F17]">OVERVIEW</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                  {project.overview}
                </p>
              </div>
            </motion.div>

            {/* Section 02: Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="grid grid-cols-12 gap-4 py-8 items-start"
            >
              <span className="col-span-2 text-xs font-mono text-neutral-950 font-bold">02</span>
              <div className="col-span-10 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 uppercase">
                  STRATEGIC <span className="font-serif italic font-semibold text-[#5D1F17]">PROCESS</span>
                </h2>
                <ul className="space-y-3 divide-y divide-neutral-200">
                  {project.process.map((step, idx) => (
                    <li key={idx} className="pt-3 first:pt-0 text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Section 03: Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="grid grid-cols-12 gap-4 pt-8 items-start"
            >
              <span className="col-span-2 text-xs font-mono text-neutral-950 font-bold">03</span>
              <div className="col-span-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 uppercase">
                  BRAND <span className="font-serif italic font-semibold text-[#5D1F17]">OUTCOME</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                  {project.outcome}
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default ProjectDetailPage;