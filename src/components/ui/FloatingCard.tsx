"use client";

import { motion } from "framer-motion";

export default function FloatingCard({ 
  children, 
  className = "", 
  delay = 0,
  duration = 5 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={`bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
