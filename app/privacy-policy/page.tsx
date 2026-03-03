import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GDPR | AEB Digital",
  description: "Privacy policy and GDPR of AEB Digital. Information about personal data processing, cookies and data subject rights under GDPR.",
  alternates: {
    canonical: "https://aebdigital.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BackgroundTextAnimation />

      {/* Page Header */}
      <section className="page-header py-32 bg-custom-bg text-white">
        <div className="container">
          <h1 className="page-title">Privacy Policy</h1>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="privacy-policy-content py-20 bg-custom-bg text-white">
        <div className="container">
          <div className="privacy-text max-w-4xl mx-auto">
            <p className="mb-4"><strong>AEB Digital s. r. o.</strong><br/>
            ID: 57 307 709<br/>
            CEO: Peter Samuel Bobak<br/>
            Email: peter@aebdig.com<br/>
            Phone: +421 908 507 131</p>

            <p className="mb-8">This Privacy Policy (hereinafter referred to as the "Policy") describes what personal data we process in connection with the use of our website and contact forms.</p>

            <hr className="my-8 border-gray-medium"/>

            <h2 className="text-3xl font-bold mb-4">I. Contact Form</h2>
            <p className="mb-4">On the website www.aebdigital.com we operate a contact form on two separate pages, the purpose of which is to enable you to:</p>
            <ul className="list-disc list-inside mb-4 pl-4 text-gray-light">
              <li>Ask a question about our products and services</li>
              <li>Request a price quote</li>
            </ul>

            <p className="mb-2"><strong>Scope of processed data:</strong></p>
            <ul className="list-disc list-inside mb-4 pl-4 text-gray-light">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>

            <p className="mb-2"><strong>Purpose of processing:</strong><br/>
            We process the above data in order to contact you and respond to your inquiry.</p>

            <p className="mb-8"><strong>Legal basis:</strong><br/>
            Article 6(1)(b) GDPR - performance of measures prior to entering into a contract at the request of the data subject.</p>

            <p className="mb-2"><strong>Retention period:</strong><br/>
            We will retain personal data for a maximum of 10 years from the response to your inquiry, unless a further contractual relationship is established.</p>

            <hr className="my-8 border-gray-medium"/>

            <h2 className="text-3xl font-bold mb-4">II. Cookies</h2>
            <p className="mb-4">On our website we use cookies exclusively for the following purposes:</p>
            <ul className="list-disc list-inside mb-4 pl-4 text-gray-light">
              <li><strong>Necessary cookies</strong> - ensure the basic functionality of the website (e.g., session storage, browser settings).</li>
              <li><strong>Statistical (analytical) cookies</strong> - help us understand how visitors use the website (we deploy them only with user consent).</li>
            </ul>

            <p className="mb-8"><strong>Consent management:</strong><br/>
            The user can withdraw consent to the use of statistical cookies at any time through the cookie banner settings or directly in the browser.</p>

            <hr className="my-8 border-gray-medium"/>

            <h3 className="text-3xl font-bold mb-4">III. Data Subject Rights</h3>
            <p className="mb-4">Under the GDPR regulation, you have the following rights:</p>
            <ul className="list-disc list-inside mb-4 pl-4 text-gray-light">
              <li>Access to personal data that we process</li>
              <li>Rectification of inaccurate or incomplete data</li>
              <li>Erasure ("right to be forgotten") if there is no longer a legal basis for processing</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent - becomes effective on the day of withdrawal</li>
              <li>Filing a complaint with the Office for Personal Data Protection of the Slovak Republic (Hranicna 12, 820 07 Bratislava, <a href="http://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:underline">www.dataprotection.gov.sk</a>)</li>
            </ul>

            <p className="mb-8">If you have any questions or wish to exercise your rights, you can contact us at <a href="mailto:reachout@aebdig.com" className="text-accent-teal hover:underline">reachout@aebdig.com</a> or by phone at +421 917 422 245.</p>

            <hr className="my-8 border-gray-medium"/>

            <p className="italic text-gray-light"><em>This Policy becomes effective on April 25, 2025.</em></p>
          </div>
        </div>
      </section>
    </>
  );
}
