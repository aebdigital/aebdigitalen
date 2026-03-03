"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Turnstile } from '@marsidev/react-turnstile';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: '',
    turnstileToken: '',
    website: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: typeof formData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTurnstileVerify = (token: string) => {
    setFormData((prevData: typeof formData) => ({
      ...prevData,
      turnstileToken: token,
    }));
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setFormMessage({ text, type });
    if (type === 'success') {
      setTimeout(() => {
        setFormMessage({ text: '', type: '' });
      }, 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage({ text: '', type: '' });

    const { name, email, subject, message, phone, budget, turnstileToken, website } = formData;

    // Basic form validation
    if (!name || !email || !subject || !message) {
      showMessage('Please fill in all required fields.', 'error');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^S@]+@[^S@]+\.[^S@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Please enter a valid email.', 'error');
      setLoading(false);
      return;
    }

    // Turnstile validation
    if (!turnstileToken) {
      showMessage('Please confirm you are not a robot.', 'error');
      setLoading(false);
      return;
    }

    let fullMessage = `${message}\n\n`;
    if (phone) fullMessage += `Phone: ${phone}\n`;
    if (budget) fullMessage += `Budget: ${budget}\n`;
    fullMessage += `Project Type: ${subject}`;

    const payload = {
      name: name,
      email: email,
      message: fullMessage,
      turnstileToken: turnstileToken,
      website: website, // Include honeypot in payload
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage(data.message || 'Thank you! Your message has been sent successfully.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          budget: '',
          message: '',
          turnstileToken: '',
          website: '',
        });
        // Reset turnstile here if needed, but the component might handle it
      } else {
        showMessage(data.error || 'An error occurred while sending the message.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('❌ An error occurred while sending the message. Please try again later or contact us by phone at +421 908 507 131.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-form-section py-20 relative z-40">
      <div className="container">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="contact-text">
            <h2 className="heading-section text-white mb-6 text-left">Have an idea? Let's do it!</h2>
            <p className="text-gray-light mb-8">Do you have a project in mind? Write to us and we will create a custom solution with a free consultation.</p>

            <div className="contact-person-box flex items-center bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[15px] hover:-translate-y-1 transition-transform duration-300">
              <div className="contact-person-info">
                <h4 className="text-white text-lg font-bold">Peter Samuel Bobák</h4>
                <p className="text-gray-light text-sm mb-1">CEO</p>
                <a href="tel:+421908507131" className="text-accent-teal hover:underline text-sm font-bold">+421 908 507 131</a>
              </div>
            </div>
          </div>

          <form id="contact-form" className="contact-form bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[20px]" onSubmit={handleSubmit}>
            {/* Honeypot Field - Invisible to users, visible to bots */}
            <div className="hidden absolute opacity-0 -z-10 h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full py-3 px-4 text-white bg-[#383a3c] border border-white/20 rounded-[10px] focus:outline-none focus:border-accent-teal transition-colors"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full py-3 px-4 text-white bg-[#383a3c] border border-white/20 rounded-[10px] focus:outline-none focus:border-accent-teal transition-colors"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+421 XXX XXX XXX"
                className="w-full py-3 px-4 text-white bg-[#383a3c] border border-white/20 rounded-[10px] focus:outline-none focus:border-accent-teal transition-colors"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="subject" className="block text-white text-sm font-bold mb-2">Project Type *</label>
              <select
                id="subject"
                name="subject"
                className="w-full py-3 px-4 text-white bg-[#383a3c] border border-white/20 rounded-[10px] focus:outline-none focus:border-accent-teal transition-colors appearance-none"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-dark-gray">Select project type</option>
                <option value="website" className="bg-dark-gray">Website</option>
                <option value="eshop" className="bg-dark-gray">E-shop</option>
                <option value="web-application" className="bg-dark-gray">Web Application</option>
                <option value="digital-marketing" className="bg-dark-gray">Digital Marketing</option>
                <option value="ui-ux-design" className="bg-dark-gray">UI/UX Design</option>
                <option value="custom-development" className="bg-dark-gray">Custom Development</option>
                <option value="other" className="bg-dark-gray">Other</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="budget" className="block text-white text-sm font-bold mb-2">Budget</label>
              <select
                id="budget"
                name="budget"
                className="w-full py-3 px-4 text-white bg-[#383a3c] border border-white/20 rounded-[10px] focus:outline-none focus:border-accent-teal transition-colors appearance-none"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="" className="bg-dark-gray">Select budget</option>
                <option value="under-1000" className="bg-dark-gray">Up to 1 000 €</option>
                <option value="1000-3000" className="bg-dark-gray">1 000 - 3 000 €</option>
                <option value="3000-5000" className="bg-dark-gray">3 000 - 5 000 €</option>
                <option value="5000-10000" className="bg-dark-gray">5 000 - 10 000 €</option>
                <option value="over-10000" className="bg-dark-gray">Over 10 000 €</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="message" className="block text-white text-sm font-bold mb-2">Project Description *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Describe your project, goals and requirements..."
                className="w-full py-3 px-4 text-white bg-[#383a3c] border border-white/20 rounded-[10px] focus:outline-none focus:border-accent-teal transition-colors"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="cf-turnstile mb-6">
              <Turnstile siteKey="0x4AAAAAACGYZibBgl0bkqM2" onSuccess={handleTurnstileVerify} />
            </div>

            {formMessage.text && (
              <div
                className={`form-message mb-4 p-3 rounded text-sm ${formMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {formMessage.text}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full rounded-none uppercase font-bold tracking-wider hover:-translate-y-1 transition-transform duration-300" disabled={loading}>
              <span className="btn-text-container">
                <span className="btn-text btn-text-visible">{loading ? <span className="spinner mr-2"></span> : ''} Send Message</span>
                <span className="btn-text btn-text-hidden">SEND</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
