"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "@/lib/api";
import type { BlogPost } from "@/types";

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Existing Hook: Fetch the blog post details on mount
  useEffect(() => {
    api
      .get(`/blog/${slug}`)
      .then((r) => setPost(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  // 2. NEW HOOK: Trigger robust view count update after 4 seconds of reading
  useEffect(() => {
    if (!post?._id) return;

    // Start a 4-second dwell timer
    const viewTimer = setTimeout(async () => {
      try {
        await api.put(`/blog/${post._id}/view`);
      } catch (error) {
        console.error("Failed to register background view metric:", error);
      }
    }, 4000);

    // CLEANUP: If the user leaves the page before 4 seconds, clear the timer
    return () => clearTimeout(viewTimer);
  }, [post?._id]);

  if (loading)
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-20 animate-pulse space-y-4">
        <div className="h-8 bg-white/5 rounded w-2/3" />
        <div className="h-4 bg-white/5 rounded" />
        <div className="h-64 bg-white/5 rounded" />
      </div>
    );

  if (!post)
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Article not found
        </h2>
        <Link href="/blog" className="text-z-accent hover:underline">
          Back to Blog
        </Link>
      </div>
    );

  return (
    <article className="relative z-10 px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-z-muted hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-z-accent px-2.5 py-1 rounded-full bg-z-accent/10 border border-z-accent/20 mb-5">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-z-muted mb-6 pb-6 border-b border-z-border">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />{" "}
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} /> {post.readTime || 3} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={11} /> {post.viewCount} views
            </span>
            <span>By {post.authorName || "Zentrox Technologies"}</span>
          </div>

          {post.thumbnail && (
            <div className="rounded-2xl overflow-hidden mb-8 h-72">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* --- ENHANCED MARKDOWN RENDER VIEW ENGINE --- */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <div className="prose-invert max-w-none text-slate-300 text-sm md:text-base space-y-4 whitespace-pre-wrap">
                    <img
                      {...props}
                      className="w-full h-auto rounded-lg max-h-[450px] object-contain"
                      alt={props.alt || "Zentrox Integrated Graphic Asset"}
                    />
                  </div>
                ),
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
                  />
                ),
                hr: () => <hr className="my-8 border-t border-white/10" />,
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 my-4 space-y-2 text-slate-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 my-4 space-y-2 text-slate-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="marker:text-blue-500">{children}</li>
                ),
                code: ({ node, className, children, ...props }) => {
                  // If there's no language class prefix (like language-js), it's inline code
                  const isInline = !className?.includes("language-");

                  return isInline ? (
                    <code
                      className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-pink-400 font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-slate-950 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 text-emerald-400">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
              }}
            >
              {post.content || ""}
            </ReactMarkdown>
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-z-border">
              <Tag size={13} className="text-z-muted" />
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-z-border text-z-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 p-6 glass-card text-center">
            <p className="text-sm text-z-muted mb-4">
              Have a project in mind? Zentrox Technologies can help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 transition-all shadow-glow-sm"
            >
              Get a Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
