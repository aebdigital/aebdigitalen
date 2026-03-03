import { ContactForm } from "@/components/ContactForm";
import { ContactInfoSection } from "@/components/ContactInfoSection";
import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Free Consultation and Price Quote | AEB Digital Bratislava",
  description: "Contact AEB Digital for a free consultation! Phone: +421 908 507 131, Email: peter@aebdig.com. Price quote for web development within 24 hours. Based in Bratislava.",
  keywords: [
    "contact AEB Digital",
    "web agency Bratislava",
    "free web consultation",
    "website price quote",
    "web development contact",
    "digital agency contact",
  ],
  alternates: {
    canonical: "https://aebdigital.com/contact",
  },
  openGraph: {
    title: "Contact - Free Consultation | AEB Digital",
    description: "Contact us for a free consultation. Phone: +421 908 507 131. Price quote within 24 hours!",
    url: "https://aebdigital.com/contact",
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <BackgroundTextAnimation />

      {/* Page Header */}
      <section className="page-header py-32 bg-custom-bg text-white">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
        </div>
      </section>

      <ContactInfoSection />
      <ContactForm />
      <FAQSection />
      <Footer />

      {/* Large AEB Digital Image below Footer */}
      <div className="relative z-40 w-full h-[400px] pointer-events-none hidden lg:block">
        <Image src="/sources/footimg_copy-removebg-preview.png" alt="AEB DIGITAL" width={1920} height={400} className="object-contain w-full h-full" />
      </div>
    </>
  );
}
