'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Zap } from 'lucide-react';
import { useLang } from '@/lib/providers';

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const { t, lang } = useLang();

  const heroWords = t('hero.words', 'Digital Futures|Web Excellence|AI Solutions|Punjab Growth|SaaS Platforms')
    .split('|')
    .filter(Boolean);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % heroWords.length);
        setWordVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroWords.length]);

  useEffect(() => {
    setWordIdx(0);
    setWordVisible(true);
  }, [lang]);

  return (
    <motion.section
      style={{ opacity }}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 md:px-6 text-center overflow-hidden"
    >
      {/* ── Premium animated background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-z-accent opacity-[0.07] blur-[130px] animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-z-accent2 opacity-[0.06] blur-[110px] animate-float" style={{ animationDuration: '10s', animationDelay: '-3s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full bg-z-accent3 opacity-[0.05] blur-[90px] animate-float" style={{ animationDuration: '7s', animationDelay: '-5s' }} />

        {/* Subtle light beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2/3"
          style={{ background: 'linear-gradient(180deg, rgba(59,123,255,0.55) 0%, rgba(59,123,255,0.08) 60%, transparent 100%)' }} />

        {/* Horizontal glow line */}
        <div className="absolute top-[38%] inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59,123,255,0.18) 30%, rgba(124,58,237,0.18) 70%, transparent 100%)' }} />

        {/* Corner glows */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-[0.04] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #3b7bff 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.04] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />

        {/* Floating particles */}
        {[
          { x: '15%', y: '20%', size: 2, delay: '0s', dur: '4s' },
          { x: '85%', y: '25%', size: 1.5, delay: '1s', dur: '5s' },
          { x: '70%', y: '65%', size: 2.5, delay: '0.5s', dur: '6s' },
          { x: '25%', y: '70%', size: 1.5, delay: '2s', dur: '4.5s' },
          { x: '50%', y: '15%', size: 2, delay: '1.5s', dur: '5.5s' },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full bg-z-accent animate-pulse-glow"
            style={{ left: p.x, top: p.y, width: p.size * 2, height: p.size * 2, animationDelay: p.delay, animationDuration: p.dur, opacity: 0.5 }} />
        ))}
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-badge mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-z-accent3 animate-pulse-glow" />
        {t('hero.badge')}
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight mb-6 max-w-5xl"
      >
        <span className="block text-z-text">{t('hero.line1')}</span>
        <span
          className="block gradient-text"
          style={{ opacity: wordVisible ? 1 : 0, minHeight: '1.1em', transition: 'opacity 0.3s ease' }}
        >
          {heroWords[wordIdx] || heroWords[0]}
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base md:text-lg text-z-muted max-w-2xl leading-relaxed mb-10"
      >
        {t('hero.sub')}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <Link
          href="/contact"
          className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300 shadow-glow-sm hover:shadow-glow-accent"
        >
          {t('hero.cta_primary')}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/#classes"
          className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-z-border text-z-text font-semibold text-sm hover:border-z-accent hover:text-z-accent transition-all duration-300"
        >
          <Play size={14} className="group-hover:text-z-accent transition-colors" />
          {t('hero.cta_secondary')}
        </Link>
      </motion.div>

      {/* Floating scene */}
      <motion.div style={{ y }} className="relative w-full max-w-4xl h-80 md:h-96 mx-auto">
        {/* Code Window */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-0 top-[10%] w-60 md:w-72 glass-card p-4 shadow-card"
          style={{ animation: 'float 5s ease-in-out infinite', ['--rot' as string]: '-3deg' }}
        >
          <div className="flex gap-1.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[11px] leading-loose">
            <div><span className="code-kw">const</span> zentrox = <span className="code-fn">buildFuture</span>{'({'}</div>
            <div>&nbsp;&nbsp;<span className="code-str">&quot;client&quot;</span>: <span className="code-str">&quot;YourBiz&quot;</span>,</div>
            <div>&nbsp;&nbsp;<span className="code-str">&quot;stack&quot;</span>: [<span className="code-str">&quot;Next.js&quot;</span>],</div>
            <div>&nbsp;&nbsp;<span className="code-str">&quot;quality&quot;</span>: <span className="code-num">Infinity</span></div>
            <div>{'}'});</div>
          </div>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute right-0 top-0 w-52 md:w-60 glass-card p-4 shadow-card"
          style={{ animation: 'float 6s ease-in-out infinite -2s', ['--rot' as string]: '2deg' }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-z-muted uppercase tracking-widest">Revenue</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-z-accent3/15 text-z-accent3">+34%</span>
          </div>
          <div className="text-xl font-bold text-z-text mb-3">₹4.2L</div>
          <div className="flex items-end gap-1 h-10">
            {[40, 65, 50, 85, 70, 100].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 5 ? 'var(--z-accent3)' : 'var(--z-accent)', opacity: 0.75 }} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-z-border">
            <span className="text-[10px] text-z-muted">Active users</span>
            <span className="text-xs font-semibold text-z-text">2,847</span>
          </div>
        </motion.div>

        {/* Service Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 md:w-56 glass-card p-4 shadow-card text-left"
          style={{ animation: 'float 7s ease-in-out infinite -1s', ['--rot' as string]: '1deg' }}
        >
          <div className="w-9 h-9 rounded-xl bg-z-accent2/15 border border-z-accent2/30 flex items-center justify-center mb-3">
            <Zap size={18} className="text-z-accent2" />
          </div>
          <div className="text-sm font-semibold text-z-text mb-1">Full-Stack Dev</div>
          <div className="text-[11px] text-z-muted leading-relaxed">Modern, scalable web apps built for performance.</div>
        </motion.div>

        {/* AI Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 right-[18%] w-24 md:w-32"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-[0_0_18px_rgba(59,123,255,0.35)]">
            <ellipse cx="60" cy="172" rx="34" ry="6" fill="rgba(59,123,255,0.18)" />
            <rect x="32" y="80" width="56" height="68" rx="20" fill="#0d1220" stroke="rgba(59,123,255,0.45)" strokeWidth="1.5" />
            <rect x="50" y="80" width="20" height="68" fill="rgba(59,123,255,0.05)" />
            <path d="M50 80 L60 100 L70 80" fill="none" stroke="rgba(59,123,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="33" y="28" width="54" height="54" rx="20" fill="#0d1220" stroke="rgba(59,123,255,0.45)" strokeWidth="1.5" />
            <ellipse cx="46" cy="52" rx="4" ry="5" fill="#3b7bff" opacity="0.9"><animate attributeName="ry" values="5;0.5;5" dur="4s" repeatCount="indefinite" begin="1.5s" /></ellipse>
            <ellipse cx="74" cy="52" rx="4" ry="5" fill="#3b7bff" opacity="0.9"><animate attributeName="ry" values="5;0.5;5" dur="4s" repeatCount="indefinite" begin="1.5s" /></ellipse>
            <circle cx="47" cy="51" r="1.5" fill="#fff" />
            <circle cx="75" cy="51" r="1.5" fill="#fff" />
            <path d="M50 64 Q60 70 70 64" fill="none" stroke="rgba(59,123,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="28" x2="60" y2="14" stroke="rgba(59,123,255,0.4)" strokeWidth="1.5" />
            <circle cx="60" cy="11" r="5" fill="#3b7bff" opacity="0.8"><animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" /></circle>
            <rect x="38" y="142" width="16" height="30" rx="8" fill="#0d1220" stroke="rgba(59,123,255,0.3)" strokeWidth="1.2" />
            <rect x="66" y="142" width="16" height="30" rx="8" fill="#0d1220" stroke="rgba(59,123,255,0.3)" strokeWidth="1.2" />
            <rect x="34" y="166" width="22" height="8" rx="4" fill="rgba(59,123,255,0.3)" />
            <rect x="64" y="166" width="22" height="8" rx="4" fill="rgba(59,123,255,0.3)" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}