import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Zentrox Technologies | Software, Web & Digital Growth Insights",
  description:
    "Insights on software development, website development, mobile apps, AI integration, SEO and digital marketing from the Zentrox Technologies team.",
  keywords: [
    "software development blog",
    "web development insights",
    "SEO tips",
    "digital marketing blog",
    "AI integration insights",
    "mobile app development blog",
    "technology blog India",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/blog",
  },
  openGraph: {
    title: "Blog | Zentrox Technologies",
    description:
      "Insights on software development, web development, AI, SEO and digital marketing.",
    url: "https://zentroxtechnologies.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Zentrox Technologies",
    description:
      "Insights on software, web development, AI, SEO and digital marketing.",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <BlogClient />
      </main>
      <Footer />
    </>
  );
}
