"use client";

import { usePathname } from "next/navigation";
import { ContactInfoSection } from "@/components/ContactInfoSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import Image from "next/image";

// Pages that should NOT show the contact sections (they have their own)
const excludedPages = ["/about", "/contact"];

// Page prefixes that should be excluded (e.g., /blog/slug pages have their own sections)
const excludedPrefixes = ["/blog/"];

export function PageSections() {
  const pathname = usePathname();

  // Don't render contact sections on excluded pages
  if (excludedPages.includes(pathname)) {
    return null;
  }

  // Don't render on pages that match excluded prefixes (like individual blog posts)
  if (excludedPrefixes.some(prefix => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <>
      <ContactInfoSection />
      <FAQSection />
      <ContactForm />
      <Footer />
      {/* Large AEB Digital Image below Footer */}
      <div className="relative z-40 w-full h-[400px] pointer-events-none hidden lg:block">
        <Image src="/sources/footimg_copy-removebg-preview.png" alt="AEB DIGITAL" width={1920} height={400} className="object-contain w-full h-full" />
      </div>
    </>
  );
}
