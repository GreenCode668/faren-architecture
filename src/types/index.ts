export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  location: string;
  size: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface BrokerLoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface BrokerRegistrationForm {
  email: string;
  phone: string;
  companyName: string;
  brokerLicense: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingConsent: boolean;
  verificationMethod: 'email' | 'sms';
}

export interface OTPVerification {
  code: string;
  expiresAt: Date;
  attempts: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  brokerLicense: string;
  isVerified: boolean;
  createdAt: Date;
}