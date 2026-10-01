import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Quote",
  description:
    "Get in touch with Zentrox Technologies for web development, mobile apps, custom software and digital marketing services. Free consultation, response within 24 hours.",
  keywords: [
    "contact Zentrox Technologies",
    "software company contact",
    "web development quote Mohali",
    "mobile app development quote",
    "free consultation software",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/contact",
  },
  openGraph: {
    title: "Contact Zentrox Technologies | Get a Free Quote",
    description:
      "Have a project in mind? Get in touch for a free consultation. We reply within 24 hours.",
    url: "https://zentroxtechnologies.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
