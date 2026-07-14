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
export type Lang = "en" | "hi" | "pa";

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
  theme: "dark",
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

// ─── STATIC FALLBACKS ─────────────────────────────────────────────────────────
const STATIC_FALLBACKS: Record<Lang, Record<string, string>> = {
  en: {
    "nav.services": "Services",
    "nav.courses": "Courses",
    "nav.internship": "Internship",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.get_started": "Get Started",
    "hero.badge": "Mohali & Chandigarh — MSME Registered Technology Company",
    "hero.line1": "We Build",
    "hero.words":
      "Digital Futures|Web Excellence|AI Solutions|Punjab Growth|SaaS Platforms",
    "hero.sub":
      "Premium web solutions, futuristic SaaS products, and intelligent digital systems — crafted for Punjab's boldest businesses.",
    "hero.cta_primary": "Start Your Project",
    "hero.cta_secondary": "Saturday Live Classes",
    "services.badge": "What We Build",
    "services.title": "Premium Digital Services for Growing Businesses",
    "services.sub":
      "From local startups in Mohali to scaling enterprises — world-class technology at accessible prices.",
    "classes.badge": "Learn with Zentrox Technologies",
    "classes.title": "Live Saturday Classes — Every Week",
    "classes.sub":
      "Master modern website development with weekly live sessions. Interactive, practical, and industry-focused.",
    "classes.enroll": "Enroll Free — Saturday Classes",
    "classes.every_saturday": "Every Saturday — 10:00 AM IST",
    "cta.badge": "Ready to Start?",
    "cta.title": "Transform Your Business",
    "cta.title2": "with Zentrox Technologies",
    "cta.sub":
      "Join hundreds of Punjab businesses already building their digital future with us. First consultation is always free.",
    "cta.primary": "Book Free Consultation",
    "cta.secondary": "Explore Courses",
    "contact.badge": "Get In Touch",
    "contact.title": "Start Your Digital Journey",
    "contact.name": "Your Name",
    "contact.phone": "Phone / WhatsApp",
    "contact.email": "Email Address (optional)",
    "contact.service": "Select Service Required",
    "contact.budget": "Budget Range (optional)",
    "contact.message": "Tell us about your project or business...",
    "contact.send": "Send Message — Get Free Quote",
    "contact.sending": "Sending...",
    "contact.success": "Message sent! We'll contact you within 24 hours.",
    "pricing.badge": "Smart Pricing",
    "pricing.title": "Get Your Custom Quote Instantly",
    "pricing.sub":
      "Answer a few questions and we will recommend the perfect package for your business.",
    "pricing.step.service": "Service",
    "pricing.step.business": "Business",
    "pricing.step.budget": "Budget",
    "pricing.step.quote": "Quote",
    "pricing.back": "Back",
    "pricing.next": "Next",
    "pricing.get_quote": "Get Quote",
    "pricing.consultation": "Book Free Consultation",
    "footer.msme": "MSME Registered · Remote-First · Innovation-Driven",
    "footer.copy": "All rights reserved. MSME Registered — India.",
    // Local section
    "local.badge": "Serving Punjab",
    "local.title": "Built for Mohali, Chandigarh & All of Punjab",
    "local.sub":
      "We understand the local market. Affordable, world-quality solutions tailored for Punjab's businesses and entrepreneurs.",
    "local.card1.title": "Affordable Business Websites",
    "local.card1.desc":
      "Professional websites at competitive prices — no compromise on quality or performance.",
    "local.card2.title": "Coaching Center Platforms",
    "local.card2.desc":
      "Student management, online classes, attendance systems for education institutes.",
    "local.card3.title": "Startup Launch Packages",
    "local.card3.desc":
      "Complete digital presence — website, branding, and growth strategy to launch right.",
    // Services
    "service.web.title": "website development",
    "service.web.desc":
      "Stunning, fast, conversion-optimized websites built with Next.js, React, and modern stacks.",
    "service.mobile.title": "Mobile Application services",
    "service.mobile.desc":
      "Cross-platform mobile apps for iOS and Android that engage users and drive business growth.",
    "service.ai.title": "AI Integration",
    "service.ai.desc":
      "Smart automation, AI chatbots, and ML features that give your business an intelligent edge.",
    "service.seo.title": "SEO & Digital Growth",
    "service.seo.desc":
      "Data-driven SEO, performance marketing, and content strategy to dominate search rankings.",
    "service.ecommerce.title": "E-Commerce Solutions",
    "service.ecommerce.desc":
      "Full-featured online stores with payment gateways, inventory systems, and customer portals.",
    "service.saas.title": "SaaS Development",
    "service.saas.desc":
      "Custom SaaS platforms built for scale — subscription models, dashboards, cloud-native.",
    "service.design.title": "UI/UX Design",
    "service.design.desc":
      "Cinematic, premium interfaces designed to convert — from wireframe to pixel-perfect delivery.",
    "service.software.title": "software development service",
    "service.software.desc":
      "Scalable custom software solutions tailored to your specific business processes and workflows.",
    // Classes countdown
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.mins": "Mins",
    "countdown.secs": "Secs",
    "classes.feat1": "Interactive",
    "classes.feat1_sub": "Live sessions",
    "classes.feat2": "Mentored",
    "classes.feat2_sub": "Expert guidance",
    "classes.feat3": "Certificate",
    "classes.feat3_sub": "On completion",
    // Contact extras
    "contact.sub":
      "Tell us about your project. First consultation is always free. Our team responds within 24 hours.",
    "contact.reach_us": "Reach Us Directly",
    "contact.form_title": "Send Us a Message",
    "contact.whatsapp_cta": "Chat on WhatsApp — Fastest Response",
    "contact.brand_desc": "MSME Registered · Remote-First · Innovation-Driven",
    "contact.brand_locations":
      "Serving Mohali, Chandigarh, Haryana, Himachal Pradesh & Noida",
    "contact.success_title": "Message Sent!",
    "contact.send_another": "Send Another Message",
    "contact.privacy_note":
      "By submitting, you agree to be contacted by Zentrox Technologies. No spam, ever.",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone / WhatsApp",
    "contact.info.location": "Location",
    "contact.info.registration": "Registration",
    "contact.info.reg_value": "MSME Registered — India",
    "contact.info.response": "Response Time",
    "contact.info.response_value": "Within 24 hours",
    // Validation
    "validation.name_min": "Name must be at least 2 characters",
    "validation.phone_invalid": "Enter a valid phone number",
    "validation.email_invalid": "Enter a valid email",
    "validation.service_required": "Please select a service",
    "validation.message_min": "Message must be at least 10 characters",
    "validation.message_max": "Message too long",
    // Stats
    "stats.projects": "Projects Delivered",
    "stats.clients": "Happy Clients",
    "stats.years": "Years Experience",
    "stats.rating": "Average Rating",
    // WhatsApp message
    "whatsapp.message": "Hi Zentrox Technologies, I need help with my project.",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.save": "Save",
  },
  hi: {
    "nav.services": "सेवाएं",
    "nav.courses": "कोर्स",
    "nav.internship": "इंटर्नशिप",
    "nav.blog": "ब्लॉग",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क",
    "nav.login": "लॉगिन",
    "nav.get_started": "शुरू करें",
    "hero.badge": "मोहाली और चंडीगढ़ — MSME पंजीकृत",
    "hero.line1": "हम बनाते हैं",
    "hero.words":
      "डिजिटल भविष्य|वेब उत्कृष्टता|AI समाधान|पंजाब विकास|SaaS प्लेटफॉर्म",
    "hero.sub":
      "प्रीमियम वेब सॉल्यूशन, फ्यूचरिस्टिक SaaS प्रोडक्ट — पंजाब के सबसे महत्वाकांक्षी व्यवसायों के लिए।",
    "hero.cta_primary": "अपना प्रोजेक्ट शुरू करें",
    "hero.cta_secondary": "शनिवार की लाइव क्लास",
    "services.badge": "हम क्या बनाते हैं",
    "services.title": "बढ़ते व्यवसायों के लिए प्रीमियम डिजिटल सेवाएं",
    "services.sub":
      "मोहाली के स्थानीय स्टार्टअप से लेकर बड़े उद्यमों तक — उचित मूल्य पर विश्वस्तरीय तकनीक।",
    "classes.badge": "Zentrox Technologies के साथ सीखें",
    "classes.title": "शनिवार की लाइव क्लास — हर हफ्ते",
    "classes.sub":
      "साप्ताहिक लाइव सेशन के साथ आधुनिक वेब डेवलपमेंट सीखें। इंटरेक्टिव, व्यावहारिक और उद्योग-केंद्रित।",
    "classes.enroll": "मुफ्त में एनरोल करें",
    "classes.every_saturday": "हर शनिवार — सुबह 10:00 बजे IST",
    "cta.badge": "शुरू करने के लिए तैयार?",
    "cta.title": "अपने व्यवसाय को बदलें",
    "cta.title2": "Zentrox Technologies के साथ",
    "cta.sub":
      "पंजाब के सैकड़ों व्यवसायों से जुड़ें जो हमारे साथ अपना डिजिटल भविष्य बना रहे हैं।",
    "cta.primary": "मुफ्त परामर्श बुक करें",
    "cta.secondary": "कोर्स देखें",
    "contact.badge": "संपर्क करें",
    "contact.title": "आज अपनी डिजिटल यात्रा शुरू करें",
    "contact.name": "आपका नाम",
    "contact.phone": "फोन / WhatsApp",
    "contact.email": "ईमेल (वैकल्पिक)",
    "contact.service": "सेवा चुनें",
    "contact.budget": "बजट सीमा (वैकल्पिक)",
    "contact.message": "अपने प्रोजेक्ट के बारे में बताएं...",
    "contact.send": "संदेश भेजें — मुफ्त कोटेशन पाएं",
    "contact.sending": "भेज रहे हैं...",
    "contact.success": "संदेश भेज दिया गया! 24 घंटे में संपर्क करेंगे।",
    "pricing.badge": "स्मार्ट प्राइसिंग",
    "pricing.title": "तुरंत अपना कस्टम कोटेशन पाएं",
    "pricing.sub":
      "कुछ सवालों के जवाब दें और हम आपके व्यवसाय के लिए सही पैकेज सुझाएंगे।",
    "pricing.step.service": "सेवा",
    "pricing.step.business": "व्यवसाय",
    "pricing.step.budget": "बजट",
    "pricing.step.quote": "कोटेशन",
    "pricing.back": "वापस",
    "pricing.next": "आगे",
    "pricing.get_quote": "कोटेशन पाएं",
    "pricing.consultation": "मुफ्त परामर्श बुक करें",
    "footer.msme": "MSME पंजीकृत · रिमोट-फर्स्ट · इनोवेशन-केंद्रित",
    "footer.copy": "सर्वाधिकार सुरक्षित। MSME पंजीकृत — भारत।",
    // Local section
    "local.badge": "पंजाब की सेवा में",
    "local.title": "मोहाली, चंडीगढ़ और पंजाब के लिए बनाया",
    "local.sub":
      "हम स्थानीय बाज़ार को समझते हैं। उचित मूल्य पर विश्वस्तरीय डिजिटल समाधान।",
    "local.card1.title": "किफायती बिजनेस वेबसाइट",
    "local.card1.desc": "प्रतिस्पर्धी कीमतों पर पेशेवर वेबसाइट।",
    "local.card2.title": "कोचिंग सेंटर प्लेटफॉर्म",
    "local.card2.desc": "स्टूडेंट मैनेजमेंट, online क्लास और अटेंडेंस सिस्टम।",
    "local.card3.title": "स्टार्टअप लॉन्च पैकेज",
    "local.card3.desc":
      "वेबसाइट, ब्रांडिंग और ग्रोथ स्ट्रैटेजी के साथ पूर्ण डिजिटल उपस्थिति।",
    // Services
    "service.web.title": "वेब डेवलपमेंट",
    "service.web.desc":
      "Next.js और React से बनी तेज, SEO-ऑप्टिमाइज़ वेबसाइटें।",
    "service.mobile.title": "मोबाइल ऐप",
    "service.mobile.desc": "iOS और Android के लिए क्रॉस-प्लेटफॉर्म mobile ऐप।",
    "service.ai.title": "AI इंटीग्रेशन",
    "service.ai.desc": "स्मार्ट ऑटोमेशन और AI चैटबॉट।",
    "service.seo.title": "SEO और डिजिटल ग्रोथ",
    "service.seo.desc": "डेटा-संचालित SEO और कंटेंट स्ट्रैटेजी।",
    "service.ecommerce.title": "ई-कॉमर्स",
    "service.ecommerce.desc": "पेमेंट गेटवे के साथ पूर्ण ऑनलाइन स्टोर।",
    "service.saas.title": "SaaS डेवलपमेंट",
    "service.saas.desc": "स्केलेबल SaaS प्लेटफॉर्म और डैशबोर्ड।",
    "service.design.title": "UI/UX डिजाइन",
    "service.design.desc": "प्रीमियम इंटरफेस जो कन्वर्ट करते हैं।",
    "service.software.title": "सॉफ्टवेयर डेवलपमेंट",
    "service.software.desc": "कस्टम स्केलेबल सॉफ्टवेयर।",
    // Classes
    "countdown.days": "दिन",
    "countdown.hours": "घंटे",
    "countdown.mins": "मिनट",
    "countdown.secs": "सेकंड",
    "classes.feat1": "इंटरेक्टिव",
    "classes.feat1_sub": "लाइव सेशन",
    "classes.feat2": "मेंटर्ड",
    "classes.feat2_sub": "विशेषज्ञ मार्गदर्शन",
    "classes.feat3": "सर्टिफिकेट",
    "classes.feat3_sub": "पूर्णता पर",
    // Contact
    "contact.sub":
      "अपने प्रोजेक्ट के बारे में बताएं। पहली सलाह हमेशा मुफ्त। 24 घंटे में जवाब।",
    "contact.reach_us": "सीधे संपर्क करें",
    "contact.form_title": "संदेश भेजें",
    "contact.whatsapp_cta": "WhatsApp पर चैट करें — सबसे तेज जवाब",
    "contact.brand_desc": "MSME पंजीकृत · रिमोट-फर्स्ट · इनोवेशन-केंद्रित",
    "contact.brand_locations": "मोहाली, चंडीगढ़, हरियाणा, हिमाचल और नोएडा",
    "contact.success_title": "संदेश भेजा गया!",
    "contact.send_another": "एक और संदेश भेजें",
    "contact.privacy_note":
      "सबमिट करके आप Zentrox Technologies से संपर्क की अनुमति देते हैं।",
    "contact.info.email": "ईमेल",
    "contact.info.phone": "फोन / WhatsApp",
    "contact.info.location": "स्थान",
    "contact.info.registration": "पंजीकरण",
    "contact.info.reg_value": "MSME पंजीकृत — भारत",
    "contact.info.response": "प्रतिक्रिया समय",
    "contact.info.response_value": "24 घंटे के भीतर",
    "validation.name_min": "नाम कम से कम 2 अक्षर होना चाहिए",
    "validation.phone_invalid": "वैध फोन नंबर दर्ज करें",
    "validation.email_invalid": "वैध ईमेल दर्ज करें",
    "validation.service_required": "कृपया सेवा चुनें",
    "validation.message_min": "संदेश कम से कम 10 अक्षर होना चाहिए",
    "validation.message_max": "संदेश बहुत लंबा है",
    "stats.projects": "प्रोजेक्ट डिलीवर",
    "stats.clients": "खुश ग्राहक",
    "stats.years": "वर्षों का अनुभव",
    "stats.rating": "औसत रेटिंग",
    "whatsapp.message":
      "नमस्ते Zentrox Technologies, मुझे मेरे प्रोजेक्ट में मदद चाहिए।",
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हुआ",
    "common.save": "सहेजें",
  },
  pa: {
    "nav.services": "ਸੇਵਾਵਾਂ",
    "nav.courses": "ਕੋਰਸ",
    "nav.internship": "ਇੰਟਰਨਸ਼ਿਪ",
    "nav.blog": "ਬਲੌਗ",
    "nav.about": "ਸਾਡੇ ਬਾਰੇ",
    "nav.contact": "ਸੰਪਰਕ",
    "nav.login": "ਲੌਗਿਨ",
    "nav.get_started": "ਸ਼ੁਰੂ ਕਰੋ",
    "hero.badge": "ਮੋਹਾਲੀ ਅਤੇ ਚੰਡੀਗੜ੍ਹ — MSME ਰਜਿਸਟਰਡ",
    "hero.line1": "ਅਸੀਂ ਬਣਾਉਂਦੇ ਹਾਂ",
    "hero.words": "ਡਿਜੀਟਲ ਭਵਿੱਖ|ਵੈੱਬ ਉੱਤਮਤਾ|AI ਹੱਲ|ਪੰਜਾਬ ਵਿਕਾਸ|SaaS ਪਲੇਟਫਾਰਮ",
    "hero.sub":
      "ਪ੍ਰੀਮੀਅਮ ਵੈੱਬ ਹੱਲ, ਫਿਊਚਰਿਸਟਿਕ SaaS ਅਤੇ ਬੁੱਧੀਮਾਨ ਡਿਜੀਟਲ ਸਿਸਟਮ — ਪੰਜਾਬ ਦੇ ਸਭ ਤੋਂ ਦਲੇਰ ਕਾਰੋਬਾਰਾਂ ਲਈ।",
    "hero.cta_primary": "ਆਪਣਾ ਪ੍ਰੋਜੈਕਟ ਸ਼ੁਰੂ ਕਰੋ",
    "hero.cta_secondary": "ਸ਼ਨੀਵਾਰ ਦੀਆਂ ਲਾਈਵ ਕਲਾਸਾਂ",
    "services.badge": "ਅਸੀਂ ਕੀ ਬਣਾਉਂਦੇ ਹਾਂ",
    "services.title": "ਵਧਦੇ ਕਾਰੋਬਾਰਾਂ ਲਈ ਪ੍ਰੀਮੀਅਮ ਡਿਜੀਟਲ ਸੇਵਾਵਾਂ",
    "services.sub":
      "ਮੋਹਾਲੀ ਦੇ ਸਥਾਨਕ ਸਟਾਰਟਅੱਪ ਤੋਂ ਵੱਡੇ ਉੱਦਮਾਂ ਤੱਕ — ਵਾਜਬ ਕੀਮਤਾਂ ਤੇ ਵਿਸ਼ਵ-ਪੱਧਰੀ ਤਕਨਾਲੋਜੀ।",
    "classes.badge": "Zentrox Technologies ਨਾਲ ਸਿੱਖੋ",
    "classes.title": "ਸ਼ਨੀਵਾਰ ਦੀਆਂ ਲਾਈਵ ਕਲਾਸਾਂ — ਹਰ ਹਫ਼ਤੇ",
    "classes.sub":
      "ਸਾਪਤਾਹਿਕ ਲਾਈਵ ਸੈਸ਼ਨਾਂ ਨਾਲ ਆਧੁਨਿਕ ਵੈੱਬ ਡਿਵੈਲਪਮੈਂਟ ਸਿੱਖੋ। ਇੰਟਰੈਕਟਿਵ, ਵਿਹਾਰਕ ਅਤੇ ਉਦਯੋਗ-ਕੇਂਦ੍ਰਿਤ।",
    "classes.enroll": "ਮੁਫ਼ਤ ਵਿੱਚ ਦਾਖਲਾ ਲਓ",
    "classes.every_saturday": "ਹਰ ਸ਼ਨੀਵਾਰ — ਸਵੇਰੇ 10:00 ਵਜੇ IST",
    "cta.badge": "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ?",
    "cta.title": "ਆਪਣੇ ਕਾਰੋਬਾਰ ਨੂੰ ਬਦਲੋ",
    "cta.title2": "Zentrox Technologies ਨਾਲ",
    "cta.sub":
      "ਪੰਜਾਬ ਦੇ ਸੈਂਕੜੇ ਕਾਰੋਬਾਰਾਂ ਨਾਲ ਜੁੜੋ ਜੋ ਸਾਡੇ ਨਾਲ ਆਪਣਾ ਡਿਜੀਟਲ ਭਵਿੱਖ ਬਣਾ ਰਹੇ ਹਨ।",
    "cta.primary": "ਮੁਫ਼ਤ ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
    "cta.secondary": "ਕੋਰਸ ਦੇਖੋ",
    "contact.badge": "ਸੰਪਰਕ ਕਰੋ",
    "contact.title": "ਅੱਜ ਆਪਣੀ ਡਿਜੀਟਲ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    "contact.name": "ਤੁਹਾਡਾ ਨਾਮ",
    "contact.phone": "ਫ਼ੋਨ / WhatsApp",
    "contact.email": "ਈਮੇਲ (ਵਿਕਲਪਿਕ)",
    "contact.service": "ਸੇਵਾ ਚੁਣੋ",
    "contact.budget": "ਬਜਟ ਸੀਮਾ (ਵਿਕਲਪਿਕ)",
    "contact.message": "ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਬਾਰੇ ਦੱਸੋ...",
    "contact.send": "ਸੁਨੇਹਾ ਭੇਜੋ — ਮੁਫ਼ਤ ਕੋਟੇਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ",
    "contact.sending": "ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    "contact.success": "ਸੁਨੇਹਾ ਭੇਜਿਆ ਗਿਆ! 24 ਘੰਟਿਆਂ ਵਿੱਚ ਸੰਪਰਕ ਕਰਾਂਗੇ।",
    "pricing.badge": "ਸਮਾਰਟ ਪ੍ਰਾਈਸਿੰਗ",
    "pricing.title": "ਤੁਰੰਤ ਆਪਣਾ ਕਸਟਮ ਕੋਟੇਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ",
    "pricing.sub":
      "ਕੁਝ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ ਅਤੇ ਅਸੀਂ ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਲਈ ਸਹੀ ਪੈਕੇਜ ਸੁਝਾਵਾਂਗੇ।",
    "pricing.step.service": "ਸੇਵਾ",
    "pricing.step.business": "ਕਾਰੋਬਾਰ",
    "pricing.step.budget": "ਬਜਟ",
    "pricing.step.quote": "ਕੋਟੇਸ਼ਨ",
    "pricing.back": "ਵਾਪਸ",
    "pricing.next": "ਅੱਗੇ",
    "pricing.get_quote": "ਕੋਟੇਸ਼ਨ ਲਓ",
    "pricing.consultation": "ਮੁਫ਼ਤ ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
    "footer.msme": "MSME ਰਜਿਸਟਰਡ · ਰਿਮੋਟ-ਫਰਸਟ · ਇਨੋਵੇਸ਼ਨ-ਕੇਂਦ੍ਰਿਤ",
    "footer.copy": "ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ। MSME ਰਜਿਸਟਰਡ — ਭਾਰਤ।",
    // Local section
    "local.badge": "ਪੰਜਾਬ ਦੀ ਸੇਵਾ ਵਿੱਚ",
    "local.title": "ਮੋਹਾਲੀ, ਚੰਡੀਗੜ੍ਹ ਅਤੇ ਸਾਰੇ ਪੰਜਾਬ ਲਈ",
    "local.sub":
      "ਅਸੀਂ ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਨੂੰ ਸਮਝਦੇ ਹਾਂ। ਵਾਜਬ ਕੀਮਤਾਂ ਤੇ ਵਿਸ਼ਵ-ਪੱਧਰੀ ਡਿਜੀਟਲ ਹੱਲ।",
    "local.card1.title": "ਕਿਫਾਇਤੀ ਕਾਰੋਬਾਰੀ ਵੈੱਬਸਾਈਟ",
    "local.card1.desc": "ਮੁਕਾਬਲੇਬਾਜ਼ ਕੀਮਤਾਂ ਤੇ ਪੇਸ਼ੇਵਰ ਵੈੱਬਸਾਈਟ।",
    "local.card2.title": "ਕੋਚਿੰਗ ਸੈਂਟਰ ਪਲੇਟਫਾਰਮ",
    "local.card2.desc": "ਵਿਦਿਆਰਥੀ ਪ੍ਰਬੰਧਨ ਅਤੇ ਔਨਲਾਈਨ ਕਲਾਸ ਸਿਸਟਮ।",
    "local.card3.title": "ਸਟਾਰਟਅੱਪ ਲਾਂਚ ਪੈਕੇਜ",
    "local.card3.desc": "ਵੈੱਬਸਾਈਟ, ਬ੍ਰਾਂਡਿੰਗ ਅਤੇ ਗ੍ਰੋਥ ਸਟ੍ਰੈਟੇਜੀ।",
    // Services
    "service.web.title": "ਵੈੱਬ ਡਿਵੈਲਪਮੈਂਟ",
    "service.web.desc": "ਤੇਜ਼, SEO-ਅਨੁਕੂਲਿਤ ਵੈੱਬਸਾਈਟਾਂ।",
    "service.mobile.title": "ਮੋਬਾਈਲ ਐਪ",
    "service.mobile.desc": "iOS ਅਤੇ Android ਲਈ ਐਪ।",
    "service.ai.title": "AI ਏਕੀਕਰਨ",
    "service.ai.desc": "ਸਮਾਰਟ ਆਟੋਮੇਸ਼ਨ ਅਤੇ AI ਚੈਟਬੌਟ।",
    "service.seo.title": "SEO ਅਤੇ ਡਿਜੀਟਲ ਗ੍ਰੋਥ",
    "service.seo.desc": "ਡੇਟਾ-ਅਧਾਰਿਤ SEO ਰਣਨੀਤੀ।",
    "service.ecommerce.title": "ਈ-ਕਾਮਰਸ",
    "service.ecommerce.desc": "ਪੇਮੈਂਟ ਗੇਟਵੇ ਨਾਲ ਔਨਲਾਈਨ ਸਟੋਰ।",
    "service.saas.title": "SaaS ਡਿਵੈਲਪਮੈਂਟ",
    "service.saas.desc": "ਸਕੇਲੇਬਲ SaaS ਪਲੇਟਫਾਰਮ।",
    "service.design.title": "UI/UX ਡਿਜ਼ਾਈਨ",
    "service.design.desc": "ਪ੍ਰੀਮੀਅਮ ਇੰਟਰਫੇਸ।",
    "service.software.title": "ਸੌਫਟਵੇਅਰ ਡਿਵੈਲਪਮੈਂਟ",
    "service.software.desc": "ਕਸਟਮ ਸੌਫਟਵੇਅਰ ਹੱਲ।",
    // Classes
    "countdown.days": "ਦਿਨ",
    "countdown.hours": "ਘੰਟੇ",
    "countdown.mins": "ਮਿੰਟ",
    "countdown.secs": "ਸਕਿੰਟ",
    "classes.feat1": "ਇੰਟਰੈਕਟਿਵ",
    "classes.feat1_sub": "ਲਾਈਵ ਸੈਸ਼ਨ",
    "classes.feat2": "ਮੈਂਟਰਡ",
    "classes.feat2_sub": "ਮਾਹਰ ਮਾਰਗਦਰਸ਼ਨ",
    "classes.feat3": "ਸਰਟੀਫਿਕੇਟ",
    "classes.feat3_sub": "ਪੂਰਾ ਹੋਣ ਤੇ",
    // Contact
    "contact.sub":
      "ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਬਾਰੇ ਦੱਸੋ। ਪਹਿਲੀ ਸਲਾਹ ਹਮੇਸ਼ਾ ਮੁਫ਼ਤ। 24 ਘੰਟਿਆਂ ਵਿੱਚ ਜਵਾਬ।",
    "contact.reach_us": "ਸਿੱਧਾ ਸੰਪਰਕ ਕਰੋ",
    "contact.form_title": "ਸੁਨੇਹਾ ਭੇਜੋ",
    "contact.whatsapp_cta": "WhatsApp ਤੇ ਚੈਟ ਕਰੋ — ਸਭ ਤੋਂ ਤੇਜ਼ ਜਵਾਬ",
    "contact.brand_desc": "MSME ਰਜਿਸਟਰਡ · ਰਿਮੋਟ-ਫਰਸਟ · ਇਨੋਵੇਸ਼ਨ-ਕੇਂਦ੍ਰਿਤ",
    "contact.brand_locations": "ਮੋਹਾਲੀ, ਚੰਡੀਗੜ੍ਹ, ਹਰਿਆਣਾ, ਹਿਮਾਚਲ ਅਤੇ ਨੋਇਡਾ",
    "contact.success_title": "ਸੁਨੇਹਾ ਭੇਜਿਆ ਗਿਆ!",
    "contact.send_another": "ਇੱਕ ਹੋਰ ਸੁਨੇਹਾ ਭੇਜੋ",
    "contact.privacy_note":
      "ਸਬਮਿਟ ਕਰਕੇ ਤੁਸੀਂ Zentrox Technologies ਤੋਂ ਸੰਪਰਕ ਦੀ ਆਗਿਆ ਦਿੰਦੇ ਹੋ।",
    "contact.info.email": "ਈਮੇਲ",
    "contact.info.phone": "ਫ਼ੋਨ / WhatsApp",
    "contact.info.location": "ਟಿಕਾਣਾ",
    "contact.info.registration": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    "contact.info.reg_value": "MSME ਰਜਿਸਟਰਡ — ਭਾਰਤ",
    "contact.info.response": "ਜਵਾਬ ਦਾ ਸਮਾਂ",
    "contact.info.response_value": "24 ਘੰਟਿਆਂ ਵਿੱਚ",
    "validation.name_min": "ਨਾਮ ਘੱਟੋ-ਘੱਟ 2 ਅੱਖਰ ਹੋਣਾ ਚਾਹੀਦਾ",
    "validation.phone_invalid": "ਵੈਧ ਫ਼ੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
    "validation.email_invalid": "ਵੈਧ ਈਮੇਲ ਦਾਖਲ ਕਰੋ",
    "validation.service_required": "ਕਿਰਪਾ ਸੇਵਾ ਚੁਣੋ",
    "validation.message_min": "ਸੁਨੇਹਾ ਘੱਟੋ-ਘੱਟ 10 ਅੱਖਰ ਹੋਣਾ ਚਾਹੀਦਾ",
    "validation.message_max": "ਸੁਨੇਹਾ ਬਹੁਤ ਲੰਮਾ ਹੈ",
    "stats.projects": "ਪ੍ਰੋਜੈਕਟ ਡਿਲੀਵਰ",
    "stats.clients": "ਖੁਸ਼ ਗਾਹਕ",
    "stats.years": "ਸਾਲਾਂ ਦਾ ਤਜ਼ਰਬਾ",
    "stats.rating": "ਔਸਤ ਰੇਟਿੰਗ",
    "whatsapp.message":
      "ਸਤ ਸ੍ਰੀ ਅਕਾਲ Zentrox Technologies, ਮੈਨੂੰ ਮੇਰੇ ਪ੍ਰੋਜੈਕਟ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ ਹੈ।",
    "common.loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    "common.error": "ਕੁਝ ਗਲਤ ਹੋਇਆ",
    "common.save": "ਸੇਵ ਕਰੋ",
  },
};

export { STATIC_FALLBACKS };

// ─── THEME PROVIDER ───────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("zt_theme") as Theme | null;
    const initial = stored || "dark";
    setThemeState(initial);
    document.documentElement.className = initial;
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("zt_theme", t);
    document.documentElement.className = t;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ─── LANG PROVIDER ────────────────────────────────────────────────────────────
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [translations, setTranslations] = useState<Record<string, string>>(
    STATIC_FALLBACKS.en
  );
  const [loadingTranslations, setLoadingTranslations] = useState(false);
  const cacheRef = useRef<Partial<Record<Lang, Record<string, string>>>>({});

  const loadTranslations = useCallback(async (l: Lang) => {
    if (cacheRef.current[l]) {
      setTranslations(cacheRef.current[l]!);
      return;
    }
    setLoadingTranslations(true);
    try {
      const { data } = await api.get(`/translations?lang=${l}`);
      const merged: Record<string, string> = {
        ...STATIC_FALLBACKS[l],
        ...data.data,
      };
      cacheRef.current[l] = merged;
      setTranslations(merged);
    } catch {
      setTranslations({ ...STATIC_FALLBACKS[l] });
    } finally {
      setLoadingTranslations(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("zt_lang") as Lang | null;
    const initial: Lang =
      stored && ["en", "hi", "pa"].includes(stored) ? (stored as Lang) : "en";
    setLangState(initial);
    document.documentElement.setAttribute("lang", initial);
    loadTranslations(initial);
  }, [loadTranslations]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("zt_lang", l);
    document.documentElement.setAttribute("lang", l);
    loadTranslations(l);
  };

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return (
        translations[key] || STATIC_FALLBACKS[lang]?.[key] || fallback || key
      );
    },
    [translations, lang]
  );

  return (
    <LangContext.Provider
      value={{ lang, setLang, t, translations, loadingTranslations }}
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
