"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

interface PricingService {
  id: string;
  label: { en: string; hi: string; pa: string };
  description: { en: string; hi: string; pa: string };
  icon: string;
  baseMin: number;
  baseMax: number;
  features: {
    id: string;
    label: { en: string; hi: string; pa: string };
    flatAdd: number;
    multiplier: number;
  }[];
  packages: {
    name: { en: string; hi: string; pa: string };
    minBudget: number;
    features: string[];
    deliveryWeeks: string;
  }[];
}

interface QuoteResult {
  service: { id: string; label: { en: string }; icon: string };
  estimate: { min: number; max: number };
  delivery: string;
  recommendedPackage: {
    name: { en: string };
    features: string[];
    deliveryWeeks: string;
  } | null;
}

const BUSINESS_TYPES = {
  en: [
    "Startup",
    "Local Shop",
    "Coaching Center",
    "Service Provider",
    "Enterprise",
    "Freelancer",
  ],
  hi: [
    "स्टार्टअप",
    "लोकल शॉप",
    "कोचिंग सेंटर",
    "सर्विस प्रोवाइडर",
    "एंटरप्राइज़",
    "फ्रीलांसर",
  ],
  pa: [
    "ਸਟਾਰਟਅੱਪ",
    "ਲੋਕਲ ਸ਼ਾਪ",
    "ਕੋਚਿੰਗ ਸੈਂਟਰ",
    "ਸਰਵਿਸ ਪ੍ਰੋਵਾਈਡਰ",
    "ਐਂਟਰਪ੍ਰਾਈਜ਼",
    "ਫ੍ਰੀਲਾਂਸਰ",
  ],
};

const TIMELINES = {
  en: [
    { key: "rush", label: "ASAP (Rush)" },
    { key: "normal", label: "1-2 Months" },
    { key: "flexible", label: "Flexible" },
  ],
  hi: [
    { key: "rush", label: "जल्द से जल्द" },
    { key: "normal", label: "1-2 महीने" },
    { key: "flexible", label: "लचीला" },
  ],
  pa: [
    { key: "rush", label: "ਜਲਦੀ ਤੋਂ ਜਲਦੀ" },
    { key: "normal", label: "1-2 ਮਹੀਨੇ" },
    { key: "flexible", label: "ਲਚਕਦਾਰ" },
  ],
};

const COMPLEXITY = {
  en: [
    { key: "basic", label: "Basic" },
    { key: "standard", label: "Standard" },
    { key: "advanced", label: "Advanced" },
    { key: "enterprise", label: "Enterprise" },
  ],
  hi: [
    { key: "basic", label: "बेसिक" },
    { key: "standard", label: "स्टैंडर्ड" },
    { key: "advanced", label: "एडवांस्ड" },
    { key: "enterprise", label: "एंटरप्राइज़" },
  ],
  pa: [
    { key: "basic", label: "ਬੇਸਿਕ" },
    { key: "standard", label: "ਸਟੈਂਡਰਡ" },
    { key: "advanced", label: "ਐਡਵਾਂਸਡ" },
    { key: "enterprise", label: "ਐਂਟਰਪ੍ਰਾਈਜ਼" },
  ],
};

export default function PricingWizard() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<PricingService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingQuote, setLoadingQuote] = useState(false);

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [bizType, setBizType] = useState("");
  const [complexity, setComplexity] = useState("standard");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState(25000);
  const [timeline, setTimeline] = useState("normal");
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  const steps = [
    t("pricing.step.service", "Service"),
    t("pricing.step.business", "Business"),
    t("pricing.step.budget", "Budget"),
    t("pricing.step.quote", "Quote"),
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/pricing/services");
        setServices(data.data);
      } catch {
        setServices([
          {
            id: "business-website",
            label: {
              en: "Business Website",
              hi: "बिजनेस वेबसाइट",
              pa: "ਕਾਰੋਬਾਰੀ ਵੈੱਬਸਾਈਟ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "🌐",
            baseMin: 8000,
            baseMax: 25000,
            features: [],
            packages: [],
          },
          {
            id: "ecommerce",
            label: {
              en: "E-Commerce Store",
              hi: "ई-कॉमर्स स्टोर",
              pa: "ਈ-ਕਾਮਰਸ ਸਟੋਰ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "🛒",
            baseMin: 20000,
            baseMax: 80000,
            features: [],
            packages: [],
          },
          {
            id: "mobile-app",
            label: { en: "Mobile App", hi: "मोबाइल ऐप", pa: "ਮੋਬਾਈਲ ਐਪ" },
            description: { en: "", hi: "", pa: "" },
            icon: "📱",
            baseMin: 50000,
            baseMax: 200000,
            features: [],
            packages: [],
          },
          {
            id: "saas-platform",
            label: {
              en: "SaaS Platform",
              hi: "SaaS प्लेटफॉर्म",
              pa: "SaaS ਪਲੇਟਫਾਰਮ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "☁️",
            baseMin: 80000,
            baseMax: 500000,
            features: [],
            packages: [],
          },
          {
            id: "seo-package",
            label: { en: "SEO Package", hi: "SEO पैकेज", pa: "SEO ਪੈਕੇਜ" },
            description: { en: "", hi: "", pa: "" },
            icon: "📈",
            baseMin: 5000,
            baseMax: 50000,
            features: [],
            packages: [],
          },
          {
            id: "ai-integration",
            label: {
              en: "AI Integration",
              hi: "AI इंटीग्रेशन",
              pa: "AI ਏਕੀਕਰਨ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "🤖",
            baseMin: 30000,
            baseMax: 300000,
            features: [],
            packages: [],
          },
        ]);
      }
      setLoadingServices(false);
    };
    load();
  }, []);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const getQuote = async () => {
    if (!selectedServiceId) return;
    setLoadingQuote(true);
    try {
      const { data } = await api.post("/pricing/calculate", {
        serviceId: selectedServiceId,
        complexity,
        features: selectedFeatures,
        timeline,
        budget,
      });
      setQuote(data.data);
      setStep(3);
    } catch {
      setStep(3);
    }
    setLoadingQuote(false);
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const getLabel = (
    obj: { en: string; hi: string; pa: string } | undefined
  ) => {
    if (!obj) return "";
    return obj[lang as "en" | "hi" | "pa"] || obj.en || "";
  };

  const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN");

  const businessTypes =
    BUSINESS_TYPES[lang as "en" | "hi" | "pa"] || BUSINESS_TYPES.en;
  const timelines = TIMELINES[lang as "en" | "hi" | "pa"] || TIMELINES.en;
  const complexities = COMPLEXITY[lang as "en" | "hi" | "pa"] || COMPLEXITY.en;

  return (
    <section
      id="pricing"
      className="relative z-10 py-24 px-4 md:px-6 bg-slate-50 dark:bg-z-dark2 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-z-accent/10 text-z-accent border border-z-border">
            {t("pricing.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-z-text leading-tight tracking-tight mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-base text-slate-600 dark:text-z-muted max-w-xl leading-relaxed">
            {t("pricing.sub")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-z-dark3/60 border border-slate-200 dark:border-z-border backdrop-blur-xl shadow-xl dark:shadow-card p-6 md:p-10 max-w-3xl rounded-3xl"
        >
          {/* Step tabs */}
          <div className="flex border-b border-slate-200 dark:border-z-border mb-8">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => i <= step && setStep(i)}
                className={`px-3 md:px-4 py-3 text-xs font-semibold tracking-wide transition-all duration-200 border-b-2 -mb-px flex-1 ${
                  step === i
                    ? "border-z-accent text-z-accent"
                    : i < step
                    ? "border-transparent text-slate-800 dark:text-z-text cursor-pointer"
                    : "border-transparent text-slate-400 dark:text-z-muted cursor-not-allowed"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0 — Service */}
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {loadingServices ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-z-accent" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedServiceId(s.id);
                          setSelectedFeatures([]);
                        }}
                        className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 text-left flex flex-col gap-2 ${
                          selectedServiceId === s.id
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                        }`}
                      >
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-xs leading-snug">
                          {getLabel(s.label)}
                        </span>
                        {selectedServiceId === s.id && (
                          <span className="text-[10px] text-z-accent font-bold">
                            {formatPrice(s.baseMin)} — {formatPrice(s.baseMax)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 1 — Business + Complexity */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3">
                  Business Type
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                  {businessTypes.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBizType(b)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                        bizType === b
                          ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                          : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                      }`}
                    >
                      {bizType === b && (
                        <Check
                          size={12}
                          className="inline mr-1 text-z-accent"
                        />
                      )}
                      {b}
                    </button>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3">
                  Project Complexity
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {complexities.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setComplexity(c.key)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all duration-200 text-center ${
                        complexity === c.key
                          ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                          : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                      }`}
                    >
                      {complexity === c.key && (
                        <Check size={10} className="inline mr-1" />
                      )}
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Service features */}
                {selectedService &&
                  selectedService.features &&
                  selectedService?.features?.length > 0 && (
                    <>
                      <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3 mt-5">
                        Add-on Features
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedService.features.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => toggleFeature(f.id)}
                            className={`p-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between ${
                              selectedFeatures.includes(f.id)
                                ? "border-z-accent3 bg-z-accent3/10 text-slate-900 dark:text-z-text"
                                : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent3/40 hover:text-slate-900 dark:hover:text-z-text"
                            }`}
                          >
                            <span>{getLabel(f.label)}</span>
                            <span className="text-[10px] text-z-accent3 font-bold">
                              +{formatPrice(f.flatAdd)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
              </motion.div>
            )}

            {/* Step 2 — Budget + Timeline */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-2">
                  Monthly budget range
                </p>
                <div className="text-4xl font-extrabold text-z-accent text-center mb-4">
                  {formatPrice(budget)}
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-z-accent mb-1 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-z-muted mb-6">
                  <span>₹5,000</span>
                  <span>₹5,0,000+</span>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3">
                  Timeline
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {timelines.map((tl) => (
                    <button
                      key={tl.key}
                      onClick={() => setTimeline(tl.key)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                        timeline === tl.key
                          ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                          : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                      }`}
                    >
                      {timeline === tl.key && (
                        <Check size={10} className="inline mr-1" />
                      )}
                      {tl.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3 — Quote */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {loadingQuote ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-z-accent" />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-z-accent/20 bg-z-accent/5 p-6">
                    <div className="text-lg font-bold text-slate-900 dark:text-z-text mb-1">
                      {quote?.service?.icon}{" "}
                      {getLabel(quote?.service?.label as any) ||
                        selectedService?.label?.[lang as "en"] ||
                        "Your Project"}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-z-muted mb-4">
                      {quote?.recommendedPackage
                        ? getLabel(quote.recommendedPackage.name as any)
                        : "Custom Package"}{" "}
                      — tailored for your needs
                    </div>
                    {quote?.recommendedPackage?.features && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {quote.recommendedPackage.features.map((f) => (
                          <span
                            key={f}
                            className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-z-accent/10 border border-z-accent/20 text-z-accent"
                          >
                            <Check size={10} /> {f}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-z-border">
                      <div>
                        <div className="text-xs text-slate-500 dark:text-z-muted uppercase tracking-wide mb-1">
                          Estimated Investment
                        </div>
                        <div className="text-2xl font-extrabold text-z-accent">
                          {quote
                            ? `${formatPrice(
                                quote.estimate.min
                              )} — ${formatPrice(quote.estimate.max)}`
                            : `${formatPrice(budget * 0.8)} — ${formatPrice(
                                budget * 1.2
                              )}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 dark:text-z-muted uppercase tracking-wide mb-1">
                          Delivery
                        </div>
                        <div className="text-base font-bold text-slate-900 dark:text-z-text">
                          {quote?.delivery || "4-8 Weeks"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <Link
                  href="/contact"
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-glow-sm"
                >
                  {t("pricing.consultation")} <ArrowRight size={15} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text disabled:opacity-30 transition-all duration-200"
            >
              {t("pricing.back")}
            </button>
            {step < 3 && (
              <button
                onClick={() => {
                  if (step === 2) getQuote();
                  else setStep(Math.min(3, step + 1));
                }}
                disabled={step === 0 && !selectedServiceId}
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-z-accent text-white hover:opacity-90 disabled:opacity-40 transition-all duration-200 flex items-center gap-2"
              >
                {loadingQuote && <Loader2 size={14} className="animate-spin" />}
                {step === 2 ? t("pricing.get_quote") : t("pricing.next")}{" "}
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
