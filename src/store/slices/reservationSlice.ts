import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ReservationData, ServicePackage, PropertyInfo, ReservationFlowStep } from '../../types';

interface ReservationState {
  reservationData: ReservationData;
  currentStep: number;
  steps: ReservationFlowStep[];
  isLoading: boolean;
  error: string | null;
}

const VAT_RATE = 0.25; // 25% VAT
const LARGE_PROPERTY_SURCHARGE = 350; // DKK for properties over 300m²
const LARGE_PROPERTY_THRESHOLD = 300; // m²

const initialSteps: ReservationFlowStep[] = [
  { id: 1, title: 'Select Service', completed: false, active: true },
  { id: 2, title: 'Property Information', completed: false, active: false },
  { id: 3, title: 'Reservation Summary', completed: false, active: false },
];

const initialReservationData: ReservationData = {
  servicePackage: null,
  selectedOptions: {},
  propertyInfo: null,
  totalPrice: 0,
  vatAmount: 0,
  finalPrice: 0,
};

const initialState: ReservationState = {
  reservationData: initialReservationData,
  currentStep: 1,
  steps: initialSteps,
  isLoading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setServicePackage: (state, action: PayloadAction<ServicePackage>) => {
      state.reservationData.servicePackage = action.payload;
      state.reservationData.selectedOptions = {}; // Reset options when package changes
      reservationSlice.caseReducers.calculatePrice(state);
    },

    setServiceOptions: (state, action: PayloadAction<Record<string, boolean | string>>) => {
      state.reservationData.selectedOptions = action.payload;
      reservationSlice.caseReducers.calculatePrice(state);
    },

    setPropertyInfo: (state, action: PayloadAction<PropertyInfo>) => {
      state.reservationData.propertyInfo = action.payload;
      reservationSlice.caseReducers.calculatePrice(state);
    },

    calculatePrice: (state) => {
      const basePrice = state.reservationData.servicePackage?.basePrice || 0;

      // Add option prices
      let optionsPrice = 0;
      Object.entries(state.reservationData.selectedOptions).forEach(([key, value]) => {
        if (typeof value === 'boolean' && value) {
          // For boolean options, add predefined prices
          if (key === 'garagePhotos') optionsPrice += 200;
          if (key === 'basementPhotos') optionsPrice += 200;
        }
      });

      // Add large property surcharge
      let surcharge = 0;
      if (state.reservationData.propertyInfo?.area && state.reservationData.propertyInfo.area > LARGE_PROPERTY_THRESHOLD) {
        surcharge = LARGE_PROPERTY_SURCHARGE;
      }

      const totalPrice = basePrice + optionsPrice + surcharge;
      const vatAmount = totalPrice * VAT_RATE;
      const finalPrice = totalPrice + vatAmount;

      state.reservationData.totalPrice = totalPrice;
      state.reservationData.vatAmount = vatAmount;
      state.reservationData.finalPrice = finalPrice;
    },

    nextStep: (state) => {
      const newStep = Math.min(state.currentStep + 1, state.steps.length);
      state.currentStep = newStep;
      reservationSlice.caseReducers.updateSteps(state, { payload: newStep, type: 'updateSteps' });
    },

    prevStep: (state) => {
      const newStep = Math.max(state.currentStep - 1, 1);
      state.currentStep = newStep;
      reservationSlice.caseReducers.updateSteps(state, { payload: newStep, type: 'updateSteps' });
    },

    goToStep: (state, action: PayloadAction<number>) => {
      const newStep = Math.max(1, Math.min(action.payload, state.steps.length));
      state.currentStep = newStep;
      reservationSlice.caseReducers.updateSteps(state, { payload: newStep, type: 'updateSteps' });
    },

    updateSteps: (state, action: PayloadAction<number>) => {
      state.steps = state.steps.map(step => ({
        ...step,
        completed: step.id < action.payload,
        active: step.id === action.payload,
      }));
    },

    resetReservation: (state) => {
      state.reservationData = initialReservationData;
      state.currentStep = 1;
      state.steps = initialSteps;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Load reservation from localStorage (for persistence)
    loadReservation: (state, action: PayloadAction<Partial<ReservationState>>) => {
      if (action.payload.reservationData) {
        state.reservationData = action.payload.reservationData;
      }
      if (action.payload.currentStep) {
        state.currentStep = action.payload.currentStep;
      }
      if (action.payload.steps) {
        state.steps = action.payload.steps;
      }
      reservationSlice.caseReducers.calculatePrice(state);
    },
  },
});

export const {
  setServicePackage,
  setServiceOptions,
  setPropertyInfo,
  calculatePrice,
  nextStep,
  prevStep,
  goToStep,
  resetReservation,
  setLoading,
  setError,
  loadReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;