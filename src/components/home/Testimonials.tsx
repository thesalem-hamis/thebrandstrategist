import React from "react";
import { motion, useAnimationControls } from "framer-motion";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  avatar: string;
  companyLogo?: string;
  bgClass?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Bimpe",
    role: "Life in Bloom Foundation",
    quote:
      "Bimpe helped us clarify our brand and communicate our value so clearly. Our business has grown beyond what we imagined.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    companyLogo: "Life in Bloom Foundation",
    bgClass: "bg-white",
  },
  {
    id: "2",
    author: "Daniel Frost",
    role: "COO, Relay",
    quote:
      "Support was unreal. We went from mockup to production without friction.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    companyLogo: "OpenAI",
    bgClass: "bg-neutral-100",
  },
  {
    id: "3",
    author: "Priya Nair",
    role: "Staff Engineer, Kernel",
    quote:
      "Open, composable, and beautiful. Our engineers actually enjoy building with this.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    companyLogo: "GitHub",
    bgClass: "bg-white",
  },
  {
    id: "4",
    author: "Amelia Park",
    role: "Head of Brand, Lumen Co",
    quote:
      "This is the testimonial we feature everywhere. It captures why teams choose us.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    companyLogo: "Twitch",
    bgClass: "bg-neutral-100",
  },
  {
    id: "5",
    author: "James Okonkwo",
    role: "Product Owner, Shield",
    quote:
      "The team adopted it overnight. The quality and execution are first-class.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    companyLogo: "Spotify",
    bgClass: "bg-white",
  },
];

const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

export function Testimonials() {
  return (
    <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden font-sans text-white">
      {/* Decorative Quote Symbol Background Accent */}
      <div className="absolute top-12 right-12 text-[180px] sm:text-[260px] font-serif leading-none text-zinc-900/40 select-none pointer-events-none">
        ”
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-16 sm:mb-20 space-y-4">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Built On Trust, Refined <br />
          <span className="font-serif italic font-normal text-zinc-300">
            Through Experience
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          From brand strategy to identity and communication, I deliver solutions that turn vision into results
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative z-10 flex flex-col overflow-hidden">
        {/* Softened edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black/80 to-transparent z-20 pointer-events-none" />

        {/* First Marquee Row (Moving Left - Pauses on Hover) */}
        <MarqueeRow items={row1} direction="left" duration={35} />

        {/* Second Marquee Row (Moving Right - Pauses on Hover) */}
        <MarqueeRow items={row2} direction="right" duration={40} />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  duration: number;
}) {
  const controls = useAnimationControls();

  const startAnimation = () => {
    controls.start({
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div
      className="flex w-max overflow-hidden"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() => startAnimation()}
    >
      <motion.div className="flex gap-0" animate={controls}>
        {items.map((item, idx) => (
          <TestimonialCard key={`${direction}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className={`w-[300px] sm:w-[380px] shrink-0 ${
        item.bgClass || "bg-white"
      } text-zinc-900 rounded-none p-6 sm:p-8 flex flex-col justify-between border-r border-b border-zinc-200/80 cursor-pointer transition-colors duration-200 hover:bg-zinc-50`}
    >
      <div className="space-y-4">
        {/* Brand / Company Header */}
        {item.companyLogo && (
          <div className="text-lg sm:text-xl font-bold tracking-tight text-black">
            {item.companyLogo}
          </div>
        )}

        {/* Quote Content */}
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
          "{item.quote}"
        </p>
      </div>

      {/* Author Metadata */}
      <div className="flex items-center gap-3 pt-6 mt-4 border-t border-zinc-200/60">
        <img
          src={item.avatar}
          alt={item.author}
          className="w-10 h-10 rounded-none object-cover grayscale shrink-0"
        />
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-bold text-zinc-900 leading-none mb-1">
            {item.author}
          </span>
          <span className="text-[11px] text-zinc-500 leading-none">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;