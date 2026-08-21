import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { useScrollColor } from "./ScrollColorContext";

interface ColorSectionProps {
  color: string;
  children: ReactNode;
  className?: string;
}

export function ColorSection({ color, children, className }: ColorSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setActiveColor } = useScrollColor();

  // Fires once this section's midpoint crosses the viewport's midpoint
  const isInView = useInView(ref, {
    margin: "-49% 0px -49% 0px",
  });

  useEffect(() => {
    if (isInView) setActiveColor(color);
  }, [isInView, color, setActiveColor]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default ColorSection;