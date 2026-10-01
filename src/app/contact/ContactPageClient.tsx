"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  User,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

/* =========================================================
   DATA
========================================================= */

const SERVICE_OPTIONS = [
  "Website Development",
  "Mobile App Development",
  "Custom Software Development",
  "UI/UX Design",
  "SEO & Digital Marketing",
  "AI Integration & Automation",
  "SaaS Development",
  "CRM Development",
  "API Integration",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000+",
  "Not sure yet",
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ContactPageClient() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918988183513";
  const whatsappMsg = encodeURIComponent(
    "Hi Zentrox Technologies, I'd like to discuss a project."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  /* ─── VALIDATION ─────────────────────────────── */
  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) {
      e.name = "Name must contain at least 2 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address";
    }
    if (form.phone && !/^[\d\s+\-()]{7,15}$/.test(form.phone)) {
      e.phone = "Please enter a valid phone number";
    }
    if (!form.service) {
      e.service = "Please select a service";
    }
    if (form.message.trim().length < 10) {
      e.message = "Message must contain at least 10 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ─── SUBMIT ─────────────────────────────────── */
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.post("/leads", {
        ...form,
        source: "contact-page",
      });
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[key];
        return n;
      });
    }
  };

  return (
    <main className="bg-white">
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
              <MessageCircle size={13} />
              {t("contact.badge", "Get In Touch")}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("contact.title1", "Let's Build")}{" "}
              <span className="gradient-text">
                {t("contact.title2", "Something Great")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
              {t(
                "contact.sub",
                "Have a project in mind? We'd love to hear from you. Drop us a message and we'll get back to you within 24 hours."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT GRID ─────────────────────────── */}
      <section
        ref={ref}
        className="relative bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ─── LEFT: INFO ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <h2 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                {t("contact.info.title", "Reach Us Directly")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {t(
                  "contact.info.sub",
                  "Prefer to talk? Use any of the options below — we usually respond within a few hours."
                )}
              </p>

              {/* Info cards */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email Address",
                    value: "contact.zentroxtech@gmail.com",
                    href: "mailto:contact.zentroxtech@gmail.com",
                    color: "#2563eb",
                  },
                  {
                    icon: Phone,
                    label: "Phone Number",
                    value: "+91 89881 83513",
                    href: "tel:+918988183513",
                    color: "#7c3aed",
                  },
                  {
                    icon: MapPin,
                    label: "Office Location",
                    value: "Mohali, Punjab, India – 140308",
                    href: null,
                    color: "#0891b2",
                  },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    value: "Mon – Sat, 10:00 AM – 6:00 PM",
                    href: null,
                    color: "#ea580c",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    >
                      <Wrapper
                        {...(item.href
                          ? {
                              href: item.href,
                              className:
                                "group flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg",
                            }
                          : {
                              className:
                                "group flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg",
                            })}
                      >
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: `${item.color}12`,
                            color: item.color,
                          }}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            {item.label}
                          </p>
                          <p className="mt-0.5 break-words text-sm font-semibold text-slate-900">
                            {item.value}
                          </p>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group mt-6 inline-flex w-full items-center justify-center gap-2
                  rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600
                  px-6 py-3.5 text-sm font-semibold text-white
                  shadow-lg shadow-emerald-600/25
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/35
                "
              >
                <MessageCircle size={16} />
                {t("contact.whatsapp_cta", "Chat on WhatsApp")}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* Trust line */}
              <p className="mt-4 text-center text-xs text-slate-500">
                {t("contact.reply_time", "We reply within 24 hours")}
              </p>
            </motion.div>

            {/* ─── RIGHT: FORM ────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {t("contact.success_title", "Message Sent!")}
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
                      {t(
                        "contact.success",
                        "Thank you for reaching out. Our team will get back to you within 24 hours."
                      )}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-300 hover:text-blue-600"
                    >
                      {t("contact.send_another", "Send Another Message")}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {t("contact.form_title", "Send Us a Message")}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {t(
                          "contact.form_sub",
                          "Fill the form and our team will get back to you within 24 hours."
                        )}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            {t("contact.name", "Full Name")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Your full name"
                            className="input-field"
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            {t("contact.email", "Email Address")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="you@example.com"
                            className="input-field"
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone + Service */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            {t("contact.phone", "Phone Number")}
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            placeholder="+91 XXXXX XXXXX"
                            className="input-field"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            {t("contact.service", "Service Needed")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={form.service}
                            onChange={(e) =>
                              updateField("service", e.target.value)
                            }
                            className="input-field"
                          >
                            <option value="">Select a service</option>
                            {SERVICE_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {errors.service && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.service}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700">
                          {t("contact.budget", "Budget Range")}
                        </label>
                        <select
                          value={form.budget}
                          onChange={(e) =>
                            updateField("budget", e.target.value)
                          }
                          className="input-field"
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_OPTIONS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700">
                          {t("contact.message", "Message")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) =>
                            updateField("message", e.target.value)
                          }
                          rows={5}
                          placeholder={t(
                            "contact.message_ph",
                            "Tell us about your project..."
                          )}
                          className="input-field resize-none"
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`
                          group flex w-full items-center justify-center gap-2
                          rounded-full bg-gradient-to-r from-blue-600 to-purple-600
                          px-7 py-3.5 text-sm font-semibold text-white
                          shadow-lg shadow-blue-600/25
                          transition-all duration-300
                          ${
                            submitting
                              ? "cursor-not-allowed opacity-70"
                              : "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/35"
                          }
                        `}
                      >
                        {submitting ? (
                          t("contact.sending", "Sending...")
                        ) : (
                          <>
                            {t("contact.send", "Send Message")}
                            <Send
                              size={15}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>

                      {/* Privacy note */}
                      <p className="text-center text-[11px] leading-relaxed text-slate-500">
                        {t(
                          "contact.privacy_note",
                          "By submitting this form, you agree to be contacted by Zentrox Technologies."
                        )}
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
