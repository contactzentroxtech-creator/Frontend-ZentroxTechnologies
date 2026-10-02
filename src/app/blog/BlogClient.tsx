"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Newspaper,
  AlertCircle,
  RefreshCw,
  User,
} from "lucide-react";
import api from "@/lib/api";

interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  tags?: string[];
  authorName?: string;
  publishedAt?: string;
  createdAt?: string;
  readTime?: number;
}

function normalizePost(raw: any): BlogPost {
  const wordCount = (raw?.content || "").split(" ").length;
  return {
    _id: raw?._id || raw?.id,
    slug: raw?.slug || raw?._id || raw?.id || "",
    title: raw?.title || "Untitled",
    excerpt: raw?.excerpt || "",
    content: raw?.content || "",
    image: raw?.thumbnail || raw?.image || raw?.coverImage || "",
    category: raw?.category || "Blog",
    tags: raw?.tags || [],
    authorName: raw?.authorName || raw?.author?.name || "Zentrox Technologies",
    publishedAt: raw?.publishedAt || raw?.createdAt || "",
    createdAt: raw?.createdAt || "",
    readTime: raw?.readTime || Math.max(1, Math.ceil(wordCount / 200)),
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
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
  const [category, setCategory] = useState("All");

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

          if (Array.isArray(items) && items.length > 0) {
            rawPosts = items;
            break;
          } else if (Array.isArray(items)) {
            rawPosts = items;
          }
        } catch {
          continue;
        }
      }

      const normalized = rawPosts
        .map(normalizePost)
        .filter((p) => p.slug && p.title);

      setPosts(normalized);
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Unable to load blog posts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ["All", ...Array.from(cats)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.excerpt || "").toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, category, search]);

  return (
    <main className="bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <Newspaper size={13} />
              Our Blog
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Insights, Tips{" "}
              <span className="gradient-text">&amp; Trends</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
              Stay updated with the latest in technology, digital marketing, web
              development and business growth from Zentrox Technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ BLOG LIST ═══════ */}
      <section
        ref={ref}
        className="relative bg-white px-4 py-16 md:px-6 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Search + Filters */}
          {!loading && !error && posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-col items-center gap-4"
            >
              <div className="relative w-full max-w-md">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="input-field pl-11"
                />
              </div>

              {categories.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        category === cat
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-video bg-slate-100" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-24 rounded bg-slate-100" />
                    <div className="h-5 w-full rounded bg-slate-100" />
                    <div className="h-5 w-3/4 rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Unable to load articles
              </h3>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button
                onClick={loadPosts}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
              >
                <RefreshCw size={14} />
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40 p-8 text-center shadow-xl sm:p-12">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-600/25">
                  <Newspaper size={36} className="text-white" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {posts.length === 0
                    ? "Insights Coming Soon"
                    : "No Articles Found"}
                </h3>

                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                  {posts.length === 0
                    ? "Zentrox Technologies is preparing in-depth articles on web development, mobile apps, AI integration, digital marketing and business growth. Check back soon."
                    : "Try a different search or category to find what you're looking for."}
                </p>

                {posts.length === 0 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    {[
                      "Web Development",
                      "Mobile Apps",
                      "AI Integration",
                      "Digital Marketing",
                      "SaaS",
                      "Business Growth",
                    ].map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    Discuss Your Project
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Posts Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, index) => (
                <motion.article
                  key={post._id || post.slug}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.08, 0.4),
                  }}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition-all hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-video overflow-hidden"
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #2563eb15, #7c3aed10, #ec489910)",
                        }}
                      >
                        <Newspaper size={36} className="text-blue-300" />
                      </div>
                    )}

                    {post.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-sm">
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

                    <h2 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {post.excerpt && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[10px] font-bold text-white">
                        <User size={12} />
                      </div>
                      <p className="text-xs text-slate-500">
                        {post.authorName}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3"
                    >
                      Read More
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
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
