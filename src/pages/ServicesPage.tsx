// import { motion } from "framer-motion";
// import { ArrowUpLeft, ArrowUpRight, Users } from "lucide-react";
// import { Link } from "react-router-dom";
// import ServiceCard from "@/components/home/ServiceCard";

// export interface ServiceDefinition {
//   id: string;
//   title: string;
//   price: string;
//   description: string;
//   features: string[];
//   highlighted: boolean;
//   paymentRequired: boolean;
//   ctaText: string;
//   ctaLink: string;
// }

// export const SERVICES: ServiceDefinition[] = [
//   {
//     id: "consultation-100",
//     title: "One on One Consultation",
//     price: "$100",
//     description:
//       "The strategic starting point for brands ready to define direction and next steps.",
//     features: [
//       "60-minute private strategy session",
//       "Brand & business assessment",
//       "Opportunity identification",
//       "Action plan & next steps",
//     ],
//     highlighted: true,
//     paymentRequired: true,
//     ctaText: "Book Session",
//     ctaLink: "/book-a-session",
//   },
//   {
//     id: "strategy-1500",
//     title: "Strategy / Setup",
//     price: "$1,500",
//     description:
//       "End-to-end strategic positioning, communication systems, and growth roadmap.",
//     features: [
//       "Strategic positioning framework",
//       "Communication & content system",
//       "90-day growth roadmap",
//       "Priority support",
//     ],
//     highlighted: false,
//     paymentRequired: false,
//     ctaText: "Request a Call",
//     ctaLink: "/services/strategy-1500",
//   },
//   {
//     id: "personal-brand",
//     title: "Personal Brand",
//     price: "$1,500",
//     description:
//       "Executive personal branding strategy to position founders and leaders as industry authorities.",
//     features: [
//       "Personal brand positioning",
//       "Leadership narrative framework",
//       "Content strategy & channels",
//       "LinkedIn optimization",
//     ],
//     highlighted: false,
//     paymentRequired: false,
//     ctaText: "Request a Call",
//     ctaLink: "/services/personal-brand",
//   },
//   {
//     id: "brand-identity",
//     title: "Brand Identity",
//     price: "$2,000",
//     description:
//       "Complete visual identity system, messaging architecture, and brand guidelines.",
//     features: [
//       "Visual identity system",
//       "Messaging architecture",
//       "Brand guidelines",
//       "Implementation assets",
//     ],
//     highlighted: false,
//     paymentRequired: false,
//     ctaText: "Request a Call",
//     ctaLink: "/services/brand-identity",
//   },
//   {
//     id: "book-product",
//     title: "The Brand Strategist — Book",
//     price: "$35",
//     description:
//       "A practical guide to building a brand that matters — covering positioning, messaging, visual identity, and growth strategy.",
//     features: [
//       "5 Chapters of actionable frameworks",
//       "Downloadable templates & checklists",
//       "PDF + audiobook included",
//       "Instant digital access",
//     ],
//     highlighted: false,
//     paymentRequired: true,
//     ctaText: "Buy the Book",
//     ctaLink: "/book",
//   },
// ];

// export default function ServicesPage() {
//   return (
//     <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
//       <div className="mx-auto max-w-7xl">
//         <div className="pt-8 sm:pt-12 mb-8 sm:mb-12 flex justify-start">
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
//           >
//             <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
//             <span>GO BACK</span>
//           </Link>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-8 sm:mb-12"
//         >
//           <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-tight uppercase leading-none text-neutral-900">
//             STRATEGIC <span className="font-serif italic text-[#5D1F17]">SOLUTIONS</span>
//           </h1>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="max-w-3xl mb-16"
//         >
//           <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
//             Whether you need a focused 60-minute strategy session, a strategic positioning
//             framework, or a complete brand identity system — there's a structured path forward.
//             Each service is designed to deliver absolute clarity and actionable next steps,
//             without unnecessary complexity.
//           </p>
//         </motion.div>

//         <div className="space-y-24 sm:space-y-36 pb-20">
//           {SERVICES.map((service, index) => (
//             <motion.div
//               key={service.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
//                 {/* Service Number + Label */}
//                 <div className="lg:col-span-1 flex items-start pt-1">
//                   <span className="text-xs font-mono text-[#5D1F17] font-semibold">
//                     ({index + 1})
//                   </span>
//                 </div>

//                 {/* Main Card */}
//                 <div className="lg:col-span-11">
//                   <ServiceCard
//                     id={service.id}
//                     title={service.title}
//                     price={service.price}
//                     description={service.description}
//                     features={service.features}
//                     highlighted={service.highlighted}
//                     paymentRequired={service.paymentRequired}
//                     ctaText={service.ctaText}
//                     ctaLink={service.ctaLink}
//                     index={index}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA strip */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mt-20 rounded-2xl bg-neutral-900 py-12 sm:py-16 px-6 sm:px-10 lg:px-16 text-center"
//         >
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-light uppercase tracking-tight text-white text-balance">
//             Not sure which service is right for you?
//           </h2>
//           <p className="mt-3 max-w-xl text-xs sm:text-sm text-neutral-300 mx-auto leading-relaxed">
//             Share a few details about your brand and goals, and we'll recommend the right
//             path forward — including budget-friendly options for early-stage teams.
//           </p>
//           <Link
//             to="/contact"
//             className="mt-6 inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-[#5D1F17] px-6 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#4A1812] hover:shadow-lg group"
//           >
//             <Users className="w-3.5 h-3.5" />
//             <span>Talk to Us</span>
//             <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//           </Link>
//         </motion.div>
//       </div>
//     </main>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export interface PricingTier {
  id: string;
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted: boolean;
  paymentRequired?: boolean;
  ctaText: string;
  ctaLink: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "consultation",
    title: "Consultation",
    price: "$100",
    period: "/hr",
    description:
      "The strategic starting point for brands ready to define direction and next steps.",
    features: [
      "60-minute private strategy session",
      "Brand & business assessment",
      "Opportunity identification",
      "Action plan & next steps",
    ],
    highlighted: false,
    paymentRequired: true,
    ctaText: "Book Session",
    ctaLink: "/book-a-session",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    price: "$1,500",
    description:
      "Complete visual identity system, messaging architecture, and brand guidelines.",
    features: [
      "Visual identity system",
      "Messaging architecture",
      "Brand guidelines",
      "Implementation assets",
    ],
    highlighted: true,
    paymentRequired: false,
    ctaText: "Request a Call",
    ctaLink: "/services/brand-identity",
  },
  {
    id: "strategy-setup",
    title: "Personal Brand Strategy",
    price: "$2,000",
    description:
      "End-to-end strategic positioning, communication systems, and a 90-day growth roadmap.",
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
];

// Alias export for backward compatibility with ServiceRequestPage
export const SERVICES = PRICING_TIERS;

const FAQS = [
  {
    question: "How do I know which service is right for me?",
    answer:
      "Most clients start with the consultation. It gives us both clarity on where you stand before committing to a larger engagement like Strategy/Setup or Brand Identity.",
  },
  {
    question: "What happens after I book a consultation?",
    answer:
      "You'll get a calendar link to pick a time. Before the session, you'll fill out a short brand questionnaire so we can make the 60 minutes count.",
  },
  {
    question: "Can Strategy/Setup and Brand Identity be combined?",
    answer:
      "Yes. Many clients move from Strategy/Setup into Brand Identity once the positioning is locked in. Ask about bundled pricing on your call.",
  },
  {
    question: "Do you work with early-stage or pre-revenue brands?",
    answer:
      "Yes, the consultation is built for that stage. It helps you get sharp on direction before you invest in a full identity system.",
  },
  {
    question: "How long does a Brand Identity project take?",
    answer:
      "Typically 3–5 weeks depending on scope and revision rounds, starting once positioning from the discovery phase is signed off.",
  },
  {
    question: "What's included in Priority Support?",
    answer:
      "Direct access for questions as you implement the strategy, with faster turnaround than standard email support.",
  },
];

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={`relative flex flex-col rounded-3xl p-8 h-full transition-all duration-300 border ${
        tier.highlighted
          ? "border-[#5D1F17] bg-[#5D1F17] text-white shadow-xl hover:shadow-2xl"
          : "border-neutral-200/80 bg-neutral-50/70 text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
            tier.highlighted
              ? "bg-white/10 text-white border border-white/20"
              : "bg-neutral-200/60 text-[#5D1F17]"
          }`}
        >
          ({index + 1}) {tier.title}
        </span>
      </div>

      <p
        className={`text-xs leading-relaxed ${
          tier.highlighted ? "text-neutral-200" : "text-neutral-600"
        }`}
      >
        {tier.description}
      </p>

      <div className="mt-8 mb-8 flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-bold tracking-tight">
          {tier.price}
        </span>
        {tier.period && (
          <span
            className={`text-xs font-normal ${
              tier.highlighted ? "text-neutral-300" : "text-neutral-500"
            }`}
          >
            {tier.period}
          </span>
        )}
      </div>

      <ul className="space-y-3.5 mb-10 flex-1">
        {tier.features.map((feature, idx) => (
          <li key={`${tier.id}-feature-${idx}`} className="flex items-start gap-3 text-xs">
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                tier.highlighted
                  ? "bg-white text-[#5D1F17]"
                  : "bg-[#5D1F17] text-white"
              }`}
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span
              className={
                tier.highlighted ? "text-neutral-100" : "text-neutral-700"
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to={tier.ctaLink}
        className={`w-full py-3.5 px-6 rounded-full text-xs font-bold transition-all duration-300 text-center inline-flex items-center justify-center gap-2 group ${
          tier.highlighted
            ? "bg-white text-[#5D1F17] hover:bg-neutral-100 shadow-md"
            : "bg-neutral-900 text-white hover:bg-neutral-800"
        }`}
      >
        <span>{tier.ctaText}</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white divide-y divide-neutral-200/60">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="py-5">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-[#5D1F17] transition-colors duration-200">
                {index + 1}. {faq.question}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 group-hover:bg-[#5D1F17] group-hover:text-white shrink-0 ml-4 transition-all duration-200">
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 pb-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-sans min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl">
        <div className="pt-8 sm:pt-12 mb-8 sm:mb-12 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
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
            Whether you need a focused strategy session, a strategic positioning
            framework, or a complete brand identity system — there's a structured path forward.
            Each service is designed to deliver absolute clarity and actionable next steps,
            without unnecessary complexity.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 sm:mb-32 items-stretch">
          {PRICING_TIERS.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Borderless White FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-24 sm:mb-32 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
            Got questions?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mb-10 max-w-xl mx-auto leading-relaxed">
            We've got the answers you need. Browse through our most asked
            questions to find quick, clear solutions.
          </p>
          <div className="text-left">
            <FaqAccordion />
          </div>
        </motion.div>

        {/* Call To Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-neutral-900 py-12 sm:py-16 px-6 sm:px-10 lg:px-16 text-center"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light uppercase tracking-tight text-white text-balance">
            Not sure which service is right for you?
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm text-neutral-300 mx-auto leading-relaxed">
            Share a few details about your brand and goals, and we'll recommend the right
            path forward — including budget-friendly options for early-stage teams.
          </p>
          <Link
            to="/book-a-session"
            className="mt-6 inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-[#5D1F17] px-6 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#4A1812] hover:shadow-lg group"
          >
            <span>Book A Consultation</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}