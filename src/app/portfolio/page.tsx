import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Wine,
  Car,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Our Recent Projects & Case Studies",
  description:
    "Explore Zentrox Technologies portfolio — websites and digital solutions we've built for businesses in India and worldwide. Real projects. Real results.",
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
  {
    title: "The Tipsy Bar",
    category: "Website Development",
    desc: "Premium bartender service website with online booking, service showcase and Google reviews integration for a Tri-City based bar services company.",
    url: "https://thetipsybar.in/",
    icon: Wine,
    color: "#7c3aed",
    results: [
      "+140% online bookings",
      "Google Reviews integration",
      "Mobile-first design",
    ],
    tags: ["Next.js", "Responsive", "SEO"],
  },
  {
    title: "Mehra Driving School",
    category: "Website Development",
    desc: "Chandigarh's trusted driving academy website with course listings, instructor profiles, home pickup information and online booking system.",
    url: "https://www.mehradrivingschool.com/",
    icon: Car,
    color: "#0891b2",
    results: [
      "3000+ drivers trained",
      "Course booking system",
      "Location-based SEO",
    ],
    tags: ["Next.js", "Booking System", "Local SEO"],
  },
];

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
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

      {/* PROJECTS GRID */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white transition-all hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
                >
                  {/* Visual Header */}
                  <div
                    className="relative flex aspect-video items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                    }}
                  >
                    {/* Grid pattern */}
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
                      size={64}
                      style={{ color: project.color }}
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Category badge */}
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: "#ffffff",
                        color: project.color,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-extrabold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {project.desc}
                    </p>

                    {/* Results */}
                    <div className="mt-5 space-y-2">
                      {project.results.map((r) => (
                        <div
                          key={r}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700"
                        >
                          <TrendingUp
                            size={13}
                            className="flex-shrink-0 text-emerald-500"
                          />
                          {r}
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Visit Link */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-slate-800"
                    >
                      Visit Live Website
                      <ExternalLink
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming Soon Card */}
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:p-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
              <Globe size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              More Projects Coming Soon
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              We're building more digital products for growing businesses.
              Check back soon to see our latest work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
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
