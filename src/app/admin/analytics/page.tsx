'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import api from '@/lib/api';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs shadow-card">
      <div className="text-z-muted mb-1">{label}</div>
      {payload.map((p: any) => <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>)}
    </div>
  );
};

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data: res } = await api.get(`/analytics/overview?days=${days}`);
        setData(res.data);
      } catch {}
      setLoading(false);
    };
    fetch();
  }, [days]);

  const chartData = (() => {
    if (!data) return [];
    const map: Record<string, any> = {};
    data.leadsPerDay?.forEach((d: any) => { map[d._id] = { ...(map[d._id] || {}), date: d._id.slice(5), leads: d.count }; });
    data.enrollmentsPerDay?.forEach((d: any) => { map[d._id] = { ...(map[d._id] || {}), date: d._id.slice(5), enrollments: d.count }; });
    data.appsPerDay?.forEach((d: any) => { map[d._id] = { ...(map[d._id] || {}), date: d._id.slice(5), applications: d.count }; });
    return Object.values(map).sort((a: any, b: any) => a.date > b.date ? 1 : -1);
  })();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Analytics</h1>
          <p className="text-sm text-z-muted">Platform performance overview</p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30, 60].map(d => (
            <button key={d} onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${days === d ? 'bg-z-accent text-white' : 'border border-z-border text-z-muted hover:text-white'}`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Leads & Enrollments Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
            <h2 className="text-sm font-bold text-white mb-4">Leads, Enrollments & Applications — Last {days} Days</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  {[['leadsGrad', '#3b7bff'], ['enrollGrad', '#06d6a0'], ['appsGrad', '#7c3aed']].map(([id, color]) => (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,123,255,0.06)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span style={{ color: '#8892b0', fontSize: 11 }}>{value}</span>} />
                <Area type="monotone" dataKey="leads" name="Leads" stroke="#3b7bff" strokeWidth={2} fill="url(#leadsGrad)" />
                <Area type="monotone" dataKey="enrollments" name="Enrollments" stroke="#06d6a0" strokeWidth={2} fill="url(#enrollGrad)" />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#7c3aed" strokeWidth={2} fill="url(#appsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h2 className="text-sm font-bold text-white mb-4">Daily Leads Volume</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,123,255,0.06)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" name="Leads" fill="#3b7bff" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="glass-card p-5">
            <p className="text-xs text-z-muted">
              For advanced analytics, integrate Google Analytics 4 or Mixpanel using your <code className="text-z-accent">NEXT_PUBLIC_GA_ID</code> environment variable.
              The backend also exposes <code className="text-z-accent">/api/analytics/overview</code> for custom dashboard charts.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
