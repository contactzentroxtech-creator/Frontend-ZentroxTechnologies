import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Software Development Company in Mohali & Chandigarh",
  description:
    "Zentrox Technologies is a software development and digital growth company founded in 2023. We help businesses in India and worldwide build websites, apps, custom software and digital solutions.",
  alternates: {
    canonical: "https://zentroxtechnologies.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
