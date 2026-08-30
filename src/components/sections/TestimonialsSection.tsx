"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLang } from "@/lib/providers";

const TESTIMONIALS = [
  {
    name: "Founder, E-commerce Brand",
    role: "E-commerce Platform Development",
    text: "The e-commerce platform they built for us has streamlined our entire operation. The team understood our business from day one and delivered a solution that actually works for us.",
  },
  {
    name: "Sales Director, B2B Firm",
    role: "CRM & Management System",
    text: "Zentrox developed a custom CRM that finally gave us full visibility into our sales pipeline. The process was smooth and the results speak for themselves.",
  },
  {
    name: "CTO, SaaS Startup",
    role: "SaaS Development",
    text: "Their SaaS development expertise helped us launch our product on time. The architecture is scalable and the team continues to support us as we grow.",
  },
  {
    name: "Marketing Lead, Professional Services",
    role: "SEO & Digital Growth",
    text: "Our organic traffic increased by over 60% within four months of working with Zentrox on SEO. Their data-driven approach and clear reporting made all the difference.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[0] }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
        “{testimonial.text}”
      </blockquote>
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="font-semibold text-slate-900">{testimonial.name}</div>
        <div className="text-sm text-slate-500">{testimonial.role}</div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const totalSlides = TESTIMONIALS.length;

  const goToSlide = (index: number) => {
    if (index < 0) setCurrentIndex(totalSlides - 1);
    else if (index >= totalSlides) setCurrentIndex(0);
    else setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, totalSlides]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-slate-50/70 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
            {t("testimonials.badge")}
          </span>
          <h2
            id="testimonials-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("testimonials.title")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            {t("testimonials.sub")}
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => goToSlide(currentIndex - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-600 transition-all hover:border-gray-300 hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-6 bg-amber-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goToSlide(currentIndex + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-600 transition-all hover:border-gray-300 hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
