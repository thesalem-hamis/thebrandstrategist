// import React from "react";
// import aboutImage from "@/assets/BIMPE.jpg";

// const About: React.FC = () => {
//   return (
//     <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20">
//       {/* items-start aligns both the heading content and image card at the exact same top line */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
//         {/* Left: Text content */}
//         <div>
//           <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-neutral-900">
//             Strategist, Partner,
//             <br />
//             Advisor For Your
//             <br />
//             <span className="text-[#7A1F1F]">Brand's Growth</span>
//           </h1>

//           <p className="mt-6 text-neutral-500 text-base leading-relaxed max-w-md">
//             With years of experience across industries, I combine strategy
//             and storytelling to create brands that connect, communicate and
//             convert.
//           </p>

//           <a
//             href="#learn-more"
//             className="mt-8 inline-flex items-center gap-2 text-[#7A1F1F] font-medium tracking-wide text-sm uppercase hover:gap-3 transition-all duration-300"
//           >
//             Learn More
//             <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>

//         {/* Right: Image with stat overlay */}
//         <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-md flex flex-col w-full">
//           {/* Image - fills the box */}
//           <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px]">
//             <img
//               src={aboutImage}
//               alt="Brand strategist speaking on stage"
//               className="w-full h-full object-cover grayscale"
//             />
//           </div>

//           {/* Thicker white line above stat bar */}
//           <div className="w-full h-[3px] bg-white" />

//           {/* Solid Black Stat Bar Overlay */}
//           <div className="bg-black text-white px-5 py-4 sm:px-7 sm:py-4 flex items-center justify-between">
//             {/* Stat 1 */}
//             <div className="flex items-center gap-3">
//               <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
//                 5x
//               </span>
//               <div className="flex flex-col">
//                 <span className="text-[9px] sm:text-[10px] font-medium text-white uppercase tracking-wider">
//                   Average
//                 </span>
//                 <span className="text-[9px] sm:text-[10px] font-medium text-white/70 uppercase tracking-wider">
//                   Client ROI
//                 </span>
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="w-px h-8 bg-white/20" />

//             {/* Stat 2 */}
//             <div className="flex items-center gap-3">
//               <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
//                 10+
//               </span>
//               <div className="flex flex-col">
//                 <span className="text-[9px] sm:text-[10px] font-medium text-white uppercase tracking-wider">
//                   Years
//                 </span>
//                 <span className="text-[9px] sm:text-[10px] font-medium text-white/70 uppercase tracking-wider">
//                   Of Experience
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;


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

//   return (
//     <section ref={containerRef} className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-center">

//         {/* Narrative Content Column (Desktop: Left | Mobile: Text First, Image Middle, Actions Last) */}
//         <div className="lg:col-span-7 flex flex-col justify-between h-full order-1">

//           {/* 1. Disappearing Text Section (First on Mobile & Desktop) */}
//           <motion.div style={{ opacity, y }} className="flex flex-col items-start mb-6 lg:mb-8">
//             {/* Top Badge */}
//             {/* <div className="inline-block px-3 py-1 bg-neutral-100 border border-neutral-200/80 rounded-md text-[11px] font-semibold text-neutral-600 uppercase tracking-wide mb-5">
//               About Us
//             </div> */}

//             {/* Main Headline */}
//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-semibold leading-tight tracking-tight text-neutral-900 max-w-2xl">
//               {/* We design modern brand strategies that balance <span className="text-[#5D1F17]">vision</span>, <span className="text-[#5D1F17]">clarity</span>, and <span className="text-[#5D1F17]">timeless impact</span> for sustained business growth. */}
//               Strategist, Partner, <span className="text-[#5D1F17]">an Advisor</span> For Your Brand’s Growth
//             </h2>
//           </motion.div>

//           {/* Mobile Image Insertion (Visible only on mobile/tablet below main headline) */}
//           <div className="block lg:hidden h-[360px] sm:h-[440px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-sm my-6">
//             <img
//               src={aboutImage}
//               alt="Brand strategist"
//               className="w-full h-full object-cover object-center"
//             />
//           </div>

//           {/* 2. Bottom Content Section (After Image on Mobile) */}
//           <div className="flex flex-col gap-5 lg:gap-6 mt-2 lg:mt-4">

//             {/* Paragraph */}
//             <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-lg">
//               With over a decade of experience, I work with founders and teams to build brands that are strategically sound, visually distinctive and built to grow in competitive markets.
//             </p>

//             {/* Avatar Circles */}
//             <div className="flex items-center">
//               <AvatarCircles numPeople={99} avatarUrls={avatars} />
//             </div>

//             {/* CTA Button */}
//             <motion.a
//               href="#contact"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="group inline-flex items-center justify-center gap-2.5 w-fit
//                   hover:border-[#4A1812]
//                 text-[#5D1F17] hover:text-[#4A1812] font-medium text-[15px] tracking-[-0.01em]
//                 px-6 py-3.5 rounded-2xl
//                 transition-all duration-300 shadow-sm"
//               // style={{ fontFamily: "var(--font-sans)" }}
//             >
//               <span>Learn more</span>
//               <svg
//                 className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-[-45deg]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2.5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                 />
//               </svg>
//             </motion.a>
//           </div>

//         </div>

//         {/* Desktop Image Column (Hidden on Mobile, Displayed on Desktop Right) */}
//         <div className="hidden lg:block lg:col-span-5 h-[480px] xl:h-[520px] w-full  overflow-hidden bg-neutral-100 shadow-sm order-2">
//           <img
//             src={aboutImage}
//             alt="Brand strategist"
//             className="w-full h-full object-cover object-center"
//           />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default About;


import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import aboutImage from "@/assets/BIMPE.jpg";
import { AvatarCircles } from "@/components/ui/avatar-circles";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll driven disappearance effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [30, 0, 0, -30]);

  // Image card matched to design frame
  const ImageCard = () => (
    <div className="relative w-full max-w-[460px] rounded-[18px] overflow-hidden bg-neutral-900 shadow-md flex flex-col">
      {/* Container aligned to framing showing her head at top without overflow clipping */}
      <div className="w-full h-[280px] sm:h-[320px] xl:h-[340px] overflow-hidden">
        <img
          src={aboutImage}
          alt="Brand strategist"
          className="w-full h-full object-cover object-[center_10%] grayscale brightness-90 contrast-105"
        />
      </div>

      {/* Stats bottom bar centered layout */}
      <div className="bg-[#0A0A0A] text-white px-6 py-4 grid grid-cols-2 items-center border-t border-white/10">
        
        {/* Left Stat - Centered Content */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">5x</span>
          <span className="text-[10px] sm:text-[11px] text-neutral-300 font-normal leading-snug text-left">
            Average<br />Client ROI
          </span>
        </div>

        {/* Right Stat - Centered Content */}
        <div className="flex items-center justify-center gap-3 border-l border-white/20">
          <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">10+</span>
          <span className="text-[10px] sm:text-[11px] text-neutral-300 font-normal leading-snug text-left">
            Years<br />Of Experience
          </span>
        </div>

      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="w-full bg-white pt-8 sm:pt-12 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* Left Narrative Content Column */}
        <div className="lg:col-span-7 flex flex-col justify-start">

          {/* Title Section */}
          <motion.div style={{ opacity, y }} className="mb-7">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-neutral-900 leading-[1.08]">
              Strategist, Partner,<br />
              Advisor For Your<br />
              <span className="text-[#5D1F17]">Brand’s Growth</span>
            </h1>
          </motion.div>

          {/* Mobile Image Display */}
          <div className="block lg:hidden my-6">
            <ImageCard />
          </div>

          {/* Description Paragraph */}
          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-md font-normal mb-7">
            With years of experience across industries, I combine strategy and storytelling to create brands that connect, communicate and convert.
          </p>

          {/* Avatar Circles */}
          <div className="flex items-center mb-8">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
          </div>

          {/* CTA Link Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 w-fit text-[#5D1F17] hover:text-[#4A1812] font-bold text-xs uppercase tracking-wider transition-all duration-300"
          >
            <span>LEARN MORE</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </motion.a>

        </div>

        {/* Right Desktop Image Column */}
        <div className="hidden lg:flex lg:col-span-5 justify-end">
          <ImageCard />
        </div>

      </div>
    </section>
  );
};

export default About;