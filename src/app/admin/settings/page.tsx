'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Shield, ExternalLink, Loader2, Check } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface SettingField {
  key: string;
  label: string;
  type: 'text' | 'boolean' | 'textarea' | 'number';
  group: string;
  placeholder?: string;
  locked?: boolean;
}

const SETTING_GROUPS: { id: string; label: string; fields: SettingField[] }[] = [
  {
    id: 'general',
    label: 'General',
    fields: [
      { key: 'site_name', label: 'Site Name', type: 'text', group: 'General', locked: true },
      { key: 'site_url', label: 'Production URL', type: 'text', group: 'General', placeholder: 'https://zentroxtech.com' },
      { key: 'tagline', label: 'Tagline', type: 'text', group: 'General' },
      { key: 'contact_phone', label: 'Contact Phone', type: 'text', group: 'General', placeholder: '+91 89881 83513' },
      { key: 'contact_email', label: 'Contact Email', type: 'text', group: 'General', placeholder: 'contact.zentroxtech@gmail.com' },
      { key: 'whatsapp_number', label: 'WhatsApp Number (with country code)', type: 'text', group: 'General', placeholder: '918988183513' },
      { key: 'contact_address', label: 'Address', type: 'text', group: 'General', placeholder: 'Mohali & Chandigarh, Punjab, India' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    fields: [
      { key: 'meta_title', label: 'Default Meta Title', type: 'text', group: 'SEO' },
      { key: 'meta_desc', label: 'Default Meta Description', type: 'textarea', group: 'SEO' },
      { key: 'og_image', label: 'OG Image URL', type: 'text', group: 'SEO', placeholder: '/og-image.png' },
      { key: 'google_verification', label: 'Google Search Console Verification', type: 'text', group: 'SEO' },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    fields: [
      { key: 'show_floating_cta', label: 'Enable Floating CTA Bar', type: 'boolean', group: 'Features' },
      { key: 'show_whatsapp_btn', label: 'Enable WhatsApp Button', type: 'boolean', group: 'Features' },
      { key: 'maintenance_mode', label: 'Maintenance Mode', type: 'boolean', group: 'Features' },
      { key: 'show_announcement', label: 'Show Announcement Banner', type: 'boolean', group: 'Features' },
    ],
  },
  {
    id: 'banners',
    label: 'Banners & Offers',
    fields: [
      { key: 'announcement_banner', label: 'Announcement Banner Text', type: 'text', group: 'Banners' },
      { key: 'offer_text', label: 'Floating CTA Bar Text', type: 'text', group: 'Banners', placeholder: 'Free consultation — no commitment needed' },
      { key: 'offer_discount', label: 'Offer Discount %', type: 'number', group: 'Banners' },
    ],
  },
  {
    id: 'stats',
    label: 'Stats & Numbers',
    fields: [
      { key: 'stats_projects', label: 'Projects Delivered', type: 'number', group: 'Stats' },
      { key: 'stats_clients', label: 'Happy Clients', type: 'number', group: 'Stats' },
      { key: 'stats_years', label: 'Years Experience', type: 'number', group: 'Stats' },
      { key: 'stats_rating', label: 'Average Rating (e.g. 4.9★)', type: 'text', group: 'Stats' },
    ],
  },
  {
    id: 'social',
    label: 'Social Links',
    fields: [
      { key: 'social_instagram', label: 'Instagram URL', type: 'text', group: 'Social', placeholder: 'https://instagram.com/...' },
      { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text', group: 'Social', placeholder: 'https://linkedin.com/...' },
      { key: 'social_youtube', label: 'YouTube URL', type: 'text', group: 'Social', placeholder: 'https://youtube.com/...' },
      { key: 'social_twitter', label: 'Twitter/X URL', type: 'text', group: 'Social', placeholder: 'https://x.com/...' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    fields: [
      { key: 'razorpay_enabled', label: 'Enable Razorpay Payments', type: 'boolean', group: 'Integrations' },
      { key: 'email_notifications', label: 'Send Email Notifications', type: 'boolean', group: 'Integrations' },
      { key: 'auto_reply_leads', label: 'Auto-reply Lead Emails', type: 'boolean', group: 'Integrations' },
    ],
  },
];

// Default fallback values
const DEFAULTS: Record<string, any> = {
  site_name: 'Zentrox Technologies',
  site_url: 'https://zentroxtech.com',
  contact_phone: '+91 89881 83513',
  contact_email: 'contact.zentroxtech@gmail.com',
  whatsapp_number: '918988183513',
  show_floating_cta: true,
  show_whatsapp_btn: true,
  maintenance_mode: false,
  show_announcement: false,
  stats_projects: 200,
  stats_clients: 150,
  stats_years: 5,
  stats_rating: '4.9★',
  razorpay_enabled: true,
  email_notifications: true,
  auto_reply_leads: true,
};

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, any>>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/cms/settings');
        setValues({ ...DEFAULTS, ...data.data });
      } catch { /* use defaults */ }
      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const allFields = SETTING_GROUPS.flatMap(g => g.fields);
      const settings = allFields.map(f => ({
        key: f.key,
        value: values[f.key] ?? DEFAULTS[f.key] ?? '',
        type: f.type,
        label: f.label,
        group: f.label.includes('Stats') ? 'Stats' : f.group,
      }));
      await api.patch('/cms/settings', { settings });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      toast.success('Settings saved successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
    setSaving(false);
  };

  const setValue = (key: string, val: any) => setValues(prev => ({ ...prev, [key]: val }));

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-z-accent" />
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Settings</h1>
          <p className="text-sm text-z-muted">Platform configuration — all changes persist to database</p>
        </div>
        <button onClick={save} disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50 transition-all ${saved ? 'bg-z-accent3' : 'bg-z-accent hover:bg-blue-500'}`}>
          {saving ? <RefreshCw size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {SETTING_GROUPS.map(group => (
        <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5">
          <h2 className="text-sm font-bold text-white mb-4 pb-3 border-b border-z-border">{group.label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map(field => (
              <div key={field.key}>
                <label className="text-xs text-z-muted uppercase tracking-widest mb-1.5 flex items-center gap-2 block">
                  {field.label}
                  {field.locked && <span className="text-[10px] px-1.5 py-0.5 rounded bg-z-gold/15 text-z-gold">Locked</span>}
                </label>
                {field.type === 'boolean' ? (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => !field.locked && setValue(field.key, !values[field.key])}
                      className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer ${values[field.key] ? 'bg-z-accent' : 'bg-white/10'} ${field.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${values[field.key] ? 'left-6' : 'left-1'}`} />
                    </div>
                    <span className="text-sm text-z-muted">{values[field.key] ? 'Enabled' : 'Disabled'}</span>
                  </label>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={values[field.key] || ''}
                    rows={3}
                    placeholder={field.placeholder}
                    onChange={e => !field.locked && setValue(field.key, e.target.value)}
                    disabled={field.locked}
                    className="z-input resize-none text-sm disabled:opacity-50"
                  />
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={values[field.key] ?? ''}
                    placeholder={field.placeholder}
                    onChange={e => !field.locked && setValue(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    disabled={field.locked}
                    className="z-input text-sm disabled:opacity-50"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Env vars notice */}
      <div className="glass-card p-5 border-z-gold/20">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-z-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white mb-1">Sensitive Keys — Environment Variables Only</p>
            <p className="text-xs text-z-muted leading-relaxed mb-3">
              These must be set in Railway (backend) and Vercel (frontend) env vars — never in this settings panel:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs font-mono">
              {['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET', 'GMAIL_APP_PASSWORD',
                'CLOUDINARY_API_SECRET', 'RAZORPAY_KEY_SECRET', 'NEXT_PUBLIC_API_URL'].map(k => (
                <div key={k} className="px-3 py-1.5 rounded-lg bg-z-dark border border-z-border text-z-accent">{k}</div>
              ))}
            </div>
            <a href="https://docs.railway.app/guides/variables" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-z-accent hover:underline mt-3">
              <ExternalLink size={12} /> Railway Environment Variables Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
