import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Lightbulb } from 'lucide-react';
import BackgroundShapes from './BackgroundShapes';

const About: React.FC = () => {
  const features = [
    'Professional-grade equipment',
    'Same-day photo delivery',
    'Drone & aerial photography',
    'Virtual tour creation',
    'HDR & twilight photography',
    'Marketing consultation included',
  ];

  const achievements = [
    {
      icon: Award,
      number: '15+',
      label: 'Photography Awards',
      description: 'Recognition for visual excellence'
    },
    {
      icon: Users,
      number: '200+',
      label: 'Agents Served',
      description: 'Real estate professionals helped'
    },
    {
      icon: Lightbulb,
      number: '500+',
      label: 'Properties Shot',
      description: 'Successfully marketed homes'
    },
  ];

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <BackgroundShapes density="light" colorScheme="accent" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="section-title">About Marcos Borges</p>
            <h2 className="heading-lg mb-6">
              Capturing the Soul of Every Property
            </h2>
            <p className="text-lg text-light mb-8 leading-relaxed">
              With over 17 years of experience in real estate photography, I've had the privilege
              of working with top agents and developers across Denmark. My passion lies in
              transforming ordinary spaces into extraordinary visual stories.
            </p>
            <p className="text-light mb-10 leading-relaxed">
              From cozy family homes to luxurious estates, I bring an architectural eye and
              creative vision to every shoot. My goal is simple: help properties sell faster
              by showcasing their unique character and potential through compelling imagery.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-dark font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Portfolio
            </motion.button>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              {/* Main Large Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Top Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Interior Design"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              </motion.div>

              {/* Bottom Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Property Exterior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-dark/20 to-transparent" />
              </motion.div>
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -bottom-6 -left-6 bg-accent rounded-2xl p-6 text-white shadow-2xl z-10"
            >
              <div className="text-4xl font-bold mb-1">17+</div>
              <div className="text-sm opacity-90">Years of Experience</div>
            </motion.div>

            {/* Animated Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                x: [0, 5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-1/2 -left-4 w-16 h-16 bg-dark/10 rounded-full"
            />
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 right-1/4 w-12 h-12 bg-accent/30 rounded-full"
            />
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 pt-16 border-t border-gray-100"
        >
          <div className="text-center mb-16">
            <p className="section-title">My Track Record</p>
            <h3 className="heading-md">Results That Speak for Themselves</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <achievement.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="text-4xl font-bold text-dark mb-2">
                  {achievement.number}
                </div>
                <div className="text-xl font-semibold text-dark mb-2">
                  {achievement.label}
                </div>
                <div className="text-light">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;