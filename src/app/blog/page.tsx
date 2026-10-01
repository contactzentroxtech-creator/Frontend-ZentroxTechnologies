import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Technology, Web Development & Digital Marketing",
  description:
    "Read the latest insights on web development, mobile apps, digital marketing, SEO and technology trends.",
  alternates: { canonical: "https://zentroxtechnologies.com/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
