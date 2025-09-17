import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, MapPin, Square } from 'lucide-react';
import { projects } from '../data/mockData';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['All', 'Architecture', 'Interior Design', 'Commercial', 'Residential', 'Hospitality'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-title">Our Portfolio</p>
          <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
            Discover Our Latest Architectural Masterpieces
          </h2>
          <p className="text-lg text-light max-w-2xl mx-auto leading-relaxed">
            Explore our diverse portfolio of projects that showcase innovation,
            sustainability, and exceptional design craftsmanship.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-accent text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-light hover:bg-gray-200 hover:text-dark'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg card-hover">
                  {/* Project Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <ExternalLink className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-light mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-light">
                        <Calendar className="w-4 h-4 mr-2 text-accent" />
                        {project.year}
                      </div>
                      <div className="flex items-center text-light">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-light">
                        <Square className="w-4 h-4 mr-2 text-accent" />
                        {project.size}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="btn-outline">
            Load More Projects
          </button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Image */}
                    <div className="relative h-64 md:h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                      >
                        ×
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 overflow-y-auto">
                      <div className="mb-4">
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="heading-sm mb-4">{project.title}</h3>
                      <p className="text-light mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-3 text-accent" />
                          <span className="font-medium">Year:</span>
                          <span className="ml-2 text-light">{project.year}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-3 text-accent" />
                          <span className="font-medium">Location:</span>
                          <span className="ml-2 text-light">{project.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-5 h-5 mr-3 text-accent" />
                          <span className="font-medium">Size:</span>
                          <span className="ml-2 text-light">{project.size}</span>
                        </div>
                      </div>

                      <button className="btn-primary w-full">
                        View Full Project
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;