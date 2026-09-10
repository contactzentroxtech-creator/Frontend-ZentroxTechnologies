import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Noida | Zentrox Technologies",
  description:
    "Looking for a mobile app development company in Noida? Zentrox Technologies builds user-friendly Android and iOS apps for startups and businesses across Noida and Delhi NCR.",
  keywords: [
    "app development Noida",
    "mobile app development Noida",
    "Android app development Noida",
    "iOS app development Noida",
    "mobile app company Noida",
    "app developers Delhi NCR",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/locations/app-development-noida",
  },
  openGraph: {
    title: "Mobile App Development Company in Noida | Zentrox Technologies",
    description:
      "User-friendly Android and iOS apps for startups and businesses across Noida and Delhi NCR.",
    url: "https://zentroxtechnologies.com/locations/app-development-noida",
    type: "website",
  },
};

export default function AppDevelopmentNoida() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <LocationPageTemplate
          title="Mobile App Development Company in Noida"
          description="Zentrox Technologies builds modern, user-friendly Android and iOS applications for startups and growing businesses across Noida and Delhi NCR. From concept to launch, we deliver reliable mobile experiences."
          city="Noida"
          state="Uttar Pradesh"
          country="India"
          highlights={[
            "Android & iOS apps",
            "Cross-platform development",
            "Modern UI/UX",
            "Ongoing support",
          ]}
          industries={[
            "Startups",
            "E-commerce",
            "Healthcare",
            "Education",
            "Fintech",
            "Real Estate",
            "Logistics",
            "Professional Services",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
