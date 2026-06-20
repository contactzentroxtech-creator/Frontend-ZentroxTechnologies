'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; // Back to optimized, safe images
import { ArrowRight, BookOpen, Clock, Eye, Tag, Search } from 'lucide-react';
import api from '@/lib/api';
import type { BlogPost } from '@/types';
import { useDebounce } from '@/hooks';

// Prevents absolute breaks from bad backend values
const isValidUrl = (url: string) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
};

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {post.thumbnail && isValidUrl(post.thumbnail) ? (
        <div className="h-48 overflow-hidden relative">
          <Image 
            src={post.thumbnail} 
            alt={post.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-z-dark3 to-z-dark2 flex items-center justify-center">
          <BookOpen size={36} className="text-z-accent/20" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-z-accent px-2 py-0.5 rounded-full bg-z-accent/10 border border-z-accent/20">
              {post.category}
            </span>
          )}
          <span className="flex items-center gap-1 text-[10px] text-z-muted">
            <Clock size={9} /> {post.readTime || '3'} min read
          </span>
          <span className="flex items-center gap-1 text-[10px] text-z-muted">
            <Eye size={9} /> {post.viewCount}
          </span>
        </div>
        <h2 className="font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-z-accent transition-colors">
          {post.title}
        </h2>
        {post.excerpt && <p className="text-xs text-z-muted leading-relaxed mb-4 line-clamp-2 flex-1">{post.excerpt}</p>}
        {Boolean(post.tags && post.tags.length > 0) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map(t => (
              <span key={t} className="flex items-center gap-1 text-[10px] text-z-muted px-2 py-0.5 rounded-full bg-white/5 border border-z-border">
                <Tag size={8} /> {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-z-border">
          <span className="text-xs text-z-muted">{post.authorName || 'Zentrox Technologies'}</span>
          <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs font-semibold text-z-accent hover:gap-2 transition-all">
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setLoading(true);
    const params = debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : '';
    api.get(`/blog${params}`)
      .then(r => setPosts(r.data.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [debouncedSearch]);

  // FIX: Separate the single featured post. The rest array will contain everything else.
  const featured = !search ? posts.find(p => p.featured) : null;
  const rest = featured ? posts.filter(p => p._id !== featured._id) : posts;

  return (
    <div className="relative z-10">
      {/* Header */}
      <section className="py-20 px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="z-badge mx-auto mb-4">Insights & Tutorials</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            The Zentrox<br /><span className="gradient-text">Tech Blog</span>
          </h1>
          <p className="text-z-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Web development, AI, SEO, and digital marketing insights from the Zentrox Technologies team.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-z-muted pointer-events-none" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search articles..."
              className="z-input pl-10 py-3.5 text-sm" 
            />
          </div>
        </motion.div>
      </section>

      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Featured post */}
          {featured && (
            <motion.article 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="glass-card mb-8 grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden hover:border-z-accent/30 transition-colors group"
            >
              <div className="h-64 md:h-auto overflow-hidden relative min-h-[260px]">
                {featured.thumbnail && isValidUrl(featured.thumbnail) ? (
                  <Image 
                    src={featured.thumbnail} 
                    alt={featured.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-z-accent/10 to-z-accent2/10 flex items-center justify-center">
                    <BookOpen size={48} className="text-z-accent/30" />
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="z-badge mb-3">Featured</div>
                <h2 className="text-2xl font-extrabold text-white mb-3 leading-snug">{featured.title}</h2>
                {featured.excerpt && <p className="text-z-muted text-sm leading-relaxed mb-5">{featured.excerpt}</p>}
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-z-accent hover:gap-3 transition-all">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          )}

          {/* Grid Layout */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card animate-pulse">
                  <div className="h-48 bg-white/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                    <div className="h-4 bg-white/5 rounded" />
                    <div className="h-3 bg-white/5 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : rest.length === 0 && !featured ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-z-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No articles found</h3>
              <p className="text-z-muted text-sm">Check back soon — new posts are published regularly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(post => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}