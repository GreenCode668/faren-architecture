import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { nextStep } from '../../store/slices/reservationSlice';
import { cn } from '../../utils/cn';

const StepAuth: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(nextStep());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email: loginForm.email, password: loginForm.password })).unwrap();
      // nextStep will be called via useEffect when isAuthenticated changes
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-dark mb-2">Welcome Back</h2>
        <p className="text-gray-600">
          Sign in to continue with your reservation
        </p>
        <p className="text-sm text-gray-500 mt-2">
          New user? Please <span className="text-accent font-medium">register using the header menu</span> first
        </p>
      </div>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={loginForm.rememberMe}
              onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
              className="rounded border-gray-300 text-accent focus:ring-accent"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-accent hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all",
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-accent text-white hover:bg-accent/90"
          )}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default StepAuth;