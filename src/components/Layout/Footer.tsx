import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onSectionChange?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onSectionChange }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'About Us', section: 'home' },
    { name: 'Privacy Policy', section: 'privacy' },
    { name: 'Terms & Conditions', section: 'terms' },
    { name: 'Customer Support', section: 'contact' },
    { name: 'Careers', section: 'careers' },
    { name: 'Blog', section: 'blog' },
  ];

  const services = [
    { name: 'Home Loans', section: 'loans' },
    { name: 'Personal Loans', section: 'loans' },
    { name: 'Business Loans', section: 'loans' },
    { name: 'Education Loans', section: 'loans' },
    { name: 'Life Insurance', section: 'insurance' },
    { name: 'Health Insurance', section: 'insurance' },
    { name: 'Mutual Funds', section: 'mutual-funds' },
  ];

  const handleLinkClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">SR</span>
              </div>
              <span className="text-2xl font-bold">SR Associates</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted financial partner in Guntur, Andhra Pradesh. We provide comprehensive financial solutions including loans, insurance, and investment services with personalized guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(service.section)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.section)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="w-4 h-4 mr-3 text-red-400" />
                <span>+91 96529 37356</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="w-4 h-4 mr-3 text-red-400" />
                <span>+91 93987 29870</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="w-4 h-4 mr-3 text-red-400" />
                <span>info@srassociates.com</span>
              </div>
              <div className="flex items-start text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 text-red-400 flex-shrink-0" />
                <span>OPP. ITC, Srinivasaraopeta, Guntur - 522 004 AP</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Office Hours</h4>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} SR Associates. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => handleLinkClick('privacy')} className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleLinkClick('terms')} className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </button>
              <button onClick={() => handleLinkClick('cookies')} className="text-gray-300 hover:text-white text-sm transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;