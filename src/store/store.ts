import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reservationReducer from './slices/reservationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservation: reservationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;