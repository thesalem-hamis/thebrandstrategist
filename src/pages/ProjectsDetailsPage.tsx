import { useParams, Link } from "react-router-dom";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/constants/projects";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [dbProject, setDbProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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

        if (!cancelled) {
          setDbProject((data as Project) ?? null);
        }
      } catch (err) {
        console.error("Failed to load project:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

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
          "/images/projects/placeholder.jpg",
        link: dbProject.link ?? undefined,
        overview: dbProject.overview ?? "",
        process: dbProject.process ?? [],
        outcome: dbProject.outcome ?? "",
      }
    : PROJECTS.find((p) => p.slug === slug);

  /* ───────────────── LOADING ───────────────── */

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f6f4] text-neutral-950">
        <div className="flex items-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin text-[#5D1F17]" />

          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400">
            Loading project
          </span>
        </div>
      </main>
    );
  }

  /* ───────────────── NOT FOUND ───────────────── */

  if (!project) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f6f4] px-6 text-center">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#5D1F17]">
            404
          </span>

          <h1 className="mt-3 text-4xl font-bold uppercase tracking-[-0.04em] text-neutral-950 sm:text-6xl">
            Project Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
            The project you're looking for doesn't exist or is no longer
            available.
          </p>

          <Link
            to="/projects"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-700 transition-all hover:border-[#5D1F17] hover:text-[#5D1F17]"
          >
            <ArrowUpLeft className="h-3.5 w-3.5" />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#f7f6f4] text-neutral-950 font-sans">
      {/* ───────────────── TOP BAR ───────────────── */}

      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-5">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 transition-all hover:border-[#5D1F17] hover:text-[#5D1F17]"
            >
              <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              All Projects
            </Link>

            <span className="hidden text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400 sm:block">
              Case Study
            </span>
          </div>
        </div>
      </header>

      {/* ───────────────── HERO ───────────────── */}

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
          >
            {/* Title */}
            <div className="lg:col-span-8">
              {project.subtitle && (
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5D1F17]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D1F17]">
                    {project.subtitle}
                  </span>
                </div>
              )}

              <h1 className="max-w-5xl text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-[0.86] tracking-[-0.06em] text-neutral-950">
                {project.title}
              </h1>
            </div>

            {/* Description */}
            <div className="lg:col-span-4 lg:pb-1">
              <p className="text-sm leading-6 text-neutral-500">
                {project.description}
              </p>
            </div>
          </motion.div>

          {/* Hero footer */}
          <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-5">
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400">
              Project {project.year || "—"}
            </span>

            <div className="h-px flex-1 bg-neutral-200" />

            <span className="hidden text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400 sm:block">
              Selected Work
            </span>
          </div>
        </div>
      </section>

      {/* ───────────────── HERO IMAGE ───────────────── */}

      <section className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.99,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative overflow-hidden bg-neutral-200"
        >
          <img
            src={project.bannerImage}
            alt={`${project.title} project`}
            className="h-[300px] w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.015] sm:h-[450px] lg:h-[580px]"
          />

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />

          {/* Project number */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-black/30 px-2.5 text-[9px] font-mono font-bold tracking-wider text-white backdrop-blur-md">
              {project.year || "—"}
            </span>
          </div>

          {/* Live site */}
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-900 shadow-lg transition-all duration-200 hover:bg-[#5D1F17] hover:text-white sm:bottom-6 sm:right-6"
            >
              Visit Live Site
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </motion.div>
      </section>

      {/* ───────────────── CONTENT ───────────────── */}

      <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ───────── SIDEBAR ───────── */}

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="border-y border-neutral-200 bg-white">
              {/* Year */}
              <div className="border-b border-neutral-100 p-5">
                <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Year
                </span>

                <p className="text-sm font-semibold text-neutral-900">
                  {project.year || "—"}
                </p>
              </div>

              {/* Focus */}
              <div className="border-b border-neutral-100 p-5">
                <span className="mb-3 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Project Focus
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {project.focus.length > 0 ? (
                    project.focus.map((focus, index) => (
                      <span
                        key={`${focus}-${index}`}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[9px] font-medium text-neutral-600"
                      >
                        {focus}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-neutral-400">
                      No focus listed
                    </span>
                  )}
                </div>
              </div>

              {/* Live project */}
              {project.link && project.link !== "#" && (
                <div className="p-5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5D1F17] transition-colors hover:text-neutral-950"
                  >
                    <span>Visit Live Project</span>

                    <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>
          </motion.aside>

          {/* ───────── CASE STUDY ───────── */}

          <div className="lg:col-span-9">
            {/* Overview */}
            <CaseStudySection
              number="01"
              title="Project"
              accent="Overview"
            >
              <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-[15px]">
                {project.overview || "No project overview available."}
              </p>
            </CaseStudySection>

            {/* Process */}
            <CaseStudySection
              number="02"
              title="Strategic"
              accent="Process"
            >
              {project.process.length > 0 ? (
                <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {project.process.map((step, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[40px_1fr] gap-4 py-4 sm:grid-cols-[55px_1fr] sm:gap-6"
                    >
                      <span className="text-[9px] font-mono font-bold text-neutral-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm leading-6 text-neutral-600 sm:text-[15px]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">
                  No process information available.
                </p>
              )}
            </CaseStudySection>

            {/* Outcome */}
            <CaseStudySection
              number="03"
              title="Brand"
              accent="Outcome"
              last
            >
              <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-[15px]">
                {project.outcome || "No project outcome available."}
              </p>
            </CaseStudySection>
          </div>
        </div>
      </section>

      {/* ───────────────── BOTTOM CTA ───────────────── */}

      <section className="border-t border-neutral-200 bg-neutral-950">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                Continue Exploring
              </span>

              <h2 className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em] text-white sm:text-3xl">
                View More Projects
              </h2>
            </div>

            <Link
              to="/projects"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-950 transition-all hover:bg-[#5D1F17] hover:text-white"
            >
              All Projects

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ───────────────── CASE STUDY SECTION ───────────────── */

function CaseStudySection({
  number,
  title,
  accent,
  children,
  last = false,
}: {
  number: string;
  title: string;
  accent: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${
        last ? "" : "border-b border-neutral-200"
      } py-8 first:pt-0 sm:py-10`}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[70px_1fr] sm:gap-6">
        {/* Number */}
        <div>
          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-neutral-200 bg-white px-2 text-[9px] font-mono font-bold text-neutral-400">
            {number}
          </span>
        </div>

        {/* Content */}
        <div>
          <h2 className="mb-5 text-2xl font-bold uppercase leading-none tracking-[-0.035em] text-neutral-950 sm:text-3xl">
            {title}{" "}
            <span className="font-serif font-semibold italic text-[#5D1F17]">
              {accent}
            </span>
          </h2>

          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default ProjectDetailPage;
