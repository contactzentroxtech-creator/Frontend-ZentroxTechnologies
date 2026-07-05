"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Clock,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Zap,
  Star,
  Play,
  ChevronDown,
  ChevronUp,
  Video,
  User,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
} from "lucide-react";
import api from "@/lib/api";
import type { Course } from "@/types";
import { useDebounce } from "@/hooks";

const CATEGORIES = [
  { value: "", label: "All Courses" },
  { value: "web-dev", label: "Web Dev" },
  { value: "fullstack", label: "Full Stack" },
  { value: "ai-ml", label: "AI & ML" },
  { value: "mobile", label: "Mobile" },
  { value: "seo", label: "SEO" },
  { value: "design", label: "Design" },
];

interface YouTubeLecture {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface LiveSaturdayClass {
  _id: string;
  title: string;
  topic: string;
  description: string;
  dateString: string;
  fullDate: string;
  timeString: string;
  platform: "YouTube" | "Zoom";
  link: string;
  status: "LIVE" | "SOON";
  syllabus: string[];
}

// Helper to precisely track the target Unix Epoch for the upcoming Saturday 10:00 AM IST
const getNextSaturdayTarget = () => {
  const now = new Date();

  // Create an explicit timestamp instance context bound strictly to Indian Standard Time (UTC +5:30)
  const target = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const currentDay = target.getDay(); // 0 = Sunday, 6 = Saturday
  const currentHour = target.getHours();

  let daysToAdd = (6 - currentDay + 7) % 7;

  // If today is Saturday but the clock is past 10:00 AM, advance straight to next week's masterclass
  if (daysToAdd === 0 && currentHour >= 10) {
    daysToAdd = 7;
  }

  target.setDate(target.getDate() + daysToAdd);
  target.setHours(10, 0, 0, 0);

  // Normalize back to standard system runtime offset steps
  const localTargetEpoch = target.getTime();
  const tzOffsetDiff =
    new Date().getTime() -
    new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    ).getTime();

  return localTargetEpoch + tzOffsetDiff;
};

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden hover:-translate-y-1 transition-all duration-300 group flex flex-col"
    >
      {/* <div className="relative h-44 bg-gradient-to-br from-z-dark3 to-z-dark2 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={40} className="text-z-accent/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-z-dark/60 to-transparent" />
        {course.isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{" "}
            LIVE
          </div>
        )}
        {course.isFree && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-z-accent3/90 text-white text-[10px] font-bold">
            FREE
          </div>
        )}
        {course.isFeatured && !course.isLive && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-z-accent/90 text-white text-[10px] font-bold flex items-center gap-1">
            <Star size={9} fill="white" /> Featured
          </div>
        )}
      </div> */}

      {/* <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-z-accent px-2 py-0.5 rounded-full bg-z-accent/10 border border-z-accent/20">
            {course.category?.replace("-", " ")}
          </span>
          <span className="text-[10px] text-z-muted capitalize">
            {course.level}
          </span>
        </div>
        <h3 className="font-bold text-white mb-2 leading-snug line-clamp-2 flex-1">
          {course.title}
        </h3>
        <p className="text-xs text-z-muted leading-relaxed mb-4 line-clamp-2">
          {course.shortDesc || course.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-z-muted mb-4">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} /> {course.enrolledCount}
          </span>
          {course.certificate && (
            <span className="flex items-center gap-1">
              <Award size={11} /> Certificate
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {course.isFree ? (
              <span className="text-lg font-extrabold text-z-accent3">
                Free
              </span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-white">
                  ₹
                  {(course.discountPrice || course.price).toLocaleString(
                    "en-IN"
                  )}
                </span>
                {course.discountPrice &&
                  course.price > course.discountPrice && (
                    <span className="text-xs text-z-muted line-through">
                      ₹{course.price.toLocaleString("en-IN")}
                    </span>
                  )}
              </div>
            )}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-z-accent hover:gap-2.5 transition-all duration-200"
          >
            Enroll <ArrowRight size={13} />
          </Link>
        </div>
      </div> */}
    </motion.div>
  );
}

export default function CoursesClient() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const debouncedSearch = useDebounce(search, 350);

  // YouTube States
  const [ytLectures, setYtLectures] = useState<YouTubeLecture[]>([]);
  const [ytLoading, setYtLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Live Class States
  const [liveClasses, setLiveClasses] = useState<LiveSaturdayClass[]>([]);
  const [selectedLiveClass, setSelectedLiveClass] =
    useState<LiveSaturdayClass | null>(null);
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(
    null
  );

  // Mounted flag to protect code execution from NextJS server-hydration gaps
  const [mounted, setMounted] = useState(false);

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  // Booking Form States
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch Live Saturday Classes
  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const { data } = await api.get("/live-classes");
        if (data && data.length > 0) {
          setLiveClasses(data);
          const activeItem =
            data.find((c: LiveSaturdayClass) => c.status === "LIVE") || data[0];
          setSelectedLiveClass(activeItem);
        }
      } catch (err) {
        console.error("Saturday tracks parsing exception:", err);
      }
    };
    fetchLiveClasses();
  }, []);

  // Sync Countdown Clock Timer Elements
  useEffect(() => {
    setMounted(true);
    const targetTime = getNextSaturdayTarget();

    const syncTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setCountdown({ days: "00", hours: "00", mins: "00", secs: "00" });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        mins: m.toString().padStart(2, "0"),
        secs: s.toString().padStart(2, "0"),
      });
    };

    syncTimer();
    const intervalId = setInterval(syncTimer, 1000);

    return () => clearInterval(intervalId);
  }, [selectedLiveClass]);

  // Fetch Course Catalog Database Records
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (category) params.set("category", category);
        if (level) params.set("level", level);
        if (freeOnly) params.set("isFree", "true");
        const { data } = await api.get(`/courses?${params}`);
        setCourses(data.data || []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [debouncedSearch, category, level, freeOnly]);

  // Direct Backend API Entry submission
  const handleSeatBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSubmitting(true);

    try {
      await api.post("/saturday-class/enroll", {
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email || undefined,
        classId: selectedLiveClass?._id || "default",
        classTitle:
          selectedLiveClass?.title || "React Fundamentals + Hooks Deep Dive",
      });

      setFormSuccess(true);
      setFormData({ name: "", whatsapp: "", email: "" });
    } catch (err: any) {
      console.error("Booking handler network exception:", err);
      setFormError(
        err.response?.data?.message ||
          "Something went wrong. Please check your data."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="z-badge mx-auto mb-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />{" "}
            Every Saturday 10:00 AM IST
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Live Saturday Classes — Every Week
          </h1>
          <p className="text-z-muted text-base max-w-xl mx-auto leading-relaxed mb-8 text-gray-400">
            Master modern web development with weekly live sessions.
            Interactive, practical, and industry-focused.
          </p>
          {/* Search Input element row */}
          <div className="max-w-lg mx-auto relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-900 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </motion.div>
      </section>

      {/* Live Classes Module */}
      <section className="mb-16">
        <div className="space-y-6">
          {/* Main Selected Live Class Info Box Row */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 backdrop-blur-sm">
            {/* LEFT SIDE: Topic Text Descriptions and Countdown matrix elements */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:space-y-0">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold tracking-wider uppercase mb-4">
                  NEXT LIVE SESSION
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {selectedLiveClass
                    ? selectedLiveClass.title
                    : "React Fundamentals + Hooks Deep Dive"}
                </h2>
                <p className="text-xs md:text-sm text-gray-400 mb-6">
                  Topic Focus:{" "}
                  {selectedLiveClass
                    ? selectedLiveClass.topic
                    : "Core Architecture Components"}
                </p>
              </div>

              {/* Static digital metrics matrix */}
              <div className="grid grid-cols-4 gap-3 text-center max-w-md">
                {[
                  { label: "DAYS", val: mounted ? countdown.days : "00" },
                  { label: "HOURS", val: mounted ? countdown.hours : "00" },
                  { label: "MINS", val: mounted ? countdown.mins : "00" },
                  { label: "SECS", val: mounted ? countdown.secs : "00" },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-white/5 p-3 rounded-xl"
                  >
                    <div className="text-2xl md:text-3xl font-extrabold font-mono tracking-tight text-white">
                      {t.val}
                    </div>
                    <div className="text-[9px] font-medium text-gray-400 mt-1 tracking-wider">
                      {t.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-2 pt-4">
                <Clock size={14} className="text-blue-400" />
                <span>Every Saturday — 10:00 AM IST</span>
              </div>

              {/* Expandable Syllabus Area breakdown curriculum */}
              <AnimatePresence>
                {selectedLiveClass &&
                  selectedLiveClass.syllabus?.length > 0 && (
                    <div className="mt-6 border-t border-white/5 pt-4 text-left">
                      <button
                        onClick={() =>
                          setExpandedSyllabusId(
                            expandedSyllabusId === selectedLiveClass._id
                              ? null
                              : selectedLiveClass._id
                          )
                        }
                        className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-white transition"
                      >
                        <span>Show Syllabus Breakdown Curriculum</span>
                        {expandedSyllabusId === selectedLiveClass._id ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </button>
                      {expandedSyllabusId === selectedLiveClass._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-3 space-y-2 pl-1">
                            {selectedLiveClass.syllabus.map((s, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-gray-400 flex items-center gap-2"
                              >
                                <span className="w-1 h-1 bg-blue-500 rounded-full shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  )}
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE: Interactive Student Intake Form Module */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="space-y-3">
                {selectedLiveClass?.status === "LIVE" ? (
                  <a
                    href={selectedLiveClass.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition text-center flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 animate-bounce"
                  >
                    <Video size={16} className="animate-pulse" />
                    Join Active Live Stream Now
                  </a>
                ) : (
                  <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-5 text-left shadow-xl">
                    <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      Claim Free Seat
                    </h4>
                    <p className="text-[11px] text-gray-400 mb-4">
                      Enter your data to secure live access coordinates
                      instantly.
                    </p>

                    {formSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-lg text-xs flex flex-col items-center text-center gap-2"
                      >
                        <CheckCircle
                          size={28}
                          className="text-emerald-400 animate-pulse"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-extrabold tracking-tight uppercase">
                            Your slot is successfully booked
                          </p>
                          <p className="text-[10px] text-emerald-400/70">
                            We recorded your details inside the roster file
                            sequence.
                          </p>
                        </div>
                        <button
                          onClick={() => setFormSuccess(false)}
                          className="mt-2 text-[10px] text-white/40 hover:text-white underline transition"
                        >
                          Register another student seat
                        </button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handleSeatBookingSubmit}
                        className="space-y-3"
                      >
                        <div className="relative">
                          <User
                            size={13}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-slate-950/60 border border-white/5 text-white rounded-lg pl-9 pr-3 py-2 text-xs placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
                          />
                        </div>

                        <div className="relative">
                          <Phone
                            size={13}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            required
                            placeholder="WhatsApp Number (10 digits)"
                            value={formData.whatsapp}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                whatsapp: e.target.value,
                              })
                            }
                            className="w-full bg-slate-950/60 border border-white/5 text-white rounded-lg pl-9 pr-3 py-2 text-xs placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
                          />
                        </div>

                        <div className="relative">
                          <Mail
                            size={13}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="email"
                            placeholder="Email Address (Optional)"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-slate-950/60 border border-white/5 text-white rounded-lg pl-9 pr-3 py-2 text-xs placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
                          />
                        </div>

                        {formError && (
                          <p className="text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1.5 rounded-md">
                            {formError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={formSubmitting}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10"
                        >
                          {formSubmitting ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Zap size={11} fill="white" />
                          )}
                          {formSubmitting
                            ? "Submitting Registration..."
                            : "Enroll for Saturday Masterclass →"}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Under-deck horizontal alignment row cards showing historical feeds list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveClasses.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedLiveClass(item)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                  selectedLiveClass?._id === item._id
                    ? "bg-slate-900 border-white/10"
                    : "bg-slate-900/30 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-950 border border-white/5 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-xs font-bold text-blue-400 tracking-wide">
                      {item.dateString?.split(" ")?.[1] || "MAY"}
                    </div>
                    <div className="text-xl font-extrabold text-white leading-none mt-0.5">
                      {item.dateString?.split(" ")?.[0] || "17"}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {item.timeString || "10:00 AM IST"}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    item.status === "LIVE"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Area Rows */}
      <section className="mb-12">
        <div className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                category === c.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-gray-400 border border-white/5 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Course Catalog Grid Grid System */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <CourseCardSkeleton key={idx} />
          ))
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400 text-sm">
            No courses matching the selected workspace filters were found.
          </div>
        )}
      </section>
    </div>
  );
}

function CourseCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 bg-white/5 rounded w-1/3" />
        <div className="h-5 bg-white/5 rounded" />
        <div className="h-3 bg-white/5 rounded w-3/4" />
        <div className="h-8 bg-white/5 rounded mt-auto" />
      </div>
    </div>
  );
}
