import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Software Development Company in Himachal Pradesh | Zentrox Technologies",
  description:
    "Looking for a software development company in Himachal Pradesh? Zentrox Technologies builds custom software, web apps, and mobile applications for businesses across Himachal Pradesh.",
  keywords: [
    "software company Himachal Pradesh",
    "software development Himachal",
    "custom software Himachal Pradesh",
    "web development Himachal",
    "mobile app development Himachal",
    "IT company Himachal Pradesh",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/locations/software-himachal",
  },
  openGraph: {
    title: "Software Development Company in Himachal Pradesh | Zentrox Technologies",
    description:
      "Custom software, web apps and mobile applications for businesses across Himachal Pradesh.",
    url: "https://zentroxtechnologies.com/locations/software-himachal",
    type: "website",
  },
};

export default function SoftwareHimachal() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <LocationPageTemplate
          title="Software Development Company in Himachal Pradesh"
          description="Zentrox Technologies builds custom software, web applications, and mobile apps for businesses across Himachal Pradesh. From startups to established enterprises, we deliver reliable digital solutions."
          city="Himachal Pradesh"
          state="Himachal Pradesh"
          country="India"
          highlights={[
            "Custom software solutions",
            "Scalable architecture",
            "Dedicated support",
            "On-time delivery",
          ]}
          industries={[
            "Hospitality & Tourism",
            "Healthcare",
            "Education",
            "Retail",
            "Manufacturing",
            "Real Estate",
            "Agriculture",
            "Startups",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
