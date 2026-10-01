"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

interface Testimonial {
  _id?: string;
  name: string;
  company?: string;
  role?: string;
  message: string;
  rating?: number;
  image?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    company: "TechVista Solutions",
    role: "Founder & CEO",
    message:
      "Zentrox Technologies delivered our custom CRM on time and exactly as we envisioned. Their team is responsive, professional and truly understands business needs.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "Bloom Retail",
    role: "Marketing Head",
    message:
      "Our website traffic grew by 140% within three months of working with Zentrox. Their SEO and digital marketing team is data-driven and results-focused.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    company: "MediCare Plus",
    role: "Operations Director",
    message:
      "From concept to launch, Zentrox handled our mobile app project flawlessly. Clean code, great communication and outstanding post-launch support.",
    rating: 5,
  },
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

export default function TestimonialsSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    DEFAULT_TESTIMONIALS
  );

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await api.get("/testimonials");
        const items = data?.data || data;
        if (mounted && Array.isArray(items) && items.length > 0) {
          setTestimonials(items);
        }
      } catch {}
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* ─── HEADER ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-700">
            <MessageSquare size={13} />
            {t("testimonials.badge", "Testimonials")}
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t("testimonials.title", "What Our Clients Say")}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            {t(
              "testimonials.sub",
              "We're grateful for the trust and kind words from our amazing clients."
            )}
          </p>
        </motion.div>

        {/* ─── TESTIMONIALS GRID ────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="
                group relative flex h-full flex-col
                rounded-2xl border border-slate-200/70
                bg-white p-6
                transition-all duration-300
                hover:border-blue-200
                hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
                sm:p-7
              "
            >
              {/* Quote icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <Quote size={18} />
              </div>

              {/* Rating */}
              <StarRating rating={item.rating} />

              {/* Message */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                "{item.message}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.role}
                    {item.role && item.company ? " · " : ""}
                    {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
