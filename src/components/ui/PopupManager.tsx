"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Rocket, Gift, Zap } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface PopupData {
  _id: string;
  type: string;
  title: string;
  content: string;
  ctaText?: string;
  ctaLink?: string;
  trigger: string;
  triggerValue?: number;
  showOnce: boolean;
}

// Map popup types to icons and badges
const POPUP_META = {
  lead: { icon: Sparkles, badge: "Special Offer" },
  discount: { icon: Gift, badge: "Limited Time" },
  internship: { icon: Rocket, badge: "Internship Open" },
  default: { icon: Zap, badge: "Special Offer" },
};

export default function PopupManager() {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [activePopup, setActivePopup] = useState<PopupData | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const triggered = useRef(false);

  // Load active popups from DB
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/cms/popups/active");
        setPopups(data.data || []);
      } catch {
        // Fallback to static default popup if API unavailable
        setPopups([
          {
            _id: "default",
            type: "lead",
            title: "Free Website Audit",
            content:
              "Get a free in-depth audit of your current website — performance, SEO, conversion rate, and design.",
            ctaText: "Claim Free Audit",
            ctaLink: "/contact",
            trigger: "scroll",
            triggerValue: 800,
            showOnce: true,
          },
        ]);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!popups.length) return;

    // Check session storage for already-shown popups
    const shown = new Set<string>(
      JSON.parse(sessionStorage.getItem("zt_shown_popups") || "[]")
    );

    const findAndShow = (currentScrollY?: number) => {
      if (triggered.current) return;
      for (const popup of popups) {
        if (shown.has(popup._id)) continue;
        if (dismissed.has(popup._id)) continue;

        const shouldTrigger =
          popup.trigger === "time"
            ? true
            : popup.trigger === "scroll" && currentScrollY !== undefined
            ? currentScrollY >= (popup.triggerValue || 800)
            : false;

        if (shouldTrigger) {
          triggered.current = true;
          setActivePopup(popup);
          break;
        }
      }
    };

    // Time-based triggers
    const timePopups = popups.filter((p) => p.trigger === "time");
    const timers = timePopups
      .filter((p) => !shown.has(p._id) && !dismissed.has(p._id))
      .map((p) =>
        setTimeout(() => {
          if (!triggered.current) {
            triggered.current = true;
            setActivePopup(p);
          }
        }, (p.triggerValue || 30) * 1000)
      );

    // Scroll-based triggers
    const onScroll = () => findAndShow(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [popups, dismissed]);

  const dismiss = (popup: PopupData) => {
    setActivePopup(null);
    setDismissed((prev) => new Set(prev).add(popup._id));
    triggered.current = false;

    if (popup.showOnce) {
      const shown: string[] = JSON.parse(
        sessionStorage.getItem("zt_shown_popups") || "[]"
      );
      if (!shown.includes(popup._id)) {
        shown.push(popup._id);
        sessionStorage.setItem("zt_shown_popups", JSON.stringify(shown));
      }
    }
  };

  return (
    <AnimatePresence>
      {activePopup && (
        <>
          {/* Backdrop overlay - softer, blurred */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dismiss(activePopup)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 350,
              mass: 0.8,
            }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div
              className="
                relative max-w-md w-full mx-4
                bg-white/95 dark:bg-[#1e293b]/95
                rounded-3xl
                border border-slate-200/60 dark:border-white/10
                shadow-2xl shadow-slate-900/10 dark:shadow-black/40
                p-8
                backdrop-blur-xl
                overflow-hidden
              "
            >
              {/* Decorative glow blob */}
              <div
                className="
                  pointer-events-none absolute -top-20 -right-20
                  w-56 h-56 rounded-full
                  bg-blue-500/10 dark:bg-blue-400/10
                  blur-[80px]
                "
              />

              {/* Close Button */}
              <button
                onClick={() => dismiss(activePopup)}
                className="
                  absolute top-4 right-4
                  p-1.5 rounded-full
                  text-slate-400 dark:text-slate-500
                  hover:text-slate-900 dark:hover:text-white
                  hover:bg-slate-100 dark:hover:bg-white/10
                  transition-colors duration-200
                "
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              {(() => {
                const meta = POPUP_META[activePopup.type as keyof typeof POPUP_META] || POPUP_META.default;
                const Icon = meta.icon;
                return (
                  <div
                    className="
                      w-14 h-14 rounded-2xl
                      bg-gradient-to-br from-blue-50 to-indigo-50
                      dark:from-blue-500/10 dark:to-indigo-500/10
                      border border-blue-200/60 dark:border-blue-400/20
                      flex items-center justify-center
                      mb-5
                    "
                  >
                    <Icon size={26} className="text-blue-600 dark:text-blue-400" />
                  </div>
                );
              })()}

              {/* Badge */}
              <div
                className="
                  inline-flex items-center gap-1.5
                  rounded-full
                  border border-blue-200/60 dark:border-blue-400/20
                  bg-blue-50/80 dark:bg-blue-400/10
                  px-3.5 py-1
                  text-[10px] font-bold uppercase tracking-[0.1em]
                  text-blue-700 dark:text-blue-300
                  mb-4
                "
              >
                {(() => {
                  const meta = POPUP_META[activePopup.type as keyof typeof POPUP_META] || POPUP_META.default;
                  return meta.badge;
                })()}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                {activePopup.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-7">
                {activePopup.content}
              </p>

              {/* CTA Button */}
              {activePopup.ctaText && activePopup.ctaLink && (
                <Link
                  href={activePopup.ctaLink}
                  onClick={() => dismiss(activePopup)}
                  className="
                    group flex items-center justify-center gap-2
                    w-full
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-blue-700
                    px-6 py-3.5
                    text-sm font-bold text-white
                    shadow-lg shadow-blue-600/20
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl hover:shadow-blue-600/30
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    mb-3
                  "
                >
                  {activePopup.ctaText}
                </Link>
              )}

              {/* Skip / Dismiss */}
              <button
                onClick={() => dismiss(activePopup)}
                className="
                  w-full text-center
                  text-sm font-medium
                  text-slate-500 dark:text-slate-400
                  hover:text-slate-900 dark:hover:text-white
                  transition-colors duration-200
                  py-1
                "
              >
                No thanks, I'll skip this
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
