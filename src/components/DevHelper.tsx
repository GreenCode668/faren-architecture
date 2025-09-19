import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, CreditCard, Key, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import { setServicePackage, setPropertyInfo, setServiceOptions, calculatePrice } from '../store/slices/reservationSlice';
import { servicePackages } from '../data/mockData';

// Only show in development mode
const DevHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Don't render in production
  if (!import.meta.env.DEV) {
    return null;
  }

  const quickLogin = () => {
    dispatch(login({
      email: 'john.doe@example.com',
      password: 'Password123!'
    }));
  };

  const fillReservationForm = () => {
    // Set service package
    dispatch(setServicePackage(servicePackages[1])); // Premium Photography

    // Set service options
    dispatch(setServiceOptions({
      garagePhotos: true,
      basementPhotos: false
    }));

    // Set property info
    dispatch(setPropertyInfo({
      caseNumber: 'RE-2024-001',
      address: {
        street: '123 Main Street, Unit 4B',
        postalCode: '90210',
        city: 'Beverly Hills',
      },
      area: 2500,
      occupancyStatus: 'vacant',
      accessMethod: 'key_box',
      accessInstructions: 'Key box is located on the left side of the front door. Code is 1234. Please reset after use.',
    }));

    // Calculate price
    dispatch(calculatePrice());
  };

  const devActions = [
    {
      name: 'Quick Login',
      description: 'Auto-login with test credentials',
      icon: User,
      action: quickLogin,
      color: 'bg-blue-500',
      disabled: isAuthenticated
    },
    {
      name: 'Fill Reservation',
      description: 'Pre-fill reservation form with test data',
      icon: CreditCard,
      action: fillReservationForm,
      color: 'bg-green-500',
      disabled: false
    }
  ];

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Development Helper"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Helper Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-6"
          >
            <div className="mb-4">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-600" />
                Dev Helper
              </h3>
              <p className="text-sm text-gray-600">Quick actions for development</p>
            </div>

            <div className="space-y-3">
              {devActions.map((action, index) => (
                <motion.button
                  key={action.name}
                  onClick={action.action}
                  disabled={action.disabled}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg text-white font-medium transition-all
                    ${action.disabled
                      ? 'bg-gray-400 cursor-not-allowed opacity-60'
                      : `${action.color} hover:opacity-90 hover:scale-[1.02]`
                    }
                  `}
                  whileHover={!action.disabled ? { scale: 1.02 } : {}}
                  whileTap={!action.disabled ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <action.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.name}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Status Display */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Auth Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  isAuthenticated
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isAuthenticated ? 'Logged In' : 'Guest'}
                </span>
              </div>
            </div>

            {/* Environment Info */}
            <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Development Mode Active</span>
              </div>
              <div className="mt-1">
                API: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevHelper;