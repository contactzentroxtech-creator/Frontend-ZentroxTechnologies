"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("https://backend-zentroxtechnologies.onrender.com/api/blog?admin=true");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const res = await fetch(`https://backend-zentroxtechnologies.onrender.com/api/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("Blog deleted!");
        fetchBlogs(); // Refresh list
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      alert("Error deleting blog");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading blogs...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          + New Post
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Title</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">No blogs found. Create one!</td></tr>
            ) : (
              blogs.map((blog: any) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                  <td className="p-4 text-gray-600">{blog.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => router.push(`/admin/blog/edit/${blog._id}`)} className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
