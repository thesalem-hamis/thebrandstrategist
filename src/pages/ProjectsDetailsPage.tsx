import { useParams, Link } from "react-router-dom";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/constants/projects";
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
  logoImage?: string;
  link?: string;
  overview: string;
  process: string[];
  outcome: string;
};

function mapProject(p: Project, fallbackBanner?: string): MappedProject {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    subtitle: p.subtitle ?? "",
    description: p.description ?? "",
    year: p.year ?? "",
    focus: p.focus ?? [],
    bannerImage: p.banner_image ?? fallbackBanner ?? "/images/projects/placeholder.jpg",
    logoImage: p.logo_image ?? undefined,
    link: p.link ?? undefined,
    overview: p.overview ?? "",
    process: p.process ?? [],
    outcome: p.outcome ?? "",
  };
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const localProject = PROJECTS.find((p) => p.slug === slug);
  const [project, setProject] = useState<MappedProject | null>(
    localProject ?? null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }

    supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data) setProject(mapProject(data as Project, localProject?.bannerImage));
        else if (localProject) setProject(localProject as unknown as MappedProject);
        setLoading(false);
      });

    const channel = supabase
      .channel(`project-detail-${slug}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "projects", filter: `slug=eq.${slug}` }, () => {
        supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .eq("active", true)
          .maybeSingle()
          .then(({ data, error }) => {
            if (!error && data) setProject(mapProject(data as Project, localProject?.bannerImage));
            else if (!data) setProject(null);
          });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-[#5D1F17]" />
      </main>
    );
  }

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="border-b border-neutral-300 pb-12 mb-12 sm:mb-16"
        >
          {project.subtitle && (
            <span className="text-xs font-sans text-[#5D1F17] font-bold uppercase tracking-wider block mb-4">
              {project.subtitle}
            </span>
          )}
          <h1 className="text-3xl sm:text-6xl lg:text-[72px] font-semibold font-sans uppercase tracking-tight leading-none text-neutral-950 mb-6">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-800 font-medium max-w-3xl">
              {project.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-6xl mx-auto mb-16 sm:mb-24 aspect-[4/3] sm:aspect-auto sm:h-[520px] lg:h-[620px] overflow-hidden border border-neutral-300 shadow-sm bg-neutral-100"
        >
          <img
            src={project.bannerImage}
            alt={`${project.title} Banner`}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-[1.01]"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-neutral-300 pt-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8 border-b lg:border-b-0 lg:border-r border-neutral-300 pb-8 lg:pb-0 lg:pr-8"
          >
            {project.logoImage && (
              <div className="flex items-center justify-start">
                <img
                  src={project.logoImage}
                  alt={`${project.title} logo`}
                  className="max-h-16 max-w-[180px] object-contain"
                />
              </div>
            )}

            <div>
              <span className="text-xs font-mono text-neutral-900 font-bold uppercase block mb-1">[YEAR]</span>
              <p className="text-xs sm:text-sm font-bold text-neutral-950">{project.year || "—"}</p>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-900 font-bold uppercase block mb-2">[PROJECT FOCUS]</span>
              {project.focus.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                  {project.focus.map((item, i) => (
                    <li key={i} className="pl-1"><span className="-ml-1">{item}</span></li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-500">No focus specified</p>
              )}
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

          <div className="lg:col-span-8 divide-y divide-neutral-300">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="grid grid-cols-12 gap-4 pb-8 items-start"
            >
              <span className="col-span-2 text-xs font-sans text-neutral-950 font-bold">01</span>
              <div className="col-span-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-neutral-950 uppercase">
                  PROJECT <span className="font-sans font-semibold text-[#5D1F17]">OVERVIEW</span>
                </h2>
                {project.overview && (
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">{project.overview}</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="grid grid-cols-12 gap-4 py-8 items-start"
            >
              <span className="col-span-2 text-xs font-sans text-neutral-950 font-bold">02</span>
              <div className="col-span-10 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-neutral-950 uppercase">
                  STRATEGIC <span className="font-sans font-semibold text-[#5D1F17]">PROCESS</span>
                </h2>
                {project.process.length > 0 && (
                  <ul className="space-y-3 divide-y divide-neutral-200">
                    {project.process.map((step, i) => (
                      <li key={i} className="pt-3 first:pt-0 text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">{step}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="grid grid-cols-12 gap-4 pt-8 items-start"
            >
              <span className="col-span-2 text-xs font-sans text-neutral-950 font-bold">03</span>
              <div className="col-span-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-neutral-950 uppercase">
                  BRAND <span className="font-sans font-semibold text-[#5D1F17]">OUTCOME</span>
                </h2>
                {project.outcome && (
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">{project.outcome}</p>
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
