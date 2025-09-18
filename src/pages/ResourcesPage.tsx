import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, PlayCircle, BookOpen, Camera, Home, Calendar, CheckCircle } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const guides = [
    {
      id: 1,
      title: 'Property Preparation Checklist',
      description: 'Complete guide to preparing your property for a professional photo shoot.',
      type: 'PDF Guide',
      icon: <CheckCircle className="w-6 h-6" />,
      downloadUrl: '#',
      size: '2.1 MB'
    },
    {
      id: 2,
      title: 'Home Staging Tips for Photos',
      description: 'Expert tips on staging your home to look its best in photographs.',
      type: 'PDF Guide',
      icon: <Home className="w-6 h-6" />,
      downloadUrl: '#',
      size: '3.5 MB'
    },
    {
      id: 3,
      title: 'Photography Package Comparison',
      description: 'Detailed comparison of all available photography packages and services.',
      type: 'PDF Brochure',
      icon: <Camera className="w-6 h-6" />,
      downloadUrl: '#',
      size: '1.8 MB'
    },
    {
      id: 4,
      title: 'Virtual Tour Benefits Guide',
      description: 'Learn how virtual tours can increase engagement and sales.',
      type: 'PDF Guide',
      icon: <PlayCircle className="w-6 h-6" />,
      downloadUrl: '#',
      size: '2.7 MB'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Behind the Scenes: Luxury Home Shoot',
      description: 'Watch the complete process of photographing a luxury estate.',
      duration: '8:32',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#'
    },
    {
      id: 2,
      title: 'Property Preparation Walkthrough',
      description: 'Step-by-step guide to preparing your property for photography.',
      duration: '12:15',
      thumbnail: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#'
    },
    {
      id: 3,
      title: 'Virtual Tour Demo',
      description: 'Interactive demonstration of our virtual tour technology.',
      duration: '6:47',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#'
    }
  ];

  const tips = [
    {
      category: 'Interior Preparation',
      items: [
        'Remove personal items and family photos',
        'Declutter all surfaces and countertops',
        'Turn on all lights for bright, welcoming spaces',
        'Open blinds and curtains to maximize natural light',
        'Clean all mirrors and glass surfaces',
        'Arrange furniture to create clear walking paths'
      ]
    },
    {
      category: 'Exterior Preparation',
      items: [
        'Mow lawn and trim bushes',
        'Clean driveways and walkways',
        'Remove garden hoses and tools',
        'Ensure house numbers are visible',
        'Clean windows from the outside',
        'Remove cars from driveway if possible'
      ]
    },
    {
      category: 'Kitchen & Bathrooms',
      items: [
        'Clear all countertops completely',
        'Hide dish soap and cleaning supplies',
        'Replace old towels with fresh, neutral ones',
        'Turn on under-cabinet lighting',
        'Close toilet lids',
        'Remove refrigerator magnets and notes'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical photo shoot take?',
      answer: 'Most residential properties take 2-3 hours, while larger homes or commercial properties may take 3-5 hours. The exact time depends on the size of the property and the package selected.'
    },
    {
      question: 'When will I receive my photos?',
      answer: 'Standard delivery is 24-48 hours after the shoot. Rush delivery (same day or next day) is available for an additional fee.'
    },
    {
      question: 'What happens if the weather is bad for exterior shots?',
      answer: 'We monitor weather conditions closely and will reschedule if necessary. For properties requiring aerial photography, we need clear skies and minimal wind.'
    },
    {
      question: 'Do you provide print-ready images?',
      answer: 'Yes, all images are delivered in high resolution (300 DPI) and are suitable for both web and print use, including brochures and signage.'
    },
    {
      question: 'Can I request specific shots or angles?',
      answer: 'Absolutely! We encourage you to share any specific requirements or highlight features you want to emphasize during our pre-shoot consultation.'
    },
    {
      question: 'What file formats do you provide?',
      answer: 'Images are delivered as high-resolution JPEGs. RAW files or other formats can be provided upon request for an additional fee.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Professional workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80" />
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-32 right-10 w-24 h-24 bg-accent/25 rounded-full backdrop-blur-sm animate-float" />
        <div className="absolute bottom-24 left-16 w-14 h-14 bg-white/15 rounded-full backdrop-blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-accent/20 rounded-full backdrop-blur-sm animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Resources & Guides</h1>
            <p className="text-xl text-gray-300 mb-8">
              Everything you need to know about real estate photography. From preparation guides
              to frequently asked questions, find all the information to make your photo shoot successful.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-accent" />
                <span>Free Downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <PlayCircle className="w-5 h-5 text-accent" />
                <span>Video Tutorials</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>Expert Tips</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Downloadable Guides */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Free Download Guides</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Download our comprehensive guides to help you prepare for your photo shoot and understand our services better.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    {guide.icon}
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {guide.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-dark mb-3">{guide.title}</h3>
                <p className="text-gray-600 mb-6">{guide.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{guide.size}</span>
                  <button className="flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors duration-300">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Video Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Watch behind-the-scenes footage and educational videos to better understand our process and prepare for your shoot.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative group cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PlayCircle className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-dark mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Property Preparation Tips</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these professional tips to ensure your property looks its absolute best during the photo shoot.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tips.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-dark mb-6">{section.category}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our photography services and process.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-dark mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Listings?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join successful agents who use professional photography to win more listings, attract qualified buyers,
              and sell properties faster. Let's discuss your upcoming properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-accent px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                Get Agent Pricing
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-accent transition-colors duration-300">
                Schedule Property Shoot
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;