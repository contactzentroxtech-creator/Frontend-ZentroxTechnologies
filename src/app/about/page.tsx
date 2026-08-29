import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title:
    "About Zentrox Technologies | Software & Digital Growth Company",

  description:
    "Learn about Zentrox Technologies, a remote-first software development and digital growth company founded in 2023, serving businesses in India and worldwide.",

  alternates: {
    canonical: "https://zentroxtechnologies.com/about",
  },

  openGraph: {
    title: "About Zentrox Technologies",
    description:
      "Learn about our remote-first team, technology expertise, and mission to help businesses grow through software, AI, web development, SEO, and digital solutions.",
    url: "https://zentroxtechnologies.com/about",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Zentrox Technologies",
    description:
      "A remote-first software and digital growth company helping businesses build and grow online.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <AboutClient />
      </main>

      <Footer />
    </>
  );
}
