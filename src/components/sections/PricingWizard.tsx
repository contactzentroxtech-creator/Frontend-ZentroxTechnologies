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
  Users,
  AlertCircle,
  Mail,
  Phone,
  Search,
  Megaphone,
  TrendingUp,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";
import { generatePDF } from "@/lib/pdf-utils";

const SERVICE_CONFIGS = {
  web: {
    label: "Website Development",
    icon: Globe,
    color: "#2563eb",
    basePrice: 7999,
    priceType: "onetime",
    fields: [
      { id: "pages", label: "Number of Pages", type: "select", options: [
        { value: "1-5", label: "1-5 pages", multiplier: 1.0 },
        { value: "5-10", label: "5-10 pages", multiplier: 1.5 },
        { value: "10-25", label: "10-25 pages", multiplier: 2.2 },
        { value: "25-50", label: "25-50 pages", multiplier: 3.5 },
        { value: "50+", label: "50+ pages", multiplier: 5.0 },
      ]},
      { id: "type", label: "Website Type", type: "select", options: [
        { value: "static", label: "Static / Business", multiplier: 1.0 },
        { value: "dynamic", label: "Dynamic / CMS", multiplier: 1.4 },
        { value: "ecommerce", label: "E-Commerce", multiplier: 2.5 },
        { value: "webapp", label: "Custom Web App", multiplier: 4.0 },
      ]},
      { id: "design", label: "Design Complexity", type: "select", options: [
        { value: "basic", label: "Basic (Template)", multiplier: 1.0 },
        { value: "custom", label: "Custom Design", multiplier: 1.4 },
        { value: "premium", label: "Premium UI/UX", multiplier: 2.0 },
      ]},
    ],
    addOns: [
      { id: "payment", label: "Payment Gateway", price: 4999 },
      { id: "login", label: "User Login System", price: 7999 },
      { id: "dashboard", label: "Admin Dashboard", price: 9999 },
      { id: "api", label: "API Integration", price: 5999 },
      { id: "multilang", label: "Multi-Language", price: 5999 },
      { id: "seo", label: "On-Page SEO Setup", price: 3999 },
    ],
  },
  mobile: {
    label: "Mobile App",
    icon: Smartphone,
    color: "#7c3aed",
    basePrice: 79999,
    priceType: "onetime",
    fields: [
      { id: "platform", label: "Platform", type: "select", options: [
        { value: "android", label: "Android Only", multiplier: 1.0 },
        { value: "ios", label: "iOS Only", multiplier: 1.15 },
        { value: "both", label: "Android + iOS (Native)", multiplier: 1.8 },
        { value: "cross", label: "Cross-Platform (React Native)", multiplier: 1.3 },
      ]},
      { id: "screens", label: "Number of Screens", type: "select", options: [
        { value: "5-10", label: "5-10 screens", multiplier: 1.0 },
        { value: "10-20", label: "10-20 screens", multiplier: 1.5 },
        { value: "20-40", label: "20-40 screens", multiplier: 2.2 },
        { value: "40+", label: "40+ screens", multiplier: 3.5 },
      ]},
      { id: "features", label: "Feature Set", type: "select", options: [
        { value: "basic", label: "Basic (CRUD)", multiplier: 1.0 },
        { value: "standard", label: "Standard (Auth, APIs)", multiplier: 1.4 },
        { value: "advanced", label: "Advanced (Payment, Chat)", multiplier: 2.0 },
        { value: "complex", label: "Complex (Real-time)", multiplier: 3.0 },
      ]},
    ],
    addOns: [
      { id: "push", label: "Push Notifications", price: 5999 },
      { id: "payment", label: "In-App Payments", price: 9999 },
      { id: "chat", label: "Chat / Messaging", price: 14999 },
      { id: "analytics", label: "Analytics Integration", price: 4999 },
      { id: "admin", label: "Admin Panel", price: 14999 },
      { id: "store", label: "App Store Submission", price: 4999 },
    ],
  },
  software: {
    label: "Custom Software",
    icon: Code2,
    color: "#0891b2",
    basePrice: 99999,
    priceType: "onetime",
    fields: [
      { id: "type", label: "Software Type", type: "select", options: [
        { value: "crm", label: "CRM System", multiplier: 1.0 },
        { value: "erp", label: "ERP System", multiplier: 1.5 },
        { value: "saas", label: "SaaS Platform", multiplier: 2.0 },
        { value: "custom", label: "Custom Software", multiplier: 1.3 },
      ]},
      { id: "users", label: "Expected Users", type: "select", options: [
        { value: "1-50", label: "1-50 users", multiplier: 1.0 },
        { value: "50-500", label: "50-500 users", multiplier: 1.4 },
        { value: "500-5000", label: "500-5000 users", multiplier: 2.0 },
        { value: "5000+", label: "5000+ users", multiplier: 3.0 },
      ]},
      { id: "modules", label: "Number of Modules", type: "select", options: [
        { value: "3-5", label: "3-5 modules", multiplier: 1.0 },
        { value: "5-10", label: "5-10 modules", multiplier: 1.5 },
        { value: "10-20", label: "10-20 modules", multiplier: 2.2 },
        { value: "20+", label: "20+ modules", multiplier: 3.0 },
      ]},
    ],
    addOns: [
      { id: "reports", label: "Advanced Reports", price: 14999 },
      { id: "api", label: "API Integration", price: 9999 },
      { id: "mobile", label: "Mobile App Access", price: 29999 },
      { id: "ai", label: "AI-Powered Insights", price: 24999 },
      { id: "multiuser", label: "Multi-Role Access", price: 12999 },
      { id: "backup", label: "Auto Backup System", price: 7999 },
    ],
  },
  design: {
    label: "UI/UX Design",
    icon: Palette,
    color: "#ea580c",
    basePrice: 9999,
    priceType: "onetime",
    fields: [
      { id: "scope", label: "Design Scope", type: "select", options: [
        { value: "wireframe", label: "Wireframes Only", multiplier: 1.0 },
        { value: "ui", label: "UI Design", multiplier: 1.5 },
        { value: "ux", label: "UX Research + Design", multiplier: 2.0 },
        { value: "full", label: "Full UI/UX + Design System", multiplier: 3.0 },
      ]},
      { id: "pages", label: "Number of Screens/Pages", type: "select", options: [
        { value: "1-5", label: "1-5 screens", multiplier: 1.0 },
        { value: "5-15", label: "5-15 screens", multiplier: 1.8 },
        { value: "15-30", label: "15-30 screens", multiplier: 2.8 },
        { value: "30+", label: "30+ screens", multiplier: 4.0 },
      ]},
      { id: "revisions", label: "Revision Rounds", type: "select", options: [
        { value: "2", label: "2 revisions", multiplier: 1.0 },
        { value: "5", label: "5 revisions", multiplier: 1.3 },
        { value: "unlimited", label: "Unlimited revisions", multiplier: 1.7 },
      ]},
    ],
    addOns: [
      { id: "prototype", label: "Interactive Prototype", price: 6999 },
      { id: "design-system", label: "Design System", price: 9999 },
      { id: "branding", label: "Brand Identity", price: 12999 },
      { id: "icons", label: "Custom Icon Set", price: 4999 },
      { id: "illustrations", label: "Custom Illustrations", price: 7999 },
      { id: "handoff", label: "Developer Handoff", price: 2999 },
    ],
  },
  seo: {
    label: "SEO Services",
    icon: Search,
    color: "#059669",
    basePrice: 7999,
    priceType: "monthly",
    fields: [
      { id: "keywords", label: "Target Keywords", type: "select", options: [
        { value: "10", label: "Up to 10 keywords", multiplier: 1.0 },
        { value: "25", label: "10-25 keywords", multiplier: 1.5 },
        { value: "50", label: "25-50 keywords", multiplier: 2.2 },
        { value: "100+", label: "50+ keywords", multiplier: 3.5 },
      ]},
      { id: "competition", label: "Keyword Competition", type: "select", options: [
        { value: "low", label: "Low (Local)", multiplier: 1.0 },
        { value: "medium", label: "Medium (City-Level)", multiplier: 1.4 },
        { value: "high", label: "High (National)", multiplier: 2.0 },
        { value: "very-high", label: "Very High (Competitive)", multiplier: 3.0 },
      ]},
      { id: "scope", label: "SEO Scope", type: "select", options: [
        { value: "onpage", label: "On-Page SEO Only", multiplier: 1.0 },
        { value: "technical", label: "On-Page + Technical", multiplier: 1.5 },
        { value: "full", label: "Full SEO (On + Off Page)", multiplier: 2.0 },
        { value: "enterprise", label: "Enterprise SEO + Content", multiplier: 3.0 },
      ]},
    ],
    addOns: [
      { id: "content", label: "Content Writing (4 blogs)", price: 7999 },
      { id: "backlinks", label: "Backlink Building", price: 9999 },
      { id: "local", label: "Local SEO + GMB", price: 4999 },
      { id: "gmb", label: "Google My Business Setup", price: 2999 },
      { id: "audit", label: "Monthly Technical Audit", price: 4999 },
      { id: "reporting", label: "Custom Reporting", price: 3999 },
    ],
  },
  digital: {
    label: "Digital Marketing",
    icon: Megaphone,
    color: "#dc2626",
    basePrice: 9999,
    priceType: "monthly",
    fields: [
      { id: "channels", label: "Marketing Channels", type: "select", options: [
        { value: "1", label: "1 Channel", multiplier: 1.0 },
        { value: "2", label: "2 Channels", multiplier: 1.6 },
        { value: "3", label: "3 Channels", multiplier: 2.2 },
        { value: "4+", label: "4+ Channels", multiplier: 3.0 },
      ]},
      { id: "posts", label: "Content Volume (Posts/Month)", type: "select", options: [
        { value: "12", label: "12 posts", multiplier: 1.0 },
        { value: "20", label: "20 posts", multiplier: 1.4 },
        { value: "30", label: "30 posts", multiplier: 1.8 },
        { value: "60+", label: "60+ posts", multiplier: 2.5 },
      ]},
      { id: "platforms", label: "Social Platforms", type: "select", options: [
        { value: "1", label: "1 Platform", multiplier: 1.0 },
        { value: "2-3", label: "2-3 Platforms", multiplier: 1.5 },
        { value: "4-5", label: "4-5 Platforms", multiplier: 2.0 },
        { value: "6+", label: "6+ Platforms", multiplier: 2.5 },
      ]},
    ],
    addOns: [
      { id: "design", label: "Graphic Design", price: 4999 },
      { id: "video", label: "Video Content", price: 9999 },
      { id: "email", label: "Email Marketing", price: 7999 },
      { id: "influencer", label: "Influencer Marketing", price: 14999 },
      { id: "ads-mgmt", label: "Ad Campaign Management", price: 9999 },
      { id: "analytics", label: "Advanced Analytics", price: 4999 },
    ],
  },
  ads: {
    label: "Google Ads",
    icon: TrendingUp,
    color: "#ea580c",
    basePrice: 9999,
    priceType: "monthly",
    fields: [
      { id: "adSpend", label: "Monthly Ad Spend Budget", type: "select", options: [
        { value: "25k", label: "₹25,000/month", multiplier: 1.0 },
        { value: "50k", label: "₹50,000/month", multiplier: 1.3 },
        { value: "1l", label: "₹1,00,000/month", multiplier: 1.7 },
        { value: "3l", label: "₹3,00,000/month", multiplier: 2.5 },
        { value: "5l+", label: "₹5,00,000+/month", multiplier: 3.5 },
      ]},
      { id: "campaigns", label: "Number of Campaigns", type: "select", options: [
        { value: "1", label: "1 Campaign", multiplier: 1.0 },
        { value: "2-3", label: "2-3 Campaigns", multiplier: 1.4 },
        { value: "4-6", label: "4-6 Campaigns", multiplier: 1.8 },
        { value: "6+", label: "6+ Campaigns", multiplier: 2.5 },
      ]},
      { id: "types", label: "Ad Types", type: "select", options: [
        { value: "search", label: "Search Ads Only", multiplier: 1.0 },
        { value: "search-display", label: "Search + Display", multiplier: 1.4 },
        { value: "shopping", label: "Shopping + Search", multiplier: 1.8 },
        { value: "full", label: "Full Campaigns", multiplier: 2.5 },
      ]},
    ],
    addOns: [
      { id: "landing", label: "Landing Page Design", price: 9999 },
      { id: "conversion", label: "Conversion Tracking", price: 4999 },
      { id: "remarketing", label: "Remarketing Campaigns", price: 5999 },
      { id: "video", label: "YouTube Video Ads", price: 8999 },
      { id: "shopping", label: "Google Shopping Setup", price: 7999 },
      { id: "reporting", label: "Custom Reporting", price: 3999 },
    ],
  },
  meta_ads: {
    label: "Meta Ads",
    icon: TrendingUp,
    color: "#be185d",
    basePrice: 9999,
    priceType: "monthly",
    fields: [
      { id: "adSpend", label: "Monthly Ad Spend Budget", type: "select", options: [
        { value: "25k", label: "₹25,000/month", multiplier: 1.0 },
        { value: "50k", label: "₹50,000/month", multiplier: 1.3 },
        { value: "1l", label: "₹1,00,000/month", multiplier: 1.7 },
        { value: "3l", label: "₹3,00,000/month", multiplier: 2.5 },
        { value: "5l+", label: "₹5,00,000+/month", multiplier: 3.5 },
      ]},
      { id: "placements", label: "Ad Placements", type: "select", options: [
        { value: "fb-feed", label: "Facebook Feed Only", multiplier: 1.0 },
        { value: "fb-ig", label: "Facebook + Instagram", multiplier: 1.3 },
        { value: "full", label: "Feed + Stories + Reels", multiplier: 1.7 },
        { value: "all", label: "All Placements + Audience Network", multiplier: 2.2 },
      ]},
      { id: "creatives", label: "Creative Requirements", type: "select", options: [
        { value: "static", label: "Static Images Only", multiplier: 1.0 },
        { value: "carousel", label: "Static + Carousel", multiplier: 1.3 },
        { value: "video", label: "Static + Video", multiplier: 1.7 },
        { value: "full", label: "Full (Static + Video + Reels)", multiplier: 2.2 },
      ]},
    ],
    addOns: [
      { id: "landing", label: "Landing Page Design", price: 9999 },
      { id: "video", label: "Video Production", price: 14999 },
      { id: "pixel", label: "Pixel + Conversion Setup", price: 4999 },
      { id: "catalog", label: "Product Catalog Setup", price: 6999 },
      { id: "remarketing", label: "Remarketing Campaigns", price: 5999 },
      { id: "reporting", label: "Custom Reporting", price: 3999 },
    ],
  },
  ai: {
    label: "AI Integration",
    icon: Sparkles,
    color: "#4f46e5",
    basePrice: 29999,
    priceType: "onetime",
    fields: [
      { id: "type", label: "AI Solution Type", type: "select", options: [
        { value: "chatbot", label: "AI Chatbot", multiplier: 1.0 },
        { value: "automation", label: "Workflow Automation", multiplier: 1.5 },
        { value: "analytics", label: "AI Analytics", multiplier: 1.8 },
        { value: "custom", label: "Custom AI Model", multiplier: 3.0 },
      ]},
      { id: "volume", label: "Expected Volume (Requests/Month)", type: "select", options: [
        { value: "1k", label: "Up to 1,000", multiplier: 1.0 },
        { value: "10k", label: "1,000 - 10,000", multiplier: 1.4 },
        { value: "100k", label: "10,000 - 100,000", multiplier: 2.0 },
        { value: "1m+", label: "100,000+", multiplier: 3.0 },
      ]},
      { id: "integration", label: "Integration Complexity", type: "select", options: [
        { value: "standalone", label: "Standalone Tool", multiplier: 1.0 },
        { value: "api", label: "API Integration", multiplier: 1.4 },
        { value: "existing", label: "Into Existing System", multiplier: 1.8 },
        { value: "enterprise", label: "Enterprise Integration", multiplier: 2.5 },
      ]},
    ],
    addOns: [
      { id: "training", label: "AI Model Training", price: 19999 },
      { id: "dashboard", label: "Analytics Dashboard", price: 12999 },
      { id: "api", label: "API Integration", price: 8999 },
      { id: "multilang", label: "Multi-Language Support", price: 7999 },
      { id: "voice", label: "Voice Integration", price: 14999 },
      { id: "support", label: "6 Months Support", price: 9999 },
    ],
  },
};

function formatPrice(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function PricingWizard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const [serviceId, setServiceId] = useState<string>("web");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [addOns, setAddOns] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("standard");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const [referralCode, setReferralCode] = useState("");
  const [referralApplied, setReferralApplied] = useState(false);
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [verifyingReferral, setVerifyingReferral] = useState(false);
  const [referralError, setReferralError] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const config = SERVICE_CONFIGS[serviceId as keyof typeof SERVICE_CONFIGS];

  useEffect(() => {
    if (!config) return;
    const initial: Record<string, string> = {};
    config.fields.forEach((f) => {
      initial[f.id] = f.options[0].value;
    });
    setFieldValues(initial);
    setAddOns([]);
  }, [serviceId, config]);

  const calculateEstimate = () => {
    if (!config) {
      return {
        base: 0,
        addOns: 0,
        subtotal: 0,
        discount: 0,
        adSpend: 0,
        final: 0,
        totalWithAdSpend: 0,
        low: 0,
        high: 0,
      };
    }

    let basePrice = config.basePrice;
    config.fields.forEach((field) => {
      const val = fieldValues[field.id];
      const option = field.options.find((o) => o.value === val);
      if (option) {
        basePrice *= option.multiplier;
      }
    });

    const addOnsTotal = addOns.reduce((sum, id) => {
      const addon = config.addOns.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    const timelineMult =
      timeline === "flexible" ? 0.9 :
      timeline === "fast" ? 1.3 :
      timeline === "urgent" ? 1.6 : 1.0;

    let subtotal = (basePrice + addOnsTotal) * timelineMult;
    let discount = 0;

    if (referralApplied && referralDiscount > 0) {
      discount = subtotal * (referralDiscount / 100);
      subtotal -= discount;
      const floor = (basePrice + addOnsTotal) * 0.85;
      subtotal = Math.max(subtotal, floor);
    }

    return {
      base: Math.round(config.basePrice),
      addOns: addOnsTotal,
      subtotal: Math.round((basePrice + addOnsTotal) * timelineMult),
      discount: Math.round(discount),
      adSpend: 0,
      final: Math.round(subtotal),
      totalWithAdSpend: Math.round(subtotal),
      low: Math.round(subtotal * 0.9),
      high: Math.round(subtotal * 1.15),
    };
  };

  const estimate = calculateEstimate();

  const verifyReferral = async () => {
    if (!referralCode.trim()) {
      setReferralError("Please enter a referral code");
      return;
    }
    setVerifyingReferral(true);
    setReferralError("");
    try {
      const { data } = await api.post("/referrals/verify", {
        code: referralCode.trim().toUpperCase(),
      });
      if (data?.valid) {
        setReferralApplied(true);
        setReferralDiscount(data.discountPercent);
        setReferralError("");
      } else {
        setReferralError(data?.message || "Invalid referral code");
      }
    } catch (err: any) {
      setReferralError(err?.response?.data?.message || "Invalid referral code");
    } finally {
      setVerifyingReferral(false);
    }
  };

  const removeReferral = () => {
    setReferralCode("");
    setReferralApplied(false);
    setReferralDiscount(0);
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
      const fieldDetails = Object.entries(fieldValues)
        .map(([key, val]) => {
          const field = config.fields.find((f) => f.id === key);
          const option = field?.options.find((o) => o.value === val);
          return `${field?.label}: ${option?.label || val}`;
        })
        .join("\n");

      const selectedAddOns = addOns
        .map((id) => config.addOns.find((a) => a.id === id)?.label)
        .filter(Boolean)
        .join(", ");

      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: config.label,
        message: `📋 PROJECT ESTIMATE REQUEST\n\nService: ${config.label}\nBilling: ${config.priceType === "monthly" ? "Monthly" : "One-Time"}\n\n--- Requirements ---\n${fieldDetails}\n\n--- Add-Ons ---\n${selectedAddOns || "None"}\n\n--- Timeline ---\n${timeline}\n\n--- Price Breakdown ---\nBase: ${formatPrice(estimate.base)}\nAdd-Ons: ${formatPrice(estimate.addOns)}\n${estimate.discount > 0 ? `Discount: -${formatPrice(estimate.discount)}\n` : ""}Final: ${formatPrice(estimate.final)}\nRange: ${formatPrice(estimate.low)} - ${formatPrice(estimate.high)}`,
        source: "budget-calculator",
        priority: "high",
        referralCode: referralApplied ? referralCode.toUpperCase() : "",
        baseEstimate: estimate.subtotal,
        finalEstimate: estimate.final,
        projectType: config.label,
        projectDetails: {
          serviceId,
          service: config.label,
          priceType: config.priceType,
          fields: fieldValues,
          addOns,
          timeline,
        },
      };

      const { data } = await api.post("/leads", payload);

      if (data?.success !== false) {
        setSubmitted(true);
      } else {
        setError(data?.message || "Failed to submit.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      await generatePDF({
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        service: config.label,
        serviceId,
        priceType: config.priceType as "onetime" | "monthly",
        fieldDetails: Object.entries(fieldValues).map(([key, val]) => {
          const field = config.fields.find((f) => f.id === key);
          const option = field?.options.find((o) => o.value === val);
          return { label: field?.label || key, value: option?.label || val };
        }),
        addOns: addOns.map((id) => {
          const addon = config.addOns.find((a) => a.id === id);
          return { label: addon?.label || "", price: addon?.price || 0 };
        }),
        timeline,
        estimate,
        referralApplied,
        referralCode: referralApplied ? referralCode : "",
        referralDiscount,
      });
    } catch (err) {
      console.error("PDF failed:", err);
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (!config) return null;

  return (
    <section id="budget-calculator" className="relative overflow-hidden bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28">
      <div ref={ref} className="relative mx-auto max-w-7xl">
        {submitted ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Estimate Sent to Team!
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm text-slate-600 sm:text-base">
              Thank you, <strong>{name}</strong>. Your project estimate has been
              sent to the Zentrox Technologies team.
            </p>
            <div className="mx-auto mt-6 max-w-md rounded-xl bg-white p-5 text-left shadow-sm">
              <p className="text-sm font-bold text-slate-900">What happens next:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                  Our team will review your requirements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                  We&apos;ll contact you within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                  You&apos;ll receive a detailed proposal
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={handleDownloadPDF}
                disabled={downloadingPDF}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
              >
                {downloadingPDF ? (
                  <><Loader2 size={16} className="animate-spin" /> Generating PDF...</>
                ) : (
                  <><Download size={16} /> Download PDF Quote</>
                )}
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
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700"
              >
                New Estimate
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg sm:p-8 lg:col-span-8 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                    Calculate Your Project Budget
                  </h3>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Select a service and get instant pricing
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Step 1 — Select Service
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                    {Object.entries(SERVICE_CONFIGS).map(([id, cfg]) => {
                      const Icon = cfg.icon;
                      const active = serviceId === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setServiceId(id)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
                            active
                              ? "border-blue-500 bg-blue-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-blue-200"
                          }`}
                        >
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor: active ? `${cfg.color}20` : `${cfg.color}10`,
                              color: cfg.color,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <p className="text-[10px] font-semibold leading-tight text-slate-900">
                            {cfg.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Step 2 — Requirements
                  </label>
                  <div className="space-y-4">
                    {config.fields.map((field) => (
                      <div key={field.id}>
                        <label className="mb-2 block text-xs font-bold text-slate-700">
                          {field.label}
                        </label>
                        <select
                          value={fieldValues[field.id] || ""}
                          onChange={(e) =>
                            setFieldValues({ ...fieldValues, [field.id]: e.target.value })
                          }
                          className="input-field"
                        >
                          {field.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Step 3 — Add-Ons (Optional)
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {config.addOns.map((addon) => {
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
                            <div className={`flex h-4 w-4 items-center justify-center rounded border-2 ${active ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}>
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

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="input-field"
                  >
                    <option value="flexible">Flexible (No rush)</option>
                    <option value="standard">Standard (1-2 months)</option>
                    <option value="fast">Fast-Track (2-4 weeks)</option>
                    <option value="urgent">Urgent (ASAP)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Step 4 — Referral Code (Optional)
                  </label>
                  {referralApplied ? (
                    <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <p className="text-sm font-bold text-emerald-700">
                          {referralCode.toUpperCase()} — {referralDiscount}% OFF
                        </p>
                      </div>
                      <button type="button" onClick={removeReferral} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600">
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
                        className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
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
                </div>

                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Step 5 — Your Details
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name *" className="input-field" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address *" className="input-field" required />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone / WhatsApp *" className="input-field" required />
                    <input type="text" value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} placeholder="Project description (optional)" className="input-field" />
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-2.5">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600" />
                  <span className="text-xs text-slate-600">
                    I agree to be contacted by Zentrox Technologies.
                  </span>
                </label>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!agreed || submitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg ${
                    !agreed || submitting ? "cursor-not-allowed opacity-60" : "hover:-translate-y-1 hover:shadow-xl"
                  }`}
                >
                  {submitting ? "Sending..." : "Get My Estimate"}
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/40 p-6 shadow-lg sm:p-8 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700 shadow-sm">
                  <Calculator size={11} />
                  Estimated Budget
                </div>

                <h3 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  {config.label}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {config.priceType === "monthly" ? "Monthly estimate" : "One-time estimate"}
                </p>

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
                    "Clean, modern & responsive",
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

                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
                >
                  <Mail size={15} />
                  Talk to Our Experts
                </Link>

                <div className="mt-6 rounded-xl border border-slate-200 bg-white/60 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Direct Contact
                  </p>
                  <a href="tel:+918988183513" className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600">
                    <Phone size={12} className="text-blue-600" /> +91 89881 83513
                  </a>
                  <a href="tel:+919459285513" className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600">
                    <Phone size={12} className="text-blue-600" /> +91 94592 85513
                  </a>
                  <a href="mailto:contact.zentroxtech@gmail.com" className="mt-1.5 flex items-center gap-2 break-all text-xs font-semibold text-slate-700 hover:text-blue-600">
                    <Mail size={12} className="flex-shrink-0 text-blue-600" /> contact.zentroxtech@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
