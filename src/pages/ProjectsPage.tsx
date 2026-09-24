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
  logoImage?: string;
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
    logoImage: p.logo_image ?? undefined,
    link: p.link ?? undefined,
    overview: p.overview ?? "",
    process: p.process ?? [],
    outcome: p.outcome ?? "",
  };
}

function fetchProjects() {
  return supabase
    .from("projects")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<MappedProject[]>(PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(({ data, error }) => {
      if (!error && data) setProjects(data.length > 0 ? (data as Project[]).map(mapProject) : PROJECTS);
      setLoading(false);
    });

    const channel = supabase
      .channel("projects-list-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, () => {
        fetchProjects().then(({ data, error }) => {
          if (!error && data) setProjects(data.length > 0 ? (data as Project[]).map(mapProject) : PROJECTS);
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">

        <div className="pt-8 sm:pt-12 mb-8 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

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

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-[#5D1F17]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center border border-dashed border-neutral-300 bg-neutral-50">
            <div className="text-center p-8">
              <p className="text-sm font-medium text-neutral-700 uppercase tracking-wider">No projects available</p>
              <p className="mt-2 text-xs text-neutral-500">Check back soon for selected work.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-24 sm:space-y-36 pb-20">
            {projects.map((project) => (
              <article key={project.id} className="group flex flex-col w-full">

                <Link
                  to={`/projects/${project.slug}`}
                  className="block relative w-full overflow-hidden border border-neutral-200 bg-neutral-900"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
                    <div className="col-span-1 lg:col-span-8 xl:col-span-9 relative h-[280px] sm:h-[420px] lg:h-[500px] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={project.bannerImage}
                        alt={`${project.title} Banner`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                      />
                    </div>
                    <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 relative lg:h-[500px] w-full bg-white pt-6 pl-6 pr-0 pb-0 justify-end items-end overflow-hidden">
                      <div className="relative w-[240px] sm:w-[280px] h-[200px] sm:h-[240px] lg:h-[260px] rounded-tl-[24px] sm:rounded-tl-[28px] rounded-bl-none rounded-r-none overflow-hidden border-t-4 border-l-4 border-neutral-900/10 shadow-2xl bg-neutral-950 translate-y-2 transition-transform duration-700 ease-out group-hover:translate-y-0">
                        <img
                          src={project.logoImage || project.bannerImage}
                          alt={`${project.title} Preview`}
                          className={`w-full h-full ${project.logoImage ? "object-contain p-6 bg-white" : "object-cover object-top"}`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border-x border-b border-neutral-200 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
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

                  <div className="lg:col-span-4 p-6 sm:p-8">
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 p-6 sm:p-8 space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-400 font-medium block mb-1">[YEAR]</span>
                      <p className="text-xs sm:text-sm font-medium text-neutral-900">{project.year || "—"}</p>
                    </div>
                    {project.focus.length > 0 && (
                      <div>
                        <span className="text-xs font-mono uppercase text-neutral-400 font-medium block mb-2">[PROJECT FOCUS]</span>
                        <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-700 leading-relaxed">
                          {project.focus.map((item, i) => (
                            <li key={i} className="pl-1"><span className="-ml-1">{item}</span></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

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
