'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';
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
              className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={24} />
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
              transition={{ delay: 0.5 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
            >
              <div className="glass-card flex items-center justify-between px-5 py-3 shadow-card">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-z-accent3 animate-pulse-glow flex-shrink-0" />
                  <span className="text-sm font-medium text-white truncate">{bannerText}</span>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Link href="/contact"
                    className="px-4 py-1.5 text-xs font-semibold rounded-full bg-z-accent text-white hover:bg-blue-500 transition-colors whitespace-nowrap">
                    Book Now
                  </Link>
                  <button onClick={() => setDismissed(true)} className="text-z-muted hover:text-white transition-colors flex-shrink-0">
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
