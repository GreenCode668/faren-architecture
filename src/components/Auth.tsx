import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login, register, verifyOTP } from '../store/slices/authSlice';
import type { BrokerLoginForm, BrokerRegistrationForm } from '../types';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, mode, onSwitchMode }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState<'form' | 'otp' | 'success'>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loginForm, setLoginForm] = useState<BrokerLoginForm>({
    email: import.meta.env.DEV ? 'john.doe@example.com' : '',
    password: import.meta.env.DEV ? 'Password123!' : '',
    rememberMe: false,
  });

  const [registrationForm, setRegistrationForm] = useState<BrokerRegistrationForm>({
    email: import.meta.env.DEV ? 'jane.smith@realty.com' : '',
    phone: import.meta.env.DEV ? '+1 (555) 123-4567' : '',
    companyName: import.meta.env.DEV ? 'Smith Realty Group' : '',
    brokerLicense: import.meta.env.DEV ? 'BRE#12345678' : '',
    firstName: import.meta.env.DEV ? 'Jane' : '',
    lastName: import.meta.env.DEV ? 'Smith' : '',
    password: import.meta.env.DEV ? 'Password123!' : '',
    confirmPassword: import.meta.env.DEV ? 'Password123!' : '',
    acceptTerms: import.meta.env.DEV ? true : false,
    acceptPrivacy: import.meta.env.DEV ? true : false,
    marketingConsent: import.meta.env.DEV ? true : false,
    verificationMethod: 'email',
  });

  const [otpForm, setOtpForm] = useState({
    code: import.meta.env.DEV ? '123456' : '',
    timeLeft: 300, // 5 minutes
  });

  const validateLoginForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    } else if (loginForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegistrationForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!registrationForm.firstName) newErrors.firstName = 'First name is required';
    if (!registrationForm.lastName) newErrors.lastName = 'Last name is required';
    if (!registrationForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registrationForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!registrationForm.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(registrationForm.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!registrationForm.companyName) newErrors.companyName = 'Company name is required';
    if (!registrationForm.brokerLicense) newErrors.brokerLicense = 'Broker license number is required';

    if (!registrationForm.password) {
      newErrors.password = 'Password is required';
    } else if (registrationForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(registrationForm.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (registrationForm.password !== registrationForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!registrationForm.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms of Service';
    }

    if (!registrationForm.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    try {
      await dispatch(login({ email: loginForm.email, password: loginForm.password })).unwrap();
      onClose();
    } catch {
      setErrors({ general: 'Login failed. Please try again.' });
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegistrationForm()) return;

    try {
      await dispatch(register(registrationForm)).unwrap();
      setCurrentStep('otp');

      // Start OTP countdown
      const countdown = setInterval(() => {
        setOtpForm(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(countdown);
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } catch {
      setErrors({ general: 'Login failed. Please try again.' });
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpForm.code || otpForm.code.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit code' });
      return;
    }

    try {
      await dispatch(verifyOTP(otpForm.code)).unwrap();
      setCurrentStep('success');
    } catch {
      setErrors({ otp: 'Verification failed. Please try again.' });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetForm = () => {
    setCurrentStep('form');
    setErrors({});
    setLoginForm({ email: '', password: '', rememberMe: false });
    setRegistrationForm({
      email: '',
      phone: '',
      companyName: '',
      brokerLicense: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptPrivacy: false,
      marketingConsent: false,
      verificationMethod: 'email',
    });
    setOtpForm({ code: '', timeLeft: 300 });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    resetForm();
    onSwitchMode(newMode);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-accent to-accent/80 p-6">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === 'login' ? 'Broker Login' : 'Broker Registration'}
              </h2>
              <p className="text-white/80 text-sm">
                {mode === 'login'
                  ? 'Access your professional trading account'
                  : 'Join our exclusive broker network'
                }
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {currentStep === 'form' && mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.general}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                      errors.email ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="broker@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={cn(
                        "w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                        errors.password ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium transition-all",
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-accent text-white hover:bg-accent/90 focus:ring-4 focus:ring-accent/20"
                  )}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    New broker?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('register')}
                      className="text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </form>
            )}

            {currentStep === 'form' && mode === 'register' && (
              <form onSubmit={handleRegistration} className="space-y-4 max-h-96 overflow-y-auto">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.general}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={registrationForm.firstName}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, firstName: e.target.value })}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                        errors.firstName ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={registrationForm.lastName}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, lastName: e.target.value })}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                        errors.lastName ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={registrationForm.email}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                      errors.email ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="broker@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={registrationForm.phone}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                      errors.phone ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={registrationForm.companyName}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, companyName: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                      errors.companyName ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="ABC Realty Group"
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Broker License Number *
                  </label>
                  <input
                    type="text"
                    value={registrationForm.brokerLicense}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, brokerLicense: e.target.value })}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                      errors.brokerLicense ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="BRE# 12345678"
                  />
                  {errors.brokerLicense && <p className="text-red-500 text-xs mt-1">{errors.brokerLicense}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registrationForm.password}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, password: e.target.value })}
                      className={cn(
                        "w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                        errors.password ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={registrationForm.confirmPassword}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, confirmPassword: e.target.value })}
                      className={cn(
                        "w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                        errors.confirmPassword ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-3">
                    Verification Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="email"
                        checked={registrationForm.verificationMethod === 'email'}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, verificationMethod: e.target.value as 'email' | 'sms' })}
                        className="w-4 h-4 text-accent"
                      />
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="sms"
                        checked={registrationForm.verificationMethod === 'sms'}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, verificationMethod: e.target.value as 'email' | 'sms' })}
                        className="w-4 h-4 text-accent"
                      />
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">SMS</span>
                    </label>
                  </div>
                </div>

                {/* GDPR Compliance */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-dark">Privacy & Compliance</h4>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={registrationForm.acceptTerms}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, acceptTerms: e.target.checked })}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      I accept the{' '}
                      <a href="#" className="text-accent hover:underline">Terms of Service</a> *
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-red-500 text-xs ml-7">{errors.acceptTerms}</p>}

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={registrationForm.acceptPrivacy}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, acceptPrivacy: e.target.checked })}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      I accept the{' '}
                      <a href="#" className="text-accent hover:underline">Privacy Policy</a> and consent to data processing *
                    </span>
                  </label>
                  {errors.acceptPrivacy && <p className="text-red-500 text-xs ml-7">{errors.acceptPrivacy}</p>}

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={registrationForm.marketingConsent}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, marketingConsent: e.target.checked })}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to receiving marketing communications (optional)
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium transition-all",
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-accent text-white hover:bg-accent/90 focus:ring-4 focus:ring-accent/20"
                  )}
                >
                  {isLoading ? "Creating Account..." : "Create Broker Account"}
                </button>

                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('login')}
                      className="text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}

            {currentStep === 'otp' && (
              <div className="text-center space-y-6">
                <div>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {registrationForm.verificationMethod === 'email' ? (
                      <Mail className="w-8 h-8 text-accent" />
                    ) : (
                      <Phone className="w-8 h-8 text-accent" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-2">Verification Required</h3>
                  <p className="text-gray-600 text-sm">
                    We've sent a 6-digit code to your{' '}
                    {registrationForm.verificationMethod === 'email' ? 'email' : 'phone'}
                  </p>
                </div>

                <form onSubmit={handleOTPVerification} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={otpForm.code}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtpForm({ ...otpForm, code: value });
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all",
                        errors.otp ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="000000"
                      maxLength={6}
                    />
                    {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                  </div>

                  <div className="text-sm text-gray-600">
                    Time remaining: <span className="font-mono font-medium">{formatTime(otpForm.timeLeft)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otpForm.code.length !== 6}
                    className={cn(
                      "w-full py-3 px-4 rounded-lg font-medium transition-all",
                      isLoading || otpForm.code.length !== 6
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-accent text-white hover:bg-accent/90 focus:ring-4 focus:ring-accent/20"
                    )}
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </button>

                  {otpForm.timeLeft > 0 ? (
                    <button
                      type="button"
                      className="w-full text-sm text-gray-500 hover:text-accent transition-colors"
                      disabled
                    >
                      Resend code in {formatTime(otpForm.timeLeft)}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOtpForm({ ...otpForm, timeLeft: 300 })}
                      className="w-full text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      Resend verification code
                    </button>
                  )}
                </form>
              </div>
            )}

            {currentStep === 'success' && (
              <div className="text-center space-y-6">
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-2">Account Verified!</h3>
                  <p className="text-gray-600 text-sm">
                    Your broker account has been successfully created and verified.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all"
                >
                  Continue to Orders
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;