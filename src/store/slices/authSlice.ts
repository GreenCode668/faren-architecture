import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User, BrokerRegistrationForm } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks for auth operations
export const login = createAsyncThunk(
  'auth/login',
  async ({ email }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login - in real app, this would come from API
      const userData: User = {
        id: 'user_123',
        email,
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'ABC Realty Group',
        brokerLicense: 'BRE# 12345678',
        isVerified: true,
        createdAt: new Date(),
      };

      // Store in localStorage
      localStorage.setItem('broker_user', JSON.stringify(userData));

      return userData;
    } catch {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: BrokerRegistrationForm, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In real app, this would create account and require verification
      console.log('Registration data:', userData);

      return userData;
    } catch {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (code: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful verification
      console.log('OTP verified:', code);

      return code;
    } catch {
      return rejectWithValue('Invalid verification code.');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem('broker_user');
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
      return null;
    } catch {
      localStorage.removeItem('broker_user');
      return rejectWithValue('Failed to restore session');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('broker_user');
    },

    clearError: (state) => {
      state.error = null;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
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
        state.user = action.payload;
        state.isAuthenticated = true;
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
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
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
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoading = false;
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
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;