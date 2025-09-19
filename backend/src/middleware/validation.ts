import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/index.js';
import NotificationService from '../services/notificationService.js';

// Validation schemas
export const registrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]')).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Password confirmation is required'
  }),
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name cannot exceed 50 characters',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name cannot exceed 50 characters',
    'any.required': 'Last name is required'
  }),
  phone: Joi.string().pattern(new RegExp('^\\+?[1-9]\\d{1,14}$')).required().messages({
    'string.pattern.base': 'Please provide a valid phone number',
    'any.required': 'Phone number is required'
  }),
  companyName: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Company name must be at least 2 characters long',
    'string.max': 'Company name cannot exceed 100 characters',
    'any.required': 'Company name is required'
  }),
  brokerLicense: Joi.string().min(5).max(50).required().messages({
    'string.min': 'Broker license must be at least 5 characters long',
    'string.max': 'Broker license cannot exceed 50 characters',
    'any.required': 'Broker license is required'
  }),
  licenseState: Joi.string().length(2).optional().messages({
    'string.length': 'License state must be a 2-character state code'
  }),
  verificationMethod: Joi.string().valid('email', 'sms').required().messages({
    'any.only': 'Verification method must be either email or sms',
    'any.required': 'Verification method is required'
  }),
  acceptTerms: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the Terms of Service',
    'any.required': 'Terms of Service acceptance is required'
  }),
  acceptPrivacy: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the Privacy Policy',
    'any.required': 'Privacy Policy acceptance is required'
  }),
  marketingConsent: Joi.boolean().optional().messages({
    'boolean.base': 'Marketing consent must be a boolean value'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

export const otpVerificationSchema = Joi.object({
  code: Joi.string().length(6).pattern(/^\\d+$/).required().messages({
    'string.length': 'Verification code must be 6 digits',
    'string.pattern.base': 'Verification code must contain only numbers',
    'any.required': 'Verification code is required'
  })
});

export const resendOtpSchema = Joi.object({
  type: Joi.string().valid('email', 'sms').required().messages({
    'any.only': 'Type must be either email or sms',
    'any.required': 'Type is required'
  })
});

export const reservationSchema = Joi.object({
  caseNumber: Joi.string().min(5).max(50).required().messages({
    'string.min': 'Case number must be at least 5 characters long',
    'string.max': 'Case number cannot exceed 50 characters',
    'any.required': 'Case number is required'
  }),
  propertyAddress: Joi.object({
    street: Joi.string().min(5).max(200).required().messages({
      'string.min': 'Street address must be at least 5 characters long',
      'string.max': 'Street address cannot exceed 200 characters',
      'any.required': 'Street address is required'
    }),
    postalCode: Joi.string().min(5).max(10).required().messages({
      'string.min': 'Postal code must be at least 5 characters long',
      'string.max': 'Postal code cannot exceed 10 characters',
      'any.required': 'Postal code is required'
    }),
    city: Joi.string().min(2).max(100).required().messages({
      'string.min': 'City must be at least 2 characters long',
      'string.max': 'City cannot exceed 100 characters',
      'any.required': 'City is required'
    })
  }).required(),
  propertyArea: Joi.number().positive().max(999999).optional().messages({
    'number.positive': 'Property area must be a positive number',
    'number.max': 'Property area cannot exceed 999,999 square feet'
  }),
  occupancyStatus: Joi.string().valid('occupied', 'vacant').required().messages({
    'any.only': 'Occupancy status must be either occupied or vacant',
    'any.required': 'Occupancy status is required'
  }),
  accessMethod: Joi.string().valid('personal', 'open', 'receive_key', 'key_box').optional(),
  accessInstructions: Joi.string().max(500).optional().messages({
    'string.max': 'Access instructions cannot exceed 500 characters'
  }),
  servicePackage: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    basePrice: Joi.number().positive().required()
  }).required(),
  selectedOptions: Joi.object().optional(),
  totalPrice: Joi.number().positive().required().messages({
    'number.positive': 'Total price must be a positive number',
    'any.required': 'Total price is required'
  }),
  vatAmount: Joi.number().min(0).required().messages({
    'number.min': 'VAT amount cannot be negative',
    'any.required': 'VAT amount is required'
  }),
  finalPrice: Joi.number().positive().required().messages({
    'number.positive': 'Final price must be a positive number',
    'any.required': 'Final price is required'
  })
});

// Validation middleware factory
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      const response: ApiResponse = {
        success: false,
        message: 'Validation failed',
        error: errorMessages.join('; '),
        ...NotificationService.createSweetAlertResponse(
          'error',
          'Validation Error',
          errorMessages.join('\\n')
        )
      };

      return res.status(400).json(response);
    }

    req.body = value;
    next();
  };
};

// Input sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    return str.trim().replace(/[<>\"']/g, '');
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    if (typeof obj === 'object' && obj !== null) {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    return obj;
  };

  req.body = sanitizeObject(req.body);
  next();
};