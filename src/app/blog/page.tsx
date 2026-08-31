"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/providers";

// Sample blog posts
const BLOG_POSTS = [
  {
    id: 1,
    title: "Why Your Business Needs a Custom Website in 2026",
    excerpt: "A custom website is more than just an online presence — it's a powerful tool for building trust, generating leads, and scaling your business.",
    category: "Website Development",
    author: "Zentrox Technologies Team",
    date: "March 15, 2026",
    readTime: "5 min read",
    slug: "why-your-business-needs-custom-website-2026",
  },
  {
    id: 2,
    title: "The Future of AI in Digital Marketing",
    excerpt: "AI is transforming how businesses approach digital marketing. From personalization to predictive analytics, discover how AI can give you a competitive edge.",
    category: "AI & Automation",
    author: "Zentrox Technologies Team",
    date: "March 10, 2026",
    readTime: "4 min read",
    slug: "future-of-ai-in-digital-marketing",
  },
  {
    id: 3,
    title: "SEO Trends That Will Dominate in 2026",
    excerpt: "Stay ahead of the competition with these SEO trends — including AI-powered search, user intent optimization, and the growing importance of content quality.",
    category: "SEO & Digital Growth",
    author: "Zentrox Technologies Team",
    date: "March 5, 2026",
    readTime: "6 min read",
    slug: "seo-trends-2026",
  },
  {
    id: 4,
    title: "Mobile App Development: Native vs Cross-Platform",
    excerpt: "Choosing the right approach for your mobile app development project can significantly impact cost, performance, and user experience.",
    category: "Mobile App Development",
    author: "Zentrox Technologies Team",
    date: "February 28, 2026",
    readTime: "4 min read",
    slug: "mobile-app-development-native-vs-cross-platform",
  },
  {
    id: 5,
    title: "SaaS Development: From Idea to Launch",
    excerpt: "Building a successful SaaS product requires careful planning, the right technology stack, and a focus on user experience from day one.",
    category: "SaaS Development",
    author: "Zentrox Technologies Team",
    date: "February 20, 2026",
    readTime: "7 min read",
    slug: "saas-development-from-idea-to-launch",
  },
  {
    id: 6,
    title: "How UI/UX Design Drives Business Growth",
    excerpt: "Great design isn't just about aesthetics — it directly impacts conversion rates, customer retention, and brand perception.",
    category: "UI/UX Design",
    author: "Zentrox Technologies Team",
    date: "February 15, 2026",
    readTime: "5 min read",
    slug: "ui-ux-design-drives-business-growth",
  },
];

const CATEGORIES = ["All", ...new Set(BLOG_POSTS.map((post) => post.category))];

export default function BlogPage() {
  const { t } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main className="bg-white pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
              INSIGHTS & TUTORIALS
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
              The <span className="text-blue-600">Zentrox Technologies</span> Blog
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Insights on website development, AI, SEO, and digital marketing from the Zentrox Technologies team.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-6 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-600">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                    </div>
                    <span className="text-slate-400">{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-all hover:gap-2"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500">
                No articles found matching your search.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
