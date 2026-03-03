import Image from "next/image";
import Link from "next/link";
import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Web Development, E-shops, Applications | AEB Digital Bratislava",
  description: "Complete digital services in Bratislava: website development from €500, custom e-shops, web applications, digital marketing, SEO optimization, UI/UX design. Free consultation!",
  keywords: [
    "web development",
    "web design services",
    "e-shop development",
    "custom web applications",
    "SEO optimization",
    "digital marketing",
    "UI/UX design",
    "responsive web design",
    "WordPress websites",
    "React development",
  ],
  alternates: {
    canonical: "https://aebdigital.com/services",
  },
  openGraph: {
    title: "Services - Web Development, E-shops, Applications | AEB Digital",
    description: "Complete digital services in Bratislava: websites, e-shops, applications, marketing. Free consultation!",
    url: "https://aebdigital.com/services",
    type: "website",
  },
};

interface ServiceItemProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

function ServiceSection({ id, title, description, features, imageSrc, imageAlt, reverse = false }: ServiceItemProps) {
  return (
    <section id={id} className={`services-page-section ${reverse ? 'reverse' : ''}`}>
      {/* Desktop Layout */}
      <div className={`hidden lg:flex ${reverse ? 'flex-row-reverse' : 'flex-row'} min-h-screen`}>
        {/* Text Column */}
        <div className="w-1/2 flex items-center">
          <div className={`py-20 ${reverse ? 'pl-8 pr-[5vw]' : 'pl-[5vw] pr-8'}`}>
            <h2 className="text-7xl xl:text-8xl font-bold mb-6">{title}</h2>
            <p className="text-gray-light mb-8">{description}</p>

            <div className="service-list grid grid-cols-1 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="service-item flex items-center">
                  <span className="service-number text-accent-teal font-bold text-lg mr-2">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="text-gray-light">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
          </div>
        </div>
        {/* Image Column - 50vw, touching edge */}
        <div className="w-1/2 relative h-screen">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="relative h-[50vh] w-full">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
        <div className="py-12 px-4">
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <p className="text-gray-light mb-8">{description}</p>

          <div className="service-list grid grid-cols-1 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="service-item flex items-center">
                <span className="service-number text-accent-teal font-bold text-lg mr-2">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="text-gray-light">{feature}</span>
              </div>
            ))}
          </div>

          <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const processSteps = [
    {
      step: 1,
      title: "Consultation",
      description: "During the first meeting, we will together define your needs and project goals."
    },
    {
      step: 2,
      title: "Proposal",
      description: "We will create a detailed solution proposal and a price quote tailored to your budget."
    },
    {
      step: 3,
      title: "Development",
      description: "We implement the project using the latest technologies and best practices."
    },
    {
      step: 4,
      title: "Testing",
      description: "We thoroughly test all functionality and optimize the performance of the solution."
    },
    {
      step: 5,
      title: "Launch",
      description: "We launch the project into production and ensure a smooth transition."
    },
    {
      step: 6,
      title: "Support",
      description: "We provide technical support and maintenance for the long-term success of the project."
    },
  ];

  return (
    <section className="process-section py-20 text-white relative overflow-hidden">
      <div className="container relative z-10">
        <h2 className="heading-section text-center mb-12">Our Process</h2>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="process-card">
              <div className="process-icon">
                <span className="text-2xl font-bold">{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-light">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <BackgroundTextAnimation />

      {/* Page Header */}
      <section className="page-header py-32 text-white">
        <div className="container">
          <h1 className="page-title">Our Services</h1>
        </div>
      </section>

      <ServiceSection
        id="websites"
        title="Websites"
        description="We create modern, responsive websites optimized for all devices. Our websites are fast, SEO optimized and designed with user experience in mind."
        features={["Responsive design", "SEO optimization", "Fast loading", "CMS system", "Technical support", "SSL certificates", "Hosting & domains", "Google Analytics"]}
        imageSrc="/sources/web-design.webp"
        imageAlt="Websites"
      />

      <ServiceSection
        id="web-applications"
        title="Web Applications"
        description="We develop advanced web applications with modern functionality. We use the latest technologies like React, Node.js and TypeScript to create robust solutions."
        features={["React & Vue.js", "Node.js backend", "Real-time functionality", "API integrations", "Scalability", "Progressive Web Apps", "Databases & Cloud", "Automation"]}
        imageSrc="/sources/services/aplikacie.webp"
        imageAlt="Web Applications"
        reverse
      />

      <ServiceSection
        id="e-shops"
        title="E-shops"
        description="We create comprehensive e-commerce solutions that increase your sales. From design to payment gateways and order management - everything in one place."
        features={["WooCommerce & Shopify", "Payment gateways", "Inventory management", "Analytics & reporting", "Mobile optimization", "Inventory management", "Multi-channel sales", "Email marketing integration"]}
        imageSrc="/sources/Gemini_Generated_Image_lxz7dglxz7dglxz7.webp"
        imageAlt="E-shops"
      />

      <ServiceSection
        id="digital-marketing"
        title="Digital Marketing"
        description="We help your brand grow online. We manage social media, create content and run advertising campaigns that deliver results."
        features={["Social media management", "Google Ads & Facebook Ads", "Content creation", "Email marketing", "SEO optimization", "Influencer marketing", "Conversion optimization", "Marketing automation"]}
        imageSrc="/sources/social-media.webp"
        imageAlt="Digital Marketing"
        reverse
      />

      <ServiceSection
        id="email-marketing"
        title="Email Marketing"
        description="We create effective email campaigns that build relationships with your customers and increase conversions. From newsletters to automated sequences."
        features={["Newsletter campaigns", "Email automation", "A/B testing", "Analytics & reporting", "Content personalization", "Drip campaigns", "Lead nurturing", "ROI optimization"]}
        imageSrc="/sources/email-market.webp"
        imageAlt="Email Marketing"
      />

      <ProcessSection />
    </>
  );
}
