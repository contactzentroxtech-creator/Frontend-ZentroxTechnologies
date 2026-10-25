"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Reach Us Directly</h1>
            <p className="text-slate-600 mb-10 text-lg">Prefer to talk? Use any of the options below.</p>
            
            <div className="space-y-4">
              {[
                { icon: <Mail size={20}/>, title: "EMAIL", val: "contact@zentroxtechnologies.com" },
                { icon: <Phone size={20}/>, title: "PHONE", val: "+91 89881 83513" },
                { icon: <MapPin size={20}/>, title: "LOCATION", val: "Mohali, Punjab, India - 140308" },
                { icon: <Clock size={20}/>, title: "HOURS", val: "Mon – Sat, 10:00 AM – 6:00 PM" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-500">{item.title}</p>
                    <p className="text-slate-900 font-semibold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
            <p className="text-slate-500 mb-8 text-sm">Fill the form and we'll get back within 24 hours.</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email *</label>
                  <input type="email" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                  <input type="tel" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Service *</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900">
                    <option>Web Development</option>
                    <option>App Development</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Message *</label>
                <textarea className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 h-32" placeholder="Tell us about your project..."></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ boxShadow: ["0px 0px 0px rgba(37,99,235,0)", "0px 0px 20px rgba(37,99,235,0.4)", "0px 0px 0px rgba(37,99,235,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                type="button"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
