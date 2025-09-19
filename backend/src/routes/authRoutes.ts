import express from 'express';
import authController from '../controllers/authController.js';
import {
  validate,
  sanitizeInput,
  registrationSchema,
  loginSchema,
  otpVerificationSchema,
  resendOtpSchema
} from '../middleware/validation.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts',
    error: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 OTP attempts per windowMs
  message: {
    success: false,
    message: 'Too many OTP attempts',
    error: 'Please wait before requesting another code'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post('/register',
  authLimiter,
  sanitizeInput,
  validate(registrationSchema),
  authController.register
);

router.post('/login',
  authLimiter,
  sanitizeInput,
  validate(loginSchema),
  authController.login
);

// Protected routes (require authentication token but not necessarily verification)
router.post('/verify-otp',
  otpLimiter,
  authenticateToken,
  sanitizeInput,
  validate(otpVerificationSchema),
  authController.verifyOTP
);

router.post('/resend-otp',
  otpLimiter,
  authenticateToken,
  sanitizeInput,
  validate(resendOtpSchema),
  authController.resendOTP
);

// Fully protected routes (require authentication and verification)
router.get('/profile',
  authenticateToken,
  authController.getProfile
);

router.post('/logout',
  authenticateToken,
  authController.logout
);

// Auth status check (optional authentication)
router.get('/status',
  optionalAuth,
  authController.checkAuthStatus
);

export default router;