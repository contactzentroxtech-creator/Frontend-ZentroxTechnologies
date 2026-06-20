import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseDetailClient from './CourseDetailClient';

export const metadata: Metadata = {
  title: 'Course — Zentrox Technologies',
  description: 'Enroll in this course at Zentrox Technologies.',
};

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CourseDetailClient slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}
