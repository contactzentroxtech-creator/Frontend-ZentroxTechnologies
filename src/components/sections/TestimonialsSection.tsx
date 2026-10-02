"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import api from "@/lib/api";

interface Testimonial {
  _id?: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  rating?: number;
  color?: string;
  date?: string;
}

/* ═══════════════════════════════════════════════════════════════
   ZENTROX TECHNOLOGIES CLIENT REVIEWS (Default)
   These are reviews from Zentrox's own clients — not from clients of
   their clients. All are web/software development testimonials.
═══════════════════════════════════════════════════════════════ */
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO, TechVista Solutions",
    message:
      "Zentrox Technologies delivered our custom CRM on time and exactly as we envisioned. Their team is responsive, professional and truly understands business needs. Highly recommended for any custom software project.",
    rating: 5,
    color: "#2563eb",
    date: "Apr 2026",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Head, Bloom Retail",
    message:
      "Our website traffic grew by 140% within three months of working with Zentrox Technologies. Their SEO and digital marketing team is data-driven, transparent and results-focused.",
    rating: 5,
    color: "#ea580c",
    date: "Apr 2026",
  },
  {
    name: "Amit Verma",
    role: "Operations Director, MediCare Plus",
    message:
      "From concept to launch, Zentrox Technologies handled our mobile app project flawlessly. Clean code, great communication and outstanding post-launch support. We couldn't have asked for a better partner.",
    rating: 5,
    color: "#7c3aed",
    date: "Mar 2026",
  },
  {
    name: "Sneha Kapoor",
    role: "Owner, Spice Garden Restaurant",
    message:
      "Zentrox Technologies built our restaurant website with online ordering and table booking. The design is stunning, mobile-friendly and our customers love it. Online orders have gone up significantly.",
    rating: 5,
    color: "#be185d",
    date: "Feb 2026",
  },
  {
    name: "Vikram Singh",
    role: "Founder, FitZone Gym",
    message:
      "We needed a custom gym management system and Zentrox Technologies delivered beyond expectations. The admin panel is easy to use, and our members can book classes online. Excellent work.",
    rating: 5,
    color: "#059669",
    date: "Feb 2026",
  },
  {
    name: "Anjali Mehta",
    role: "Director, DesignHub Studio",
    message:
      "Working with Zentrox Technologies on our brand identity and website was a pleasure. They understood our vision, delivered on time and the final result exceeded our expectations.",
    rating: 5,
    color: "#dc2626",
    date: "Jan 2026",
  },
  {
    name: "Karan Malhotra",
    role: "CEO, GlobalTrade Exports",
    message:
      "Our B2B export website built by Zentrox Technologies generated +200% more inquiries within the first quarter. Their team is professional, responsive and delivers quality work.",
    rating: 5,
    color: "#0891b2",
    date: "Jan 2026",
  },
  {
    name: "Neha Gupta",
    role: "Co-Founder, Bloom Retail",
    message:
      "Zentrox Technologies built our complete e-commerce platform with payment gateway, inventory management and admin dashboard. Everything works flawlessly. Highly recommended.",
    rating: 5,
    color: "#7c3aed",
    date: "Dec 2025",
  },
  {
    name: "Rohit Sharma",
    role: "Founder, The Tipsy Bar",
    message:
      "Zentrox Technologies designed and developed our bartender service website. The booking system, service showcase and overall design are perfect. Our online bookings increased by 140%.",
    rating: 5,
    color: "#ea580c",
    date: "Nov 2025",
  },
];

const COLOR_PALETTE = [
  "#7c3aed",
  "#ea580c",
  "#0891b2",
  "#be185d",
  "#059669",
  "#dc2626",
  "#2563eb",
];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </div>
  );
}

function normalizeReview(raw: any, index: number): Testimonial {
  return {
    _id: raw?._id || raw?.id || `review-${index}`,
    name: raw?.name || "Anonymous",
    role: raw?.role || raw?.company || "",
    company: raw?.company || "",
    message: raw?.message || "",
    rating: raw?.rating ?? 5,
    color: raw?.color || COLOR_PALETTE[index % COLOR_PALETTE.length],
    date: raw?.date || "",
  };
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await api.get("/reviews");
        const items = data?.data || data;
        if (mounted && Array.isArray(items) && items.length > 0) {
          setTestimonials(items.map(normalizeReview));
        }
      } catch {
        // Silent fail — use defaults
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials for Zentrox Technologies"
      className="relative overflow-hidden bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-700">
            <MessageSquare size={13} />
            Client Reviews
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Real feedback from businesses that worked with Zentrox Technologies
            on websites, mobile apps, software and digital marketing.
          </p>
        </motion.div>

        {/* Masonry Flow */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.06, 0.5),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group mb-5 break-inside-avoid rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                <Quote size={18} />
              </div>

              <div className="mb-3 flex items-center justify-between">
                <StarRating rating={item.rating} />
                {item.date && (
                  <span className="text-[10px] font-medium text-slate-400">
                    {item.date}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                "{item.message}"
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                  }}
                >
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
