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
  // ─── NAVBAR ─────────────────────────────────────────────────
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.about": "About",
  "nav.pricing": "Pricing",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.get_started": "Start Your Project",

  // ─── HERO ───────────────────────────────────────────────────
  "hero.badge": "Your Growth. Our Technology.",
  "hero.line1": "Build Better,",
  "hero.line2": "Grow Faster",
  "hero.sub":
    "We build modern websites, mobile apps and custom software solutions that help businesses grow online and reach their full potential. Remote-first, premium quality, delivered worldwide from Mohali, India.",
  "hero.cta_primary": "Start Your Project",
  "hero.cta_secondary": "Watch Our Work",
  "hero.trust_text":
    "Trusted by businesses across India, USA, UK, Canada, Australia, UAE & Singapore. Founded in 2023.",

  // ─── SERVICES ───────────────────────────────────────────────
  "services.badge": "Our Services",
  "services.title": "Everything Your Business Needs Under One Roof",
  "services.sub":
    "From idea to impact — we offer end-to-end digital solutions that help you build, grow and stay ahead.",
  "services.view_all": "View All Services",
  "services.learn_more": "Learn More",
  "services.cta_title": "Have a Project in Mind?",
  "services.cta_sub":
    "Let's discuss your ideas and turn them into a powerful digital solution.",
  "services.cta_button": "Get a Free Quote",
  "services.explore": "Explore Service",

  // ─── INDIVIDUAL SERVICES ───────────────────────────────────
  "service.web.title": "Website Development",
  "service.web.desc":
    "Modern, responsive and SEO-friendly websites that represent your brand perfectly.",
  "service.web.long":
    "We design and develop fast, mobile-responsive, SEO-optimized websites that help businesses build credibility, generate leads and grow online. Whether you need a business website, landing page or e-commerce store, we build websites that perform.",

  "service.android.title": "Mobile App Development",
  "service.android.desc":
    "iOS & Android apps that users love, with smooth performance and reliable features.",
  "service.android.long":
    "We build high-performance Android and iOS applications with intuitive interfaces and smooth user experiences. From concept to launch, we handle strategy, design, development, testing and deployment.",

  "service.software.title": "Custom Software Development",
  "service.software.desc":
    "Tailored solutions for your unique business needs, built around your workflows.",
  "service.software.long":
    "We build scalable, secure and custom software solutions designed around your business processes. Whether you need internal tools, management systems or industry-specific software, we deliver reliable solutions.",

  "service.design.title": "UI/UX Design",
  "service.design.desc":
    "Beautiful designs. Better experiences. Stronger brand identity.",
  "service.design.long":
    "Human-centered design that makes complex products simple to use. We combine research, strategy and visual design to create digital experiences that users enjoy and businesses benefit from.",

  "service.seo.title": "SEO & Digital Marketing",
  "service.seo.desc":
    "More visibility. More customers. More growth through data-driven campaigns.",
  "service.seo.long":
    "Data-driven SEO and digital marketing strategies that improve visibility, attract qualified traffic and generate more leads. We focus on practical, measurable results for your business.",

  "service.ai.title": "AI Integration & Automation",
  "service.ai.desc":
    "Work smarter with AI-powered solutions and workflow automation.",
  "service.ai.long":
    "Practical AI integrations and automation systems that reduce repetitive work, improve productivity and give your business a competitive edge. From chatbots to workflow automation, we build AI solutions that work.",

  "service.saas.title": "SaaS Development",
  "service.saas.desc":
    "Custom SaaS platforms with subscriptions, dashboards and scalable architecture.",
  "service.saas.long":
    "From MVP to full-scale SaaS products, we help turn your product ideas into reliable digital businesses. We handle multi-tenancy, subscriptions, billing, dashboards and scalable architecture.",

  "service.marketing.title": "Digital Marketing",
  "service.marketing.desc":
    "Digital campaigns and content strategies focused on awareness, leads and growth.",
  "service.marketing.long":
    "Smart digital campaigns that strengthen your brand, generate leads and support sustainable growth. We combine SEO, social media, content and paid campaigns for measurable business outcomes.",

  "service.crm.title": "CRM Development",
  "service.crm.desc":
    "Custom CRM systems that organize sales and improve customer relationships.",
  "service.crm.long":
    "Custom CRM systems designed around your sales process. Organize customer data, streamline sales workflows, improve team visibility and build stronger customer relationships.",

  "service.api.title": "API Integration",
  "service.api.desc":
    "Connect your software, platforms and workflows with reliable integrations.",
  "service.api.long":
    "Reliable API integrations that connect your existing tools, platforms and workflows. Payment gateways, third-party services, data syncing — we make your systems work together seamlessly.",

  // ─── STATS ─────────────────────────────────────────────────
  "stats.badge": "Our Impact",
  "stats.title": "Numbers That Tell Our Story",
  "stats.sub":
    "We're proud of the trust our clients place in us and the results we deliver.",
  "stats.projects": "Projects Delivered",
  "stats.clients": "Happy Clients",
  "stats.countries": "Countries Served",
  "stats.founded": "Founded",
  "stats.years": "Years Experience",
  "stats.rating": "Client Satisfaction",
  "stats.trust": "About",
  "stats.description":
    "From startups and local businesses to growing enterprises, we build practical digital products that solve real business problems.",
  "stats.trust1": "Custom Solutions",
  "stats.trust2": "Transparent Communication",
  "stats.trust3": "Global Delivery",
  "stats.trust4": "Long-Term Support",

  // ─── WHY CHOOSE US / ABOUT ─────────────────────────────────
  "about.badge": "About Zentrox",
  "about.title": "More Than Just a Tech Company",
  "about.sub":
    "We're a team of passionate developers, designers and digital marketers dedicated to turning your ideas into powerful digital experiences. We believe in clean code, creative design and long-term partnerships.",

  "about.point1.title": "Client-Centric Approach",
  "about.point1.desc": "Your goals, our priority.",
  "about.point2.title": "Transparent Process",
  "about.point2.desc": "No hidden costs. No surprises.",
  "about.point3.title": "On-Time Delivery",
  "about.point3.desc": "Because your time matters.",
  "about.point4.title": "Long-Term Support",
  "about.point4.desc": "We're with you, always.",

  "about.story.badge": "Our Story",
  "about.story.title": "Built with Passion, Driven by Purpose",
  "about.story.desc":
    "Zentrox Technologies was founded in 2023 with a single vision — to help businesses grow through technology. Today, we work with clients across India and worldwide, delivering high-quality digital solutions that make an impact.",

  // ─── WHY CHOOSE ────────────────────────────────────────────
  "global.why.title": "Why Businesses Choose Zentrox",
  "global.why.sub":
    "We deliver practical technology built around your business goals.",
  "global.badge": "Industries",
  "global.title": "Built for Different Industries",
  "global.sub":
    "Every industry has different workflows, customers and challenges. Our approach starts by understanding the business before choosing the technology.",
  "global.trust.location": "India & Worldwide",
  "global.trust.business": "Business-Focused Solutions",
  "global.trust.delivery": "Reliable Project Delivery",
  "global.footer1": "Business-Focused Solutions",
  "global.footer2": "Quality & Reliability",
  "global.footer3": "Transparent Process",

  "global.card1.title": "Business-Focused Solutions",
  "global.card1.desc":
    "We don't build technology just for the sake of technology. Every solution is designed around a real business requirement.",
  "global.card1.point1": "Real business requirements",
  "global.card1.point2": "Practical technology",
  "global.card1.point3": "Measurable outcomes",

  "global.card2.title": "Quality & Reliability",
  "global.card2.desc":
    "Clean development practices, testing and attention to detail help us deliver dependable digital products.",
  "global.card2.point1": "Clean development",
  "global.card2.point2": "Rigorous testing",
  "global.card2.point3": "Dependable products",

  "global.card3.title": "Transparent Process",
  "global.card3.desc":
    "From discovery to deployment, clients stay informed about progress, priorities and deliverables.",
  "global.card3.point1": "Clear communication",
  "global.card3.point2": "Regular updates",
  "global.card3.point3": "On-time delivery",

  // ─── PROCESS / PRICING ─────────────────────────────────────
  "pricing.badge": "Our Process",
  "pricing.title": "Simple. Transparent. Effective.",
  "pricing.sub":
    "From discovery to launch, we keep you informed every step of the way.",
  "pricing.step.service": "Discover",
  "pricing.step.business": "Plan",
  "pricing.step.budget": "Build",
  "pricing.step.quote": "Launch & Improve",
  "pricing.back": "Back",
  "pricing.next": "Next",
  "pricing.get_quote": "Get Started",
  "pricing.consultation": "Start Your Project",

  // ─── TESTIMONIALS ──────────────────────────────────────────
  "testimonials.badge": "Testimonials",
  "testimonials.title": "What Our Clients Say",
  "testimonials.sub":
    "We're grateful for the trust and kind words from our amazing clients.",
  "testimonials.view_more": "View More Reviews",

  // ─── CTA ───────────────────────────────────────────────────
  "cta.badge": "Get Started",
  "cta.title": "Let's Build Something Great Together",
  "cta.title2": "Let's Build Something Great Together",
  "cta.sub":
    "Have a project in mind? Let's discuss how we can bring your ideas to life.",
  "cta.primary": "Start Your Project",
  "cta.secondary": "Contact Us",
  "cta.or": "Or",

  // ─── CONTACT ───────────────────────────────────────────────
  "contact.badge": "Get In Touch",
  "contact.title": "Let's Build Something Great",
  "contact.sub":
    "Have a project in mind? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.",
  "contact.name": "Full Name",
  "contact.phone": "Phone Number",
  "contact.email": "Email Address",
  "contact.service": "Service Needed",
  "contact.budget": "Budget Range",
  "contact.message": "Message",
  "contact.message_ph": "Tell us about your project...",
  "contact.send": "Send Message",
  "contact.sending": "Sending...",
  "contact.success": "Message sent successfully!",
  "contact.success_title": "Message Sent!",
  "contact.send_another": "Send Another Message",
  "contact.privacy_note":
    "By submitting this form, you agree to be contacted by Zentrox Technologies.",
  "contact.reach_us": "Reach Us Directly",
  "contact.form_title": "Send Us a Message",
  "contact.whatsapp_cta": "Chat on WhatsApp",
  "contact.brand_desc": "MSME Registered · Remote-First",
  "contact.brand_locations": "Mohali & Chandigarh, Punjab, India",
  "contact.info_email": "Email Address",
  "contact.info_phone": "Phone Number",
  "contact.info_office": "Office Address",
  "contact.info_hours": "Business Hours",
  "contact.hours_value": "Mon – Sat, 10:00 AM – 6:00 PM",
  "contact.reply_time": "We reply within 24 hours",

  // ─── VALIDATION ────────────────────────────────────────────
  "validation.name_min": "Name must contain at least 2 characters",
  "validation.phone_invalid": "Please enter a valid phone number",
  "validation.email_invalid": "Please enter a valid email address",
  "validation.service_required": "Please select a service",
  "validation.message_min": "Message must contain at least 10 characters",
  "validation.message_max": "Your message is too long",

  // ─── FOOTER ────────────────────────────────────────────────
  "footer.tagline": "Software & Digital Growth Partner",
  "footer.quick_links": "Quick Links",
  "footer.our_services": "Our Services",
  "footer.follow_us": "Follow Us",
  "footer.msme": "MSME Registered · Remote-First · Innovation-Driven",
  "footer.copy": "Zentrox Technologies. All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms & Conditions",

  // ─── PORTFOLIO ─────────────────────────────────────────────
  "portfolio.badge": "Our Work",
  "portfolio.title": "Featured Projects",
  "portfolio.sub": "Real businesses. Real solutions. Real results.",
  "portfolio.view_all": "View All Projects",
  "portfolio.view_project": "View Project",
  "portfolio.filter_all": "All",
  "portfolio.filter_web": "Websites",
  "portfolio.filter_mobile": "Mobile Apps",
  "portfolio.filter_branding": "Branding",
  "portfolio.filter_seo": "SEO",

  // ─── BLOG ──────────────────────────────────────────────────
  "blog.badge": "Our Blog",
  "blog.title": "Insights, Tips & Trends",
  "blog.sub":
    "Stay updated with the latest in technology, digital marketing, web development and business growth.",
  "blog.read_more": "Read More",
  "blog.search_placeholder": "Search articles...",
  "blog.no_articles": "No articles found matching your search.",
  "blog.min_read": "min read",

  // ─── COMMON ────────────────────────────────────────────────
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
