'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

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

export default function PopupManager() {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [activePopup, setActivePopup] = useState<PopupData | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const triggered = useRef(false);

  // Load active popups from DB
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/cms/popups/active');
        setPopups(data.data || []);
      } catch {
        // Fallback to static default popup if API unavailable
        setPopups([{
          _id: 'default',
          type: 'lead',
          title: 'Free Website Audit',
          content: 'Get a free in-depth audit of your current website — performance, SEO, conversion rate, and design.',
          ctaText: 'Claim Free Audit',
          ctaLink: '/contact',
          trigger: 'scroll',
          triggerValue: 800,
          showOnce: true,
        }]);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!popups.length) return;

    // Check session storage for already-shown popups
    const shown = new Set<string>(JSON.parse(sessionStorage.getItem('zt_shown_popups') || '[]'));

    const findAndShow = (currentScrollY?: number) => {
      if (triggered.current) return;
      for (const popup of popups) {
        if (shown.has(popup._id)) continue;
        if (dismissed.has(popup._id)) continue;

        const shouldTrigger =
          popup.trigger === 'time' ? true :
          popup.trigger === 'scroll' && currentScrollY !== undefined
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
    const timePopups = popups.filter(p => p.trigger === 'time');
    const timers = timePopups
      .filter(p => !shown.has(p._id) && !dismissed.has(p._id))
      .map(p => setTimeout(() => {
        if (!triggered.current) {
          triggered.current = true;
          setActivePopup(p);
        }
      }, (p.triggerValue || 30) * 1000));

    // Scroll-based triggers
    const onScroll = () => findAndShow(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', onScroll);
    };
  }, [popups, dismissed]);

  const dismiss = (popup: PopupData) => {
    setActivePopup(null);
    setDismissed(prev => new Set(prev).add(popup._id));
    triggered.current = false;

    if (popup.showOnce) {
      const shown: string[] = JSON.parse(sessionStorage.getItem('zt_shown_popups') || '[]');
      if (!shown.includes(popup._id)) {
        shown.push(popup._id);
        sessionStorage.setItem('zt_shown_popups', JSON.stringify(shown));
      }
    }
  };

  return (
    <AnimatePresence>
      {activePopup && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => dismiss(activePopup)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div className="glass-card max-w-md w-full p-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-z-accent opacity-[0.07] blur-[60px]" />
              </div>

              <button onClick={() => dismiss(activePopup)} className="absolute top-4 right-4 text-z-muted hover:text-white transition-colors">
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-z-accent/15 border border-z-accent/30 flex items-center justify-center mb-5">
                <Zap size={24} className="text-z-accent" />
              </div>

              <div className="z-badge mb-4">{activePopup.type === 'discount' ? 'Limited Time' : activePopup.type === 'internship' ? 'Internship Open' : 'Special Offer'}</div>
              <h3 className="text-2xl font-extrabold text-white mb-2">{activePopup.title}</h3>
              <p className="text-sm text-z-muted leading-relaxed mb-6">{activePopup.content}</p>

              {activePopup.ctaText && activePopup.ctaLink && (
                <Link href={activePopup.ctaLink} onClick={() => dismiss(activePopup)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300 shadow-glow-sm mb-3">
                  {activePopup.ctaText}
                </Link>
              )}
              <button onClick={() => dismiss(activePopup)} className="w-full text-xs text-z-muted hover:text-white transition-colors py-2">
                No thanks, I'll skip this
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
