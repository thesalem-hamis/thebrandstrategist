// import { ArrowUpRight } from "lucide-react";
// import { PROJECTS, PROJECTS_HEADER } from "../constants/projects";

// export function ProjectsPage() {
//   return (
//     <main className="w-full bg-[#F8F9FA] text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Page Header */}
//         <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-neutral-300 pb-12 mb-16 gap-6">
//           <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none text-neutral-950">
//             {PROJECTS_HEADER.title}
//           </h1>
          
//           <div className="flex items-start gap-2 max-w-xl text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
//             <span className="font-mono text-xs text-neutral-400 font-semibold">
//               ({PROJECTS_HEADER.count})
//             </span>
//             <p>{PROJECTS_HEADER.subtitle}</p>
//           </div>
//         </div>

//         {/* Project List */}
//         <div className="space-y-24 sm:space-y-32">
//           {PROJECTS.map((project) => (
//             <article key={project.id} className="group flex flex-col w-full">
              
//               {/* Full Width Hero Image Container */}
//               <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[560px] overflow-hidden bg-neutral-200 mb-8 sm:mb-12 border border-neutral-200">
//                 <img
//                   src={project.bannerImage}
//                   alt={`${project.title} Preview`}
//                   className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
//                 />
//               </div>

//               {/* Project Data Details */}
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                
//                 {/* Title */}
//                 <div className="lg:col-span-3">
//                   <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-neutral-950">
//                     {project.title}
//                   </h2>
//                 </div>

//                 {/* Description */}
//                 <div className="lg:col-span-4">
//                   <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
//                     {project.description}
//                   </p>
//                 </div>

//                 {/* Year + Project Focus */}
//                 <div className="lg:col-span-3 space-y-4">
//                   <div>
//                     <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium block mb-1">
//                       [YEAR]
//                     </span>
//                     <p className="text-xs sm:text-sm font-medium text-neutral-900">
//                       {project.year}
//                     </p>
//                   </div>

//                   <div>
//                     <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium block mb-2">
//                       [PROJECT FOCUS]
//                     </span>
//                     <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-700 leading-relaxed">
//                       {project.focus.map((item, index) => (
//                         <li key={index} className="pl-1">
//                           <span className="-ml-1">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* View Project CTA */}
//                 <div className="lg:col-span-2 flex justify-start lg:justify-end items-start pt-1">
//                   <a
//                     href={project.link || "#"}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-950 hover:text-[#5D1F17] transition-colors group/link"
//                   >
//                     <span>VIEW PROJECT</span>
//                     <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
//                   </a>
//                 </div>

//               </div>

//             </article>
//           ))}
//         </div>

//       </div>
//     </main>
//   );
// }

// export default ProjectsPage;



import { Link } from "react-router-dom";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECTS_HEADER } from "../constants/projects";

export function ProjectsPage() {
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
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-tight uppercase leading-none text-neutral-900 whitespace-nowrap">
            {PROJECTS_HEADER.title}
          </h1>
          
          <div className="flex items-start gap-2 max-w-xl text-neutral-700 text-xs sm:text-sm leading-relaxed font-normal">
            <span className="font-mono text-xs text-[#5D1F17] font-semibold">
              ({PROJECTS_HEADER.count})
            </span>
            <p>{PROJECTS_HEADER.subtitle}</p>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-24 sm:space-y-36 pb-20">
          {PROJECTS.map((project) => (
            <article key={project.id} className="group flex flex-col w-full">
              
              {/* Full Width Hero Image Container */}
              <Link 
                to={`/projects/${project.slug}`} 
                className="block relative w-full h-[320px] sm:h-[480px] lg:h-[560px] overflow-hidden bg-neutral-900 border border-neutral-200"
              >
                <img
                  src={project.bannerImage}
                  alt={`${project.title} Preview`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </Link>

              {/* Structured Grid Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border-x border-neutral-200 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
                
                {/* Column 1: Title & Subtitle */}
                <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <Link to={`/projects/${project.slug}`}>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight uppercase text-neutral-900 leading-tight mb-2 hover:text-[#5D1F17] transition-colors">
                        {project.title}
                      </h2>
                    </Link>
                    <span className="text-xs font-mono text-[#5D1F17] font-semibold uppercase tracking-wider block">
                      {project.subtitle}
                    </span>
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
                      {project.year}
                    </p>
                  </div>

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
                </div>

                {/* Column 4: View Project Action */}
                <div className="lg:col-span-2 p-6 sm:p-8 flex items-start justify-start lg:justify-end">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#5D1F17] hover:text-neutral-900 transition-colors group/link"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>
    </main>
  );
}

export default ProjectsPage;