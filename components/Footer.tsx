"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub, FaHome, FaBriefcase, FaCogs, FaUsers, FaBlog, FaEnvelope, FaCookieBite } from 'react-icons/fa';
import Image from "next/image";
import { useCookieConsent } from './CookieConsentProvider'; // Import the hook

export function Footer() {
  const { setShowSettings } = useCookieConsent(); // Use the hook

  const handleCookieSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSettings(true); // Open the cookie settings modal
  };

  return (
    <footer className="footer text-white pt-12 pb-20 relative z-40 overflow-hidden">
      {/* Placeholder for gradient if any */}              <div className="container relative z-10">
        <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="footer-main md:col-span-1">
            <div className="footer-brand mb-6">
              <h3 className="footer-logo-text text-4xl font-bold mb-2">AEB DIGITAL</h3>
              <p className="text-gray-light text-base mb-6 max-w-sm">We create digital solutions for your success. Modern websites, applications and custom marketing.</p>

              <div className="footer-social flex space-x-4 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center">
                  <a href="#" aria-label="Facebook" className="hover:text-primary-purple transition-colors"><FaFacebookF /></a>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center">
                  <a href="#" aria-label="Instagram" className="hover:text-primary-purple transition-colors"><FaInstagram /></a>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center">
                  <a href="#" aria-label="LinkedIn" className="hover:text-primary-purple transition-colors"><FaLinkedinIn /></a>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center">
                  <a href="#" aria-label="GitHub" className="hover:text-primary-purple transition-colors"><FaGithub /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-links grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
            <div className="footer-column">
              <h4 className="text-xl">Company</h4>
              <ul>
                <li className="mb-2"><Link href="/about" className="text-gray-light hover:text-primary-purple transition-colors text-base">About Us</Link></li>
                <li className="mb-2"><Link href="/portfolio" className="text-gray-light hover:text-primary-purple transition-colors text-base">Portfolio</Link></li>
                <li className="mb-2"><Link href="/contact" className="text-gray-light hover:text-primary-purple transition-colors text-base">Contact</Link></li>
                <li className="mb-2"><Link href="/blog" className="text-gray-light hover:text-primary-purple transition-colors text-base">Blog</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="text-xl">Services</h4>
              <ul>
                <li className="mb-2"><Link href="/services#websites" className="text-gray-light hover:text-primary-purple transition-colors text-base">Websites</Link></li>
                <li className="mb-2"><Link href="/services#web-applications" className="text-gray-light hover:text-primary-purple transition-colors text-base">Web Applications</Link></li>
                <li className="mb-2"><Link href="/services#e-shops" className="text-gray-light hover:text-primary-purple transition-colors text-base">E-shops</Link></li>
                <li className="mb-2"><Link href="/services#digital-marketing" className="text-gray-light hover:text-primary-purple transition-colors text-base">Digital Marketing</Link></li>
                <li className="mb-2"><Link href="/services#email-marketing" className="text-gray-light hover:text-primary-purple transition-colors text-base">Email Marketing</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="text-xl">Contact</h4>
              <ul>
                <li className="mb-2"><a href="mailto:peter@aebdig.com" className="text-gray-light hover:text-primary-purple transition-colors text-base">peter@aebdig.com</a></li>
                <li className="mb-2"><a href="mailto:alexander@aebdig.com" className="text-gray-light hover:text-primary-purple transition-colors text-base">alexander@aebdig.com</a></li>
                <li className="mb-2"><a href="tel:+421908507131" className="text-gray-light hover:text-primary-purple transition-colors text-base">+421 908 507 131</a></li>
                <li className="mb-2"><a href="tel:+421917422245" className="text-gray-light hover:text-primary-purple transition-colors text-base">+421 917 422 245</a></li>
                <li className="text-gray-light text-base">Bottova 5, 811 09 Bratislava</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-white/[0.1] text-base">
          <div className="footer-copyright mb-4 md:mb-0">
            <p className="text-base">&copy; 2025 AEB Digital</p>
          </div>
          <div className="footer-legal flex space-x-4">
            <Link href="/privacy-policy" className="text-gray-light hover:text-primary-purple transition-colors text-base">Privacy</Link>
            <a href="#" id="cookie-settings-footer" className="cookie-settings-icon text-gray-light hover:text-primary-purple transition-colors flex items-center text-base" title="Cookie Settings" onClick={handleCookieSettingsClick}>
              <FaCookieBite className="mr-1" /> Cookies
            </a>
          </div>
        </div>
      </div>            </footer>);
}
