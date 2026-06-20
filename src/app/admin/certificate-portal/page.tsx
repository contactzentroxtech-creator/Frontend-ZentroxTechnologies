'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Maximize2, Minimize2, ExternalLink, RefreshCw, Info } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function AdminCertificatePortalPage() {
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { user } = useAuthStore();

  // Pass auth token to iframe via postMessage after load
  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('zt_access_token') : null;
    const msg = {
      type: 'ZT_AUTH',
      token,
      user: user ? { name: user.name, email: user.email, role: user.role } : null,
    };
    try {
      iframeRef.current.contentWindow?.postMessage(msg, window.location.origin);
    } catch {}
  }, [loaded, user]);

  // Toggle fullscreen with keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreen) setFullscreen(false);
      if (e.key === 'F11') { e.preventDefault(); setFullscreen(f => !f); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fullscreen]);

  const PORTAL_FEATURES = [
    { icon: '🏆', label: 'Issue Certificates' },
    { icon: '💼', label: 'Manage Internships' },
    { icon: '📄', label: 'Offer Letters' },
    { icon: '✅', label: 'Completion Letters' },
    { icon: '⭐', label: 'Recommendation Letters' },
    { icon: '⚡', label: 'Bulk Issuance' },
    { icon: '🔍', label: 'Verify Certificates' },
    { icon: '📦', label: 'Hardcopy Orders' },
    { icon: '📊', label: 'Analytics' },
    { icon: '💳', label: 'Payment Tracking' },
    { icon: '🎨', label: 'PDF Generation' },
    { icon: '📤', label: 'Media Manager' },
  ];

  return (
    <div className={`${fullscreen ? 'fixed inset-0 z-[999]' : 'flex flex-col'} bg-z-dark`}
      style={{ height: fullscreen ? '100vh' : 'auto' }}>

      {/* ── Header ── */}
      {!fullscreen && (
        <div className="p-4 md:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Award size={22} className="text-z-gold" />
                Certificate & Internship Portal
              </h1>
              <p className="text-sm text-z-muted mt-0.5">
                Full PDF generation · QR verification · Offer letters · Bulk issuance · Hardcopy orders
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setRefreshKey(k => k + 1)}
                className="p-2.5 rounded-xl border border-z-border text-z-muted hover:text-white hover:border-z-accent transition-all">
                <RefreshCw size={15} />
              </button>
              <a href="/certificate-portal.html" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-z-border text-z-muted text-sm hover:text-white hover:border-z-accent transition-all">
                <ExternalLink size={14} /> New Tab
              </a>
              <button onClick={() => setFullscreen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold hover:bg-blue-500 transition-all">
                <Maximize2 size={14} /> Fullscreen
              </button>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {PORTAL_FEATURES.map(f => (
              <span key={f.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border border-z-border text-z-muted bg-white/3">
                <span>{f.icon}</span> {f.label}
              </span>
            ))}
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-z-gold/8 border border-z-gold/20">
            <Info size={15} className="text-z-gold flex-shrink-0 mt-0.5" />
            <p className="text-xs text-z-muted leading-relaxed">
              <span className="text-z-gold font-semibold">Default login: </span>
              Email: <span className="font-mono text-white">contact.zentroxtech@gmail.com</span> ·
              Password: <span className="font-mono text-white">ZentroxAdmin@2025</span>
              &nbsp;— Change this after first login in portal Settings.
            </p>
          </div>
        </div>
      )}

      {/* ── Fullscreen exit ── */}
      {fullscreen && (
        <button
          onClick={() => setFullscreen(false)}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold hover:bg-black/80 transition-all"
        >
          <Minimize2 size={13} /> Exit (Esc)
        </button>
      )}

      {/* ── Loading state ── */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-z-dark2 z-10"
            style={{ top: fullscreen ? 0 : 200 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-z-accent/20 border-t-z-accent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-z-muted text-sm font-medium">Loading Certificate Portal...</p>
              <p className="text-z-muted text-xs mt-1">Powered by Zentrox Technologies</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── iFrame ── */}
      <div
        className={`relative ${fullscreen ? 'flex-1 w-full h-full' : 'mx-4 md:mx-6 mb-4 md:mb-6 rounded-2xl overflow-hidden border border-z-border'}`}
        style={{ height: fullscreen ? '100vh' : 'calc(100vh - 280px)', minHeight: 600 }}
      >
        <iframe
          key={refreshKey}
          ref={iframeRef}
          src="/certificate-portal.html"
          className="w-full h-full border-0"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
          onLoad={() => setLoaded(true)}
          title="Zentrox Technologies — Certificate & Internship Management Portal"
          allow="downloads"
        />
      </div>
    </div>
  );
}
