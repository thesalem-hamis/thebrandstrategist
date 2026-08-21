import { useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollColor } from "@/components/providers/ScrollColorContext";

export function BackgroundLayer() {
  const { activeColor } = useScrollColor();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", activeColor);
  }, [activeColor]);

  return (
    <motion.div
      aria-hidden
      animate={{ backgroundColor: activeColor }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}

export default BackgroundLayer;