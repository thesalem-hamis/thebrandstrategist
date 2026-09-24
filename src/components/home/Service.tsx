import { motion } from "framer-motion";
import { Heart, Disc, Square, Triangle } from "lucide-react";
import profileImage from "@/assets/BIMPE.jpg";

interface ServicePill {
  id: string;
  label: string;
  icon: "heart" | "circle" | "square" | "triangle";
  iconColor: string;
  mobilePos: string;
  desktopPos: string;
}

interface TagNode {
  label: string;
  mobilePos: string;
  desktopPos: string;
}

const servicePills: ServicePill[] = [
  {
    id: "01",
    label: "executive brand advisory",
    icon: "heart",
    iconColor: "text-[#8B261D]",
    mobilePos: "top-[22%] left-[50%]",
    desktopPos: "sm:top-[32%] sm:left-[48%]",
  },
  {
    id: "02",
    label: "personal brand strategy",
    icon: "circle",
    iconColor: "text-white",
    mobilePos: "top-[36%] left-[32%]",
    desktopPos: "sm:top-[48%] sm:left-[32%]",
  },
  {
    id: "03",
    label: "business brand strategy",
    icon: "square",
    iconColor: "text-[#8B261D]",
    mobilePos: "top-[36%] left-[68%]",
    desktopPos: "sm:top-[48%] sm:left-[65%]",
  },
  {
    id: "04",
    label: "communication & content",
    icon: "triangle",
    iconColor: "text-white",
    mobilePos: "top-[52%] left-[45%]",
    desktopPos: "sm:top-[62%] sm:left-[45%]",
  },
  {
    id: "05",
    label: "personal brand strategy",
    icon: "circle",
    iconColor: "text-white",
    mobilePos: "top-[52%] left-[78%]",
    desktopPos: "sm:top-[62%] sm:left-[72%]",
  },
  {
    id: "06",
    label: "brand growth",
    icon: "square",
    iconColor: "text-[#8B261D]",
    mobilePos: "top-[68%] left-[32%]",
    desktopPos: "sm:top-[76%] sm:left-[32%]",
  },
  {
    id: "07",
    label: "business growth system",
    icon: "circle",
    iconColor: "text-white",
    mobilePos: "top-[68%] left-[65%]",
    desktopPos: "sm:top-[76%] sm:left-[58%]",
  },
];

const outerTags: TagNode[] = [
  {
    label: "long-term retainer",
    mobilePos: "top-[28%] left-[16%]",
    desktopPos: "sm:top-[36%] sm:left-[16%]",
  },
  {
    label: "personal brand strategy",
    mobilePos: "top-[44%] left-[10%]",
    desktopPos: "sm:top-[48%] sm:left-[10%]",
  },
  {
    label: "personalized feedback",
    mobilePos: "top-[60%] left-[18%]",
    desktopPos: "sm:top-[62%] sm:left-[20%]",
  },
  {
    label: "advisory session",
    mobilePos: "top-[76%] left-[14%]",
    desktopPos: "sm:top-[76%] sm:left-[8%]",
  },
  {
    label: "ideation",
    mobilePos: "top-[28%] left-[82%]",
    desktopPos: "sm:top-[36%] sm:left-[68%]",
  },
  {
    label: "consultation",
    mobilePos: "top-[44%] left-[88%]",
    desktopPos: "sm:top-[48%] sm:left-[83%]",
  },
  {
    label: "strategy",
    mobilePos: "top-[76%] left-[80%]",
    desktopPos: "sm:top-[76%] sm:left-[75%]",
  },
];

function RenderIcon({
  type,
  color,
}: {
  type: ServicePill["icon"];
  color: string;
}) {
  const iconClass = `h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 shrink-0 ${color}`;

  switch (type) {
    case "heart":
      return <Heart className={`${iconClass} fill-current`} />;
    case "circle":
      return <Disc className={iconClass} />;
    case "square":
      return <Square className={`${iconClass} fill-current`} />;
    case "triangle":
      return <Triangle className={`${iconClass} fill-current`} />;
  }
}

export function Services() {
  return (
    <section className="relative flex h-auto w-full flex-col justify-between overflow-hidden bg-[#F8F9FA] px-3 py-10 font-sans text-neutral-900 sm:h-screen sm:max-h-screen sm:px-10 sm:py-6">

      {/* ================= BACKGROUND PORTRAIT ================= */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.065] grayscale mix-blend-multiply"
        style={{ backgroundImage: `url(${profileImage})` }}
      />

      {/* Soft portrait fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#F8F9FA_78%)]" />

      {/* ================= AMBIENT GLOW ================= */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B261D]/[0.1] blur-[70px] sm:h-[450px] sm:w-[450px] sm:blur-[130px]"
      />

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between">

        {/* ================= HEADER ================= */}
        <div className="flex w-full justify-end pt-1 sm:pt-2">
          <div className="max-w-[280px] text-right sm:max-w-lg">
            {/* Reserved for future heading */}
          </div>
        </div>

        {/* ================= ORBIT CANVAS ================= */}
        <div className="relative mx-auto my-auto flex h-[340px] w-full max-w-[1050px] items-center justify-center sm:h-full sm:min-h-0 sm:flex-1">

          {/* Technical grid */}
          <div
            className="
              pointer-events-none
              absolute
              h-[290px]
              w-[290px]
              rounded-full
              opacity-[0.25]
              [background-image:radial-gradient(#000000_0.8px,transparent_0.8px)]
              [background-size:13px_13px]
              sm:h-[640px]
              sm:w-[640px]
              sm:[background-size:16px_16px]
            "
          />

          {/* Outer Ring - Black Border */}
          <motion.div
            animate={{
              scale: [1, 1.015, 1],
              borderColor: [
                "rgba(0,0,0,0.25)",
                "rgba(139,38,29,0.45)",
                "rgba(0,0,0,0.25)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              h-[260px]
              w-[260px]
              rounded-full
              border
              border-black/25
              sm:h-[610px]
              sm:w-[610px]
            "
          />

          {/* Inner Ring - Black Border */}
          <motion.div
            animate={{
              borderColor: [
                "rgba(0,0,0,0.30)",
                "rgba(139,38,29,0.50)",
                "rgba(0,0,0,0.30)",
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              h-[170px]
              w-[170px]
              rounded-full
              border
              border-black/30
              sm:h-[380px]
              sm:w-[380px]
            "
          />

          {/* Orbit accents */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute h-[260px] w-[260px] sm:h-[610px] sm:w-[610px]"
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#8B261D] sm:h-2 sm:w-2" />
            <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black sm:h-1.5 sm:w-1.5" />
          </motion.div>

          {/* ================= MAIN SERVICE PILLS ================= */}
          {servicePills.map((pill, index) => (
            <motion.div
              key={`${pill.id}-${index}`}
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              animate={{
                y: [0, index % 2 === 0 ? -3 : 3, 0],
              }}
              whileHover={{
                scale: 1.07,
                y: -2,
              }}
              className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${pill.mobilePos} ${pill.desktopPos}`}
            >
              <div
                className="
                  group
                  flex
                  items-center
                  gap-1.5
                  whitespace-nowrap
                  rounded-full
                  border-2
                  border-black
                  bg-black
                  px-2.5
                  py-1
                  text-[8px]
                  font-semibold
                  lowercase
                  tracking-wide
                  text-white
                  shadow-[0_4px_16px_rgba(0,0,0,0.25)]
                  transition-all
                  duration-300
                  hover:border-[#8B261D]
                  hover:bg-[#8B261D]
                  hover:shadow-[0_8px_25px_rgba(139,38,29,0.35)]
                  sm:gap-2
                  sm:px-4
                  sm:py-1.5
                  sm:text-[11px]
                "
              >
                <RenderIcon
                  type={pill.icon}
                  color={pill.iconColor}
                />

                <span>{pill.label}</span>
              </div>
            </motion.div>
          ))}

          {/* ================= SECONDARY TAGS ================= */}
          {outerTags.map((tag, index) => (
            <motion.div
              key={tag.label + index}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.25 + index * 0.04,
                ease: "easeOut",
              }}
              className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 ${tag.mobilePos} ${tag.desktopPos}`}
            >
              <div
                className="
                  rounded-full
                  border
                  border-black/80
                  bg-white/90
                  px-2.5
                  py-0.5
                  text-[7.5px]
                  font-bold
                  lowercase
                  tracking-tight
                  text-black
                  shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                  backdrop-blur-md
                  sm:px-3.5
                  sm:py-1
                  sm:text-[10px]
                "
              >
                {tag.label}
              </div>
            </motion.div>
          ))}

          {/* ================= CENTER POINT ================= */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute z-10 h-2 w-2 rounded-full bg-[#8B261D] shadow-[0_0_16px_rgba(139,38,29,0.6)] sm:h-2.5 sm:w-2.5"
          />

        </div>
      </div>
    </section>
  );
}

export default Services;








