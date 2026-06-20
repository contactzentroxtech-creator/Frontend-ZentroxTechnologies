'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Play, CheckCircle2, ArrowRight, Search } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Enrollment {
  _id: string;
  progress: number;
  completedLessons: string[];
  completedAt?: string;
  enrolledAt: string;
  lastAccessedAt?: string;
  course: {
    _id: string;
    title: string;
    thumbnail?: string;
    category: string;
    level: string;
    totalLessons: number;
    instructorName: string;
    slug: string;
  };
}

export default function DashboardCoursesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/users/dashboard').then(({ data }) => {
      setEnrollments(data.data.enrollments || []);
    }).catch(() => toast.error('Failed to load courses')).finally(() => setLoading(false));
  }, []);

  const filtered = enrollments.filter(e =>
    e.course?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">My Courses</h1>
          <p className="text-sm text-z-muted">{enrollments.length} courses enrolled</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-z-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="z-input pl-9 text-sm w-44" />
          </div>
          <Link href="/courses" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold">
            Browse More <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <BookOpen size={40} className="text-z-muted mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">No courses yet</h2>
          <p className="text-z-muted text-sm mb-6">Enroll in your first course to start learning.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-z-accent text-white text-sm font-semibold">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((enrollment, i) => (
            <motion.div key={enrollment._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
              {/* Thumbnail */}
              <div className="aspect-video bg-z-dark3 relative overflow-hidden">
                {enrollment.course?.thumbnail ? (
                  <img src={enrollment.course.thumbnail} alt={enrollment.course.title}
                    className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={32} className="text-z-muted" />
                  </div>
                )}
                {enrollment.progress >= 100 && (
                  <div className="absolute inset-0 bg-z-accent3/20 flex items-center justify-center">
                    <div className="bg-z-accent3 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> Completed
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div className="h-full bg-z-accent transition-all" style={{ width: `${enrollment.progress}%` }} />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-z-accent/10 text-z-accent">{enrollment.course?.category}</span>
                  <span className="text-xs text-z-muted capitalize">{enrollment.course?.level}</span>
                </div>
                <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">{enrollment.course?.title}</h3>
                <p className="text-xs text-z-muted mb-3">by {enrollment.course?.instructorName || 'Zentrox Technologies'}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-z-accent rounded-full" style={{ width: `${enrollment.progress}%` }} />
                    </div>
                    <span className="text-xs text-z-muted">{enrollment.progress}%</span>
                  </div>
                  <span className="text-xs text-z-muted">
                    {enrollment.completedLessons?.length || 0}/{enrollment.course?.totalLessons || 0} lessons
                  </span>
                </div>

                <Link href={`/courses/${enrollment.course?.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-z-accent text-z-accent text-sm font-semibold hover:bg-z-accent hover:text-white transition-all duration-200">
                  <Play size={13} />
                  {enrollment.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
