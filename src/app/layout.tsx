import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/lib/providers";
import Script from "next/script";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zentroxtech.com"),
  title: {
    default:
      "Zentrox Technologies — Premium website development & AI Solutions",
    template: "%s | Zentrox Technologies",
  },
  description:
    "Zentrox Technologies — MSME-registered technology company in Mohali & Chandigarh. We build premium websites, mobile apps, SaaS platforms, and AI solutions for growing businesses across Punjab.",
  keywords: [
    "website development company Mohali",
    "software company Chandigarh",
    "app development Punjab",
    "SEO company Chandigarh",
    "Digital Marketing Services Haryana",
    "AI automation India",
    "SaaS development",
    "Zentrox Technologies",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/zentroxLogo.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Zentrox Technologies", url: "https://zentroxtech.com" }],
  creator: "Zentrox Technologies",
  publisher: "Zentrox Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
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
      "Premium website development, AI & SaaS Solutions — Mohali & Chandigarh",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://zentroxtech.com",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
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
                "MSME-registered technology startup offering website development, AI solutions, SaaS development, SEO, and Digital Marketing Services.",
              foundingDate: "2023",
            }),
          }}
        />

        {/* Theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('zt_theme')||'dark';document.documentElement.className=t;}catch(e){}`,
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-14KYPQYTNB"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-14KYPQYTNB');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WD9DPB8R');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xb0gh2ipu2");
          `}
        </Script>
      </head>

      <body className="bg-white dark:bg-[#04050a] text-slate-900 dark:text-white transition-colors duration-300 min-h-screen relative">
        {/* Google Tag Manager (noscript) */}
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

        {/* FIXED GRID */}
        <div
          className="grid-bg opacity-[0.03] dark:opacity-100 pointer-events-none"
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
