'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Zap, Users, Target, Lightbulb } from 'lucide-react';

const TEAM_VALUES = [
  { icon: Zap, title: 'Innovation First', desc: 'We build with the latest technology stacks, ensuring your product is future-proof from day one.', color: '#3b7bff' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'MSME-registered and committed to enterprise-grade quality at every stage of development.', color: '#7c3aed' },
  { icon: Globe, title: 'Remote-First', desc: 'Serving clients across India — from Mohali to Noida — with seamless remote collaboration.', color: '#06d6a0' },
  { icon: Users, title: 'Client-Centric', desc: 'Your success is our success. Every solution is crafted specifically for your business goals.', color: '#f59e0b' },
  { icon: Target, title: 'Results-Driven', desc: 'We focus on measurable outcomes — conversions, traffic, revenue, and growth metrics that matter.', color: '#ec4899' },
  { icon: Lightbulb, title: 'Continuous Learning', desc: 'Our Saturday live classes and internship programs reflect our passion for growing the tech community.', color: '#3b7bff' },
];

const SERVICES_STACK = [
  { label: 'Frontend', items: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB Atlas', 'REST APIs', 'JWT Auth'] },
  { label: 'Mobile', items: ['React Native', 'Android Dev', 'Cross-Platform', 'App Store Ready'] },
  { label: 'AI & Cloud', items: ['AI Integration', 'Cloudinary', 'Vercel', 'Railway', 'Razorpay'] },
];

const MILESTONES = [
  { year: '2020', event: 'Zentrox Technologies founded in Mohali, Punjab' },
  { year: '2021', event: 'MSME registration completed — officially recognized technology company' },
  { year: '2022', event: 'Launched Saturday live classes — 100+ students enrolled' },
  { year: '2023', event: 'Expanded to Chandigarh, Haryana, and Himachal Pradesh markets' },
  { year: '2024', event: 'Remote internship program launched — AI & SaaS focus' },
  { year: '2025', event: 'Full-stack ecosystem platform launched — LMS + CMS + CRM' },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function AboutClient() {
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="py-24 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-z-accent opacity-[0.05] blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="z-badge mx-auto mb-6">About Zentrox Technologies</div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Building the Digital<br /><span className="gradient-text">Future of Punjab</span>
            </h1>
            <p className="text-lg text-z-muted max-w-2xl mx-auto leading-relaxed mb-8">
              Zentrox Technologies is an MSME-registered, remote-first technology company headquartered in Mohali & Chandigarh.
              We craft premium web, mobile, AI, and SaaS solutions for businesses across India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-z-muted">
                <span className="w-2 h-2 rounded-full bg-z-accent3 animate-pulse-glow" />
                MSME Registered
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-z-muted">
                <span className="w-2 h-2 rounded-full bg-z-accent" />
                Remote-First
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-z-muted">
                <span className="w-2 h-2 rounded-full bg-z-accent2" />
                Innovation-Driven
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 md:px-6 bg-[#080c15]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="z-badge mb-4">Our Mission</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              World-Class Technology, Accessible to Every Business
            </h2>
            <p className="text-z-muted leading-relaxed mb-4">
              We believe every business — from a Mohali coaching center to a Punjab startup — deserves access to premium digital solutions.
              Our mission is to bridge the gap between enterprise-grade technology and growing businesses.
            </p>
            <p className="text-z-muted leading-relaxed mb-6">
              Beyond building products, we invest in the next generation of developers through our live Saturday classes
              and remote internship program — nurturing talent right here in Punjab.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300 shadow-glow-sm">
              Work With Us <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-z-accent opacity-[0.06] blur-[60px] pointer-events-none" />
              <div className="text-sm font-semibold text-z-muted uppercase tracking-widest mb-5">Founder</div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-xl font-extrabold">P</div>
                <div>
                  <div className="text-lg font-bold text-white">Prince Paul Singh</div>
                  <div className="text-sm text-z-muted">Founder & CEO, Zentrox Technologies</div>
                </div>
              </div>
              <p className="text-sm text-z-muted leading-relaxed italic">
                "Our goal is simple — build technology that actually works for real businesses, not just looks good in a pitch deck.
                Every line of code we write is about creating measurable value for our clients."
              </p>
              <div className="mt-5 pt-4 border-t border-z-border flex gap-4">
                <div className="text-center">
                  <div className="text-xl font-extrabold text-white">200+</div>
                  <div className="text-[10px] text-z-muted uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-extrabold text-white">5+</div>
                  <div className="text-[10px] text-z-muted uppercase tracking-wide">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-extrabold text-white">150+</div>
                  <div className="text-[10px] text-z-muted uppercase tracking-wide">Clients</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="z-badge mb-4">Core Values</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">What Drives Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM_VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}>
                    <Icon size={20} style={{ color: v.color }} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-z-muted leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 md:px-6 bg-[#080c15]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="z-badge mb-4">Technology Stack</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Built with the Best</h2>
            <p className="text-z-muted max-w-xl">We use modern, production-proven technology stacks to ensure your product is fast, scalable, and maintainable.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES_STACK.map((stack, i) => (
              <motion.div key={stack.label} initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-z-accent mb-3">{stack.label}</div>
                <div className="flex flex-col gap-2">
                  {stack.items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-z-accent3 flex-shrink-0" />
                      <span className="text-sm text-z-muted">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
            <div className="z-badge mx-auto mb-4">Our Journey</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Building Since 2020</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-z-border" />
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year} initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-0`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-z-accent border-2 border-z-dark -translate-x-1/2 mt-1.5 z-10" />
                <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                  <div className="text-z-accent font-mono text-sm font-bold mb-1">{m.year}</div>
                  <div className="text-sm text-z-muted leading-relaxed">{m.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-6 bg-[#080c15] text-center">
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Build Something Great?</h2>
          <p className="text-z-muted mb-8">Let's discuss your project. First consultation is always free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-z-accent text-white font-semibold hover:bg-blue-500 transition-all shadow-glow-sm">
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link href="/courses" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-z-border text-z-muted hover:text-white hover:border-z-accent transition-all">
              Join Our Courses
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
