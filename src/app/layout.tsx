import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { AppProviders } from "@/lib/providers";

import "../styles/globals.css";

const SITE_URL = "https://zentroxtechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Zentrox Technologies | Software Development & Digital Growth Partner",
    template: "%s | Zentrox Technologies",
  },

  description:
    "Zentrox Technologies provides custom software development, website development, mobile app development, SaaS solutions, AI integration, SEO, digital marketing and UI/UX design for businesses in India and worldwide.",

  keywords: [
    "Zentrox Technologies",
    "software development company India",
    "website development company Mohali",
    "website development company Chandigarh",
    "custom software development",
    "mobile app development",
    "SaaS development",
    "AI integration services",
    "SEO company Chandigarh",
    "digital marketing company Punjab",
    "UI UX design services",
  ],

  authors: [
    {
      name: "Zentrox Technologies",
      url: SITE_URL,
    },
  ],

  creator: "Zentrox Technologies",
  publisher: "Zentrox Technologies",

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/zentroxLogo.png",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Zentrox Technologies",

    title:
      "Zentrox Technologies | Software Development & Digital Growth Partner",

    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for businesses in India and worldwide.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentrox Technologies - Software & Digital Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Zentrox Technologies | Software Development & Digital Growth Partner",

    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses.",

    images: ["/og-image.png"],
  },

  verification: {
    google: "YyKjsbz3GhRqz0h09_nEslhvmpeInev20hILYpun6eU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04050a",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "Zentrox Technologies",

  url: SITE_URL,

  logo: `${SITE_URL}/zentroxLogo.png`,

  description:
    "Zentrox Technologies is an MSME-registered technology company providing custom software development, website development, mobile apps, SaaS solutions, AI integration, SEO, digital marketing and UI/UX design.",

  foundingDate: "2023",

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

  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Organization Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Theme */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem("zt_theme") || "dark";
                document.documentElement.className = theme;
              } catch (error) {}
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event:'gtm.js'
                });

                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer' ? '&l='+l : '';

                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WD9DPB8R');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){
                  (c[a].q=c[a].q||[]).push(arguments)
                };

                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;

                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xb0gh2ipu2");
            `,
          }}
        />
      </head>

      <body className="relative min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#04050a] dark:text-white">

        {/* Google Tag Manager NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WD9DPB8R"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* Background Grid */}
        <div
          className="grid-bg pointer-events-none opacity-[0.03] dark:opacity-100"
          aria-hidden="true"
        />

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
