import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, MapPin, Camera } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'luxury', name: 'Luxury Estates' },
    { id: 'interior', name: 'Interiors' },
    { id: 'aerial', name: 'Aerial Views' }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern Copenhagen Apartment',
      category: 'residential',
      location: 'Copenhagen, Denmark',
      year: '2024',
      description: 'Stunning 3-bedroom apartment with contemporary design and city views.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 25,
      featured: true
    },
    {
      id: 2,
      title: 'Luxury Villa Hellerup',
      category: 'luxury',
      location: 'Hellerup, Denmark',
      year: '2024',
      description: 'Exclusive waterfront villa with private beach access and premium finishes.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 45,
      featured: true
    },
    {
      id: 3,
      title: 'Contemporary Office Complex',
      category: 'commercial',
      location: 'Aarhus, Denmark',
      year: '2023',
      description: 'Modern office building with sustainable design and flexible workspace solutions.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 30,
      featured: false
    },
    {
      id: 4,
      title: 'Scandinavian Interior Design',
      category: 'interior',
      location: 'Odense, Denmark',
      year: '2024',
      description: 'Minimalist interior photography showcasing clean lines and natural materials.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 20,
      featured: false
    },
    {
      id: 5,
      title: 'Aerial Estate Photography',
      category: 'aerial',
      location: 'Jutland, Denmark',
      year: '2023',
      description: 'Comprehensive aerial photography showcasing property boundaries and surroundings.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 15,
      featured: false
    },
    {
      id: 6,
      title: 'Historic Townhouse Renovation',
      category: 'residential',
      location: 'Copenhagen, Denmark',
      year: '2023',
      description: 'Beautiful renovation of 19th-century townhouse blending historic charm with modern amenities.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 35,
      featured: false
    },
    {
      id: 7,
      title: 'Retail Space Photography',
      category: 'commercial',
      location: 'Aalborg, Denmark',
      year: '2024',
      description: 'High-end retail space showcasing brand identity and customer experience.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 18,
      featured: false
    },
    {
      id: 8,
      title: 'Luxury Kitchen Design',
      category: 'interior',
      location: 'Frederiksberg, Denmark',
      year: '2024',
      description: 'Premium kitchen photography highlighting custom cabinetry and high-end appliances.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 12,
      featured: false
    },
    {
      id: 9,
      title: 'Waterfront Penthouse',
      category: 'luxury',
      location: 'Copenhagen, Denmark',
      year: '2023',
      description: 'Exclusive penthouse with panoramic harbor views and luxury amenities.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: 40,
      featured: true
    }
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Professional portfolio showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80" />
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full backdrop-blur-sm animate-float" />
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent/30 rounded-full backdrop-blur-sm" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Portfolio</h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore a curated selection of my recent real estate and architectural photography projects
              across Denmark. Each project showcases the unique character and beauty of different properties.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-accent" />
                <span>500+ Properties Photographed</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Across Denmark</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    item.featured ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {item.category}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white rounded-full p-3">
                        <ExternalLink className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-dark mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.year}</span>
                        </div>
                      </div>
                      <span className="text-accent font-medium">{item.images} images</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-dark mb-2">{selectedImage.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                  </div>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {selectedImage.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-dark">Location</p>
                      <p className="text-gray-600">{selectedImage.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-dark">Year</p>
                      <p className="text-gray-600">{selectedImage.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-dark">Images</p>
                      <p className="text-gray-600">{selectedImage.images} photos</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Ready to Win Your Next Listing?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Show potential sellers how professional photography can make their property irresistible to buyers and sell for top dollar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent text-white px-8 py-4 rounded-lg font-medium hover:bg-accent/90 transition-colors duration-300">
                Schedule Property Shoot
              </button>
              <button className="border-2 border-accent text-accent px-8 py-4 rounded-lg font-medium hover:bg-accent hover:text-white transition-colors duration-300">
                Get Agent Discount
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;