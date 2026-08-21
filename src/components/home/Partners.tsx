import React from "react";
import { motion } from "framer-motion";

interface Logo {
  id: string | number;
  name: string;
  icon: React.ReactNode;
}

const sampleLogos: Logo[] = [
  {
    id: 1,
    name: "Logoipsum 1",
    icon: (
      <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <circle cx="7" cy="7" r="3" />
          <circle cx="17" cy="7" r="3" />
          <circle cx="7" cy="17" r="3" />
          <circle cx="17" cy="17" r="3" />
        </svg>
        <span className="font-semibold text-base">Logoipsum</span>
      </div>
    ),
  },
  {
    id: 2,
    name: "Logoipsum 2",
    icon: (
      <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
        <svg className="w-6 h-6 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M7 12l10 0M12 7l0 10" strokeLinecap="round" />
        </svg>
        <span className="font-semibold text-base">logoipsum</span>
      </div>
    ),
  },
  {
    id: 3,
    name: "Logoipsum 3",
    icon: (
      <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="4" rx="2" />
          <rect x="4" y="14" width="16" height="4" rx="2" />
        </svg>
        <span className="font-semibold text-base">logoipsum</span>
      </div>
    ),
  },
];

export const Partner: React.FC = () => {
  // Multiply array for smooth continuous marquee loop
  const logos = [
    ...sampleLogos,
    ...sampleLogos,
    ...sampleLogos,
    ...sampleLogos,
    ...sampleLogos,
  ];

  return (
    <section className="w-full bg-white pt-6 pb-12 overflow-hidden">
      {/* Max width container matching hero layout alignment */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Left-Aligned Header Label */}
        <h3 className="text-[0.65rem] sm:text-xs font-bold tracking-widest text-gray-400 uppercase mb-5 text-left">
          TRUSTED BY AMAZING CLIENTS
        </h3>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Edge gradient overlays for seamless clip */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Animated Track */}
          <motion.div
            className="flex items-center gap-10 sm:gap-14 md:gap-16 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="cursor-pointer text-slate-400 hover:text-slate-700 transition-colors duration-300 flex-shrink-0 flex items-center"
                whileHover={{ scale: 1.03 }}
              >
                {logo.icon}
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Partner;