import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import BackgroundShapes from './BackgroundShapes';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Sell Properties 40% Faster',
      subtitle: 'Professional Real Estate Photography',
      description: 'Transform your listings with stunning photography that captures buyers\' attention and drives faster sales. Professional images proven to increase viewing requests and reduce time on market.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '500+', years: '8+', clients: '50+' }
    },
    {
      id: 2,
      title: 'Luxury Listings That Stand Out',
      subtitle: 'Premium Interior Photography',
      description: 'Showcase high-end properties with magazine-quality interior photography. Every room photographed to highlight luxury features and create emotional connection with potential buyers.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '500+', years: '8+', clients: '50+' }
    },
    {
      id: 3,
      title: 'Maximum Curb Appeal',
      subtitle: 'Exterior & Drone Photography',
      description: 'Make powerful first impressions with professional exterior and aerial photography. Show property boundaries, neighborhood context, and stunning perspectives that online listings demand.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '500+', years: '8+', clients: '50+' }
    },
    {
      id: 4,
      title: 'Virtual Tours That Convert',
      subtitle: '360° Interactive Experiences',
      description: 'Give serious buyers the immersive experience they want. Virtual tours increase engagement by 87% and help qualify leads before showings, saving you valuable time.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '500+', years: '8+', clients: '50+' }
    },
    {
      id: 5,
      title: '24-Hour Turnaround Guarantee',
      subtitle: 'Fast, Reliable Service',
      description: 'Get your listings online faster with guaranteed 24-48 hour delivery. Professional editing, multiple formats, and everything you need to market properties immediately.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '500+', years: '8+', clients: '50+' }
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      ))}


      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-4xl">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className={`${index === currentSlide ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.p
                  className="section-title text-accent mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>

                <motion.h1
                  className="heading-xl text-white mb-6 text-balance"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  className="text-lg text-white/90 mb-12 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <button className="btn-primary group">
                    Book Your Property Shoot
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  <button className="inline-flex items-center justify-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 group">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    See Sample Work
                  </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-8 max-w-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {slide.stats.projects}
                    </div>
                    <div className="text-white/70 text-sm">Properties Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {slide.stats.years}
                    </div>
                    <div className="text-white/70 text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {slide.stats.clients}
                    </div>
                    <div className="text-white/70 text-sm">Agent Partners</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-accent scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white hover:text-accent transition-colors duration-300"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.button>

      {/* Enhanced Decorative Elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-20 h-20 bg-accent/20 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
        animate={{
          y: [0, 10, 0],
          x: [0, 5, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent/30 rounded-full backdrop-blur-sm shadow-lg"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute top-20 left-1/3 w-8 h-8 bg-white/15 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, -8, 0],
          x: [0, 8, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 right-1/3 w-14 h-14 bg-accent/25 rounded-full backdrop-blur-sm border border-accent/30"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
      />
    </section>
  );
};

export default Hero;