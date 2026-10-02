import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Globe,
  Smartphone,
  Code2,
  Palette,
  ShoppingCart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Our Recent Projects & Case Studies",
  description:
    "Explore Zentrox Technologies portfolio — websites, mobile apps, custom software and digital solutions we've built for businesses in India and worldwide.",
  alternates: { canonical: "https://zentroxtechnologies.com/portfolio" },
};

const PROJECTS = [
  {
    title: "The Tipsy Bar",
    category: "Website Development",
    desc: "A premium bar & lounge website with reservation system and digital menu.",
    icon: ShoppingCart,
    color: "#7c3aed",
    result: "+140% online bookings",
  },
  {
    title: "MediCare Plus",
    category: "Mobile App",
    desc: "Healthcare mobile app for appointment booking and patient management.",
    icon: Smartphone,
    color: "#0891b2",
    result: "10K+ downloads",
  },
  {
    title: "TechVista Solutions",
    category: "Custom Software",
    desc: "CRM system for a growing IT services company with sales pipeline tracking.",
    icon: Code2,
    color: "#0f766e",
    result: "+65% sales efficiency",
  },
  {
    title: "Bloom Retail",
    category: "SEO & Digital Marketing",
    desc: "Complete digital marketing strategy for a retail brand across India.",
    icon: TrendingUp,
    color: "#ea580c",
    result: "3x organic traffic",
  },
  {
    title: "DesignHub Studio",
    category: "UI/UX Design",
    desc: "Brand identity and design system for a creative agency.",
    icon: Palette,
    color: "#be185d",
    result: "Full rebrand delivered",
  },
  {
    title: "GlobalTrade Exports",
    category: "Business Website",
    desc: "B2B export company website with product catalog and inquiry system.",
    icon: Globe,
    color: "#2563eb",
    result: "+200% inquiries",
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
            websites and apps we've built.
          </p>
        </div>
      </section>

      {/* PROJECTS GRID */}
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
                  <div
                    className="flex aspect-video items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                    }}
                  >
                    <Icon size={48} style={{ color: project.color }} />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span
                      className="mb-2 inline-block w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${project.color}12`,
                        color: project.color,
                      }}
                    >
                      {project.category}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                      {project.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {project.desc}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold text-emerald-600">
                        ✓ {project.result}
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-slate-400 transition-colors group-hover:text-blue-600"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-8 py-14 text-center shadow-2xl sm:px-12">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Let's build something great together.
              </p>

              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-1"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
