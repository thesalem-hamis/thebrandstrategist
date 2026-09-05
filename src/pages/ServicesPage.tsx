import { motion } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/home/ServiceCard";

export interface ServiceDefinition {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
  paymentRequired: boolean;
  ctaText: string;
  ctaLink: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    id: "consultation-100",
    title: "One on One Consultation",
    price: "$100",
    description:
      "The strategic starting point for brands ready to define direction and next steps.",
    features: [
      "60-minute private strategy session",
      "Brand & business assessment",
      "Opportunity identification",
      "Action plan & next steps",
    ],
    highlighted: true,
    paymentRequired: true,
    ctaText: "Book Session",
    ctaLink: "/book-a-session",
  },
  {
    id: "strategy-1500",
    title: "Strategy / Setup",
    price: "$1,500",
    description:
      "End-to-end strategic positioning, communication systems, and growth roadmap.",
    features: [
      "Strategic positioning framework",
      "Communication & content system",
      "90-day growth roadmap",
      "Priority support",
    ],
    highlighted: false,
    paymentRequired: false,
    ctaText: "Request a Call",
    ctaLink: "/services/strategy-1500",
  },
  {
    id: "personal-brand",
    title: "Personal Brand",
    price: "$1,500",
    description:
      "Executive personal branding strategy to position founders and leaders as industry authorities.",
    features: [
      "Personal brand positioning",
      "Leadership narrative framework",
      "Content strategy & channels",
      "LinkedIn optimization",
    ],
    highlighted: false,
    paymentRequired: false,
    ctaText: "Request a Call",
    ctaLink: "/services/personal-brand",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    price: "$2,000",
    description:
      "Complete visual identity system, messaging architecture, and brand guidelines.",
    features: [
      "Visual identity system",
      "Messaging architecture",
      "Brand guidelines",
      "Implementation assets",
    ],
    highlighted: false,
    paymentRequired: false,
    ctaText: "Request a Call",
    ctaLink: "/services/brand-identity",
  },
  {
    id: "book-product",
    title: "The Brand Strategist — Book",
    price: "$35",
    description:
      "A practical guide to building a brand that matters — covering positioning, messaging, visual identity, and growth strategy.",
    features: [
      "5 Chapters of actionable frameworks",
      "Downloadable templates & checklists",
      "PDF + audiobook included",
      "Instant digital access",
    ],
    highlighted: false,
    paymentRequired: true,
    ctaText: "Buy the Book",
    ctaLink: "/book",
  },
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl">
        <div className="pt-8 sm:pt-12 mb-8 sm:mb-12 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-tight uppercase leading-none text-neutral-900">
            STRATEGIC <span className="font-serif italic text-[#5D1F17]">SOLUTIONS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
            Whether you need a focused 60-minute strategy session, a strategic positioning
            framework, or a complete brand identity system — there's a structured path forward.
            Each service is designed to deliver absolute clarity and actionable next steps,
            without unnecessary complexity.
          </p>
        </motion.div>

        <div className="space-y-24 sm:space-y-36 pb-20">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
                {/* Service Number + Label */}
                <div className="lg:col-span-1 flex items-start pt-1">
                  <span className="text-xs font-mono text-[#5D1F17] font-semibold">
                    ({index + 1})
                  </span>
                </div>

                {/* Main Card */}
                <div className="lg:col-span-11">
                  <ServiceCard
                    id={service.id}
                    title={service.title}
                    price={service.price}
                    description={service.description}
                    features={service.features}
                    highlighted={service.highlighted}
                    paymentRequired={service.paymentRequired}
                    ctaText={service.ctaText}
                    ctaLink={service.ctaLink}
                    index={index}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-2xl bg-neutral-900 py-12 sm:py-16 px-6 sm:px-10 lg:px-16 text-center"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light uppercase tracking-tight text-white text-balance">
            Not sure which service is right for you?
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm text-neutral-300 mx-auto leading-relaxed">
            Share a few details about your brand and goals, and we'll recommend the right
            path forward — including budget-friendly options for early-stage teams.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-[#5D1F17] px-6 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#4A1812] hover:shadow-lg group"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Talk to Us</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}