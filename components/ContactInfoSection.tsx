"use client";

import React from 'react';
import { FaEnvelope, FaHandshake, FaTools } from 'react-icons/fa'; // Import specific icons

export function ContactInfoSection() {
  return (
    <section className="contact-info-section py-20 relative z-40">
      <div className="container">
        <h2 className="heading-section text-center mb-12">Contact</h2>

        <div className="contact-info-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="contact-card">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">General Information</h3>
            <div className="contact-item mb-2">
              <strong className="block text-white mb-1">Email:</strong>
              <a href="mailto:peter@aebdig.com" className="text-gray-light hover:text-accent-teal ml-2">peter@aebdig.com</a>
            </div>
            <div className="contact-item">
              <strong className="block text-white mb-1">Phone:</strong>
              <a href="tel:+421908507131" className="text-gray-light hover:text-accent-teal ml-2">+421 908 507 131</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaHandshake />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Sales Department</h3>
            <div className="contact-item mb-2">
              <strong className="block text-white mb-1">Email:</strong>
              <a href="mailto:alexander@aebdig.com" className="text-gray-light hover:text-accent-teal ml-2">alexander@aebdig.com</a>
            </div>
            <div className="contact-item">
              <strong className="block text-white mb-1">Phone:</strong>
              <a href="tel:+421917422245" className="text-gray-light hover:text-accent-teal ml-2">+421 917 422 245</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaTools />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Technical Support</h3>
            <div className="contact-item mb-2">
              <strong className="block text-white mb-1">Email:</strong>
              <a href="mailto:peter@aebdig.com" className="text-gray-light hover:text-accent-teal ml-2">peter@aebdig.com</a>
            </div>
            <div className="contact-item">
              <strong className="block text-white mb-1">Phone:</strong>
              <a href="tel:+421908507131" className="text-gray-light hover:text-accent-teal ml-2">+421 908 507 131</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
