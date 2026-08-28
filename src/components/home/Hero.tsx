import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/Mainn.png";

export function Hero() {
  return (
    <section className="relative h-[100dvh] max-h-[100dvh] w-full box-border px-2 sm:px-4 pb-2 sm:pb-4 pt-0 bg-white overflow-hidden font-sans">
      {/* Outer Curved Container */}
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] bg-[#9B9C9E] text-white font-sans">
        
        {/* Background Depth & Noise Layers */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#B4B5B7_0%,#9B9C9E_45%,#818285_100%)]" />
          <div className="absolute -top-1/3 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[60%] w-[60%] rounded-full bg-black/20 blur-[110px]" />
          <div className="absolute -bottom-1/3 -right-1/4 h-[65%] w-[65%] rounded-full bg-black/15 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_140px_60px_rgba(0,0,0,0.18)]" />
        </div>

        {/* Hero Portrait Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 flex h-[125%] sm:h-[92%] md:h-[95%] w-auto -translate-x-1/2 items-end justify-center"
        >
          <img
            src={heroImage}
            alt="Brand strategist portrait"
            className="h-full w-auto max-w-[220%] sm:max-w-[650px] md:max-w-[850px] xl:max-w-[950px] object-contain object-bottom drop-shadow-2xl -translate-y-16 sm:translate-y-0"
          />
        </motion.div>

        {/* Hero Content Grid */}
        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-end gap-4 px-6 pb-6 pt-16 sm:px-10 sm:pb-10 md:grid-cols-12 md:gap-6 md:pt-20 font-sans">
          
          {/* Left Column: Headline & Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-between h-full md:h-auto md:col-span-5 md:pb-2 md:-translate-y-4 lg:-translate-y-8"
          >
            <div className="translate-y-14 sm:translate-y-6 md:translate-y-0">
              <p className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                Brand Strategist and Consultant
              </p>
              <h1 className="mt-1 md:mt-2 text-2xl font-normal uppercase leading-[0.95] tracking-tight text-white sm:text-3xl md:text-[3rem] lg:text-[3.25rem]">
                I turn business <br />
                vision into <br />
                brand
              </h1>
              <p className="font-sans font-light italic text-3xl leading-tight text-white/90 sm:text-3xl md:text-[3.25rem] tracking-tight">
                Advantage.
              </p>
            </div>

            {/* Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="hidden md:flex items-stretch gap-3 mt-6 sm:mt-8"
            >
              <div className="flex w-36 flex-col justify-between rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-none border border-white/25 bg-white/10 p-3.5 backdrop-blur-md">
                <p className="text-[0.65rem] font-medium leading-snug text-white/90">
                  Turning bold ideas into brands that matter.
                </p>
                <p className="mt-2 text-[0.60rem] font-bold text-white/70">
                  Your Vision, Strategically Branded.
                </p>
              </div>

              <div className="flex min-w-[110px] flex-col justify-between rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-none border border-white/25 bg-white/10 p-3.5 backdrop-blur-md">
                <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">95%</p>
                <p className="mt-1 text-[0.65rem] font-medium text-white/80">
                  Client Satisfaction
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Middle Spacer */}
          <div className="hidden md:col-span-3 md:block" />

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-start justify-start md:col-span-4 md:-translate-y-12 lg:-translate-y-16 md:pb-8 md:pl-4"
          >
            <p className="text-sm font-semibold uppercase leading-tight tracking-tight text-white sm:text-base md:text-xl">
              Strategic thinking <br />
              Distinctive brands <br />
              Real growth
            </p>
            <p className="mt-1.5 max-w-xs text-[0.7rem] sm:text-xs leading-relaxed text-white/80 mb-4">
              From business vision to brand positioning.
            </p>

            {/* Burgundy CTA Button with CTA Component Layout */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5D1F17] hover:bg-[#4a1812] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(93,31,23,0.4)] shrink-0"
            >
              <span>BOOK A CONSULTATION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;




//DARK VARIANT OF THE HERO SECTION
// import { motion } from "framer-motion";
// import heroImage from "@/assets/BIMPE.png";

// export function Hero() {
//   return (
//     <section className="relative h-[100dvh] max-h-[100dvh] w-full box-border px-2 sm:px-4 pb-2 sm:pb-4 pt-0 bg-white overflow-hidden">
//       {/* Outer Curved Container */}
//       <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] bg-[#141414] text-white">
        
//         {/* Background Depth & Noise Layers */}
//         <div className="pointer-events-none absolute inset-0 z-0">
//           <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#2a2a2a_0%,#141414_45%,#0a0a0a_100%)]" />
//           <div className="absolute -top-1/3 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-white/5 blur-[100px]" />
//           <div className="absolute -bottom-1/4 -left-1/4 h-[60%] w-[60%] rounded-full bg-white/5 blur-[110px]" />
//           <div className="absolute -bottom-1/3 -right-1/4 h-[65%] w-[65%] rounded-full bg-white/5 blur-[120px]" />
          
//           {/* Grid Box Lines - Glass Style */}
//           <div className="absolute inset-0 opacity-[0.08]">
//             <div className="absolute top-0 left-0 h-full w-full" style={{
//               backgroundImage: `
//                 linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
//                 linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '80px 80px',
//             }} />
//           </div>
          
//           {/* Animated Light at Top Right - More Evident on Desktop */}
//           <motion.div
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.4, 0.8, 0.4],
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="absolute -top-1/4 -right-1/4 h-[70%] w-[70%] rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent blur-[120px] md:blur-[150px]"
//           />
//           <motion.div
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [0.3, 0.7, 0.3],
//             }}
//             transition={{
//               duration: 3.5,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 0.5,
//             }}
//             className="absolute -top-1/5 -right-1/5 h-[50%] w-[50%] rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent blur-[100px] md:blur-[120px]"
//           />
//           <motion.div
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.2, 0.5, 0.2],
//             }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 1,
//             }}
//             className="absolute top-[5%] right-[15%] h-[30%] w-[30%] rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent blur-[80px] md:blur-[100px]"
//           />
          
//           <div
//             className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
//             style={{
//               backgroundImage:
//                 "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//             }}
//           />
//           <div className="absolute inset-0 shadow-[inset_0_0_140px_60px_rgba(0,0,0,0.4)]" />
//         </div>

//         {/* Hero Portrait Image - Much bigger and longer on mobile */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
//           className="pointer-events-none absolute bottom-0 left-1/2 z-0 flex h-[140%] sm:h-[92%] md:h-[95%] w-auto -translate-x-1/2 items-end justify-center"
//         >
//           <img
//             src={heroImage}
//             alt="Brand strategist portrait"
//             className="h-full w-auto max-w-[280%] sm:max-w-[650px] md:max-w-[850px] xl:max-w-[950px] object-contain object-bottom drop-shadow-2xl -translate-y-20 sm:translate-y-0"
//           />
//         </motion.div>

//         {/* Hero Content Grid */}
//         <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-end gap-4 px-6 pb-6 pt-16 sm:px-10 sm:pb-10 md:grid-cols-12 md:gap-6 md:pt-20">
          
//           {/* Left Column: Headline & Glass Cards */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
//             className="flex flex-col justify-between h-full md:h-auto md:col-span-5 md:pb-2 md:-translate-y-4 lg:-translate-y-8"
//           >
//             <div className="translate-y-16 sm:translate-y-6 md:translate-y-0">
//               <p className="text-[0.65rem] sm:text-xs font-serif uppercase tracking-widest text-white/60">
//                 Brand Strategist and Consultant
//               </p>
//               <h1 className="mt-1 md:mt-2 font-serif text-3xl font-extrabold uppercase leading-[0.85] tracking-tight text-white sm:text-4xl md:text-[3.5rem]">
//                 I turn business <br />
//                 vision into <br />
//                 brand
//               </h1>
//               <p className="font-serif text-3xl italic leading-[0.85] text-white sm:text-4xl md:text-[3.5rem]">
//                 Advantage.
//               </p>
//             </div>

//             {/* Glass Cards - Glass Morphism Style */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
//               className="hidden md:flex items-stretch gap-3 mt-6 sm:mt-8"
//             >
//               {/* Turning Bold Ideas Card */}
//               <div className="flex w-36 flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
//                 <p className="text-[0.65rem] font-serif font-medium leading-snug text-white/80">
//                   Turning bold ideas into brands that matter.
//                 </p>
//                 <p className="mt-2 text-[0.60rem] font-serif font-bold text-white/60">
//                   Your Vision, Strategically Branded.
//                 </p>
//               </div>

//               {/* 95% Card */}
//               <div className="flex min-w-[110px] flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
//                 <p className="text-3xl font-serif font-extrabold text-white">95%</p>
//                 <p className="mt-1 text-[0.65rem] font-serif font-medium text-white/70">
//                   Client Satisfaction
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Middle Spacer for Character Image */}
//           <div className="hidden md:col-span-3 md:block" />

//           {/* Right Column */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
//             className="flex flex-col items-start justify-start md:col-span-4 md:-translate-y-12 lg:-translate-y-16 md:pb-8 md:pl-4"
//           >
//             <p className="text-sm font-serif font-bold uppercase leading-tight tracking-snug text-white/90 sm:text-base md:text-xl">
//               Strategic thinking <br />
//               Distinctive brands <br />
//               Real growth
//             </p>
//             <p className="mt-1.5 max-w-xs text-[0.7rem] sm:text-xs font-serif leading-relaxed text-white/60">
//               From business vision to brand positioning.
//             </p>

//             {/* Normal White CTA Button */}
//             <motion.a
//               href="#contact"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="group mt-3 sm:mt-5 inline-flex items-center justify-center gap-2.5
//                 bg-white hover:bg-white/90
//                 border border-white/20
//                 rounded-2xl px-6 py-3.5 sm:px-8 sm:py-3.5
//                 text-[0.70rem] sm:text-xs font-serif font-bold uppercase tracking-wider text-[#141414]
//                 shadow-lg hover:shadow-xl
//                 transition-all duration-300"
//             >
//               <span>Book A Consultation</span>
//               <svg
//                 className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-[-45deg]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2.5"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </motion.a>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }