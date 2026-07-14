"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Users,
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  Play,
} from "lucide-react";
import api from "@/lib/api";
import type { Course } from "@/types";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function CourseDetailClient({ slug }: { slug: string }) {
  const [course, setCourse] = useState<any | null>(null); // Adjusted to handle potential extra properties
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [showLiveSection, setShowLiveSection] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    api
      .get(`/courses/${slug}`)
      .then((r) => setCourse(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll.");
      return;
    }
    setEnrolling(true);
    try {
      await api.post(`/courses/${course?._id}/enroll`);
      setEnrolled(true);
      toast.success("Enrolled successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/5 rounded w-2/3" />
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-3/4" />
        </div>
      </div>
    );

  if (!course)
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Course not found</h2>
        <Link href="/courses" className="text-z-accent hover:underline">
          Browse all courses
        </Link>
      </div>
    );

  const price = course.discountPrice || course.price;

  return (
    <div className="relative z-10 px-4 md:px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-z-muted hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-z-accent px-2.5 py-1 rounded-full bg-z-accent/10 border border-z-accent/20">
                  {course.category?.replace("-", " ")}
                </span>
                <span className="text-xs text-z-muted capitalize">
                  {course.level}
                </span>
                {course.isLive && (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-400 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />{" "}
                    LIVE
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-z-muted leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-5 mb-8 pb-8 border-b border-z-border">
                <div className="flex items-center gap-2 text-sm text-z-muted">
                  <BookOpen size={15} className="text-z-accent" />{" "}
                  {course.totalLessons} Lessons
                </div>
                <div className="flex items-center gap-2 text-sm text-z-muted">
                  <Clock size={15} className="text-z-accent" />{" "}
                  {course.totalDuration
                    ? `${Math.floor(course.totalDuration / 60)}h ${
                        course.totalDuration % 60
                      }m`
                    : "Self-paced"}
                </div>
                <div className="flex items-center gap-2 text-sm text-z-muted">
                  <Users size={15} className="text-z-accent" />{" "}
                  {course.enrolledCount} Students
                </div>
                {course.certificate && (
                  <div className="flex items-center gap-2 text-sm text-z-muted">
                    <Award size={15} className="text-z-accent" /> Certificate
                  </div>
                )}
                <div className="text-sm text-z-muted">
                  Language: {course.language}
                </div>
              </div>

              {/* Instructor */}
              {course.instructorName && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white font-bold text-sm">
                    {course.instructorName[0]}
                  </div>
                  <div>
                    <div className="text-xs text-z-muted">Instructor</div>
                    <div className="text-sm font-semibold text-white">
                      {course.instructorName}
                    </div>
                  </div>
                </div>
              )}

              {/* What you'll learn */}
              {course.outcomes?.length > 0 && (
                <div className="glass-card p-6 mb-6">
                  <h2 className="font-bold text-white mb-4">
                    What You'll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.outcomes.map((o: string) => (
                      <div
                        key={o}
                        className="flex items-start gap-2 text-sm text-z-muted"
                      >
                        <Check
                          size={14}
                          className="text-z-accent3 flex-shrink-0 mt-0.5"
                        />{" "}
                        {o}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Curriculum */}
              <div className="mb-6">
                <h2 className="font-bold text-white mb-4">Course Curriculum</h2>
                <div className="flex flex-col gap-2">
                  {/* DYNAMICALLY PLACED RECORDED/LIVE SECTION */}
                  {course.isLive && (
                    <div className="glass-card overflow-hidden border border-red-500/20 bg-red-500/5">
                      <button
                        onClick={() => setShowLiveSection(!showLiveSection)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-xs font-bold text-red-400 animate-pulse">
                            <Zap size={12} />
                          </div>
                          <span className="text-sm font-bold text-white">
                            Recorded Saturday Streams & Archives
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">
                            Latest Uploads
                          </span>
                          {showLiveSection ? (
                            <ChevronUp size={14} className="text-z-muted" />
                          ) : (
                            <ChevronDown size={14} className="text-z-muted" />
                          )}
                        </div>
                      </button>

                      {showLiveSection && (
                        <div className="border-t border-z-border divide-y divide-z-border bg-black/20">
                          {/* Render the actual live video entry here */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors">
                            <div className="w-full sm:w-32 h-20 bg-neutral-900 rounded-lg flex items-center justify-center border border-white/5 overflow-hidden flex-shrink-0 relative group">
                              <div className="absolute inset-0 bg-z-accent/10 flex items-center justify-center opacity-100 group-hover:bg-z-accent/20 transition-all">
                                <Play
                                  size={20}
                                  className="text-z-accent fill-z-accent"
                                />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                                Stream Archive
                              </span>
                              <h4 className="text-sm font-semibold text-white truncate mt-0.5">
                                website development
                              </h4>
                              <p className="text-xs text-z-muted mt-1">
                                Uploaded on 14 Jun 2026 • Missed the latest
                                session? Stream here directly.
                              </p>
                            </div>
                            <div className="flex items-center gap-3 self-end sm:self-center">
                              <span className="text-xs text-z-muted">
                                1h 45m
                              </span>
                              <span className="text-[10px] font-semibold text-red-400 px-1.5 py-0.5 rounded-full bg-red-400/10 border border-red-400/20">
                                NEW
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Standard Static Course Modules */}
                  {course.modules && course.modules.length > 0 ? (
                    course.modules.map((mod: any, i: number) => (
                      <div key={mod._id} className="glass-card overflow-hidden">
                        <button
                          onClick={() =>
                            setOpenModule(openModule === i ? null : i)
                          }
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-z-accent/10 flex items-center justify-center text-xs font-bold text-z-accent">
                              {i + 1}
                            </div>
                            <span className="text-sm font-semibold text-white">
                              {mod.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-z-muted">
                              {mod.lessons?.length || 0} lessons
                            </span>
                            {openModule === i ? (
                              <ChevronUp size={14} className="text-z-muted" />
                            ) : (
                              <ChevronDown size={14} className="text-z-muted" />
                            )}
                          </div>
                        </button>
                        {openModule === i && (
                          <div className="border-t border-z-border divide-y divide-z-border">
                            {mod.lessons?.map((lesson: any, j: number) => (
                              <div
                                key={lesson._id}
                                className="flex items-center gap-3 px-4 py-3"
                              >
                                <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 text-[10px] text-z-muted">
                                  {j + 1}
                                </div>
                                <span className="text-sm text-z-muted flex-1">
                                  {lesson.title}
                                </span>
                                {lesson.duration && (
                                  <span className="text-xs text-z-muted">
                                    {lesson.duration}m
                                  </span>
                                )}
                                {lesson.isPreview && (
                                  <span className="text-[10px] font-semibold text-z-accent3 px-1.5 py-0.5 rounded-full bg-z-accent3/10 border border-z-accent3/20">
                                    Preview
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-z-muted border border-dashed border-z-border rounded-xl">
                      Standard syllabus entries loading or not populated yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Requirements */}
              {course.requirements?.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="font-bold text-white mb-3">Requirements</h2>
                  <ul className="flex flex-col gap-2">
                    {course.requirements.map((r: string) => (
                      <li
                        key={r}
                        className="flex items-start gap-2 text-sm text-z-muted"
                      >
                        <div className="w-1 h-1 rounded-full bg-z-accent mt-2 flex-shrink-0" />{" "}
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sticky sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <div className="glass-card p-6">
              {course.thumbnail && (
                <div className="rounded-xl overflow-hidden mb-5 h-40">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="mb-5">
                {course.isFree ? (
                  <div className="text-3xl font-extrabold text-z-accent3">
                    Free
                  </div>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <div className="text-3xl font-extrabold text-white">
                      ₹{price.toLocaleString("en-IN")}
                    </div>
                    {course.discountPrice &&
                      course.price > course.discountPrice && (
                        <div className="text-base text-z-muted line-through">
                          ₹{course.price.toLocaleString("en-IN")}
                        </div>
                      )}
                  </div>
                )}
                {course.discountPrice &&
                  course.price > course.discountPrice && (
                    <div className="text-xs text-z-accent3 mt-1 font-semibold">
                      {Math.round(
                        (1 - course.discountPrice / course.price) * 100
                      )}
                      % OFF — Limited time
                    </div>
                  )}
              </div>

              {enrolled ? (
                <Link
                  href="/dashboard/courses"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent3 text-z-dark font-bold text-sm mb-4"
                >
                  Go to Course <ArrowLeft size={15} className="rotate-180" />
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 shadow-glow-sm mb-4"
                >
                  {enrolling ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap size={15} />{" "}
                      {course.isFree ? "Enroll for Free" : "Enroll Now"}
                    </>
                  )}
                </button>
              )}

              <div className="flex flex-col gap-2.5 text-xs text-z-muted">
                {course.certificate && (
                  <div className="flex items-center gap-2">
                    <Award size={13} className="text-z-accent" /> Certificate of
                    completion
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-z-accent" /> Self-paced +
                  Live sessions
                </div>
                <div className="flex items-center gap-2">
                  <Users size={13} className="text-z-accent" />{" "}
                  {course.enrolledCount}+ students enrolled
                </div>
                {course.isLive && course.liveSchedule && (
                  <div className="flex items-center gap-2">
                    <Zap size={13} className="text-red-400" />{" "}
                    {course.liveSchedule}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
