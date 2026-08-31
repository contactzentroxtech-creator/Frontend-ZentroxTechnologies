"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import api from "@/lib/api";

interface ThemeCtx {
  theme: "light";
}

interface LangCtx {
  lang: "en";
  t: (key: string, fallback?: string) => string;
  translations: Record<string, string>;
  loadingTranslations: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
});

const LangContext = createContext<LangCtx>({
  lang: "en",
  t: (k, f) => f || k,
  translations: {},
  loadingTranslations: false,
});

// ─── Helper: Convert ANY value to plain string ──────────────────────────
function ensureString(value: any): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value) return "";
  if (Array.isArray(value)) {
    return value.map(ensureString).join(", ");
  }
  if (typeof value === "object") {
    if (value.en !== undefined && typeof value.en === "string") return value.en;
    const firstString = Object.values(value).find(v => typeof v === "string");
    if (firstString) return firstString;
    return "";
  }
  return String(value);
}

const STATIC_FALLBACKS: Record<string, string> = {
  "nav.services": "Services",
  "nav.blog": "Insights",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.get_started": "Start a Project",

  "hero.badge": "Mohali & Chandigarh — MSME Registered Technology Company",
  "hero.line1": "We Build",
  "hero.line2": "Move Businesses Forward.",
  "hero.sub": "Zentrox Technologies helps businesses turn ideas into reliable software, websites, mobile applications and digital growth solutions.",
  "hero.cta_primary": "Start Your Project",
  "hero.cta_secondary": "View Our Work",

  "services.badge": "Services",
  "services.title": "What We Do",
  "services.sub": "Technology and digital growth solutions designed around your goals.",
  "services.view_all": "View All Services",
  "services.cta_title": "Have a Project in Mind?",
  "services.cta_sub": "Let's discuss how we can help you build the right solution.",
  "services.explore": "Explore Service",

  "service.software.title": "Software Development",
  "service.software.desc": "Scalable custom software designed around your business processes, workflows and operational needs.",
  "service.web.title": "Website Development",
  "service.web.desc": "Fast, responsive and conversion-focused websites built to represent your brand and generate business.",
  "service.saas.title": "SaaS Development",
  "service.saas.desc": "Custom SaaS platforms with subscription models, dashboards, integrations and scalable architecture.",
  "service.android.title": "Mobile App Development",
  "service.android.desc": "User-friendly Android and iOS applications focused on performance, usability and reliability.",
  "service.design.title": "UI/UX Design",
  "service.design.desc": "Clear and intuitive digital experiences designed to make complex products simple to use.",
  "service.seo.title": "SEO & Digital Growth",
  "service.seo.desc": "Data-driven SEO strategies designed to improve visibility, organic traffic and long-term growth.",
  "service.marketing.title": "Digital Marketing",
  "service.marketing.desc": "Digital campaigns and content strategies focused on awareness, leads and measurable business growth.",
  "service.ai.title": "AI Integration",
  "service.ai.desc": "Practical AI integrations, automation and intelligent features that improve business workflows.",
  "service.crm.title": "CRM Development",
  "service.crm.desc": "Custom CRM systems that organize sales, customer relationships and business operations.",
  "service.api.title": "API Integration",
  "service.api.desc": "Connect your existing tools, platforms and workflows through reliable API integrations.",

  "stats.trust": "About",
  "stats.title": "Technology Built Around Your Business.",
  "stats.description": "From startups and local businesses to growing enterprises, we build practical digital products that solve real business problems.",
  "stats.projects": "Projects Delivered",
  "stats.clients": "Businesses Supported",
  "stats.years": "Years Experience",
  "stats.rating": "Client Satisfaction",
  "stats.trust1": "Custom Solutions",
  "stats.trust2": "Transparent Communication",
  "stats.trust3": "Global Delivery",
  "stats.trust4": "Long-Term Support",

  "global.badge": "Industries",
  "global.title": "Built for Different Industries",
  "global.sub": "Every industry has different workflows, customers and challenges. Our approach starts by understanding the business before choosing the technology.",
  "global.trust.location": "India & Worldwide",
  "global.trust.business": "Business-Focused Solutions",
  "global.trust.delivery": "Reliable Project Delivery",
  "global.why.title": "Why Businesses Choose Zentrox",
  "global.why.sub": "We deliver practical technology built around your business goals.",
  "global.footer1": "Business-Focused Solutions",
  "global.footer2": "Quality & Reliability",
  "global.footer3": "Transparent Process",

  "global.card1.title": "Business-Focused Solutions",
  "global.card1.desc": "We don't build technology just for the sake of technology. Every solution is designed around a real business requirement.",
  "global.card1.point1": "Real business requirements",
  "global.card1.point2": "Practical technology",
  "global.card1.point3": "Measurable outcomes",

  "global.card2.title": "Quality & Reliability",
  "global.card2.desc": "Clean development practices, testing and attention to detail help us deliver dependable digital products.",
  "global.card2.point1": "Clean development",
  "global.card2.point2": "Rigorous testing",
  "global.card2.point3": "Dependable products",

  "global.card3.title": "Transparent Process",
  "global.card3.desc": "From discovery to deployment, clients stay informed about progress, priorities and deliverables.",
  "global.card3.point1": "Clear communication",
  "global.card3.point2": "Regular updates",
  "global.card3.point3": "On-time delivery",

  "pricing.badge": "Process",
  "pricing.title": "A Simple Process. Clear Communication.",
  "pricing.sub": "From discovery to launch, we keep you informed every step of the way.",
  "pricing.step.service": "Discover",
  "pricing.step.business": "Plan",
  "pricing.step.budget": "Build",
  "pricing.step.quote": "Launch & Improve",
  "pricing.back": "Back",
  "pricing.next": "Next",
  "pricing.get_quote": "Get Started",
  "pricing.consultation": "Start Your Project",

  "testimonials.badge": "Testimonials",
  "testimonials.title": "What Our Clients Say",
  "testimonials.sub": "Feedback from businesses we've partnered with.",

  "cta.badge": "Let's Build Something Great Together",
  "cta.title": "Have a Digital Product in Mind?",
  "cta.title2": "Let's turn your idea into a practical digital solution.",
  "cta.sub": "Whether you need a website, custom software, mobile app, SaaS platform, AI automation, SEO or digital marketing services — our team is ready to help you build and grow.",
  "cta.primary": "Start a Project",
  "cta.secondary": "Talk to Us",

  "contact.badge": "Contact",
  "contact.title": "Let's Build Something Together",
  "contact.sub": "Have a project in mind? Reach out and we'll get back to you within one business day.",
  "contact.name": "Your Name",
  "contact.phone": "Phone / WhatsApp",
  "contact.email": "Email Address",
  "contact.service": "Select Required Service",
  "contact.budget": "Budget Range",
  "contact.message": "Tell us about your project or business...",
  "contact.send": "Send Message",
  "contact.sending": "Sending...",
  "contact.success": "Message sent successfully!",
  "contact.success_title": "Message Sent!",
  "contact.send_another": "Send Another Message",
  "contact.privacy_note": "By submitting this form, you agree to be contacted by Zentrox Technologies.",
  "contact.reach_us": "Reach Us Directly",
  "contact.form_title": "Send Us a Message",
  "contact.whatsapp_cta": "Chat on WhatsApp",
  "contact.brand_desc": "MSME Registered · Remote-First",
  "contact.brand_locations": "Mohali & Chandigarh, Punjab, India",

  "validation.name_min": "Name must contain at least 2 characters",
  "validation.phone_invalid": "Please enter a valid phone number",
  "validation.email_invalid": "Please enter a valid email address",
  "validation.service_required": "Please select a service",
  "validation.message_min": "Message must contain at least 10 characters",
  "validation.message_max": "Your message is too long",

  "footer.msme": "MSME Registered · Remote-First · Innovation-Driven",
  "footer.copy": "All rights reserved. MSME Registered — India.",

  "common.loading": "Loading...",
  "common.error": "Something went wrong",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.learn_more": "Learn More",
  "whatsapp.message": "Hi Zentrox Technologies, I need help with my project.",
};

export { STATIC_FALLBACKS };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("zt_theme", "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Record<string, string>>(
    STATIC_FALLBACKS
  );
  const [loadingTranslations, setLoadingTranslations] = useState(false);
  const loadedRef = useRef(false);

  const loadTranslations = useCallback(async () => {
    if (loadedRef.current) return;

    setLoadingTranslations(true);

    try {
      const { data } = await api.get("/translations?lang=en");

      const apiData = data?.data || {};
      const merged: Record<string, string> = { ...STATIC_FALLBACKS };
      for (const key in apiData) {
        merged[key] = ensureString(apiData[key]);
      }

      setTranslations(merged);
    } catch {
      setTranslations(STATIC_FALLBACKS);
    } finally {
      setLoadingTranslations(false);
      loadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", "en");
    localStorage.setItem("zt_lang", "en");
    loadTranslations();
  }, [loadTranslations]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      let value = translations[key] || STATIC_FALLBACKS[key] || fallback || key;
      return ensureString(value);
    },
    [translations]
  );

  return (
    <LangContext.Provider
      value={{
        lang: "en",
        t,
        translations,
        loadingTranslations,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useLang = () => useContext(LangContext);
