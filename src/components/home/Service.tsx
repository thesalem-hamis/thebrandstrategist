// import React from "react";
// import { motion } from "framer-motion";
// import { Reveal } from "./Reveal";

// interface ServiceItem {
//   num: string;
//   title: string;
//   desc: string;
// }

// const services: ServiceItem[] = [
//   {
//     num: "01",
//     title: "Brand Strategy & Positioning",
//     desc: "Strategic clarity designed to elevate executive leadership, define core narratives, and differentiate in competitive markets.",
//   },
//   {
//     num: "02",
//     title: "Executive Personal Branding",
//     desc: "Tailored frameworks built to position founders and C-suite executives as industry authority figures.",
//   },
//   {
//     num: "03",
//     title: "Communication Systems",
//     desc: "Scalable messaging architecture and content strategies engineered for high-impact engagement.",
//   },
//   {
//     num: "04",
//     title: "Business Growth Advisory",
//     desc: "End-to-end consulting and retainer services focused on driving long-term enterprise value and audience retention.",
//   },
// ];

// export function Service() {
//   return (
//     <section
//       id="services"
//       className="bg-white text-black py-16 md:py-28 relative overflow-hidden font-sans"
//     >
//       {/* Subtle Ambient Background Texture */}
//       <div className="absolute inset-0 pointer-events-none" aria-hidden>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-[#5D1F17]/[0.03] blur-3xl" />
//         <div
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.4) 1px, transparent 0)",
//             backgroundSize: "48px 48px",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-12">
//         {/* ── Top Header Section ── */}
//         <div className="max-w-3xl space-y-4">
//           <Reveal>
//             <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5D1F17] flex items-center gap-3">
//               <span className="w-8 h-px bg-[#5D1F17]" /> Services (04)
//             </p>
//           </Reveal>

//           <Reveal delay={0.05}>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-black leading-snug text-balance">
//               Strategic Design & Brand Architecture.
//             </h2>
//           </Reveal>

//           <Reveal delay={0.1}>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-1">
//               <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed max-w-lg">
//                 A focused advisory practice working with founders and executive
//                 teams who prioritize long-term positioning, growth, and visual authority.
//               </p>

//               {/* Styled Burgundy Pill CTA Button */}
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center gap-2.5 
//                   bg-[#5D1F17] hover:bg-[#4a1812] text-white font-medium text-[13px] sm:text-[14px] tracking-[-0.01em] 
//                   px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl 
//                   transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
//                   shadow-lg hover:shadow-xl shrink-0"
//               >
//                 <span>Book a Free Call</span>
//                 <svg
//                   className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-[-45deg]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   strokeWidth="2.5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </Reveal>
//         </div>

//         {/* ── 2-Column Clean Editorial Grid ── */}
//         <div className="border-t border-zinc-200">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
//             {services.map((s, i) => (
//               <Reveal key={s.num} delay={i * 0.05}>
//                 <motion.div
//                   whileHover={{ x: 6 }}
//                   transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                   className="group flex flex-col justify-between py-8 border-b border-zinc-200 hover:bg-zinc-50/80 transition-colors cursor-pointer px-2 sm:px-4 space-y-3"
//                 >
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-semibold tracking-wide text-[#5D1F17] tabular-nums">
//                       ({s.num})
//                     </span>
//                     <h3 className="text-xl sm:text-2xl font-normal text-black group-hover:text-[#5D1F17] group-hover:translate-x-1 transition-all duration-500">
//                       {s.title}
//                     </h3>
//                   </div>

//                   <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed max-w-md">
//                     {s.desc}
//                   </p>
//                 </motion.div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Service;










// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import logoImg from "@/assets/white.svg"; // Replace with your logo path

// interface ServiceItem {
//   number: string;
//   title: string;
//   description: string;
// }

// const servicesData: ServiceItem[] = [
//   {
//     number: "01",
//     title: "Brand Strategy & Positioning",
//     description:
//       "Crafting clear value propositions, market positioning, and growth roadmaps to ensure your brand stands out and competes effectively.",
//   },
//   {
//     number: "02",
//     title: "Visual Identity & Design",
//     description:
//       "Developing cohesive visual systems, logo suites, color palettes, and typography frameworks built for digital and physical applications.",
//   },
//   {
//     number: "03",
//     title: "Digital Product Architecture",
//     description:
//       "Designing conversion-focused web and mobile interfaces that combine intuitive user experiences with high-performance UI engineering.",
//   },
//   {
//     number: "04",
//     title: "Advisory & Brand Growth",
//     description:
//       "Ongoing strategic guidance, campaign direction, and creative advisory to help your business adapt and scale continuously.",
//   },
// ];

// export function Services() {
//   return (
//     <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-12 lg:px-20 font-sans">
//       <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        
//         {/* Left Hero Card with Curved/Arched Edge */}
//         <div className="lg:col-span-5 relative w-full min-h-[460px] sm:min-h-[500px] rounded-3xl sm:rounded-[40px] lg:rounded-r-[160px] bg-neutral-900 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden shadow-xl">
//           {/* Subtle background glow */}
//           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#5D1F17]/30 blur-3xl rounded-full pointer-events-none" />

//           {/* Top Section: Scaled Logo */}
//           <div className="relative z-10">
//             <img
//               src={logoImg}
//               alt="Brand Logo"
//               className="h-12 sm:h-14 w-auto object-contain brightness-200"
//             />
//           </div>

//           {/* Center Section: Headline & Description */}
//           <div className="relative z-10 space-y-4 my-auto">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-tight">
//               WHAT I <br />
//               <span className="font-light italic text-zinc-300">OFFER.</span>
//             </h2>
//             <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
//               Tailored strategic solutions designed to meet unique market challenges and drive measurable growth.
//             </p>
//           </div>

//           {/* Bottom Section: CTA */}
//           <div className="relative z-10 pt-4">
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#5D1F17] transition-colors duration-300 group"
//             >
//               <span>Learn More</span>
//               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//             </a>
//           </div>
//         </div>

//         {/* Right Section: Seamless 2x2 Grid Layout */}
//         <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 my-auto">
//           {servicesData.map((service, index) => (
//             <motion.div
//               key={service.number}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-60px" }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group flex flex-col justify-start"
//             >
//               {/* Number and Subtle Accent Line */}
//               <div className="flex items-center gap-3 mb-3">
//                 <span className="text-lg font-bold text-[#5D1F17] tabular-nums">
//                   ({service.number})
//                 </span>
//                 <span className="h-[1px] w-12 bg-zinc-200 group-hover:w-20 group-hover:bg-[#5D1F17] transition-all duration-300" />
//               </div>

//               {/* Service Title */}
//               <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 group-hover:text-[#5D1F17] transition-colors duration-300 mb-2">
//                 {service.title}
//               </h3>

//               {/* Service Description */}
//               <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// export default Services;


// import React from "react";
// import { motion } from "framer-motion";
// import profileImage from "@/assets/BIMPE.jpg";

// interface ServiceNode {
//   id: string;
//   title: string;
//   tagline: string;
//   positionClass: string;
// }

// const serviceNodes: ServiceNode[] = [
//   // Ring 1 (Innermost Ring - Orbit Center)
//   {
//     id: "01",
//     title: "Executive Brand Advisory",
//     tagline: "High-level strategic vision & direction",
//     positionClass: "top-[36%] left-[28%] sm:top-[38%] sm:left-[32%]",
//   },

//   // Ring 2 (Middle Ring - Staggered Left & Bottom Right)
//   {
//     id: "02",
//     title: "Personal Brand Strategy",
//     tagline: "Authority building for industry leaders",
//     positionClass: "top-[24%] left-[2%] sm:top-[28%] sm:left-[8%]",
//   },
//   {
//     id: "03",
//     title: "Communication & Content",
//     tagline: "High-impact storytelling that converts",
//     positionClass: "bottom-[34%] right-[2%] sm:bottom-[32%] sm:right-[10%]",
//   },

//   // Ring 3 (Outer Ring - Balanced Perimeter Nodes)
//   {
//     id: "04",
//     title: "Business Brand Architecture",
//     tagline: "Market positioning & growth roadmap",
//     positionClass: "top-[2%] left-[2%] sm:left-[6%]",
//   },
//   {
//     id: "05",
//     title: "Visual Identity Systems",
//     tagline: "Bespoke aesthetic & design direction",
//     positionClass: "top-[2%] right-[2%] sm:right-[6%]",
//   },
//   {
//     id: "06",
//     title: "Brand Growth Frameworks",
//     tagline: "Scalable marketing infrastructure",
//     positionClass: "bottom-[2%] left-[2%] sm:left-[6%]",
//   },
//   {
//     id: "07",
//     title: "Retainer & Fractional Leadership",
//     tagline: "Continuous creative & strategic direction",
//     positionClass: "bottom-[2%] right-[2%] sm:right-[6%]",
//   },
// ];

// export function Services() {
//   return (
//     <section className="relative w-full h-screen max-h-screen bg-[#F8F9FA] px-4 sm:px-10 py-6 font-sans text-neutral-900 overflow-hidden flex flex-col justify-between">
//       {/* Faded Background Portrait Overlay */}
//       <div 
//         className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.08] grayscale pointer-events-none mix-blend-multiply"
//         style={{ backgroundImage: `url(${profileImage})` }}
//       />

//       {/* Subtle Warm Accent Ambient Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#8B261D]/08 blur-[130px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl w-full mx-auto h-full flex flex-col justify-between relative z-10">
        
//         {/* Right-Aligned Headline & Copy */}
//         <div className="flex justify-end w-full pt-1 sm:pt-2 z-20">
//           <div className="text-right max-w-xs sm:max-w-lg">
//             <h1 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.08]">
//               Architecting <br />
//               <span className="font-serif italic font-normal text-[#8B261D]">
//                 Market Leadership
//               </span>
//             </h1>
//             <p className="mt-2 text-[10px] sm:text-xs text-neutral-600 font-normal leading-relaxed">
//               A synchronized strategic hub designed to scale your authority, elevate visual direction, and build systems that command long-term industry influence.
//             </p>
//           </div>
//         </div>

//         {/* Orbit Diagram Container */}
//         <div className="relative w-full max-w-[960px] mx-auto flex-1 min-h-0 flex items-center justify-center my-auto">
          
//           {/* Ring 1 - Inner Glowing Circle */}
//           <motion.div
//             animate={{
//               boxShadow: [
//                 "0 0 12px rgba(139,38,29,0.15)",
//                 "0 0 30px rgba(139,38,29,0.45)",
//                 "0 0 12px rgba(139,38,29,0.15)",
//               ],
//               borderColor: [
//                 "rgba(139,38,29,0.3)",
//                 "rgba(139,38,29,0.7)",
//                 "rgba(139,38,29,0.3)",
//               ],
//             }}
//             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-2 border-[#8B261D]/40 pointer-events-none z-0"
//           />

//           {/* Ring 2 - Middle Ring Line */}
//           <motion.div
//             animate={{
//               borderColor: [
//                 "rgba(139,38,29,0.2)",
//                 "rgba(139,38,29,0.5)",
//                 "rgba(139,38,29,0.2)",
//               ],
//             }}
//             transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//             className="absolute w-[330px] h-[330px] sm:w-[440px] sm:h-[440px] rounded-full border border-[#8B261D]/30 pointer-events-none z-0"
//           />

//           {/* Ring 3 - Outer Perimeter Line */}
//           <div className="absolute w-[470px] h-[470px] sm:w-[620px] sm:h-[620px] rounded-full border border-neutral-300/70 pointer-events-none z-0" />

//           {/* Service Items */}
//           {serviceNodes.map((node, index) => {
//             return (
//               <motion.div
//                 key={node.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: index * 0.06 }}
//                 whileHover={{ scale: 1.04 }}
//                 className={`absolute z-30 cursor-pointer ${node.positionClass}`}
//               >
//                 <div className="relative flex flex-col gap-0.5 p-1 transition-all duration-300">
//                   <div className="flex items-center gap-1.5">
//                     <span className="text-[9px] sm:text-[10px] font-bold text-[#8B261D] tabular-nums">
//                       {node.id}
//                     </span>
//                     <h3 className="text-[10px] sm:text-xs font-semibold tracking-wide text-neutral-900 leading-snug">
//                       {node.title}
//                     </h3>
//                   </div>
//                   <p className="text-[8px] sm:text-[9.5px] text-neutral-500 font-normal leading-tight max-w-[115px] sm:max-w-[160px]">
//                     {node.tagline}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// }

// export default Services;




import { motion } from "framer-motion";
import profileImage from "@/assets/BIMPE.jpg";

interface ServicePill {
  id: string;
  label: string;
  icon: "heart" | "circle" | "square" | "triangle";
  iconColor: string;
  mobilePos: string;
  desktopPos: string;
}

interface TagNode {
  label: string;
  mobilePos: string;
  desktopPos: string;
}

const servicePills: ServicePill[] = [
  {
    id: "01",
    label: "executive brand advisory",
    icon: "heart",
    iconColor: "text-[#8B261D]",
    mobilePos: "top-[22%] left-[50%]",
    desktopPos: "sm:top-[32%] sm:left-[48%]",
  },
  {
    id: "02",
    label: "personal brand strategy",
    icon: "circle",
    iconColor: "text-white",
    mobilePos: "top-[36%] left-[32%]",
    desktopPos: "sm:top-[48%] sm:left-[32%]",
  },
  {
    id: "03",
    label: "business brand strategy",
    icon: "square",
    iconColor: "text-[#8B261D]",
    mobilePos: "top-[36%] left-[68%]",
    desktopPos: "sm:top-[48%] sm:left-[65%]",
  },
  {
    id: "04",
    label: "communication & content",
    icon: "triangle",
    iconColor: "text-white",
    mobilePos: "top-[52%] left-[45%]",
    desktopPos: "sm:top-[62%] sm:left-[45%]",
  },
  {
    id: "05",
    label: "personal brand strategy",
    icon: "circle",
    iconColor: "text-white",
    mobilePos: "top-[52%] left-[78%]",
    desktopPos: "sm:top-[62%] sm:left-[72%]",
  },
  {
    id: "06",
    label: "brand growth",
    icon: "square",
    iconColor: "text-[#8B261D]",
    mobilePos: "top-[68%] left-[32%]",
    desktopPos: "sm:top-[76%] sm:left-[32%]",
  },
  {
    id: "07",
    label: "business growth system",
    icon: "circle",
    iconColor: "text-white",
    mobilePos: "top-[68%] left-[65%]",
    desktopPos: "sm:top-[76%] sm:left-[58%]",
  },
];

const outerTags: TagNode[] = [
  // Left Outer Tags
  { 
    label: "long-term retainer", 
    mobilePos: "top-[28%] left-[16%]", 
    desktopPos: "sm:top-[36%] sm:left-[16%]" 
  },
  { 
    label: "personal brand strategy", 
    mobilePos: "top-[44%] left-[10%]", 
    desktopPos: "sm:top-[48%] sm:left-[10%]" 
  },
  { 
    label: "personalized feedback", 
    mobilePos: "top-[60%] left-[18%]", 
    desktopPos: "sm:top-[62%] sm:left-[20%]" 
  },
  { 
    label: "advisory session", 
    mobilePos: "top-[76%] left-[14%]", 
    desktopPos: "sm:top-[76%] sm:left-[8%]" 
  },

  // Right Outer Tags
  { 
    label: "ideation", 
    mobilePos: "top-[28%] left-[82%]", 
    desktopPos: "sm:top-[36%] sm:left-[68%]" 
  },
  { 
    label: "consultation", 
    mobilePos: "top-[44%] left-[88%]", 
    desktopPos: "sm:top-[48%] sm:left-[83%]" 
  },
  { 
    label: "one on one session", 
    mobilePos: "top-[60%] left-[85%]", 
    desktopPos: "sm:top-[62%] sm:left-[90%]" 
  },
  { 
    label: "strategy", 
    mobilePos: "top-[76%] left-[80%]", 
    desktopPos: "sm:top-[76%] sm:left-[75%]" 
  },
];

function RenderIcon({ type, color }: { type: ServicePill["icon"]; color: string }) {
  if (type === "heart") {
    return (
      <svg className="w-2 h-2 sm:w-3 sm:h-3 fill-current shrink-0" viewBox="0 0 24 24">
        <path className={color} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  if (type === "circle") {
    return <span className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-current shrink-0 ${color}`} />;
  }
  if (type === "square") {
    return <span className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-xs bg-current shrink-0 ${color}`} />;
  }
  return (
    <span
      className={`w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] sm:border-l-[4px] sm:border-r-[4px] sm:border-b-[7px] border-b-current shrink-0 ${color}`}
    />
  );
}

export function Services() {
  return (
    <section className="relative w-full h-screen max-h-screen bg-[#F8F9FA] px-3 sm:px-10 py-4 sm:py-6 font-sans text-neutral-900 overflow-hidden flex flex-col justify-between">
      {/* Background Portrait Overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.08] grayscale pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url(${profileImage})` }}
      />

      {/* Radial Ambient Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#8B261D]/08 blur-[90px] sm:blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto h-full flex flex-col justify-between relative z-10">
        
        {/* Header Layout */}
        <div className="flex justify-end w-full pt-1 sm:pt-2 z-20">
          <div className="text-right max-w-[280px] sm:max-w-lg">
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.08]">
              Architecting <br />
              <span className="font-serif italic font-normal text-[#8B261D]">
                Market Leadership
              </span>
            </h1>
            <p className="mt-1.5 sm:mt-2 text-[9.5px] sm:text-xs text-neutral-600 font-normal leading-relaxed">
              A synchronized strategic hub designed to scale your authority, elevate visual direction, and build systems that command long-term industry influence.
            </p>
          </div>
        </div>

        {/* Orbit Diagram Canvas */}
        <div className="relative w-full max-w-[1050px] mx-auto flex-1 min-h-0 flex items-center justify-center my-auto">
          
          {/* Inner Circle Border */}
          <motion.div
            animate={{
              borderColor: [
                "rgba(0,0,0,0.15)",
                "rgba(139,38,29,0.35)",
                "rgba(0,0,0,0.15)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full border border-neutral-400/60 pointer-events-none z-0"
          />

          {/* Outer Circle Border */}
          <motion.div
            animate={{
              borderColor: [
                "rgba(0,0,0,0.12)",
                "rgba(139,38,29,0.25)",
                "rgba(0,0,0,0.12)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute w-[350px] h-[350px] sm:w-[610px] sm:h-[610px] rounded-full border border-neutral-300 pointer-events-none z-0"
          />

          {/* Action Pills */}
          {servicePills.map((pill, index) => (
            <motion.div
              key={`${pill.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ scale: 1.05 }}
              className={`absolute z-30 cursor-pointer -translate-x-1/2 -translate-y-1/2 ${pill.mobilePos} ${pill.desktopPos}`}
            >
              <div className="flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-black text-white text-[8px] sm:text-[11px] font-medium lowercase tracking-wide shadow-md border border-black/90 hover:border-[#8B261D] transition-all duration-300 whitespace-nowrap">
                <RenderIcon type={pill.icon} color={pill.iconColor} />
                <span>{pill.label}</span>
              </div>
            </motion.div>
          ))}

          {/* Secondary Peripheral Tags */}
          {outerTags.map((tag, index) => (
            <motion.div
              key={tag.label + index}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 + index * 0.03 }}
              className={`absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${tag.mobilePos} ${tag.desktopPos}`}
            >
              <div className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 border border-neutral-300/80 shadow-xs text-[7px] sm:text-[9.5px] font-semibold text-neutral-400 lowercase tracking-tight whitespace-nowrap backdrop-blur-xs">
                {tag.label}
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;