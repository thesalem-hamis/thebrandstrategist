// import React from "react";
// import { motion } from "framer-motion";

// import logo1 from "../../../public/schoolofex-bg.png";
// import logo2 from "../../../public/sola-bg.png";
// import logo3 from "../../../public/spara-bg.png";
// import logo4 from "../../../public/Mc-bg.png";

// interface Logo {
//   id: string | number;
//   name: string;
//   src: string;
// }

// const sampleLogos: Logo[] = [
//   {
//     id: 1,
//     name: "Winnie's School of Excellence",
//     src: logo1,
//   },
//   {
//     id: 2,
//     name: "Sola Osindeinde",
//     src: logo2,
//   },
//   {
//     id: 3,
//     name: "SPARA",
//     src: logo3,
//   },
//   {
//     id: 4,
//     name: "McZeek Group",
//     src: logo4,
//   },
// ];

// export const Partner: React.FC = () => {
//   const marqueeLogos = [...sampleLogos, ...sampleLogos];

//   return (
//     <section className="w-full  overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16 lg:py-20">

//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">

//           <div className="max-w-xl">
//             <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#7b2418] uppercase mb-4">
//               Trusted by founders & growing brands
//             </p>

//             <h3 className="text-2xl sm:text-3xl lg:text-[2.6rem] leading-[1.05] tracking-[-0.04em] font-medium text-[#171717]">
//               Brands built with{" "}
//               <span className="text-[#7b2418]">clarity.</span>
//             </h3>
//           </div>

//           <div className="max-w-xs lg:text-right">
//             <p className="text-xs sm:text-sm leading-6 text-neutral-500">
//               Working alongside ambitious businesses, founders and
//               organisations to turn ideas into brands that matter.
//             </p>
//           </div>
//         </div>

//         {/* Client Logos */}
//         <div className="relative">

//           {/* Desktop */}
//           <div className="hidden md:grid grid-cols-4 border-y border-black/[0.08]">
//             {sampleLogos.map((logo) => (
//               <div
//                 key={logo.id}
//                 className="
//                   h-24 lg:h-28
//                   flex items-center justify-center
//                   px-6
//                   border-r last:border-r-0
//                   border-black/[0.08]
//                 "
//               >
//                 <img
//                   src={logo.src}
//                   alt={logo.name}
//                   className="
//                     max-h-9 lg:max-h-10
//                     max-w-[150px]
//                     w-auto
//                     object-contain
//                     brightness-0
//                     opacity-100
//                   "
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden relative overflow-hidden border-y border-black/[0.08] py-7">

//             <div
//               className="
//                 pointer-events-none
//                 absolute left-0 top-0 bottom-0
//                 w-14
//                 bg-gradient-to-r
//                 from-[#fafafa]
//                 to-transparent
//                 z-10
//               "
//             />

//             <div
//               className="
//                 pointer-events-none
//                 absolute right-0 top-0 bottom-0
//                 w-14
//                 bg-gradient-to-l
//                 from-[#fafafa]
//                 to-transparent
//                 z-10
//               "
//             />

//             <motion.div
//               className="flex items-center w-max"
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 duration: 24,
//                 ease: "linear",
//               }}
//             >
//               {marqueeLogos.map((logo, index) => (
//                 <div
//                   key={`${logo.id}-${index}`}
//                   className="
//                     w-40
//                     h-12
//                     flex-shrink-0
//                     flex items-center justify-center
//                     px-6
//                   "
//                 >
//                   <img
//                     src={logo.src}
//                     alt={logo.name}
//                     className="
//                       max-h-8
//                       max-w-[125px]
//                       w-auto
//                       object-contain
//                       brightness-0
//                       opacity-100
//                     "
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Partner;




import React from "react";
import { motion } from "framer-motion";

import logo1 from "../../../public/schoolofex-bg.png";
import logo2 from "../../../public/sola-bg.png";
import logo3 from "../../../public/spara-bg.png";
import logo4 from "../../../public/Mc-bg.png";

interface Logo {
  id: string | number;
  name: string;
  src: string;
}

const sampleLogos: Logo[] = [
  {
    id: 1,
    name: "Winnie's School of Excellence",
    src: logo1,
  },
  {
    id: 2,
    name: "Sola Osindeinde",
    src: logo2,
  },
  {
    id: 3,
    name: "SPARA",
    src: logo3,
  },
  {
    id: 4,
    name: "McZeek Group",
    src: logo4,
  },
];

export const Partner: React.FC = () => {
  const marqueeLogos = [...sampleLogos, ...sampleLogos];

  return (
    <section className="w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-1 pb-14 sm:px-10 sm:pt-3 sm:pb-16 lg:px-12 lg:pt-4 lg:pb-20">

        {/* Header */}
        <div className="mb-4 flex flex-col gap-6 lg:mb-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7b2418] sm:text-[11px]">
              Trusted by founders & growing brands
            </p>
          </div>
        </div>

        {/* Client Logos */}
        <div className="relative">

          {/* ================= DESKTOP MARQUEE ================= */}
          <div className="relative hidden overflow-hidden border-y border-black/[0.08] md:block">

            {/* Left Fade */}
            <div
              className="
                pointer-events-none
                absolute left-0 top-0 bottom-0
                z-10 w-24
                bg-gradient-to-r
                from-white
                to-transparent
              "
            />

            {/* Right Fade */}
            <div
              className="
                pointer-events-none
                absolute right-0 top-0 bottom-0
                z-10 w-24
                bg-gradient-to-l
                from-white
                to-transparent
              "
            />

            <motion.div
              className="flex w-max items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              }}
            >
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="
                    flex
                    h-24
                    w-[220px]
                    flex-shrink-0
                    items-center
                    justify-center
                    border-r
                    border-black/[0.08]
                    px-8
                    lg:h-28
                    lg:w-[260px]
                  "
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="
                      max-h-10
                      max-w-[160px]
                      w-auto
                      object-contain
                      brightness-0
                      opacity-100
                      lg:max-h-11
                      lg:max-w-[175px]
                    "
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ================= MOBILE MARQUEE ================= */}
          <div className="relative overflow-hidden border-y border-black/[0.08] py-7 md:hidden">

            {/* Left Fade */}
            <div
              className="
                pointer-events-none
                absolute bottom-0 left-0 top-0
                z-10 w-14
                bg-gradient-to-r
                from-[#fafafa]
                to-transparent
              "
            />

            {/* Right Fade */}
            <div
              className="
                pointer-events-none
                absolute bottom-0 right-0 top-0
                z-10 w-14
                bg-gradient-to-l
                from-[#fafafa]
                to-transparent
              "
            />

            <motion.div
              className="flex w-max items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 24,
                ease: "linear",
              }}
            >
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="
                    flex
                    h-12
                    w-40
                    flex-shrink-0
                    items-center
                    justify-center
                    px-6
                  "
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="
                      max-h-8
                      max-w-[125px]
                      w-auto
                      object-contain
                      brightness-0
                      opacity-100
                    "
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Partner;

