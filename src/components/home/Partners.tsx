import React from "react";
import { motion } from "framer-motion";

import logo1 from "../../assets/schoolofex.png"
import logo2 from "../../assets/sola.png";
import logo3 from "../../assets/spara.png";
import logo4 from "../../assets/Mc.png";

interface Logo {
  id: string | number;
  name: string;
  src: string;
}

const sampleLogos: Logo[] = [
  {
    id: 1,
    name: "Logo 1",
    src: logo1,
  },
  {
    id: 2,
    name: "Logo 2",
    src: logo2,
  },
  {
    id: 3,
    name: "Logo 3",
    src: logo3,
  },
  {
    id: 4,
    name: "Logo 4",
    src: logo4,
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
                className="cursor-pointer grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Partner;