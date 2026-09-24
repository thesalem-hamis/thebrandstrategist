// import { useParams, Link } from "react-router-dom";
// import { ArrowUpLeft, Loader2, ExternalLink } from "lucide-react";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { PROJECTS } from "@/constants/projects";
// import { supabase } from "@/lib/supabase";
// import type { Project } from "@/lib/types";

// export function ProjectDetailPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const [dbProject, setDbProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let cancelled = false;
//     async function load() {
//       try {
//         const { data, error } = await supabase
//           .from("projects")
//           .select("*")
//           .eq("slug", slug)
//           .eq("active", true)
//           .maybeSingle();
//         if (error) throw error;
//         if (!cancelled) setDbProject((data as Project) ?? null);
//       } catch (err) {
//         console.error("Failed to load project:", err);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }
//     load();
//     return () => { cancelled = true; };
//   }, [slug]);

//   const project = dbProject
//     ? {
//         id: dbProject.id,
//         title: dbProject.title,
//         slug: dbProject.slug,
//         subtitle: dbProject.subtitle ?? "",
//         description: dbProject.description ?? "",
//         year: dbProject.year ?? "",
//         focus: dbProject.focus ?? [],
//         bannerImage: dbProject.banner_image ?? "/images/projects/placeholder.jpg",
//         link: dbProject.link ?? undefined,
//         overview: dbProject.overview ?? "",
//         process: dbProject.process ?? [],
//         outcome: dbProject.outcome ?? "",
//       }
//     : PROJECTS.find((p) => p.slug === slug);

//   if (loading) {
//     return (
//       <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f6f4]">
//         <div className="flex items-center gap-3">
//           <Loader2 className="h-4 w-4 animate-spin text-[#5D1F17]" />
//           <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400">
//             Loading project
//           </span>
//         </div>
//       </main>
//     );
//   }

//   if (!project) {
//     return (
//       <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f6f4] px-6 text-center">
//         <div>
//           <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#5D1F17]">
//             404
//           </span>
//           <h1 className="mt-3 text-4xl font-bold uppercase tracking-[-0.04em] text-neutral-950 sm:text-6xl">
//             Project Not Found
//           </h1>
//           <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
//             The project you're looking for doesn't exist or is no longer available.
//           </p>
//           <Link
//             to="/projects"
//             className="mt-7 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-700 transition-all hover:border-[#5D1F17] hover:text-[#5D1F17]"
//           >
//             <ArrowUpLeft className="h-3.5 w-3.5" />
//             Back to Projects
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen w-full bg-[#f7f6f4] font-sans text-neutral-950">

//       {/* ── Hero ── */}
//       <section className="bg-white border-b border-neutral-200">
//         <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">

//           {/* Back */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Link
//               to="/projects"
//               className="group mb-10 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 transition-all hover:border-[#5D1F17] hover:text-[#5D1F17]"
//             >
//               <ArrowUpLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
//               All Projects
//             </Link>
//           </motion.div>

//           {/* Title block */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, delay: 0.05 }}
//           >
//             {project.subtitle && (
//               <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#5D1F17]">
//                 {project.subtitle}
//               </span>
//             )}
//             <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-neutral-950">
//               {project.title}
//             </h1>
//             {project.description && (
//               <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500">
//                 {project.description}
//               </p>
//             )}
//           </motion.div>
//         </div>
//       </section>

//       {/* ── Banner image ── */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.99 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7, delay: 0.15 }}
//         className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-8 sm:py-10"
//       >
//         <div className="overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
//           <img
//             src={project.bannerImage}
//             alt={`${project.title} Banner`}
//             className="h-[280px] w-full object-cover object-center sm:h-[420px] lg:h-[560px] transition-transform duration-1000 hover:scale-[1.01]"
//           />
//         </div>
//       </motion.div>

//       {/* ── Case study body ── */}
//       <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pb-20">
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

//           {/* Sidebar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="lg:col-span-3"
//           >
//             <div className="border border-neutral-200 bg-white divide-y divide-neutral-100">
//               <div className="p-5">
//                 <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">Year</span>
//                 <p className="text-sm font-semibold text-neutral-900">{project.year || "—"}</p>
//               </div>

//               <div className="p-5">
//                 <span className="mb-3 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">Project Focus</span>
//                 <div className="flex flex-wrap gap-1.5">
//                   {project.focus.length > 0 ? (
//                     project.focus.map((f, i) => (
//                       <span key={`${f}-${i}`} className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[9px] font-medium text-neutral-600">
//                         {f}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-xs text-neutral-400">No focus listed</span>
//                   )}
//                 </div>
//               </div>

//               {project.link && project.link !== "#" && (
//                 <div className="p-5">
//                   <a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5D1F17] transition-colors hover:text-neutral-950"
//                   >
//                     <span>Visit Live Project</span>
//                     <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                   </a>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Main content */}
//           <div className="lg:col-span-9 divide-y divide-neutral-200">

//             {/* 01 Overview */}
//             <CaseStudySection number="01" title="Project" accent="Overview">
//               <p className="text-sm leading-7 text-neutral-600">{project.overview}</p>
//             </CaseStudySection>

//             {/* 02 Process */}
//             <CaseStudySection number="02" title="Strategic" accent="Process">
//               <ul className="space-y-3 divide-y divide-neutral-100">
//                 {project.process.map((step, i) => (
//                   <li key={i} className="pt-3 first:pt-0 text-sm leading-7 text-neutral-600">
//                     {step}
//                   </li>
//                 ))}
//               </ul>
//             </CaseStudySection>

//             {/* 03 Outcome */}
//             <CaseStudySection number="03" title="Brand" accent="Outcome" last>
//               <p className="text-sm leading-7 text-neutral-600">{project.outcome}</p>
//             </CaseStudySection>

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// function CaseStudySection({
//   number, title, accent, children, last = false,
// }: {
//   number: string;
//   title: string;
//   accent: string;
//   children: React.ReactNode;
//   last?: boolean;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 18 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.15 }}
//       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
//       className={`${last ? "" : ""} py-8 sm:py-10`}
//     >
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-[70px_1fr] sm:gap-6">
//         <div>
//           <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-neutral-200 bg-white px-2 text-[9px] font-mono font-bold text-neutral-400">
//             {number}
//           </span>
//         </div>
//         <div>
//           <h2 className="mb-5 text-2xl font-bold uppercase leading-none tracking-[-0.035em] text-neutral-950 sm:text-3xl">
//             {title}{" "}
//             <span className="font-serif font-semibold italic text-[#5D1F17]">{accent}</span>
//           </h2>
//           {children}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default ProjectDetailPage;




import { useParams, Link } from "react-router-dom";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/constants/projects";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [dbProject, setDbProject] = useState<Project | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .eq("active", true)
          .maybeSingle();

        if (error) throw error;

        if (!cancelled && data) {
          setDbProject(data as Project);
        }
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /*
   * Use Supabase data when available.
   * Otherwise immediately fall back to the local PROJECTS data.
   */
  const localProject = PROJECTS.find((p) => p.slug === slug);

  const project = dbProject
    ? {
        id: dbProject.id,
        title: dbProject.title,
        slug: dbProject.slug,
        subtitle: dbProject.subtitle ?? "",
        description: dbProject.description ?? "",
        year: dbProject.year ?? "",
        focus: dbProject.focus ?? [],
        bannerImage:
          dbProject.banner_image ??
          localProject?.bannerImage ??
          "/images/projects/placeholder.jpg",
        link: dbProject.link ?? localProject?.link ?? undefined,
        overview: dbProject.overview ?? "",
        process: dbProject.process ?? [],
        outcome: dbProject.outcome ?? "",
      }
    : localProject;

  /*
   * The page itself is rendered immediately.
   * We only show "Project Not Found" if neither Supabase
   * nor the local project list contains the requested slug.
   */
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

        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="border-b border-neutral-300 pb-12 mb-12 sm:mb-16"
        >
          {/* Subtitle */}
          {project.subtitle && (
            <span className="text-xs font-sans text-[#5D1F17] font-bold uppercase tracking-wider block mb-4">
              {project.subtitle}
            </span>
          )}

          {/* MAIN H1 */}
          <h1 className="text-3xl sm:text-6xl lg:text-[72px] font-semibold font-sans uppercase tracking-tight leading-none text-neutral-950 mb-6">
            {project.title}
          </h1>

          {/* Description */}
          {project.description && (
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-800 font-medium max-w-3xl">
              {project.description}
            </p>
          )}
        </motion.div>

        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="w-full max-w-6xl mx-auto mb-16 sm:mb-24 aspect-[4/3] sm:aspect-auto sm:h-[520px] lg:h-[620px] overflow-hidden border border-neutral-300 shadow-sm bg-neutral-100"
        >
          <img
            src={project.bannerImage}
            alt={`${project.title} Banner`}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-[1.01]"
          />
        </motion.div>

        {/* CASE STUDY BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-neutral-300 pt-12">
          {/* METADATA SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="lg:col-span-4 space-y-8 border-b lg:border-b-0 lg:border-r border-neutral-300 pb-8 lg:pb-0 lg:pr-8"
          >
            {/* YEAR */}
            <div>
              <span className="text-xs font-mono text-neutral-900 font-bold uppercase block mb-1">
                [YEAR]
              </span>

              <p className="text-xs sm:text-sm font-bold text-neutral-950">
                {project.year || "—"}
              </p>
            </div>

            {/* PROJECT FOCUS */}
            <div>
              <span className="text-xs font-mono text-neutral-900 font-bold uppercase block mb-2">
                [PROJECT FOCUS]
              </span>

              {project.focus.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                  {project.focus.map((item, index) => (
                    <li key={index} className="pl-1">
                      <span className="-ml-1">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-500">
                  No focus specified
                </p>
              )}
            </div>

            {/* LIVE SITE */}
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

          {/* MAIN CASE STUDY CONTENT */}
          <div className="lg:col-span-8 divide-y divide-neutral-300">
            {/* ========================================
                SECTION 01 — PROJECT OVERVIEW
            ======================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1,
              }}
              className="grid grid-cols-12 gap-4 pb-8 items-start"
            >
              <span className="col-span-2 text-xs font-sans text-neutral-950 font-bold">
                01
              </span>

              <div className="col-span-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-neutral-950 uppercase">
                  PROJECT{" "}
                  <span className="font-sans font-semibold text-[#5D1F17]">
                    OVERVIEW
                  </span>
                </h2>

                {project.overview && (
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                    {project.overview}
                  </p>
                )}
              </div>
            </motion.div>

            {/* ========================================
                SECTION 02 — STRATEGIC PROCESS
            ======================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.15,
              }}
              className="grid grid-cols-12 gap-4 py-8 items-start"
            >
              <span className="col-span-2 text-xs font-sans text-neutral-950 font-bold">
                02
              </span>

              <div className="col-span-10 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-neutral-950 uppercase">
                  STRATEGIC{" "}
                  <span className="font-sans font-semibold text-[#5D1F17]">
                    PROCESS
                  </span>
                </h2>

                {project.process.length > 0 && (
                  <ul className="space-y-3 divide-y divide-neutral-200">
                    {project.process.map((step, idx) => (
                      <li
                        key={idx}
                        className="pt-3 first:pt-0 text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            {/* ========================================
                SECTION 03 — BRAND OUTCOME
            ======================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2,
              }}
              className="grid grid-cols-12 gap-4 pt-8 items-start"
            >
              <span className="col-span-2 text-xs font-sans text-neutral-950 font-bold">
                03
              </span>

              <div className="col-span-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-neutral-950 uppercase">
                  BRAND{" "}
                  <span className="font-sans font-semibold text-[#5D1F17]">
                    OUTCOME
                  </span>
                </h2>

                {project.outcome && (
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                    {project.outcome}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProjectDetailPage;

