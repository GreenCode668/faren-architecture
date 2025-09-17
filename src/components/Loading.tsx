import React from 'react';
import { motion } from 'framer-motion';

const Loading: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
    >
      {/* Logo */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center space-x-3 mb-8"
        >
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <span className="text-4xl font-display font-bold text-dark">Faren</span>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-light font-medium tracking-wider">Loading Experience...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading;