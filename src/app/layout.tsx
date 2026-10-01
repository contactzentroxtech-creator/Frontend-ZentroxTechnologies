import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AppProviders } from "@/lib/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zentroxtechnologies.com"),
  title: {
    default: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    template: "%s | Zentrox Technologies",
  },
  description:
    "Zentrox Technologies is a software development and digital growth company in Mohali & Chandigarh, India. We build custom software, websites, mobile apps, SaaS platforms, AI integrations and digital marketing solutions.",
  keywords: [
    "software development company",
    "website development Mohali",
    "mobile app development India",
    "custom software development",
    "SEO services Mohali",
    "digital marketing Chandigarh",
  ],
  authors: [{ name: "Zentrox Technologies" }],
  alternates: { canonical: "https://zentroxtechnologies.com/" },
  openGraph: {
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description: "Custom software, websites, mobile apps, SaaS, AI integration, SEO services.",
    url: "https://zentroxtechnologies.com/",
    siteName: "Zentrox Technologies",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrox Technologies | Software & Digital Growth",
    description: "Custom software, websites, mobile apps, SaaS, AI integration.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} bg-[#FDF8F3] text-slate-800 antialiased`}>
        <AppProviders>
          <Navbar />
          <main className="pt-20 md:pt-24">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
