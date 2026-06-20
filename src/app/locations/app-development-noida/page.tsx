import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LocationPageTemplate from '@/components/seo/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'App Development Company in Noida — Zentrox Technologies',
  description: 'Mobile app development company in Noida. Zentrox Technologies builds iOS, Android, and cross-platform apps for Noida startups and enterprises. MSME Registered. Free consultation.',
  keywords: ['app development company Noida', 'mobile app development Noida', 'Android app Noida', 'iOS app Noida', 'app developer Noida'],
  alternates: { canonical: 'https://zentroxtech.com/locations/app-development-noida' },
};

export default function AppDevNoidaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <LocationPageTemplate
          city="Noida" state="Uttar Pradesh" service="App Development" serviceSlug="mobile"
          headline="App Development Company in Noida"
          subheadline="We build high-performance iOS, Android, and cross-platform mobile applications for Noida startups, enterprises, and businesses of all sizes."
          ctaText="Get Free App Quote — Noida"
          stats={[{ label: 'Apps Delivered', value: '60+' }, { label: 'Avg App Store Rating', value: '4.7★' }, { label: 'Platforms', value: 'iOS + Android' }]}
          services={[
            { title: 'React Native Apps', desc: 'Cross-platform apps that work seamlessly on both iOS and Android from a single codebase.' },
            { title: 'Android App Development', desc: 'Native Android applications with Material Design, optimized performance, and Play Store deployment.' },
            { title: 'iOS App Development', desc: 'Premium iOS apps built with SwiftUI, deployed to the App Store with full compliance.' },
            { title: 'SaaS Mobile Apps', desc: 'Mobile frontends for SaaS platforms, with authentication, payments, and real-time features.' },
          ]}
          faqs={[
            { q: 'How much does app development cost in Noida?', a: 'Mobile app development in Noida starts from ₹50,000 for simple apps and can go up to ₹5,00,000+ for complex enterprise applications. We provide free detailed quotes.' },
            { q: 'How long does it take to build a mobile app?', a: 'Simple apps take 4-8 weeks, mid-complexity apps 2-4 months, and enterprise apps 4-6+ months depending on features and integrations.' },
            { q: 'Do you serve startups in Noida Sector 62 and Sector 18?', a: 'Yes, we serve clients across all sectors of Noida and Greater Noida including Sector 62, Sector 18, Sector 63, and the Noida-Greater Noida Expressway tech corridor.' },
            { q: 'Do you provide app maintenance after launch?', a: 'Yes, we offer ongoing maintenance, feature updates, OS compatibility updates, and performance optimization packages post-launch.' },
          ]}
          nearbyAreas={['Sector 62', 'Sector 18', 'Sector 63', 'Greater Noida', 'Noida Expressway', 'Knowledge Park', 'Alpha-I', 'Indirapuram', 'Vaishali']}
          structuredData={{ '@type': 'LocalBusiness', name: 'Zentrox Technologies', description: 'App Development Company in Noida', telephone: '+91-8988183513', url: 'https://zentroxtech.com', areaServed: 'Noida, Uttar Pradesh', address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } }}
        />
      </main>
      <Footer />
    </>
  );
}
