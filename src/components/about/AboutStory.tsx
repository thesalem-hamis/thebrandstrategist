"use client";

import { motion } from "framer-motion";

export function AboutStory() {
  return (
    <section className="w-full border-b border-neutral-200 bg-white px-6 py-16 font-sans text-neutral-900 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-xs font-mono uppercase tracking-widest text-neutral-400 sm:mb-14"
        >
          MY STORY
        </motion.p>

        {/* Main Header */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl text-3xl font-light uppercase leading-tight tracking-tight text-neutral-900 sm:mb-14 sm:text-5xl"
        >
          I Have Always Imagined a <span className="font-serif italic text-[#5D1F17]">World of Excellence</span>
        </motion.h2>

        {/* Two-column intro: Personal Philosophy */}
        <div className="mb-14 grid grid-cols-1 gap-6 sm:mb-20 md:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="md:col-span-6 space-y-4"
          >
            <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
              I've always believed in what people and ideas can become. Long before branding became my profession, I believed something that continues to shape my work today: <strong>Life can be designed.</strong>
            </p>
            <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
              Not because we can control everything, but because we can influence more than we sometimes realise. We can influence perception. We can create better experiences. We can change what something has come to mean.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 space-y-4"
          >
            <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
              And through deliberate action, we can give people new reasons to think, feel and respond differently. That understanding became foundational to how I see branding.
            </p>
            <p className="text-xs font-normal leading-relaxed text-neutral-700 sm:text-sm">
              To me, branding is not simply about what something looks like. It is the deliberate shaping of meaning, perception and experience—and those things have the power to influence human behaviour.
            </p>
          </motion.div>
        </div>

        {/* 4 Pillars Grid: What deliberate branding changes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 grid grid-cols-1 gap-6 border-t border-b border-neutral-200 py-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "01", title: "Overlooked Businesses", desc: "Can become deeply relevant in crowded markets." },
            { label: "02", title: "Underestimated Pros", desc: "Can reposition their expertise for authority." },
            { label: "03", title: "Misunderstood Ideas", desc: "Can become exceptionally compelling stories." },
            { label: "04", title: "Old Perceptions", desc: "Replaced by consistent evidence of something better." }
          ].map((item) => (
            <div key={item.label} className="space-y-2 border-l border-neutral-200 pl-4">
              <span className="font-mono text-xs text-neutral-400">{item.label}</span>
              <h4 className="text-sm font-semibold text-neutral-900">{item.title}</h4>
              <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Stat row — BNM Brand House & 500+ engagements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-12 items-start gap-4 py-10 sm:py-12"
        >
          <span className="col-span-4 text-4xl font-light tracking-tight text-[#5D1F17] sm:col-span-3 sm:text-5xl lg:text-6xl">
            500+
          </span>

          <div className="col-span-8 sm:col-span-9">
            <h3 className="mb-2 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
              Brand Engagements Led via BNM Brand House
            </h3>
            <p className="max-w-2xl text-xs leading-relaxed text-neutral-600 sm:text-sm">
              As Founder and Creative Director of BNM Brand House, Adebimpe has led and contributed to brand engagements for more than 500 businesses, professionals and organisations across brand strategy, positioning, rebranding, personal branding, communication and creative direction.
            </p>
          </div>
        </motion.div>

        {/* The problem she solves: Closing the Gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 gap-8 border-t border-neutral-200 py-10 sm:py-12 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <h3 className="mb-3 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
              Closing the Gap Between Value and Perception
            </h3>
            <p className="max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Much of Adebimpe's work comes down to one challenge: the gap between how valuable something actually is and how valuable people perceive it to be. Her role is to understand the real problem before prescribing the solution.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-neutral-200 border-t border-neutral-200 lg:border-t-0">
              {[
                "A remarkable business can be overlooked.",
                "An experienced professional can be underestimated.",
                "A great product can become interchangeable.",
                "A visible brand can still struggle to become the preferred choice.",
              ].map((point, i) => (
                <li key={point} className="flex items-baseline gap-4 py-3 first:pt-0 lg:first:pt-3">
                  <span className="font-mono text-xs text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Beyond client work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 gap-8 border-t border-neutral-200 py-10 sm:grid-cols-3 sm:py-12"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Author
            </p>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
              Author of <strong>Building Authentic Brands</strong> — unpacking positioning, perception, reputation and brand equity.
            </p>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Platform & Media
            </p>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
              Creator of <strong>Unbrand with BNM</strong>, exploring differentiation, consistency, and strategic brand positioning.
            </p>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              Speaker & Educator
            </p>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
              Consulting, keynotes, workshops, and strategic conversations with founders, executives, teams, and organizations.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutStory;