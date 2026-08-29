"use client";

import { useMemo, useState } from "react";
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

type Language = "en" | "hi" | "pa";

const makeSchema = (t: (key: string, fallback?: string) => string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(
        2,
        t(
          "validation.name_min",
          "Name must be at least 2 characters"
        )
      ),

    phone: z
      .string()
      .trim()
      .min(
        10,
        t(
          "validation.phone_invalid",
          "Enter a valid phone number"
        )
      )
      .max(
        20,
        t(
          "validation.phone_invalid",
          "Enter a valid phone number"
        )
      ),

    email: z
      .string()
      .trim()
      .email(
        t(
          "validation.email_invalid",
          "Enter a valid email"
        )
      )
      .or(z.literal(""))
      .optional(),

    service: z.string().min(
      1,
      t(
        "validation.service_required",
        "Please select a service"
      )
    ),

    budget: z.string().optional(),

    message: z
      .string()
      .trim()
      .min(
        10,
        t(
          "validation.message_min",
          "Message must be at least 10 characters"
        )
      )
      .max(
        1000,
        t(
          "validation.message_max",
          "Message too long"
        )
      ),
  });

type FormData = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  budget?: string;
  message: string;
};

/* =========================================
   SERVICES
========================================= */

const SERVICES_EN = [
  "Website Development",
  "Mobile App Development",
  "SaaS Development",
  "AI Integration",
  "SEO Services",
  "Digital Marketing Services",
  "UI/UX Design",
  "Software Development Service",
  "View Our Work",
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
  "हमारा काम देखें",
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
  "ਸਾਡਾ ਕੰਮ ਵੇਖੋ",
  "ਰਿਮੋਟ ਇੰਟਰਨਸ਼ਿਪ",
  "ਹੋਰ",
];

/* =========================================
   BUDGETS
========================================= */

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
  "हम सुझाव दें",
];

const BUDGETS_PA = [
  "₹10,000 ਤੋਂ ਘੱਟ",
  "₹10,000 — ₹25,000",
  "₹25,000 — ₹50,000",
  "₹50,000 — ₹1,00,000",
  "₹1,00,000+",
  "ਸਾਨੂੰ ਸੁਝਾਅ ਦੇਣ ਦਿਓ",
];

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);

  const { t, lang } = useLang();

  const currentLang: Language =
    lang === "hi"
      ? "hi"
      : lang === "pa"
        ? "pa"
        : "en";

  const schema = useMemo(
    () => makeSchema(t),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  /* =========================================
     LANGUAGE BASED SERVICES
  ========================================= */

  const services =
    currentLang === "hi"
      ? SERVICES_HI
      : currentLang === "pa"
        ? SERVICES_PA
        : SERVICES_EN;

  /* =========================================
     LANGUAGE BASED BUDGETS
  ========================================= */

  const budgets =
    currentLang === "hi"
      ? BUDGETS_HI
      : currentLang === "pa"
        ? BUDGETS_PA
        : BUDGETS_EN;

  /* =========================================
     CONTACT INFORMATION
  ========================================= */

  const CONTACT_INFO = [
    {
      icon: Mail,
      label: t(
        "contact.info.email",
        "Email"
      ),
      value: "contact.zentroxtech@gmail.com",
      href: "mailto:contact.zentroxtech@gmail.com",
    },
    {
      icon: Phone,
      label: t(
        "contact.info.phone",
        "Phone / WhatsApp"
      ),
      value: "+91 89881 83513",
      href: "tel:+918988183513",
    },
    {
      icon: MapPin,
      label: t(
        "contact.info.location",
        "Location"
      ),
      value: "Mohali & Chandigarh, Punjab",
      href: null,
    },
    {
      icon: Building2,
      label: t(
        "contact.info.registration",
        "Registration"
      ),
      value: t(
        "contact.info.reg_value",
        "MSME Registered — India"
      ),
      href: null,
    },
    {
      icon: Clock,
      label: t(
        "contact.info.response",
        "Response Time"
      ),
      value: t(
        "contact.info.response_value",
        "Within 24 hours"
      ),
      href: null,
    },
  ];

  /* =========================================
     FORM SUBMIT
  ========================================= */

  const onSubmit = async (
    data: FormData
  ) => {
    try {
      await api.post("/leads", data);

      setSubmitted(true);

      reset();

      toast.success(
        t(
          "contact.success",
          "Message sent! We'll contact you within 24 hours."
        )
      );
    } catch (error: unknown) {
      let message = t(
        "common.error",
        "Failed to send. Try WhatsApp instead."
      );

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const apiError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        if (
          apiError.response?.data?.message
        ) {
          message =
            apiError.response.data.message;
        }
      }

      toast.error(message);
    }
  };

  /* =========================================
     WHATSAPP
  ========================================= */

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "918988183513";

  const whatsappMessage = encodeURIComponent(
    t(
      "whatsapp.message",
      "Hi Zentrox Technologies, I need help with my project."
    )
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative z-10 overflow-hidden bg-white px-4 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#04050a] dark:text-white md:px-6">
      {/* Background Effects */}

      <div className="pointer-events-none absolute left-[-150px] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[5%] right-[-150px] h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-14 text-center"
        >
          <div className="z-badge mx-auto mb-4">
            {t(
              "contact.badge",
              "Get In Touch"
            )}
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {t(
              "contact.title",
              "Start Your Digital Journey"
            )}

            <br />

            <span className="gradient-text">
              {t(
                "contact.title_today",
                "Today"
              )}
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 dark:text-z-muted">
            {t(
              "contact.sub",
              "Tell us about your project. First consultation is always free. Our team responds within 24 hours."
            )}
          </p>
        </motion.div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* CONTACT INFORMATION */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
              {t(
                "contact.reach_us",
                "Reach Us Directly"
              )}
            </h2>

            <div className="mb-8 flex flex-col gap-4">

              {CONTACT_INFO.map(
                ({
                  icon: Icon,
                  label,
                  value,
                  href,
                }) => (
                  <div
                    key={label}
                    className="glass-card flex items-center gap-4 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-z-accent/20 bg-z-accent/10">
                      <Icon
                        size={18}
                        className="text-z-accent"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-widest text-z-muted">
                        {label}
                      </div>

                      {href ? (
                        <a
                          href={href}
                          className="break-all text-sm font-medium text-slate-900 transition-colors hover:text-z-accent dark:text-white"
                        >
                          {value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {value}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

            </div>

            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#22C55E]"
            >
              <MessageCircle size={20} />

              {t(
                "contact.whatsapp_cta",
                "Chat on WhatsApp — Fastest Response"
              )}
            </a>

            {/* COMPANY CARD */}

            <div className="glass-card relative overflow-hidden p-5">

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-z-accent opacity-[0.06] blur-[40px]" />
              </div>

              <div className="relative">
                <div className="mb-1.5 text-sm font-semibold text-slate-900 dark:text-white">
                  Zentrox Technologies
                </div>

                <div className="text-xs leading-relaxed text-z-muted">
                  {t(
                    "contact.brand_desc",
                    "MSME Registered · Remote-First · Innovation-Driven"
                  )}

                  <br />

                  {t(
                    "contact.brand_locations",
                    "Serving Mohali, Chandigarh, Punjab & clients worldwide"
                  )}
                </div>
              </div>

            </div>

          </motion.div>

          {/* CONTACT FORM */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
          >
            {submitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="glass-card flex h-full min-h-[500px] flex-col items-center justify-center p-10 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-z-accent3/30 bg-z-accent3/20">
                  <Send
                    size={28}
                    className="text-z-accent3"
                  />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {t(
                    "contact.success_title",
                    "Message Sent!"
                  )}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-z-muted">
                  {t(
                    "contact.success",
                    "Message sent! We'll contact you within 24 hours."
                  )}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSubmitted(false)
                  }
                  className="rounded-full bg-z-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  {t(
                    "contact.send_another",
                    "Send Another Message"
                  )}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card flex flex-col gap-4 p-6 md:p-8"
              >
                <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {t(
                    "contact.form_title",
                    "Send Us a Message"
                  )}
                </h2>

                {/* NAME + PHONE */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <input
                      {...register("name")}
                      autoComplete="name"
                      placeholder={
                        t(
                          "contact.name",
                          "Your Name"
                        ) + " *"
                      }
                      className="z-input"
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      autoComplete="tel"
                      placeholder={
                        t(
                          "contact.phone",
                          "Phone / WhatsApp"
                        ) + " *"
                      }
                      className="z-input"
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* EMAIL */}

                <div>
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder={t(
                      "contact.email",
                      "Email Address (optional)"
                    )}
                    className="z-input"
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* SERVICE */}

                <div>
                  <select
                    {...register("service")}
                    className="z-input"
                  >
                    <option value="">
                      {t(
                        "contact.service",
                        "Select Service Required"
                      ) + " *"}
                    </option>

                    {services.map(
                      (service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      )
                    )}
                  </select>

                  {errors.service && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                {/* BUDGET */}

                <div>
                  <select
                    {...register("budget")}
                    className="z-input"
                  >
                    <option value="">
                      {t(
                        "contact.budget",
                        "Budget Range (optional)"
                      )}
                    </option>

                    {budgets.map(
                      (budget) => (
                        <option
                          key={budget}
                          value={budget}
                        >
                          {budget}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder={
                      t(
                        "contact.message",
                        "Tell us about your project or business..."
                      ) + " *"
                    }
                    className="z-input resize-none"
                  />

                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shadow-glow-sm flex w-full items-center justify-center gap-2 rounded-xl bg-z-accent py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      {t(
                        "contact.sending",
                        "Sending..."
                      )}
                    </>
                  ) : (
                    <>
                      <Send size={16} />

                      {t(
                        "contact.send",
                        "Send Message — Get Free Quote"
                      )}
                    </>
                  )}
                </button>

                {/* PRIVACY */}

                <p className="text-center text-[11px] text-z-muted">
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
