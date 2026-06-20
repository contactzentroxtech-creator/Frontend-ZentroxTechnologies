'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Bot, BarChart3, ShoppingCart, Cloud, Palette, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/lib/providers';

const SERVICES = [
  { icon: Globe, color: '#3b7bff', href: '/services#web',
    titleKey: 'service.web.title', descKey: 'service.web.desc',
    titleFB: 'Web Development', descFB: 'Stunning, fast, conversion-optimized websites built with Next.js, React, and modern stacks.' },
  { icon: Smartphone, color: '#7c3aed', href: '/services#mobile',
    titleKey: 'service.mobile.title', descKey: 'service.mobile.desc',
    titleFB: 'Mobile Applications', descFB: 'Cross-platform mobile apps for iOS and Android that engage users and drive business growth.' },
  { icon: Bot, color: '#06d6a0', href: '/services#ai',
    titleKey: 'service.ai.title', descKey: 'service.ai.desc',
    titleFB: 'AI Integration', descFB: 'Smart automation, AI chatbots, and ML features that give your business an intelligent edge.' },
  { icon: BarChart3, color: '#f59e0b', href: '/services#seo',
    titleKey: 'service.seo.title', descKey: 'service.seo.desc',
    titleFB: 'SEO & Digital Growth', descFB: 'Data-driven SEO, performance marketing, and content strategy to dominate search rankings.' },
  { icon: ShoppingCart, color: '#ec4899', href: '/services#ecommerce',
    titleKey: 'service.ecommerce.title', descKey: 'service.ecommerce.desc',
    titleFB: 'E-Commerce Solutions', descFB: 'Full-featured online stores with payment gateways, inventory systems, and customer portals.' },
  { icon: Cloud, color: '#3b7bff', href: '/services#saas',
    titleKey: 'service.saas.title', descKey: 'service.saas.desc',
    titleFB: 'SaaS Development', descFB: 'Custom SaaS platforms built for scale — subscription models, dashboards, cloud-native.' },
  { icon: Palette, color: '#7c3aed', href: '/services#design',
    titleKey: 'service.design.title', descKey: 'service.design.desc',
    titleFB: 'UI/UX Design', descFB: 'Cinematic, premium interfaces designed to convert — from wireframe to pixel-perfect delivery.' },
  { icon: Code2, color: '#06d6a0', href: '/services#software',
    titleKey: 'service.software.title', descKey: 'service.software.desc',
    titleFB: 'Software Development', descFB: 'Scalable custom software solutions tailored to your specific business processes and workflows.' },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const { t } = useLang();
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height * 100).toFixed(1)}%`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group tile-glow glass-card p-6 hover:border-z-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-default flex flex-col"
    >
      <div
        className="w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${service.color}18`, borderColor: `${service.color}30` }}
      >
        <Icon size={22} style={{ color: service.color }} />
      </div>
      <h3 className="text-sm font-bold text-white mb-2">{t(service.titleKey, service.titleFB)}</h3>
      <p className="text-sm text-z-muted leading-relaxed flex-1">{t(service.descKey, service.descFB)}</p>
      <Link href={service.href} className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-z-accent hover:gap-2 transition-all duration-200">
        {t('services.explore', 'Explore')} <ArrowUpRight size={13} />
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();

  return (
    <section id="services" className="relative z-10 py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="z-badge mb-4">{t('services.badge', 'What We Build')}</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
            {t('services.title', 'Premium Digital Services for Growing Businesses')}
          </h2>
          <p className="text-base text-z-muted max-w-xl leading-relaxed">
            {t('services.sub', "From local startups in Mohali to scaling enterprises — world-class technology at accessible prices.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.titleKey} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-z-border text-sm font-semibold text-z-muted hover:border-z-accent hover:text-white transition-all duration-300">
            {t('services.view_all', 'View All Services')} <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
