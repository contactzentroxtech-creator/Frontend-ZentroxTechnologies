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
  ArrowRight,
} from "lucide-react";
import api from "@/lib/api";

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

export default function ContactPageClient() {
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

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918988183513";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Zentrox Technologies, I'd like to discuss a project."
  )}`;

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Name must contain at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    if (!form.service) e.service = "Please select a service";
    if (form.message.trim().length < 10)
      e.message = "Message must contain at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.post("/leads", { ...form, source: "contact-page" });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
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
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <MessageCircle size={13} />
              Get In Touch
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Let's Build{" "}
              <span className="gradient-text">Something Great</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
              Have a project in mind? We'd love to hear from you. Drop us a message
              and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <h2 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                Reach Us Directly
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Prefer to talk? Use any of the options below.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "contact.zentroxtech@gmail.com", href: "mailto:contact.zentroxtech@gmail.com", color: "#2563eb" },
                  { icon: Phone, label: "Phone", value: "+91 89881 83513", href: "tel:+918988183513", color: "#7c3aed" },
                  { icon: MapPin, label: "Location", value: "Mohali, Punjab, India – 140308", href: null, color: "#0891b2" },
                  { icon: Clock, label: "Hours", value: "Mon – Sat, 10:00 AM – 6:00 PM", href: null, color: "#ea580c" },
                ].map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}12`, color: item.color }}
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
                  );
                })}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-1"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
                <ArrowRight size={15} />
              </a>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg sm:p-8 lg:p-10">
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">Message Sent!</h3>
                    <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      Send Us a Message
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Fill the form and we'll get back within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Your full name"
                            className="input-field"
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@example.com"
                            className="input-field"
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">Phone</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-700">
                            Service <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={form.service}
                            onChange={(e) => updateField("service", e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select a service</option>
                            {SERVICE_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700">Budget Range</label>
                        <select
                          value={form.budget}
                          onChange={(e) => updateField("budget", e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_OPTIONS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          rows={5}
                          placeholder="Tell us about your project..."
                          className="input-field resize-none"
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className={`group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all ${
                          submitting ? "cursor-not-allowed opacity-70" : "hover:-translate-y-1"
                        }`}
                      >
                        {submitting ? "Sending..." : "Send Message"}
                        <Send size={15} />
                      </button>

                      <p className="text-center text-[11px] text-slate-500">
                        By submitting, you agree to be contacted by Zentrox Technologies.
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
