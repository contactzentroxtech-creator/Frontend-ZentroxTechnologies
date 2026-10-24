"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Web Development",
    coverImage: "",
    published: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const res = await fetch("https://backend-zentroxtechnologies.onrender.com/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, coverImage: result.data.url }));
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const res = await fetch("https://backend-zentroxtechnologies.onrender.com/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Blog Published Successfully! 🎉");
        router.push("/admin/blog");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 mb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input type="text" required className="w-full border p-3 rounded-lg" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Blog title..." />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded-lg bg-gray-50" />
          {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
          {formData.coverImage && <img src={formData.coverImage} alt="Preview" className="mt-3 h-40 object-cover rounded-lg" />}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Excerpt (Short Summary)</label>
          <textarea className="w-full border p-3 rounded-lg h-20" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary..." />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Main Content (HTML)</label>
          <textarea required className="w-full border p-3 rounded-lg h-64 font-mono text-sm" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="<p>Write your content here...</p>" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select className="w-full border p-3 rounded-lg bg-white" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option>Web Development</option>
              <option>Mobile Apps</option>
              <option>SEO</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select className="w-full border p-3 rounded-lg bg-white" value={formData.published ? "true" : "false"} onChange={(e) => setFormData({ ...formData, published: e.target.value === "true" })}>
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading || uploading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          {loading ? "Publishing..." : "Publish Blog Post 🚀"}
        </button>
      </form>
    </div>
  );
}
