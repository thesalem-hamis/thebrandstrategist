import { Link } from "react-router-dom";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Loader2,
  MoveUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
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
    bannerImage:
      p.banner_image ?? "/images/projects/placeholder.jpg",
    link: p.link ?? undefined,
    overview: p.overview ?? "",
    process: p.process ?? [],
    outcome: p.outcome ?? "",
  };
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function ProjectsPage() {
  const [dbProjects, setDbProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!cancelled) {
        if (!error) {
          setDbProjects((data ?? []) as Project[]);
        }

        setLoading(false);
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const projects = dbProjects
    ? dbProjects.map(mapProject)
    : PROJECTS;

  return (
    <main className="min-h-screen w-full bg-[#f7f6f4] text-neutral-900 font-sans">
      {/* ───────────────── HEADER ───────────────── */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="py-8 sm:py-10 lg:py-12">
            {/* Back */}
            <Link
              to="/"
              className="group mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 transition-all duration-200 hover:border-[#5D1F17] hover:text-[#5D1F17]"
            >
              <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              Back
            </Link>

            {/* Header content */}
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5D1F17]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5D1F17]">
                    Selected Work
                  </span>
                </div>

                <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em] text-neutral-950">
                  {PROJECTS_HEADER.title}
                </h1>
              </div>

              <div className="max-w-md lg:pb-1">
                <p className="text-sm leading-6 text-neutral-500">
                  {PROJECTS_HEADER.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom information bar */}
            <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-5">
              <span className="whitespace-nowrap text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-neutral-400">
                {loading
                  ? "Loading projects"
                  : `${projects.length} ${
                      projects.length === 1
                        ? "case study"
                        : "case studies"
                    }`}
              </span>

              <div className="h-px flex-1 bg-neutral-200" />

              <span className="hidden text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-400 sm:block">
                Portfolio / 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PROJECTS ───────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        {loading ? (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="flex items-center gap-3 text-neutral-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em]">
                Loading work
              </span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center border border-dashed border-neutral-300 bg-white">
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-700">
                No projects available
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                Check back soon for selected work.
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
          >
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                total={projects.length}
              />
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}

function ProjectCard({
  project,
  idx,
  total,
}: {
  project: MappedProject;
  idx: number;
  total: number;
}) {
  const isLastOdd =
    total % 2 !== 0 && idx === total - 1;

  return (
    <motion.article
      variants={item}
      className={`group relative overflow-hidden rounded-[2px] border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)] ${
        isLastOdd ? "md:col-span-2" : ""
      }`}
    >
      {/* ───────── IMAGE ───────── */}
      <Link
        to={`/projects/${project.slug}`}
        className={`relative block overflow-hidden bg-neutral-100 ${
          isLastOdd
            ? "h-[300px] sm:h-[430px] lg:h-[500px]"
            : "h-[250px] sm:h-[310px] lg:h-[350px]"
        }`}
      >
        <img
          src={project.bannerImage}
          alt={project.title}
          loading={idx > 1 ? "lazy" : "eager"}
          className="h-full w-full object-cover object-center grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
        />

        {/* subtle image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

        {/* index */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-black/35 px-2 text-[9px] font-mono font-bold tracking-wider text-white backdrop-blur-md">
            {String(idx + 1).padStart(2, "0")}
          </span>
        </div>

        {/* top right */}
        <div className="absolute right-4 top-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-neutral-900">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-6" />
          </span>
        </div>

        {/* Hover label */}
        <div className="absolute bottom-4 left-4 right-4 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-900 shadow-lg">
            View case study
          </span>

          {project.year && (
            <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-white/80">
              {project.year}
            </span>
          )}
        </div>
      </Link>

      {/* ───────── CONTENT ───────── */}
      <div className="p-5 sm:p-6">
        {/* title row */}
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-block"
            >
              <h2 className="text-xl font-bold uppercase leading-[1] tracking-[-0.025em] text-neutral-950 transition-colors duration-200 group-hover:text-[#5D1F17] sm:text-[22px]">
                {project.title}
              </h2>
            </Link>

            {project.subtitle && (
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5D1F17]">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* desktop arrow */}
          <Link
            to={`/projects/${project.slug}`}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all duration-200 hover:border-[#5D1F17] hover:bg-[#5D1F17] hover:text-white sm:flex"
            aria-label={`View ${project.title}`}
          >
            <MoveUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* description */}
        {project.description && (
          <p className="mt-3 max-w-2xl text-xs leading-[1.7] text-neutral-500 sm:text-[13px]">
            {project.description}
          </p>
        )}

        {/* bottom metadata */}
        <div className="mt-5 flex flex-col gap-4 border-t border-neutral-100 pt-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Focus */}
          <div className="min-w-0 flex-1">
            <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Focus
            </span>

            <div className="flex flex-wrap gap-1.5">
              {project.focus.slice(0, 3).map((focus, i) => (
                <span
                  key={`${focus}-${i}`}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[9px] font-medium text-neutral-600"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* Year */}
          <div className="shrink-0 sm:text-right">
            <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Year
            </span>

            <span className="text-[11px] font-semibold text-neutral-800">
              {project.year || "—"}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectsPage;