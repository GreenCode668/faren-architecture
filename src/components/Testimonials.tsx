import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-dark overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-4">
            Client Testimonials
          </p>
          <h2 className="heading-lg text-white mb-6 max-w-3xl mx-auto">
            Agents Are Closing More Deals
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            See how professional photography has transformed these agents' businesses,
            helping them win more listings and sell properties faster than ever before.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === currentTestimonial ? 1 : 0,
                  x: index === currentTestimonial ? 0 : 100,
                }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 ${
                  index === currentTestimonial ? 'block' : 'hidden'
                }`}
              >
                <div className="max-w-4xl mx-auto text-center">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-8"
                  >
                    <Quote className="w-10 h-10 text-accent" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center mb-8"
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-accent fill-current"
                      />
                    ))}
                  </motion.div>

                  {/* Testimonial Content */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-12 leading-relaxed italic"
                  >
                    "{testimonial.content}"
                  </motion.blockquote>

                  {/* Client Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-accent/30"
                    />
                    <div className="text-center sm:text-left">
                      <div className="text-xl font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-accent font-medium">
                        {testimonial.position}
                      </div>
                      <div className="text-white/70">
                        {testimonial.company}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-accent scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* All Testimonials Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-white/20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  index === currentTestimonial
                    ? 'bg-accent/20 border-accent'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-accent text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent fill-current"
                    />
                  ))}
                </div>

                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default Testimonials;