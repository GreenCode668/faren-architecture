import { Request, Response, NextFunction } from 'express';
import { ApiResponse, JWTPayload } from '../types/index.js';
import authService from '../services/authService.js';
import NotificationService from '../services/notificationService.js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload & { userData?: any };
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      const response: ApiResponse = {
        success: false,
        message: 'Access token required',
        error: 'No authentication token provided',
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Authentication Required',
          'Please log in to access this resource'
        )
      };
      return res.status(401).json(response);
    }

    const decoded = authService.verifyToken(token);
    if (!decoded) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid or expired token',
        error: 'Authentication failed',
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Session Expired',
          'Your session has expired. Please log in again'
        )
      };
      return res.status(401).json(response);
    }

    // Get user data
    const userData = await authService.getUserById(decoded.userId);
    if (!userData) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found',
        error: 'Invalid user token',
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Account Not Found',
          'Your account could not be found. Please log in again'
        )
      };
      return res.status(401).json(response);
    }

    req.user = { ...decoded, userData };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Authentication failed',
      error: 'Internal authentication error',
      ...NotificationService.createSweetAlertResponse(
        'error',
        'Authentication Error',
        'An error occurred during authentication. Please try again'
      )
    };
    res.status(500).json(response);
  }
};

export const requireVerification = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isVerified) {
    const response: ApiResponse = {
      success: false,
      message: 'Account verification required',
      error: 'Please verify your account to access this resource',
      ...NotificationService.createSweetAlertResponse(
        'warning',
        'Verification Required',
        'Please verify your account before proceeding'
      )
    };
    return res.status(403).json(response);
  }
  next();
};

export const requireBrokerStatus = (status: 'pending' | 'verified' | 'rejected') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const brokerStatus = req.user?.userData?.broker?.verificationStatus;

    if (brokerStatus !== status) {
      const response: ApiResponse = {
        success: false,
        message: 'Insufficient broker verification',
        error: `Broker status must be ${status}`,
        ...NotificationService.createSweetAlertResponse(
          'warning',
          'Access Restricted',
          `Your broker verification status must be ${status} to access this resource`
        )
      };
      return res.status(403).json(response);
    }
    next();
  };
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = authService.verifyToken(token);
      if (decoded) {
        const userData = await authService.getUserById(decoded.userId);
        if (userData) {
          req.user = { ...decoded, userData };
        }
      }
    }

    next();
  } catch (error) {
    // Ignore authentication errors for optional auth
    next();
  }
};