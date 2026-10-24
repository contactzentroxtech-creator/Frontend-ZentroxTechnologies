"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`https://backend-zentroxtechnologies.onrender.com/api/blog/${slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">Go back to blogs</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50 pb-20">
      {/* ═══════ HEADER SECTION ═══════ */}
      <div className="bg-white border-b pt-24 pb-12 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs mb-4 uppercase tracking-wider">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{blog.readTime} min read</span>
            <span>•</span>
            <span>{blog.views} views</span>
          </div>
        </div>
      </div>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 mt-10">
        
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* 
            ⭐ YEH SABSE IMPORTANT HAI ⭐
            dangerouslySetInnerHTML tumhare <h2>, <p> ko design mein badal dega.
            prose class se text ekdum sundar aur readable lagega.
        */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />

        {/* ═══════ FOOTER / SHARE ═══════ */}
        <div className="mt-16 pt-8 border-t">
          <Link href="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
            ← Back to all blogs
          </Link>
        </div>

      </div>
    </article>
  );
}
