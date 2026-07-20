import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InternshipClient from "./InternshipClient";

export const metadata: Metadata = {
  title: "Remote Internship Program — Zentrox Technologies | Apply Now",
  description:
    "Join the Zentrox Technologies remote internship program. Learn real-world development, complete tasks, pass aptitude tests, and earn an internship certificate + recommendation letter.",
  alternates: { canonical: "https://zentroxtechnologies.com/internship" },
};

export default function InternshipPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <InternshipClient />
      </main>
      <Footer />
    </>
  );
}
