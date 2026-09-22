import React from "react";
import { motion } from "framer-motion";

interface Logo {
  id: string | number;
  name: string;
  src: string;
}

const sampleLogos: Logo[] = [
  {
    id: 1,
    name: "Winnie's School of Excellence",
    src: "/schoolfex.png",
  },
  {
    id: 2,
    name: "Coke",
    src: "/coke-bg.png",
  },
  {
    id: 3,
    name: "SPARA",
    src: "/spara-bg.png",
  },
  {
    id: 4,
    name: "McZeek Group",
    src: "/Mc-bg.png",
  },
  {
    id: 5,
    name: "Guardian",
    src: "/guardian-bg.png",
  },
  {
    id: 6,
    name: "Zenith",
    src: "/zenith-bg.png",
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





// import React from "react";
// import { motion } from "framer-motion";

// import logo1 from "../../../public/schoolofex-bg.png";
// import logo2 from "../../../public/coke-bg.png";
// import logo3 from "../../../public/spara-bg.png";
// import logo4 from "../../../public/Mc-bg.png";
// import logo5 from "../../../public/guardian-bg.png";
// import logo6 from "../../../public/zenith-bg.png";

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
//     name: "Coke",
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
//   {
//     id: 5,
//     name: "Guardian",
//     src: logo5,
//   },
//   {
//     id: 6,
//     name: "Zenith",
//     src: logo6,
//   },
// ];

// export const Partner: React.FC = () => {
//   const marqueeLogos = [...sampleLogos, ...sampleLogos];

//   return (
//     <section className="w-full overflow-hidden">
//       <div className="mx-auto max-w-7xl px-6 pt-1 pb-14 sm:px-10 sm:pt-3 sm:pb-16 lg:px-12 lg:pt-4 lg:pb-20">

//         {/* Header */}
//         <div className="mb-4 flex flex-col gap-6 lg:mb-5 lg:flex-row lg:items-start lg:justify-between">
//           <div className="max-w-xl">
//             <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7b2418] sm:text-[11px]">
//               Trusted by founders & growing brands
//             </p>
//           </div>
//         </div>

//         {/* Client Logos */}
//         <div className="relative">

//           {/* ================= DESKTOP MARQUEE ================= */}
//           <div className="relative hidden overflow-hidden border-y border-black/[0.08] md:block">

//             {/* Left Fade */}
//             <div
//               className="
//                 pointer-events-none
//                 absolute left-0 top-0 bottom-0
//                 z-10 w-24
//                 bg-gradient-to-r
//                 from-white
//                 to-transparent
//               "
//             />

//             {/* Right Fade */}
//             <div
//               className="
//                 pointer-events-none
//                 absolute right-0 top-0 bottom-0
//                 z-10 w-24
//                 bg-gradient-to-l
//                 from-white
//                 to-transparent
//               "
//             />

//             <motion.div
//               className="flex w-max items-center"
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 duration: 28,
//                 ease: "linear",
//               }}
//             >
//               {marqueeLogos.map((logo, index) => (
//                 <div
//                   key={`${logo.id}-${index}`}
//                   className="
//                     flex
//                     h-24
//                     w-[220px]
//                     flex-shrink-0
//                     items-center
//                     justify-center
//                     border-r
//                     border-black/[0.08]
//                     px-8
//                     lg:h-28
//                     lg:w-[260px]
//                   "
//                 >
//                   <img
//                     src={logo.src}
//                     alt={logo.name}
//                     className="
//                       max-h-10
//                       max-w-[160px]
//                       w-auto
//                       object-contain
//                       brightness-0
//                       opacity-100
//                       lg:max-h-11
//                       lg:max-w-[175px]
//                     "
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* ================= MOBILE MARQUEE ================= */}
//           <div className="relative overflow-hidden border-y border-black/[0.08] py-7 md:hidden">

//             {/* Left Fade */}
//             <div
//               className="
//                 pointer-events-none
//                 absolute bottom-0 left-0 top-0
//                 z-10 w-14
//                 bg-gradient-to-r
//                 from-[#fafafa]
//                 to-transparent
//               "
//             />

//             {/* Right Fade */}
//             <div
//               className="
//                 pointer-events-none
//                 absolute bottom-0 right-0 top-0
//                 z-10 w-14
//                 bg-gradient-to-l
//                 from-[#fafafa]
//                 to-transparent
//               "
//             />

//             <motion.div
//               className="flex w-max items-center"
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
//                     flex
//                     h-12
//                     w-40
//                     flex-shrink-0
//                     items-center
//                     justify-center
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

