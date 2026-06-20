'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useLang } from '@/lib/providers';

const TESTIMONIALS = [
  { name: 'Rajveer Singh', role: 'Owner, Chandigarh Apparel Co.', initials: 'RS', text: 'Zentrox Technologies built our e-commerce platform in record time. Sales doubled within 3 months of launch. Exceptional team and attention to detail.' },
  { name: 'Priya Kapoor', role: 'Director, Mohali Learning Hub', initials: 'PK', text: 'The coaching center management system they built saved us 20+ hours per week. The dashboard is beautiful and incredibly easy to use.' },
  { name: 'Arjun Sharma', role: 'Founder, TechStart Mohali', initials: 'AS', text: 'From concept to launch in just 6 weeks. Our startup website gets compliments from investors in every meeting. Absolutely world-class work.' },
  { name: 'Mandeep Gill', role: 'CEO, Ludhiana Traders', initials: 'MG', text: 'Zentrox Technologies put us on page one for all our target keywords. Real measurable results, not just promises. Highly recommended.' },
  { name: 'Harman Bhatia', role: 'Junior Developer, Chandigarh', initials: 'HB', text: 'The Saturday classes were a complete game-changer. I went from zero coding knowledge to landing my first development job in just 4 months.' },
  { name: 'Simran Kaur', role: 'Entrepreneur, Punjab', initials: 'SK', text: 'Professional, responsive, and incredibly talented. They built exactly what we envisioned and delivered it ahead of schedule.' },
];

function TestimonialCard({ t: testi, delay }: { t: typeof TESTIMONIALS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col gap-4"
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-z-gold fill-z-gold" />)}
      </div>
      <p className="text-sm text-z-muted leading-relaxed flex-1">{testi.text}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-z-border">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {testi.initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{testi.name}</div>
          <div className="text-xs text-z-muted">{testi.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { t } = useLang();
  return (
    <section className="relative z-10 py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
          <div className="z-badge mb-4">Client Stories</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-z-text leading-tight tracking-tight mb-4">
            Trusted by Businesses Across Punjab
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((testi, i) => (
            <TestimonialCard key={testi.name} t={testi} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useLang();
  return (
    <section className="relative z-10 py-24 px-4 md:px-6 bg-z-dark2 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-z-accent opacity-[0.05] blur-[150px]" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="z-badge mx-auto mb-6">{t('cta.badge', 'Ready to Start?')}</div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-z-text leading-tight tracking-tight mb-6">
            {t('cta.title', 'Transform Your Business')}<br />
            <span className="gradient-text">{t('cta.title2', 'with Zentrox Technologies')}</span>
          </h2>
          <p className="text-base md:text-lg text-z-muted max-w-xl mx-auto leading-relaxed mb-10">
            {t('cta.sub', 'Join hundreds of Punjab businesses already building their digital future with us. First consultation is always free.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="group flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-z-accent text-white font-semibold hover:bg-blue-500 transition-all duration-300 shadow-glow-sm hover:shadow-glow-accent">
              {t('cta.primary', 'Book Free Consultation')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/courses"
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-z-border text-z-text font-semibold hover:border-z-accent hover:text-z-accent transition-all duration-300">
              {t('cta.secondary', 'Explore Courses')}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-z-muted">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-z-accent3" /> MSME Registered</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-z-accent3" /> Free Consultation</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-z-accent3" /> Remote-First</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
