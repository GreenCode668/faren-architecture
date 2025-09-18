import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, MapPin, Mail, Phone, Calendar } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="./images/About me/About.webp"
            alt="Photographer at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80" />
        </div>


        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-white mb-6">Your Partner for Winning Listings</h1>
              <p className="text-xl text-gray-300 mb-8">
                Trusted by Denmark's top real estate agents to create photography that sells properties faster.
                Over 8 years of experience helping agents win more listings and close deals quicker.
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
                  src="./images/About me/About.webp"
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
              <h2 className="text-4xl font-bold text-dark mb-6">Why Agents Choose Me</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                After 8 years in real estate photography, I understand what sells properties. I've worked with over 50 agents
                to photograph 500+ properties, resulting in faster sales and higher offers. My specialized approach focuses on
                creating images that generate immediate buyer interest and help you stand out in competitive markets.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-dark mb-4">Agent-Focused Service</h3>
                <p className="text-gray-600 mb-6">
                  I understand your business challenges: tight schedules, demanding clients, and competitive markets.
                  My photography service is designed specifically for real estate agents who need reliable, high-quality
                  results that help win listings and sell properties faster.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>24-48 hour guaranteed delivery</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Flexible scheduling for urgent listings</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Marketing-ready image packages</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-dark mb-4">Proven Results</h3>
                <p className="text-gray-600 mb-6">
                  My photography consistently delivers measurable results for agents: increased online engagement,
                  more viewing requests, and faster sales. I track these metrics to continuously improve my service
                  and help you achieve better outcomes for your clients.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>40% faster average sale times</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>67% more online inquiries</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Higher offer values on listings</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Awards */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Minimal Decorative Shapes */}
        <div className="absolute top-20 right-10 w-16 h-16 bg-accent/10 rounded-full" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gray-200/30 rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Track Record & Results</h2>
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
              <h2 className="text-4xl font-bold text-dark mb-8">Ready to Win More Listings?</h2>
              <p className="text-lg text-gray-600 mb-12">
                Join 50+ successful agents who trust me with their property photography. Let's discuss how professional images can transform your listings and accelerate your sales.
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