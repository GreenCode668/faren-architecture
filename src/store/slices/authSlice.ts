import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User, BrokerRegistrationForm } from '../../types';
import authService, { type LoginCredentials, type RegisterData, type Broker } from '../../services/authService';

interface AuthState {
  user: User | null;
  broker: Broker | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  needsVerification: boolean;
}

const initialState: AuthState = {
  user: null,
  broker: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  needsVerification: false,
};

// Async thunks for auth operations
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed. Please check your credentials.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);

      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed. Please try again.');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOTP(code);

      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Invalid verification code.');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.checkAuthStatus();

      if (response?.success && response.data) {
        return response.data;
      }

      // Check for stored data as fallback
      const storedData = authService.getStoredUserData();
      if (storedData && authService.isAuthenticated()) {
        return storedData;
      }

      return null;
    } catch (error) {
      authService.clearAuthData();
      return rejectWithValue('Failed to restore session');
    }
  }
);

export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (type: 'email' | 'sms', { rejectWithValue }) => {
    try {
      const response = await authService.resendOTP(type);

      if (response.success) {
        return { type, sent: true };
      } else {
        return rejectWithValue(response.error || response.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to resend verification code.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.broker = null;
      state.isAuthenticated = false;
      state.needsVerification = false;
      state.error = null;
      authService.clearAuthData();
    },

    clearError: (state) => {
      state.error = null;
    },

    setUser: (state, action: PayloadAction<{ user: User; broker: Broker }>) => {
      state.user = action.payload.user;
      state.broker = action.payload.broker;
      state.isAuthenticated = true;
      state.needsVerification = !action.payload.user.isVerified;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.broker = action.payload.broker;
        state.isAuthenticated = true;
        state.needsVerification = !action.payload.user.isVerified;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.broker = action.payload.broker;
        state.isAuthenticated = false;
        state.needsVerification = action.payload.needsVerification || false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify OTP
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
          state.broker = action.payload.broker;
          state.needsVerification = false;
        }
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.broker = action.payload.broker;
          state.isAuthenticated = true;
          state.needsVerification = !action.payload.user.isVerified;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.broker = null;
        state.isAuthenticated = false;
        state.needsVerification = false;
      })

    // Resend OTP
    builder
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;