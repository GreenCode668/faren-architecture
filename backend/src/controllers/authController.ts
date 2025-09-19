import { Request, Response } from 'express';
import { ApiResponse, BrokerRegistrationData, LoginData } from '../types/index.js';
import authService from '../services/authService.js';
import NotificationService from '../services/notificationService.js';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const registrationData: BrokerRegistrationData = req.body;

      const { user, broker, needsVerification } = await authService.register(registrationData);

      const response: ApiResponse = {
        success: true,
        message: 'Registration successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified
          },
          broker: {
            id: broker.id,
            companyName: broker.companyName,
            brokerLicense: broker.brokerLicense,
            verificationStatus: broker.verificationStatus
          },
          needsVerification
        },
        ...NotificationService.createSweetAlertResponse(
          'success',
          'Registration Successful',
          `Welcome ${user.firstName}! Please check your ${registrationData.verificationMethod} for a verification code to complete your registration.`
        )
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Registration error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      const response: ApiResponse = {
        success: false,
        message: 'Registration failed',
        error: errorMessage,
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Registration Failed',
          errorMessage
        )
      };

      res.status(400).json(response);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginData = req.body;

      const { user, broker, token } = await authService.login(loginData);

      const response: ApiResponse = {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified
          },
          broker: {
            id: broker.id,
            companyName: broker.companyName,
            brokerLicense: broker.brokerLicense,
            verificationStatus: broker.verificationStatus
          },
          token
        },
        ...NotificationService.createToastResponse(
          'success',
          `Welcome back, ${user.firstName}!`
        )
      };

      res.json(response);
    } catch (error) {
      console.error('Login error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      const response: ApiResponse = {
        success: false,
        message: 'Login failed',
        error: errorMessage,
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Login Failed',
          errorMessage
        )
      };

      res.status(401).json(response);
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { code } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: 'User ID required',
          error: 'Invalid request',
          ...NotificationService.createSweetAlertResponse(
            'error',
            'Verification Failed',
            'User information is required for verification'
          )
        };
        return res.status(400).json(response);
      }

      const verified = await authService.verifyOTP(userId, code);

      if (verified) {
        // Get updated user data
        const userData = await authService.getUserById(userId);

        const response: ApiResponse = {
          success: true,
          message: 'Account verified successfully',
          data: {
            verified: true,
            user: userData?.user,
            broker: userData?.broker
          },
          ...NotificationService.createSweetAlertResponse(
            'success',
            'Account Verified',
            'Your account has been successfully verified! You can now access all features.'
          )
        };

        res.json(response);
      }
    } catch (error) {
      console.error('OTP verification error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Verification failed';
      const response: ApiResponse = {
        success: false,
        message: 'Verification failed',
        error: errorMessage,
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Verification Failed',
          errorMessage
        )
      };

      res.status(400).json(response);
    }
  }

  async resendOTP(req: Request, res: Response) {
    try {
      const { type } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: 'User ID required',
          error: 'Invalid request'
        };
        return res.status(400).json(response);
      }

      const sent = await authService.resendOTP(userId, type);

      if (sent) {
        const response: ApiResponse = {
          success: true,
          message: 'Verification code sent',
          data: { sent: true },
          ...NotificationService.createToastResponse(
            'success',
            `Verification code sent via ${type}`
          )
        };

        res.json(response);
      }
    } catch (error) {
      console.error('Resend OTP error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Failed to send verification code';
      const response: ApiResponse = {
        success: false,
        message: 'Failed to resend verification code',
        error: errorMessage,
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Send Failed',
          errorMessage
        )
      };

      res.status(400).json(response);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: 'User ID required',
          error: 'Invalid request'
        };
        return res.status(400).json(response);
      }

      const userData = await authService.getUserById(userId);

      if (!userData) {
        const response: ApiResponse = {
          success: false,
          message: 'User not found',
          error: 'User profile not found'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse = {
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          user: userData.user,
          broker: userData.broker
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Get profile error:', error);

      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve profile',
        error: 'Internal server error'
      };

      res.status(500).json(response);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // In a production environment, you might want to invalidate the token
      // by maintaining a blacklist of tokens or using short-lived tokens with refresh tokens

      const response: ApiResponse = {
        success: true,
        message: 'Logged out successfully',
        data: { loggedOut: true },
        ...NotificationService.createToastResponse(
          'success',
          'Logged out successfully'
        )
      };

      res.json(response);
    } catch (error) {
      console.error('Logout error:', error);

      const response: ApiResponse = {
        success: false,
        message: 'Logout failed',
        error: 'Internal server error'
      };

      res.status(500).json(response);
    }
  }

  async checkAuthStatus(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: 'Not authenticated',
          data: { authenticated: false }
        };
        return res.status(401).json(response);
      }

      const userData = await authService.getUserById(userId);

      if (!userData) {
        const response: ApiResponse = {
          success: false,
          message: 'User not found',
          data: { authenticated: false }
        };
        return res.status(401).json(response);
      }

      const response: ApiResponse = {
        success: true,
        message: 'Authentication valid',
        data: {
          authenticated: true,
          user: userData.user,
          broker: userData.broker
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Auth status check error:', error);

      const response: ApiResponse = {
        success: false,
        message: 'Authentication check failed',
        data: { authenticated: false }
      };

      res.status(500).json(response);
    }
  }
}

export default new AuthController();