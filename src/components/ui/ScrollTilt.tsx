"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollTiltProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  scaleRange?: number;
}

export default function ScrollTilt({
  children,
  className = "",
  tiltIntensity = 8,
  scaleRange = 0.08,
}: ScrollTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    const container = containerRef.current;
    const child = childRef.current;
    if (!container || !child) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      let normalized = (elementCenter - viewportCenter) / (viewportHeight / 2);
      normalized = Math.max(-1, Math.min(1, normalized));

      const tilt = normalized * tiltIntensity;
      const scale = 1 + normalized * scaleRange;

      child.style.transform = `
        perspective(800px)
        rotateX(${tilt}deg)
        scale(${scale})
      `;
      child.style.transition = "transform 0.1s ease-out";
      child.style.transformStyle = "preserve-3d";
      child.style.willChange = "transform";
      child.style.backfaceVisibility = "hidden";
    };

    handleScroll();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [tiltIntensity, scaleRange]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={childRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
