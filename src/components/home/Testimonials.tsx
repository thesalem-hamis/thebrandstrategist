import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Testimonial as DBTestimonial } from "@/lib/types";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  avatar?: string;
  companyLogo?: string;
  bgClass?: string;
}

const FALLBACK: Testimonial[] = [
  {
    id: "1",
    author: "Soyemi Boluwatife",
    role: "Nigeria",
    quote:
      "Your book, Building Authentic Brands is so amazing, at first, I thought it was one of those book or courses online like I mean, the average ones, but I mean this course was worth my money.Thank you for sharing real life examples that we can relate with, that was the major highlight for me. Is there a way I can connect with you personally for further guidance on building my business and personal brand? I don't mind paying for that",
    companyLogo: "Building Authentic Brands",
    bgClass: "bg-white",
  },
  {
    id: "2",
    author: "Natasha Nalyaka",
    role: "Kenya",
    quote:
      "This is a very good resource, well articulated and as an individual, one gets actionable steps that they can apply. The zoom framework was the magic for me. Thank you",
    companyLogo: "Building Authentic Brands",
    bgClass: "bg-neutral-100",
  },
  {
    id: "3",
    author: "Dr Kayode Ayankoya",
    role: "Microsoft",
    quote:
      "Building Authentic Brands is a practical, insightful guide for anyone looking to build a brand that is true to their identity and purpose. It's especially valuable for business owners and startups who need clarity, structure, and actionable steps to stand out in a crowded market. The book's frameworks and case studies make it easy to apply its lessons, whether you're just starting or looking to refresh your brand.",
    companyLogo: "Building Authentic Brands",
    bgClass: "bg-white",
  },
  {
    id: "4",
    author: "Klug Udumaga",
    role: "Nigeria",
    quote:
      "I found the Zoom framework for branding very practical and have begun applying it to my business. If you want to create an identity that takes you or your business forward, this book is an incredible resource.",
    companyLogo: "Building Authentic Brands",
    bgClass: "bg-neutral-100",
  },
  {
    id: "5",
    author: "Amanda",
    role: "United Kingdom",
    quote:
      "I am truly grateful for the impactful conversation I had with BNM. It felt deeply personal, allowing me to express my thoughts freely and answer questions from a place of rest and openness. This fostered a sense of trust that enabled me to delve deeply into my own beliefs, vision, and mission with remarkable clarity.\n\nReflecting on our dialogue, I realized how essential it is to have such spaces where vulnerability is welcomed, providing the opportunity to explore one's inner self. The insights gained during this conversation not only illuminated my path but also reinforced my commitment to pursuing my goals with renewed enthusiasm. I look forward to building on this clarity and applying it to my journey ahead.",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-white",
  },
  {
    id: "6",
    author: "Ademola Oduniyi Lawrence",
    role: "Abuja, Nigeria",
    quote:
      "The fact I am able distinguish between my purpose and and fulfilment , made it easier for me to understand , and also choosing to identify what I want to be identified as.",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-neutral-100",
  },
  {
    id: "7",
    author: "Evelyn Urowoli Osindeinde",
    role: "Lagos, Nigeria",
    quote:
      "The session helped me look at my brand from a clearer perspective. It was worth the time",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-white",
  },
  {
    id: "8",
    author: "Omotola Ade-Onojobi",
    role: "Abuja, Nigeria",
    quote:
      "This is the first time I'm paying for a strategic session to fine tune my business and I would say it's absolutely worth it. Adebimpe is so patient and listens. It felt like I was in therapy but for my business. She doesn't just know her onions, she's also grounded in the word of God. The balance makes it all just beautiful and worthy of the investment. I got clarity on my brand image. Thank you Adebimpe.",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-neutral-100",
  },
  {
    id: "9",
    author: "Bee Oshinubi",
    role: "Dubai",
    quote:
      "The strategy session with Adebimpe felt like I was speaking to my friend that was interested in every bit of my business and wanted to know more. There is an air of ease and calmness she brings to the session that makes you feel like she's got you and she understands you even If you communicate with a few words.",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-white",
  },
  {
    id: "10",
    author: "Racheal Ogbu",
    role: "Nigeria",
    quote:
      "Coming into the session, I thought branding was all about logos but after my session I learned my brand is beyond just logo, there are a lot that go's into making a brand, I am so glad I had this consultation.",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-neutral-100",
  },
  {
    id: "11",
    author: "Joan Oyedokun",
    role: "USA",
    quote:
      "Specking Bimpe gave me more clarity and she helped me put things in proper perspective",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-white",
  },
  {
    id: "12",
    author: "Genevieve Sonia",
    role: "United Kingdom",
    quote: "It was therapeutic. I felt like I was talking to a big sister",
    companyLogo: "1-on-1 Strategy Session",
    bgClass: "bg-neutral-100",
  },
];

function mapDB(t: DBTestimonial): Testimonial {
  return {
    id: t.id,
    author: t.author,
    role: t.role ?? "",
    quote: t.quote,
    avatar: t.avatar ?? undefined,
    companyLogo: t.company_logo ?? undefined,
    bgClass: t.bg_class ?? "bg-white",
  };
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setTestimonials((data as DBTestimonial[]).map(mapDB));
        }
      });
  }, []);

  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden font-sans text-white">
      <div className="absolute top-12 right-12 text-[180px] sm:text-[260px] font-serif leading-none text-zinc-900/40 select-none pointer-events-none">
        "
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-16 sm:mb-20 space-y-4">
        <h2 className="text-3xl sm:text-5xl lg:text-5xl font-semibold font-sans tracking-tight leading-tight">
          Built On Trust, Refined <br />
          <span className="font-serif italic font-normal text-zinc-300">
            Through Experience
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          From brand strategy to identity and communication, I deliver solutions that turn vision into results
        </p>
      </div>

      <div className="relative z-10 flex flex-col overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black/80 to-transparent z-20 pointer-events-none" />
        <MarqueeRow items={row1} direction="left" duration={35} />
        <MarqueeRow items={row2} direction="right" duration={40} />
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction, duration }: { items: Testimonial[]; direction: "left" | "right"; duration: number }) {
  const controls = useAnimationControls();

  const startAnimation = () => {
    controls.start({
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  };

  React.useEffect(() => { startAnimation(); }, []);

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
      className={`w-[300px] sm:w-[380px] h-[340px] sm:h-[380px] shrink-0 ${
        item.bgClass || "bg-white"
      } text-zinc-900 rounded-none p-6 sm:p-8 flex flex-col justify-between border-r border-b border-zinc-200/80 cursor-pointer transition-colors duration-200 hover:bg-zinc-50`}
    >
      <div className="flex flex-col space-y-4 overflow-hidden">
        {item.companyLogo && (
          <div className="text-lg sm:text-xl font-bold tracking-tight text-black shrink-0">
            {item.companyLogo}
          </div>
        )}
        <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300">
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal whitespace-pre-line">
            "{item.quote}"
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 mt-2 border-t border-zinc-200/60 shrink-0">
        {item.avatar && (
          <img
            src={item.avatar}
            alt={item.author}
            className="w-10 h-10 rounded-none object-cover grayscale shrink-0"
          />
        )}
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
