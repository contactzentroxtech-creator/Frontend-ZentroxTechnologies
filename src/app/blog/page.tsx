import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog — Zentrox Technologies | Web Dev, AI & Digital Marketing Insights',
  description: 'Read articles on web development, AI, SEO, digital marketing, and tech entrepreneurship from the Zentrox Technologies team.',
  alternates: { canonical: 'https://zentroxtech.com/blog' },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <BlogClient />
      </main>
      <Footer />
    </>
  );
}
