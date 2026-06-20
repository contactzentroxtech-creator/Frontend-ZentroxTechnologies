/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "helloweveryone.com" }, // 👈 Added this missing domain
    ],
  },
  async headers() {
    return [
      {
        // Apply strict headers to all routes EXCEPT the certificate portal
        source: "/((?!certificate-portal\\.html).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Allow same-origin iframes for the admin certificate portal
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // Certificate portal HTML can be iframed from same origin
        source: "/certificate-portal.html",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Type", value: "text/html; charset=utf-8" },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
