"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const [isTouch, setIsTouch] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobileCheck =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (mobileCheck) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);
    document.body.style.cursor = "none";

    let rx = 0,
      ry = 0;
    let mx = 0,
      my = 0;
    let rafId: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top = `${my}px`;
      }
    };

    // Smooth follow animation with slight easing for a premium feel
    const animate = () => {
      // Slightly faster follow for better responsiveness
      const easing = 0.18;
      rx += (mx - rx) * easing;
      ry += (my - ry) * easing;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const hover = (e: Event) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest(
        "a,button,input,select,textarea,[data-cursor]"
      );

      if (cursorRef.current && ringRef.current) {
        if (isInteractive) {
          // On interactive elements: dot shrinks slightly, ring expands with a subtle glow
          cursorRef.current.style.width = "6px";
          cursorRef.current.style.height = "6px";
          cursorRef.current.style.backgroundColor = "#2563eb";
          ringRef.current.style.width = "52px";
          ringRef.current.style.height = "52px";
          ringRef.current.style.borderColor = "rgba(37,99,235,0.4)";
          ringRef.current.style.boxShadow = "0 0 20px rgba(37,99,235,0.15)";
          ringRef.current.style.backgroundColor = "rgba(37,99,235,0.04)";
        } else {
          // Default state: dot at normal size, ring subtle and clean
          cursorRef.current.style.width = "8px";
          cursorRef.current.style.height = "8px";
          cursorRef.current.style.backgroundColor = "#2563eb";
          ringRef.current.style.width = "40px";
          ringRef.current.style.height = "40px";
          ringRef.current.style.borderColor = "rgba(37,99,235,0.3)";
          ringRef.current.style.boxShadow = "none";
          ringRef.current.style.backgroundColor = "transparent";
        }
      }
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", hover);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", hover);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Main dot cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#2563eb",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.25s ease",
          willChange: "transform, width, height",
          boxShadow: "0 0 12px rgba(37,99,235,0.3)",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(37,99,235,0.3)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
          willChange: "transform, width, height",
          backgroundColor: "transparent",
        }}
      />
    </>
  );
}
