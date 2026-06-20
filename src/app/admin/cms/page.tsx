'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, X, Check, RefreshCw } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const CMS_FIELDS = [
  { key: 'hero_headline', label: 'Hero Headline', type: 'text', group: 'Homepage' },
  { key: 'hero_subtext', label: 'Hero Subtext', type: 'text', group: 'Homepage' },
  { key: 'stats_projects', label: 'Projects Count', type: 'number', group: 'Stats' },
  { key: 'stats_clients', label: 'Clients Count', type: 'number', group: 'Stats' },
  { key: 'stats_years', label: 'Years Experience', type: 'number', group: 'Stats' },
  { key: 'contact_phone', label: 'Contact Phone', type: 'text', group: 'Contact' },
  { key: 'contact_email', label: 'Contact Email', type: 'text', group: 'Contact' },
  { key: 'contact_address', label: 'Address', type: 'text', group: 'Contact' },
  { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'text', group: 'Contact' },
  { key: 'seo_tagline', label: 'SEO Tagline', type: 'text', group: 'SEO' },
  { key: 'announcement_banner', label: 'Announcement Banner Text', type: 'text', group: 'Banners' },
  { key: 'announcement_active', label: 'Show Announcement Banner', type: 'boolean', group: 'Banners' },
  { key: 'offer_text', label: 'Offer Section Text', type: 'text', group: 'Offers' },
  { key: 'offer_discount', label: 'Offer Discount %', type: 'number', group: 'Offers' },
];

export default function AdminCMSPage() {
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/cms/settings').then(({ data }) => {
      setValues(data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const settings = CMS_FIELDS.map(f => ({ key: f.key, value: values[f.key] ?? '', type: f.type, label: f.label, group: f.group }));
      await api.patch('/cms/settings', { settings });
      toast.success('Settings saved');
    } catch { toast.error('Save failed'); }
    setSaving(false);
  };

  const groups = [...new Set(CMS_FIELDS.map(f => f.group))];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">CMS / Content</h1>
          <p className="text-sm text-z-muted">Manage site content without code changes</p>
        </div>
        <button onClick={save} disabled={saving || loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          Save All Changes
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" /></div>
      ) : (
        groups.map(group => (
          <motion.div key={group} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
            <h2 className="text-sm font-bold text-white mb-4 pb-3 border-b border-z-border">{group}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CMS_FIELDS.filter(f => f.group === group).map(field => (
                <div key={field.key}>
                  <label className="text-xs text-z-muted uppercase tracking-widest mb-1.5 block">{field.label}</label>
                  {field.type === 'boolean' ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={!!values[field.key]} onChange={e => setValues(p => ({ ...p, [field.key]: e.target.checked }))}
                        className="accent-z-accent w-5 h-5 rounded" />
                      <span className="text-sm text-z-muted">{values[field.key] ? 'Enabled' : 'Disabled'}</span>
                    </label>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={values[field.key] ?? ''}
                      onChange={e => setValues(p => ({ ...p, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                      className="z-input text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
