import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Software Development Company in Mohali & Chandigarh",
  description:
    "Zentrox Technologies is a software development and digital growth company founded in 2023. We help businesses in India and worldwide build websites, apps, custom software and digital solutions.",
  keywords: [
    "about Zentrox Technologies",
    "software company Mohali",
    "software company Chandigarh",
    "IT company Punjab",
    "custom software development India",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/about",
  },
  openGraph: {
    title: "About Zentrox Technologies",
    description:
      "Founded in 2023, Zentrox Technologies builds custom software, websites, mobile apps and digital solutions.",
    url: "https://zentroxtechnologies.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
