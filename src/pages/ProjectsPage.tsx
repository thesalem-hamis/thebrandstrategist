// import { Link } from "react-router-dom";
// import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { PROJECTS, PROJECTS_HEADER } from "../constants/projects";
// import { supabase } from "@/lib/supabase";
// import type { Project } from "@/lib/types";

// type MappedProject = {
//   id: string;
//   title: string;
//   slug: string;
//   subtitle: string;
//   description: string;
//   year: string;
//   focus: string[];
//   bannerImage: string;
//   link?: string;
//   overview: string;
//   process: string[];
//   outcome: string;
// };

// function mapProject(p: Project): MappedProject {
//   return {
//     id: p.id,
//     title: p.title,
//     slug: p.slug,
//     subtitle: p.subtitle ?? "",
//     description: p.description ?? "",
//     year: p.year ?? "",
//     focus: p.focus ?? [],
//     bannerImage: p.banner_image ?? "/images/projects/placeholder.jpg",
//     link: p.link ?? undefined,
//     overview: p.overview ?? "",
//     process: p.process ?? [],
//     outcome: p.outcome ?? "",
//   };
// }

// const cardVariants = {
//   hidden: { opacity: 0, y: 24 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
//   },
// };

// export function ProjectsPage() {
//   const [dbProjects, setDbProjects] = useState<Project[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let cancelled = false;
//     supabase
//       .from("projects")
//       .select("*")
//       .eq("active", true)
//       .order("sort_order", { ascending: true })
//       .order("created_at", { ascending: false })
//       .then(({ data, error }) => {
//         if (!cancelled) {
//           if (!error) setDbProjects((data ?? []) as Project[]);
//           setLoading(false);
//         }
//       });
//     return () => { cancelled = true; };
//   }, []);

//   const projects = dbProjects ? dbProjects.map(mapProject) : PROJECTS;

//   return (
//     <main className="min-h-screen w-full bg-[#f7f6f4] text-neutral-900 font-sans">

//       {/* Header */}
//       <section className="border-b border-neutral-200 bg-white">
//         <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
//           <Link
//             to="/"
//             className="group mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 transition-all hover:border-[#5D1F17] hover:text-[#5D1F17]"
//           >
//             <ArrowUpLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
//             Back
//           </Link>

//           <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
//             <div>
//               <div className="mb-3 flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[#5D1F17]" />
//                 <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5D1F17]">
//                   Selected Work
//                 </span>
//               </div>
//               <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em] text-neutral-950">
//                 {PROJECTS_HEADER.title}
//               </h1>
//             </div>
//             <p className="max-w-md text-sm leading-6 text-neutral-500 lg:pb-1">
//               {PROJECTS_HEADER.subtitle}
//             </p>
//           </div>

//           <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-5">
//             <span className="whitespace-nowrap text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-neutral-400">
//               {loading ? "Loading…" : `${projects.length} ${projects.length === 1 ? "case study" : "case studies"}`}
//             </span>
//             <div className="h-px flex-1 bg-neutral-200" />
//             <span className="hidden text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-400 sm:block">
//               Portfolio / 2026
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Grid */}
//       <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
//         {loading ? (
//           <div className="flex min-h-[420px] items-center justify-center">
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#5D1F17]" />
//           </div>
//         ) : projects.length === 0 ? (
//           <div className="flex min-h-[350px] items-center justify-center border border-dashed border-neutral-300 bg-white">
//             <div className="text-center">
//               <p className="text-sm font-medium text-neutral-700">No projects available</p>
//               <p className="mt-1 text-xs text-neutral-400">Check back soon for selected work.</p>
//             </div>
//           </div>
//         ) : (
//           <motion.div
//             initial="hidden"
//             animate="show"
//             transition={{ staggerChildren: 0.07 }}
//             className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
//           >
//             {projects.map((project, idx) => (
//               <ProjectCard key={project.id} project={project} idx={idx} total={projects.length} />
//             ))}
//           </motion.div>
//         )}
//       </section>
//     </main>
//   );
// }

// function ProjectCard({ project, idx, total }: { project: MappedProject; idx: number; total: number }) {
//   const isLastOdd = total % 2 !== 0 && idx === total - 1;

//   return (
//     <motion.article
//       variants={cardVariants}
//       className={`group relative overflow-hidden rounded-[2px] border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]${isLastOdd ? " md:col-span-2" : ""}`}
//     >
//       {/* Image */}
//       <Link
//         to={`/projects/${project.slug}`}
//         className={`relative block overflow-hidden bg-neutral-100${isLastOdd ? " h-[300px] sm:h-[430px] lg:h-[500px]" : " h-[250px] sm:h-[310px] lg:h-[350px]"}`}
//       >
//         <img
//           src={project.bannerImage}
//           alt={project.title}
//           loading={idx > 1 ? "lazy" : "eager"}
//           className="h-full w-full object-cover object-center grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

//         <div className="absolute left-4 top-4">
//           <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-black/35 px-2 text-[9px] font-mono font-bold tracking-wider text-white backdrop-blur-md">
//             {String(idx + 1).padStart(2, "0")}
//           </span>
//         </div>

//         <div className="absolute right-4 top-4">
//           <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-neutral-900">
//             <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-6" />
//           </span>
//         </div>

//         <div className="absolute bottom-4 left-4 right-4 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//           <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-900 shadow-lg">
//             View case study
//           </span>
//           {project.year && (
//             <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-white/80">
//               {project.year}
//             </span>
//           )}
//         </div>
//       </Link>

//       {/* Content */}
//       <div className="p-5 sm:p-6">
//         <div className="flex items-start justify-between gap-5">
//           <div className="min-w-0">
//             <Link to={`/projects/${project.slug}`} className="inline-block">
//               <h2 className="text-xl font-bold uppercase leading-[1] tracking-[-0.025em] text-neutral-950 transition-colors duration-200 group-hover:text-[#5D1F17] sm:text-[22px]">
//                 {project.title}
//               </h2>
//             </Link>
//             {project.subtitle && (
//               <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5D1F17]">
//                 {project.subtitle}
//               </p>
//             )}
//           </div>
//           <Link
//             to={`/projects/${project.slug}`}
//             className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all hover:border-[#5D1F17] hover:bg-[#5D1F17] hover:text-white sm:flex"
//             aria-label={`View ${project.title}`}
//           >
//             <ArrowUpRight className="h-3.5 w-3.5" />
//           </Link>
//         </div>

//         {project.description && (
//           <p className="mt-3 max-w-2xl text-xs leading-[1.7] text-neutral-500 sm:text-[13px]">
//             {project.description}
//           </p>
//         )}

//         <div className="mt-5 flex flex-col gap-4 border-t border-neutral-100 pt-4 sm:flex-row sm:items-end sm:justify-between">
//           <div className="min-w-0 flex-1">
//             <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">Focus</span>
//             <div className="flex flex-wrap gap-1.5">
//               {project.focus.slice(0, 3).map((f, i) => (
//                 <span key={`${f}-${i}`} className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[9px] font-medium text-neutral-600">
//                   {f}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="shrink-0 sm:text-right">
//             <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">Year</span>
//             <span className="text-[11px] font-semibold text-neutral-800">{project.year || "—"}</span>
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// export default ProjectsPage;

import { Link } from "react-router-dom";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PROJECTS, PROJECTS_HEADER } from "../constants/projects";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

type MappedProject = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  year: string;
  focus: string[];
  bannerImage: string;
  secondaryImage?: string;
  link?: string;
  overview: string;
  process: string[];
  outcome: string;
};

function mapProject(p: Project): MappedProject {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    subtitle: p.subtitle ?? "",
    description: p.description ?? "",
    year: p.year ?? "",
    focus: p.focus ?? [],
    bannerImage: p.banner_image ?? "/images/projects/placeholder.jpg",
    secondaryImage: p.secondary_image ?? p.banner_image ?? undefined,
    link: p.link ?? undefined,
    overview: p.overview ?? "",
    process: p.process ?? [],
    outcome: p.outcome ?? "",
  };
}

export function ProjectsPage() {
  const [dbProjects, setDbProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("projects")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!cancelled) {
          if (!error) setDbProjects((data ?? []) as Project[]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const projects: MappedProject[] = dbProjects
    ? dbProjects.map(mapProject)
    : PROJECTS;

  return (
    <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* GO BACK Button Container */}
        <div className="pt-8 sm:pt-12 mb-8 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-baseline justify-between pb-6 gap-6">
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-[-0.04em] uppercase leading-tight text-neutral-900 whitespace-nowrap font-sans">
            {PROJECTS_HEADER.title}
          </h1>
          
          <div className="flex items-start gap-2 max-w-xl text-neutral-700 text-xs sm:text-sm leading-relaxed font-normal">
            <span className="font-serif text-xs text-[#5D1F17] font-semibold">
              ({loading ? "..." : projects.length})
            </span>
            <p>{PROJECTS_HEADER.subtitle}</p>
          </div>
        </div>

        {/* Loading / Empty / Content State */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-[#5D1F17]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center border border-dashed border-neutral-300 bg-neutral-50">
            <div className="text-center p-8">
              <p className="text-sm font-medium text-neutral-700 uppercase tracking-wider">
                No projects available
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                Check back soon for selected work.
              </p>
            </div>
          </div>
        ) : (
          /* Project List */
          <div className="space-y-24 sm:space-y-36 pb-20">
            {projects.map((project) => (
              <article key={project.id} className="group flex flex-col w-full">
                
                {/* Image Frame Container */}
                <Link 
                  to={`/projects/${project.slug}`} 
                  className="block relative w-full overflow-hidden border border-neutral-200 bg-neutral-900"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
                    
                    {/* Main Hero Banner: Full width on mobile, 9 cols on desktop */}
                    <div className="col-span-1 lg:col-span-8 xl:col-span-9 relative h-[280px] sm:h-[420px] lg:h-[500px] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={project.bannerImage}
                        alt={`${project.title} Banner`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                      />
                    </div>

                    {/* Right Secondary Frame: Slightly wider & reduced height */}
                    <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 relative lg:h-[500px] w-full bg-white pt-6 pl-6 pr-0 pb-0 justify-end items-end overflow-hidden">
                      <div className="relative w-[240px] sm:w-[280px] h-[200px] sm:h-[240px] lg:h-[260px] rounded-tl-[24px] sm:rounded-tl-[28px] rounded-bl-none rounded-r-none overflow-hidden border-t-4 border-l-4 border-neutral-900/10 shadow-2xl bg-neutral-950 translate-y-2 transition-transform duration-700 ease-out group-hover:translate-y-0">
                        <img
                          src={project.secondaryImage || project.bannerImage}
                          alt={`${project.title} Preview`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                  </div>
                </Link>

                {/* Structured Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border-x border-b border-neutral-200 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
                  
                  {/* Column 1: Title & Subtitle */}
                  <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <Link to={`/projects/${project.slug}`}>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal font-sans tracking-tight uppercase text-neutral-900 leading-tight mb-2 hover:text-[#5D1F17] transition-colors">
                          {project.title}
                        </h2>
                      </Link>
                      {project.subtitle && (
                        <span className="text-xs font-sans text-[#5D1F17] font-semibold uppercase tracking-wider block">
                          {project.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Column 2: Description */}
                  <div className="lg:col-span-4 p-6 sm:p-8">
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Column 3: Year + Project Focus */}
                  <div className="lg:col-span-3 p-6 sm:p-8 space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-400 font-medium block mb-1">
                        [YEAR]
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-neutral-900">
                        {project.year || "—"}
                      </p>
                    </div>

                    {project.focus && project.focus.length > 0 && (
                      <div>
                        <span className="text-xs font-mono uppercase text-neutral-400 font-medium block mb-2">
                          [PROJECT FOCUS]
                        </span>
                        <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-700 leading-relaxed">
                          {project.focus.map((item, index) => (
                            <li key={index} className="pl-1">
                              <span className="-ml-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Column 4: View Project Action */}
                  <div className="lg:col-span-2 p-6 sm:p-8 flex items-start justify-start lg:justify-end">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold font-sans tracking-wider uppercase text-[#5D1F17] hover:text-neutral-900 transition-colors group/link"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>

                </div>

              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default ProjectsPage;
