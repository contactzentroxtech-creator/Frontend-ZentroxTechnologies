import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "SEO Company in Chandigarh — Zentrox Technologies",
  description:
    "Best SEO company in Chandigarh. Zentrox Technologies delivers data-driven SEO, local SEO, and content marketing that ranks your business on top. MSME Registered. Free SEO audit.",
  keywords: [
    "SEO company Chandigarh",
    "Digital Marketing Services Chandigarh",
    "SEO services Chandigarh",
    "best SEO Chandigarh",
    "Chandigarh SEO agency",
  ],
  alternates: { canonical: "https://zentroxtech.com/locations/seo-chandigarh" },
};

export default function SEOChandigarhPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <LocationPageTemplate
          city="Chandigarh"
          state="Punjab/Haryana"
          service="SEO & Digital Marketing Services"
          serviceSlug="seo"
          headline="SEO Company in Chandigarh"
          subheadline="Data-driven SEO and Digital Marketing Services strategies that put your Chandigarh business on top of search results. MSME Registered — transparent reporting."
          ctaText="Get Free SEO Audit"
          stats={[
            { label: "Clients Ranked", value: "80+" },
            { label: "Avg Traffic Growth", value: "3x" },
            { label: "Keywords Ranked", value: "500+" },
          ]}
          services={[
            {
              title: "Local SEO Chandigarh",
              desc: "Dominate local search results in Chandigarh for your target keywords and area.",
            },
            {
              title: "Technical SEO Audit",
              desc: "Complete technical audit and optimization for maximum search engine visibility.",
            },
            {
              title: "Content Marketing",
              desc: "SEO-optimized content strategy that builds authority and drives organic traffic.",
            },
            {
              title: "Google Business Profile",
              desc: "Optimize your Google My Business profile to appear in local map results.",
            },
          ]}
          faqs={[
            {
              q: "How long does SEO take to show results in Chandigarh?",
              a: "SEO typically shows initial results in 3-4 months and significant improvements in 6-12 months. Local SEO in Chandigarh can show results faster for geo-targeted keywords.",
            },
            {
              q: "Do you provide SEO for Chandigarh e-commerce businesses?",
              a: "Yes, we specialize in e-commerce SEO including product page optimization, category SEO, and technical e-commerce site improvements.",
            },
            {
              q: "What is included in your Chandigarh SEO package?",
              a: "Our packages include keyword research, on-page optimization, technical SEO, local SEO, content optimization, link building, and monthly reporting.",
            },
            {
              q: "Do you provide Google Ads management in Chandigarh?",
              a: "Yes, we manage Google Ads, Meta Ads, and other paid media campaigns alongside our SEO services for maximum Digital Marketing Services ROI.",
            },
          ]}
          nearbyAreas={[
            "Sector 17 Chandigarh",
            "Sector 22",
            "IT Park Chandigarh",
            "Elante Mall Area",
            "Zirakpur",
            "Panchkula",
            "Mohali",
          ]}
          structuredData={{
            "@type": "LocalBusiness",
            name: "Zentrox Technologies",
            description: "SEO Company in Chandigarh",
            telephone: "+91-8988183513",
            url: "https://zentroxtech.com",
            areaServed: "Chandigarh",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chandigarh",
              addressCountry: "IN",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
