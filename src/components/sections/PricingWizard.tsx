"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

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
  service: {
    id: string;
    label: LocalizedText;
    icon: string;
  };
  estimate: {
    min: number;
    max: number;
  };
  delivery: string;
  recommendedPackage: PricingPackage | null;
}

const BUSINESS_TYPES = {
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
      hi: "",
      pa: "",
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
      hi: "",
      pa: "",
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
      hi: "",
      pa: "",
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
      hi: "",
      pa: "",
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
      hi: "",
      pa: "",
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
      hi: "",
      pa: "",
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

  const currentLang =
    lang === "hi" || lang === "pa" ? lang : "en";

  const [step, setStep] = useState(0);
  const [services, setServices] =
    useState<PricingService[]>([]);
  const [loadingServices, setLoadingServices] =
    useState(true);
  const [loadingQuote, setLoadingQuote] =
    useState(false);

  const [selectedServiceId, setSelectedServiceId] =
    useState("");

  const [bizType, setBizType] = useState("");
  const [complexity, setComplexity] =
    useState("standard");

  const [selectedFeatures, setSelectedFeatures] =
    useState<string[]>([]);

  const [budget, setBudget] = useState(25000);
  const [timeline, setTimeline] = useState("normal");

  const [quote, setQuote] =
    useState<QuoteResult | null>(null);

  const steps = [
    t("pricing.step.service", "Service"),
    t("pricing.step.business", "Business"),
    t("pricing.step.budget", "Budget"),
    t("pricing.step.quote", "Quote"),
  ];

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await api.get(
          "/pricing/services"
        );

        const receivedServices = data?.data;

        if (
          Array.isArray(receivedServices) &&
          receivedServices.length > 0
        ) {
          setServices(receivedServices);
        } else {
          setServices(FALLBACK_SERVICES);
        }
      } catch {
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoadingServices(false);
      }
    };

    loadServices();
  }, []);

  const selectedService =
    services.find(
      (service) =>
        service.id === selectedServiceId
    ) ?? null;

  const getLabel = (
    value: LocalizedText | undefined | null
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

  const formatPrice = (amount: number) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const businessTypes =
    BUSINESS_TYPES[currentLang];

  const timelines =
    TIMELINES[currentLang];

  const complexities =
    COMPLEXITY[currentLang];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((previous) => {
      if (previous.includes(featureId)) {
        return previous.filter(
          (id) => id !== featureId
        );
      }

      return [...previous, featureId];
    });
  };

  const getQuote = async () => {
    if (!selectedServiceId || !bizType) {
      return;
    }

    setLoadingQuote(true);
    setQuote(null);

    try {
      const { data } = await api.post(
        "/pricing/calculate",
        {
          serviceId: selectedServiceId,
          businessType: bizType,
          complexity,
          features: selectedFeatures,
          timeline,
          budget,
        }
      );

      if (data?.data) {
        setQuote(data.data);
      }
    } catch {
      setQuote(null);
    } finally {
      setLoadingQuote(false);
      setStep(3);
    }
  };

  const fallbackMin = selectedService
    ? selectedService.baseMin
    : Math.round(budget * 0.8);

  const fallbackMax = selectedService
    ? selectedService.baseMax
    : Math.round(budget * 1.2);

  return (
    <section
      id="pricing"
      className="relative z-10 py-24 px-4 md:px-6 bg-slate-50 dark:bg-z-dark2 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-z-accent/10 text-z-accent border border-z-border">
            {t(
              "pricing.badge",
              "Transparent Pricing"
            )}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-z-text leading-tight tracking-tight mb-4">
            {t(
              "pricing.title",
              "Estimate Your Project"
            )}
          </h2>

          <p className="text-base text-slate-600 dark:text-z-muted max-w-xl leading-relaxed">
            {t(
              "pricing.sub",
              "Get a free estimate for website development, mobile apps, custom software, SaaS development, AI integration, or digital marketing services."
            )}
          </p>
        </motion.div>

        {/* Pricing Wizard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="bg-white dark:bg-z-dark3/60 border border-slate-200 dark:border-z-border backdrop-blur-xl shadow-xl dark:shadow-card p-6 md:p-10 max-w-3xl rounded-3xl"
        >
          {/* Steps */}
          <div className="flex border-b border-slate-200 dark:border-z-border mb-8">
            {steps.map((stepName, index) => (
              <button
                key={`${stepName}-${index}`}
                type="button"
                onClick={() => {
                  if (
                    index <= step &&
                    !loadingQuote
                  ) {
                    setStep(index);
                  }
                }}
                className={`px-3 md:px-4 py-3 text-xs font-semibold tracking-wide transition-all duration-200 border-b-2 -mb-px flex-1 ${
                  step === index
                    ? "border-z-accent text-z-accent"
                    : index < step
                    ? "border-transparent text-slate-800 dark:text-z-text cursor-pointer"
                    : "border-transparent text-slate-400 dark:text-z-muted cursor-not-allowed"
                }`}
              >
                {stepName}
              </button>
            ))}
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
                  <div className="flex items-center justify-center py-12">
                    <Loader2
                      size={24}
                      className="animate-spin text-z-accent"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                          setSelectedServiceId(
                            service.id
                          );
                          setSelectedFeatures([]);
                          setQuote(null);
                        }}
                        className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 text-left flex flex-col gap-2 ${
                          selectedServiceId ===
                          service.id
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                        }`}
                      >
                        <span className="text-xl">
                          {service.icon}
                        </span>

                        <span className="text-xs leading-snug">
                          {getLabel(
                            service.label
                          )}
                        </span>

                        {selectedServiceId ===
                          service.id && (
                          <span className="text-[10px] text-z-accent font-bold">
                            {formatPrice(
                              service.baseMin
                            )}{" "}
                            —{" "}
                            {formatPrice(
                              service.baseMax
                            )}
                          </span>
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
                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3">
                  {t(
                    "pricing.business_type",
                    "Business Type"
                  )}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {businessTypes.map(
                    (business) => (
                      <button
                        key={business}
                        type="button"
                        onClick={() =>
                          setBizType(business)
                        }
                        className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                          bizType === business
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                        }`}
                      >
                        {bizType === business && (
                          <Check
                            size={12}
                            className="inline mr-1 text-z-accent"
                          />
                        )}

                        {business}
                      </button>
                    )
                  )}
                </div>

                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3">
                  {t(
                    "pricing.complexity",
                    "Project Complexity"
                  )}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {complexities.map(
                    (item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setComplexity(
                            item.key
                          )
                        }
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all duration-200 text-center ${
                          complexity === item.key
                            ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                            : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                        }`}
                      >
                        {complexity ===
                          item.key && (
                          <Check
                            size={10}
                            className="inline mr-1"
                          />
                        )}

                        {item.label}
                      </button>
                    )
                  )}
                </div>

                {/* SAFE FEATURES CHECK */}
                {(selectedService?.features
                  ?.length ?? 0) > 0 && (
                  <>
                    <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3 mt-6">
                      {t(
                        "pricing.addons",
                        "Add-on Features"
                      )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedService?.features?.map(
                        (feature) => (
                          <button
                            key={feature.id}
                            type="button"
                            onClick={() =>
                              toggleFeature(
                                feature.id
                              )
                            }
                            className={`p-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between ${
                              selectedFeatures.includes(
                                feature.id
                              )
                                ? "border-z-accent3 bg-z-accent3/10 text-slate-900 dark:text-z-text"
                                : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent3/40 hover:text-slate-900 dark:hover:text-z-text"
                            }`}
                          >
                            <span>
                              {getLabel(
                                feature.label
                              )}
                            </span>

                            <span className="text-[10px] text-z-accent3 font-bold">
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
                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-2">
                  {t(
                    "pricing.budget",
                    "Estimated Project Budget"
                  )}
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
                  onChange={(event) =>
                    setBudget(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="w-full accent-z-accent mb-1 cursor-pointer"
                />

                <div className="flex justify-between text-xs text-slate-500 dark:text-z-muted mb-6">
                  <span>₹5,000</span>
                  <span>₹5,00,000+</span>
                </div>

                <p className="text-sm font-medium text-slate-700 dark:text-z-muted mb-3">
                  {t(
                    "pricing.timeline",
                    "Timeline"
                  )}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {timelines.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setTimeline(item.key)
                      }
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                        timeline === item.key
                          ? "border-z-accent bg-z-accent/10 text-slate-900 dark:text-z-text"
                          : "border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:border-z-accent/50 hover:text-slate-900 dark:hover:text-z-text"
                      }`}
                    >
                      {timeline === item.key && (
                        <Check
                          size={10}
                          className="inline mr-1"
                        />
                      )}

                      {item.label}
                    </button>
                  ))}
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
                  <div className="flex items-center justify-center py-12">
                    <Loader2
                      size={24}
                      className="animate-spin text-z-accent"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-z-accent/20 bg-z-accent/5 p-6">
                    <div className="text-lg font-bold text-slate-900 dark:text-z-text mb-1">
                      {quote?.service?.icon ||
                        selectedService?.icon ||
                        "💼"}{" "}
                      {getLabel(
                        quote?.service?.label
                      ) ||
                        getLabel(
                          selectedService?.label
                        ) ||
                        "Your Project"}
                    </div>

                    <div className="text-sm text-slate-600 dark:text-z-muted mb-4">
                      {quote?.recommendedPackage
                        ? getLabel(
                            quote
                              .recommendedPackage
                              .name
                          )
                        : "Custom Package"}{" "}
                      — tailored for your needs
                    </div>

                    {(
                      quote
                        ?.recommendedPackage
                        ?.features?.length ?? 0
                    ) > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {quote?.recommendedPackage?.features?.map(
                          (feature) => (
                            <span
                              key={feature}
                              className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-z-accent/10 border border-z-accent/20 text-z-accent"
                            >
                              <Check size={10} />
                              {feature}
                            </span>
                          )
                        )}
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
                                quote.estimate
                                  .min
                              )} — ${formatPrice(
                                quote.estimate
                                  .max
                              )}`
                            : `${formatPrice(
                                fallbackMin
                              )} — ${formatPrice(
                                fallbackMax
                              )}`}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-500 dark:text-z-muted uppercase tracking-wide mb-1">
                          Delivery
                        </div>

                        <div className="text-base font-bold text-slate-900 dark:text-z-text">
                          {quote?.delivery ||
                            "4-8 Weeks"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-glow-sm"
                >
                  {t(
                    "pricing.consultation",
                    "Get Free Consultation"
                  )}

                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() =>
                setStep((currentStep) =>
                  Math.max(
                    0,
                    currentStep - 1
                  )
                )
              }
              disabled={
                step === 0 ||
                loadingQuote
              }
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-z-border text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text disabled:opacity-30 transition-all duration-200"
            >
              {t("pricing.back", "Back")}
            </button>

            {step < 3 && (
              <button
                type="button"
                onClick={() => {
                  if (step === 2) {
                    void getQuote();
                  } else {
                    setStep(
                      (currentStep) =>
                        Math.min(
                          3,
                          currentStep + 1
                        )
                    );
                  }
                }}
                disabled={
                  loadingQuote ||
                  (step === 0 &&
                    !selectedServiceId) ||
                  (step === 1 && !bizType)
                }
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-z-accent text-white hover:opacity-90 disabled:opacity-40 transition-all duration-200 flex items-center gap-2"
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

                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
