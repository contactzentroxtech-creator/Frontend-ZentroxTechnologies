import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogPostClient from './BlogPostClient';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <BlogPostClient slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}
