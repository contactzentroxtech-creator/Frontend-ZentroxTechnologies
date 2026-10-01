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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <Newspaper size={13} />
            Our Blog
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Insights, Tips{" "}
            <span className="gradient-text">& Trends</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Stay updated with the latest in technology, digital marketing, web
            development and business growth.
          </p>
        </div>
      </section>

      <section ref={ref} className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          {!loading && !error && posts.length > 0 && (
            <div className="mb-10 flex justify-center">
              <div className="relative w-full max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="input-field pl-11"
                />
              </div>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="aspect-video bg-slate-100" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-24 rounded bg-slate-100" />
                    <div className="h-5 w-full rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <AlertCircle size={28} className="mx-auto mb-3 text-red-500" />
              <h3 className="text-base font-bold text-slate-900">Unable to load articles</h3>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button
                onClick={loadPosts}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <RefreshCw size={14} /> Try Again
              </button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <Newspaper size={28} className="mx-auto mb-3 text-slate-400" />
              <h3 className="text-base font-bold text-slate-900">
                {posts.length === 0 ? "No articles published yet" : "No articles found"}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {posts.length === 0 ? "Check back soon." : "Try a different search."}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, index) => (
                <motion.article
                  key={post._id || post.slug}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition-all hover:border-blue-200 hover:shadow-lg"
                >
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden bg-slate-100">
                    {post.image || post.coverImage ? (
                      <Image
                        src={post.image || post.coverImage || ""}
                        alt={post.title}
                        width={600}
                        height={340}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                        <Newspaper size={36} className="text-blue-300" />
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase text-blue-700 shadow-sm">
                        {post.category}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-4 text-[11px] text-slate-500">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} />
                          {post.readTime} min read
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold leading-snug text-slate-900 group-hover:text-blue-600 sm:text-lg">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {(post.excerpt || post.summary) && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {post.excerpt || post.summary}
                      </p>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3"
                    >
                      Read More <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
