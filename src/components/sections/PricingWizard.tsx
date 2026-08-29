"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Loader2,
  Globe2,
  ChevronDown,
} from "lucide-react";
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
  service: {
    id: string;
    label: { en: string; hi?: string; pa?: string };
    icon: string;
  };
  estimate: {
    min: number;
    max: number;
  };
  delivery: string;
  recommendedPackage: {
    name: { en: string; hi?: string; pa?: string };
    features: string[];
    deliveryWeeks: string;
  } | null;
}

type CurrencyCode = "INR" | "USD" | "GBP" | "EUR";

const CURRENCIES: Record<
  CurrencyCode,
  {
    label: string;
    symbol: string;
    locale: string;
    rate: number;
    flag: string;
  }
> = {
  INR: {
    label: "Indian Rupee",
    symbol: "₹",
    locale: "en-IN",
    rate: 1,
    flag: "🇮🇳",
  },
  USD: {
    label: "US Dollar",
    symbol: "$",
    locale: "en-US",
    rate: 0.012,
    flag: "🇺🇸",
  },
  GBP: {
    label: "British Pound",
    symbol: "£",
    locale: "en-GB",
    rate: 0.0095,
    flag: "🇬🇧",
  },
  EUR: {
    label: "Euro",
    symbol: "€",
    locale: "de-DE",
    rate: 0.011,
    flag: "🇪🇺",
  },
};

const BUSINESS_TYPES = {
  en: [
    "Startup",
    "Small Business",
    "Real Estate",
    "Education",
    "Healthcare",
    "E-commerce",
    "Enterprise",
    "Agency",
  ],
  hi: [
    "स्टार्टअप",
    "छोटा व्यवसाय",
    "रियल एस्टेट",
    "शिक्षा",
    "स्वास्थ्य सेवा",
    "ई-कॉमर्स",
    "एंटरप्राइज़",
    "एजेंसी",
  ],
  pa: [
    "ਸਟਾਰਟਅੱਪ",
    "ਛੋਟਾ ਕਾਰੋਬਾਰ",
    "ਰੀਅਲ ਅਸਟੇਟ",
    "ਸਿੱਖਿਆ",
    "ਸਿਹਤ ਸੰਭਾਲ",
    "ਈ-ਕਾਮਰਸ",
    "ਐਂਟਰਪ੍ਰਾਈਜ਼",
    "ਏਜੰਸੀ",
  ],
};

const TIMELINES = {
  en: [
    { key: "rush", label: "ASAP / Priority" },
    { key: "normal", label: "1–2 Months" },
    { key: "flexible", label: "Flexible Timeline" },
  ],
  hi: [
    { key: "rush", label: "जल्द से जल्द" },
    { key: "normal", label: "1–2 महीने" },
    { key: "flexible", label: "लचीला समय" },
  ],
  pa: [
    { key: "rush", label: "ਜਲਦੀ ਤੋਂ ਜਲਦੀ" },
    { key: "normal", label: "1–2 ਮਹੀਨੇ" },
    { key: "flexible", label: "ਲਚਕਦਾਰ ਸਮਾਂ" },
  ],
};

const COMPLEXITY = {
  en: [
    { key: "basic", label: "Basic" },
    { key: "standard", label: "Professional" },
    { key: "advanced", label: "Advanced" },
    { key: "enterprise", label: "Enterprise" },
  ],
  hi: [
    { key: "basic", label: "बेसिक" },
    { key: "standard", label: "प्रोफेशनल" },
    { key: "advanced", label: "एडवांस्ड" },
    { key: "enterprise", label: "एंटरप्राइज़" },
  ],
  pa: [
    { key: "basic", label: "ਬੇਸਿਕ" },
    { key: "standard", label: "ਪ੍ਰੋਫੈਸ਼ਨਲ" },
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

  // Budget always stored internally in INR
  const [budget, setBudget] = useState(50000);

  const [timeline, setTimeline] = useState("normal");

  const [currency, setCurrency] =
    useState<CurrencyCode>("USD");

  const [quote, setQuote] =
    useState<QuoteResult | null>(null);

  const steps = [
    t("pricing.step.service", "Service"),
    t("pricing.step.business", "Project"),
    t("pricing.step.budget", "Budget"),
    t("pricing.step.quote", "Estimate"),
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const { data } =
          await api.get("/pricing/services");

        if (data?.data) {
          setServices(data.data);
        }
      } catch {
        setServices([
          {
            id: "business-website",
            label: {
              en: "Website Development",
              hi: "वेबसाइट डेवलपमेंट",
              pa: "ਵੈੱਬਸਾਈਟ ਡਿਵੈਲਪਮੈਂਟ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "🌐",
            baseMin: 15000,
            baseMax: 100000,
            features: [],
            packages: [],
          },
          {
            id: "ecommerce",
            label: {
              en: "E-Commerce Development",
              hi: "ई-कॉमर्स",
              pa: "ਈ-ਕਾਮਰਸ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "🛒",
            baseMin: 30000,
            baseMax: 200000,
            features: [],
            packages: [],
          },
          {
            id: "mobile-app",
            label: {
              en: "Mobile App Development",
              hi: "मोबाइल ऐप",
              pa: "ਮੋਬਾਈਲ ਐਪ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "📱",
            baseMin: 75000,
            baseMax: 500000,
            features: [],
            packages: [],
          },
          {
            id: "custom-software",
            label: {
              en: "Custom Software Development",
              hi: "कस्टम सॉफ्टवेयर",
              pa: "ਕਸਟਮ ਸਾਫਟਵੇਅਰ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "💻",
            baseMin: 100000,
            baseMax: 1000000,
            features: [],
            packages: [],
          },
          {
            id: "saas-platform",
            label: {
              en: "SaaS Development",
              hi: "SaaS डेवलपमेंट",
              pa: "SaaS ਡਿਵੈਲਪਮੈਂਟ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "☁️",
            baseMin: 150000,
            baseMax: 1500000,
            features: [],
            packages: [],
          },
          {
            id: "seo-package",
            label: {
              en: "SEO & Digital Growth",
              hi: "SEO",
              pa: "SEO",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "📈",
            baseMin: 15000,
            baseMax: 150000,
            features: [],
            packages: [],
          },
          {
            id: "ai-integration",
            label: {
              en: "AI Automation & Integration",
              hi: "AI ऑटोमेशन",
              pa: "AI ਆਟੋਮੇਸ਼ਨ",
            },
            description: { en: "", hi: "", pa: "" },
            icon: "🤖",
            baseMin: 75000,
            baseMax: 750000,
            features: [],
            packages: [],
          },
        ]);
      } finally {
        setLoadingServices(false);
      }
    };

    load();
  }, []);

  const selectedService = services.find(
    (s) => s.id === selectedServiceId
  );

  const currencyConfig = CURRENCIES[currency];

  const convertFromINR = (amount: number) =>
    amount * currencyConfig.rate;

  const convertToINR = (amount: number) =>
    amount / currencyConfig.rate;

  const formatPrice = (amountINR: number) => {
    const converted = convertFromINR(amountINR);

    return new Intl.NumberFormat(
      currencyConfig.locale,
      {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "INR" ? 0 : 0,
      }
    ).format(converted);
  };

  const formatSelectedBudget = () =>
    formatPrice(budget);

  const getQuote = async () => {
    if (!selectedServiceId || !bizType) return;

    setLoadingQuote(true);

    try {
      const { data } =
        await api.post("/pricing/calculate", {
          serviceId: selectedServiceId,
          businessType: bizType,
          complexity,
          features: selectedFeatures,
          timeline,
          budget,
          currency,
        });

      setQuote(data?.data || null);
    } catch {
      setQuote(null);
    } finally {
      setLoadingQuote(false);
      setStep(3);
    }
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const getLabel = (
    obj:
      | { en: string; hi?: string; pa?: string }
      | undefined
  ) => {
    if (!obj) return "";

    const currentLang =
      lang as "en" | "hi" | "pa";

    return obj[currentLang] || obj.en || "";
  };

  const businessTypes =
    BUSINESS_TYPES[
      lang as keyof typeof BUSINESS_TYPES
    ] || BUSINESS_TYPES.en;

  const timelines =
    TIMELINES[
      lang as keyof typeof TIMELINES
    ] || TIMELINES.en;

  const complexities =
    COMPLEXITY[
      lang as keyof typeof COMPLEXITY
    ] || COMPLEXITY.en;

  const fallbackMin = selectedService
    ? selectedService.baseMin
    : Math.round(budget * 0.8);

  const fallbackMax = selectedService
    ? selectedService.baseMax
    : Math.round(budget * 1.2);

  const displayedBudget =
    convertFromINR(budget);

  const minBudget =
    currency === "INR" ? 10000 : 250;

  const maxBudget =
    currency === "INR" ? 1500000 : 20000;

  const budgetStep =
    currency === "INR" ? 5000 : 100;

  return (
    <section
      id="pricing"
      className="relative z-10 overflow-hidden bg-slate-50 px-4 py-24 transition-colors duration-300 dark:bg-z-dark2 md:px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[20%] h-[350px] w-[350px] rounded-full bg-blue-500/[0.05] blur-[120px]" />

        <div className="absolute bottom-[10%] right-[5%] h-[350px] w-[350px] rounded-full bg-purple-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-accent/20 bg-z-accent/10 px-3 py-1.5 text-xs font-semibold text-z-accent">
            <Globe2 size={13} />

            {t(
              "pricing.badge",
              "Global Project Estimates"
            )}
          </div>

          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-z-text md:text-5xl">
            {t(
              "pricing.title",
              "Estimate Your Digital Project"
            )}
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-z-muted">
            {t(
              "pricing.sub",
              "Get a personalized project estimate for websites, software, mobile apps, SaaS platforms, AI automation, SEO, and digital growth services."
            )}
          </p>

          <p className="mt-3 text-sm font-medium text-z-accent">
            Working with businesses worldwide 🌍
          </p>
        </motion.div>

        {/* MAIN LAYOUT */}

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">

          {/* WIZARD */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            viewport={{ once: true }}
            className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-z-border dark:bg-z-dark3/60 dark:shadow-card md:p-10"
          >

            {/* STEPS */}

            <div className="mb-8 flex border-b border-slate-200 dark:border-z-border">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() =>
                    i <= step && setStep(i)
                  }
                  className={`-mb-px flex-1 border-b-2 px-2 py-3 text-xs font-semibold transition-all md:px-4 ${
                    step === i
                      ? "border-z-accent text-z-accent"
                      : i < step
                      ? "cursor-pointer border-transparent text-slate-800 dark:text-z-text"
                      : "cursor-not-allowed border-transparent text-slate-400 dark:text-z-muted"
                  }`}
                >
                  <span className="mr-1 opacity-50">
                    {i + 1}.
                  </span>

                  {s}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* STEP 0 */}

              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-z-text">
                      What do you need help with?
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-z-muted">
                      Choose the service closest to your project.
                    </p>
                  </div>

                  {loadingServices ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2
                        size={26}
                        className="animate-spin text-z-accent"
                      />
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSelectedServiceId(
                              s.id
                            );

                            setSelectedFeatures([]);
                            setQuote(null);
                          }}
                          className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                            selectedServiceId ===
                            s.id
                              ? "border-z-accent bg-z-accent/10 shadow-md"
                              : "border-slate-200 hover:border-z-accent/50 dark:border-z-border"
                          }`}
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <span className="text-2xl">
                              {s.icon}
                            </span>

                            {selectedServiceId ===
                              s.id && (
                              <Check
                                size={16}
                                className="text-z-accent"
                              />
                            )}
                          </div>

                          <div className="text-sm font-bold text-slate-900 dark:text-z-text">
                            {getLabel(s.label)}
                          </div>

                          {selectedServiceId ===
                            s.id && (
                            <div className="mt-2 text-xs font-semibold text-z-accent">
                              {formatPrice(
                                s.baseMin
                              )}{" "}
                              –{" "}
                              {formatPrice(
                                s.baseMax
                              )}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 1 */}

              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-bold text-slate-800 dark:text-z-text">
                      Your Business Type
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {businessTypes.map(
                        (b) => (
                          <button
                            key={b}
                            onClick={() =>
                              setBizType(b)
                            }
                            className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                              bizType === b
                                ? "border-z-accent bg-z-accent/10 text-z-accent"
                                : "border-slate-200 text-slate-600 hover:border-z-accent/40 dark:border-z-border dark:text-z-muted"
                            }`}
                          >
                            {bizType === b && (
                              <Check
                                size={11}
                                className="mr-1 inline"
                              />
                            )}

                            {b}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-bold text-slate-800 dark:text-z-text">
                      Project Complexity
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {complexities.map(
                        (c) => (
                          <button
                            key={c.key}
                            onClick={() =>
                              setComplexity(
                                c.key
                              )
                            }
                            className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${
                              complexity ===
                              c.key
                                ? "border-z-accent bg-z-accent/10 text-z-accent"
                                : "border-slate-200 text-slate-600 hover:border-z-accent/40 dark:border-z-border dark:text-z-muted"
                            }`}
                          >
                            {complexity ===
                              c.key && (
                              <Check
                                size={10}
                                className="mr-1 inline"
                              />
                            )}

                            {c.label}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {selectedService?.features
                    ?.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 text-sm font-bold text-slate-800 dark:text-z-text">
                        Optional Features
                      </p>

                      <div className="grid gap-2 md:grid-cols-2">
                        {selectedService.features.map(
                          (f) => (
                            <button
                              key={f.id}
                              onClick={() =>
                                toggleFeature(
                                  f.id
                                )
                              }
                              className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs transition-all ${
                                selectedFeatures.includes(
                                  f.id
                                )
                                  ? "border-z-accent bg-z-accent/10"
                                  : "border-slate-200 dark:border-z-border"
                              }`}
                            >
                              <span>
                                {getLabel(
                                  f.label
                                )}
                              </span>

                              <span className="font-bold text-z-accent">
                                +
                                {formatPrice(
                                  f.flatAdd
                                )}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2 */}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {/* Currency */}

                  <div className="mb-8">
                    <p className="mb-3 text-sm font-bold text-slate-800 dark:text-z-text">
                      Preferred Currency
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {(Object.keys(
                        CURRENCIES
                      ) as CurrencyCode[]).map(
                        (code) => {
                          const curr =
                            CURRENCIES[code];

                          return (
                            <button
                              key={code}
                              onClick={() =>
                                setCurrency(
                                  code
                                )
                              }
                              className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                                currency ===
                                code
                                  ? "border-z-accent bg-z-accent/10 text-z-accent"
                                  : "border-slate-200 text-slate-600 hover:border-z-accent/40 dark:border-z-border dark:text-z-muted"
                              }`}
                            >
                              <span className="mr-1">
                                {curr.flag}
                              </span>

                              {code}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Budget */}

                  <div className="rounded-2xl border border-z-accent/15 bg-z-accent/[0.03] p-6">
                    <p className="mb-2 text-center text-sm font-medium text-slate-600 dark:text-z-muted">
                      Your Estimated Investment
                    </p>

                    <div className="mb-6 text-center text-4xl font-extrabold text-z-accent md:text-5xl">
                      {formatSelectedBudget()}
                    </div>

                    <input
                      type="range"
                      min={minBudget}
                      max={maxBudget}
                      step={budgetStep}
                      value={displayedBudget}
                      onChange={(e) => {
                        const value =
                          Number(
                            e.target.value
                          );

                        setBudget(
                          Math.round(
                            convertToINR(
                              value
                            )
                          )
                        );
                      }}
                      className="mb-3 w-full cursor-pointer accent-z-accent"
                    />

                    <div className="flex justify-between text-xs text-slate-500 dark:text-z-muted">
                      <span>
                        {new Intl.NumberFormat(
                          currencyConfig.locale,
                          {
                            style: "currency",
                            currency,
                            maximumFractionDigits: 0,
                          }
                        ).format(minBudget)}
                      </span>

                      <span>
                        {new Intl.NumberFormat(
                          currencyConfig.locale,
                          {
                            style: "currency",
                            currency,
                            maximumFractionDigits: 0,
                          }
                        ).format(maxBudget)}
                        +
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}

                  <div className="mt-7">
                    <p className="mb-3 text-sm font-bold text-slate-800 dark:text-z-text">
                      Preferred Timeline
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {timelines.map((tl) => (
                        <button
                          key={tl.key}
                          onClick={() =>
                            setTimeline(
                              tl.key
                            )
                          }
                          className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${
                            timeline ===
                            tl.key
                              ? "border-z-accent bg-z-accent/10 text-z-accent"
                              : "border-slate-200 text-slate-600 hover:border-z-accent/40 dark:border-z-border dark:text-z-muted"
                          }`}
                        >
                          {timeline ===
                            tl.key && (
                            <Check
                              size={10}
                              className="mr-1 inline"
                            />
                          )}

                          {tl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {loadingQuote ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2
                        size={28}
                        className="animate-spin text-z-accent"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="rounded-3xl border border-z-accent/20 bg-gradient-to-br from-z-accent/10 to-transparent p-6 md:p-8">

                        <div className="mb-6 flex items-start justify-between">
                          <div>
                            <div className="text-lg font-bold text-slate-900 dark:text-z-text">
                              {quote?.service
                                ?.icon ||
                                selectedService?.icon}{" "}
                              {getLabel(
                                quote?.service
                                  ?.label
                              ) ||
                                getLabel(
                                  selectedService?.label
                                ) ||
                                "Your Project"}
                            </div>

                            <p className="mt-1 text-sm text-slate-600 dark:text-z-muted">
                              Personalized
                              estimate based on
                              your project
                              requirements.
                            </p>
                          </div>

                          <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-z-accent shadow-sm dark:bg-white/10">
                            {currencyConfig.flag}{" "}
                            {currency}
                          </div>
                        </div>

                        {quote
                          ?.recommendedPackage
                          ?.features && (
                          <div className="mb-6 flex flex-wrap gap-2">
                            {quote.recommendedPackage.features.map(
                              (f) => (
                                <span
                                  key={f}
                                  className="flex items-center gap-1 rounded-full border border-z-accent/20 bg-z-accent/10 px-3 py-1.5 text-xs font-medium text-z-accent"
                                >
                                  <Check
                                    size={10}
                                  />

                                  {f}
                                </span>
                              )
                            )}
                          </div>
                        )}

                        <div className="grid gap-5 border-t border-z-accent/15 pt-5 sm:grid-cols-2">

                          <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-z-muted">
                              Estimated
                              Investment
                            </div>

                            <div className="text-2xl font-extrabold text-z-accent md:text-3xl">
                              {quote
                                ? `${formatPrice(
                                    quote
                                      .estimate
                                      .min
                                  )} – ${formatPrice(
                                    quote
                                      .estimate
                                      .max
                                  )}`
                                : `${formatPrice(
                                    fallbackMin
                                  )} – ${formatPrice(
                                    fallbackMax
                                  )}`}
                            </div>
                          </div>

                          <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-z-muted">
                              Estimated
                              Timeline
                            </div>

                            <div className="text-xl font-bold text-slate-900 dark:text-z-text">
                              {quote?.delivery ||
                                "4–8 Weeks"}
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-z-border dark:bg-white/[0.03] dark:text-z-muted">
                        <strong className="text-slate-900 dark:text-z-text">
                          What happens next?
                        </strong>

                        <p className="mt-1">
                          Book a free
                          consultation and
                          we'll discuss your
                          requirements,
                          timeline, and
                          provide a detailed
                          proposal.
                        </p>
                      </div>

                      <Link
                        href="/contact"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-z-accent py-4 text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                      >
                        Book a Free Strategy
                        Call

                        <ArrowRight size={16} />
                      </Link>
                    </>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

            {/* NAVIGATION */}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-z-border">

              <button
                onClick={() =>
                  setStep(
                    Math.max(
                      0,
                      step - 1
                    )
                  )
                }
                disabled={
                  step === 0 ||
                  loadingQuote
                }
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:text-slate-900 disabled:opacity-30 dark:border-z-border dark:text-z-muted"
              >
                {t(
                  "pricing.back",
                  "Back"
                )}
              </button>

              {step < 3 && (
                <button
                  onClick={() => {
                    if (step === 2) {
                      getQuote();
                    } else {
                      setStep(
                        Math.min(
                          3,
                          step + 1
                        )
                      );
                    }
                  }}
                  disabled={
                    loadingQuote ||
                    (step === 0 &&
                      !selectedServiceId) ||
                    (step === 1 &&
                      !bizType)
                  }
                  className="flex items-center gap-2 rounded-full bg-z-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
                >
                  {loadingQuote && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  {step === 2
                    ? "Get My Estimate"
                    : t(
                        "pricing.next",
                        "Continue"
                      )}

                  <ArrowRight size={14} />
                </button>
              )}

            </div>

          </motion.div>

          {/* SIDE TRUST CARD */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            viewport={{ once: true }}
            className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-z-border dark:bg-white/[0.03]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-z-accent/10 text-z-accent">
              <Globe2 size={23} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-z-text">
              Built for Global
              Businesses
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-z-muted">
              We work remotely with
              businesses across
              India, the United
              States, United
              Kingdom, Australia and
              worldwide.
            </p>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm dark:border-z-border">
              <div className="flex items-center gap-2">
                <Check
                  size={15}
                  className="text-emerald-500"
                />
                Remote collaboration
              </div>

              <div className="flex items-center gap-2">
                <Check
                  size={15}
                  className="text-emerald-500"
                />
                Transparent proposals
              </div>

              <div className="flex items-center gap-2">
                <Check
                  size={15}
                  className="text-emerald-500"
                />
                Flexible engagement
              </div>

              <div className="flex items-center gap-2">
                <Check
                  size={15}
                  className="text-emerald-500"
                />
                Global delivery
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
