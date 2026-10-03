"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  Palette,
  CheckCircle2,
  Download,
  Calculator,
  Zap,
  ShieldCheck,
  Heart,
  Users,
  AlertCircle,
  Mail,
  Phone,
  Search,
  Megaphone,
  TrendingUp,
  X,
  Sparkles,
} from "lucide-react";
import api from "@/lib/api";

const SERVICE_CATEGORIES = [
  {
    id: "web",
    label: "Website Development",
    icon: Globe,
    color: "#2563eb",
    services: [
      { id: "starter", label: "Starter Website", desc: "1-5 pages, mobile responsive", basePrice: 7999 },
      { id: "business", label: "Business Website", desc: "5-15 pages, CMS, blog", basePrice: 15999 },
      { id: "premium", label: "Premium Website", desc: "15-30 pages, custom design", basePrice: 29999 },
      { id: "ecommerce", label: "E-Commerce Store", desc: "Unlimited products, payment", basePrice: 49999 },
      { id: "webapp", label: "Custom Web App", desc: "Dashboards, integrations", basePrice: 79999 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: Smartphone,
    color: "#7c3aed",
    services: [
      { id: "android", label: "Android App", desc: "Native Android", basePrice: 79999 },
      { id: "ios", label: "iOS App", desc: "Native iOS", basePrice: 89999 },
      { id: "cross", label: "Cross-Platform App", desc: "iOS + Android (React Native)", basePrice: 89999 },
    ],
  },
  {
    id: "software",
    label: "Custom Software",
    icon: Code2,
    color: "#0891b2",
    services: [
      { id: "crm", label: "CRM System", desc: "Sales pipeline, leads", basePrice: 99999 },
      { id: "erp", label: "ERP System", desc: "Business management", basePrice: 149999 },
      { id: "saas", label: "SaaS Platform", desc: "Multi-tenant, subscriptions", basePrice: 199999 },
    ],
  },
  {
    id: "design",
    label: "UI/UX Design",
    icon: Palette,
    color: "#ea580c",
    services: [
      { id: "wireframe", label: "Wireframes", desc: "Basic layout design", basePrice: 9999 },
      { id: "design-system", label: "Design System", desc: "Complete design system", basePrice: 19999 },
      { id: "prototype", label: "Interactive Prototype", desc: "Clickable prototype", basePrice: 14999 },
    ],
  },
  {
    id: "seo",
    label: "SEO Services",
    icon: Search,
    color: "#059669",
    services: [
      { id: "seo-starter", label: "SEO Starter", desc: "Basic on-page + 10 keywords", basePrice: 7999, monthly: true },
      { id: "seo-growth", label: "SEO Growth", desc: "Advanced + 25 keywords", basePrice: 15999, monthly: true },
      { id: "seo-enterprise", label: "SEO Enterprise", desc: "Full SEO + 50+ keywords", basePrice: 29999, monthly: true },
    ],
  },
  {
    id: "digital",
    label: "Digital Marketing",
    icon: Megaphone,
    color: "#dc2626",
    services: [
      { id: "social", label: "Social Media Marketing", desc: "Content + posting", basePrice: 9999, monthly: true },
      { id: "content", label: "Content Marketing", desc: "Blogs, articles, videos", basePrice: 9999, monthly: true },
      { id: "email", label: "Email Marketing", desc: "Campaigns + automation", basePrice: 7999, monthly: true },
      { id: "full-marketing", label: "Full Digital Marketing", desc: "Complete package", basePrice: 24999, monthly: true },
    ],
  },
  {
    id: "ads",
    label: "Paid Ads",
    icon: TrendingUp,
    color: "#7c3aed",
    services: [
      { id: "google-ads", label: "Google Ads", desc: "Search + Display campaigns", basePrice: 9999, monthly: true, adSpendSeparate: true },
      { id: "meta-ads", label: "Meta Ads (FB + Insta)", desc: "Facebook + Instagram ads", basePrice: 9999, monthly: true, adSpendSeparate: true },
      { id: "linkedin-ads", label: "LinkedIn Ads", desc: "B2B campaigns", basePrice: 11999, monthly: true, adSpendSeparate: true },
      { id: "ads-full", label: "Full Ads Management", desc: "Google + Meta + More", basePrice: 24999, monthly: true, adSpendSeparate: true },
    ],
  },
  {
    id: "ai",
    label: "AI Integration",
    icon: Sparkles,
    color: "#be185d",
    services: [
      { id: "chatbot", label: "AI Chatbot", desc: "Customer support bot", basePrice: 29999 },
      { id: "automation", label: "Workflow Automation", desc: "Business automation", basePrice: 39999 },
      { id: "analytics", label: "AI Analytics", desc: "Predictive analytics", basePrice: 49999 },
    ],
  },
];

const ADD_ONS = [
  { id: "extra-pages", label: "Extra Pages (5-10)", price: 4999 },
  { id: "payment", label: "Payment Gateway Integration", price: 4999 },
  { id: "login", label: "User Login System", price: 7999 },
  { id: "dashboard", label: "Admin/User Dashboard", price: 9999 },
  { id: "api", label: "API Integration", price: 5999 },
  { id: "multilang", label: "Multi-Language", price: 5999 },
  { id: "speed", label: "Speed Optimization", price: 2999 },
];

const COMPLEXITY_OPTIONS = [
  { value: "basic", label: "Basic", multiplier: 0.9 },
  { value: "standard", label: "Standard", multiplier: 1.0 },
  { value: "advanced", label: "Advanced", multiplier: 1.4 },
  { value: "enterprise", label: "Enterprise", multiplier: 2.0 },
];

const TIMELINE_OPTIONS = [
  { value: "flexible", label: "Flexible", multiplier: 0.9 },
  { value: "standard", label: "Standard (1-2 months)", multiplier: 1.0 },
  { value: "fast", label: "Fast-Track (2-4 weeks)", multiplier: 1.3 },
  { value: "urgent", label: "Urgent (ASAP)", multiplier: 1.6 },
];

function formatPrice(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function PricingWizard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const [categoryId, setCategoryId] = useState("web");
  const [serviceId, setServiceId] = useState("starter");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [complexity, setComplexity] = useState("standard");
  const [timeline, setTimeline] = useState("standard");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const [referralCode, setReferralCode] = useState("");
  const [referralApplied, setReferralApplied] = useState(false);
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [referralMessage, setReferralMessage] = useState("");
  const [verifyingReferral, setVerifyingReferral] = useState(false);
  const [referralError, setReferralError] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const currentCategory = SERVICE_CATEGORIES.find((c) => c.id === categoryId);
  const currentService = currentCategory?.services.find((s) => s.id === serviceId);

  useEffect(() => {
    if (currentCategory && !currentCategory.services.find((s) => s.id === serviceId)) {
      setServiceId(currentCategory.services[0].id);
    }
  }, [categoryId, currentCategory, serviceId]);

  const calculateEstimate = () => {
    if (!currentService) return { base: 0, addOnsTotal: 0, subtotal: 0, discounted: 0, low: 0, high: 0 };

    const basePrice = currentService.basePrice;
    const addOnsTotal = addOns.reduce((sum, id) => {
      const addon = ADD_ONS.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    const complexityMult = COMPLEXITY_OPTIONS.find((c) => c.value === complexity)?.multiplier || 1;
    const timelineMult = TIMELINE_OPTIONS.find((t) => t.value === timeline)?.multiplier || 1;

    const subtotal = (basePrice + addOnsTotal) * complexityMult * timelineMult;

    let discounted = subtotal;
    if (referralApplied && referralDiscount > 0) {
      const discountAmount = subtotal * (referralDiscount / 100);
      discounted = subtotal - discountAmount;
      const floor = subtotal * 0.85;
      discounted = Math.max(discounted, floor);
    }

    const low = Math.round(discounted * 0.9);
    const high = Math.round(discounted * 1.15);

    return { base: basePrice, addOnsTotal, subtotal, discounted, low, high };
  };

  const estimate = calculateEstimate();

  const verifyReferral = async () => {
    if (!referralCode.trim()) {
      setReferralError("Please enter a referral code");
      return;
    }

    setVerifyingReferral(true);
    setReferralError("");
    setReferralMessage("");

    try {
      const { data } = await api.post("/referrals/verify", {
        code: referralCode.trim().toUpperCase(),
      });

      if (data?.valid) {
        setReferralApplied(true);
        setReferralDiscount(data.discountPercent);
        setReferralMessage(data.message);
        setReferralError("");
      } else {
        setReferralApplied(false);
        setReferralDiscount(0);
        setReferralError(data?.message || "Invalid referral code");
      }
    } catch (err: any) {
      setReferralApplied(false);
      setReferralDiscount(0);
      setReferralError(err?.response?.data?.message || "Invalid referral code");
    } finally {
      setVerifyingReferral(false);
    }
  };

  const removeReferral = () => {
    setReferralCode("");
    setReferralApplied(false);
    setReferralDiscount(0);
    setReferralMessage("");
    setReferralError("");
  };

  const toggleAddOn = (id: string) => {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!agreed) {
      setError("Please agree to be contacted");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: currentService?.label || "Budget Calculator",
        message: `📋 PROJECT ESTIMATE REQUEST\n\nCategory: ${currentCategory?.label}\nService: ${currentService?.label}\nDescription: ${projectDesc || "Not provided"}\nComplexity: ${complexity}\nTimeline: ${timeline}\nAdd-Ons: ${addOns.length > 0 ? addOns.map(id => ADD_ONS.find(a => a.id === id)?.label).join(", ") : "None"}\n\nBase: ${formatPrice(estimate.base)}\nAdd-Ons: ${formatPrice(estimate.addOnsTotal)}\nSubtotal: ${formatPrice(estimate.subtotal)}\n${referralApplied ? `Referral Discount: -${referralDiscount}% (₹${Math.round(estimate.subtotal - estimate.discounted).toLocaleString("en-IN")})\n` : ""}Final Range: ${formatPrice(estimate.low)} - ${formatPrice(estimate.high)}`,
        source: "budget-calculator",
        priority: "high",
        referralCode: referralApplied ? referralCode.toUpperCase() : "",
        baseEstimate: estimate.subtotal,
        finalEstimate: estimate.discounted,
        projectType: currentService?.label,
        projectDetails: {
          category: currentCategory?.label,
          service: currentService?.label,
          complexity,
          timeline,
          addOns,
          description: projectDesc,
        },
      };

      const { data } = await api.post("/leads", payload);

      if (data?.success !== false) {
        setSubmitted(true);
      } else {
        setError(data?.message || "Failed to submit. Please try again.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadQuote = () => {
    const content = `
═══════════════════════════════════════════════════════════
                ZENTROX TECHNOLOGIES
              Project Estimate & Quote
═══════════════════════════════════════════════════════════

DATE: ${new Date().toLocaleDateString("en-IN")}
QUOTE ID: ZT-${Date.now().toString().slice(-8)}

─────────────────────────────────────────────────────────
CLIENT DETAILS
─────────────────────────────────────────────────────────
Name:     ${name || "Not provided"}
Email:    ${email || "Not provided"}
Phone:    ${phone || "Not provided"}

─────────────────────────────────────────────────────────
PROJECT DETAILS
─────────────────────────────────────────────────────────
Category:     ${currentCategory?.label}
Service:      ${currentService?.label}
Description:  ${projectDesc || "Not provided"}
Complexity:   ${complexity}
Timeline:     ${timeline}
Add-Ons:      ${addOns.length > 0 ? addOns.map(id => ADD_ONS.find(a => a.id === id)?.label).join(", ") : "None"}

─────────────────────────────────────────────────────────
PRICE BREAKDOWN
─────────────────────────────────────────────────────────
Base Price:           ${formatPrice(estimate.base)}
Add-Ons Total:        ${formatPrice(estimate.addOnsTotal)}
Complexity Multiplier: ${COMPLEXITY_OPTIONS.find(c => c.value === complexity)?.multiplier}x
Timeline Multiplier:  ${TIMELINE_OPTIONS.find(t => t.value === timeline)?.multiplier}x
Subtotal:             ${formatPrice(estimate.subtotal)}

${referralApplied ? `Referral Discount:    -${referralDiscount}% (₹${Math.round(estimate.subtotal - estimate.discounted).toLocaleString("en-IN")})\nFinal Amount:         ${formatPrice(estimate.discounted)}` : `Final Amount:         ${formatPrice(estimate.subtotal)}`}

─────────────────────────────────────────────────────────
ESTIMATED RANGE
─────────────────────────────────────────────────────────
${formatPrice(estimate.low)}  –  ${formatPrice(estimate.high)}

Note: Domain & hosting charges are separate.
Final quote may vary based on detailed requirements.

─────────────────────────────────────────────────────────
CONTACT ZENTROX TECHNOLOGIES
─────────────────────────────────────────────────────────
📧 contact.zentroxtech@gmail.com
📧 info.zentroxtechnologies@gmail.com
📞 +91 89881 83513
📞 +91 94592 85513
🌐 zentroxtechnologies.com

Thank you for choosing Zentrox Technologies!
═══════════════════════════════════════════════════════════
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Zentrox-Estimate-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="budget-calculator"
      aria-label="Project budget calculator"
      className="relative overflow-hidden bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -right-40 top-60 h-[500px] w-[500px] rounded-full bg-purple-100/40 blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <Zap size={13} />
            Instant Estimate
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Transparent Pricing</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
            Website &amp; App
            <br />
            <span className="gradient-text">Budget Calculator</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Get an instant estimate for your project. Tell us your requirements
            and get a tailored proposal from Zentrox Technologies within 24 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT FORM */}
            <div className="border-b border-slate-100 p-6 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r lg:p-10">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Estimate Sent to Team!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
                    Thank you, <strong>{name}</strong>. Your project estimate
                    has been sent to the Zentrox Technologies team.
                  </p>
                  <div className="mx-auto mt-4 max-w-md rounded-xl bg-blue-50 p-4 text-left">
                    <p className="text-xs font-bold text-slate-700">What happens next:</p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      <li>✓ Our team will review your requirements</li>
                      <li>✓ We'll contact you within 24 hours</li>
                      <li>✓ You'll receive a detailed proposal</li>
                    </ul>
                  </div>
                  <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={handleDownloadQuote}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white"
                    >
                      <Download size={15} />
                      Download PDF
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setAgreed(false);
                        removeReferral();
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700"
                    >
                      New Estimate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1: Category */}
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 1 — Service Category
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {SERVICE_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const active = categoryId === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategoryId(cat.id)}
                            className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
                              active
                                ? "border-blue-500 bg-blue-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-blue-200"
                            }`}
                          >
                            <div
                              className="flex h-9 w-9 items-center justify-center rounded-lg"
                              style={{
                                backgroundColor: active ? `${cat.color}20` : `${cat.color}10`,
                                color: cat.color,
                              }}
                            >
                              <Icon size={16} />
                            </div>
                            <p className="text-[11px] font-semibold text-slate-900 leading-tight">
                              {cat.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 2: Service */}
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 2 — Select Service
                    </label>
                    <div className="space-y-2">
                      {currentCategory?.services.map((svc) => {
                        const active = serviceId === svc.id;
                        return (
                          <button
                            key={svc.id}
                            type="button"
                            onClick={() => setServiceId(svc.id)}
                            className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                              active
                                ? "border-blue-500 bg-blue-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-blue-200"
                            }`}
                          >
                            <div
                              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                                active ? "border-blue-600 bg-blue-600" : "border-slate-300"
                              }`}
                            >
                              {active && <CheckCircle2 size={12} className="text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-bold text-slate-900">{svc.label}</p>
                                <p className="text-sm font-extrabold text-blue-600">
                                  {formatPrice(svc.basePrice)}
                                  {(svc as any).monthly && <span className="text-xs text-slate-500">/mo</span>}
                                </p>
                              </div>
                              <p className="mt-0.5 text-xs text-slate-500">{svc.desc}</p>
                              {(svc as any).adSpendSeparate && (
                                <p className="mt-1 text-[10px] text-amber-600">
                                  ⚡ Ad spend (Google/Meta) charged separately
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 3: Add-Ons */}
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 3 — Add-Ons (Optional)
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {ADD_ONS.map((addon) => {
                        const active = addOns.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddOn(addon.id)}
                            className={`flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-all ${
                              active
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 bg-white hover:border-blue-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                                  active ? "border-blue-600 bg-blue-600" : "border-slate-300"
                                }`}
                              >
                                {active && <CheckCircle2 size={10} className="text-white" />}
                              </div>
                              <span className="text-xs font-medium text-slate-900">
                                {addon.label}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-blue-600">
                              +{formatPrice(addon.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 4: Complexity + Timeline */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-700">
                        Project Complexity
                      </label>
                      <select
                        value={complexity}
                        onChange={(e) => setComplexity(e.target.value)}
                        className="input-field"
                      >
                        {COMPLEXITY_OPTIONS.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-700">
                        Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="input-field"
                      >
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* STEP 5: Referral */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 5 — Referral Code (Optional)
                    </label>
                    {referralApplied ? (
                      <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={18} className="text-emerald-600" />
                          <div>
                            <p className="text-sm font-bold text-emerald-700">
                              {referralCode.toUpperCase()} — {referralDiscount}% OFF
                            </p>
                            <p className="text-[10px] text-emerald-600">{referralMessage}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeReferral}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600 hover:bg-emerald-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                          placeholder="Enter referral code"
                          className="input-field flex-1 font-mono uppercase"
                        />
                        <button
                          type="button"
                          onClick={verifyReferral}
                          disabled={verifyingReferral || !referralCode.trim()}
                          className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {verifyingReferral ? "Verifying..." : "Apply"}
                        </button>
                      </div>
                    )}
                    {referralError && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={12} /> {referralError}
                      </p>
                    )}
                    <p className="mt-2 text-[10px] text-slate-500">
                      💡 Have a referral code? Apply it to get up to 20% off!
                    </p>
                  </div>

                  {/* STEP 6: Contact */}
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 6 — Your Details
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name *"
                        className="input-field"
                        required
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address *"
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp *"
                        className="input-field"
                        required
                      />
                      <input
                        type="text"
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        placeholder="Project description (optional)"
                        className="input-field"
                      />
                    </div>
                  </div>

                  {/* Agreement */}
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
                      required
                    />
                    <span className="text-xs text-slate-600">
                      I agree to be contacted by Zentrox Technologies regarding this estimate.
                    </span>
                  </label>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!agreed || submitting}
                    className={`group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all ${
                      !agreed || submitting
                        ? "cursor-not-allowed opacity-60"
                        : "hover:-translate-y-1 hover:shadow-xl"
                    }`}
                  >
                    {submitting ? "Sending to Team..." : "Get My Estimate"}
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT ESTIMATE PANEL */}
            <div className="bg-gradient-to-br from-blue-50/40 via-white to-purple-50/40 p-6 sm:p-8 lg:col-span-4 lg:p-10">
              <div className="lg:sticky lg:top-24">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700 shadow-sm">
                  <Calculator size={11} />
                  Estimated Budget
                </div>

                <h3 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  Your Project Estimate
                </h3>
                <p className="mt-1 text-sm text-slate-600">Based on your selections</p>

                <div className="my-6 rounded-2xl border border-blue-200/60 bg-white p-6 shadow-sm">
                  <p className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                    {formatPrice(estimate.low)}
                    <span className="mx-1.5 text-slate-400">–</span>
                    {formatPrice(estimate.high)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    (May vary based on final requirements)
                  </p>
                  {referralApplied && (
                    <div className="mt-3 rounded-lg bg-emerald-50 p-2 text-center text-xs font-bold text-emerald-700">
                      🎁 {referralDiscount}% Referral Discount Applied!
                    </div>
                  )}
                </div>

                <ul className="mb-6 space-y-3">
                  {[
                    "Professional development team",
                    "Clean, modern & responsive design",
                    "SEO friendly structure",
                    "Post-launch support",
                    "On-time delivery",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-1"
                  >
                    <Mail size={15} />
                    Talk to Our Experts
                    <ArrowRight size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleDownloadQuote}
                    className="group flex w-full items-center justify-center gap-2 rounded-full border border-blue-300 bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 transition-all hover:-translate-y-1 hover:bg-blue-50"
                  >
                    <Download size={15} />
                    Download Detailed Quote
                  </button>
                </div>

                <div className="mt-6 rounded-xl border border-slate-200 bg-white/60 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Direct Contact
                  </p>
                  <a
                    href="tel:+918988183513"
                    className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600"
                  >
                    <Phone size={12} className="text-blue-600" />
                    +91 89881 83513
                  </a>
                  <a
                    href="tel:+919459285513"
                    className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600"
                  >
                    <Phone size={12} className="text-blue-600" />
                    +91 94592 85513
                  </a>
                  <a
                    href="mailto:contact.zentroxtech@gmail.com"
                    className="mt-1.5 flex items-center gap-2 break-all text-xs font-semibold text-slate-700 hover:text-blue-600"
                  >
                    <Mail size={12} className="flex-shrink-0 text-blue-600" />
                    contact.zentroxtech@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
