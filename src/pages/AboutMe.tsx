import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, MapPin, Mail, Phone, Calendar } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-white mb-6">About Marcos Borges</h1>
              <p className="text-xl text-gray-300 mb-8">
                Professional photographer specializing in real estate, architecture, and commercial photography.
                Based in Denmark, serving clients across Europe.
              </p>
              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>Denmark</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>8+ Years Experience</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gray-700 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Marcos Borges"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-dark mb-6">My Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                With over 8 years of experience in professional photography, I've developed a keen eye for capturing
                the essence of architectural spaces and real estate properties. My journey began with a passion for
                visual storytelling and has evolved into a specialized practice serving real estate professionals,
                architects, and property developers across Denmark and Europe.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-dark mb-4">Professional Approach</h3>
                <p className="text-gray-600 mb-6">
                  Every project begins with understanding the unique character of each property. I combine technical
                  expertise with creative vision to produce images that not only showcase spaces beautifully but also
                  help properties sell faster and at better prices.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Detailed pre-shoot consultation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Professional lighting setup</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Fast turnaround time</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-dark mb-4">Specializations</h3>
                <p className="text-gray-600 mb-6">
                  My expertise spans various types of architectural and real estate photography, always focusing on
                  delivering images that exceed client expectations and help achieve their marketing goals.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Luxury residential properties</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Commercial real estate</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Architectural documentation</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Awards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Experience & Recognition</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">500+</h3>
              <p className="text-gray-600">Properties Photographed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">8+</h3>
              <p className="text-gray-600">Years Experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">50+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-dark mb-8">Let's Work Together</h2>
              <p className="text-lg text-gray-600 mb-12">
                Ready to showcase your property with professional photography? Get in touch to discuss your project.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Email</h3>
                  <p className="text-gray-600">mail@mborges.dk</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Phone</h3>
                  <p className="text-gray-600">26 99 88 21</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">CVR</h3>
                  <p className="text-gray-600">29956170</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;