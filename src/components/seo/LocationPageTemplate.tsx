'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle2, ChevronDown, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import Script from 'next/script';

interface LocationPageProps {
  city: string;
  state: string;
  service: string;
  serviceSlug: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  stats: { label: string; value: string }[];
  services: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  nearbyAreas: string[];
  structuredData?: Record<string, any>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-z-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/3 transition-colors">
        <span className="text-sm font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={16} className={`text-z-muted flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-z-muted leading-relaxed border-t border-z-border pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function LocationPageTemplate({
  city, state, service, serviceSlug, headline, subheadline, ctaText,
  stats, services, faqs, nearbyAreas, structuredData,
}: LocationPageProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      {structuredData && (
        <Script id="local-biz-schema" type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...structuredData })}
        </Script>
      )}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* Hero */}
      <section className="relative z-10 py-20 px-4 md:px-6 border-b border-z-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-z-accent" />
              <span className="text-xs text-z-muted">{city}, {state}</span>
              <span className="text-z-border">·</span>
              <span className="text-xs text-z-accent">{service}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 max-w-3xl">
              {headline}
            </h1>
            <p className="text-base text-z-muted max-w-2xl leading-relaxed mb-8">{subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300 shadow-glow-sm hover:shadow-glow-accent">
                {ctaText} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/918988183513" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-sm hover:border-z-accent hover:text-z-accent transition-all duration-300">
                <Phone size={14} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-10 px-4 md:px-6 border-b border-z-border bg-[rgba(8,12,21,0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-z-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="z-badge mb-4">{service} in {city}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              What We Offer in {city}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="glass-card p-6 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-z-accent3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-z-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-10 py-20 px-4 md:px-6 bg-[#080c15]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <div className="z-badge mb-4">FAQs</div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-z-muted text-sm mt-2">About {service} services in {city}</p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="relative z-10 py-12 px-4 md:px-6 border-t border-z-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-base font-bold text-white mb-4">
            Areas We Serve in and around {city}
          </h2>
          <div className="flex flex-wrap gap-2">
            {nearbyAreas.map(area => (
              <span key={area} className="text-xs font-medium px-3 py-1.5 rounded-full border border-z-border text-z-muted">
                {area}
              </span>
            ))}
          </div>
          <p className="text-xs text-z-muted mt-4 max-w-2xl leading-relaxed">
            Zentrox Technologies is an MSME-registered remote-first technology company serving clients in {city} and across {state}.
            We deliver premium {service.toLowerCase()} services with the quality of enterprise agencies at competitive local pricing.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 px-4 md:px-6 bg-[#080c15] border-t border-z-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready for Premium {service} in {city}?
          </h2>
          <p className="text-z-muted mb-6 text-sm leading-relaxed">
            Get a free consultation with Zentrox Technologies. We respond within 24 hours and the first consultation is always free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300">
              Book Free Consultation <ArrowRight size={15} />
            </Link>
            <a href="mailto:contact.zentroxtech@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-z-border text-z-muted text-sm hover:text-white hover:border-z-accent transition-all duration-300">
              <Mail size={14} /> Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
