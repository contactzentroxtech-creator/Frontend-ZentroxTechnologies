import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationPageTemplate from "@/components/seo/LocationPageTemplate";

export const metadata: Metadata = {
  title:
    "software development service Company in Himachal Pradesh — Zentrox Technologies",
  description:
    "Looking for a software development service company in Himachal Pradesh? Zentrox Technologies provides website development, mobile apps, and custom software solutions for HP businesses. MSME Registered.",
  keywords: [
    "software company Himachal Pradesh",
    "website development Shimla",
    "app development Dharamshala",
    "software development service HP",
    "IT company Himachal",
  ],
  alternates: {
    canonical: "https://zentroxtech.com/locations/software-himachal",
  },
};

export default function SoftwareHimachalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <LocationPageTemplate
          city="Himachal Pradesh"
          state="Himachal Pradesh"
          service="software development service"
          serviceSlug="software"
          headline="software development service Company in Himachal Pradesh"
          subheadline="Zentrox Technologies serves businesses across Himachal Pradesh with premium software development service, web applications, and digital transformation services."
          ctaText="Free Consultation — HP Businesses"
          stats={[
            { label: "HP Clients Served", value: "30+" },
            { label: "Projects Delivered", value: "200+" },
            { label: "Support", value: "24/7" },
          ]}
          services={[
            {
              title: "Tourism & Hospitality Software",
              desc: "Custom booking systems, hotel management software, and tour operator platforms for HP tourism businesses.",
            },
            {
              title: "Government & Institutional Portals",
              desc: "Secure, scalable web portals for educational institutions, NGOs, and government bodies in Himachal Pradesh.",
            },
            {
              title: "E-Commerce for HP Businesses",
              desc: "Online stores for local handicrafts, produce, and regional products with payment gateway integration.",
            },
            {
              title: "Mobile App Development",
              desc: "iOS and Android apps for HP businesses to reach customers across India digitally.",
            },
          ]}
          faqs={[
            {
              q: "Does Zentrox Technologies serve clients in Shimla and Dharamshala?",
              a: "Yes, we are a remote-first company and serve clients across all major cities in Himachal Pradesh including Shimla, Dharamshala, Manali, Solan, and Kangra.",
            },
            {
              q: "What industries in Himachal Pradesh do you serve?",
              a: "We serve tourism, hospitality, education, retail, government, agriculture, and tech startups across Himachal Pradesh.",
            },
            {
              q: "Can you develop a tourism booking platform for an HP business?",
              a: "Absolutely. We have experience building custom booking platforms, tour management systems, and travel portals.",
            },
            {
              q: "Do you provide ongoing technical support for HP clients?",
              a: "Yes, we provide ongoing technical support, maintenance, and updates for all software solutions we build, regardless of your location in Himachal Pradesh.",
            },
          ]}
          nearbyAreas={[
            "Shimla",
            "Dharamshala",
            "Manali",
            "Solan",
            "Kangra",
            "Hamirpur",
            "Mandi",
            "Kullu",
            "Una",
            "Baddi",
          ]}
          structuredData={{
            "@type": "LocalBusiness",
            name: "Zentrox Technologies",
            description:
              "software development service Company serving Himachal Pradesh",
            telephone: "+91-8988183513",
            url: "https://zentroxtech.com",
            areaServed: "Himachal Pradesh",
            address: {
              "@type": "PostalAddress",
              addressRegion: "Himachal Pradesh",
              addressCountry: "IN",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
