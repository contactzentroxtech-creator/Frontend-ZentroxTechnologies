"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Newspaper,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/api";

interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  summary?: string;
  image?: string;
  coverImage?: string;
  category?: string;
  publishedAt?: string;
  createdAt?: string;
  readTime?: number;
}

function normalizePost(raw: any): BlogPost {
  return {
    _id: raw?._id || raw?.id,
    slug: raw?.slug || raw?._id || raw?.id || "",
    title: raw?.title || "Untitled",
    excerpt: raw?.excerpt || raw?.summary || "",
    summary: raw?.summary || raw?.excerpt || "",
    image: raw?.image || raw?.coverImage || "",
    coverImage: raw?.coverImage || raw?.image || "",
    category: raw?.category || "Blog",
    publishedAt: raw?.publishedAt || raw?.createdAt || "",
    createdAt: raw?.createdAt || "",
    readTime: raw?.readTime || Math.max(1, Math.ceil((raw?.content?.split(" ").length || 200) / 200)),
  };
}

function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function BlogClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      let rawPosts: any[] = [];
      const endpoints = ["/blog", "/blogs", "/posts"];

      for (const ep of endpoints) {
        try {
          const { data } = await api.get(ep);
          const items =
            data?.data?.posts ||
            data?.posts ||
            data?.data ||
            (Array.isArray(data) ? data : []);
          if (Array.isArray(items)) {
            rawPosts = items;
            if (items.length > 0) break;
          }
        } catch {
          continue;
        }
      }

      setPosts(rawPosts.map(normalizePost).filter((p) => p.slug));
    } catch (e: any) {
      setError(e?.message || "Unable to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q)
    );
  }, [posts, search]);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200
