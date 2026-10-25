"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, TrendingUp, Award, Users, Eye, Globe, 
  Calculator, MonitorSmartphone, Rocket, PenTool, 
  Code2, Smartphone, Cloud, Megaphone, Palette, Cpu 
} from "lucide-react";
import FloatingCard from "./ui/FloatingCard";

/* ═══════════════════════════════════════════════════════
   1. HERO SECTION (Rotating Text & Tags)
═══════════════════════════════════════════════════════ */
const heroServices = [
  { title: "WEB DEV", color: "from-blue-600 to-cyan-400", tags: ["React", "Next.js", "Node", "MongoDB", "Tailwind", "AWS"] },
  { title: "APP DEV", color: "from-purple-600 to-pink-400", tags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"] },
  { title: "DIGITAL MARKETING", color: "from-orange-500 to-yellow-400", tags: ["SEO", "Google Ads", "Social Media", "Content"] },
  { title: "UI/UX DESIGN", color: "from-emerald-500 to-teal-400", tags: ["Figma", "Prototyping", "Wireframing", "Research"] }
];

const tagPositions = [
  { top: "10%", left: "10%" }, { top: "20%", left: "70%" }, { top: "60%", left: "15%" },
  { top: "75%", left: "65%" }, { top: "40%", left: "85%" }, { top: "80%", left: "40%" }
];

function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % heroServices.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const active = heroServices[index];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-20">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Your Growth. Our Technology.
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Build Better,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Grow Faster.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            We build modern web & mobile apps, and drive digital growth with data-driven marketing strategies.
          </p>
          <Link href="#estimator" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-600/30">
            Start Your Project <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Right Visual */}
        <div className="relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} 
              animate={{ opacity: 0.15, scale: 1, filter: "blur(0px)" }} 
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }} 
              transition={{ duration: 0.8 }} 
              className={`absolute text-[90px] md:text-[120px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${active.color} whitespace-nowrap`}
            >
              {active.title}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {active.tags.map((tag, i) => (
              <motion.div 
                key={tag} 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.5 }} 
                transition={{ duration: 0.4, delay: i * 0.1 }} 
                className="absolute bg-white/90 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-lg font-bold text-slate-700 text-sm" 
                style={tagPositions[i]}
              >
                {tag}
              </motion.div>
            ))}
          </AnimatePresence>

          <FloatingCard className="absolute top-0 right-10 p-4 w-40" delay={1}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingUp size={20} /></div>
              <div><p className="text-xs text-slate-500 font-medium">Growth</p><p className="text-xl font-black text-slate-800">+140%</p></div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute bottom-10 left-0 p-4 w-40" delay={2}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Award size={20} /></div>
              <div><p className="text-xs text-slate-500 font-medium">Ranking</p><p className="text-xl font-black text-slate-800">#1 Agency</p></div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. DIGITAL TRANSFORMATION (3D Laptop)
═══════════════════════════════════════════════════════ */
const stats = [
  { label: "Views", value: "7,265", change: "+11.01%", icon: <Eye size={16} />, color: "bg-orange-500", pos: "top-10 -left-6 md:-left-10" },
  { label: "Visits", value: "3,671", change: "+0.03%", icon: <TrendingUp size={16} />, color: "bg-emerald-500", pos: "top-24 -right-4 md:-right-8" },
  { label: "Active Users", value: "2,318", change: "+6.08%", icon: <Users size={16} />, color: "bg-blue-600", pos: "bottom-20 -left-8 md:-left-12" },
  { label: "New Users", value: "256", change: "+15.03%", icon: <Globe size={16} />, color: "bg-amber-600", pos: "bottom-10 -right-4 md:-right-6" },
];

function TransformationSection() {
  return (
    <section className="py-24 bg-[#ea7a2b] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Driving Digital Transformation through Innovation</h2>
          <p className="text-orange-50 text-lg mb-8 max-w-lg leading-relaxed">Accelerate growth with innovative digital solutions that enhance efficiency, optimize workflows, and prepare your business for the future.</p>
          <Link href="#estimator" className="inline-block border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#ea7a2b] transition-all duration-300">Request a Quote</Link>
        </motion.div>

        <div className="relative w-full max-w-[600px] mx-auto mt-10 lg:mt-0 perspective-1000">
          {stats.map((stat, i) => (
            <FloatingCard key={i} className={`absolute z-20 w-36 p-3 ${stat.pos}`} delay={i * 0.5}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                <span className={`p-1 rounded-md text-white ${stat.color}`}>{stat.icon}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-black text-slate-800">{stat.value}</span>
                <span className="text-[10px] font-bold text-emerald-500">{stat.change}</span>
              </div>
            </FloatingCard>
          ))}
          <motion.div initial={{ rotateY: -20, rotateX: 10, opacity: 0 }} whileInView={{ rotateY: -15, rotateX: 5, opacity: 1 }} transition={{ duration: 1 }} className="relative transform-style-3d w-full">
            <div className="w-full aspect-[16/10] bg-slate-900 rounded-t-xl border-[12px] border-slate-800 overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-3">
                <div className="flex gap-3 h-1/3"><div className="flex-1 bg-white rounded-lg shadow-sm"></div><div className="flex-1 bg-white rounded-lg shadow-sm"></div><div className="flex-1 bg-white rounded-lg shadow-sm"></div></div>
                <div className="flex-1 bg-white rounded-lg shadow-sm w-full"></div>
              </div>
            </div>
            <div className="w-[110%] h-6 bg-slate-300 rounded-b-2xl -ml-[5%] shadow-xl relative"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-400 rounded-b-lg"></div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. ADVANCED ESTIMATOR (Interactive Quote)
═══════════════════════════════════════════════════════ */
function EstimatorSection() {
  const [service, setService] = useState("Web Development");
  const [pages, setPages] = useState(5);
  const [speed, setSpeed] = useState("Standard");

  const base = service === "Web Development" ? 25000 : service === "Mobile App" ? 45000 : 15000;
  const pageCost = pages * 1500;
  const speedCost = speed === "Express" ? 10000 : 0;
  const total = base + pageCost + speedCost;

  return (
    <section id="estimator" className="py-24 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Transparent Pricing</h2>
          <p className="text-slate-600 text-lg">Configure your project and get an instant estimate.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          <div className="p-8 lg:p-12 flex-1 space-y-8">
            <div>
              <label className="block font-bold text-slate-800 mb-3 text-lg">1. Select Service</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Web Development", "Mobile App", "UI/UX Design"].map((s) => (
                  <button key={s} onClick={() => setService(s)} className={`py-3 px-4 rounded-xl font-semibold border-2 transition-all text-sm ${service === s ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="block font-bold text-slate-800 text-lg">2. Number of Pages</label>
                <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg">{pages}</span>
              </div>
              <input type="range" min="1" max="20" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-2"><span>1</span><span>20+</span></div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-3 text-lg">3. Delivery Speed</label>
              <div className="flex gap-4">
                <button onClick={() => setSpeed("Standard")} className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-all ${speed === "Standard" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"}`}>Standard</button>
                <button onClick={() => setSpeed("Express")} className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-all ${speed === "Express" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"}`}>Express (+₹10k)</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 lg:p-12 lg:w-[400px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px]"></div>
            <Calculator className="text-blue-400 mb-6" size={40} />
            <h3 className="text-2xl font-bold text-white mb-6">Cost Breakdown</h3>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between text-slate-300 border-b border-slate-700 pb-2">
                <span>Base Cost</span><span className="font-semibold text-white">₹{base.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-300 border-b border-slate-700 pb-2">
                <span>{pages} Pages</span><span className="font-semibold text-white">₹{pageCost.toLocaleString("en-IN")}</span>
              </div>
              {speedCost > 0 && (
                <div className="flex justify-between text-slate-300 border-b border-slate-700 pb-2">
                  <span>Express Delivery</span><span className="font-semibold text-white">₹{speedCost.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
            <div className="bg-slate-800 rounded-xl p-4 mb-6">
              <p className="text-slate-400 text-sm mb-1">Estimated Total</p>
              <h4 className="text-4xl font-black text-white">₹{total.toLocaleString("en-IN")}</h4>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
              Book Free Consultation <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. SERVICES GRID
═══════════════════════════════════════════════════════ */
const servicesList = [
  { title: "Custom App Development", icon: <Smartphone size={28} />, desc: "Enterprise mobile apps for iOS & Android." },
  { title: "Web Development", icon: <Code2 size={28} />, desc: "High-performance scalable web applications." },
  { title: "ERP Solutions", icon: <Cloud size={28} />, desc: "Custom ERP software to streamline operations." },
  { title: "UI/UX Design", icon: <Palette size={28} />, desc: "Beautiful interfaces that users love." },
  { title: "IoT Applications", icon: <Cpu size={28} />, desc: "Connected devices and smart solutions." },
  { title: "Digital Marketing", icon: <Megaphone size={28} />, desc: "SEO, Ads, and growth strategies." }
];

function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Expertise</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">End-to-end digital solutions tailored to your business needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{s.desc}</p>
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-blue-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. PROCESS TIMELINE
═══════════════════════════════════════════════════════ */
const processSteps = [
  { icon: <PenTool size={24} />, title: "1. Discovery", desc: "We understand your goals and requirements." },
  { icon: <MonitorSmartphone size={24} />, title: "2. Design", desc: "Wireframes and high-fidelity UI mockups." },
  { icon: <Code2 size={24} />, title: "3. Development", desc: "Clean, scalable, and fast code." },
  { icon: <Rocket size={24} />, title: "4. Launch", desc: "Testing, deployment, and handover." }
];

function ProcessSection() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">How We Work</h2>
          <p className="text-slate-400 text-lg">A proven process to deliver excellence.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="relative text-center">
              {i !== processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-slate-700"></div>
              )}
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 border border-slate-700 shadow-xl text-blue-400">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   6. CTA SECTION
═══════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Have a Digital Product in Mind?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Zentrox Technologies can help you turn your idea into a practical digital solution.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105">
              Start a Project
            </Link>
            <Link href="mailto:contact@zentroxtechnologies.com" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all">
              Email Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function HomeSections() {
  return (
    <>
      <HeroSection />
      <TransformationSection />
      <EstimatorSection />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
