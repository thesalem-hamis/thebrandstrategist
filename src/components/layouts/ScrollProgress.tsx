import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.3,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-[80]
        h-[2.5px]
        origin-left
        bg-[#5D1F17]
      "
    />
  );
}

export default ScrollProgress;