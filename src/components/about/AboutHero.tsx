"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

import aboutHeroImg from "@/assets/BIMPE.jpg";
import galleryImg2 from "@/assets/BIMPE-2.jpg";
import galleryImg3 from "@/assets/BIMPE-3.jpg";
import galleryImg4 from "@/assets/BIMPE-4.jpg";
import galleryImg6 from "@/assets/BIMPE-6.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  className: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: aboutHeroImg,
    alt: "Adebimpe Mohammed - Brand Strategist & Creative Director",
    className:
      "w-[85vw] max-w-[320px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-2 md:row-span-2 md:h-[560px]",
  },
  {
    src: galleryImg2,
    alt: "Adebimpe Mohammed - Brand Consulting",
    className:
      "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
  },
  {
    src: galleryImg3,
    alt: "Adebimpe Mohammed - Keynote Speaker",
    className:
      "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
  },
  {
    src: galleryImg4,
    alt: "Adebimpe Mohammed - Strategy Session",
    className:
      "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
  },
  {
    src: galleryImg6,
    alt: "Adebimpe Mohammed - BNM Brand House Leadership",
    className:
      "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
  },
];

export function AboutHero() {
  return (
    <section className="w-full border-b border-neutral-200 bg-white px-6 py-16 font-sans text-neutral-900 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* 1. Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 mt-10 sm:mb-12 sm:mt-16 lg:mt-20"
        >
          <h1 className="whitespace-normal text-3xl font-semibold uppercase leading-tight tracking-[-0.02em] text-neutral-900 sm:text-5xl lg:text-[64px]">
            BIMPE MOHAMMED
          </h1>
        </motion.div>

        {/* 2. Sub-header Two-Column Copy + CTA */}
        <div className="mb-12 grid grid-cols-1 items-start gap-6 sm:mb-16 md:grid-cols-12 lg:gap-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
              Adebimpe Mohammed is a Brand Strategist, Consultant, Creative Director and Author helping businesses, founders and professionals transform potential into brands that are clear, distinctive, trusted and positioned for meaningful growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-5"
          >
            <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
              For more than a decade, she has worked at the intersection of strategy, human perception, creativity and business, helping clients clarify what they represent, strengthen how they are perceived and build brands capable of supporting where they are going next.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start justify-start md:col-span-2 md:justify-end"
          >
            <a
              href="/book-a-session"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5D1F17] transition-colors hover:text-neutral-900"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* 3. Image Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 w-full overflow-hidden border border-neutral-200 sm:mb-24"
        >
          <div className="scrollbar-none flex snap-x snap-mandatory gap-0 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
            {galleryImages.map((image, index) => (
              <motion.div
                key={`${image.alt}-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className={`group relative snap-start overflow-hidden border-b border-r border-neutral-200/60 bg-neutral-100 last:border-r-0 md:border-b-0 ${image.className}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4. Centered Tagline Narrative Statement */}
        <div className="mx-auto mb-20 max-w-4xl px-4 text-center sm:mb-28">
          <TextAnimate
            animation="blurIn"
            as="p"
            className="text-2xl font-light leading-snug tracking-tight text-neutral-800 sm:text-4xl lg:text-[40px]"
          >
            Building Brands. Shaping Perception. Expanding Possibility.
          </TextAnimate>
        </div>

        {/* 5. Vision & Mission Section */}
        <div className="grid grid-cols-1 items-start gap-8 border-t border-neutral-200 pt-12 lg:grid-cols-12">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <h2 className="font-sans text-2xl font-semibold uppercase tracking-[-0.04em] text-neutral-900 sm:text-3xl">
              PURPOSE &{" "}
              <span className="font-sans font-semibold text-[#5D1F17]">
                DIRECTION
              </span>
            </h2>
          </motion.div>

          {/* Vision / Mission */}
          <div className="divide-y divide-neutral-200 lg:col-span-8">

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-12 items-start gap-4 py-8"
            >
              <span className="col-span-2 font-mono text-xs font-medium text-neutral-400">
                01
              </span>

              <h3 className="col-span-4 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
                My Vision
              </h3>

              <div className="col-span-6 space-y-3 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                <p>
                  To help create a world where people, businesses and ideas have the clarity, confidence and opportunity to become the fullest expression of their potential—and use that potential to create meaningful value for others.
                </p>
                <p>
                  I imagine a world where great ideas are not lost because they were poorly expressed. Where capable people are not overlooked because they were poorly positioned. And where businesses with something valuable to offer have the strategy and courage to become everything they are capable of becoming.
                </p>
                <p className="font-serif italic text-neutral-800">
                  For me, this is bigger than branding. It is about helping people see possibilities they may not yet see for themselves—and giving those possibilities the clarity, strategy and expression they need to become real.
                </p>
              </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-12 items-start gap-4 py-8"
            >
              <span className="col-span-2 font-mono text-xs font-medium text-neutral-400">
                02
              </span>

              <h3 className="col-span-4 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
                My Mission
              </h3>

              <div className="col-span-6 space-y-3 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                <p>
                  To help people and businesses see the value in what they already possess, imagine what it could become, and deliberately build the bridge between the two.
                </p>
                <p>
                  Through strategy, branding and creative direction, I help clients understand where they are, clarify where they want to go and design the decisions, experiences and expressions required to move them forward.
                </p>
                <p className="font-serif italic text-neutral-800">
                  Because for me, the goal has never been simply to build better brands. It is to help the people and businesses behind them achieve better outcomes—and become more of what they already have the potential to be.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutHero;





// "use client";

// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import { TextAnimate } from "@/components/ui/text-animate";

// // Import your gallery images
// import aboutHeroImg from "@/assets/BIMPE.jpg";
// import galleryImg2 from "@/assets/BIMPE-2.jpg";
// import galleryImg3 from "@/assets/BIMPE-3.jpg";
// import galleryImg4 from "@/assets/BIMPE-4.jpg";
// import galleryImg6 from "@/assets/BIMPE-6.jpg";

// interface GalleryImage {
//   src: string;
//   alt: string;
//   className: string;
// }

// const galleryImages: GalleryImage[] = [
//   {
//     src: aboutHeroImg,
//     alt: "Bimpe Mohammed - Executive Brand Strategist",
//     className:
//       "w-[85vw] max-w-[320px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-2 md:row-span-2 md:h-[560px]",
//   },
//   {
//     src: galleryImg2,
//     alt: "Bimpe Mohammed - Consulting",
//     className:
//       "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
//   },
//   {
//     src: galleryImg3,
//     alt: "Bimpe Mohammed - Speaker",
//     className:
//       "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
//   },
//   {
//     src: galleryImg4,
//     alt: "Bimpe Mohammed - Strategy Session",
//     className:
//       "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
//   },
//   {
//     src: galleryImg6,
//     alt: "Bimpe Mohammed - Leadership",
//     className:
//       "w-[75vw] max-w-[280px] h-[400px] shrink-0 md:w-auto md:max-w-none md:col-span-1 md:row-span-1 md:h-[280px]",
//   },
// ];

// export function AboutHero() {
//   return (
//     <section className="w-full border-b border-neutral-200 bg-white px-6 py-16 font-sans text-neutral-900 sm:px-12 sm:py-24 lg:px-20">
//       <div className="mx-auto max-w-7xl">

//         {/* 1. Headline */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-8 mt-10 sm:mb-12 sm:mt-16 lg:mt-20"
//         >
//           <h1 className="whitespace-nowrap text-2xl font-semibold uppercase leading-tight tracking-[-0.01em] text-neutral-900 sm:text-5xl lg:text-[68px]">
//             MEET BIMPE MOHAMMED
//           </h1>
//         </motion.div>

//         {/* 2. Sub-header Two-Column Copy + CTA */}
//         <div className="mb-12 grid grid-cols-1 items-start gap-6 sm:mb-16 md:grid-cols-12 lg:gap-12">

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="md:col-span-5"
//           >
//             <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
//               At our core, clarity, position, and brand strategy shape every
//               detail. Driven by purpose and executive insight, we engineer
//               timeless brand systems that elevate your business with quiet
//               confidence.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.15 }}
//             className="md:col-span-5"
//           >
//             <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
//               Brand building is a discipline where intention, visual identity,
//               and strategic direction converge to create meaningful
//               differentiation and long-term enterprise value.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex items-start justify-start md:col-span-2 md:justify-end"
//           >
//             <a
//               href="/book-a-session"
//               className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5D1F17] transition-colors hover:text-neutral-900"
//             >
//               <span>BOOK CONSULTATION</span>

//               <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </a>
//           </motion.div>
//         </div>

//         {/* 3. Image Bento Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="mb-16 w-full overflow-hidden border border-neutral-200 sm:mb-24"
//         >
//           <div className="scrollbar-none flex snap-x snap-mandatory gap-0 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
//             {galleryImages.map((image, index) => (
//               <motion.div
//                 key={`${image.alt}-${index}`}
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.5,
//                   delay: index * 0.08,
//                 }}
//                 className={`group relative snap-start overflow-hidden border-b border-r border-neutral-200/60 bg-neutral-100 last:border-r-0 md:border-b-0 ${image.className}`}
//               >
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   loading={index === 0 ? "eager" : "lazy"}
//                   decoding="async"
//                   className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* 4. Centered Narrative Statement */}
//         <div className="mx-auto mb-20 max-w-4xl px-4 text-center sm:mb-28">
//           <TextAnimate
//             animation="blurIn"
//             as="p"
//             className="text-xl font-normal leading-snug tracking-tight text-neutral-800 sm:text-3xl lg:text-[34px]"
//           >
//             Discover a new approach to brand authority built on strategy and
//             precision. Rooted in research and execution, our frameworks combine
//             timeless aesthetics, audience positioning, and brand momentum.
//           </TextAnimate>
//         </div>

//         {/* 5. Vision & Mission Section */}
//         <div className="grid grid-cols-1 items-start gap-8 border-t border-neutral-200 pt-12 lg:grid-cols-12">

//           {/* Section Heading */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="lg:col-span-4"
//           >
//             <h2 className="font-sans text-2xl font-semibold uppercase tracking-[-0.04em] text-neutral-900 sm:text-3xl">
//               INSIDE{" "}
//               <span className="font-sans font-semibold text-[#5D1F17]">
//                 BIMPE
//               </span>
//             </h2>
//           </motion.div>

//           {/* Vision / Mission */}
//           <div className="divide-y divide-neutral-200 lg:col-span-8">

//             {/* Our Vision */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="grid grid-cols-12 items-start gap-4 py-8"
//             >
//               <span className="col-span-2 font-mono text-xs font-medium text-neutral-400">
//                 01
//               </span>

//               <h3 className="col-span-4 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
//                 Our Vision
//               </h3>

//               <p className="col-span-6 text-xs leading-relaxed text-neutral-600 sm:text-sm">
//                 We view brand strategy as an operational asset. It is a tool
//                 for driving clarity, pricing authority, and market leadership
//                 through elevated visual systems and positioning.
//               </p>
//             </motion.div>

//             {/* Our Mission */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="grid grid-cols-12 items-start gap-4 py-8"
//             >
//               <span className="col-span-2 font-mono text-xs font-medium text-neutral-400">
//                 02
//               </span>

//               <h3 className="col-span-4 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
//                 Our Mission
//               </h3>

//               <p className="col-span-6 text-xs leading-relaxed text-neutral-600 sm:text-sm">
//                 We are dedicated to building identity architectures that
//                 connect strategy with high-impact design crafting sustainable
//                 brand systems engineered to scale and endure.
//               </p>
//             </motion.div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default AboutHero;

