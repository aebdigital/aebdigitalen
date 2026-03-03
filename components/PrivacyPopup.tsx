"use client";

import React from 'react';
import { useCookieConsent } from './CookieConsentProvider';
import Link from 'next/link';

export function PrivacyPopup() {
  const { showPrivacyPopup, setShowPrivacyPopup } = useCookieConsent();

  const closePopup = () => {
    setShowPrivacyPopup(false);
  };

  if (!showPrivacyPopup) return null;

  return (
    <div
      id="privacy-popup"
      className="privacy-popup fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[1000] overflow-y-auto p-4"
      onClick={closePopup}
    >
      <div
        className="privacy-popup-content bg-dark-gray text-white p-8 rounded-lg shadow-2xl max-w-3xl w-full relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        <button
          className="privacy-popup-close absolute top-4 right-4 text-white text-3xl font-bold leading-none focus:outline-none"
          onClick={closePopup}
          aria-label="Close privacy policy"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
        <div className="privacy-content text-gray-light leading-relaxed text-base overflow-y-auto pr-4 max-h-[calc(90vh-100px)]">
          <p className="mb-4"><strong>AEB Digital s. r. o.</strong><br />
            Company ID: 57 307 709<br />
            Executive: Peter Samuel Bobák<br />
            E-mail: peter@aebdig.com<br />
            Tel.: +421 908 507 131</p>

          <p className="mb-8">These Privacy Policy Principles (hereinafter referred to as "Principles") describe what personal data we process in connection with the use of our website and contact forms.</p>

          <hr className="my-8 border-gray-medium" />

          <h2 className="text-2xl font-bold mb-4">I. Contact Form</h2>
          <p className="mb-4">On the website www.aebdigital.com, we operate a contact form on two separate pages, the purpose of which is to allow you to:</p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>Ask a question about our products and services</li>
            <li>Request a price quote</li>
          </ul>

          <p className="mb-2"><strong>Scope of processed data:</strong></p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>Name and Surname</li>
            <li>Email Address</li>
            <li>Phone Number</li>
          </ul>

          <p className="mb-2"><strong>Purpose of processing:</strong><br />
            We process the stated data to contact you and respond to your inquiry.</p>

          <p className="mb-8"><strong>Legal basis:</strong><br />
            Article 6(1)(b) GDPR – performance of measures prior to entering into a contract at the request of the data subject.</p>

          <p className="mb-2"><strong>Retention period:</strong><br />
            Personal data will be kept for a maximum of 10 years from the response to your inquiry, unless another contractual relationship arises.</p>

          <hr className="my-8 border-gray-medium" />

          <h2 className="text-2xl font-bold mb-4">II. Cookies</h2>
          <p className="mb-4">On our website, we use cookies exclusively for the following purposes:</p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li><strong>Necessary cookies</strong> – ensure basic site functionality (e.g., session storage, browser settings).</li>
            <li><strong>Statistical (analytical) cookies</strong> – help us understand how visitors use the site (we only deploy them with user consent).</li>
          </ul>

          <p className="mb-8"><strong>Consent management:</strong><br />
            The user can withdraw consent to the use of statistical cookies at any time via the cookie bar settings or directly in the browser.</p>

          <hr className="my-8 border-gray-medium" />

          <h3 className="text-2xl font-bold mb-4">III. Rights of the Data Subject</h3>
          <p className="mb-4">Under the GDPR regulation, you have the following rights:</p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>Access to personal data we process</li>
            <li>Correction of inaccurate or incomplete data</li>
            <li>Deletion ("right to be forgotten") if there is no longer a legal basis for processing</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent – becomes effective on the day of withdrawal</li>
            <li>Filing a complaint with the Office for Personal Data Protection of the Slovak Republic (Hraničná 12, 820 07 Bratislava, <a href="http://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:underline">www.dataprotection.gov.sk</a>)</li>
          </ul>

          <p className="mb-8">In case of questions or exercising your rights, you can contact us at <a href="mailto:reachout@aebdig.com" className="text-accent-teal hover:underline">reachout@aebdig.com</a> or phone number +421 917 422 245.</p>

          <hr className="my-8 border-gray-medium" />

          <p className="italic text-gray-light"><em>These Principles become effective on April 25, 2025.</em></p>
        </div>
      </div>
    </div>
  );
}
