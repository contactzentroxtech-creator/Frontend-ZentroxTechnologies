'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Loader2, Calculator, RefreshCw, ChevronDown, ChevronUp, Check } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface PricingService {
  _id?: string;
  id: string;
  label: { en: string; hi: string; pa: string };
  icon: string;
  baseMin: number;
  baseMax: number;
  isActive: boolean;
  order: number;
  complexityMultipliers: { basic: number; standard: number; advanced: number; enterprise: number };
  timelineDiscounts: { rush: number; normal: number; flexible: number };
  deliveryWeeks: { basic: string; standard: string; advanced: string; enterprise: string };
  features: { id: string; label: { en: string; hi: string; pa: string }; flatAdd: number; multiplier: number }[];
}

const EMPTY_SERVICE: Partial<PricingService> = {
  id: '', label: { en: '', hi: '', pa: '' }, icon: '🌐',
  baseMin: 10000, baseMax: 50000, isActive: true, order: 99,
  complexityMultipliers: { basic: 1.0, standard: 1.5, advanced: 2.5, enterprise: 4.0 },
  timelineDiscounts: { rush: 1.3, normal: 1.0, flexible: 0.9 },
  deliveryWeeks: { basic: '2-3 Weeks', standard: '4-6 Weeks', advanced: '6-10 Weeks', enterprise: '10-16 Weeks' },
  features: [],
};

function ServiceEditor({
  service, onSave, onClose, isNew,
}: {
  service: Partial<PricingService>;
  onSave: (s: Partial<PricingService>) => Promise<void>;
  onClose: () => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<Partial<PricingService>>({ ...service });
  const [saving, setSaving] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const set = (path: string, val: any) => {
    setForm(prev => {
      const n = { ...prev };
      const parts = path.split('.');
      let obj: any = n;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = val;
      return n;
    });
  };

  const addFeature = () => {
    setForm(prev => ({
      ...prev,
      features: [...(prev.features || []), { id: `feature-${Date.now()}`, label: { en: '', hi: '', pa: '' }, flatAdd: 5000, multiplier: 1.1 }],
    }));
  };

  const updateFeature = (idx: number, field: string, val: any) => {
    setForm(prev => {
      const features = [...(prev.features || [])];
      const parts = field.split('.');
      if (parts.length === 2) {
        features[idx] = { ...features[idx], [parts[0]]: { ...(features[idx] as any)[parts[0]], [parts[1]]: val } };
      } else {
        features[idx] = { ...features[idx], [field]: val };
      }
      return { ...prev, features };
    });
  };

  const removeFeature = (idx: number) => {
    setForm(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    if (!form.id || !form.label?.en) { toast.error('Service ID and English label required'); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card w-full max-w-2xl p-6 relative z-10 my-8">
        <div className="flex justify-between mb-5">
          <h2 className="text-lg font-bold text-white">{isNew ? 'Add Pricing Service' : 'Edit Pricing Service'}</h2>
          <button onClick={onClose}><X size={18} className="text-z-muted hover:text-white" /></button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Basic */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-z-muted mb-1 block">Service ID (slug)</label>
              <input value={form.id || ''} onChange={e => set('id', e.target.value)} disabled={!isNew}
                className="z-input text-sm font-mono disabled:opacity-50" placeholder="web-dev" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">Icon (emoji)</label>
              <input value={form.icon || ''} onChange={e => set('icon', e.target.value)} className="z-input text-sm" placeholder="🌐" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">Order</label>
              <input type="number" value={form.order || 0} onChange={e => set('order', Number(e.target.value))} className="z-input text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-z-muted mb-1 block">🇬🇧 Name (EN) *</label>
              <input value={form.label?.en || ''} onChange={e => set('label.en', e.target.value)} className="z-input text-sm" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">🇮🇳 Name (HI)</label>
              <input value={form.label?.hi || ''} onChange={e => set('label.hi', e.target.value)} className="z-input text-sm" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">🇮🇳 Name (PA)</label>
              <input value={form.label?.pa || ''} onChange={e => set('label.pa', e.target.value)} className="z-input text-sm" />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-z-muted mb-1 block">Base Price Min (₹)</label>
              <input type="number" value={form.baseMin || 0} onChange={e => set('baseMin', Number(e.target.value))} className="z-input text-sm" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">Base Price Max (₹)</label>
              <input type="number" value={form.baseMax || 0} onChange={e => set('baseMax', Number(e.target.value))} className="z-input text-sm" />
            </div>
          </div>

          {/* Complexity multipliers */}
          <div>
            <label className="text-xs text-z-muted mb-2 block">Complexity Multipliers</label>
            <div className="grid grid-cols-4 gap-2">
              {(['basic', 'standard', 'advanced', 'enterprise'] as const).map(k => (
                <div key={k}>
                  <div className="text-[10px] text-z-muted mb-1 capitalize">{k}</div>
                  <input type="number" step="0.1" value={form.complexityMultipliers?.[k] || 1}
                    onChange={e => set(`complexityMultipliers.${k}`, Number(e.target.value))}
                    className="z-input text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="text-xs text-z-muted mb-2 block">Timeline Multipliers (Rush/Normal/Flexible)</label>
            <div className="grid grid-cols-3 gap-2">
              {(['rush', 'normal', 'flexible'] as const).map(k => (
                <div key={k}>
                  <div className="text-[10px] text-z-muted mb-1 capitalize">{k}</div>
                  <input type="number" step="0.05" value={form.timelineDiscounts?.[k] || 1}
                    onChange={e => set(`timelineDiscounts.${k}`, Number(e.target.value))}
                    className="z-input text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Delivery weeks */}
          <div>
            <label className="text-xs text-z-muted mb-2 block">Delivery Weeks (per complexity)</label>
            <div className="grid grid-cols-4 gap-2">
              {(['basic', 'standard', 'advanced', 'enterprise'] as const).map(k => (
                <div key={k}>
                  <div className="text-[10px] text-z-muted mb-1 capitalize">{k}</div>
                  <input value={form.deliveryWeeks?.[k] || ''}
                    onChange={e => set(`deliveryWeeks.${k}`, e.target.value)}
                    className="z-input text-xs" placeholder="2-4 Weeks" />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-z-muted">Add-on Features</label>
              <button onClick={addFeature} className="flex items-center gap-1 text-xs text-z-accent hover:underline">
                <Plus size={11} /> Add Feature
              </button>
            </div>
            {(form.features || []).map((f, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-start p-3 rounded-xl bg-white/5 border border-z-border">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <input value={f.label.en} onChange={e => updateFeature(idx, 'label.en', e.target.value)} className="z-input text-xs" placeholder="Feature (EN)" />
                  <input value={f.label.hi} onChange={e => updateFeature(idx, 'label.hi', e.target.value)} className="z-input text-xs" placeholder="Feature (HI)" />
                  <input type="number" value={f.flatAdd} onChange={e => updateFeature(idx, 'flatAdd', Number(e.target.value))} className="z-input text-xs" placeholder="Add ₹" />
                  <input type="number" step="0.05" value={f.multiplier} onChange={e => updateFeature(idx, 'multiplier', Number(e.target.value))} className="z-input text-xs" placeholder="Mult" />
                </div>
                <button onClick={() => removeFeature(idx)} className="text-z-muted hover:text-red-400 p-1"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={!!form.isActive}
              onChange={e => set('isActive', e.target.checked)} className="accent-z-accent w-4 h-4" />
            <label htmlFor="isActive" className="text-sm text-z-muted cursor-pointer">Active (visible on site)</label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-z-border text-z-muted text-sm">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isNew ? 'Create Service' : 'Update Service'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPricingPage() {
  const [services, setServices] = useState<PricingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editing, setEditing] = useState<{ service: Partial<PricingService>; isNew: boolean } | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);
  const [testInput, setTestInput] = useState({ serviceId: '', complexity: 'standard', timeline: 'normal', budget: 25000 });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/pricing/services/admin');
      setServices(data.data);
    } catch { toast.error('Failed to load pricing services'); }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const seedDefaults = async () => {
    if (!confirm('This will reset all pricing to defaults. Continue?')) return;
    setSeeding(true);
    try {
      await api.post('/pricing/seed');
      await fetch();
      toast.success('Pricing seeded with defaults!');
    } catch { toast.error('Seed failed'); }
    setSeeding(false);
  };

  const saveService = async (form: Partial<PricingService>) => {
    try {
      if (editing?.isNew) {
        await api.post('/pricing/services', form);
        toast.success('Service created');
      } else {
        await api.patch(`/pricing/services/${form.id}`, form);
        toast.success('Service updated');
      }
      await fetch();
      setEditing(null);
    } catch (err: any) { toast.error(err.response?.data?.message || 'Save failed'); }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this pricing service?')) return;
    try {
      await api.delete(`/pricing/services/${id}`);
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
  };

  const testCalculator = async () => {
    if (!testInput.serviceId) { toast.error('Select a service'); return; }
    setTesting(true);
    try {
      const { data } = await api.post('/pricing/calculate', testInput);
      setTestResult(data.data);
    } catch { toast.error('Test failed'); }
    setTesting(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Calculator size={20} className="text-z-accent" /> Pricing Manager
          </h1>
          <p className="text-sm text-z-muted">{services.length} pricing services · Admin-controlled calculator logic</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={seedDefaults} disabled={seeding}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-z-border text-z-muted text-sm hover:text-white transition-colors disabled:opacity-50">
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Seed Defaults
          </button>
          <button onClick={() => setEditing({ service: EMPTY_SERVICE, isNew: true })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold">
            <Plus size={14} /> Add Service
          </button>
        </div>
      </div>

      {/* Calculator Test */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Calculator size={15} className="text-z-accent" /> Test Calculator Logic</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="text-xs text-z-muted mb-1 block">Service</label>
            <select value={testInput.serviceId} onChange={e => setTestInput(p => ({ ...p, serviceId: e.target.value }))} className="z-input text-sm">
              <option value="">Select...</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label.en}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Complexity</label>
            <select value={testInput.complexity} onChange={e => setTestInput(p => ({ ...p, complexity: e.target.value }))} className="z-input text-sm">
              {['basic', 'standard', 'advanced', 'enterprise'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Timeline</label>
            <select value={testInput.timeline} onChange={e => setTestInput(p => ({ ...p, timeline: e.target.value }))} className="z-input text-sm">
              {['rush', 'normal', 'flexible'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Budget (₹)</label>
            <input type="number" value={testInput.budget} onChange={e => setTestInput(p => ({ ...p, budget: Number(e.target.value) }))} className="z-input text-sm" />
          </div>
        </div>
        <button onClick={testCalculator} disabled={testing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50">
          {testing ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Test
        </button>
        {testResult && (
          <div className="mt-3 p-4 rounded-xl bg-z-accent3/10 border border-z-accent3/25">
            <div className="text-sm font-bold text-white">{testResult.service?.icon} {testResult.service?.label?.en}</div>
            <div className="text-xl font-extrabold text-z-accent3 mt-1">₹{testResult.estimate?.min?.toLocaleString('en-IN')} — ₹{testResult.estimate?.max?.toLocaleString('en-IN')}</div>
            <div className="text-xs text-z-muted mt-1">Delivery: {testResult.delivery} · {testResult.recommendedPackage?.name?.en}</div>
          </div>
        )}
      </div>

      {/* Services grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={28} className="animate-spin text-z-accent" /></div>
      ) : services.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <Calculator size={32} className="text-z-muted mx-auto mb-3" />
          <p className="text-z-muted text-sm mb-3">No pricing services. Seed defaults or add manually.</p>
          <button onClick={seedDefaults} className="px-5 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold">Seed Defaults</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className={`glass-card p-5 ${!s.isActive ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{s.label.en}</div>
                    <div className="font-mono text-[10px] text-z-muted">{s.id}</div>
                  </div>
                </div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${s.isActive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                  {s.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="text-xs text-z-accent font-semibold mb-2">
                ₹{s.baseMin?.toLocaleString('en-IN')} — ₹{s.baseMax?.toLocaleString('en-IN')}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {(s.features || []).slice(0, 3).map(f => (
                  <span key={f.id} className="text-[10px] px-2 py-0.5 rounded-full bg-z-accent/10 text-z-accent border border-z-accent/20">
                    {f.label.en} +₹{f.flatAdd?.toLocaleString('en-IN')}
                  </span>
                ))}
                {(s.features?.length || 0) > 3 && <span className="text-[10px] text-z-muted">+{s.features.length - 3} more</span>}
              </div>
              <div className="flex gap-2 pt-3 border-t border-z-border">
                <button onClick={() => setEditing({ service: s, isNew: false })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-z-border text-z-muted text-xs hover:text-white hover:border-z-accent transition-all">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => deleteService(s.id)}
                  className="p-2 rounded-xl border border-z-border text-z-muted hover:text-red-400 hover:border-red-500/30 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <ServiceEditor
            service={editing.service}
            isNew={editing.isNew}
            onSave={saveService}
            onClose={() => setEditing(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
