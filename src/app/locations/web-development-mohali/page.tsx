import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LocationPageTemplate from '@/components/seo/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Web Development Company in Mohali — Zentrox Technologies',
  description: 'Looking for a web development company in Mohali? Zentrox Technologies builds premium websites, e-commerce stores, and SaaS platforms for Mohali businesses. MSME Registered. Free consultation.',
  keywords: ['web development company Mohali', 'website development Mohali', 'web developer Mohali', 'Mohali web design', 'best web development Mohali'],
  alternates: { canonical: 'https://zentroxtech.com/locations/web-development-mohali' },
  openGraph: {
    title: 'Web Development Company in Mohali — Zentrox Technologies',
    description: 'Premium web development for Mohali businesses. React, Next.js, E-Commerce & SaaS. MSME Registered. Free consultation available.',
  },
};

export default function WebDevMohaliPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <LocationPageTemplate
          city="Mohali"
          state="Punjab"
          service="Web Development"
          serviceSlug="web-dev"
          headline="Web Development Company in Mohali"
          subheadline="We build premium, high-performance websites and web applications for Mohali businesses — from startups to established enterprises."
          ctaText="Get Free Quote in Mohali"
          stats={[
            { label: 'Projects in Mohali Region', value: '50+' },
            { label: 'Average Delivery', value: '3-4 Weeks' },
            { label: 'Client Satisfaction', value: '4.9★' },
          ]}
          services={[
            { title: 'Business Websites', desc: 'Professional websites that convert visitors into customers for your Mohali business.' },
            { title: 'E-Commerce Development', desc: 'Full-featured online stores with payment integration for Mohali retailers and businesses.' },
            { title: 'SaaS Development', desc: 'Custom SaaS platforms built to scale — perfect for Mohali tech startups.' },
            { title: 'Web App Development', desc: 'React and Next.js web applications tailored to your business processes.' },
          ]}
          faqs={[
            { q: 'How much does a website cost in Mohali?', a: 'Website development in Mohali starts from ₹8,000 for basic business sites and goes up to ₹1,50,000+ for enterprise platforms. We offer transparent pricing and free consultations.' },
            { q: 'Do you serve clients in Mohali Phase 7, Phase 8, and Phase 9?', a: 'Yes, Zentrox Technologies serves clients across all phases of Mohali, including industrial areas, IT Park, and commercial sectors.' },
            { q: 'What is the web development timeline for Mohali businesses?', a: 'Most business websites are delivered within 2-4 weeks. E-commerce and custom platforms may take 4-8 weeks depending on complexity.' },
            { q: 'Do you provide website maintenance in Mohali?', a: 'Yes, we offer ongoing maintenance, updates, security patches, and performance optimization for all websites we build.' },
          ]}
          nearbyAreas={['IT Park Mohali', 'Phase 7 Mohali', 'Phase 8 Mohali', 'Phase 9 Mohali', 'Sector 70', 'Sector 82', 'Aerocity']}
          structuredData={{
            '@type': 'LocalBusiness',
            name: 'Zentrox Technologies',
            description: 'Web Development Company in Mohali',
            address: { '@type': 'PostalAddress', addressLocality: 'Mohali', addressRegion: 'Punjab', addressCountry: 'IN' },
            telephone: '+91-8988183513',
            url: 'https://zentroxtech.com',
            areaServed: 'Mohali, Punjab',
            priceRange: '₹₹',
          }}
        />
      </main>
      <Footer />
    </>
  );
}
