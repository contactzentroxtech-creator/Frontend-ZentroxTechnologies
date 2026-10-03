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
          className="overflow-hidden rounded-3xl border border-slate-200
