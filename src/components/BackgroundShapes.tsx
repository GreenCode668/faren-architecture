import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundShapesProps {
  density?: 'light' | 'medium' | 'heavy';
  colorScheme?: 'light' | 'dark' | 'accent';
}

const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  density = 'medium',
  colorScheme = 'light'
}) => {
  const shapeCount = density === 'light' ? 8 : density === 'medium' ? 12 : 16;

  const getShapeColor = (index: number) => {
    switch (colorScheme) {
      case 'dark':
        return index % 3 === 0 ? 'bg-white/5' : index % 3 === 1 ? 'bg-white/3' : 'bg-white/7';
      case 'accent':
        return index % 3 === 0 ? 'bg-accent/10' : index % 3 === 1 ? 'bg-accent/5' : 'bg-accent/15';
      default:
        return index % 3 === 0 ? 'bg-gray-200/30' : index % 3 === 1 ? 'bg-gray-100/40' : 'bg-gray-300/20';
    }
  };

  const generateShapes = () => {
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
      const size = Math.random() * 200 + 50; // 50px to 250px
      const top = Math.random() * 100; // 0% to 100%
      const left = Math.random() * 100; // 0% to 100%
      const animationDelay = Math.random() * 10; // 0s to 10s
      const animationDuration = Math.random() * 20 + 15; // 15s to 35s

      shapes.push(
        <motion.div
          key={i}
          className={`absolute rounded-full ${getShapeColor(i)}`}
          style={{
            width: size,
            height: size,
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: animationDelay,
          }}
        />
      );
    }

    return shapes;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {generateShapes()}

      {/* Additional fixed decorative elements */}
      <motion.div
        className={`absolute w-32 h-32 rounded-full ${colorScheme === 'dark' ? 'bg-white/10' : colorScheme === 'accent' ? 'bg-accent/20' : 'bg-gray-200/50'}`}
        style={{ top: '10%', right: '15%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute w-24 h-24 rounded-full ${colorScheme === 'dark' ? 'bg-white/5' : colorScheme === 'accent' ? 'bg-accent/15' : 'bg-gray-300/40'}`}
        style={{ bottom: '20%', left: '10%' }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className={`absolute w-16 h-16 rounded-full ${colorScheme === 'dark' ? 'bg-white/8' : colorScheme === 'accent' ? 'bg-accent/25' : 'bg-gray-100/60'}`}
        style={{ top: '60%', right: '25%' }}
        animate={{
          x: [0, 15, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className={`absolute w-20 h-20 rounded-full ${colorScheme === 'dark' ? 'bg-white/6' : colorScheme === 'accent' ? 'bg-accent/12' : 'bg-gray-200/35'}`}
        style={{ top: '30%', left: '5%' }}
        animate={{
          rotate: [0, -180, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default BackgroundShapes;