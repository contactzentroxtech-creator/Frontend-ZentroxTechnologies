import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Technology & Business Blog — Zentrox Technologies",
  description:
    "Expert insights on software development, digital marketing, AI, and business growth from the Zentrox Technologies team.",
  alternates: { canonical: "https://zentroxtech.com/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <BlogClient />
      </main>
      <Footer />
    </>
  );
}
