import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, UserPlus, LogIn, Sun, Moon, Globe, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../data/mockData';
import { cn } from '../utils/cn';
import { useAuth } from '../contexts/AuthContext';
import Auth from './Auth';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

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

  const isActivePath = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname === href) return true;
    return false;
  };

  const handleRegistration = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  const handleSignup = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Dark mode toggled:', !isDarkMode);
  };

  const toggleLanguage = () => {
    const languages = ['EN', 'ES', 'FR', 'DE'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
    console.log('Language changed to:', languages[nextIndex]);
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
            <Link to="/">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📸</span>
                </div>
                <span className={cn(
                  'text-2xl font-display font-bold transition-colors duration-300',
                  isScrolled ? 'text-dark' : 'text-white'
                )}>
                  Marcos Borges
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href.startsWith('#') ? (
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
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center space-x-1 py-2 px-4 rounded-full transition-all duration-300 font-medium',
                        isActivePath(item.href)
                          ? 'text-accent bg-accent/10'
                          : isScrolled
                          ? 'text-dark hover:text-accent hover:bg-accent/10'
                          : 'text-white hover:text-accent hover:bg-white/10'
                      )}
                    >
                      <span>{item.label}</span>
                      {item.children && (
                        <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                      )}
                    </Link>
                  )}

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
                          child.href.startsWith('#') ? (
                            <button
                              key={child.label}
                              onClick={() => handleNavClick(child.href)}
                              className="w-full text-left px-4 py-3 text-dark hover:text-accent hover:bg-accent/5 transition-colors duration-200"
                            >
                              {child.label}
                            </button>
                          ) : (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-4 py-3 text-dark hover:text-accent hover:bg-accent/5 transition-colors duration-200"
                            >
                              {child.label}
                            </Link>
                          )
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-accent/10">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm">
                      <p className={cn("font-medium", isScrolled ? "text-dark" : "text-white")}>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className={cn("text-xs", isScrolled ? "text-gray-600" : "text-white/80")}>
                        {user?.companyName}
                      </p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <motion.button
                    onClick={logout}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'p-2 rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white',
                      isScrolled
                        ? 'text-dark hover:bg-red-500'
                        : 'text-white hover:bg-red-500'
                    )}
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <>
                  {/* Registration Button */}
                  <motion.button
                    onClick={handleRegistration}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'p-2 rounded-lg transition-all duration-300 hover:bg-accent hover:text-white',
                      isScrolled
                        ? 'text-dark hover:bg-accent'
                        : 'text-white hover:bg-accent'
                    )}
                    title="Register"
                  >
                    <UserPlus className="w-5 h-5" />
                  </motion.button>

                  {/* Signup Button */}
                  <motion.button
                    onClick={handleSignup}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'p-2 rounded-lg transition-all duration-300 hover:bg-accent hover:text-white',
                      isScrolled
                        ? 'text-dark hover:bg-accent'
                        : 'text-white hover:bg-accent'
                    )}
                    title="Sign Up"
                  >
                    <LogIn className="w-5 h-5" />
                  </motion.button>
                </>
              )}

              {/* Dark/Light Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'p-2 rounded-lg transition-all duration-300 hover:bg-accent hover:text-white',
                  isScrolled
                    ? 'text-dark hover:bg-accent'
                    : 'text-white hover:bg-accent'
                )}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Language Selection */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'p-2 rounded-lg transition-all duration-300 hover:bg-accent hover:text-white flex items-center space-x-1',
                  isScrolled
                    ? 'text-dark hover:bg-accent'
                    : 'text-white hover:bg-accent'
                )}
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-medium">{currentLanguage}</span>
              </motion.button>
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
                      <span className="text-white font-bold">📸</span>
                    </div>
                    <span className="text-xl font-display font-bold text-dark">
                      Marcos Borges
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
                      {item.href.startsWith('#') || item.children ? (
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
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "w-full flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200",
                            isActivePath(item.href)
                              ? "text-accent bg-accent/5"
                              : "text-dark hover:text-accent hover:bg-accent/5"
                          )}
                        >
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      )}

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
                                child.href.startsWith('#') ? (
                                  <button
                                    key={child.label}
                                    onClick={() => handleNavClick(child.href)}
                                    className="w-full text-left py-2 px-4 text-light hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-200"
                                  >
                                    {child.label}
                                  </button>
                                ) : (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 px-4 text-light hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-200"
                                  >
                                    {child.label}
                                  </Link>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Registration Button */}
                    <motion.button
                      onClick={handleRegistration}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="text-sm font-medium">Register</span>
                    </motion.button>

                    {/* Signup Button */}
                    <motion.button
                      onClick={handleSignup}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign Up</span>
                    </motion.button>

                    {/* Dark/Light Mode Toggle */}
                    <motion.button
                      onClick={toggleDarkMode}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      <span className="text-sm font-medium">
                        {isDarkMode ? 'Light' : 'Dark'}
                      </span>
                    </motion.button>

                    {/* Language Selection */}
                    <motion.button
                      onClick={toggleLanguage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">{currentLanguage}</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <Auth
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
};

export default Header;