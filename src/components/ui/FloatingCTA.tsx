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
                flex h-14 w-14 items-center justify-center
                rounded-full
                bg-[#25d366] text-white
                shadow-lg shadow-[#25d366]/30
                transition-all duration-300
                hover:scale-110 hover:shadow-xl hover:shadow-[#25d366]/40
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
              className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
            >
              <div
                className="
                  flex items-center justify-between
                  rounded-2xl
                  border border-slate-200/60
                  bg-white/90 px-5 py-3.5
                  shadow-lg shadow-slate-200/50
                  backdrop-blur-md
                  transition-colors duration-300
                  dark:border-white/8
                  dark:bg-[#1a1e2b]/90
                  dark:shadow-black/30
                "
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Sparkles size={16} className="flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {bannerText}
                  </span>
                </div>

                <div className="ml-3 flex flex-shrink-0 items-center gap-2">
                  <Link
                    href="/contact"
                    className="
                      rounded-full
                      bg-gradient-to-r from-blue-600 to-blue-700
                      px-4 py-1.5
                      text-xs font-semibold text-white
                      shadow-sm shadow-blue-600/20
                      transition-all duration-300
                      hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-600/30
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    "
                  >
                    Book Now
                  </Link>
                  <button
                    onClick={() => setDismissed(true)}
                    className="
                      rounded-full p-1.5
                      text-slate-400
                      transition-colors duration-200
                      hover:bg-slate-100 hover:text-slate-700
                      dark:text-slate-500
                      dark:hover:bg-white/10 dark:hover:text-slate-300
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
