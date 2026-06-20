'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Search, Award, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VerifyIndexClient() {
  const [certId, setCertId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    const trimmed = certId.trim();
    if (!trimmed) { setError('Please enter a certificate ID'); return; }
    if (!trimmed.startsWith('ZT-')) { setError('Certificate IDs begin with "ZT-". Example: ZT-ABC123-DEF456'); return; }
    router.push(`/verify/${trimmed}`);
  };

  return (
    <section className="relative z-10 py-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-z-accent/15 border border-z-accent/30 flex items-center justify-center mx-auto mb-5">
            <Shield size={30} className="text-z-accent" />
          </div>
          <div className="z-badge mx-auto mb-4">Certificate Verification</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Verify Your Certificate
          </h1>
          <p className="text-z-muted text-base leading-relaxed">
            Instantly verify the authenticity of any certificate issued by Zentrox Technologies.
            Enter your unique certificate ID below.
          </p>
        </motion.div>

        {/* Verify Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 mb-6">
          <label className="text-xs font-semibold text-z-muted uppercase tracking-widest mb-2 block">
            Certificate ID
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={certId}
              onChange={e => { setCertId(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleVerify()}
              placeholder="ZT-ABC123-DEF456"
              className="z-input flex-1 font-mono text-sm"
              autoFocus
            />
            <button onClick={handleVerify}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-200 shadow-glow-sm whitespace-nowrap">
              <Search size={15} /> Verify
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          <p className="text-xs text-z-muted mt-3">
            The certificate ID is printed on your certificate and was emailed to you upon issuance.
          </p>
        </motion.div>

        {/* Certificate types */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 mb-6">
          <h2 className="text-sm font-bold text-white mb-4">Certificates We Issue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: Award, color: '#3b7bff', title: 'Course Completion', desc: 'Issued after completing any Zentrox Technologies course' },
              { icon: Award, color: '#7c3aed', title: 'Internship Certificate', desc: 'Issued upon successful internship completion' },
              { icon: Award, color: '#f59e0b', title: 'Offer Letter', desc: 'Issued on internship acceptance' },
              { icon: Award, color: '#06d6a0', title: 'Recommendation Letter', desc: 'Issued based on internship performance' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-z-border">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <div className="text-xs text-z-muted mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-start gap-3 p-4 glass-card">
          <CheckCircle2 size={16} className="text-z-accent3 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-z-muted leading-relaxed">
            All Zentrox Technologies certificates are digitally secured with unique IDs and QR codes.
            Each certificate links to a verification page that confirms authenticity.
            If you receive a certificate that cannot be verified, contact us at{' '}
            <a href="mailto:contact.zentroxtech@gmail.com" className="text-z-accent hover:underline">
              contact.zentroxtech@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
