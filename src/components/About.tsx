import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    'Award-winning design team',
    'Sustainable building practices',
    'Client-focused approach',
    'Innovative solutions',
    'Timely project delivery',
    'Post-completion support',
  ];

  const achievements = [
    {
      icon: Award,
      number: '25+',
      label: 'Design Awards',
      description: 'International recognition for excellence'
    },
    {
      icon: Users,
      number: '500+',
      label: 'Happy Clients',
      description: 'Satisfied customers worldwide'
    },
    {
      icon: Lightbulb,
      number: '150+',
      label: 'Projects',
      description: 'Successful completions'
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="section-title">About Faren</p>
            <h2 className="heading-lg mb-6">
              Creating Extraordinary Spaces for Modern Living
            </h2>
            <p className="text-lg text-light mb-8 leading-relaxed">
              With over 12 years of experience in architecture and interior design,
              Faren has been at the forefront of creating innovative, sustainable, and
              beautiful spaces that enhance the way people live and work.
            </p>
            <p className="text-light mb-10 leading-relaxed">
              Our team of passionate architects and designers combines creativity with
              technical expertise to deliver projects that exceed expectations. We believe
              that great design has the power to transform lives and communities.
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
              Learn More About Us
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
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern Architecture"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-accent rounded-2xl p-6 text-white shadow-2xl"
            >
              <div className="text-4xl font-bold mb-1">12+</div>
              <div className="text-sm opacity-90">Years of Experience</div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full animate-float" />
            <div className="absolute top-1/2 -left-4 w-16 h-16 bg-dark/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
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
            <p className="section-title">Our Achievements</p>
            <h3 className="heading-md">Numbers That Speak for Themselves</h3>
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