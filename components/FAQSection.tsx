"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does it take to create a website?",
    answer: "The turnaround time depends on the complexity of the project. A simple presentation website can be completed in 1-2 weeks, while a complex e-shop or web application may take 4-8 weeks. After the initial consultation, we will provide you with an exact timeline."
  },
  {
    question: "How much does a website cost?",
    answer: "Prices range from €500 for a simple presentation website to €5000+ for complex e-commerce solutions. The final price depends on functionality, design, and requirements. We provide a transparent price quote after analyzing your needs."
  },
  {
    question: "Do you also provide maintenance and support?",
    answer: "Yes, we offer complete maintenance and technical support services. This includes content updates, security patches, data backups, and technical troubleshooting. You can choose from various packages according to your needs."
  },
  {
    question: "Will we be able to edit the website content ourselves?",
    answer: "Of course! We build websites with a user-friendly CMS (Content Management System) that allows you to easily add and edit content without technical knowledge. We also provide training and documentation."
  },
  {
    question: "Are your websites optimized for mobile devices?",
    answer: "All our websites are responsive, meaning they automatically adapt to any device - whether it's a mobile, tablet, or computer. We use a mobile-first approach for optimal user experience."
  },
  {
    question: "Do you also help with digital marketing?",
    answer: "Yes, we offer comprehensive digital marketing services including SEO optimization, social media management, PPC campaigns, and email marketing. We help you not only create a great website but also attract visitors to it."
  },
  {
    question: "What is the process of creating a website?",
    answer: "Our process involves 4 steps: 1) Free consultation and needs analysis, 2) Creation of wireframes and design, 3) Programming and testing, 4) Launch and training. Each step includes your feedback."
  },
  {
    question: "Do you provide guarantees for your work?",
    answer: "Yes, we provide a 12-month warranty on all our web solutions. The warranty covers technical errors, browser compatibility, and basic functionality. Minor adjustments and fixes are free during the warranty period."
  },
  {
    question: "Can you migrate an existing website?",
    answer: "Of course! We will ensure a complete migration of your data, content, and SEO settings from the original site. The process is designed not to affect your traffic or search engine rankings."
  },
  {
    question: "Can I order just the design without programming?",
    answer: "Yes, we also offer standalone design services. We will create complete UI/UX designs for you in Figma together with prototypes and graphic assets for further implementation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, card payments, and PayPal. Larger projects are split into partial payments - usually 50% at the beginning and 50% upon completion. Monthly invoicing is possible for long-term projects."
  },
  {
    question: "Do you also create mobile applications?",
    answer: "We specialize in web applications that work perfectly on mobiles as PWAs (Progressive Web Apps). For native mobile applications, we have partner companies with whom we work closely."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern technologies like React, Vue.js, Node.js, TypeScript, and WordPress. For design, we work with Figma and Adobe Creative Suite. We always adapt the choice of technologies to the project needs."
  },
  {
    question: "Do you help with content and copywriting?",
    answer: "Yes, we have experienced copywriters who will help you create high-quality content optimized for SEO. We help with texts, product descriptions, and marketing materials."
  },
  {
    question: "What is your availability for urgent issues?",
    answer: "For critical issues, we have technical support from 9 AM to 10 PM. Standard response time is within 2 hours on business days and within 24 hours on weekends. We resolve urgent repairs with priority."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-20 text-white relative z-40">
      <div className="container">
        <h2 className="heading-section text-left mb-12">Frequently Asked Questions</h2>
        <div className="faq-layout grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="faq-grid lg:col-span-2">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item border-b border-gray-medium/20 last:border-b-0">
                <div
                  className={`faq-question flex justify-between items-center cursor-pointer py-4 transition-all duration-300 hover:bg-accent-teal/10 hover:pl-4 rounded-md ${openIndex === index ? 'text-accent-teal' : 'text-white'}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-bold font-sans normal-case">{item.question}</h3>
                  <span className={`faq-toggle text-2xl font-light transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-accent-teal' : ''}`}>+</span>
                </div>
                <div
                  className={`faq-answer overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-gray-light pl-4 pr-8 py-2 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact-box p-8 flex flex-col justify-center items-center text-center sticky top-20 self-start hidden lg:flex">
            <h3 className="text-3xl font-bold font-heading mb-6">First consultation and proposal are free!</h3>
            <Link href="/contact" className="btn btn-primary">
              <span className="btn-text-container">
                <span className="btn-text btn-text-visible">Contact</span>
                <span className="btn-text btn-text-hidden">MORE</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
