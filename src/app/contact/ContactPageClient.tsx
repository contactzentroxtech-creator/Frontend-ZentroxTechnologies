"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building2,
} from "lucide-react";
import api from "@/lib/api";
import { useLang } from "@/lib/providers";

const makeSchema = (t: (k: string, f?: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, t("validation.name_min", "Name must be at least 2 characters")),
    phone: z
      .string()
      .min(10, t("validation.phone_invalid", "Enter a valid phone number")),
    email: z
      .string()
      .email(t("validation.email_invalid", "Enter a valid email"))
      .or(z.literal(""))
      .optional(),
    service: z
      .string()
      .min(1, t("validation.service_required", "Please select a service")),
    budget: z.string().optional(),
    message: z
      .string()
      .min(
        10,
        t("validation.message_min", "Message must be at least 10 characters")
      )
      .max(1000, t("validation.message_max", "Message too long")),
  });

type FormData = z.infer<ReturnType<typeof makeSchema>>;

const SERVICES_EN = [
  "website development",
  "Mobile App Development",
  "SaaS Development",
  "AI Integration",
  "SEO Services",
  "Digital Marketing Services",
  "UI/UX Design",
  "software development service",
  "View our work",
  "Remote Internship",
  "Other",
];
const SERVICES_HI = [
  "वेब डेवलपमेंट",
  "मोबाइल ऐप डेवलपमेंट",
  "SaaS डेवलपमेंट",
  "AI इंटीग्रेशन",
  "SEO सेवाएं",
  "डिजिटल मार्केटिंग",
  "UI/UX डिजाइन",
  "सॉफ्टवेयर डेवलपमेंट",
  "शनिवार लाइव क्लास",
  "रिमोट इंटर्नशिप",
  "अन्य",
];
const SERVICES_PA = [
  "ਵੈੱਬ ਡਿਵੈਲਪਮੈਂਟ",
  "ਮੋਬਾਈਲ ਐਪ ਡਿਵੈਲਪਮੈਂਟ",
  "SaaS ਡਿਵੈਲਪਮੈਂਟ",
  "AI ਏਕੀਕਰਨ",
  "SEO ਸੇਵਾਵਾਂ",
  "ਡਿਜੀਟਲ ਮਾਰਕੀਟਿੰਗ",
  "UI/UX ਡਿਜ਼ਾਈਨ",
  "ਸੌਫਟਵੇਅਰ ਡਿਵੈਲਪਮੈਂਟ",
  "ਸ਼ਨੀਵਾਰ ਲਾਈਵ ਕਲਾਸ",
  "ਰਿਮੋਟ ਇੰਟਰਨਸ਼ਿਪ",
  "ਹੋਰ",
];
const BUDGETS_EN = [
  "Under ₹10,000",
  "₹10,000 — ₹25,000",
  "₹25,000 — ₹50,000",
  "₹50,000 — ₹1,00,000",
  "₹1,00,000+",
  "Let us suggest",
];
const BUDGETS_HI = [
  "₹10,000 से कम",
  "₹10,000 — ₹25,000",
  "₹25,000 — ₹50,000",
  "₹50,000 — ₹1,00,000",
  "₹1,00,000+",
  "हम सुझाएंगे",
];
const BUDGETS_PA = [
  "₹10,000 ਤੋਂ ਘੱਟ",
  "₹10,000 — ₹25,000",
  "₹25,000 — ₹50,000",
  "₹50,000 — ₹1,00,000",
  "₹1,00,000+",
  "ਅਸੀਂ ਸੁਝਾਵਾਂਗੇ",
];

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const { t, lang } = useLang();
  const schema = makeSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const services =
    lang === "hi" ? SERVICES_HI : lang === "pa" ? SERVICES_PA : SERVICES_EN;
  const budgets =
    lang === "hi" ? BUDGETS_HI : lang === "pa" ? BUDGETS_PA : BUDGETS_EN;

  const CONTACT_INFO = [
    {
      icon: Mail,
      label: t("contact.info.email", "Email"),
      value: "contact.zentroxtech@gmail.com",
      href: "mailto:contact.zentroxtech@gmail.com",
    },
    {
      icon: Phone,
      label: t("contact.info.phone", "Phone / WhatsApp"),
      value: "+91 89881 83513",
      href: "tel:+918988183513",
    },
    {
      icon: MapPin,
      label: t("contact.info.location", "Location"),
      value: "Mohali & Chandigarh, Punjab",
      href: null,
    },
    {
      icon: Building2,
      label: t("contact.info.registration", "Registration"),
      value: t("contact.info.reg_value", "MSME Registered — India"),
      href: null,
    },
    {
      icon: Clock,
      label: t("contact.info.response", "Response Time"),
      value: t("contact.info.response_value", "Within 24 hours"),
      href: null,
    },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/leads", data);
      setSubmitted(true);
      reset();
      toast.success(
        t("contact.success", "Message sent! We'll contact you within 24 hours.")
      );
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          t("common.error", "Failed to send. Try WhatsApp instead.")
      );
    }
  };

  return (
    <section className="relative z-10 py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="z-badge mx-auto mb-4">
            {t("contact.badge", "Get In Touch")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t("contact.title", "Start Your Digital Journey")}
            <br />
            <span className="gradient-text">Today</span>
          </h1>
          <p className="text-base text-z-muted max-w-xl mx-auto leading-relaxed">
            {t(
              "contact.sub",
              "Tell us about your project. First consultation is always free. Our team responds within 24 hours."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {t("contact.reach_us", "Reach Us Directly")}
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 glass-card p-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-z-accent/10 border border-z-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-z-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-z-muted uppercase tracking-widest">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-white hover:text-z-accent transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-white">
                        {value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918988183513"
              }?text=${encodeURIComponent(
                t(
                  "whatsapp.message",
                  "Hi Zentrox Technologies, I need help with my project."
                )
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25d366] text-white font-semibold hover:bg-[#22c55e] transition-colors shadow-lg mb-4"
            >
              <MessageCircle size={20} />
              {t("contact.whatsapp_cta", "Chat on WhatsApp — Fastest Response")}
            </a>

            <div className="glass-card p-5 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-z-accent opacity-[0.06] blur-[40px]" />
              </div>
              <div className="text-sm font-semibold text-white mb-1.5">
                Zentrox Technologies
              </div>
              <div className="text-xs text-z-muted leading-relaxed">
                {t(
                  "contact.brand_desc",
                  "MSME Registered · Remote-First · Innovation-Driven"
                )}
                <br />
                {t(
                  "contact.brand_locations",
                  "Serving Mohali, Chandigarh, Haryana, Himachal Pradesh & Noida"
                )}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-z-accent3/20 border border-z-accent3/30 flex items-center justify-center mb-4">
                  <Send size={28} className="text-z-accent3" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("contact.success_title", "Message Sent!")}
                </h3>
                <p className="text-z-muted text-sm leading-relaxed mb-6">
                  {t(
                    "contact.success",
                    "Message sent! We'll contact you within 24 hours."
                  )}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-z-accent text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
                >
                  {t("contact.send_another", "Send Another Message")}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card p-8 flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {t("contact.form_title", "Send Us a Message")}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register("name")}
                      placeholder={t("contact.name", "Your Name") + " *"}
                      className="z-input"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("phone")}
                      placeholder={
                        t("contact.phone", "Phone / WhatsApp") + " *"
                      }
                      className="z-input"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t("contact.email", "Email Address (optional)")}
                    className="z-input"
                  />
                </div>

                <div>
                  <select {...register("service")} className="z-input">
                    <option value="">
                      {t("contact.service", "Select Service Required") + " *"}
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <select {...register("budget")} className="z-input">
                    <option value="">
                      {t("contact.budget", "Budget Range (optional)")}
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder={
                      t(
                        "contact.message",
                        "Tell us about your project or business..."
                      ) + " *"
                    }
                    className="z-input resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("contact.sending", "Sending...")}
                    </>
                  ) : (
                    <>
                      <Send size={16} />{" "}
                      {t("contact.send", "Send Message — Get Free Quote")}
                    </>
                  )}
                </button>

                <p className="text-[11px] text-z-muted text-center">
                  {t(
                    "contact.privacy_note",
                    "By submitting, you agree to be contacted by Zentrox Technologies. No spam, ever."
                  )}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
