import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Users, Key, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setPropertyInfo, calculatePrice, nextStep, prevStep } from '../../store/slices/reservationSlice';
import { cn } from '../../utils/cn';
import type { PropertyInfo } from '../../types';

const StepPropertyInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reservationData } = useAppSelector((state) => state.reservation);

  const [propertyInfoState, setPropertyInfoState] = useState<PropertyInfo>({
    caseNumber: '',
    address: {
      street: '',
      postalCode: '',
      city: '',
    },
    area: 0,
    occupancyStatus: 'vacant',
    accessMethod: 'personal',
    accessInstructions: '',
    ...reservationData.propertyInfo,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setPropertyInfoState(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof PropertyInfo] as Record<string, unknown>),
            [child]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    dispatch(setPropertyInfo(propertyInfoState));
    dispatch(calculatePrice());
  }, [propertyInfoState, dispatch]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!propertyInfoState.caseNumber.trim()) {
      newErrors.caseNumber = 'Case number is required';
    }

    if (!propertyInfoState.address.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!propertyInfoState.address.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    if (!propertyInfoState.address.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!propertyInfoState.area || propertyInfoState.area <= 0) {
      newErrors.area = 'Property area must be greater than 0';
    }

    if (propertyInfoState.occupancyStatus === 'vacant' && !propertyInfoState.accessMethod) {
      newErrors.accessMethod = 'Access method is required for vacant properties';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleContinue = () => {
    if (validateForm()) {
      dispatch(nextStep());
    }
  };

  const isLargeProperty = propertyInfoState.area > 300;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark mb-2">Property Information</h2>
          <p className="text-gray-600">Provide details about the property to be photographed</p>
        </div>

        <div className="space-y-6">
          {/* Case Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Number (C&B System ID) *
            </label>
            <div className="relative">
              <input
                type="text"
                value={propertyInfoState.caseNumber}
                onChange={(e) => handleInputChange('caseNumber', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent",
                  errors.caseNumber ? "border-red-500" : "border-gray-300"
                )}
                placeholder="Enter case number for linking to C&B system"
              />
              {errors.caseNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.caseNumber}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Property Address
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                value={propertyInfoState.address.street}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent",
                  errors.street ? "border-red-500" : "border-gray-300"
                )}
                placeholder="Enter street address"
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.street}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  value={propertyInfoState.address.postalCode}
                  onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent",
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="Postal code"
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.postalCode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={propertyInfoState.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent",
                    errors.city ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Property Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Area (m²) *
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={propertyInfoState.area || ''}
                onChange={(e) => handleInputChange('area', parseInt(e.target.value) || 0)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent",
                  errors.area ? "border-red-500" : "border-gray-300"
                )}
                placeholder="Enter property area in square meters"
              />
              {errors.area && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.area}
                </p>
              )}
              {isLargeProperty && (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center text-amber-700">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      Large Property Surcharge: +350 DKK (properties over 300m²)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Occupancy Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occupancy Status *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={cn(
                  "border-2 rounded-lg p-4 cursor-pointer transition-all",
                  propertyInfoState.occupancyStatus === 'occupied'
                    ? "border-accent bg-accent/5"
                    : "border-gray-200 hover:border-accent/50"
                )}
                onClick={() => handleInputChange('occupancyStatus', 'occupied')}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    propertyInfoState.occupancyStatus === 'occupied'
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">Occupied</h4>
                    <p className="text-sm text-gray-600">Property has current tenants/residents</p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "border-2 rounded-lg p-4 cursor-pointer transition-all",
                  propertyInfoState.occupancyStatus === 'vacant'
                    ? "border-accent bg-accent/5"
                    : "border-gray-200 hover:border-accent/50"
                )}
                onClick={() => handleInputChange('occupancyStatus', 'vacant')}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    propertyInfoState.occupancyStatus === 'vacant'
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">Vacant</h4>
                    <p className="text-sm text-gray-600">Property is empty/unoccupied</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Access Information - Only for Vacant Properties */}
          {propertyInfoState.occupancyStatus === 'vacant' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-dark flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Access Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Method *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'personal', label: 'Personal Meeting', description: 'Meet on-site for access' },
                    { value: 'open', label: 'Property is Open', description: 'Property will be unlocked' },
                    { value: 'receive_key', label: 'Receive Key', description: 'Key will be provided' },
                    { value: 'key_box', label: 'Key Box/Lock Box', description: 'Access via key box code' },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="accessMethod"
                        value={method.value}
                        checked={propertyInfoState.accessMethod === method.value}
                        onChange={(e) => handleInputChange('accessMethod', e.target.value)}
                        className="text-accent border-gray-300 focus:ring-accent"
                      />
                      <div>
                        <span className="font-medium text-dark">{method.label}</span>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.accessMethod && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.accessMethod}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Instructions
                </label>
                <textarea
                  value={propertyInfoState.accessInstructions}
                  onChange={(e) => handleInputChange('accessInstructions', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Provide specific instructions for property access (key box location, code, contact info, special requirements, etc.)"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

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
          className="flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StepPropertyInfo;