import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Haryana | Zentrox Technologies",
  description:
    "Looking for a digital marketing agency in Haryana? Zentrox Technologies offers SEO, social media marketing, Google Ads and growth strategies for businesses across Haryana.",
  keywords: [
    "digital marketing Haryana",
    "digital marketing agency Haryana",
    "SEO services Haryana",
    "social media marketing Haryana",
    "Google Ads Haryana",
    "online marketing company Haryana",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/locations/digital-marketing-haryana",
  },
  openGraph: {
    title: "Digital Marketing Agency in Haryana | Zentrox Technologies",
    description:
      "SEO, social media marketing, Google Ads and growth strategies for businesses across Haryana.",
    url: "https://zentroxtechnologies.com/locations/digital-marketing-haryana",
    type: "website",
  },
};

export default function DigitalMarketingHaryana() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <LocationPageTemplate
          title="Digital Marketing Agency in Haryana"
          description="Zentrox Technologies helps businesses across Haryana grow with data-driven digital marketing — SEO, Google Ads, social media marketing and content strategies that deliver measurable results."
          city="Haryana"
          state="Haryana"
          country="India"
          highlights={[
            "Data-driven campaigns",
            "SEO & content strategy",
            "Social media marketing",
            "Measurable growth",
          ]}
          industries={[
            "Real Estate",
            "E-commerce",
            "Healthcare",
            "Education",
            "Retail",
            "Manufacturing",
            "Professional Services",
            "Hospitality",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
