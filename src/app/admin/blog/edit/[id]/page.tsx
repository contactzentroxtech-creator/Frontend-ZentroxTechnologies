"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "General",
    coverImage: "",
    published: true,
  });

  // ⭐ Yahan bhi Token Fix kar diya hai
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("zt_access_token") || localStorage.getItem("token");
    }
    return null;
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Direct public route se data fetch kar rahe hain (no token needed)
        // Kyunki humare paas admin/id ka direct route nahi hai abhi backend mein
        const res = await fetch("https://backend-zentroxtechnologies.onrender.com/api/blog?admin=true");
        const data = await res.json();
        if (data.success) {
          const blog = data.data.find((b: any) => b._id === id);
          if (blog) {
            const fullRes = await fetch(`https://backend-zentroxtechnologies.onrender.com/api/blog/${blog.slug}`);
            const fullData = await fullRes.json();
            if (fullData.success) {
              setFormData({
                title: fullData.data.title,
                content: fullData.data.content,
                excerpt: fullData.data.excerpt || "",
                category: fullData.data.category,
                coverImage: fullData.data.coverImage || "",
                published: fullData.data.published,
              });
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const token = getToken();
      const res = await fetch("https://backend-zentroxtechnologies.onrender.com/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      
      const result = await res.json();
      if (result.success) setFormData((prev) => ({ ...prev, coverImage: result.data.url }));
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = getToken();
      const res = await fetch(`https://backend-zentroxtechnologies.onrender.com/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Blog Updated Successfully! 🎉");
        router.push("/admin/blog");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading blog data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 mb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input type="text" required className="w-full border p-3 rounded-lg" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded-lg bg-gray-50" />
          {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
          {formData.coverImage && <img src={formData.coverImage} alt="Preview" className="mt-3 h-40 object-cover rounded-lg" />}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Excerpt</label>
          <textarea className="w-full border p-3 rounded-lg h-20" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Main Content (HTML)</label>
          <textarea required className="w-full border p-3 rounded-lg h-64 font-mono text-sm" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
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
        <button type="submit" disabled={saving || uploading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          {saving ? "Saving..." : "Update Blog Post 🚀"}
        </button>
      </form>
    </div>
  );
}
