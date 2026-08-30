"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Rocket, Gift, Zap, Mail, MessageCircle } from "lucide-react";
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

// Map popup types to icons and badges – English only, no emojis
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
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
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
                relative mx-4 w-full max-w-md
                overflow-hidden rounded-3xl
                border border-slate-200/60
                bg-white/95 p-8
                shadow-2xl shadow-slate-900/10
                backdrop-blur-xl
                dark:border-white/8
                dark:bg-[#1a1e2b]/95
                dark:shadow-black/40
              "
            >
              {/* Decorative glow blob */}
              <div
                className="
                  pointer-events-none absolute -right-20 -top-20
                  h-56 w-56 rounded-full
                  bg-blue-500/10
                  blur-[80px]
                  dark:bg-blue-400/10
                "
              />

              {/* Close Button */}
              <button
                onClick={() => dismiss(activePopup)}
                className="
                  absolute right-4 top-4
                  rounded-full p-1.5
                  text-slate-400
                  transition-colors duration-200
                  hover:bg-slate-100 hover:text-slate-900
                  dark:text-slate-500
                  dark:hover:bg-white/10 dark:hover:text-white
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
                      mb-5 flex h-14 w-14 items-center justify-center
                      rounded-2xl
                      border border-blue-200/60
                      bg-gradient-to-br from-blue-50 to-indigo-50
                      dark:border-blue-400/20
                      dark:from-blue-500/10 dark:to-indigo-500/10
                    "
                  >
                    <Icon size={26} className="text-blue-600 dark:text-blue-400" />
                  </div>
                );
              })()}

              {/* Badge */}
              <div
                className="
                  mb-4 inline-flex items-center gap-1.5
                  rounded-full
                  border border-blue-200/60
                  bg-blue-50/80 px-3.5 py-1
                  text-[10px] font-bold uppercase tracking-[0.1em]
                  text-blue-700
                  dark:border-blue-400/20
                  dark:bg-blue-400/10
                  dark:text-blue-300
                "
              >
                {(() => {
                  const meta = POPUP_META[activePopup.type as keyof typeof POPUP_META] || POPUP_META.default;
                  return meta.badge;
                })()}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {activePopup.title}
              </h3>

              {/* Description */}
              <p className="mb-7 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {activePopup.content}
              </p>

              {/* CTA Button */}
              {activePopup.ctaText && activePopup.ctaLink && (
                <Link
                  href={activePopup.ctaLink}
                  onClick={() => dismiss(activePopup)}
                  className="
                    group mb-3 flex w-full items-center justify-center gap-2
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-blue-700
                    px-6 py-3.5
                    text-sm font-bold text-white
                    shadow-lg shadow-blue-600/20
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl hover:shadow-blue-600/30
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  {activePopup.ctaText}
                </Link>
              )}

              {/* Skip / Dismiss */}
              <button
                onClick={() => dismiss(activePopup)}
                className="
                  w-full py-1 text-center
                  text-sm font-medium
                  text-slate-500
                  transition-colors duration-200
                  hover:text-slate-900
                  dark:text-slate-400
                  dark:hover:text-white
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
