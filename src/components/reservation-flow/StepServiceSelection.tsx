import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Package, Plane, Eye, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setServicePackage, setServiceOptions, calculatePrice, nextStep, prevStep } from '../../store/slices/reservationSlice';
import { servicePackages, serviceOptions } from '../../data/mockData';
import { cn } from '../../utils/cn';
import type { ServicePackage } from '../../types';

const iconMap = {
  Camera,
  Package,
  Plane,
  Eye,
};

const StepServiceSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reservationData } = useAppSelector((state) => state.reservation);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(reservationData.servicePackage);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>(
    reservationData.selectedOptions as Record<string, boolean>
  );

  useEffect(() => {
    dispatch(calculatePrice());
  }, [selectedPackage, selectedOptions, dispatch]);

  const handlePackageSelect = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    dispatch(setServicePackage(pkg));
  };

  const handleOptionChange = (optionId: string, value: boolean) => {
    const newOptions = { ...selectedOptions, [optionId]: value };
    setSelectedOptions(newOptions);
    dispatch(setServiceOptions(newOptions));
  };

  const handleContinue = () => {
    if (selectedPackage) {
      dispatch(nextStep());
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedPackage?.basePrice || 0;
    let optionsPrice = 0;

    Object.entries(selectedOptions).forEach(([key, value]) => {
      if (value) {
        const option = serviceOptions.find(opt => opt.id === key);
        if (option) {
          optionsPrice += option.price;
        }
      }
    });

    const totalPrice = basePrice + optionsPrice;
    const vatAmount = totalPrice * 0.25;
    return {
      basePrice,
      optionsPrice,
      totalPrice,
      vatAmount,
      finalPrice: totalPrice + vatAmount,
    };
  };

  const priceBreakdown = calculateTotalPrice();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-dark mb-3 font-display">Choose Your Service Package</h2>
        <p className="text-gray-600 text-lg">Select the photography package that best fits your needs</p>
      </motion.div>

      {/* Service Packages */}
      <div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {servicePackages.map((pkg, index) => {
            const IconComponent = iconMap[pkg.icon as keyof typeof iconMap] || Camera;
            const isSelected = selectedPackage?.id === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className={cn(
                  "relative group rounded-2xl p-6 cursor-pointer transition-all duration-500 backdrop-blur-sm",
                  isSelected
                    ? "bg-gradient-to-br from-accent/10 to-orange-50 border-2 border-accent shadow-xl shadow-accent/20"
                    : "bg-white/90 border border-gray-200 hover:border-accent/50 hover:shadow-xl hover:bg-white"
                )}
                onClick={() => handlePackageSelect(pkg)}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}

                <div className="mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
                    isSelected
                      ? "bg-gradient-to-br from-accent to-orange-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 group-hover:bg-accent/10 group-hover:text-accent"
                  )}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-accent transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center space-x-3 text-sm text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="text-center pt-4 border-t border-gray-200">
                  <div className={cn(
                    "text-3xl font-bold mb-1 transition-colors",
                    isSelected ? "text-accent" : "text-dark group-hover:text-accent"
                  )}>
                    {pkg.basePrice.toLocaleString()} DKK
                  </div>
                  <div className="text-sm text-gray-500 font-medium">+ VAT</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Options */}
      {selectedPackage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-dark mb-2">Additional Options</h2>
            <p className="text-gray-600">Enhance your package with optional add-ons</p>
          </div>

          <div className="space-y-4">
            {serviceOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={selectedOptions[option.id] || false}
                    onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                    className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <div>
                    <label htmlFor={option.id} className="font-medium text-dark cursor-pointer">
                      {option.name}
                    </label>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-dark">+{option.price} DKK</span>
                  <span className="text-sm text-gray-500 block">+ VAT</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Price Summary */}
      {selectedPackage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-dark mb-4">Price Summary</h3>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>{selectedPackage.name}</span>
              <span>{priceBreakdown.basePrice.toLocaleString()} DKK</span>
            </div>

            {Object.entries(selectedOptions).map(([key, value]) => {
              if (!value) return null;
              const option = serviceOptions.find(opt => opt.id === key);
              if (!option) return null;

              return (
                <div key={key} className="flex justify-between text-gray-600">
                  <span>{option.name}</span>
                  <span>+{option.price} DKK</span>
                </div>
              );
            })}

            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{priceBreakdown.totalPrice.toLocaleString()} DKK</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (25%)</span>
                <span>{priceBreakdown.vatAmount.toLocaleString()} DKK</span>
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold text-dark">
                <span>Total</span>
                <span>{priceBreakdown.finalPrice.toLocaleString()} DKK</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={() => dispatch(prevStep())}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedPackage}
          className={cn(
            "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all",
            selectedPackage
              ? "bg-accent text-white hover:bg-accent/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StepServiceSelection;