import { motion } from "framer-motion";

interface PricingPlan {
  price: string;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  buttonLink?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    price: "$100/hr",
    title: "One on One Consultation",
    description: "The strategic starting point.",
    features: [
      "60 Minutes Strategy Session",
      "Brand & Business Assessment",
      "Opportunity Identification",
      "Action Plan & Next Steps",
    ],
    highlighted: true,
    buttonText: "Book Session",
    buttonLink: "/book-a-session",
  },
  {
    price: "$2,000",
    title: "Personal Brand Strategy",
    description: "Build a brand people remember and trust",
    features: [
      "Personal Brand Positioning",
      "Audience Definition",
      "Visibility Roadmap",
      "90-Day Brand Action Plan",
    ],
    highlighted: false,
    buttonText: "Get Started",
    buttonLink: "#contact",
  },
  {
    price: "$1,500",
    title: "Brand Identity Systems",
    description: "Bring your business and brand strategy to life",
    features: [
      "Logo System",
      "Color System",
      "Brand Assets",
      "Brand Guidelines",
    ],
    highlighted: false,
    buttonText: "Get Started",
    buttonLink: "#contact",
  },
];

export function Pricing() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-12 lg:px-20 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-0.5"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.04em] text-neutral-900 leading-tight text-balance">
              Strategic Solutions, <br />
              Measurable Impact
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col items-start lg:items-start space-y-0.5"
          >
            <p className="text-sm font-semibold tracking-tight text-[#5D1F17]">Pricing List</p>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs leading-tight">
              Have many related needs, there’s a suitable package for your needs
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.12,
              }}
              className={`relative flex flex-col justify-between rounded-none p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-t-4 border-t-[#5D1F17] bg-white border-x border-b border-zinc-200 min-h-[520px]"
                  : "border border-zinc-100 bg-neutral-50/60 min-h-[460px]"
              }`}
            >
              <div>
                {/* Price - Equalized font sizes */}
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-3 tracking-tight ${
                    plan.highlighted ? "text-neutral-900" : "text-[#5D1F17]"
                  }`}
                >
                  {plan.price}
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 leading-tight mb-0.5">
                  {plan.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-tight min-h-[28px]">
                  {plan.description}
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-zinc-200 my-5" />

                {/* Bullet Features */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-600 tracking-tight leading-tight"
                    >
                      <span className="w-1.5 h-1.5 rounded-none bg-[#5D1F17] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={plan.buttonLink || "#"}
                  className={`inline-flex items-center justify-center w-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 rounded-none transition-colors duration-300 ${
                    plan.highlighted
                      ? "bg-[#5D1F17] hover:bg-[#4A1812] text-white"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white"
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;