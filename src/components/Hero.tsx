import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Modern Architecture for Tomorrow',
      subtitle: 'Creating spaces that inspire',
      description: 'We design innovative architectural solutions that blend functionality with aesthetic excellence, transforming your vision into reality.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '150+', years: '12+', awards: '25+' }
    },
    {
      id: 2,
      title: 'Sustainable Design Solutions',
      subtitle: 'Building for the future',
      description: 'Our eco-friendly approach ensures that every project contributes to a sustainable future while maintaining exceptional design standards.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '150+', years: '12+', awards: '25+' }
    },
    {
      id: 3,
      title: 'Interior Design Excellence',
      subtitle: 'Spaces that tell stories',
      description: 'Transform your interiors with our thoughtful design approach that balances beauty, comfort, and functionality.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      stats: { projects: '150+', years: '12+', awards: '25+' }
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
                    Explore Projects
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  <button className="inline-flex items-center justify-center px-8 py-4 text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 group">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Watch Video
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
                    <div className="text-white/70 text-sm">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {slide.stats.years}
                    </div>
                    <div className="text-white/70 text-sm">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {slide.stats.awards}
                    </div>
                    <div className="text-white/70 text-sm">Awards</div>
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

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-accent/20 rounded-full animate-float" />
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default Hero;