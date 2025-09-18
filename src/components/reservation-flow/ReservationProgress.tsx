import React from 'react';
import { motion } from 'framer-motion';
import { Check, Camera, MapPin, FileText } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { cn } from '../../utils/cn';

const ReservationProgress: React.FC = () => {
  const { steps } = useAppSelector((state) => state.reservation);

  const getIcon = (stepId: number, completed: boolean) => {
    if (completed) return <Check className="w-5 h-5" />;

    switch(stepId) {
      case 1:
        return <Camera className="w-5 h-5" />;
      case 2:
        return <MapPin className="w-5 h-5" />;
      case 3:
        return <FileText className="w-5 h-5" />;
      default:
        return <span>{stepId}</span>;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative">
              {/* Glow effect for active step */}
              {step.active && (
                <motion.div
                  className="absolute inset-0 w-16 h-16 -top-3 bg-accent/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              <motion.div
                className={cn(
                  "relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 shadow-lg",
                  step.completed
                    ? "bg-gradient-to-br from-accent to-orange-500 text-white border-2 border-white"
                    : step.active
                    ? "bg-white border-2 border-accent text-accent shadow-accent/20 shadow-xl"
                    : "bg-gray-100 border-2 border-gray-300 text-gray-400"
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: step.active ? 1.1 : 1,
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ scale: 1.15 }}
              >
                {getIcon(step.id, step.completed)}
              </motion.div>

              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide transition-all duration-300",
                    step.active
                      ? "text-accent"
                      : step.completed
                      ? "text-dark"
                      : "text-gray-400"
                  )}
                >
                  Step {step.id}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium mt-1 transition-all duration-300",
                    step.active
                      ? "text-dark font-bold"
                      : step.completed
                      ? "text-gray-700"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
              </motion.div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 relative mx-4" style={{ minWidth: '60px' }}>
                {/* Background line */}
                <div className="absolute top-0 w-full h-0.5 bg-gray-200" />

                {/* Animated progress line */}
                <motion.div
                  className="absolute top-0 h-0.5 bg-gradient-to-r from-accent to-orange-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: step.completed ? "100%" : "0%"
                  }}
                  transition={{
                    duration: 0.5,
                    delay: step.completed ? index * 0.2 : 0,
                    ease: "easeInOut"
                  }}
                />

                {/* Animated dots for active transition */}
                {step.completed && !steps[index + 1].completed && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"
                    animate={{
                      x: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationProgress;