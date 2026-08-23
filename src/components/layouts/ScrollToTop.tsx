import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

const SHOW_AFTER_PX = 500;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      setVisible(scroll > SHOW_AFTER_PX);
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  const handleClick = () => {
    lenis?.scrollTo(0, {
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll back to top"
          onClick={handleClick}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="
            fixed
            bottom-6
            right-5
            sm:bottom-8
            sm:right-8
            z-[70]
            flex
            h-12
            w-12
            sm:h-14
            sm:w-14
            items-center
            justify-center
            rounded-full
            bg-[#5D1F17]
            text-white
            shadow-lg
            transition-colors
            duration-200
            hover:bg-[#4a1812]
          "
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;