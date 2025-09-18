import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, UserPlus, LogIn, Globe, LogOut, User, Camera, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../data/mockData';
import { cn } from '../utils/cn';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import Auth from './Auth';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
            <Link to="/" className="flex-shrink-0">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Logo Image */}
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center overflow-hidden shadow-lg">
                    <img
                      src="/images/logo.webp"
                      alt="Marcos Borges Photography"
                      className="w-8 h-8 md:w-10 md:h-10 object-contain filter brightness-0 invert"
                    />
                  </div>
                  {/* Accent dot */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-accent shadow-sm" />
                </div>

                {/* Text Logo */}
                <div className="flex flex-col">
                  <span className={cn(
                    'text-lg md:text-xl lg:text-2xl font-display font-bold transition-colors duration-300 leading-tight',
                    isScrolled ? 'text-dark' : 'text-white'
                  )}>
                    Marcos Borges
                  </span>
                  <span className={cn(
                    'text-xs md:text-sm font-sans font-medium transition-colors duration-300 tracking-wider uppercase',
                    isScrolled ? 'text-light' : 'text-white/80'
                  )}>
                    Photography
                  </span>
                </div>
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

            {/* Reservation Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/reservation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2',
                    isActivePath('/reservation')
                      ? 'bg-accent text-white'
                      : isScrolled
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'bg-accent text-white hover:bg-accent/90'
                  )}
                >
                  <Camera className="w-4 h-4" />
                  <span>Book Now</span>
                </motion.button>
              </Link>
            </div>

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
                    onClick={() => dispatch(logout())}
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

              {/* Notification Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'p-2 rounded-lg transition-all duration-300 hover:bg-accent hover:text-white relative',
                  isScrolled
                    ? 'text-dark hover:bg-accent'
                    : 'text-white hover:bg-accent'
                )}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {/* Optional notification badge */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
                        <img
                          src="/images/logo.webp"
                          alt="Marcos Borges Photography"
                          className="w-6 h-6 object-contain filter brightness-0 invert"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-accent" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-display font-bold text-dark leading-tight">
                        Marcos Borges
                      </span>
                      <span className="text-xs font-sans font-medium text-light tracking-wider uppercase">
                        Photography
                      </span>
                    </div>
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

                {/* Mobile Reservation Button */}
                <div className="mt-6">
                  <Link to="/reservation" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg bg-accent text-white font-medium shadow-lg hover:bg-accent/90 transition-all duration-300"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Book Photography Session</span>
                    </motion.button>
                  </Link>
                </div>

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