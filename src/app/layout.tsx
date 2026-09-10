import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/theme.css";
import { AppProviders } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
  description: "Zentrox Technologies delivers custom software, website development, mobile app development, SaaS solutions, AI integration, SEO, UI/UX design and digital marketing services for businesses in India and worldwide.",
  keywords: [
    "software development company",
    "website development company",
    "mobile app development",
    "custom software development",
    "SaaS development",
    "AI integration services",
    "SEO services",
    "digital marketing services",
    "website development India",
    "software development India",
    "digital agency Mohali",
    "website development Chandigarh",
    "digital marketing Punjab",
    "IT services India",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/",
  },
  openGraph: {
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description: "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing services for businesses in India and worldwide.",
    url: "https://zentroxtechnologies.com/",
    siteName: "Zentrox Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description: "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses worldwide.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-[#FDF8F3] text-slate-800 antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
