import Image from "next/image";
import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { TechnologiesShowcase } from "@/components/TechnologiesShowcase";
import { FaRocket, FaHeart, FaHandshake, FaAward } from 'react-icons/fa';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Team of Web Experts | AEB Digital Bratislava",
  description: "Meet the AEB Digital team - a web agency from Bratislava with 5+ years of experience. 120+ successful projects, modern technologies, individual approach. Your partner for digital transformation.",
  keywords: [
    "AEB Digital team",
    "web agency Bratislava",
    "about us",
    "web development team",
    "digital agency",
    "web designers",
    "developers Bratislava",
  ],
  alternates: {
    canonical: "https://aebdigital.com/about",
  },
  openGraph: {
    title: "About Us - Team of Web Experts | AEB Digital",
    description: "Meet the AEB Digital team - a web agency from Bratislava with 5+ years of experience and 120+ successful projects.",
    url: "https://aebdigital.com/about",
    type: "website",
  },
};

interface StorySectionProps {
  label: string;
  title: string;
  leadText: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

function StorySection({ label, title, leadText, paragraph, imageSrc, imageAlt, reverse = false }: StorySectionProps) {
  return (
    <div className="story-content grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16" style={{ backgroundColor: 'transparent' }}>
      <div className={`story-text ${reverse ? 'md:order-2' : 'md:order-1'}`}>
        <span className="story-label inline-block bg-accent-teal text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          {label}
        </span>
        <h2 className="text-4xl leading-tight mb-6 text-white">{title}</h2>
        <p className="lead-text text-lg text-white/[0.9] mb-6 font-medium">{leadText}</p>
        <p className="text-base text-white/[0.8] leading-relaxed">{paragraph}</p>
      </div>
      <div className={`story-image rounded-none overflow-hidden shadow-xl transform transition-transform duration-300 hover:-translate-y-1 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
        <Image src={imageSrc} alt={imageAlt} width={800} height={400} layout="responsive" objectFit="cover" />
      </div>
    </div>
  );
}

function ValuesGrid() {
  const values = [
    { icon: <FaRocket />, title: "Innovation", description: "We use the latest technologies and trends to create modern solutions that move you forward." },
    { icon: <FaHeart />, title: "Passion for Detail", description: "Every pixel, every line of code and every interaction are thoughtfully and perfectly crafted." },
    { icon: <FaHandshake />, title: "Partnership", description: "We are not just a vendor - we are your partner on the path to digital success." },
    { icon: <FaAward />, title: "Quality", description: "100% client satisfaction is not a coincidence - it is the result of our work and commitment." },
  ];

  return (
    <section className="values-grid py-24 text-white relative overflow-hidden z-10">
      <div className="container relative z-10">
        <div className="values-grid-inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="value-card text-center p-8 bg-white/[0.05] backdrop-blur-md rounded-xl border border-white/[0.1] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
              <div className="value-icon w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-accent-teal rounded-full text-white text-3xl">
                {value.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-accent-teal mb-3">{value.title}</h3>
              <p className="text-base text-white/[0.9] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header py-20 text-white relative z-10">
        <div className="container">
          <h1 className="page-title">About AEB Digital</h1>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content-modern py-20 relative z-10">
        <div className="container">
          <div className="about-layout">
            <StorySection
              label="Our Story"
              title="We create digital experiences that inspire"
              leadText="We are a young, dynamic team with more than 5 years of experience in digital technologies. We started as a small agency with big dreams."
              paragraph="Today we have 120+ satisfied clients behind us and continue to inspire others. We approach every project with an individual approach and attention to detail."
              imageSrc="/sources/aeb-portfolio/30.webp"
              imageAlt="AEB Digital work"
            />
            <StorySection
              label="Our Philosophy"
              title="Quality and innovation come first"
              leadText="We believe that every project is unique and deserves an individual approach. We use the latest technologies and trends, but never forget the fundamental principles of quality work."
              paragraph="Our goal is not just to create a functional solution, but to help your company achieve real success in the digital world."
              imageSrc="/sources/aeb-portfolio/80.webp"
              imageAlt="Digital solutions"
              reverse
            />
          </div>
        </div>
      </section>

      <ValuesGrid />

      <TechnologiesShowcase />

      <ContactForm />
      <FAQSection />
      <Footer />

      {/* Large AEB Digital Image below FAQ */}
      <div className="relative z-40 w-full h-[400px] pointer-events-none hidden lg:block">
        <Image src="/sources/footimg_copy-removebg-preview.png" alt="AEB DIGITAL" width={1920} height={400} className="object-contain w-full h-full" />
      </div>
    </>
  );
}
