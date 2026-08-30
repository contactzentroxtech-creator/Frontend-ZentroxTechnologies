'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import api from '@/lib/api';
import { useLang } from '@/lib/providers';

interface SiteSettings {
  whatsapp_number?: string;
  announcement_active?: boolean;
  announcement_banner?: string;
  offer_text?: string;
  show_floating_cta?: boolean;
  show_whatsapp_btn?: boolean;
}

const DEFAULT_WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918988183513';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({});
  const { t } = useLang();
  const loaded = useRef(false);

  // Load CMS settings once
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    api.get('/cms/settings').then(({ data }) => {
      setSettings(data.data || {});
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waNumber = settings.whatsapp_number || DEFAULT_WA;
  const waMessage = `Hi Zentrox Technologies, I am interested in your services.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  const bannerText = settings.offer_text || settings.announcement_banner || 'Free consultation — no commitment needed';
  const showWA = settings.show_whatsapp_btn !== false; // default true
  const showCTABar = settings.show_floating_cta !== false; // default true

  return (
    <>
      {/* WhatsApp float button */}
      {showWA && (
        <AnimatePresence>
          {visible && (
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="
                fixed bottom-28 right-6 z-50
                flex items-center justify-center
                w-14 h-14 rounded-full
                bg-[#25d366] text-white
                shadow-lg shadow-[#25d366]/30
                hover:scale-110 hover:shadow-xl hover:shadow-[#25d366]/40
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2
              "
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={24} />
              {/* Small pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-[#25d366]/30 animate-ping" />
            </motion.a>
          )}
        </AnimatePresence>
      )}

      {/* Sticky offer bar */}
      {showCTABar && !dismissed && (
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ delay: 0.5, type: 'spring', damping: 25 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
            >
              <div
                className="
                  flex items-center justify-between
                  px-5 py-3.5
                  bg-white/90 dark:bg-[#1e293b]/90
                  backdrop-blur-md
                  border border-slate-200/60 dark:border-white/10
                  rounded-2xl
                  shadow-lg shadow-slate-200/50 dark:shadow-black/30
                  transition-colors duration-300
                "
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Sparkles size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                    {bannerText}
                  </span>
                </div>

                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <Link
                    href="/contact"
                    className="
                      px-4 py-1.5
                      text-xs font-semibold
                      rounded-full
                      bg-gradient-to-r from-blue-600 to-blue-700
                      text-white
                      shadow-sm shadow-blue-600/20
                      hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-600/30
                      transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    "
                  >
                    Book Now
                  </Link>
                  <button
                    onClick={() => setDismissed(true)}
                    className="
                      p-1.5 rounded-full
                      text-slate-400 dark:text-slate-500
                      hover:text-slate-700 dark:hover:text-slate-300
                      hover:bg-slate-100 dark:hover:bg-white/10
                      transition-colors duration-200
                    "
                    aria-label="Dismiss offer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
