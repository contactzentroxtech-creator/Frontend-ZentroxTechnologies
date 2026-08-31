"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

interface PricingService {
  id: string;
  label: string;
  description: string;
  iconKey: string;
  baseMin: number;
  baseMax: number;
}

const FALLBACK_SERVICES: PricingService[] = [
  { id: "business-website", label: "Website Development", description: "Professional business websites built for growth.", iconKey: "globe", baseMin: 8000, baseMax: 25000 },
  { id: "ecommerce", label: "E-Commerce Solutions", description: "Custom online stores and e-commerce platforms.", iconKey: "shopping", baseMin: 20000, baseMax: 80000 },
  { id: "mobile-app", label: "Mobile App Development", description: "Modern mobile applications for Android and iOS.", iconKey: "smartphone", baseMin: 50000, baseMax: 200000 },
  { id: "custom-software", label: "Custom Software", description: "Custom business software designed around your workflow.", iconKey: "code", baseMin: 50000, baseMax: 300000 },
  { id: "saas-platform", label: "SaaS Development", description: "Scalable SaaS platforms and custom web applications.", iconKey: "cloud", baseMin: 80000, baseMax: 500000 },
  { id: "seo-package", label: "SEO Services", description: "SEO strategies to improve visibility and generate leads.", iconKey: "chart", baseMin: 5000, baseMax: 50000 },
  { id: "digital-marketing", label: "Digital Marketing", description: "Digital campaigns designed to grow visibility and leads.", iconKey: "megaphone", baseMin: 8000, baseMax: 75000 },
  { id: "ai-integration", label: "AI Integration", description: "AI-powered automation and business integrations.", iconKey: "bot", baseMin: 30000, baseMax: 300000 },
];

const ICON_MAP: Record<string, string> = {
  globe: "🌐",
  shopping: "🛒",
  smartphone: "📱",
  code: "💻",
  cloud: "☁️",
  chart: "📈",
  megaphone: "📣",
  bot: "🤖",
};

const BUSINESS_TYPES = ["Startups", "Real Estate", "Education", "Healthcare", "Manufacturing", "E-commerce"];
const TIMELINES = [
  { key: "rush", label: "ASAP (Rush)" },
  { key: "normal", label: "1–2 Months" },
  { key: "flexible", label: "Flexible" },
];
const COMPLEXITY = [
  { key: "basic", label: "Basic" },
  { key: "standard", label: "Standard" },
  { key: "advanced", label: "Advanced" },
  { key: "enterprise", label: "Enterprise" },
];

const BUDGET_PRESETS = [5000, 25000, 50000, 100000, 200000, 500000];

export default function PricingWizard() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<PricingService[]>(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>("");
  const [bizType, setBizType] = useState("");
  const [complexity, setComplexity] = useState("standard");
  const [budget, setBudget] = useState(25000);
  const [timeline, setTimeline] = useState("normal");
  const [showResult, setShowResult] = useState(false);
  const [estimate, setEstimate] = useState({ min: 0, max: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await api.get("/pricing/services");
        if (data?.data?.length > 0) setServices(data.data);
      } catch {}
      setLoading(false);
    };
    loadServices();
  }, []);

  const selectedServiceData = services.find((s) => s.id === selectedService);

  const handleGetQuote = () => {
    if (!selectedServiceData) return;
    const min = selectedServiceData.baseMin;
    const max = selectedServiceData.baseMax;
    const adjustedMin = min + (complexity === "basic" ? 0 : complexity === "standard" ? min * 0.3 : complexity === "advanced" ? min * 0.7 : min * 1.2);
    const adjustedMax = max + (complexity === "basic" ? 0 : complexity === "standard" ? max * 0.3 : complexity === "advanced" ? max * 0.7 : max * 1.2);
    setEstimate({ min: Math.round(adjustedMin), max: Math.round(adjustedMax) });
    setShowResult(true);
    setStep(3);
  };

  const steps = ["Service", "Details", "Budget", "Quote"];

  return (
    <section id="calculator" ref={ref} className="bg-slate-50/70 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600">Budget Calculator</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">Estimate Your Project</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">Get a quick estimated investment range for your project.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {/* Progress */}
          <div className="mb-8 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${i <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-slate-400"}`}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`h-1 w-12 sm:w-20 ${i < step ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Service */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Select a Service</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`rounded-lg border p-3 text-center transition-all ${
                      selectedService === s.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="text-2xl">{ICON_MAP[s.iconKey] || "💼"}</span>
                    <p className="mt-1 text-xs font-medium text-slate-700">{s.label}</p>
                    <p className="text-[10px] text-slate-500">₹{s.baseMin.toLocaleString()} – ₹{s.baseMax.toLocaleString()}</p>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  disabled={!selectedService}
                  className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Business Type</label>
                  <div className="flex flex-wrap gap-2">
                    {BUSINESS_TYPES.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBizType(b)}
                        className={`rounded-full px-4 py-1.5 text-sm ${
                          bizType === b ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Complexity</label>
                  <div className="flex flex-wrap gap-2">
                    {COMPLEXITY.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setComplexity(c.key)}
                        className={`rounded-full px-4 py-1.5 text-sm ${
                          complexity === c.key ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Timeline</label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTimeline(t.key)}
                        className={`rounded-full px-4 py-1.5 text-sm ${
                          timeline === t.key ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(0)} className="rounded-full border border-gray-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-gray-50">
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!bizType}
                  className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Your Budget</h3>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">₹{budget.toLocaleString()}</p>
                <div className="mt-4">
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {BUDGET_PRESETS.map((val) => (
                    <button
                      key={val}
                      onClick={() => setBudget(val)}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        budget === val ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      ₹{val.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-full border border-gray-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-gray-50">
                  Back
                </button>
                <button
                  onClick={handleGetQuote}
                  className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Quote */}
          {step === 3 && showResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="mb-4 rounded-lg bg-blue-50 p-6">
                <Sparkles className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-slate-800">Your Estimated Investment</h3>
                <p className="mt-2 text-3xl font-bold text-blue-600">
                  ₹{estimate.min.toLocaleString()} – ₹{estimate.max.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-slate-600">{selectedServiceData?.label}</p>
                <p className="mt-4 text-sm text-slate-500">Based on your selected requirements</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                Get Free Consultation
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => { setStep(0); setShowResult(false); setSelectedService(""); setBizType(""); }}
                className="ml-3 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-slate-600 hover:bg-gray-50"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
