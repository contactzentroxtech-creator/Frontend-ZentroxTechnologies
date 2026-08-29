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
export type Lang = "en";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
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
  setLang: () => {},
  t: (k, f) => f || k,
  translations: {},
  loadingTranslations: false,
});

// ─── ENGLISH TRANSLATIONS ────────────────────────────────────────────────────

const STATIC_FALLBACKS: Record<Lang, Record<string, string>> = {
  en: {
    // ─── NAVBAR ────────────────────────────────────────────────────────────
    "nav.services": "Services",
    "nav.courses": "Courses",
    "nav.internship": "Internship",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.get_started": "Get Started",

    // ─── HERO ──────────────────────────────────────────────────────────────
    "hero.badge":
      "Mohali & Chandigarh — MSME Registered Technology Company",
    "hero.line1": "We Build",
    "hero.words":
      "Digital Futures|Web Excellence|AI Solutions|Business Growth|SaaS Platforms",
    "hero.sub":
      "Premium web solutions, powerful SaaS products, and intelligent digital systems built to help ambitious businesses grow.",
    "hero.cta_primary": "Start Your Project",
    "hero.cta_secondary": "View Our Work",

    // ─── SERVICES ──────────────────────────────────────────────────────────
    "services.badge": "What We Do",
    "services.title": "Premium Digital Services for Growing Businesses",
    "services.sub":
      "From startups to scaling enterprises — world-class technology and digital solutions built for growth.",

    // ─── CLASSES ───────────────────────────────────────────────────────────
    "classes.badge": "Learn with Zentrox Technologies",
    "classes.title": "Live Saturday Classes — Every Week",
    "classes.sub":
      "Master modern website development with weekly live sessions. Interactive, practical, and industry-focused.",
    "classes.enroll": "Enroll Free — Saturday Classes",
    "classes.every_saturday": "Every Saturday — 10:00 AM IST",

    // ─── CTA ───────────────────────────────────────────────────────────────
    "cta.badge": "Ready to Build Something Great?",
    "cta.title": "Transform Your Business",
    "cta.title2": "with Zentrox Technologies",
    "cta.sub":
      "Whether you need custom software, a mobile app, or a complete digital strategy — we are here to help. Get a free consultation and discover how Zentrox Technologies can transform your business.",
    "cta.primary": "Get a Free Consultation",
    "cta.secondary": "View Our Work",

    // ─── CONTACT ───────────────────────────────────────────────────────────
    "contact.badge": "Get In Touch",
    "contact.title": "Start Your Digital Journey",
    "contact.name": "Your Name",
    "contact.phone": "Phone / WhatsApp",
    "contact.email": "Email Address (Optional)",
    "contact.service": "Select Required Service",
    "contact.budget": "Budget Range (Optional)",
    "contact.message": "Tell us about your project or business...",
    "contact.send": "Send Message — Get Free Quote",
    "contact.sending": "Sending...",
    "contact.success":
      "Message sent successfully! We'll contact you within 24 hours.",

    "contact.sub":
      "Tell us about your project. Your first consultation is always free. Our team typically responds within 24 hours.",
    "contact.reach_us": "Reach Us Directly",
    "contact.form_title": "Send Us a Message",
    "contact.whatsapp_cta":
      "Chat on WhatsApp — Get a Faster Response",
    "contact.brand_desc":
      "MSME Registered · Innovation-Driven · Client-Focused",
    "contact.brand_locations":
      "Serving Mohali, Chandigarh, Punjab and Businesses Worldwide",
    "contact.success_title": "Message Sent!",
    "contact.send_another": "Send Another Message",
    "contact.privacy_note":
      "By submitting this form, you agree to be contacted by Zentrox Technologies. No spam, ever.",

    "contact.info.email": "Email",
    "contact.info.phone": "Phone / WhatsApp",
    "contact.info.location": "Location",
    "contact.info.registration": "Registration",
    "contact.info.reg_value": "MSME Registered — India",
    "contact.info.response": "Response Time",
    "contact.info.response_value": "Within 24 Hours",

    // ─── PRICING ───────────────────────────────────────────────────────────
    "pricing.badge": "Smart Pricing",
    "pricing.title": "Get Your Custom Quote Instantly",
    "pricing.sub":
      "Answer a few quick questions and we will recommend the right solution for your business.",
    "pricing.step.service": "Service",
    "pricing.step.business": "Business",
    "pricing.step.budget": "Budget",
    "pricing.step.quote": "Quote",
    "pricing.back": "Back",
    "pricing.next": "Next",
    "pricing.get_quote": "Get Quote",
    "pricing.consultation": "Book Free Consultation",

    // ─── FOOTER ────────────────────────────────────────────────────────────
    "footer.msme":
      "MSME Registered · Innovation-Driven · Built for Growth",
    "footer.copy":
      "All rights reserved. MSME Registered — India.",

    // ─── LOCAL SECTION ─────────────────────────────────────────────────────
    "local.badge": "Why Choose Zentrox",
    "local.title":
      "Built for Businesses in Mohali, Chandigarh & Beyond",
    "local.sub":
      "We combine local market understanding with modern technology to deliver powerful, affordable and scalable digital solutions.",

    "local.card1.title": "Modern Digital Solutions",
    "local.card1.desc":
      "Future-ready technology solutions designed to help your business stay ahead of the competition.",

    "local.card2.title": "Quality & Reliability",
    "local.card2.desc":
      "Clean development, rigorous testing and reliable delivery built around high professional standards.",

    "local.card3.title": "Transparent Process",
    "local.card3.desc":
      "Clear communication, structured workflows and complete visibility from discovery to final delivery.",

    // ─── SERVICES DETAILS ──────────────────────────────────────────────────
    "service.web.title": "Website Development",
    "service.web.desc":
      "Fast, modern and conversion-focused websites built with Next.js, React and powerful modern technologies.",

    "service.mobile.title": "Mobile Application Development",
    "service.mobile.desc":
      "High-performance cross-platform mobile applications for Android and iOS designed for business growth.",

    "service.ai.title": "AI Integration",
    "service.ai.desc":
      "Smart automation, AI chatbots and intelligent systems that help your business work faster and smarter.",

    "service.seo.title": "SEO & Digital Growth",
    "service.seo.desc":
      "Data-driven SEO, performance marketing and content strategies designed to improve visibility and growth.",

    "service.ecommerce.title": "E-Commerce Solutions",
    "service.ecommerce.desc":
      "Complete online stores with payment gateways, product management, inventory systems and customer experiences.",

    "service.saas.title": "SaaS Development",
    "service.saas.desc":
      "Custom SaaS platforms built for scalability, subscriptions, dashboards and cloud-based business operations.",

    "service.design.title": "UI/UX Design",
    "service.design.desc":
      "Professional and intuitive interfaces designed to create better experiences and improve conversions.",

    "service.software.title": "Custom Software Development",
    "service.software.desc":
      "Scalable custom software solutions tailored specifically to your business workflows and requirements.",

    // ─── COUNTDOWN ─────────────────────────────────────────────────────────
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.mins": "Minutes",
    "countdown.secs": "Seconds",

    "classes.feat1": "Interactive",
    "classes.feat1_sub": "Live Sessions",

    "classes.feat2": "Mentored",
    "classes.feat2_sub": "Expert Guidance",

    "classes.feat3": "Certificate",
    "classes.feat3_sub": "On Completion",

    // ─── VALIDATION ────────────────────────────────────────────────────────
    "validation.name_min":
      "Name must contain at least 2 characters",

    "validation.phone_invalid":
      "Please enter a valid phone number",

    "validation.email_invalid":
      "Please enter a valid email address",

    "validation.service_required":
      "Please select a service",

    "validation.message_min":
      "Message must contain at least 10 characters",

    "validation.message_max":
      "Your message is too long",

    // ─── STATS ─────────────────────────────────────────────────────────────
    "stats.projects": "Projects Delivered",
    "stats.clients": "Happy Clients",
    "stats.years": "Years Experience",
    "stats.rating": "Average Rating",

    // ─── WHATSAPP ──────────────────────────────────────────────────────────
    "whatsapp.message":
      "Hi Zentrox Technologies, I need help with my project.",

    // ─── COMMON ────────────────────────────────────────────────────────────
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.learn_more": "Learn More",
  },
};

export { STATIC_FALLBACKS };

// ─── THEME PROVIDER ───────────────────────────────────────────────────────────

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("zt_theme") as Theme | null;

    // Default theme is LIGHT
    const initial: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : "light";

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
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ─── LANGUAGE PROVIDER ────────────────────────────────────────────────────────
// English Only

export function LangProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang] = useState<Lang>("en");

  const [translations, setTranslations] =
    useState<Record<string, string>>(
      STATIC_FALLBACKS.en
    );

  const [loadingTranslations, setLoadingTranslations] =
    useState(false);

  const cacheRef =
    useRef<Partial<Record<Lang, Record<string, string>>>>({});

  const loadTranslations = useCallback(async () => {
    // Already cached
    if (cacheRef.current.en) {
      setTranslations(cacheRef.current.en);
      return;
    }

    setLoadingTranslations(true);

    try {
      const { data } = await api.get(
        "/translations?lang=en"
      );

      const merged: Record<string, string> = {
        ...STATIC_FALLBACKS.en,
        ...(data?.data || {}),
      };

      cacheRef.current.en = merged;

      setTranslations(merged);
    } catch {
      // If API fails, use static English translations
      setTranslations({
        ...STATIC_FALLBACKS.en,
      });
    } finally {
      setLoadingTranslations(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "lang",
      "en"
    );

    localStorage.setItem("zt_lang", "en");

    loadTranslations();
  }, [loadTranslations]);

  // English only - kept for compatibility
  const setLang = () => {
    localStorage.setItem("zt_lang", "en");
    document.documentElement.setAttribute(
      "lang",
      "en"
    );
  };

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return (
        translations[key] ||
        STATIC_FALLBACKS.en[key] ||
        fallback ||
        key
      );
    },
    [translations]
  );

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        t,
        translations,
        loadingTranslations,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

// ─── MAIN APP PROVIDERS ───────────────────────────────────────────────────────

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LangProvider>
        {children}
      </LangProvider>
    </ThemeProvider>
  );
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

export const useTheme = () =>
  useContext(ThemeContext);

export const useLang = () =>
  useContext(LangContext);
