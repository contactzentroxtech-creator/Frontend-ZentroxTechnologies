import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Digital Marketing Services Agency in Haryana — Zentrox Technologies",
  description:
    "Top Digital Marketing Services agency in Haryana. Zentrox Technologies provides SEO, social media marketing, Google Ads, and content marketing for Haryana businesses. MSME Registered.",
  keywords: [
    "Digital Marketing Services agency Haryana",
    "SEO Gurugram",
    "Digital Marketing Services Faridabad",
    "social media marketing Haryana",
    "Google Ads Haryana",
  ],
  alternates: {
    canonical: "https://zentroxtech.com/locations/digital-marketing-haryana",
  },
};

export default function DigitalMarketingHaryanaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <LocationPageTemplate
          city="Haryana"
          state="Haryana"
          service="Digital Marketing Services"
          serviceSlug="digital-marketing"
          headline="Digital Marketing Services Agency in Haryana"
          subheadline="Data-driven Digital Marketing Services for Haryana businesses — SEO, Google Ads, social media, and content marketing that delivers measurable results."
          ctaText="Get Free Marketing Audit"
          stats={[
            { label: "Haryana Clients", value: "40+" },
            { label: "Avg ROI Improvement", value: "2.5x" },
            { label: "Campaigns Managed", value: "100+" },
          ]}
          services={[
            {
              title: "SEO for Haryana Businesses",
              desc: "Rank higher on Google for searches in Gurugram, Faridabad, Panchkula, and across Haryana.",
            },
            {
              title: "Google Ads Management",
              desc: "Performance-driven Google Ads campaigns that maximize your ROI with precise targeting.",
            },
            {
              title: "Social Media Marketing",
              desc: "Strategic social media presence on Instagram, Facebook, and LinkedIn for Haryana brands.",
            },
            {
              title: "Content Marketing & Blogging",
              desc: "SEO-optimized content strategy that establishes authority and drives organic traffic.",
            },
          ]}
          faqs={[
            {
              q: "Do you serve businesses in Gurugram and Faridabad?",
              a: "Yes, Zentrox Technologies provides Digital Marketing Services services for businesses across Haryana including Gurugram, Faridabad, Panchkula, Ambala, Karnal, and Hisar.",
            },
            {
              q: "What Digital Marketing Services services do you offer in Haryana?",
              a: "We offer complete Digital Marketing Services: SEO, Google Ads, Meta Ads, social media management, email marketing, content marketing, and analytics.",
            },
            {
              q: "How do you measure Digital Marketing Services results?",
              a: "We provide monthly detailed reports tracking rankings, traffic, leads, conversions, and ROI. Our reporting is fully transparent with no vanity metrics.",
            },
            {
              q: "Do you have experience with manufacturing and industrial businesses in Haryana?",
              a: "Yes, we have worked with industrial, manufacturing, and B2B companies in Haryana, creating targeted Digital Marketing Services strategies for these sectors.",
            },
          ]}
          nearbyAreas={[
            "Gurugram",
            "Faridabad",
            "Panchkula",
            "Ambala",
            "Karnal",
            "Hisar",
            "Rohtak",
            "Sonipat",
            "Panipat",
            "Yamunanagar",
          ]}
          structuredData={{
            "@type": "LocalBusiness",
            name: "Zentrox Technologies",
            description: "Digital Marketing Services Agency serving Haryana",
            telephone: "+91-8988183513",
            url: "https://zentroxtech.com",
            areaServed: "Haryana",
            address: {
              "@type": "PostalAddress",
              addressRegion: "Haryana",
              addressCountry: "IN",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
