import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "SEO Company in Chandigarh | Zentrox Technologies",
  description:
    "Looking for an SEO company in Chandigarh? Zentrox Technologies provides data-driven SEO and local SEO services to help businesses in Chandigarh rank higher and grow online.",
  keywords: [
    "SEO company Chandigarh",
    "SEO services Chandigarh",
    "local SEO Chandigarh",
    "digital marketing Chandigarh",
    "SEO agency Chandigarh",
    "search engine optimization Chandigarh",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/locations/seo-chandigarh",
  },
  openGraph: {
    title: "SEO Company in Chandigarh | Zentrox Technologies",
    description:
      "Data-driven SEO and local SEO services for businesses in Chandigarh.",
    url: "https://zentroxtechnologies.com/locations/seo-chandigarh",
    type: "website",
  },
};

export default function SEOChandigarh() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <LocationPageTemplate
          title="SEO Company in Chandigarh"
          description="Zentrox Technologies provides data-driven SEO and local SEO services to help businesses in Chandigarh improve visibility, attract qualified traffic, and generate more leads."
          city="Chandigarh"
          state="Punjab"
          country="India"
          highlights={[
            "Local SEO expertise",
            "Transparent reporting",
            "Content-driven strategy",
            "Long-term growth",
          ]}
          industries={[
            "Healthcare",
            "Real Estate",
            "E-commerce",
            "Education",
            "Hospitality",
            "Professional Services",
            "Retail",
            "Startups",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
