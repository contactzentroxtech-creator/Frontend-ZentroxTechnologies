import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Quote",
  description:
    "Get in touch with Zentrox Technologies for web development, mobile apps, custom software and digital marketing services.",
  alternates: { canonical: "https://zentroxtechnologies.com/contact" },
  openGraph: {
    title: "Contact Zentrox Technologies",
    description: "Free consultation · Response within 24 hours.",
    url: "https://zentroxtechnologies.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
