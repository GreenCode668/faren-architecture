import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit,
  CheckCircle,
  Camera,
  MapPin,
  Home,
  Users,
  Key,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { goToStep, prevStep, resetReservation } from '../../store/slices/reservationSlice';
import { serviceOptions } from '../../data/mockData';
import { cn } from '../../utils/cn';

const StepReservationSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reservationData } = useAppSelector((state) => state.reservation);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEdit = (step: number) => {
    dispatch(goToStep(step));
  };

  const handleSubmitReservation = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real implementation, this would send the order to your backend
      console.log('Order submitted:', reservationData);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewReservation = () => {
    dispatch(resetReservation());
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-dark mb-2">Reservation Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your photography reservation has been successfully submitted. You will receive a confirmation email shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-1">Reservation ID</div>
          <div className="font-mono text-lg font-semibold text-dark">
            RES-{Date.now().toString().slice(-6)}
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-8">
          <p>• We'll contact you within 24 hours to confirm scheduling</p>
          <p>• You'll receive delivery notifications via email and SMS</p>
          <p>• Access your reservation status anytime in your dashboard</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleNewReservation}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Make Another Reservation
          </button>
          <button className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
            View Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  const selectedOptions = Object.entries(reservationData.selectedOptions as Record<string, boolean>)
    .filter(([, value]) => value)
    .map(([key]) => serviceOptions.find(opt => opt.id === key))
    .filter(Boolean);

  const largePropertySurcharge = reservationData.propertyInfo?.area && reservationData.propertyInfo.area > 300 ? 350 : 0;

  return (
    <div className="space-y-8">
      {/* Service Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Camera className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-dark">Selected Service</h3>
          </div>
          <button
            onClick={() => handleEdit(1)}
            className="flex items-center space-x-2 text-accent hover:underline text-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        {reservationData.servicePackage && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-dark mb-1">{reservationData.servicePackage.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{reservationData.servicePackage.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                {reservationData.servicePackage.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-right mt-3 pt-3 border-t">
                <span className="text-lg font-semibold text-dark">
                  {reservationData.servicePackage.basePrice.toLocaleString()} DKK
                </span>
              </div>
            </div>

            {selectedOptions.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-dark">Additional Options:</h5>
                {selectedOptions.map((option) => (
                  <div key={option?.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{option?.name}</span>
                    <span className="font-medium text-dark">+{option?.price} DKK</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Property Information Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-dark">Property Information</h3>
          </div>
          <button
            onClick={() => handleEdit(2)}
            className="flex items-center space-x-2 text-accent hover:underline text-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        {reservationData.propertyInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Case Number</label>
                <p className="font-mono text-dark">{reservationData.propertyInfo.caseNumber}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-dark">
                  {reservationData.propertyInfo.address.street}<br />
                  {reservationData.propertyInfo.address.postalCode} {reservationData.propertyInfo.address.city}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Property Area</label>
                <div className="flex items-center space-x-2">
                  <p className="text-dark">{reservationData.propertyInfo.area} m²</p>
                  {reservationData.propertyInfo.area > 300 && (
                    <div className="flex items-center text-amber-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Large property (+350 DKK)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Occupancy Status</label>
                <div className="flex items-center space-x-2">
                  {reservationData.propertyInfo.occupancyStatus === 'occupied' ? (
                    <Users className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Home className="w-4 h-4 text-gray-600" />
                  )}
                  <p className="text-dark capitalize">{reservationData.propertyInfo.occupancyStatus}</p>
                </div>
              </div>

              {reservationData.propertyInfo.occupancyStatus === 'vacant' && reservationData.propertyInfo.accessMethod && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Access Method</label>
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4 text-green-600" />
                      <p className="text-dark capitalize">
                        {reservationData.propertyInfo.accessMethod.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {reservationData.propertyInfo.accessInstructions && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Access Instructions</label>
                      <p className="text-dark text-sm">{reservationData.propertyInfo.accessInstructions}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-dark mb-4">Reservation Total</h3>

        <div className="space-y-2">
          {reservationData.servicePackage && (
            <div className="flex justify-between text-gray-700">
              <span>{reservationData.servicePackage.name}</span>
              <span>{reservationData.servicePackage.basePrice.toLocaleString()} DKK</span>
            </div>
          )}

          {selectedOptions.map((option) => (
            <div key={option?.id} className="flex justify-between text-gray-600">
              <span>{option?.name}</span>
              <span>+{option?.price} DKK</span>
            </div>
          ))}

          {largePropertySurcharge > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Large Property Surcharge (over 300m²)</span>
              <span>+{largePropertySurcharge} DKK</span>
            </div>
          )}

          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{reservationData.totalPrice.toLocaleString()} DKK</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>VAT (25%)</span>
              <span>{reservationData.vatAmount.toLocaleString()} DKK</span>
            </div>
          </div>

          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-xl font-bold text-dark">
              <span>Total</span>
              <span>{reservationData.finalPrice.toLocaleString()} DKK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-dark mb-4">Terms & Conditions</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <label className="flex items-start">
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 text-accent focus:ring-accent mt-1"
            />
            <span className="ml-2">
              I agree to the <a href="#" className="text-accent hover:underline">Terms of Service</a> and understand that payment is due upon completion of services.
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 text-accent focus:ring-accent mt-1"
            />
            <span className="ml-2">
              I confirm that all property information provided is accurate and I have authorization to reserve photography services for this property.
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-accent focus:ring-accent mt-1"
            />
            <span className="ml-2">
              I would like to receive updates about new services and promotional offers.
            </span>
          </label>
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
          onClick={handleSubmitReservation}
          disabled={isSubmitting}
          className={cn(
            "flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all",
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl"
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Confirm Reservation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepReservationSummary;