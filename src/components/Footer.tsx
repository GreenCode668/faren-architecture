import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { label: 'Residential Photography', href: '#services' },
      { label: 'Commercial Photography', href: '#services' },
      { label: 'Drone Photography', href: '#services' },
      { label: 'Virtual Tours', href: '#services' },
    ],
    company: [
      { label: 'About Marcos', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '#contact' },
    ],
    resources: [
      { label: 'Photography Tips', href: '#blog' },
      { label: 'Pricing Guide', href: '#pricing' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📸</span>
                </div>
                <span className="text-2xl font-display font-bold">Marcos Borges</span>
              </div>

              <p className="text-white/70 mb-6 leading-relaxed">
                Professional real estate photography that transforms properties into
                compelling visual stories, helping agents sell faster and buyers fall in love.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-white/70">mail@mborges.dk</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-white/70">26 99 88 21</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-accent mt-1" />
                  <span className="text-white/70">
                    Denmark & European Markets<br />
                    CVR no.: 29956170
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-4">Stay Updated</h4>
                <p className="text-white/70 text-sm mb-4">
                  Subscribe to our newsletter for design insights and project updates.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:border-accent text-white placeholder-white/50"
                  />
                  <button className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-r-lg transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-white/70 text-sm"
              >
                © {currentYear} Marcos Borges. All rights reserved.
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white hover:bg-accent/90 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;