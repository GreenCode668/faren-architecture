import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems } from '../data/mockData';
import { cn } from '../utils/cn';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className={cn(
                'text-2xl font-display font-bold transition-colors duration-300',
                isScrolled ? 'text-dark' : 'text-white'
              )}>
                Faren
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'flex items-center space-x-1 py-2 px-4 rounded-full transition-all duration-300 font-medium',
                      isScrolled
                        ? 'text-dark hover:text-accent hover:bg-accent/10'
                        : 'text-white hover:text-accent hover:bg-white/10'
                    )}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNavClick(child.href)}
                            className="w-full text-left px-4 py-3 text-dark hover:text-accent hover:bg-accent/5 transition-colors duration-200"
                          >
                            {child.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors duration-300',
                isScrolled
                  ? 'text-dark hover:bg-accent/10'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">F</span>
                    </div>
                    <span className="text-xl font-display font-bold text-dark">
                      Faren
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-dark hover:text-accent transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <button
                        onClick={() => {
                          if (item.children) {
                            setActiveDropdown(
                              activeDropdown === item.label ? null : item.label
                            );
                          } else {
                            handleNavClick(item.href);
                          }
                        }}
                        className="w-full flex items-center justify-between py-3 px-4 text-dark hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-200"
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.children && (
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              activeDropdown === item.label ? 'rotate-180' : ''
                            )}
                          />
                        )}
                      </button>

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {item.children && activeDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1">
                              {item.children.map((child) => (
                                <button
                                  key={child.label}
                                  onClick={() => handleNavClick(child.href)}
                                  className="w-full text-left py-2 px-4 text-light hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-200"
                                >
                                  {child.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="btn-primary w-full"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;