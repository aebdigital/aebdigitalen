"use client";

import Image from "next/image";
import Link from "next/link";
import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactInfoSection } from "@/components/ContactInfoSection";


export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeCursor, setActiveCursor] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorActualPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Physics-based cursor animation with weight/lag
    let animationId: number;
    const ease = 0.15; // Lower = more lag/weight (0.05-0.2 is good range)

    const animateCursor = () => {
      // Calculate distance between actual cursor pos and target
      const dx = mousePos.current.x - cursorActualPos.current.x;
      const dy = mousePos.current.y - cursorActualPos.current.y;

      // Apply easing (creates the lag/weight effect)
      cursorActualPos.current.x += dx * ease;
      cursorActualPos.current.y += dy * ease;

      setCursorPos({ x: cursorActualPos.current.x, y: cursorActualPos.current.y });

      animationId = requestAnimationFrame(animateCursor);
    };

    animateCursor();
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    // GSAP Animations for AEB Digital Website
    gsap.registerPlugin(ScrollTrigger);
    // ... (rest of GSAP logic remains same)

    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768;
    };

    if (isMobileDevice()) {
      console.log('📱 Mobile device detected - GSAP animations disabled for performance');
      return;
    }

    // 1. HERO SECTION ANIMATIONS
    // Hero title animation
    const heroTitle = document.querySelector('.hero h1, .heading-large');
    if (heroTitle) {
      gsap.fromTo(heroTitle,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }

    // Hero subtitle animation
    const heroSubtitle = document.querySelector('.hero .subheading, .subheading');
    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.6
        }
      );
    }

    // Hero buttons animation
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons.length > 0) {
      gsap.fromTo(heroButtons,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          delay: 0.8
        }
      );
    }

    // Photo sliders section animation (immediate load)
    const photoSlidersSection = document.querySelector('.photo-sliders');
    if (photoSlidersSection) {
      gsap.fromTo(photoSlidersSection,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          delay: 1.2 // Load after hero animations complete
        }
      );
    }

    // Background sliders animation (if present)
    const bgSliders = document.querySelectorAll('.hero-slider');
    bgSliders.forEach((slider, index) => {
      gsap.fromTo(slider,
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3 + (index * 0.2)
        }
      );
    });

    // Text reveal animations
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
      // Skip hero headings and service-main h2 elements
      if (!heading.closest('.hero') && !heading.closest('.service-main')) {
        gsap.fromTo(heading,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: 'top 90%',
              toggleActions: 'play none none none' // Don't reverse on scroll up
            }
          }
        );
      }
    });

    // Hero Video Parallax Effect
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      gsap.to(heroVideo, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Generic section animations - REMOVED to prevent white gaps
    // Portfolio items animation
    const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-item-carousel, .portfolio-item-apple');
    portfolioItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: 'top 95%', // Trigger earlier to reduce delay
            toggleActions: 'play none none none' // Don't reverse on scroll up
          },
          delay: index * 0.05 // Reduce stagger delay
        }
      );
    });

    // CTA button hover animations
    const ctaButtons = document.querySelectorAll('.btn, .cta-btn');
    ctaButtons.forEach(button => {
      const tl = gsap.timeline({ paused: true });

      tl.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });

      button.addEventListener('mouseenter', () => tl.play());
      button.addEventListener('mouseleave', () => tl.reverse());
    });

    // Service Images Zoom Effect
    const serviceImages = gsap.utils.toArray('.service-image');
    serviceImages.forEach((imageContainer) => {
      const img = (imageContainer as HTMLElement).querySelector('img');
      if (img) {
        ScrollTrigger.create({
          trigger: imageContainer as HTMLElement,
          start: 'top bottom',
          end: 'bottom top', // Continue zooming until image leaves viewport
          scrub: true,
          onUpdate: (self) => {
            // Zoom from 2.5 down to 1.0
            const scale = 2.5 - (self.progress * 1.5);
            gsap.set(img, { scale: scale });
          }
        });
      }
    });

    // Stats box animation - smooth continuous bounce
    const statBoxes = document.querySelectorAll('.stat-box-animate');
    if (statBoxes.length > 0) {
      statBoxes.forEach((box, index) => {
        gsap.to(box, {
          y: -15,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2 // Stagger the bounce
        });
      });
    }

    // Performance Optimization
    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array means this runs once on mount


  const clientLogos = [
    { src: "/sources/client-logos/0d14c38b-9028-49c2-af84-09a9ef8e4d90.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/7648e5eb-8716-4f13-bacc-d24e9d2fcf31-removebg-preview.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/heatcooltech.webp", alt: "Heat Cool Tech" },
    { src: "/sources/client-logos/image.svg", alt: "Client Logo" },
    { src: "/sources/client-logos/instalatherm.svg", alt: "Instalatherm" },
    { src: "/sources/client-logos/lemino.webp", alt: "Lemino" },
    { src: "/sources/client-logos/log-new__1_-removebg-preview.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo (1).webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo (2).webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo bez pozadia.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo1.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo2 (1).webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logo2.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/logoRENT-CvoT_R4r.svg", alt: "Client Logo" },
    { src: "/sources/client-logos/output-onlinepngtools.webp", alt: "Client Logo" },
    { src: "/sources/client-logos/whole.webp", alt: "Client Logo" },
  ];

  const portfolioItems = [
    {
      imgSrc: "/sources/aeb-portfolio/kovosklo.webp",
      alt: "Metalworks",
      category: "Metalworks",
      subheading: "Modern web solutions for metalworking companies",
    },
    {
      imgSrc: "/sources/aeb-portfolio/stolarstvo.webp",
      alt: "Carpentry",
      category: "Carpentry",
      subheading: "Showcase your carpentry products online",
    },
    {
      imgSrc: "/sources/aeb-portfolio/raving.sk.webp",
      alt: "Construction",
      category: "Construction",
      subheading: "Professional websites for construction companies",
    },
    {
      imgSrc: "/sources/aeb-portfolio/110.webp",
      alt: "Healthcare",
      category: "Healthcare",
      subheading: "Digital solutions for healthcare facilities",
    },
    {
      imgSrc: "/sources/aeb-portfolio/120.webp",
      alt: "Car Dealerships",
      category: "Car Dealerships",
      subheading: "E-shops and catalogs for vehicle sales",
    },
    {
      imgSrc: "/sources/aeb-portfolio/70.webp",
      alt: "Agriculture",
      category: "Agriculture",
      subheading: "Websites for agricultural companies",
    },
    {
      imgSrc: "/sources/aeb-portfolio/lerent.webp",
      alt: "Car Rentals",
      category: "Car Rentals",
      subheading: "Booking systems and vehicle presentations",
    },
    {
      imgSrc: "/sources/aeb-portfolio/10.webp",
      alt: "Fashion",
      category: "Fashion",
      subheading: "E-commerce solutions for the fashion industry",
    },
    {
      imgSrc: "/sources/aeb-portfolio/Screenshot 2025-12-05 at 19.20.50.webp",
      alt: "Law Firms",
      category: "Law Firms",
      subheading: "Professional websites for legal services",
    },
  ];

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`gallery-custom-cursor fixed pointer-events-none z-[9999] transition-opacity duration-300 ${activeCursor === 'gallery' ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: cursorPos.x, top: cursorPos.y, width: '120px', height: '60px' }}
      >
        <div className={`gallery-custom-cursor-inner relative w-full h-full flex items-center justify-center transition-all duration-300 ${activeCursor === 'gallery' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="corner corner-tl absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
          <div className="corner corner-tr absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
          <div className="corner corner-bl absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
          <div className="corner corner-br absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>
          <span className="text-white font-bold tracking-widest text-xl font-[family-name:var(--font-manrope)]">MORE</span>
        </div>
      </div>

      <section id="home" className="hero relative z-10 h-screen flex items-center justify-start overflow-hidden">
        <video className="hero-video absolute top-0 left-0 w-full h-full object-cover brightness-60" autoPlay muted loop playsInline poster="/sources/hero-poster.jpg">
          <source src="/sources/1851190-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>

        {/* Top Shadow Overlay */}
        <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-black/90 to-transparent z-20 pointer-events-none"></div>

        {/* Bottom Shadow Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-black/90 to-transparent z-20 pointer-events-none"></div>

        <div className="container relative z-30 text-left">
          <div className="hero-content text-white max-w-4xl">
            <h1 className="heading-large text-left mb-8 md:mb-6">
              We Create Digital Solutions for Your Success
            </h1>

            <p className="subheading text-left max-w-2xl mr-auto text-white mb-10 md:mb-12">
              From creative design to technical solutions - everything under one roof
            </p>

            <div className="hero-buttons flex justify-start space-x-4 mt-12 md:mt-10">
              <Link href="/portfolio" className="btn btn-secondary">
                <span className="btn-text-container">
                  <span className="btn-text btn-text-visible">Portfolio</span>
                  <span className="btn-text btn-text-hidden">MORE</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Photo Sliders Section */}
          <section className="photo-sliders absolute inset-x-0 bottom-[-140px] md:bottom-[-180px] w-full overflow-hidden z-30">
            <div className="container pt-8">
              <div className="trust-text text-center mb-2 md:mb-4">
                <p className="text-gray-light text-sm md:text-lg">Trusted by 120+ companies</p>
              </div>
            </div>
            {/* Row 1 - Moving Right */}
            <div className="slider-row slider-right overflow-hidden">
              <div className="slider-track flex" style={{ width: `${clientLogos.length * 2 * 200}px` /* Adjust width dynamically */ }}>
                {clientLogos.concat(clientLogos).map((logo, index) => (
                  <Image key={index} src={logo.src} alt={logo.alt} width={150} height={75} className="mx-2 md:mx-4 my-1 md:my-2 flex-shrink-0 brightness-0 invert opacity-80 object-contain h-[40px] md:h-[75px] w-auto" />
                ))}
              </div>
            </div>
            {/* Add another row if needed, similar to the original */}
          </section>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="portfolio" className="portfolio-gallery-section relative z-40 pt-8 pb-20">
        <div className="container">
          <h2 className="heading-section text-left mb-12">We have worked with everyone</h2>

          <div className="gallery-container">
            <div className="gallery-columns grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <Link
                  href="/portfolio"
                  className="gallery-item relative block overflow-hidden rounded-lg group h-[240px] md:h-[300px] cursor-none"
                  key={index}
                  onMouseEnter={() => setActiveCursor('gallery')}
                  onMouseLeave={() => setActiveCursor(null)}
                >
                  <Image src={item.imgSrc} alt={item.alt} layout="fill" objectFit="cover" className={`gallery-bg-image transform transition-transform duration-500 group-hover:scale-105 ${index < 2 ? 'object-left' : ''}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300"></div>
                  <div className="gallery-category-container absolute bottom-0 left-0 w-full p-3 md:p-6 flex flex-col justify-end z-10 bg-black/40 backdrop-blur-md border-t border-white/10">
                    <h3 className="gallery-category text-white text-lg md:text-2xl font-bold mb-1 md:mb-2">{item.category}</h3>
                    <div className="gallery-subheading text-gray-light text-xs md:text-sm">{item.subheading}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-two-column relative z-40 pt-0 pb-20">
        {/* Desktop Layout */}
        <div className="w-full hidden lg:flex lg:flex-row">
          <div className="service-text-column flex-1 flex flex-col">
            {[
              {
                title: "Websites",
                description: "We create modern, responsive websites optimized for all devices. Our websites are fast, SEO optimized and designed with user experience in mind.",
                features: ["Responsive design", "SEO optimization", "Fast loading", "Modern technologies"],
                link: "#contact"
              },
              {
                title: "Applications",
                description: "We develop advanced web applications with modern functionality. We use the latest technologies like React, Node.js and TypeScript to create robust solutions.",
                features: ["React & Vue.js", "Node.js backend", "Real-time functionality", "API integrations"],
                link: "#contact"
              },
              {
                title: "E-shops",
                description: "We create comprehensive e-commerce solutions that increase your sales. From design to payment gateways and order management - everything in one place.",
                features: ["WooCommerce & Shopify", "Payment gateways", "Inventory management", "Analytics & reporting"],
                link: "#contact"
              },
              {
                title: "Social Media",
                description: "We help your brand grow online. We manage social media, create content and run advertising campaigns that deliver results.",
                features: ["Social media management", "Instagram & Facebook campaigns", "Content creation", "Influencer marketing"],
                link: "#contact"
              },
              {
                title: "Email Marketing",
                description: "We create effective email campaigns that build relationships with your customers and increase conversions. From newsletters to automated sequences.",
                features: ["Newsletter campaigns", "Email automation", "A/B testing", "Analytics & reporting"],
                link: "#contact"
              },
            ].map((service, index) => (
              <div className="service-text h-screen flex flex-col justify-center px-4 lg:pr-10 lg:pl-[calc(2.5vw+16px)]" key={index}>
                <div className="service-main mb-6">
                  <h2 className="text-8xl font-bold mb-8">{service.title}</h2>
                  <p className="text-gray-light mb-10">{service.description}</p>
                  <Link href={service.link} className="btn btn-primary">
                    <span className="btn-text-container">
                      <span className="btn-text btn-text-visible">Get a Quote</span>
                      <span className="btn-text btn-text-hidden">MORE</span>
                    </span>
                  </Link>
                </div>
                <div className="service-features mt-10">
                  <ul className="grid grid-cols-2 gap-4 text-gray-light">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="list-disc list-inside">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="service-images-column flex-1 flex flex-col">
            {[
              { src: "/sources/web-design.webp", alt: "Web Development" },
              { src: "/sources/services/aplikacie.webp", alt: "Web Applications" },
              { src: "/sources/Gemini_Generated_Image_lxz7dglxz7dglxz7.webp", alt: "E-commerce" },
              { src: "/sources/social-media.webp", alt: "Social Media Marketing" },
              { src: "/sources/email-market.webp", alt: "Email Marketing" },
            ].map((image, index) => (
              <div className="service-image" key={index}>
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Image first, then text for each service */}
        <div className="w-full flex flex-col lg:hidden">
          {[
            {
              title: "Websites",
              description: "We create modern, responsive websites optimized for all devices. Our websites are fast, SEO optimized and designed with user experience in mind.",
              features: ["Responsive design", "SEO optimization", "Fast loading", "Modern technologies"],
              link: "#contact",
              image: { src: "/sources/web-design.webp", alt: "Web Development" }
            },
            {
              title: "Applications",
              description: "We develop advanced web applications with modern functionality. We use the latest technologies like React, Node.js and TypeScript to create robust solutions.",
              features: ["React & Vue.js", "Node.js backend", "Real-time functionality", "API integrations"],
              link: "#contact",
              image: { src: "/sources/services/aplikacie.webp", alt: "Web Applications" }
            },
            {
              title: "E-shops",
              description: "We create comprehensive e-commerce solutions that increase your sales. From design to payment gateways and order management - everything in one place.",
              features: ["WooCommerce & Shopify", "Payment gateways", "Inventory management", "Analytics & reporting"],
              link: "#contact",
              image: { src: "/sources/Gemini_Generated_Image_lxz7dglxz7dglxz7.webp", alt: "E-commerce" }
            },
            {
              title: "Social Media",
              description: "We help your brand grow online. We manage social media, create content and run advertising campaigns that deliver results.",
              features: ["Social media management", "Instagram & Facebook campaigns", "Content creation", "Influencer marketing"],
              link: "#contact",
              image: { src: "/sources/social-media.webp", alt: "Social Media Marketing" }
            },
            {
              title: "Email Marketing",
              description: "We create effective email campaigns that build relationships with your customers and increase conversions. From newsletters to automated sequences.",
              features: ["Newsletter campaigns", "Email automation", "A/B testing", "Analytics & reporting"],
              link: "#contact",
              image: { src: "/sources/email-market.webp", alt: "Email Marketing" }
            },
          ].map((service, index) => (
            <div key={index} className="mb-12">
              {/* Image first on mobile - edge to edge */}
              <div className="relative h-[300px] w-full mb-6 overflow-hidden">
                <Image src={service.image.src} alt={service.image.alt} layout="fill" objectFit="cover" className="w-full h-full" />
              </div>
              {/* Text content - with padding */}
              <div className="service-text text-center px-4">
                <div className="service-main mb-6">
                  <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-light mb-6">{service.description}</p>
                  <Link href={service.link} className="btn btn-primary mx-auto">
                    <span className="btn-text-container">
                      <span className="btn-text btn-text-visible">Get a Quote</span>
                      <span className="btn-text btn-text-hidden">MORE</span>
                    </span>
                  </Link>
                </div>
                <div className="service-features mt-6">
                  <ul className="grid grid-cols-1 gap-2 text-gray-light text-center">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section relative z-40 py-40 overflow-hidden">
        <div className="container relative z-10">
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-0 text-center">
            <div className="stat-box stat-box-animate backdrop-blur-sm bg-white/5 p-8 rounded-none border border-white/10 hover:-translate-y-1 transition-transform duration-300">
              <div className="stat-number text-5xl font-bold text-accent-teal mb-2">120+</div>
              <div className="stat-label text-gray-light text-lg">Successful Projects</div>
            </div>
            <div className="stat-box stat-box-animate backdrop-blur-sm bg-white/5 p-8 rounded-none border border-white/10 hover:-translate-y-1 transition-transform duration-300">
              <div className="stat-number text-5xl font-bold text-accent-teal mb-2">5+</div>
              <div className="stat-label text-gray-light text-lg">Years of Experience</div>
            </div>
            <div className="stat-box stat-box-animate backdrop-blur-sm bg-white/5 p-8 rounded-none border border-white/10 hover:-translate-y-1 transition-transform duration-300">
              <div className="stat-number text-5xl font-bold text-accent-teal mb-2">99%</div>
              <div className="stat-label text-gray-light text-lg">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
