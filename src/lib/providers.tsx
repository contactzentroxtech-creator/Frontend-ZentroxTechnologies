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

const STATIC_FALLBACKS: Record<string, string> = {
  "nav.services": "Services",
  "nav.blog": "Insights",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.get_started": "Start a Project",

  "hero.badge": "Mohali & Chandigarh — MSME Registered Technology Company",
  "hero.line1": "We Build",
  "hero.line2": "Move Businesses Forward.",
  "hero.sub":
    "Zentrox Technologies helps businesses turn ideas into reliable software, websites, mobile applications and digital growth solutions.",
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
  "cta.sub": "
