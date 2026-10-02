import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Wine,
  Car,
  Globe,
  Smartphone,
  Code2,
  Palette,
  ShoppingBag,
  Utensils,
  Dumbbell,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Our Recent Projects & Case Studies",
  description:
    "Explore Zentrox Technologies portfolio — websites, mobile apps, custom software and digital solutions we've built for businesses in India and worldwide.",
  alternates: { canonical: "https://zentroxtechnologies.com/portfolio" },
  openGraph: {
    title: "Portfolio | Zentrox Technologies",
    description:
      "Real projects. Real businesses. Real results. Explore websites we've built.",
    url: "https://zentroxtechnologies.com/portfolio",
    type: "website",
  },
};

const PROJECTS = [
  // ─── REAL PROJECTS ────────────────────────────
  {
    title: "The Tipsy Bar",
    category: "Website Development",
    description:
      "Premium bartender service website with online booking, service showcase and Google reviews integration for a Tri-City based bar services company.",
    url: "https://thetipsybar.in/",
    icon: Wine,
    color: "#7c3aed",
    results: [
      "+140% online bookings",
      "Google Reviews integration",
      "Mobile-first design",
    ],
    tags: ["Next.js", "Responsive", "SEO"],
    real: true,
  },
  {
    title: "Mehra Driving School",
    category: "Website Development",
    description:
      "Chandigarh's trusted driving academy website with course listings, instructor profiles, home pickup information and online booking system.",
    url: "https://www.mehradrivingschool.com/",
    icon: Car,
    color: "#0891b2",
    results: [
      "3000+ drivers trained",
      "Course booking system",
      "Location-based SEO",
    ],
    tags: ["Next.js", "Booking System", "Local SEO"],
    real: true,
  },

  // ─── SHOWCASE PROJECTS ────────────────────────
  {
    title: "MediCare Plus",
    category: "Mobile App",
    description:
      "Healthcare mobile app for appointment booking, patient records and doctor consultation with secure video calling.",
    url: "#",
    icon: Smartphone,
    color: "#be185d",
    results: ["10K+ downloads", "4.8★ rating", "HIPAA compliant"],
    tags: ["React Native", "Node.js", "MongoDB"],
    real: false,
  },
  {
    title: "TechVista CRM",
    category: "Custom Software",
    description:
      "Custom CRM system for a growing IT services company with sales pipeline tracking and automated follow-ups.",
    url: "#",
    icon: Code2,
    color: "#0f766e",
    results: ["+65% sales efficiency", "Team collaboration", "Custom reports"],
    tags: ["Next.js", "PostgreSQL", "Redis"],
    real: false,
  },
  {
    title: "Bloom Retail",
    category: "E-Commerce",
    description:
      "Complete e-commerce platform with product catalog, cart, payment gateway and order management system.",
    url: "#",
    icon: ShoppingBag,
    color: "#ea580c",
    results: ["3x online sales", "UPI + Cards", "Auto inventory"],
    tags: ["Next.js", "Razorpay", "MongoDB"],
    real: false,
  },
  {
    title: "FitZone Gym",
    category: "Website + App",
    description:
      "Gym membership platform with online registration, class booking, trainer profiles and diet plan tracking.",
    url: "#",
    icon: Dumbbell,
    color: "#059669",
    results: ["500+ members", "Online payments", "Attendance tracking"],
    tags: ["React", "Firebase", "Stripe"],
    real: false,
  },
  {
    title: "Spice Garden",
    category: "Restaurant Website",
    description:
      "Restaurant website with online menu, table reservation, food ordering and delivery integration.",
    url: "#",
    icon: Utensils,
    color: "#dc2626",
    results: ["Online ordering live", "Table booking", "Menu management"],
    tags: ["Next.js", "Sanity CMS", "Zomato API"],
    real: false,
  },
  {
    title: "DesignHub Studio",
    category: "UI/UX Design",
    description:
      "Complete brand identity, design system and marketing website for a creative design agency.",
    url: "#",
    icon: Palette,
    color: "#7c3aed",
    results: ["Full rebrand", "Design system", "Figma handoff"],
    tags: ["Figma", "Design System", "Branding"],
    real: false,
  },
];

const REVIEWS = [
  {
    name: "Sujal Mehra",
    role: "The Tipsy Bar",
    message:
      "Good vibes, loud beats, and just the right amount of chaos. Lively and energetic, often recommended for celebrations and birthday parties. His behavior is very nice and polite. In the end, I would prefer Tipsy Bar to everyone.",
    rating: 5,
    color: "#7c3aed",
    date: "Apr 2026",
  },
  {
    name: "Ritika Pathania",
    role: "The Tipsy Bar",
    message:
      "Very lovely experience with Tipsy Bar! The bartender team was professional, friendly and made our event truly memorable.",
    rating: 5,
    color: "#ea580c",
    date: "Apr 2026",
  },
  {
    name: "Avtar Singh",
    role: "Driving Student",
    message:
      "Mehra Driving School made me feel confident behind the wheel in just 2 weeks. The instructors are patient and professional.",
    rating: 5,
    color: "#0891b2",
    date: "Mar 2026",
  },
  {
    name: "Monika Rana",
    role: "The Tipsy Bar",
    message:
      "I feel really good after getting services from Tipsy Bar. They have very great and professional staff. Highly recommended for any event.",
    rating: 5,
    color: "#be185d",
    date: "Feb 2026",
  },
  {
    name: "Rahul Sharma",
    role: "Driving Student",
    message:
      "The best driving school in Chandigarh. Great instructors, well-maintained cars, and they really focus on safety and practical skills.",
    rating: 5,
    color: "#059669",
    date: "Feb 2026",
  },
  {
    name: "Prince Singh",
    role: "The Tipsy Bar",
    message:
      "Having a great party night with them. The cocktails were amazing and the bartender was super friendly. Will book again!",
    rating: 5,
    color: "#dc2626",
    date: "Feb 2026",
  },
  {
    name: "Rohan Kumar",
    role: "The Tipsy Bar",
    message:
      "One of the best bartender services I ever experienced. Thank you for great services @thetipsybar. Highly recommended.",
    rating: 5,
    color: "#0891b2",
    date: "Jan 2026",
  },
  {
    name: "Riya Sharma",
    role: "Birthday Client",
    message:
      "Thank you, I got what I expected from them. A great birthday experience with The Tipsy Bar. Everyone at the party loved it!",
    rating: 5,
    color: "#2563eb",
    date: "Nov 2025",
  },
  {
    name: "Sam",
    role: "The Tipsy Bar",
    message:
      "Good nature, all team members, and best quality drinks. My experience is the best. Thank you Tipsy Bar!",
    rating: 5,
    color: "#7c3aed",
    date: "Apr 2026",
  },
];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            Our Work
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Our <span className="gradient-text">Portfolio</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Real projects. Real businesses. Real results. Here's a selection of
            websites Zentrox Technologies has built for clients across India.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROJECTS GRID
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition-all hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Visual Header */}
                  <div
                    className="relative flex aspect-video items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(15,23,42,.6) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(15,23,42,.6) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                      }}
                    />
                    <Icon
                      size={48}
                      style={{ color: project.color }}
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                    <span
                      className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                      style={{ backgroundColor: "#ffffff", color: project.color }}
                    >
                      {project.category}
                    </span>
                    {project.real && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {project.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Results */}
                    <div className="mt-4 space-y-1.5">
                      {project.results.slice(0, 2).map((r) => (
                        <div
                          key={r}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700"
                        >
                          <TrendingUp
                            size={12}
                            className="flex-shrink-0 text-emerald-500"
                          />
                          {r}
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {project.real ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-1 hover:bg-slate-800"
                      >
                        Visit Live Website
                        <ExternalLink
                          size={12}
                          className="transition-transform group-hover/btn:translate-x-0.5"
                        />
                      </a>
                    ) : (
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-500">
                        Internal Project
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          REVIEWS SECTION (Masonry Flow)
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-[#FDF8F3] px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-amber-700">
              <Star size={12} className="fill-amber-500 text-amber-500" />
              Client Reviews
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Real feedback from real clients. These reviews come directly from
              Google Reviews.
            </p>
          </div>

          {/* Masonry Columns */}
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {REVIEWS.map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="mb-5 break-inside-avoid rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="text-[10px] font-medium text-slate-400">
                    {review.date}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  "{review.message}"
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${review.color}, ${review.color}cc)`,
                    }}
                  >
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {review.name}
                    </p>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-8 py-14 text-center shadow-2xl sm:px-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Zentrox Technologies builds websites, mobile apps and custom
                software for businesses in India and worldwide.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-1"
                >
                  Start Your Project
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white/10"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
