"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

type SupportedLang = "en" | "hi" | "pa";

interface LocalizedText {
  en: string;
  hi?: string;
  pa?: string;
}

interface PricingFeature {
  id: string;
  label: LocalizedText;
  flatAdd: number;
  multiplier: number;
}

interface PricingPackage {
  name: LocalizedText;
  minBudget: number;
  features: string[];
  deliveryWeeks: string;
}

interface PricingService {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  icon: string;
  baseMin: number;
  baseMax: number;
  features?: PricingFeature[];
  packages?: PricingPackage[];
}

interface QuoteResult {
  service?: {
    id: string;
    label: LocalizedText;
    icon: string;
  };
  estimate?: {
    min: number;
    max: number;
  };
  delivery?: string;
  recommendedPackage?: PricingPackage | null;
}

const BUSINESS_TYPES: Record<SupportedLang, string[]> = {
  en: [
    "Startups",
    "Real Estate",
    "Education",
    "Healthcare",
    "Manufacturing",
    "E-commerce",
  ],
  hi: [
    "स्टार्टअप",
    "रियल एस्टेट",
    "शिक्षा",
    "स्वास्थ्य सेवा",
    "विनिर्माण",
    "ई-कॉमर्स",
  ],
  pa: [
    "ਸਟਾਰਟਅੱਪ",
    "ਰੀਅਲ ਅਸਟੇਟ",
    "ਸਿੱਖਿਆ",
    "ਸਿਹਤ ਸੰਭਾਲ",
    "ਨਿਰਮਾਣ",
    "ਈ-ਕਾਮਰਸ",
  ],
};

const TIMELINES: Record<
  SupportedLang,
  { key: string; label: string }[]
> = {
  en: [
    { key: "rush", label: "ASAP (Rush)" },
    { key: "normal", label: "1–2 Months" },
    { key: "flexible", label: "Flexible" },
  ],
  hi: [
    { key: "rush", label: "जल्द से जल्द" },
    { key: "normal", label: "1–2 महीने" },
    { key: "flexible", label: "लचीला" },
  ],
  pa: [
    { key: "rush", label: "ਜਲਦੀ ਤੋਂ ਜਲਦੀ" },
    { key: "normal", label: "1–2 ਮਹੀਨੇ" },
    { key: "flexible", label: "ਲਚਕਦਾਰ" },
  ],
};

const COMPLEXITY: Record<
  SupportedLang,
  { key: string; label: string }[]
> = {
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

const FALLBACK_SERVICES: PricingService[] = [
  {
    id: "business-website",
    label: {
      en: "Website Development",
      hi: "वेबसाइट डेवलपमेंट",
      pa: "ਵੈੱਬਸਾਈਟ ਡਿਵੈਲਪਮੈਂਟ",
    },
    description: {
      en: "Professional business websites built for growth.",
      hi: "व्यवसाय के विकास के लिए प्रोफेशनल वेबसाइट।",
      pa: "ਬਿਜ਼ਨਸ ਵਿਕਾਸ ਲਈ ਪ੍ਰੋਫੈਸ਼ਨਲ ਵੈੱਬਸਾਈਟਾਂ।",
    },
    icon: "🌐",
    baseMin: 8000,
    baseMax: 25000,
    features: [],
    packages: [],
  },
  {
    id: "ecommerce",
    label: {
      en: "E-Commerce Solutions",
      hi: "ई-कॉमर्स समाधान",
      pa: "ਈ-ਕਾਮਰਸ ਹੱਲ",
    },
    description: {
      en: "Custom online stores and e-commerce platforms.",
      hi: "कस्टम ऑनलाइन स्टोर और ई-कॉमर्स प्लेटफॉर्म।",
      pa: "ਕਸਟਮ ਆਨਲਾਈਨ ਸਟੋਰ ਅਤੇ ਈ-ਕਾਮਰਸ ਪਲੇਟਫਾਰਮ।",
    },
    icon: "🛒",
    baseMin: 20000,
    baseMax: 80000,
    features: [],
    packages: [],
  },
  {
    id: "mobile-app",
    label: {
      en: "Mobile Application Development",
      hi: "मोबाइल एप्लीकेशन डेवलपमेंट",
      pa: "ਮੋਬਾਈਲ ਐਪਲੀਕੇਸ਼ਨ ਡਿਵੈਲਪਮੈਂਟ",
    },
    description: {
      en: "Modern mobile applications for Android and iOS.",
      hi: "Android और iOS के लिए आधुनिक मोबाइल एप्लीकेशन।",
      pa: "Android ਅਤੇ iOS ਲਈ ਆਧੁਨਿਕ ਮੋਬਾਈਲ ਐਪਲੀਕੇਸ਼ਨ।",
    },
    icon: "📱",
    baseMin: 50000,
    baseMax: 200000,
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
    description: {
      en: "Scalable SaaS platforms and custom web applications.",
      hi: "स्केलेबल SaaS प्लेटफॉर्म और कस्टम वेब एप्लीकेशन।",
      pa: "ਸਕੇਲੇਬਲ SaaS ਪਲੇਟਫਾਰਮ ਅਤੇ ਕਸਟਮ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨ।",
    },
    icon: "☁️",
    baseMin: 80000,
    baseMax: 500000,
    features: [],
    packages: [],
  },
  {
    id: "seo-package",
    label: {
      en: "SEO Services",
      hi: "SEO सेवाएं",
      pa: "SEO ਸੇਵਾਵਾਂ",
    },
    description: {
      en: "SEO strategies to improve visibility and leads.",
      hi: "विजिबिलिटी और लीड बढ़ाने के लिए SEO रणनीतियां।",
      pa: "ਵਿਜ਼ਿਬਿਲਟੀ ਅਤੇ ਲੀਡ ਵਧਾਉਣ ਲਈ SEO ਰਣਨੀਤੀਆਂ।",
    },
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
    description: {
      en: "AI-powered automation and business integrations.",
      hi: "AI आधारित ऑटोमेशन और बिजनेस इंटीग्रेशन।",
      pa: "AI ਅਧਾਰਿਤ ਆਟੋਮੇਸ਼ਨ ਅਤੇ ਬਿਜ਼ਨਸ ਇੰਟੀਗ੍ਰੇਸ਼ਨ।",
    },
    icon: "🤖",
    baseMin: 30000,
    baseMax: 300000,
    features: [],
    packages: [],
  },
];

export default function PricingWizard() {
  const { t, lang } = useLang();

  const rawLang = lang as string;

  const currentLang: SupportedLang =
    rawLang === "hi"
      ? "hi"
      : rawLang === "pa"
        ? "pa"
        : "en";

  const [step, setStep] = useState(0);

  const [services, setServices] = useState<PricingService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  const [selectedServiceId, setSelectedServiceId] =
    useState("");

  const [bizType, setBizType] = useState("");

  const [complexity, setComplexity] =
    useState("standard");

  const [selectedFeatures, setSelectedFeatures] =
    useState<string[]>([]);

  const [budget, setBudget] = useState(25000);

  const [timeline, setTimeline] =
    useState("normal");

  const [quote, setQuote] =
    useState<QuoteResult | null>(null);

  const steps = [
    t("pricing.step.service", "Service"),
    t("pricing.step.business", "Business"),
    t("pricing.step.budget", "Budget"),
    t("pricing.step.quote", "Quote"),
  ];

  const businessTypes =
    BUSINESS_TYPES[currentLang];

  const timelines =
    TIMELINES[currentLang];

  const complexities =
    COMPLEXITY[currentLang];

  /*
   * Load services
   */

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      try {
        const { data } =
          await api.get("/pricing/services");

        const receivedServices =
          data?.data;

        if (
          active &&
          Array.isArray(receivedServices) &&
          receivedServices.length > 0
        ) {
          setServices(receivedServices);
        } else if (active) {
          setServices(FALLBACK_SERVICES);
        }
      } catch {
        if (active) {
          setServices(FALLBACK_SERVICES);
        }
      } finally {
        if (active) {
          setLoadingServices(false);
        }
      }
    };

    void loadServices();

    return () => {
      active = false;
    };
  }, []);

  /*
   * Reset language-dependent values
   */

  useEffect(() => {
    setBizType("");
    setSelectedFeatures([]);
    setQuote(null);
    setQuoteError("");

    if (step > 1) {
      setStep(1);
    }
  }, [currentLang]);

  /*
   * Selected service
   */

  const selectedService =
    services.find(
      (service) =>
        service.id === selectedServiceId
    ) ?? null;

  /*
   * Translation helper
   */

  const getLabel = (
    value:
      | LocalizedText
      | undefined
      | null
  ) => {
    if (!value) return "";

    if (
      currentLang === "hi" &&
      value.hi
    ) {
      return value.hi;
    }

    if (
      currentLang === "pa" &&
      value.pa
    ) {
      return value.pa;
    }

    return value.en || "";
  };

  /*
   * Price formatter
   */

  const formatPrice = (
    amount: number
  ) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  /*
   * Feature toggle
   */

  const toggleFeature = (
    featureId: string
  ) => {
    setSelectedFeatures(
      (previous) => {
        if (
          previous.includes(featureId)
        ) {
          return previous.filter(
            (id) =>
              id !== featureId
          );
        }

        return [
          ...previous,
          featureId,
        ];
      }
    );
  };

  /*
   * Service selection
   */

  const selectService = (
    service: PricingService
  ) => {
    setSelectedServiceId(service.id);

    setSelectedFeatures([]);

    setQuote(null);

    setQuoteError("");

    const recommendedBudget =
      Math.round(
        (service.baseMin +
          service.baseMax) /
          2
      );

    setBudget(recommendedBudget);
  };

  /*
   * Quote fallback
   */

  const fallbackMin = selectedService
    ? selectedService.baseMin
    : Math.round(budget * 0.8);

  const fallbackMax = selectedService
    ? selectedService.baseMax
    : Math.round(budget * 1.2);

  /*
   * Quote API
   */

  const getQuote = async () => {
    if (
      !selectedServiceId ||
      !bizType
    ) {
      return;
    }

    setLoadingQuote(true);

    setQuote(null);

    setQuoteError("");

    setStep(3);

    try {
      const { data } =
        await api.post(
          "/pricing/calculate",
          {
            serviceId:
              selectedServiceId,
            businessType: bizType,
            complexity,
            features:
              selectedFeatures,
            timeline,
            budget,
          }
        );

      if (
        data?.data &&
        data.data.estimate &&
        typeof data.data.estimate.min ===
          "number" &&
        typeof data.data.estimate.max ===
          "number"
      ) {
        setQuote(data.data);
      } else {
        setQuoteError(
          "Live pricing is currently unavailable. Showing an approximate estimate."
        );
      }
    } catch {
      setQuoteError(
        "Unable to connect to our pricing service. Showing an approximate estimate."
      );
    } finally {
      setLoadingQuote(false);
    }
  };

  /*
   * Contact URL with project details
   */

  const estimateMin =
    quote?.estimate?.min ??
    fallbackMin;

  const estimateMax =
    quote?.estimate?.max ??
    fallbackMax;

  const contactUrl =
    `/contact?service=${encodeURIComponent(
      selectedServiceId
    )}` +
    `&business=${encodeURIComponent(
      bizType
    )}` +
    `&complexity=${encodeURIComponent(
      complexity
    )}` +
    `&budget=${budget}` +
    `&timeline=${encodeURIComponent(
      timeline
    )}` +
    `&estimateMin=${estimateMin}` +
    `&estimateMax=${estimateMax}`;

  return (
    <section
      id="pricing"
      className="relative z-10 bg-slate-50 px-4 py-24 transition-colors duration-300 dark:bg-z-dark2 md:px-6"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADING */}

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
          }}
          viewport={{
            once: true,
          }}
          className="mb-10"
        >
          <div className="mb-4 inline-block rounded-full border border-z-border bg-z-accent/10 px-3 py-1 text-xs font-semibold text-z-accent">
            {t(
              "pricing.badge",
              "Transparent Pricing"
            )}
          </div>

          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-z-text md:text-5xl">
            {t(
              "pricing.title",
              "Estimate Your Project"
            )}
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-z-muted">
            {t(
              "pricing.sub",
              "Get a free estimate for website development, mobile apps, custom software, SaaS development, AI integration, or digital marketing services."
            )}
          </p>
        </motion.div>

        {/* WIZARD */}

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
            delay: 0.2,
          }}
          viewport={{
            once: true,
          }}
          className="max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-xl dark:border-z-border dark:bg-z-dark3/60 dark:shadow-card md:p-10"
        >
          {/* STEPS */}

          <div className="mb-8 flex border-b border-slate-200 dark:border-z-border">
            {steps.map(
              (
                stepName,
                index
              ) => (
                <button
                  key={`${stepName}-${index}`}
                  type="button"
                  disabled={
                    index > step ||
                    loadingQuote
                  }
                  onClick={() => {
                    if (
                      index <= step &&
                      !loadingQuote
                    ) {
                      setStep(index);
                    }
                  }}
                  className={`-mb-px flex-1 border-b-2 px-2 py-3 text-xs font-semibold tracking-wide transition-all duration-200 md:px-4 ${
                    step === index
                      ? "border-z-accent text-z-accent"
                      : index < step
                        ? "cursor-pointer border-transparent text-slate-800 dark:text-z-text"
                        : "cursor-not-allowed border-transparent text-slate-400 dark:text-z-muted"
                  }`}
                >
                  {stepName}
                </button>
              )
            )}
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 0 */}

            {step === 0 && (
              <motion.div
                key="step-service"
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
                {loadingServices ? (
                  <div className="flex justify-center py-12">
                    <Loader2
                      size={24}
                      className="animate-spin text-z-accent"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {services.map(
                      (
                        service
                      ) => (
                        <button
                          key={
                            service.id
                          }
                          type="button"
                          onClick={() =>
                            selectService(
                              service
                            )
                          }
                          className={`flex flex-col gap-2 rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200 ${
                            selectedServiceId ===
                            service.id
                              ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                              : "border-slate-200 text-slate-600 hover:border-z-accent/50 hover:text-slate-900 dark:border-z-border dark:text-z-muted dark:hover:text-z-text"
                          }`}
                        >
                          <span className="text-xl">
                            {
                              service.icon
                            }
                          </span>

                          <span className="text-xs leading-snug">
                            {getLabel(
                              service.label
                            )}
                          </span>

                          {selectedServiceId ===
                            service.id && (
                            <span className="text-[10px] font-bold text-z-accent">
                              {formatPrice(
                                service.baseMin
                              )}
                              {" — "}
                              {formatPrice(
                                service.baseMax
                              )}
                            </span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 1 */}

            {step === 1 && (
              <motion.div
                key="step-business"
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
                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-z-muted">
                  {t(
                    "pricing.business_type",
                    "Business Type"
                  )}
                </p>

                <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {businessTypes.map(
                    (
                      business
                    ) => (
                      <button
                        key={
                          business
                        }
                        type="button"
                        onClick={() =>
                          setBizType(
                            business
                          )
                        }
                        className={`rounded-xl border p-3 text-left text-sm font-medium transition-all duration-200 ${
                          bizType ===
                          business
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 text-slate-600 hover:border-z-accent/50 dark:border-z-border dark:text-z-muted"
                        }`}
                      >
                        {bizType ===
                          business && (
                          <Check
                            size={
                              12
                            }
                            className="mr-1 inline text-z-accent"
                          />
                        )}

                        {
                          business
                        }
                      </button>
                    )
                  )}
                </div>

                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-z-muted">
                  {t(
                    "pricing.complexity",
                    "Project Complexity"
                  )}
                </p>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {complexities.map(
                    (
                      item
                    ) => (
                      <button
                        key={
                          item.key
                        }
                        type="button"
                        onClick={() =>
                          setComplexity(
                            item.key
                          )
                        }
                        className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all duration-200 ${
                          complexity ===
                          item.key
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 text-slate-600 hover:border-z-accent/50 dark:border-z-border dark:text-z-muted"
                        }`}
                      >
                        {complexity ===
                          item.key && (
                          <Check
                            size={
                              10
                            }
                            className="mr-1 inline"
                          />
                        )}

                        {
                          item.label
                        }
                      </button>
                    )
                  )}
                </div>

                {(selectedService
                  ?.features
                  ?.length ??
                  0) > 0 && (
                  <>
                    <p className="mb-3 mt-6 text-sm font-medium text-slate-700 dark:text-z-muted">
                      {t(
                        "pricing.addons",
                        "Add-on Features"
                      )}
                    </p>

                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {selectedService?.features?.map(
                        (
                          feature
                        ) => (
                          <button
                            key={
                              feature.id
                            }
                            type="button"
                            onClick={() =>
                              toggleFeature(
                                feature.id
                              )
                            }
                            className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                              selectedFeatures.includes(
                                feature.id
                              )
                                ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                                : "border-slate-200 text-slate-600 hover:border-z-accent/50 dark:border-z-border dark:text-z-muted"
                            }`}
                          >
                            <span>
                              {getLabel(
                                feature.label
                              )}
                            </span>

                            <span className="text-[10px] font-bold text-z-accent">
                              +
                              {formatPrice(
                                feature.flatAdd
                              )}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <motion.div
                key="step-budget"
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
                <p className="mb-2 text-sm font-medium text-slate-700 dark:text-z-muted">
                  {t(
                    "pricing.budget",
                    "Estimated Project Budget"
                  )}
                </p>

                <div className="mb-4 text-center text-4xl font-extrabold text-z-accent">
                  {formatPrice(
                    budget
                  )}
                </div>

                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(
                    event
                  ) =>
                    setBudget(
                      Number(
                        event.target
                          .value
                      )
                    )
                  }
                  className="mb-1 w-full cursor-pointer accent-z-accent"
                />

                <div className="mb-6 flex justify-between text-xs text-slate-500 dark:text-z-muted">
                  <span>
                    ₹5,000
                  </span>

                  <span>
                    ₹5,00,000+
                  </span>
                </div>

                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-z-muted">
                  {t(
                    "pricing.timeline",
                    "Timeline"
                  )}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {timelines.map(
                    (
                      item
                    ) => (
                      <button
                        key={
                          item.key
                        }
                        type="button"
                        onClick={() =>
                          setTimeline(
                            item.key
                          )
                        }
                        className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${
                          timeline ===
                          item.key
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 text-slate-600 hover:border-z-accent/50 dark:border-z-border dark:text-z-muted"
                        }`}
                      >
                        {timeline ===
                          item.key && (
                          <Check
                            size={
                              10
                            }
                            className="mr-1 inline"
                          />
                        )}

                        {
                          item.label
                        }
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <motion.div
                key="step-quote"
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
                  <div className="flex flex-col items-center justify-center gap-3 py-12">
                    <Loader2
                      size={28}
                      className="animate-spin text-z-accent"
                    />

                    <p className="text-sm text-z-muted">
                      Calculating
                      your estimate...
                    </p>
                  </div>
                ) : (
                  <>
                    {quoteError && (
                      <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                        <AlertCircle
                          size={
                            15
                          }
                          className="mt-0.5 shrink-0"
                        />

                        <span>
                          {
                            quoteError
                          }
                        </span>
                      </div>
                    )}

                    <div className="rounded-2xl border border-z-accent/20 bg-z-accent/5 p-6">
                      <div className="mb-1 text-lg font-bold text-slate-900 dark:text-z-text">
                        {quote?.service
                          ?.icon ||
                          selectedService?.icon ||
                          "💼"}{" "}
                        {getLabel(
                          quote?.service
                            ?.label
                        ) ||
                          getLabel(
                            selectedService?.label
                          ) ||
                          "Your Project"}
                      </div>

                      <div className="mb-4 text-sm text-slate-600 dark:text-z-muted">
                        {quote
                          ?.recommendedPackage
                          ? getLabel(
                              quote
                                .recommendedPackage
                                .name
                            )
                          : "Custom Package"}
                        {" — "}
                        tailored for your
                        needs
                      </div>

                      {(quote
                        ?.recommendedPackage
                        ?.features
                        ?.length ??
                        0) >
                        0 && (
                        <div className="mb-5 flex flex-wrap gap-2">
                          {quote?.recommendedPackage?.features?.map(
                            (
                              feature
                            ) => (
                              <span
                                key={
                                  feature
                                }
                                className="flex items-center gap-1 rounded-full border border-z-accent/20 bg-z-accent/10 px-3 py-1 text-xs font-medium text-z-accent"
                              >
                                <Check
                                  size={
                                    10
                                  }
                                />

                                {
                                  feature
                                }
                              </span>
                            )
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-z-border">
                        <div>
                          <div className="mb-1 text-xs uppercase tracking-wide text-slate-500 dark:text-z-muted">
                            Estimated
                            Investment
                          </div>

                          <div className="text-2xl font-extrabold text-z-accent">
                            {formatPrice(
                              estimateMin
                            )}
                            {" — "}
                            {formatPrice(
                              estimateMax
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="mb-1 text-xs uppercase tracking-wide text-slate-500 dark:text-z-muted">
                            Delivery
                          </div>

                          <div className="text-base font-bold text-slate-900 dark:text-z-text">
                            {quote?.delivery ||
                              "4–8 Weeks"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={
                        contactUrl
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-z-accent py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:opacity-90"
                    >
                      {t(
                        "pricing.consultation",
                        "Get Free Consultation"
                      )}

                      <ArrowRight
                        size={15}
                      />
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* NAVIGATION */}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() =>
                setStep(
                  (
                    currentStep
                  ) =>
                    Math.max(
                      0,
                      currentStep -
                        1
                    )
                )
              }
              disabled={
                step === 0 ||
                loadingQuote
              }
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:text-slate-900 disabled:opacity-30 dark:border-z-border dark:text-z-muted dark:hover:text-z-text"
            >
              {t(
                "pricing.back",
                "Back"
              )}
            </button>

            {step < 3 && (
              <button
                type="button"
                onClick={() => {
                  if (
                    step === 2
                  ) {
                    void getQuote();
                    return;
                  }

                  setStep(
                    (
                      currentStep
                    ) =>
                      Math.min(
                        3,
                        currentStep +
                          1
                      )
                  );
                }}
                disabled={
                  loadingQuote ||
                  (step === 0 &&
                    !selectedServiceId) ||
                  (step === 1 &&
                    !bizType)
                }
                className="flex items-center gap-2 rounded-full bg-z-accent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-40"
              >
                {loadingQuote && (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                )}

                {step === 2
                  ? t(
                      "pricing.get_quote",
                      "Get Quote"
                    )
                  : t(
                      "pricing.next",
                      "Next"
                    )}

                <ArrowRight
                  size={14}
                />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
