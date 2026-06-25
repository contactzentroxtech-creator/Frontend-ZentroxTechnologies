import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/lib/providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zentroxtech.com"),
  title: {
    default: "Zentrox Technologies — Premium Web Development & AI Solutions",
    template: "%s | Zentrox Technologies",
  },
  description:
    "Zentrox Technologies — MSME-registered technology company in Mohali & Chandigarh. We build premium websites, mobile apps, SaaS platforms, and AI solutions for growing businesses across Punjab.",
  keywords: [
    "web development company Mohali",
    "software company Chandigarh",
    "app development Punjab",
    "SEO company Chandigarh",
    "digital marketing Haryana",
    "AI automation India",
    "SaaS development",
    "Zentrox Technologies",
  ],
  // ─── ICON METADATA CONFIGURATION (FIXES YOUR ISSUE) ───
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/zentroxLogo.png", type: "image/png" }, // Fallback to ensure png displays safely
    ],
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Zentrox Technologies", url: "https://zentroxtech.com" }],
  creator: "Zentrox Technologies",
  publisher: "Zentrox Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zentroxtech.com",
    siteName: "Zentrox Technologies",
    title: "Zentrox Technologies — Premium Web & AI Solutions",
    description:
      "MSME-registered technology company building futuristic web, mobile, and AI solutions for Punjab businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentrox Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrox Technologies",
    description:
      "Premium Web Development, AI & SaaS Solutions — Mohali & Chandigarh",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://zentroxtech.com" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04050a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Manual icon link tags safely removed — handled by Next.js metadata above */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zentrox Technologies",
              url: "https://zentroxtech.com",
              logo: "https://zentroxtech.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8988183513",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi", "Punjabi"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mohali",
                addressRegion: "Punjab",
                addressCountry: "IN",
              },
              description:
                "MSME-registered technology startup offering web development, AI solutions, SaaS development, SEO, and digital marketing.",
              foundingDate: "2023",
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('zt_theme')||'dark';document.documentElement.className=t;}catch(e){}`,
          }}
        />
      </head>
      <body>
        <div className="grid-bg" aria-hidden="true" />
        <AppProviders>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0d1220",
                color: "#e8eaf6",
                border: "1px solid rgba(59,123,255,0.2)",
                borderRadius: "12px",
                fontSize: "0.85rem",
              },
            }}
          />
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
