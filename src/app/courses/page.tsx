import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CoursesClient from './CoursesClient';

export const metadata: Metadata = {
  title: 'Courses — Zentrox Technologies | Learn Web Dev, AI & More | Saturday Live Classes',
  description: 'Enroll in live Saturday courses at Zentrox Technologies. Learn React, Next.js, Node.js, AI integration, and full-stack development with hands-on projects and certificates.',
  alternates: { canonical: 'https://zentroxtech.com/courses' },
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CoursesClient />
      </main>
      <Footer />
    </>
  );
}
