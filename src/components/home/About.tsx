import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import aboutImage from "@/assets/BIMPE.jpg";
import brandLogo from "@/assets/logo.svg";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import { cn } from "@/lib/utils";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 0.95],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 0.95],
    [30, 0, 0, -30]
  );

  const ImageCard = () => (
    <div className="relative w-full max-w-[460px] rounded-[18px] overflow-hidden bg-neutral-900 shadow-md flex flex-col z-10 mx-auto">
      {/* Image */}
      <div className="w-full h-[280px] sm:h-[320px] xl:h-[340px] overflow-hidden">
        <img
          src={aboutImage}
          alt="Adebimpe Mohammed — Brand Strategist, Consultant and Creative Director"
          className="
            w-full h-full
            object-cover
            object-[center_10%]
            grayscale
            brightness-90
            contrast-105
          "
        />
      </div>

      {/* Stats */}
      <div className="bg-[#0A0A0A] text-white px-6 py-4 grid grid-cols-2 items-center border-t border-white/10">
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
            10+
          </span>

          <span className="text-[10px] sm:text-[11px] text-neutral-300 leading-snug">
            Years
            <br />
            Experience
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 border-l border-white/20">
          <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
            500+
          </span>

          <span className="text-[10px] sm:text-[11px] text-neutral-300 leading-snug">
            Brands &
            <br />
            Organisations
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        bg-white
        pt-0 sm:pt-2 lg:pt-4
        pb-12 sm:pb-16
        px-6 sm:px-10 lg:px-16
        font-sans
        overflow-hidden
      "
    >
      {/* Top Right Hexagon Pattern Background */}
      <div className="pointer-events-none absolute right-0 top-0 w-full max-w-[600px] h-[500px] overflow-hidden z-0">
        <HexagonPattern
          radius={40}
          x={-1}
          y={-1}
          className={cn(
            "opacity-40 [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
          )}
        />
      </div>

      {/* Ultra-faint Massive Logo Watermark */}
      <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] opacity-[0.035] select-none z-0">
        <img
          src={brandLogo}
          alt=""
          className="w-full h-auto object-contain brightness-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

        {/* LEFT / MAIN COLUMN */}
        <motion.div
          style={{ opacity, y }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.08] text-balance max-w-[650px]">
            Building Brands
            <br />
            Shaping Perception
            <br />
            <span className="text-[#5D1F17]">
              Expanding Possibility.
            </span>
          </h2>

          {/* Mobile Image */}
          <div className="my-6 block lg:hidden">
            <ImageCard />
          </div>

          {/* Introduction */}
          <p
            className="
              mt-2 lg:mt-5
              text-neutral-800
              text-sm
              sm:text-[15px]
              leading-7
              max-w-[570px]
              font-medium
            "
          >
            Adebimpe Mohammed is a Brand Strategist, Consultant, Creative
            Director and Author helping businesses, founders and professionals
            transform potential into brands that are clear, distinctive,
            trusted and positioned for meaningful growth.
          </p>

          {/* Experience */}
          {/* <p
            className="
              mt-4
              text-neutral-500
              text-sm
              sm:text-[15px]
              leading-7
              max-w-[570px]
            "
          >
            For more than a decade, she has worked at the intersection of{" "}
            <span className="text-neutral-800 font-medium">
              strategy, human perception, creativity and business
            </span>
            , helping clients clarify what they represent, strengthen how they
            are perceived and build brands capable of supporting where they are
            going next.
          </p> */}

          {/* BNM Brand House */}
          <p
            className="
              mt-4
              text-neutral-500
              text-sm
              sm:text-[15px]
              leading-7
              max-w-[570px]
            "
          >
            As Founder and Creative Director of{" "}
            <span className="text-neutral-800 font-semibold">
              BNM Brand House
            </span>
            , Adebimpe has led and contributed to brand engagements for more
            than{" "}
            <span className="text-neutral-800 font-semibold">
              500 businesses, professionals and organisations
            </span>{" "}
            across brand strategy, positioning, rebranding, personal branding,
            communication and creative direction.
          </p>

          {/* Belief */}
          {/* <div className="mt-6 max-w-[570px] border-l-2 border-[#5D1F17] pl-5">
            <p className="text-sm sm:text-[15px] leading-7 text-neutral-500">
              But the reason she does this work goes much deeper than branding.
            </p>

            <p className="mt-2 text-base sm:text-[17px] leading-7 text-neutral-900 font-semibold">
              At the heart of it is a belief in what people, businesses and
              ideas can become.
            </p>
          </div> */}

          {/* CTA */}
          <div className="mt-7">
            <motion.a
              href="/about"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[#5D1F17]
                font-bold
                text-[11px]
                uppercase
                tracking-[0.16em]
              "
            >
              <span>Discover my story</span>

              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </motion.a>
          </div>
        </motion.div>

        {/* DESKTOP IMAGE */}
        <div className="hidden lg:flex lg:col-span-5 justify-end z-10">
          <ImageCard />
        </div>
      </div>
    </section>
  );
};

export default About;




// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import aboutImage from "@/assets/BIMPE.jpg";
// import { AvatarCircles } from "@/components/ui/avatar-circles";

// const avatars = [
//   {
//     imageUrl: "https://avatars.githubusercontent.com/u/16860528",
//     profileUrl: "https://github.com/dillionverma",
//   },
//   {
//     imageUrl: "https://avatars.githubusercontent.com/u/20110627",
//     profileUrl: "https://github.com/tomonarifeehan",
//   },
//   {
//     imageUrl: "https://avatars.githubusercontent.com/u/106103625",
//     profileUrl: "https://github.com/BankkRoll",
//   },
//   {
//     imageUrl: "https://avatars.githubusercontent.com/u/59228569",
//     profileUrl: "https://github.com/safethecode",
//   },
//   {
//     imageUrl: "https://avatars.githubusercontent.com/u/59442788",
//     profileUrl: "https://github.com/sanjay-mali",
//   },
//   {
//     imageUrl: "https://avatars.githubusercontent.com/u/89768406",
//     profileUrl: "https://github.com/itsarghyadas",
//   },
// ];

// export const About: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Scroll driven disappearance effect
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [30, 0, 0, -30]);

//   // Image card matched to design frame
//   const ImageCard = () => (
//     <div className="relative w-full max-w-[460px] rounded-[18px] overflow-hidden bg-neutral-900 shadow-md flex flex-col">
//       {/* Container aligned to framing showing her head at top without overflow clipping */}
//       <div className="w-full h-[280px] sm:h-[320px] xl:h-[340px] overflow-hidden">
//         <img
//           src={aboutImage}
//           alt="Brand strategist"
//           className="w-full h-full object-cover object-[center_10%] grayscale brightness-90 contrast-105"
//         />
//       </div>

//       {/* Stats bottom bar centered layout */}
//       <div className="bg-[#0A0A0A] text-white px-6 py-4 grid grid-cols-2 items-center border-t border-white/10">
        
//         {/* Left Stat - Centered Content */}
//         <div className="flex items-center justify-center gap-3">
//           <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">5x</span>
//           <span className="text-[10px] sm:text-[11px] text-neutral-300 font-normal leading-snug text-left">
//             Average<br />Client ROI
//           </span>
//         </div>

//         {/* Right Stat - Centered Content */}
//         <div className="flex items-center justify-center gap-3 border-l border-white/20">
//           <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">10+</span>
//           <span className="text-[10px] sm:text-[11px] text-neutral-300 font-normal leading-snug text-left">
//             Years<br />Of Experience
//           </span>
//         </div>

//       </div>
//     </div>
//   );

//   return (
//     <section ref={containerRef} className="w-full bg-white pt-8 sm:pt-12 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 font-sans">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

//         {/* Left Narrative Content Column */}
//         <div className="lg:col-span-7 flex flex-col justify-start">

//           {/* Title Section */}
//           <motion.div style={{ opacity, y }} className="mb-7">
//             <h1 className=
//             // "text-4xl sm:text-5xl lg:text-[45px] font-semibold font-sans tracking-tight text-neutral-900 leading-[1.08]"
//             "text-3xl lg:text-[45px]  sm:text-3xl lg:text-4xl font-semibold tracking-[-0.04em] text-neutral-900 leading-tight text-balance"
//             >
//               Strategist, Partner,<br />
//               Advisor For Your<br />
//               <span className="text-[#5D1F17]">Brand’s Growth</span>
//             </h1>
//           </motion.div>

//           {/* Mobile Image Display */}
//           <div className="block lg:hidden my-6">
//             <ImageCard />
//           </div>

//           {/* Description Paragraph */}
//           <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-md font-normal mb-7">
//             With years of experience across industries, I combine strategy and storytelling to create brands that connect, communicate and convert.
//           </p>

//           {/* Avatar Circles */}
//           <div className="flex items-center mb-8">
//             <AvatarCircles numPeople={99} avatarUrls={avatars} />
//           </div>

//           {/* CTA Link Button */}
//           <motion.a
//             href="/about"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="group inline-flex items-center gap-2 w-fit text-[#5D1F17] hover:text-[#4A1812] font-bold text-xs font-sans uppercase tracking-wider transition-all duration-300"
//           >
//             <span>LEARN MORE</span>
//             <svg
//               className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               strokeWidth="2.5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//               />
//             </svg>
//           </motion.a>

//         </div>

//         {/* Right Desktop Image Column */}
//         <div className="hidden lg:flex lg:col-span-5 justify-end">
//           <ImageCard />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default About;