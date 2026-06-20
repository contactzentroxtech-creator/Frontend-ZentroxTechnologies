'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Save, RefreshCw, Plus, Trash2, ChevronDown, ChevronUp, Loader2, Database, Globe } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Translation {
  _id: string;
  key: string;
  group: string;
  en: string;
  hi: string;
  pa: string;
}

const GROUPS = ['All', 'Hero', 'Navbar', 'Services', 'Classes', 'CTA', 'Contact', 'Pricing', 'Footer', 'Common'];

const LANG_CONFIG = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
];

export default function AdminTranslationsPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [filtered, setFiltered] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'pa'>('en');
  const [changed, setChanged] = useState<Record<string, Partial<Translation>>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Hero', 'Navbar']));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState({ key: '', group: 'General', en: '', hi: '', pa: '' });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/translations');
      setTranslations(data.data);
      setFiltered(data.data);
    } catch { toast.error('Failed to load translations'); }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  useEffect(() => {
    let result = [...translations];
    if (activeGroup !== 'All') result = result.filter(t => t.group === activeGroup);
    if (search) result = result.filter(t =>
      t.key.toLowerCase().includes(search.toLowerCase()) ||
      t.en?.toLowerCase().includes(search.toLowerCase()) ||
      t.hi?.includes(search) || t.pa?.includes(search)
    );
    setFiltered(result);
  }, [search, activeGroup, translations]);

  const updateLocal = (id: string, field: 'en' | 'hi' | 'pa', value: string) => {
    setTranslations(prev => prev.map(t => t._id === id ? { ...t, [field]: value } : t));
    setChanged(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: value } }));
  };

  const saveAll = async () => {
    if (!Object.keys(changed).length) return toast('No changes to save.');
    setSaving(true);
    try {
      const toSave = Object.keys(changed).map(id => {
        const t = translations.find(x => x._id === id);
        return t ? { key: t.key, en: t.en, hi: t.hi, pa: t.pa } : null;
      }).filter(Boolean);
      await api.patch('/translations', { translations: toSave });
      setChanged({});
      toast.success(`${toSave.length} translations saved!`);
    } catch { toast.error('Save failed'); }
    setSaving(false);
  };

  const saveSingle = async (t: Translation) => {
    try {
      await api.patch(`/translations/${t._id}`, { en: t.en, hi: t.hi, pa: t.pa });
      setChanged(prev => { const n = { ...prev }; delete n[t._id]; return n; });
      toast.success('Translation saved');
    } catch { toast.error('Save failed'); }
  };

  const seedDefaults = async () => {
    setSeeding(true);
    try {
      await api.post('/translations/seed');
      await fetch();
      toast.success('Default translations seeded!');
    } catch { toast.error('Seed failed'); }
    setSeeding(false);
  };

  const addNewKey = async () => {
    if (!newKey.key || !newKey.en) { toast.error('Key and English text required'); return; }
    try {
      await api.post('/translations', newKey);
      await fetch();
      setShowAddModal(false);
      setNewKey({ key: '', group: 'General', en: '', hi: '', pa: '' });
      toast.success('Translation key added');
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed to add key'); }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Delete this translation key?')) return;
    try {
      await api.delete(`/translations/${id}`);
      setTranslations(prev => prev.filter(t => t._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
  };

  const toggleGroup = (g: string) => {
    setExpandedGroups(prev => {
      const n = new Set(prev);
      n.has(g) ? n.delete(g) : n.add(g);
      return n;
    });
  };

  // Group filtered results
  const grouped = filtered.reduce<Record<string, Translation[]>>((acc, t) => {
    const g = t.group || 'General';
    if (!acc[g]) acc[g] = [];
    acc[g].push(t);
    return acc;
  }, {});

  const changedCount = Object.keys(changed).length;

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Globe size={20} className="text-z-accent" /> Translation Manager
          </h1>
          <p className="text-sm text-z-muted mt-0.5">{translations.length} keys · {changedCount > 0 && <span className="text-z-gold">{changedCount} unsaved changes</span>}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={seedDefaults} disabled={seeding}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-z-border text-z-muted text-sm hover:text-white transition-colors disabled:opacity-50">
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
            Seed Defaults
          </button>
          <button onClick={fetch} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-z-border text-z-muted hover:text-white transition-colors">
            <RefreshCw size={14} />
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-z-accent text-z-accent text-sm hover:bg-z-accent hover:text-white transition-all">
            <Plus size={14} /> Add Key
          </button>
          <button onClick={saveAll} disabled={saving || changedCount === 0}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-40 transition-all">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save All {changedCount > 0 && `(${changedCount})`}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-z-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search keys or text..." className="z-input pl-9 text-sm w-full" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {GROUPS.map(g => (
            <button key={g} onClick={() => setActiveGroup(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeGroup === g ? 'bg-z-accent text-white' : 'border border-z-border text-z-muted hover:text-white'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2">
        {LANG_CONFIG.map(l => (
          <button key={l.code} onClick={() => setActiveLang(l.code as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeLang === l.code ? 'bg-z-accent text-white shadow-glow-sm' : 'border border-z-border text-z-muted hover:text-white'}`}>
            <span>{l.flag}</span> {l.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-z-accent" /></div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="glass-card overflow-hidden">
              <button onClick={() => toggleGroup(group)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{group}</span>
                  <span className="text-xs text-z-muted px-2 py-0.5 rounded-full bg-white/5">{items.length} keys</span>
                  {items.some(i => changed[i._id]) && (
                    <span className="text-xs text-z-gold px-2 py-0.5 rounded-full bg-z-gold/10">unsaved</span>
                  )}
                </div>
                {expandedGroups.has(group) ? <ChevronUp size={15} className="text-z-muted" /> : <ChevronDown size={15} className="text-z-muted" />}
              </button>

              {expandedGroups.has(group) && (
                <div className="border-t border-z-border">
                  {items.map((t, i) => (
                    <div key={t._id} className={`flex gap-3 items-start px-5 py-3 ${i < items.length - 1 ? 'border-b border-z-border/50' : ''} ${changed[t._id] ? 'bg-z-gold/3' : ''}`}>
                      <div className="min-w-[180px] max-w-[220px] flex-shrink-0">
                        <div className="font-mono text-xs text-z-accent truncate">{t.key}</div>
                        {changed[t._id] && <div className="text-[10px] text-z-gold mt-0.5">unsaved</div>}
                      </div>
                      <div className="flex-1">
                        <textarea
                          rows={t[activeLang]?.length > 80 ? 2 : 1}
                          value={t[activeLang] || ''}
                          onChange={e => updateLocal(t._id, activeLang, e.target.value)}
                          placeholder={`${LANG_CONFIG.find(l => l.code === activeLang)?.label} translation...`}
                          className="z-input resize-none text-sm w-full leading-relaxed"
                        />
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {changed[t._id] && (
                          <button onClick={() => saveSingle(t)} className="p-1.5 rounded-lg bg-z-accent/15 text-z-accent hover:bg-z-accent hover:text-white transition-all">
                            <Save size={13} />
                          </button>
                        )}
                        <button onClick={() => deleteKey(t._id)} className="p-1.5 rounded-lg text-z-muted hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {Object.keys(grouped).length === 0 && (
            <div className="glass-card p-10 text-center">
              <Globe size={32} className="text-z-muted mx-auto mb-3" />
              <p className="text-z-muted text-sm mb-3">No translations found.</p>
              <button onClick={seedDefaults} className="px-5 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold">
                Seed Default Translations
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Key Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg p-6 relative z-10">
            <h2 className="text-lg font-bold text-white mb-4">Add New Translation Key</h2>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-z-muted mb-1 block">Key (e.g. hero.title)</label>
                  <input value={newKey.key} onChange={e => setNewKey(p => ({ ...p, key: e.target.value }))} className="z-input text-sm font-mono" placeholder="section.key" />
                </div>
                <div>
                  <label className="text-xs text-z-muted mb-1 block">Group</label>
                  <select value={newKey.group} onChange={e => setNewKey(p => ({ ...p, group: e.target.value }))} className="z-input text-sm">
                    {GROUPS.filter(g => g !== 'All').map(g => <option key={g} value={g}>{g}</option>)}
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-z-muted mb-1 block">🇬🇧 English *</label>
                <input value={newKey.en} onChange={e => setNewKey(p => ({ ...p, en: e.target.value }))} className="z-input text-sm" />
              </div>
              <div>
                <label className="text-xs text-z-muted mb-1 block">🇮🇳 Hindi (हिंदी)</label>
                <input value={newKey.hi} onChange={e => setNewKey(p => ({ ...p, hi: e.target.value }))} className="z-input text-sm" />
              </div>
              <div>
                <label className="text-xs text-z-muted mb-1 block">🇮🇳 Punjabi (ਪੰਜਾਬੀ)</label>
                <input value={newKey.pa} onChange={e => setNewKey(p => ({ ...p, pa: e.target.value }))} className="z-input text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border border-z-border text-z-muted text-sm">Cancel</button>
              <button onClick={addNewKey} className="flex-1 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold">Add Key</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
