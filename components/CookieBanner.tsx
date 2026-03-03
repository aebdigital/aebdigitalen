"use client";

import React, { useEffect } from 'react';
import { useCookieConsent } from './CookieConsentProvider';

export function CookieBanner() {
  const { showBanner, acceptAllCookies, declineAllCookies, setShowSettings } = useCookieConsent();

  // Effect to handle mobile viewport height fix, similar to original JS
  useEffect(() => {
    const fixMobileCookieBanner = () => {
      const isMobile = window.innerWidth <= 768; // Or check user agent if more precise needed
      if (isMobile) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    if (showBanner) {
      fixMobileCookieBanner();
      window.addEventListener('resize', fixMobileCookieBanner);
      window.addEventListener('orientationchange', fixMobileCookieBanner);
    }

    return () => {
      window.removeEventListener('resize', fixMobileCookieBanner);
      window.removeEventListener('orientationchange', fixMobileCookieBanner);
    };
  }, [showBanner]);


  if (!showBanner) return null;

  return (
    <div id="cookie-banner" className="cookie-banner fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md shadow-lg py-4 z-[999] transition-transform duration-500 ease-in-out transform translate-y-0 text-white border-t border-white/10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="cookie-content flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold mb-2">🍪 Cookies on Our Website</h4>
          <p className="text-gray-light text-sm">We use cookies to improve your user experience and for traffic analysis. By clicking "I Agree", you consent to the use of all cookies.</p>
        </div>
        <div className="cookie-buttons flex flex-col md:flex-row gap-3">
          <button onClick={acceptAllCookies} className="cookie-btn btn btn-primary !bg-accent-teal !text-white text-sm px-6 py-2 rounded-full">I Agree</button>
          <button onClick={declineAllCookies} className="cookie-btn btn btn-secondary !bg-gray-medium !text-white text-sm px-6 py-2 rounded-full">Decline</button>
          <button onClick={() => setShowSettings(true)} className="cookie-btn btn btn-secondary !bg-gray-medium !text-white text-sm px-6 py-2 rounded-full">Settings</button>
        </div>
      </div>
    </div>
  );
}
