'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, Smartphone, Bot, BarChart3, ShoppingCart, Cloud, Palette, Code2, Check } from 'lucide-react';

const SERVICES = [
  {
    id: 'web', icon: Globe, color: '#3b7bff', title: 'Web Development',
    tagline: 'Modern, fast, conversion-optimized websites',
    desc: 'We build stunning websites using Next.js 15, React, and TypeScript — optimized for performance, SEO, and conversion. From landing pages to complex web applications.',
    features: ['Next.js 15 & React', 'TypeScript & Tailwind CSS', 'SEO Optimized', 'Mobile First', 'Core Web Vitals', 'CMS Integration', 'Payment Gateway', 'Analytics Setup'],
    deliverable: 'Production-ready website in 2–6 weeks',
    startingFrom: '₹8,000',
  },
  {
    id: 'mobile', icon: Smartphone, color: '#7c3aed', title: 'Mobile App Development',
    tagline: 'Cross-platform iOS & Android apps',
    desc: 'Native-quality mobile applications using React Native for both iOS and Android platforms — featuring smooth animations, offline support, and app store deployment.',
    features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support', 'App Store Submission', 'In-App Payments', 'User Auth', 'Analytics'],
    deliverable: 'App store ready in 6–12 weeks',
    startingFrom: '₹25,000',
  },
  {
    id: 'ai', icon: Bot, color: '#06d6a0', title: 'AI Integration',
    tagline: 'Intelligent automation for your business',
    desc: 'Integrate AI chatbots, content generators, recommendation engines, and smart automation into your existing products — powered by GPT-4, Claude, and custom ML models.',
    features: ['AI Chatbots', 'Content Generation', 'Smart Search', 'Recommendations', 'Process Automation', 'Data Analysis', 'Computer Vision', 'Custom ML Models'],
    deliverable: 'AI features integrated in 2–4 weeks',
    startingFrom: '₹15,000',
  },
  {
    id: 'seo', icon: BarChart3, color: '#f59e0b', title: 'SEO Services',
    tagline: 'Dominate search rankings and drive organic growth',
    desc: 'Data-driven SEO strategy covering on-page optimization, technical SEO, content strategy, local SEO, and link building to grow your organic traffic sustainably.',
    features: ['Technical SEO Audit', 'On-Page Optimization', 'Local SEO', 'Content Strategy', 'Link Building', 'Schema Markup', 'Core Web Vitals', 'Monthly Reports'],
    deliverable: 'Results visible in 60–90 days',
    startingFrom: '₹5,000/mo',
  },
  {
    id: 'ecommerce', icon: ShoppingCart, color: '#ec4899', title: 'E-Commerce Solutions',
    tagline: 'Full-featured online stores that convert',
    desc: 'Complete e-commerce platforms with product management, payment gateways (Razorpay, Stripe), inventory tracking, order management, and customer portals.',
    features: ['Product Catalog', 'Cart & Checkout', 'Razorpay / Stripe', 'Order Management', 'Inventory System', 'Customer Portal', 'Discount Codes', 'Analytics Dashboard'],
    deliverable: 'Store live in 3–6 weeks',
    startingFrom: '₹18,000',
  },
  {
    id: 'saas', icon: Cloud, color: '#3b7bff', title: 'SaaS Development',
    tagline: 'Scalable cloud-native SaaS platforms',
    desc: 'Custom Software-as-a-Service platforms with subscription billing, multi-tenant architecture, admin dashboards, and API-first design built for scale.',
    features: ['Multi-Tenancy', 'Subscription Billing', 'Admin Dashboard', 'REST API', 'JWT Auth & RBAC', 'Analytics', 'Email Automation', 'Cloudinary Storage'],
    deliverable: 'MVP ready in 8–14 weeks',
    startingFrom: '₹40,000',
  },
  {
    id: 'design', icon: Palette, color: '#7c3aed', title: 'UI/UX Design',
    tagline: 'Cinematic, premium interface design',
    desc: 'From wireframes to pixel-perfect design systems — we craft immersive user experiences that balance aesthetics with usability and conversion optimization.',
    features: ['User Research', 'Wireframing', 'UI Design', 'Design System', 'Prototype', 'Usability Testing', 'Handoff to Dev', 'Brand Guidelines'],
    deliverable: 'Complete design in 2–4 weeks',
    startingFrom: '₹8,000',
  },
  {
    id: 'software', icon: Code2, color: '#06d6a0', title: 'Software Development',
    tagline: 'Custom software solutions for unique problems',
    desc: 'Tailored software built to your exact specifications — internal tools, ERPs, CRMs, automation systems, and business-critical applications.',
    features: ['Custom Architecture', 'Node.js Backend', 'MongoDB / PostgreSQL', 'API Development', 'Third-Party Integrations', 'Scalable Design', 'Documentation', 'Ongoing Support'],
    deliverable: 'Timeline based on scope',
    startingFrom: '₹20,000',
  },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function ServicesClient() {
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="py-24 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-z-accent2 opacity-[0.05] blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="z-badge mx-auto mb-6">What We Build</div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Premium Digital<br /><span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-z-muted max-w-2xl mx-auto leading-relaxed">
              From startups to enterprises — we build the digital products that drive real growth.
              Every engagement comes with transparent pricing, clear timelines, and dedicated support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-10 px-4 md:px-6 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.id} id={svc.id}
                initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 hover:border-z-accent/30 transition-colors duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}>
                      <Icon size={24} style={{ color: svc.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-z-muted">Service</div>
                      <h2 className="text-xl font-extrabold text-white">{svc.title}</h2>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-z-muted mb-3 italic">"{svc.tagline}"</p>
                  <p className="text-sm text-z-muted leading-relaxed mb-5">{svc.desc}</p>
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="text-xs uppercase tracking-widest text-z-muted mb-1">Includes</div>
                    {svc.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-z-muted">
                        <Check size={13} style={{ color: svc.color }} className="flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="glass-card bg-white/[0.02] p-6 rounded-2xl mb-4">
                    <div className="text-xs text-z-muted uppercase tracking-widest mb-1">Starting From</div>
                    <div className="text-3xl font-extrabold text-white mb-3">{svc.startingFrom}</div>
                    <div className="text-xs text-z-muted mb-4">{svc.deliverable}</div>
                    <div className="w-full h-px bg-z-border mb-4" />
                    <div className="text-xs text-z-muted">Pricing varies based on complexity, features, and timeline. All projects include free consultation.</div>
                  </div>
                  <Link href="/contact"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 shadow-glow-sm hover:-translate-y-0.5"
                    style={{ background: svc.color }}>
                    Get a Quote for {svc.title} <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
