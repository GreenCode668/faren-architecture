import api, { endpoints } from '../config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  brokerLicense: string;
  licenseState?: string;
  verificationMethod: 'email' | 'sms';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

export interface Broker {
  id: string;
  companyName: string;
  brokerLicense: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    broker: Broker;
    token?: string;
    needsVerification?: boolean;
  };
  error?: string;
}

class AuthService {
  private tokenKey = 'auth_token';
  private userDataKey = 'user_data';

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post(endpoints.auth.register, data);

      if (response.data.success && response.data.data.needsVerification) {
        // Store user data for verification process
        localStorage.setItem(this.userDataKey, JSON.stringify(response.data.data));
      }

      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        success: false,
        message: 'Registration failed',
        error: 'Network error'
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post(endpoints.auth.login, credentials);

      if (response.data.success && response.data.data.token) {
        // Store token and user data
        localStorage.setItem(this.tokenKey, response.data.data.token);
        localStorage.setItem(this.userDataKey, JSON.stringify({
          user: response.data.data.user,
          broker: response.data.data.broker
        }));
      }

      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        success: false,
        message: 'Login failed',
        error: 'Network error'
      };
    }
  }

  async verifyOTP(code: string): Promise<AuthResponse> {
    try {
      const response = await api.post(endpoints.auth.verifyOTP, { code });

      if (response.data.success) {
        // Update stored user data with verified status
        const storedData = this.getStoredUserData();
        if (storedData) {
          storedData.user.isVerified = true;
          localStorage.setItem(this.userDataKey, JSON.stringify(storedData));
        }
      }

      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        success: false,
        message: 'Verification failed',
        error: 'Network error'
      };
    }
  }

  async resendOTP(type: 'email' | 'sms'): Promise<AuthResponse> {
    try {
      const response = await api.post(endpoints.auth.resendOTP, { type });
      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        success: false,
        message: 'Failed to resend code',
        error: 'Network error'
      };
    }
  }

  async getProfile(): Promise<AuthResponse> {
    try {
      const response = await api.get(endpoints.auth.profile);

      if (response.data.success) {
        // Update stored user data
        localStorage.setItem(this.userDataKey, JSON.stringify({
          user: response.data.data.user,
          broker: response.data.data.broker
        }));
      }

      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        success: false,
        message: 'Failed to get profile',
        error: 'Network error'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(endpoints.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      this.clearAuthData();
    }
  }

  async checkAuthStatus(): Promise<AuthResponse | null> {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const response = await api.get(endpoints.auth.status);

      if (response.data.success && response.data.data.authenticated) {
        // Update stored user data
        localStorage.setItem(this.userDataKey, JSON.stringify({
          user: response.data.data.user,
          broker: response.data.data.broker
        }));

        return response.data;
      } else {
        this.clearAuthData();
        return null;
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      this.clearAuthData();
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getStoredUserData(): { user: User; broker: Broker } | null {
    const data = localStorage.getItem(this.userDataKey);
    return data ? JSON.parse(data) : null;
  }

  clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDataKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isVerified(): boolean {
    const userData = this.getStoredUserData();
    return userData?.user?.isVerified || false;
  }
}

export default new AuthService();