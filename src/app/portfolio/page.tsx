"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, Smartphone, Globe, Megaphone } from "lucide-react";

const projects = [
  { id: 1, title: "The Tipsy Bar", category: "Web Development", desc: "Premium bartender service website with online booking, service showcase and Google reviews integration.", tech: ["Next.js", "Tailwind", "SEO"], icon: <Globe size={24} /> },
  { id: 2, title: "Mehra Driving School", category: "Web Development", desc: "Chandigarh's trusted driving academy website with course listings, instructor profiles, and online booking system.", tech: ["React", "Node.js", "MongoDB"], icon: <Code2 size={24} /> },
  { id: 3, title: "MediCare Plus", category: "Mobile App", desc: "Healthcare mobile app for appointment booking, patient records, and doctor consultation with secure video calling.", tech: ["React Native", "Firebase"], icon: <Smartphone size={24} /> },
  { id: 4, title: "Zentrox Growth Engine", category: "Digital Marketing", desc: "Full-scale SEO and digital marketing campaign for a SaaS company, generating 300% more organic leads.", tech: ["SEO", "Google Ads", "Analytics"], icon: <Megaphone size={24} /> },
];

export default function PortfolioPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Our Work.</h1>
          <p className="text-slate-400 text-xl max-w-2xl">We don't just build websites; we craft digital experiences that drive growth.</p>
        </motion.div>

        <div className="border-t border-slate-800">
          {projects.map((p) => (
            <div
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group border-b border-slate-800 py-10 relative cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 transition-transform duration-300 group-hover:translate-x-4">
                <div className="flex items-center gap-6">
                  <div className="text-slate-500 group-hover:text-blue-400 transition-colors">{p.icon}</div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold group-hover:text-white transition-colors">{p.title}</h3>
                    <p className="text-slate-500 group-hover:text-slate-400 text-sm mt-1 uppercase tracking-wider">{p.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {p.tech.map(t => <span key={t} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">{t}</span>)}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <ArrowUpRight size={24} className="text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {hoveredId === p.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden relative z-10">
                    <p className="text-slate-400 mt-6 max-w-3xl md:ml-16 pt-4 border-t border-slate-800/50">{p.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
