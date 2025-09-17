import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import type { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Me',
      description: 'Send me an email anytime',
      contact: 'mail@mborges.dk',
      link: 'mailto:mail@mborges.dk',
    },
    {
      icon: Phone,
      title: 'Call Me',
      description: 'Mon-Fri from 9am to 6pm',
      contact: '26 99 88 21',
      link: 'tel:+4526998821',
    },
    {
      icon: MapPin,
      title: 'Service Area',
      description: 'Serving Denmark and Europe',
      contact: 'Denmark & European Markets',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Business Info',
      description: 'CVR registered company',
      contact: 'CVR no.: 29956170',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-smoke-light">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-title">Get In Touch</p>
          <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
            Ready to Capture Your Property's Best Side?
          </h2>
          <p className="text-lg text-light max-w-2xl mx-auto leading-relaxed">
            Let's discuss your photography needs and how I can help showcase
            your property with stunning visuals that sell.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-sm mb-8">Contact Information</h3>

            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">{info.title}</h4>
                    <p className="text-light text-sm mb-2">{info.description}</p>
                    <a
                      href={info.link}
                      className="text-accent font-medium hover:text-dark transition-colors duration-200"
                    >
                      {info.contact}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-dark font-medium">Interactive Map</p>
                  <p className="text-light text-sm">Click to view location</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <h3 className="heading-sm mb-8">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="residential">Residential Photography</option>
                    <option value="commercial">Commercial Photography</option>
                    <option value="drone">Drone/Aerial Photography</option>
                    <option value="virtual-tour">Virtual Tours</option>
                    <option value="consultation">Photography Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your property and photography needs..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : isSubmitted ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;