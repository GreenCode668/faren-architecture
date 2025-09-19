import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and notifications
api.interceptors.response.use(
  (response) => {
    const data = response.data;

    // Handle SweetAlert responses
    if (data.sweetAlert) {
      Swal.fire({
        ...data.sweetAlert,
        confirmButtonColor: '#FF833B',
      });
    }

    // Handle toast notifications
    if (data.toast) {
      const { type, message, duration } = data.toast;

      switch (type) {
        case 'success':
          toast.success(message, { duration });
          break;
        case 'error':
          toast.error(message, { duration });
          break;
        case 'warning':
          toast(message, {
            icon: '⚠️',
            duration,
            style: {
              background: '#FEF3C7',
              color: '#92400E',
            },
          });
          break;
        case 'info':
          toast(message, {
            icon: 'ℹ️',
            duration,
            style: {
              background: '#DBEAFE',
              color: '#1E40AF',
            },
          });
          break;
        default:
          toast(message, { duration });
      }
    }

    return response;
  },
  (error) => {
    console.error('API Error:', error);

    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle specific status codes
    switch (status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
        break;

      case 429:
        // Rate limit exceeded
        toast.error('Too many requests. Please slow down.');
        break;

      case 500:
        // Server error
        toast.error('Server error. Please try again later.');
        break;

      default:
        // Handle backend notification responses
        if (data?.sweetAlert) {
          Swal.fire({
            ...data.sweetAlert,
            confirmButtonColor: '#FF833B',
          });
        } else if (data?.toast) {
          const { type, message, duration } = data.toast;
          toast.error(message, { duration });
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error('An unexpected error occurred');
        }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    verifyOTP: '/auth/verify-otp',
    resendOTP: '/auth/resend-otp',
    profile: '/auth/profile',
    status: '/auth/status',
  },
  reservations: {
    create: '/reservations',
    list: '/reservations',
    get: (id: string) => `/reservations/${id}`,
    update: (id: string) => `/reservations/${id}`,
    delete: (id: string) => `/reservations/${id}`,
  },
  services: {
    packages: '/services/packages',
    options: '/services/options',
  },
};

export default api;