"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Clock,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  X,
  Check,
  Timer,
  ChevronRight,
  MapPin,
  Zap,
} from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

interface Internship {
  _id: string;
  title: string;
  slug: string;
  description: string;
  domain: string;
  duration: string;
  type: string;
  stipend: number;
  isPaid: boolean;
  requirements: string[];
  tasks: { title: string; description: string; order: number }[];
  maxSlots: number;
  filledSlots: number;
  skillsRequired: string[];
  aptitudeTestRequired: boolean;
  minAptitudeScore: number;
  certificate: boolean;
  offerLetter: boolean;
  startDate?: string;
}

interface TestQuestion {
  _id: string;
  question: string;
  options: string[];
  category: string;
  difficulty: string;
}

const DOMAIN_LABELS: Record<string, string> = {
  "web-dev": "website development",
  mobile: "Mobile Development",
  "ai-ml": "AI/ML",
  seo: "SEO & Marketing",
  design: "UI/UX Design",
  "digital-marketing": "Digital Marketing Services",
  fullstack: "Full Stack",
};

export default function InternshipDetailClient({ slug }: { slug: string }) {
  const { user, fetchMe } = useAuthStore();
  const router = useRouter();

  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null
  );

  // Test state
  const [showTest, setShowTest] = useState(false);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [testId, setTestId] = useState("");
  const [testDuration, setTestDuration] = useState(30);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [testCurrent, setTestCurrent] = useState(0);
  const [testSubmitting, setTestSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    passed: boolean;
    correct: number;
    total: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStartedAt, setTestStartedAt] = useState<number>(0);

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/internship/${slug}`);
        setInternship(data.data);
      } catch {
        toast.error("Internship not found");
      }
      setLoading(false);
    };
    load();
  }, [slug]);

  // Countdown timer
  useEffect(() => {
    if (!showTest || testResult) return;
    setTimeLeft(testDuration * 60);
    setTestStartedAt(Date.now());
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showTest]);

  const apply = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setApplying(true);
    try {
      const { data } = await api.post(`/internship/${internship!._id}/apply`);
      setApplied(true);
      setApplicationStatus("pending");
      toast.success("Application submitted!");
      if (data.requiresTest) {
        toast("You need to complete the aptitude test to proceed.", {
          icon: "📝",
        });
        loadTest();
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        setApplied(true);
        toast("You have already applied for this internship.");
      } else {
        toast.error(err.response?.data?.message || "Application failed");
      }
    }
    setApplying(false);
  };

  const loadTest = async () => {
    try {
      const { data } = await api.get(`/internship/${internship!._id}/test`);
      setTestQuestions(data.data.questions);
      setTestId(data.data.testId);
      setTestDuration(data.data.duration);
      setShowTest(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Test not available");
    }
  };

  const submitTest = async () => {
    if (testSubmitting) return;
    setTestSubmitting(true);
    const timeTaken = Math.floor((Date.now() - testStartedAt) / 1000);
    const answersArr = Object.entries(answers).map(
      ([questionId, selectedIndex]) => ({ questionId, selectedIndex })
    );
    try {
      const { data } = await api.post(
        `/internship/${internship!._id}/test/submit`,
        {
          testId,
          answers: answersArr,
          timeTaken,
        }
      );
      setTestResult(data.data);
      setApplicationStatus(data.data.passed ? "test-passed" : "test-failed");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Test submission failed");
    }
    setTestSubmitting(false);
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
      </div>
    );

  if (!internship)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle size={32} className="text-z-muted" />
        <p className="text-z-muted">Internship not found.</p>
        <Link
          href="/internship"
          className="text-z-accent hover:underline text-sm"
        >
          View all internships
        </Link>
      </div>
    );

  const slotsLeft = internship.maxSlots - internship.filledSlots;

  return (
    <section className="relative z-10 py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Aptitude Test Modal */}
        <AnimatePresence>
          {showTest && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
              >
                {testResult ? (
                  /* Test Result */
                  <div className="text-center py-6">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
                        testResult.passed
                          ? "bg-z-accent3/20 border border-z-accent3/30"
                          : "bg-red-500/20 border border-red-500/30"
                      }`}
                    >
                      {testResult.passed ? (
                        <CheckCircle2 size={36} className="text-z-accent3" />
                      ) : (
                        <X size={36} className="text-red-400" />
                      )}
                    </div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      {testResult.passed
                        ? "You Passed!"
                        : "Better Luck Next Time"}
                    </h2>
                    <div className="text-5xl font-extrabold text-z-accent mb-2">
                      {testResult.score}%
                    </div>
                    <p className="text-z-muted text-sm mb-2">
                      {testResult.correct} / {testResult.total} correct answers
                    </p>
                    <p className="text-z-muted text-sm mb-6">
                      {testResult.passed
                        ? "Our team will review your application and reach out within 2-3 working days."
                        : `Minimum required score is ${internship.minAptitudeScore}%. You may not reapply for this batch.`}
                    </p>
                    <button
                      onClick={() => {
                        setShowTest(false);
                      }}
                      className="px-8 py-3 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-colors"
                    >
                      {testResult.passed
                        ? "Back to Internship"
                        : "View Other Internships"}
                    </button>
                  </div>
                ) : (
                  /* Active Test */
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h2 className="text-base font-bold text-white">
                          Aptitude Test
                        </h2>
                        <p className="text-xs text-z-muted">
                          {internship.title} — Question {testCurrent + 1} of{" "}
                          {testQuestions.length}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold ${
                          timeLeft < 120
                            ? "text-red-400 bg-red-500/15"
                            : "text-z-accent bg-z-accent/15"
                        }`}
                      >
                        <Timer size={14} />
                        {formatTime(timeLeft)}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-white/10 mb-5 overflow-hidden">
                      <div
                        className="h-full bg-z-accent rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((testCurrent + 1) / testQuestions.length) * 100
                          }%`,
                        }}
                      />
                    </div>

                    {testQuestions[testCurrent] && (
                      <div>
                        <p className="text-sm font-semibold text-white mb-4 leading-relaxed">
                          {testQuestions[testCurrent].question}
                        </p>
                        <div className="flex flex-col gap-2 mb-6">
                          {testQuestions[testCurrent].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [testQuestions[testCurrent]._id]: i,
                                }))
                              }
                              className={`p-3.5 rounded-xl border text-sm text-left transition-all duration-150 ${
                                answers[testQuestions[testCurrent]._id] === i
                                  ? "border-z-accent bg-z-accent/10 text-white"
                                  : "border-z-border text-z-muted hover:border-z-accent/40 hover:text-white"
                              }`}
                            >
                              <span className="font-semibold mr-2 text-z-muted">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              {opt}
                            </button>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              setTestCurrent(Math.max(0, testCurrent - 1))
                            }
                            disabled={testCurrent === 0}
                            className="flex-1 py-2.5 rounded-xl border border-z-border text-z-muted text-sm disabled:opacity-30 hover:text-white transition-colors"
                          >
                            Previous
                          </button>
                          {testCurrent < testQuestions.length - 1 ? (
                            <button
                              onClick={() => setTestCurrent(testCurrent + 1)}
                              className="flex-1 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold flex items-center justify-center gap-2"
                            >
                              Next <ChevronRight size={15} />
                            </button>
                          ) : (
                            <button
                              onClick={submitTest}
                              disabled={testSubmitting}
                              className="flex-1 py-2.5 rounded-xl bg-z-accent3 text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                              {testSubmitting ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Check size={14} /> Submit Test
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-start gap-3 mb-2">
          <Link
            href="/internship"
            className="text-xs text-z-muted hover:text-white transition-colors"
          >
            Internships
          </Link>
          <span className="text-z-muted">/</span>
          <span className="text-xs text-z-accent">{internship.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="z-badge mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-z-accent3 animate-pulse-glow" />
                Remote Internship ·{" "}
                {DOMAIN_LABELS[internship.domain] || internship.domain}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                {internship.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { icon: Clock, val: internship.duration },
                  {
                    icon: MapPin,
                    val:
                      internship.type === "remote" ? "Fully Remote" : "Hybrid",
                  },
                  { icon: Users, val: `${slotsLeft} slots left` },
                ].map(({ icon: Icon, val }) => (
                  <div
                    key={val}
                    className="flex items-center gap-1.5 text-sm text-z-muted"
                  >
                    <Icon size={14} className="text-z-accent" /> {val}
                  </div>
                ))}
              </div>
              <p className="text-base text-z-muted leading-relaxed">
                {internship.description}
              </p>
            </motion.div>

            {/* Requirements */}
            {internship.requirements?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h2 className="font-bold text-white mb-4">Requirements</h2>
                <ul className="flex flex-col gap-2.5">
                  {internship.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-z-muted"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-z-accent3 flex-shrink-0 mt-0.5"
                      />{" "}
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tasks */}
            {internship.tasks?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass-card p-6"
              >
                <h2 className="font-bold text-white mb-4">Internship Tasks</h2>
                <div className="flex flex-col gap-3">
                  {internship.tasks
                    .sort((a, b) => a.order - b.order)
                    .map((task, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-z-border"
                      >
                        <div className="w-6 h-6 rounded-full bg-z-accent/20 flex items-center justify-center text-xs font-bold text-z-accent flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {task.title}
                          </div>
                          {task.description && (
                            <div className="text-xs text-z-muted mt-0.5 leading-relaxed">
                              {task.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* What you get */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="font-bold text-white mb-4">What You Receive</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    show: internship.offerLetter,
                    icon: "📄",
                    title: "Offer Letter",
                    desc: "On acceptance",
                  },
                  {
                    show: internship.certificate,
                    icon: "🏆",
                    title: "Completion Certificate",
                    desc: "Verified + QR code",
                  },
                  {
                    show: true,
                    icon: "⭐",
                    title: "Recommendation Letter",
                    desc: "Performance-based",
                  },
                  {
                    show: true,
                    icon: "🚀",
                    title: "Real-world Experience",
                    desc: "Industry projects",
                  },
                ]
                  .filter((i) => i.show)
                  .map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-xl bg-white/5 border border-z-border"
                    >
                      <div className="text-xl mb-2">{item.icon}</div>
                      <div className="text-sm font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-z-muted mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-extrabold text-white">
                  {internship.isPaid ? `₹${internship.stipend}/mo` : "Unpaid"}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-z-accent3/15 text-z-accent3 border border-z-accent3/25">
                  {slotsLeft > 0 ? `${slotsLeft} seats left` : "Full"}
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-5 text-sm">
                {[
                  ["Duration", internship.duration],
                  ["Type", "Remote — Work from anywhere"],
                  [
                    "Domain",
                    DOMAIN_LABELS[internship.domain] || internship.domain,
                  ],
                  [
                    "Aptitude Test",
                    internship.aptitudeTestRequired
                      ? `Required (min ${internship.minAptitudeScore}%)`
                      : "Not required",
                  ],
                  [
                    "Certificate",
                    internship.certificate ? "Included" : "Not included",
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-z-muted">{k}</span>
                    <span className="text-white text-right text-xs">{v}</span>
                  </div>
                ))}
              </div>

              {applied ? (
                <div className="flex flex-col gap-3">
                  <div
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold ${
                      applicationStatus === "test-passed"
                        ? "bg-z-accent3/15 text-z-accent3"
                        : applicationStatus === "test-failed"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-z-accent/15 text-z-accent"
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    {applicationStatus === "test-passed"
                      ? "Test passed — under review"
                      : applicationStatus === "test-failed"
                      ? "Test not passed"
                      : "Applied — test required"}
                  </div>
                  {applicationStatus === "pending" &&
                    internship.aptitudeTestRequired && (
                      <button
                        onClick={loadTest}
                        className="w-full py-3 rounded-xl border border-z-accent text-z-accent text-sm font-semibold hover:bg-z-accent hover:text-white transition-all duration-200"
                      >
                        Take Aptitude Test
                      </button>
                    )}
                  <Link
                    href="/dashboard/internship"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-z-border text-z-muted text-sm hover:text-white transition-colors"
                  >
                    View Dashboard <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={apply}
                  disabled={applying || slotsLeft <= 0 || !user}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 shadow-glow-sm mb-3"
                >
                  {applying ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : slotsLeft <= 0 ? (
                    "No Seats Available"
                  ) : !user ? (
                    "Login to Apply"
                  ) : (
                    <>
                      <Zap size={15} /> Apply Now
                    </>
                  )}
                </button>
              )}

              {!user && (
                <Link
                  href="/auth/register"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-z-border text-z-muted text-sm hover:text-white transition-colors"
                >
                  Create Free Account
                </Link>
              )}

              <p className="text-[10px] text-z-muted text-center mt-3">
                Zentrox Technologies · MSME Registered · Remote-First
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
