import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';
import StepServiceSelection from '../components/reservation-flow/StepServiceSelection';
import StepPropertyInfo from '../components/reservation-flow/StepPropertyInfo';
import StepReservationSummary from '../components/reservation-flow/StepReservationSummary';
import ReservationProgress from '../components/reservation-flow/ReservationProgress';

const ReservationFlow: React.FC = () => {
  const { currentStep } = useAppSelector((state) => state.reservation);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepServiceSelection />;
      case 2:
        return <StepPropertyInfo />;
      case 3:
        return <StepReservationSummary />;
      default:
        return <StepServiceSelection />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Background Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />


        {/* Hero Content */}
        <div className="relative z-0 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center w-full"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block mb-6"
                >
                  <span className="px-6 py-3 bg-accent/90 text-white rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
                    QUICK & EASY BOOKING
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-6 font-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Reserve Your Photography Session
                </motion.h1>

                <motion.p
                  className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Book professional real estate photography in just 3 simple steps.
                  Get stunning visuals that sell properties faster and attract more buyers.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Background */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative">
        {/* Subtle Background Shapes - Only in content area */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-10 w-60 h-60 bg-blue-300/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/3 w-40 h-40 bg-orange-200/10 rounded-full blur-2xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.08, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 15
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-0 py-16">
          <div className="container mx-auto px-4 max-w-6xl">

            {/* Progress Section with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
                <ReservationProgress />
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-1">
                <div className="bg-white rounded-xl">
                  {renderCurrentStep()}
                </div>
              </div>
            </motion.div>

            {/* Bottom Decoration */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 inline-block">
                <p className="text-sm text-gray-600">
                  Need help? Call us at{' '}
                  <a href="tel:+4512345678" className="text-accent font-semibold hover:underline">
                    +45 12 34 56 78
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Available Mon-Fri, 9:00 AM - 6:00 PM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationFlow;