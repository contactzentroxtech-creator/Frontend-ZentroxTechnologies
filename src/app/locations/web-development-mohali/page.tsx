import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Website Development Company in Mohali | Zentrox Technologies",
  description:
    "Looking for a website development company in Mohali? Zentrox Technologies builds fast, modern, SEO-friendly websites for businesses in Mohali, Punjab and across India.",
  keywords: [
    "website development Mohali",
    "web development company Mohali",
    "website design Mohali",
    "web developer Mohali",
    "website company Punjab",
    "SEO friendly website Mohali",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/locations/web-development-mohali",
  },
  openGraph: {
    title: "Website Development Company in Mohali | Zentrox Technologies",
    description:
      "Fast, modern, SEO-friendly websites for businesses in Mohali and Punjab.",
    url: "https://zentroxtechnologies.com/locations/web-development-mohali",
    type: "website",
  },
};

export default function WebDevelopmentMohali() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <LocationPageTemplate
          title="Website Development Company in Mohali"
          description="Zentrox Technologies builds fast, modern, and SEO-friendly websites for businesses in Mohali, Punjab, and across India. From corporate websites to e-commerce stores, we deliver reliable digital experiences that grow your business."
          city="Mohali"
          state="Punjab"
          country="India"
          highlights={[
            "Fast, responsive websites",
            "SEO-friendly structure",
            "Mobile-first design",
            "Ongoing support",
          ]}
          industries={[
            "Startups",
            "Real Estate",
            "Healthcare",
            "Education",
            "E-commerce",
            "Manufacturing",
            "Professional Services",
            "Local Businesses",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
