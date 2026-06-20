'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, MessageSquare, BookOpen, Briefcase, Award, TrendingUp,
  ArrowUpRight, Clock, CheckCircle, AlertCircle, XCircle, Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '@/lib/api';

interface DashboardData {
  stats: {
    totalUsers: number; totalLeads: number; totalCourses: number;
    totalEnrollments: number; totalApplications: number;
    totalCertificates: number; totalBlogPosts: number; newLeadsToday: number;
  };
  leadsByStatus: { _id: string; count: number }[];
  applicationsByStatus: { _id: string; count: number }[];
  recentLeads: any[];
  recentUsers: any[];
}

const STAT_CARDS = [
  { key: 'totalLeads', label: 'Total Leads', icon: MessageSquare, color: '#3b7bff', href: '/admin/leads', suffix: '' },
  { key: 'newLeadsToday', label: 'Leads Today', icon: TrendingUp, color: '#06d6a0', href: '/admin/leads', suffix: '' },
  { key: 'totalUsers', label: 'Students', icon: Users, color: '#7c3aed', href: '/admin/users', suffix: '' },
  { key: 'totalEnrollments', label: 'Enrollments', icon: BookOpen, color: '#f59e0b', href: '/admin/courses', suffix: '' },
  { key: 'totalApplications', label: 'Applications', icon: Briefcase, color: '#ec4899', href: '/admin/internship', suffix: '' },
  { key: 'totalCertificates', label: 'Certificates', icon: Award, color: '#06d6a0', href: '/admin/certificates', suffix: '' },
];

const LEAD_STATUS_COLORS: Record<string, string> = {
  new: '#3b7bff', contacted: '#7c3aed', qualified: '#06d6a0',
  proposal: '#f59e0b', won: '#22c55e', lost: '#ef4444',
};

const APP_STATUS_COLORS: Record<string, string> = {
  pending: '#8892b0', 'test-pending': '#3b7bff', 'test-passed': '#06d6a0',
  'test-failed': '#ef4444', accepted: '#7c3aed', active: '#22c55e',
  completed: '#06d6a0', rejected: '#ef4444',
};

function StatCard({ label, value, icon: Icon, color, href }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-5 hover:-translate-y-0.5 transition-transform duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <Link href={href} className="text-z-muted hover:text-white transition-colors">
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="text-3xl font-extrabold text-white">{value?.toLocaleString()}</div>
      <div className="text-xs text-z-muted mt-1">{label}</div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <div className="text-z-muted mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, analyticsRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/analytics/overview?days=14'),
        ]);
        setData(dashRes.data.data);
        setAnalyticsData(analyticsRes.data.data);
      } catch (err) {
        console.error('Dashboard fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
      </div>
    );
  }

  // Merge leads + enrollments chart
  const chartData = (() => {
    const map: Record<string, any> = {};
    analyticsData?.leadsPerDay?.forEach((d: any) => { map[d._id] = { ...map[d._id], date: d._id, leads: d.count }; });
    analyticsData?.enrollmentsPerDay?.forEach((d: any) => { map[d._id] = { ...map[d._id], date: d._id, enrollments: d.count }; });
    analyticsData?.appsPerDay?.forEach((d: any) => { map[d._id] = { ...map[d._id], date: d._id, applications: d.count }; });
    return Object.values(map).sort((a: any, b: any) => a.date > b.date ? 1 : -1)
      .map((d: any) => ({ ...d, date: d.date?.slice(5) }));
  })();

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white">Dashboard Overview</h1>
        <p className="text-sm text-z-muted mt-1">Zentrox Technologies — Admin Control Center</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.key} label={card.label} value={data?.stats?.[card.key as keyof typeof data.stats] ?? 0}
            icon={card.icon} color={card.color} href={card.href} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leads + Enrollments chart */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-bold text-white mb-4">Leads & Enrollments — Last 14 Days</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b7bff" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b7bff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06d6a0" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06d6a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,123,255,0.06)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="leads" name="Leads" stroke="#3b7bff" strokeWidth={2} fill="url(#leadsGrad)" />
              <Area type="monotone" dataKey="enrollments" name="Enrollments" stroke="#06d6a0" strokeWidth={2} fill="url(#enrollGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead status + App status */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h2 className="text-sm font-bold text-white mb-3">Lead Pipeline</h2>
            <div className="flex flex-wrap gap-2">
              {data?.leadsByStatus?.map(({ _id, count }) => (
                <div key={_id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: `${LEAD_STATUS_COLORS[_id] || '#8892b0'}18`, color: LEAD_STATUS_COLORS[_id] || '#8892b0', border: `1px solid ${LEAD_STATUS_COLORS[_id] || '#8892b0'}30` }}>
                  {_id.charAt(0).toUpperCase() + _id.slice(1)}: {count}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <h2 className="text-sm font-bold text-white mb-3">Internship Applications</h2>
            <div className="flex flex-wrap gap-2">
              {data?.applicationsByStatus?.map(({ _id, count }) => (
                <div key={_id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: `${APP_STATUS_COLORS[_id] || '#8892b0'}18`, color: APP_STATUS_COLORS[_id] || '#8892b0', border: `1px solid ${APP_STATUS_COLORS[_id] || '#8892b0'}30` }}>
                  {_id}: {count}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent data tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Leads */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-z-accent hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-2">
            {data?.recentLeads?.length === 0 && <p className="text-xs text-z-muted">No leads yet.</p>}
            {data?.recentLeads?.map((lead: any) => (
              <div key={lead._id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-z-border">
                <div className="w-8 h-8 rounded-full bg-z-accent/15 flex items-center justify-center text-z-accent text-xs font-bold flex-shrink-0">
                  {lead.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{lead.name}</div>
                  <div className="text-xs text-z-muted">{lead.service || 'General Inquiry'}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${LEAD_STATUS_COLORS[lead.status] || '#8892b0'}18`, color: LEAD_STATUS_COLORS[lead.status] || '#8892b0' }}>
                    {lead.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Signups</h2>
            <Link href="/admin/users" className="text-xs text-z-accent hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-2">
            {data?.recentUsers?.length === 0 && <p className="text-xs text-z-muted">No users yet.</p>}
            {data?.recentUsers?.map((user: any) => (
              <div key={user._id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-z-border">
                <div className="w-8 h-8 rounded-full bg-z-accent2/15 flex items-center justify-center text-z-accent2 text-xs font-bold flex-shrink-0">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{user.name}</div>
                  <div className="text-xs text-z-muted truncate">{user.email}</div>
                </div>
                <div className="text-xs text-z-muted">
                  {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Add Course', href: '/admin/courses', color: '#3b7bff' },
          { label: 'Write Blog', href: '/admin/blog', color: '#7c3aed' },
          { label: 'Manage Popups', href: '/admin/popups', color: '#06d6a0' },
          { label: 'Site Settings', href: '/admin/settings', color: '#f59e0b' },
        ].map(({ label, href, color }) => (
          <Link key={href} href={href}
            className="glass-card p-4 flex items-center justify-between hover:-translate-y-0.5 transition-transform duration-200"
            style={{ borderColor: `${color}25` }}>
            <span className="text-sm font-medium text-white">{label}</span>
            <ArrowUpRight size={14} style={{ color }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
