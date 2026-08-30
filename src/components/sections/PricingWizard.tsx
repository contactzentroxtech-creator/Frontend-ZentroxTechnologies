"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Building2,
  Layers,
  Clock,
  Wallet,
  Briefcase,
  Globe2,
  Smartphone,
  Code2,
  Cloud,
  BarChart3,
  Megaphone,
  Bot,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

interface PricingFeature {
  id: string;
  label: string;
  flatAdd: number;
  multiplier: number;
}

interface PricingPackage {
  name: string;
  minBudget: number;
  features: string[];
  deliveryWeeks: string;
}

interface PricingService {
  id: string;
  label: string;
  description: string;
  iconKey: string;
  baseMin: number;
  baseMax: number;
  features?: PricingFeature[];
  packages?: PricingPackage[];
}

interface QuoteResult {
  service?: {
    id: string;
    label: string;
    icon: string;
  };
  estimate?: {
    min: number;
    max: number;
  };
  delivery?: string;
  recommendedPackage?: PricingPackage | null;
}

const ICON_MAP: Record<string, any> = {
  "business-website": Globe2,
  ecommerce: ShoppingCart,
  "mobile-app": Smartphone,
  "custom-software": Code2,
  "saas-platform": Cloud,
  "seo-package": BarChart3,
  "digital-marketing": Megaphone,
  "ai-integration": Bot,
};

const BUSINESS_TYPES = [
  "Startups",
  "Real Estate",
  "Education",
  "Healthcare",
  "Manufacturing",
  "E-commerce",
];

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

const FALLBACK_SERVICES: PricingService[] = [
  {
    id: "business-website",
    label: "Website Development",
    description: "Professional business websites built for growth.",
    iconKey: "business-website",
    baseMin: 8000,
    baseMax: 25000,
    features: [],
    packages: [],
  },
  {
    id: "ecommerce",
    label: "E-Commerce Solutions",
    description: "Custom online stores and e-commerce platforms.",
    iconKey: "ecommerce",
    baseMin: 20000,
    baseMax: 80000,
    features: [],
    packages: [],
  },
  {
    id: "mobile-app",
    label: "Mobile App Development",
    description: "Modern mobile applications for Android and iOS.",
    iconKey: "mobile-app",
    baseMin: 50000,
    baseMax: 200000,
    features: [],
    packages: [],
  },
  {
    id: "custom-software",
    label: "Custom Software",
    description: "Custom business software designed around your workflow.",
    iconKey: "custom-software",
    baseMin: 50000,
    baseMax: 300000,
    features: [],
    packages: [],
  },
  {
    id: "saas-platform",
    label: "SaaS Development",
    description: "Scalable SaaS platforms and custom web applications.",
    iconKey: "saas-platform",
    baseMin: 80000,
    baseMax: 500000,
    features: [],
    packages: [],
  },
  {
    id: "seo-package",
    label: "SEO Services",
    description: "SEO strategies to improve visibility and generate leads.",
    iconKey: "seo-package",
    baseMin: 5000,
    baseMax: 50000,
    features: [],
    packages: [],
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    description: "Digital campaigns designed to grow visibility and leads.",
    iconKey: "digital-marketing",
    baseMin: 8000,
    baseMax: 75000,
    features: [],
    packages: [],
  },
  {
    id: "ai-integration",
    label: "AI Integration",
    description: "AI-powered automation and business integrations.",
    iconKey: "ai-integration",
    baseMin: 30000,
    baseMax: 300000,
    features: [],
    packages: [],
  },
];

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <div key={idx} className="flex items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
              idx < current
                ? "bg-blue-600 text-white dark:bg-blue-400"
                : idx === current
                ? "border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
            }`}
          >
            {idx < current ? <Check size={16} /> : idx + 1}
          </div>
          {idx < total - 1 && (
            <div
              className={`h-1 w-10 transition-colors ${
                idx < current ? "bg-blue-600 dark:bg-blue-400" : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PricingWizard() {
  const { t } = useLang();

  const [step, setStep] = useState(0);
  const [services, setServices] = useState<PricingService[]>(FALLBACK_SERVICES);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState("");
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

  const selectedService = services.find((s) => s.id === selectedServiceId) ?? null;

  useEffect(() => {
    let active = true;
    async function loadServices() {
      try {
        const { data } = await api.get("/pricing/services");
        if (active && Array.isArray(data?.data) && data.data.length > 0) {
          setServices(data.data);
        }
      } catch {
        if (active) setServices(FALLBACK_SERVICES);
      } finally {
        if (active) setLoadingServices(false);
      }
    }
    loadServices();
    return () => {
      active = false;
    };
  }, []);

  function formatPrice(amount: number) {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  }

  function selectService(service: PricingService) {
    setSelectedServiceId(service.id);
    setSelectedFeatures([]);
    setQuote(null);
    setQuoteError("");
    const recommended = Math.round((service.baseMin + service.baseMax) / 2);
    setBudget(recommended);
  }

  function toggleFeature(featureId: string) {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
  }

  const fallbackMin = selectedService ? selectedService.baseMin : Math.round(budget * 0.8);
  const fallbackMax = selectedService ? selectedService.baseMax : Math.round(budget * 1.2);

  async function getQuote() {
    if (!selectedServiceId || !bizType) return;
    setLoadingQuote(true);
    setQuote(null);
    setQuoteError("");
    setStep(3);

    try {
      const { data } = await api.post("/pricing/calculate", {
        serviceId: selectedServiceId,
        businessType: bizType,
        complexity,
        features: selectedFeatures,
        timeline,
        budget,
      });

      if (data?.data?.estimate && typeof data.data.estimate.min === "number" && typeof data.data.estimate.max === "number") {
        setQuote(data.data);
      } else {
        setQuoteError("Live pricing is currently unavailable. Showing an approximate estimate.");
      }
    } catch {
      setQuoteError("Unable to connect to our pricing service. Showing an approximate estimate.");
    } finally {
      setLoadingQuote(false);
    }
  }

  const estimateMin = quote?.estimate?.min ?? fallbackMin;
  const estimateMax = quote?.estimate?.max ?? fallbackMax;

  const contactUrl =
    `/contact?service=${encodeURIComponent(selectedServiceId)}` +
    `&business=${encodeURIComponent(bizType)}` +
    `&complexity=${encodeURIComponent(complexity)}` +
    `&budget=${budget}` +
    `&timeline=${encodeURIComponent(timeline)}` +
    `&estimateMin=${estimateMin}` +
    `&estimateMax=${estimateMax}`;

  const budgetPresets = [5000, 25000, 50000, 100000, 200000, 500000];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 transition-colors duration-300 dark:bg-[#111827] md:px-6 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[130px] dark:bg-blue-400/[0.05]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/[0.05] blur-[130px] dark:bg-purple-400/[0.05]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/[0.05] dark:text-blue-200">
            <Sparkles size={13} />
            <span>{t("pricing.badge", "Transparent Pricing")}</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            {t("pricing.title", "Estimate Your Project")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t(
              "pricing.sub",
              "Get a quick estimated investment range for your website, software, mobile app, SaaS, AI, SEO or digital marketing project."
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.06)] backdrop-blur-md dark:border-white/8 dark:bg-[#1a1e2b]/80 dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)] md:p-10"
        >
          <StepProgress current={step} total={steps.length} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {loadingServices ? (
                  <div className="flex justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-blue-600 dark:text-blue-400" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {services.map((service) => {
                      const Icon = ICON_MAP[service.iconKey] || Globe2;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => selectService(service)}
                          className={`group flex min-h-[140px] flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 ${
                            selectedServiceId === service.id
                              ? "border-blue-600 bg-blue-50/60 shadow-md dark:border-blue-400/30 dark:bg-blue-400/10"
                              : "border-slate-200 bg-white/60 hover:border-blue-300/60 hover:shadow-md dark:border-white/8 dark:bg-white/[0.04] dark:hover:border-blue-400/20"
                          }`}
                        >
                          <Icon size={28} className="mb-2 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {service.label}
                          </span>
                          <span className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {formatPrice(service.baseMin)} – {formatPrice(service.baseMax)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="business"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
                    {t("pricing.business_type", "What type of business do you have?")}
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {BUSINESS_TYPES.map((business) => (
                      <button
                        key={business}
                        type="button"
                        onClick={() => setBizType(business)}
                        className={`rounded-xl border p-3 text-center text-sm font-semibold transition-all ${
                          bizType === business
                            ? "border-blue-600 bg-blue-50/60 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
                            : "border-slate-200 bg-white/60 text-slate-600 hover:border-blue-300/60 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
                        }`}
                      >
                        {bizType === business && <Check size={14} className="mr-1 inline" />}
                        {business}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <Layers size={16} className="text-blue-600 dark:text-blue-400" />
                    {t("pricing.complexity", "Project Complexity")}
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {COMPLEXITY.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setComplexity(item.key)}
                        className={`rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                          complexity === item.key
                            ? "border-blue-600 bg-blue-50/60 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
                            : "border-slate-200 bg-white/60 text-slate-600 hover:border-blue-300/60 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedService?.features && selectedService.features.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                      {t("pricing.addons", "Optional Features")}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {selectedService.features.map((feature) => (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => toggleFeature(feature.id)}
                          className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                            selectedFeatures.includes(feature.id)
                              ? "border-blue-600 bg-blue-50/60 dark:border-blue-400/30 dark:bg-blue-400/10"
                              : "border-slate-200 bg-white/60 hover:border-blue-300/60 dark:border-white/8 dark:bg-white/[0.04]"
                          }`}
                        >
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {feature.label}
                          </span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                            +{formatPrice(feature.flatAdd)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 text-center">
                  <p className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <Wallet size={16} className="text-blue-600 dark:text-blue-400" />
                    {t("pricing.budget", "Estimated Project Budget")}
                  </p>
                  <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 md:text-5xl">
                    {formatPrice(budget)}
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  {budgetPresets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBudget(val)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        budget === val
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white/60 text-slate-600 hover:border-blue-300/60 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
                      }`}
                    >
                      {formatPrice(val)}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full cursor-pointer accent-blue-600 dark:accent-blue-400"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(budget - 5000) / (500000 - 5000) * 100}%, #e2e8f0 ${(budget - 5000) / (500000 - 5000) * 100}%, #e2e8f0 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>₹5,000</span>
                    <span>₹5,00,000+</span>
                  </div>
                </div>

                <div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                    {t("pricing.timeline", "When do you need the project?")}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {TIMELINES.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setTimeline(item.key)}
                        className={`rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                          timeline === item.key
                            ? "border-blue-600 bg-blue-50/60 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
                            : "border-slate-200 bg-white/60 text-slate-600 hover:border-blue-300/60 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="quote"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {loadingQuote ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16">
                    <Loader2 size={32} className="animate-spin text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Calculating your estimate...
                    </p>
                  </div>
                ) : (
                  <>
                    {quoteError && (
                      <div className="mb-5 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-50/60 p-4 text-sm text-amber-700 backdrop-blur-sm dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{quoteError}</span>
                      </div>
                    )}

                    <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-white/80 p-6 backdrop-blur-sm dark:border-blue-400/20 dark:from-blue-400/10 dark:to-[#1a1e2b]/80 md:p-8">
                      <div className="mb-2 text-2xl">
                        {(() => {
                          const iconKey = quote?.service?.icon || selectedService?.iconKey || "";
                          const Icon = ICON_MAP[iconKey] || Globe2;
                          return <Icon size={28} className="text-blue-600 dark:text-blue-400" />;
                        })()}
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {quote?.service?.label || selectedService?.label || "Your Project"}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {quote?.recommendedPackage
                          ? quote.recommendedPackage.name
                          : "Custom solution tailored around your business requirements."}
                      </p>

                      <div className="my-6 border-t border-slate-200 dark:border-white/10" />

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Estimated Investment
                          </div>
                          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                            {formatPrice(estimateMin)} – {formatPrice(estimateMax)}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Estimated Delivery
                          </div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {quote?.delivery || "4–8 Weeks"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={contactUrl}
                      className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {t("pricing.consultation", "Get Free Consultation")}
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              disabled={step === 0 || loadingQuote}
              onClick={() => setStep((cur) => Math.max(0, cur - 1))}
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/8 dark:text-slate-400 dark:hover:text-white"
            >
              {t("pricing.back", "Back")}
            </button>

            {step < 3 && (
              <button
                type="button"
                disabled={loadingQuote || (step === 0 && !selectedServiceId) || (step === 1 && !bizType)}
                onClick={() => {
                  if (step === 2) {
                    getQuote();
                    return;
                  }
                  setStep((cur) => Math.min(3, cur + 1));
                }}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loadingQuote && <Loader2 size={15} className="animate-spin" />}
                {step === 2 ? t("pricing.get_quote", "Get Quote") : t("pricing.next", "Next")}
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
