import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface ServiceCardProps {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  paymentRequired?: boolean;
  ctaText?: string;
  ctaLink?: string;
  onClick?: () => void;
  index?: number;
}

export function ServiceCard({
  title,
  price,
  description,
  features,
  highlighted = false,
  paymentRequired = true,
  ctaText = "Get Started",
  ctaLink,
  onClick,
  index = 0,
}: ServiceCardProps) {
  const Inner = (
    <>
      <div
        className={`relative flex flex-col justify-between rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-2xl border-t-4 p-8 transition-all duration-300 ${
          highlighted
            ? "border-t-[#5D1F17] border-x border-b border-zinc-200 bg-white shadow-md"
            : "border-zinc-100 bg-neutral-50/60 border"
        }`}
      >
        <div>
          <div
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              highlighted ? "text-neutral-900" : "text-[#5D1F17]"
            }`}
          >
            {price}
          </div>

          <h3 className="mt-2 text-base sm:text-lg font-bold tracking-tight text-neutral-900 uppercase">
            {title}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-500 leading-tight">
            {description}
          </p>

          <div className="my-5 h-px w-full bg-zinc-200" />

          <ul className="space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600"
              >
                <span
                  className={`h-1.5 w-1.5 ${
                    highlighted ? "bg-[#5D1F17]" : "bg-[#5D1F17]"
                  } shrink-0`}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4">
          {ctaLink && (
            <Link
              to={ctaLink}
              onClick={onClick}
              className={`inline-flex items-center justify-center w-full font-semibold text-xs tracking-wider uppercase py-3.5 px-6 transition-colors duration-300 ${
                highlighted
                  ? "bg-[#5D1F17] hover:bg-[#4A1812] text-white shadow-md hover:shadow-lg"
                  : paymentRequired
                  ? "bg-neutral-900 hover:bg-neutral-800 text-white"
                  : "bg-[#5D1F17] hover:bg-[#4A1812] text-white shadow-md hover:shadow-lg"
              }`}
            >
              <span>{ctaText}</span>
              {!paymentRequired && <ArrowUpRight className="ml-2 w-3.5 h-3.5" />}
            </Link>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      className={`group flex flex-col h-full overflow-hidden rounded-none shadow-sm hover:translate-y-0 transition-all duration-300 ${
        highlighted ? "hover:scale-[1.02] hover:shadow-xl" : "hover:shadow-lg"
      }`}
    >
      {Inner}
    </motion.div>
  );
}

export default ServiceCard;