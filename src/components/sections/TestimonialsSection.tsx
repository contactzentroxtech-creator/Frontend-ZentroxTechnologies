"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLang } from "@/lib/providers";

const TESTIMONIALS = [
  {
    name: "Founder, E-commerce Brand",
    role: "E-commerce Platform Development",
    text: "The e-commerce platform they built for us has streamlined our entire operation. The team understood our business from day one and delivered a solution that actually works for us.",
  },
  {
    name: "Sales Director, B2B Firm",
    role: "CRM & Management System",
    text: "Zentrox developed a custom CRM that finally gave us full visibility into our sales pipeline. The process was smooth and the results speak for themselves.",
  },
  {
    name: "CTO, SaaS Startup",
    role: "SaaS Development",
    text: "Their SaaS development expertise helped us launch our product on time. The architecture is scalable and the team continues to support us as we grow.",
  },
  {
    name: "Marketing Lead, Professional Services",
    role: "SEO & Digital Growth",
    text: "Our organic traffic increased by over 60% within four months of working with Zentrox on SEO. Their data-driven approach and clear reporting made all the difference.",
  },
];

function TestimonialCard
