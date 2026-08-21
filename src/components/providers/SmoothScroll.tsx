import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  // Drive Lenis from Framer Motion's frame loop instead of its own
  // requestAnimationFrame — keeps scroll-linked motion (useScroll,
  // whileInView, parallax) perfectly in sync with the scroll position.
  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  // Smooth in-page anchor navigation (#about, #services, #contact...)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(el as HTMLElement, {
        offset: 0,
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.15,
        syncTouch: false,
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;