export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Broker {
  id: string;
  userId: string;
  companyName: string;
  brokerLicense: string;
  licenseState?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface BrokerRegistrationData {
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

export interface LoginData {
  email: string;
  password: string;
}

export interface OTPVerification {
  id: string;
  userId: string;
  code: string;
  type: 'email' | 'sms';
  expiresAt: Date;
  attempts: number;
  verified: boolean;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  isVerified: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PropertyInfo {
  caseNumber: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  area: number;
  occupancyStatus: 'occupied' | 'vacant';
  accessMethod?: 'personal' | 'open' | 'receive_key' | 'key_box';
  accessInstructions?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  icon: string;
}

export interface Reservation {
  id: string;
  userId: string;
  caseNumber: string;
  propertyAddress: PropertyInfo['address'];
  propertyArea?: number;
  occupancyStatus?: string;
  accessMethod?: string;
  accessInstructions?: string;
  servicePackage: ServicePackage;
  selectedOptions?: Record<string, any>;
  totalPrice: number;
  vatAmount: number;
  finalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationData {
  type: 'email' | 'sms';
  recipient: string;
  subject?: string;
  message: string;
  template?: string;
  data?: Record<string, any>;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}