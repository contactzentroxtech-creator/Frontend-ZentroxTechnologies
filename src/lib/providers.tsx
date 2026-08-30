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

// ─── THEME ────────────────────────────────────────────────────────────────────

type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

interface LangCtx {
  lang: "en";
  t: (key: string, fallback?: string) => string;
  translations: Record<string, string>;
  loadingTranslations: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

const LangContext = createContext<LangCtx>({
  lang: "en",
  t: (k, f) => f || k,
  translations: {},
  loadingTranslations: false,
});

// ─── ENGLISH TRANSLATIONS ────────────────────────────────────────────────────

const STATIC_FALLBACKS: Record<string, string> = {
  // ─── NAVBAR ──────────────────────────────────────────────────────────────
  "nav.services": "Services",
  "nav.courses": "Courses",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.login": "Login",
  "nav.get_started": "Get Started",

  // ─── HERO ────────────────────────────────────────────────────────────────
  "hero.badge": "Mohali & Chandigarh — MSME Registered Technology Company",
  "hero.line1": "We Build",
  "hero.line2": "Grow Faster.",
  "hero.sub":
    "We create custom software, high-performance websites, mobile apps and digital growth systems that help ambitious businesses move forward.",
  "hero.cta_primary": "Start Your Project",
  "hero.cta_secondary": "Explore Our Services",

  // ─── SERVICES ────────────────────────────────────────────────────────────
  "services.badge": "Everything You Need To Grow",
  "services.title": "Technology That Moves Your Business Forward",
  "services.sub":
    "From building powerful digital products to helping your business attract more customers, Zentrox Technologies brings strategy, design, development, AI, and digital growth together under one team.",
  "services.view_all": "Explore All Services",
  "services.cta_title": "Not Sure Which Service You Need?",
  "services.cta_sub":
    "Tell us about your business goals and our team will help you find the right digital solution.",
  "services.explore": "Explore Service",

  // ─── SERVICE ITEMS ───────────────────────────────────────────────────────
  "service.software.title": "Custom Software Development",
  "service.software.desc":
    "Tailored software solutions designed around your business processes, challenges, and long-term growth.",

  "service.web.title": "Web Application Development",
  "service.web.desc":
    "Fast, modern, scalable web applications built for excellent user experience and measurable business results.",

  "service.saas.title": "SaaS Development",
  "service.saas.desc":
    "From MVP to scalable SaaS platforms, we help turn your product ideas into reliable digital businesses.",

  "service.android.title": "Mobile App Development",
  "service.android.desc":
    "High-performance mobile applications with intuitive interfaces and smooth experiences across devices.",

  "service.design.title": "UI/UX Design",
  "service.design.desc":
    "Human-centered digital experiences that look professional, feel intuitive, and help users take action.",

  "service.seo.title": "SEO & Local SEO",
  "service.seo.desc":
    "Data-driven SEO strategies that improve visibility, attract qualified traffic, and generate more leads.",

  "service.marketing.title": "Digital Marketing",
  "service.marketing.desc":
    "Smart digital campaigns that strengthen your brand, generate leads, and support sustainable business growth.",

  "service.ai.title": "AI Integration & Automation",
  "service.ai.desc":
    "Intelligent AI integration and automation workflows that reduce repetitive work and improve business efficiency.",

  "service.crm.title": "CRM Development",
  "service.crm.desc":
    "Custom CRM systems that organize customer data, streamline sales, and improve business relationships.",

  "service.api.title": "API Integration",
  "service.api.desc":
    "Connect your software, platforms, and workflows with reliable integrations built for efficiency.",

  // ─── STATS ───────────────────────────────────────────────────────────────
  "stats.trust": "Built for Real Business Growth",
  "stats.title": "Results That Reflect Our Commitment",
  "stats.description":
    "Helping businesses build stronger digital products, improve their online presence, and move forward with confidence.",
  "stats.projects": "Digital Solutions Delivered",
  "stats.clients": "Businesses Supported",
  "stats.years": "Years of Digital Experience",
  "stats.rating": "Client Satisfaction",
  "stats.trust1": "Custom-Built Solutions",
  "stats.trust2": "Transparent Communication",
  "stats.trust3": "India & Global Delivery",
  "stats.trust4": "Long-Term Support",

  // ─── LOCAL / GLOBAL ──────────────────────────────────────────────────────
  "global.badge": "Digital Solutions for India & Worldwide",
  "global.title": "Built in India. Ready for Business Anywhere.",
  "global.sub":
    "From Mohali and Chandigarh to businesses across India and international markets, Zentrox Technologies creates modern websites, software, AI solutions and digital growth systems designed around real business goals.",

  "global.trust.location": "India & Worldwide",
  "global.trust.business": "Business-Focused Solutions",
  "global.trust.delivery": "Reliable Project Delivery",

  "global.why.title": "One Technology Partner for Your Digital Growth",
  "global.why.sub":
    "We combine strategy, design, development and digital growth so your business can move forward without managing multiple disconnected teams.",

  "global.footer1": "Strategy-led digital solutions",
  "global.footer2": "Designed for real business outcomes",
  "global.footer3": "India-based. Globally connected.",

  "global.card1.title": "Local Understanding. Global Delivery.",
  "global.card1.desc":
    "We understand the needs of businesses in India while building digital solutions ready for customers, teams and markets worldwide.",
  "global.card1.point1": "Serving businesses across India",
  "global.card1.point2": "Remote-first global collaboration",
  "global.card1.point3": "Solutions built for scalable growth",

  "global.card2.title": "Technology Built Around Your Business",
  "global.card2.desc":
    "Instead of forcing your business into generic tools, we design websites, software and digital systems around your actual workflows.",
  "global.card2.point1": "Custom websites and web applications",
  "global.card2.point2": "Mobile apps and SaaS platforms",
  "global.card2.point3": "AI and automation workflows",

  "global.card3.title": "Built for Long-Term Growth",
  "global.card3.desc":
    "Our goal is not just to launch a project. We help businesses create stronger digital foundations that can evolve as they grow.",
  "global.card3.point1": "Clear communication and strategy",
  "global.card3.point2": "Scalable technology decisions",
  "global.card3.point3": "Ongoing digital growth support",

  // ─── PRICING WIZARD ──────────────────────────────────────────────────────
  "pricing.badge": "Transparent Pricing",
  "pricing.title": "Estimate Your Project",
  "pricing.sub":
    "Get a quick estimated investment range for your website, software, mobile app, SaaS, AI, SEO or digital marketing project.",
  "pricing.step.service": "Service",
  "pricing.step.business": "Business",
  "pricing.step.budget": "Budget",
  "pricing.step.quote": "Quote",
  "pricing.back": "Back",
  "pricing.next": "Next",
  "pricing.get_quote": "Get Quote",
  "pricing.consultation": "Get Free Consultation",
  "pricing.business_type": "What type of business do you have?",
  "pricing.complexity": "Project Complexity",
  "pricing.budget": "Estimated Project Budget",
  "pricing.timeline": "When do you need the project?",
  "pricing.addons": "Optional Features",

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────
  "testimonials.badge": "Client Stories",
  "testimonials.title": "Trusted by Businesses Building Their Digital Future",
  "testimonials.sub":
    "We work with startups, growing businesses, and organizations across multiple industries to build practical digital solutions designed for growth.",

  // ─── CTA ──────────────────────────────────────────────────────────────────
  "cta.badge": "Let's Build Something Great Together",
  "cta.title": "Ready to Build Something Great?",
  "cta.title2": "Let's Grow Your Business Together",
  "cta.sub":
    "Whether you need a website, custom software, mobile application, SaaS platform, AI automation, SEO, or digital marketing services — our team is ready to help you build and grow.",
  "cta.primary": "Get a Free Consultation",
  "cta.secondary": "Explore Our Services",

  // ─── CONTACT ─────────────────────────────────────────────────────────────
  "contact.badge": "Get In Touch",
  "contact.title": "Start Your Digital Journey",
  "contact.sub":
    "Tell us about your project. Your first consultation is always free. Our team typically responds within 24 hours.",
  "contact.name": "Your Name",
  "contact.phone": "Phone / WhatsApp",
  "contact.email": "Email Address",
  "contact.service": "Select Required Service",
  "contact.budget": "Budget Range",
  "contact.message": "Tell us about your project or business...",
  "contact.send": "Send Message — Get Free Quote",
  "contact.sending": "Sending...",
  "contact.success": "Message sent successfully!",
  "contact.success_title": "Message Sent!",
  "contact.send_another": "Send Another Message",
  "contact.privacy_note":
    "By submitting this form, you agree to be contacted by Zentrox Technologies.",
  "contact.reach_us": "Reach Us Directly",
  "contact.form_title": "Send Us a Message",
  "contact.whatsapp_cta": "Chat on WhatsApp",
  "contact.brand_desc": "MSME Registered · Innovation-Driven · Client-Focused",
  "contact.brand_locations": "Serving Mohali, Chandigarh, Punjab and Worldwide",

  // ─── VALIDATION ──────────────────────────────────────────────────────────
  "validation.name_min": "Name must contain at least 2 characters",
  "validation.phone_invalid": "Please enter a valid phone number",
  "validation.email_invalid": "Please enter a valid email address",
  "validation.service_required": "Please select a service",
  "validation.message_min": "Message must contain at least 10 characters",
  "validation.message_max": "Your message is too long",

  // ─── FOOTER ──────────────────────────────────────────────────────────────
  "footer.msme": "Remote-first · Innovation-driven · MSME Registered",
  "footer.copy": "All rights reserved. MSME Registered — India.",

  // ─── COMMON ──────────────────────────────────────────────────────────────
  "common.loading": "Loading...",
  "common.error": "Something went wrong",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.learn_more": "Learn More",
  "whatsapp.message": "Hi Zentrox Technologies, I need help with my project.",
};

export { STATIC_FALLBACKS };

// ─── THEME PROVIDER ──────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("zt_theme") as Theme | null;
    const initial: Theme = stored === "dark" || stored === "light" ? stored : "light";
    setThemeState(initial);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initial);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("zt_theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── LANGUAGE PROVIDER – ENGLISH ONLY ────────────────────────────────────────

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

      const merged: Record<string, string> = {
        ...STATIC_FALLBACKS,
        ...(data?.data || {}),
      };

      setTranslations(merged);
    } catch {
      // Keep static fallbacks
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
      return translations[key] || STATIC_FALLBACKS[key] || fallback || key;
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

// ─── MAIN APP PROVIDERS ──────────────────────────────────────────────────────

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

export const useTheme = () => useContext(ThemeContext);
export const useLang = () => useContext(LangContext);
