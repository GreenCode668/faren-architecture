import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Home, Building, Plane, Video, Clock, CheckCircle, Star } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 1,
      icon: <Home className="w-8 h-8" />,
      title: 'Residential Photography',
      description: 'Professional interior and exterior photography for homes, apartments, and condominiums.',
      features: ['HDR Photography', 'Twilight Shots', 'Detail Shots', 'Wide-Angle Interiors'],
      price: 'From 2,500 DKK',
      duration: '2-3 hours',
      images: 15
    },
    {
      id: 2,
      icon: <Building className="w-8 h-8" />,
      title: 'Commercial Real Estate',
      description: 'Comprehensive photography for office buildings, retail spaces, and commercial properties.',
      features: ['Architectural Details', 'Business Environment', 'Signage & Branding', 'Accessibility Features'],
      price: 'From 4,500 DKK',
      duration: '3-5 hours',
      images: 25
    },
    {
      id: 3,
      icon: <Plane className="w-8 h-8" />,
      title: 'Aerial & Drone Photography',
      description: 'Stunning aerial perspectives that showcase properties and their surroundings.',
      features: ['4K Video Capability', 'Property Boundaries', 'Neighborhood Context', 'Weather Permitting'],
      price: 'From 2,000 DKK',
      duration: '1-2 hours',
      images: 10
    },
    {
      id: 4,
      icon: <Video className="w-8 h-8" />,
      title: 'Virtual Tours',
      description: '360-degree immersive tours that allow potential buyers to explore properties online.',
      features: ['Interactive Navigation', 'Floor Plan Integration', 'Info Hotspots', 'Mobile Compatible'],
      price: 'From 3,500 DKK',
      duration: '3-4 hours',
      images: 'Virtual'
    },
    {
      id: 5,
      icon: <Camera className="w-8 h-8" />,
      title: 'Luxury Estate Photography',
      subtitle: 'Premium service for high-end properties',
      description: 'Comprehensive photography package for luxury homes and exclusive properties.',
      features: ['Professional Styling Consultation', 'Twilight & Day Shots', 'Aerial Photography', 'Virtual Tour Included'],
      price: 'From 8,500 DKK',
      duration: 'Full day',
      images: 50
    },
    {
      id: 6,
      icon: <Star className="w-8 h-8" />,
      title: 'Rush Service',
      subtitle: '24-48 hour delivery',
      description: 'Fast-track photography service for urgent listings with guaranteed quick delivery.',
      features: ['Priority Scheduling', '24-48h Delivery', 'Same Day Available', 'Premium Edit'],
      price: '+50% surcharge',
      duration: 'Flexible',
      images: 'Varies'
    }
  ];

  const addOns = [
    { name: 'Additional Photos', price: '150 DKK/photo' },
    { name: 'Same Day Delivery', price: '1,000 DKK' },
    { name: 'Property Flyer Design', price: '800 DKK' },
    { name: 'Social Media Package', price: '500 DKK' },
    { name: 'Video Walkthrough', price: '2,500 DKK' },
    { name: 'Floor Plan Creation', price: '1,200 DKK' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Professional Photography Services</h1>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive real estate and architectural photography solutions tailored to your needs.
              Every package includes professional editing and fast delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>24-48h Standard Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Professional Editing Included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Photography Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our range of professional photography services designed to showcase properties at their best.
              All packages include high-resolution images, professional editing, and online gallery delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    {service.icon}
                  </div>
                  {service.subtitle && (
                    <span className="text-xs bg-accent text-white px-3 py-1 rounded-full">
                      {service.subtitle}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Starting Price</span>
                    <span className="font-bold text-accent">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Duration</span>
                    <span className="text-sm text-gray-700">{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Images Included</span>
                    <span className="text-sm text-gray-700">{service.images}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-300">
                  Book This Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Add-On Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Enhance your photography package with these additional services designed to maximize your property's marketing potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-dark">{addon.name}</h3>
                  <span className="text-accent font-bold">{addon.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple, streamlined process from booking to delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Book Online',
                description: 'Choose your service and preferred date through our online booking system.'
              },
              {
                step: '02',
                title: 'Property Prep',
                description: 'We provide a preparation checklist to ensure your property looks its best.'
              },
              {
                step: '03',
                title: 'Photo Session',
                description: 'Professional photography session with all necessary equipment and lighting.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Edited high-resolution images delivered within 24-48 hours via online gallery.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Contact me today to discuss your photography needs and schedule your session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-accent px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                Book Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-accent transition-colors duration-300">
                Get Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;