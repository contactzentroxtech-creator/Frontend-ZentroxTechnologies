import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Technology, Web Development & Digital Marketing Insights",
  description:
    "Read the latest insights on web development, mobile apps, digital marketing, SEO and technology trends from Zentrox Technologies.",
  keywords: [
    "technology blog",
    "web development blog",
    "digital marketing blog",
    "SEO tips",
    "software development insights",
    "Zentrox Technologies blog",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/blog",
  },
  openGraph: {
    title: "Blog | Zentrox Technologies",
    description:
      "Insights, tips and trends on technology, digital marketing, web development and business growth.",
    url: "https://zentroxtechnologies.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
