"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const getLocalizedHref = (lang: 'sk' | 'cz' | 'at' | 'en') => {
    const roots = {
      sk: "https://aebdigital.sk",
      cz: "https://aebdigital.cz",
      at: "https://aebdigital.at",
      en: "https://aebdigital.com"
    };

    const pathMaps: Record<string, Record<string, string>> = {
      '/portfolio': { sk: '/portfolio', cz: '/portfolio', at: '/portfolio', en: '/portfolio' },
      '/sluzby': { sk: '/sluzby', cz: '/services', at: '/services', en: '/services' },
      '/services': { sk: '/sluzby', cz: '/services', at: '/services', en: '/services' },
      '/o-nas': { sk: '/o-nas', cz: '/about', at: '/about', en: '/about' },
      '/about': { sk: '/o-nas', cz: '/about', at: '/about', en: '/about' },
      '/blog': { sk: '/blog', cz: '/blog', at: '/blog', en: '/blog' },
      '/kontakt': { sk: '/kontakt', cz: '/contact', at: '/contact', en: '/contact' },
      '/contact': { sk: '/kontakt', cz: '/contact', at: '/contact', en: '/contact' },
    };

    const exactMatch = pathMaps[pathname];
    if (exactMatch) return roots[lang] + exactMatch[lang];
    if (pathname.startsWith('/blog/')) return roots[lang] + '/blog';
    return roots[lang];
  };

  const LanguageSwitcher = ({ className = "", currentLang }: { className?: string, currentLang: string }) => (
    <div className={`flex items-center space-x-2 font-[family-name:var(--font-manrope)] ${className}`}>
      <a href={getLocalizedHref('sk')} className={`transition-colors ${currentLang === 'sk' ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}>SK</a>
      <span className="text-white/30">|</span>
      <a href={getLocalizedHref('cz')} className={`transition-colors ${currentLang === 'cz' ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}>CZ</a>
      <span className="text-white/30">|</span>
      <a href={getLocalizedHref('at')} className={`transition-colors ${currentLang === 'at' ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}>AT</a>
      <span className="text-white/30">|</span>
      <a href={getLocalizedHref('en')} className={`transition-colors ${currentLang === 'en' ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}>EN</a>
    </div>
  );

  // Function to determine if a link is active based on current path
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header className="header fixed top-0 left-0 w-full z-50 bg-transparent mix-blend-difference text-white">
        <div className="container mx-auto p-2 md:py-6 md:px-4">
          <div className="flex justify-between items-center h-12 md:h-16">
            {/* Left Group: Logo and Navigation */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Logo */}
              <div className="logo-container">
                <Link href="/" className="logo text-white text-[38px] font-[family-name:var(--font-anton)] font-bold uppercase tracking-wide">
                  AEB DIGITAL
                </Link>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <ul className="nav-menu flex space-x-6">
                  <li>
                    <Link href="/portfolio" className={`text-xl text-white nav-link-underline transition-colors ${isActive('/portfolio') ? 'active' : ''}`}>
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className={`text-xl text-white nav-link-underline transition-colors ${isActive('/services') ? 'active' : ''}`}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className={`text-xl text-white nav-link-underline transition-colors ${isActive('/about') ? 'active' : ''}`}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className={`text-xl text-white nav-link-underline transition-colors ${isActive('/blog') ? 'active' : ''}`}>
                      Blog
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <LanguageSwitcher currentLang="en" />
              {/* CTA Button (Desktop) */}
              <Link href="/contact" className="btn btn-secondary">
                <span className="btn-text-container">
                  <span className="btn-text btn-text-visible">Contact Us</span>
                  <span className="btn-text btn-text-hidden">MORE</span>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle md:hidden flex flex-col space-y-1.5 focus:outline-none"
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
            >
              <span className="block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out"></span>
              <span className="block w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out"></span>
              <span className="block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Outside header to avoid mix-blend-difference inheritance */}
      <div
        className={`mobile-menu fixed top-0 left-0 w-full h-full transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden z-[100] overflow-hidden animate-gradient-shift`}
        style={{
          background: 'linear-gradient(135deg, #030303 0%, #0a0a0a 25%, #050505 50%, #080808 75%, #040404 100%)',
          backgroundSize: '400% 400%'
        }}
      >
        {/* Star effect background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
          <div className="star star-6"></div>
          <div className="star star-7"></div>
          <div className="star star-8"></div>
          <div className="star star-9"></div>
          <div className="star star-10"></div>
          <div className="star star-11"></div>
          <div className="star star-12"></div>
        </div>

        <div className="mobile-menu-header flex justify-between items-center p-2 mx-auto w-[95%] border-b border-white/10 relative z-10">
          <div className="mobile-logo">
            <Link href="/" className="text-white text-[38px] font-[family-name:var(--font-anton)] font-bold leading-tight">
              AEB DIGITAL
            </Link>
          </div>
          <button
            className="mobile-menu-close text-white text-4xl focus:outline-none"
            aria-label="Close mobile menu"
            onClick={toggleMobileMenu}
          >
            &times;
          </button>
        </div>
        <div className="mobile-menu-nav-container px-4 py-2 relative z-10">
          <ul className="flex flex-col">
            <li className="border-b border-white/10">
              <Link href="/portfolio" className={`block text-white text-3xl py-4 ${isActive('/portfolio') ? 'active' : ''}`} onClick={toggleMobileMenu}>
                Portfolio
              </Link>
            </li>
            <li className="border-b border-white/10">
              <Link href="/services" className={`block text-white text-3xl py-4 ${isActive('/services') ? 'active' : ''}`} onClick={toggleMobileMenu}>
                Services
              </Link>
            </li>
            <li className="border-b border-white/10">
              <Link href="/about" className={`block text-white text-3xl py-4 ${isActive('/about') ? 'active' : ''}`} onClick={toggleMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="border-b border-white/10">
              <Link href="/blog" className={`block text-white text-3xl py-4 ${isActive('/blog') ? 'active' : ''}`} onClick={toggleMobileMenu}>
                Blog
              </Link>
            </li>
            <li className="border-b border-white/10">
              <Link href="/contact" className={`block text-white text-3xl py-4 ${isActive('/contact') ? 'active' : ''}`} onClick={toggleMobileMenu}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-8 flex justify-center pb-8">
            <LanguageSwitcher currentLang="en" className="text-xl space-x-6" />
          </div>
        </div>
      </div>
    </>
  );
}
