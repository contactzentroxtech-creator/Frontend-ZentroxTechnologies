import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/theme.css";
import { AppProviders } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zentroxtechnologies.com"),
  title: {
    default:
      "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    template: "%s | Zentrox Technologies",
  },
  description:
    "Zentrox Technologies is a software development and digital growth company in Mohali & Chandigarh, India. We build custom software, websites, mobile apps, SaaS platforms, AI integrations and digital marketing solutions for businesses in India and worldwide.",
  keywords: [
    "software development company",
    "software development company India",
    "website development company",
    "website development Mohali",
    "website development Chandigarh",
    "mobile app development",
    "mobile app development India",
    "custom software development",
    "SaaS development",
    "AI integration services",
    "AI integration India",
    "SEO services",
    "SEO services Mohali",
    "digital marketing services",
    "digital marketing Chandigarh",
    "UI/UX design services",
    "CRM development",
    "API integration services",
    "software company Mohali",
    "software development Chandigarh",
    "IT services Punjab",
    "digital agency Mohali",
    "web development Punjab",
    "custom software India",
    "global software development company",
  ],
  authors: [{ name: "Zentrox Technologies" }],
  creator: "Zentrox Technologies",
  publisher: "Zentrox Technologies",
  alternates: {
    canonical: "https://zentroxtechnologies.com/",
  },
  openGraph: {
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing services for businesses in India and worldwide.",
    url: "https://zentroxtechnologies.com/",
    siteName: "Zentrox Technologies",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentrox Technologies - Software & Digital Growth Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses worldwide.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data for Organization & LocalBusiness
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zentrox Technologies",
    url: "https://zentroxtechnologies.com",
    logo: "https://zentroxtechnologies.com/Zentrox-Logo1.png",
    description:
      "Zentrox Technologies is a software development and digital growth company serving businesses in India and worldwide.",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mohali",
      addressLocality: "Mohali",
      addressRegion: "Punjab",
      postalCode: "140308",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-89881-83513",
      contactType: "Customer Service",
      email: "contact.zentroxtech@gmail.com",
      areaServed: ["IN", "US", "GB", "CA", "AU", "AE", "SG"],
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/zentrox-technologies",
      "https://www.instagram.com/zentroxtechnologies",
      "https://www.facebook.com/zentroxtechnologies",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Zentrox Technologies",
    image: "https://zentroxtechnologies.com/Zentrox-Logo1.png",
    url: "https://zentroxtechnologies.com",
    telephone: "+91-89881-83513",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mohali",
      addressLocality: "Mohali",
      addressRegion: "Punjab",
      postalCode: "140308",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.7046,
      longitude: 76.7179,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    areaServed: [
      "Mohali",
      "Chandigarh",
      "Punjab",
      "Haryana",
      "Himachal Pradesh",
      "Delhi NCR",
      "India",
      "USA",
      "UK",
      "Canada",
      "Australia",
      "UAE",
      "Singapore",
    ],
  };

  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-[#FDF8F3] text-slate-800 antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
