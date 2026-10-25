"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Megaphone, Palette, Cloud, Cpu } from "lucide-react";

const serviceData = {
  web: {
    title: "Web Development",
    icon: <Code2 size={32} />,
    desc: "We build high-performance, scalable, and secure web applications using the latest technologies.",
    features: ["Custom Web Apps", "E-commerce Solutions", "CMS Development", "API Integration"],
  },
  app: {
    title: "App Development",
    icon: <Smartphone size={32} />,
    desc: "Native and cross-platform mobile applications that provide seamless user experiences.",
    features: ["iOS & Android Apps", "React Native / Flutter", "App Store Optimization", "Maintenance"],
  },
  uiux: {
    title: "UI/UX Design",
    icon: <Palette size={32} />,
    desc: "User-centric design that not only looks beautiful but also drives conversions and engagement.",
    features: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
  },
  marketing: {
    title: "Digital Marketing",
    icon: <Megaphone size={32} />,
    desc: "Data-driven marketing strategies to grow your brand, reach your audience, and increase revenue.",
    features: ["SEO Optimization", "Social Media Ads", "Content Strategy", "Email Marketing"],
  },
  erp: {
    title: "ERP Solutions",
    icon: <Cloud size={32} />,
    desc: "Custom ERP software to streamline operations, manage resources, and improve business efficiency.",
    features: ["Inventory Management", "HR & Payroll", "Finance & Accounting", "CRM Integration"],
  },
  iot: {
    title: "IoT Applications",
    icon: <Cpu size={32} />,
    desc: "Connected devices and smart solutions to automate processes and gather real-time data.",
    features: ["Smart Home Devices", "Industrial IoT", "Wearable Tech", "Cloud Connectivity"],
  },
  custom: {
    title: "Custom Software",
    icon: <Code2 size={32} />,
    desc: "Tailor-made software solutions built from scratch to address your unique business challenges.",
    features: ["SaaS Platforms", "Enterprise Software", "API Development", "Legacy Upgrades"],
  }
};

export default function ServicesPage() {
  const [active, setActive] = useState<keyof typeof serviceData>("web");
  const current = serviceData[active];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">Our Services</h1>
          <p className="text-slate-600 text-lg">Expert solutions for every stage of your digital journey.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            {(Object.keys(serviceData) as Array<keyof typeof serviceData>).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex items-center justify-between p-4 rounded-xl font-bold transition-all ${
                  active === key ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {serviceData[key].icon}
                  {serviceData[key].title}
                </div>
                {active === key && <ArrowRight size={20} />}
              </button>
            ))}
          </div>

          {/* Detail View */}
          <div className="lg:w-2/3 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8">
              {current.icon}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{current.title}</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">{current.desc}</p>
            
            <h3 className="text-xl font-bold text-slate-800 mb-4">What we offer:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {current.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/#estimator" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Get a Quote for this Service <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
