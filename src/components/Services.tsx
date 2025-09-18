import React from 'react';
import { motion } from 'framer-motion';
import { Building, Home, Users, MessageCircle, Camera, Eye, ArrowRight } from 'lucide-react';
import { services } from '../data/mockData';
import BackgroundShapes from './BackgroundShapes';

const iconMap = {
  Building,
  Home,
  Users,
  MessageCircle,
  Camera,
  Eye,
};

const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding bg-smoke-light relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <BackgroundShapes density="medium" colorScheme="light" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-title">Photography Services</p>
          <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
            Professional Real Estate Photography Solutions
          </h2>
          <p className="text-lg text-light max-w-2xl mx-auto leading-relaxed">
            From stunning interior shots to breathtaking aerial views, I provide
            comprehensive photography services that make properties irresistible to buyers.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 h-full card-hover">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-light mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-light">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <button className="inline-flex items-center text-accent font-semibold hover:text-dark transition-colors duration-300 group/link">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-dark rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-white rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rounded-full" />
          </div>

          <div className="relative z-10">
            <h3 className="heading-md text-white mb-6">
              Ready to Showcase Your Property?
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how professional photography can transform your listings
              and help your properties sell faster at better prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Get Free Consultation
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;