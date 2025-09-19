import nodemailer from 'nodemailer';
import twilio from 'twilio';
import winston from 'winston';
import { NotificationData, EmailTemplate } from '../types/index.js';

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Email transporter setup
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio client setup (optional)
const twilioClient = process.env.TWILIO_ACCOUNT_SID &&
                     process.env.TWILIO_AUTH_TOKEN &&
                     process.env.TWILIO_ACCOUNT_SID.startsWith('AC') &&
                     !process.env.TWILIO_ACCOUNT_SID.includes('your_twilio')
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Email templates
const emailTemplates: Record<string, EmailTemplate> = {
  welcome: {
    subject: 'Welcome to Faren Architecture',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF833B;">Welcome to Faren Architecture</h1>
        <p>Hello \{\{firstName\}\},</p>
        <p>Thank you for registering with Faren Architecture. We're excited to have you as part of our professional network.</p>
        <p>To complete your registration, please verify your account using the code below:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h2 style="color: #FF833B; font-size: 32px; letter-spacing: 4px;">\{\{otpCode\}\}</h2>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>Best regards,<br>The Faren Architecture Team</p>
      </div>
    `,
    text: 'Welcome to Faren Architecture! Your verification code is: \{\{otpCode\}\}'
  },
  otpVerification: {
    subject: 'Your Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF833B;">Verification Code</h1>
        <p>Hello \{\{firstName\}\},</p>
        <p>Your verification code is:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h2 style="color: #FF833B; font-size: 32px; letter-spacing: 4px;">\{\{otpCode\}\}</h2>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <p>Best regards,<br>The Faren Architecture Team</p>
      </div>
    `,
    text: 'Your verification code is: \{\{otpCode\}\}'
  },
  reservationConfirmation: {
    subject: 'Reservation Confirmation - \{\{caseNumber\}\}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF833B;">Reservation Confirmed</h1>
        <p>Hello \{\{firstName\}\},</p>
        <p>Your photography service reservation has been confirmed!</p>
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
          <h3>Reservation Details:</h3>
          <p><strong>Case Number:</strong> \{\{caseNumber\}\}</p>
          <p><strong>Property:</strong> \{\{propertyAddress\}\}</p>
          <p><strong>Service:</strong> \{\{servicePackage\}\}</p>
          <p><strong>Total:</strong> $\{\{finalPrice\}\}</p>
        </div>
        <p>We'll contact you soon to schedule the photography session.</p>
        <p>Best regards,<br>The Faren Architecture Team</p>
      </div>
    `,
    text: 'Your reservation \{\{caseNumber\}\} has been confirmed. Total: $\{\{finalPrice\}\}'
  }
};

class NotificationService {
  async sendEmail(data: NotificationData): Promise<boolean> {
    try {
      const template = data.template ? emailTemplates[data.template] : null;

      let subject = data.subject || 'Notification from Faren Architecture';
      let html = data.message;
      let text = data.message;

      if (template && data.data) {
        subject = this.replaceTemplateVariables(template.subject, data.data);
        html = this.replaceTemplateVariables(template.html, data.data);
        text = this.replaceTemplateVariables(template.text, data.data);
      }

      // In development, just log the email instead of sending
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        logger.warn('Email credentials not configured, logging email content');
        console.log(`[DEV] Email to ${data.recipient}:`);
        console.log(`Subject: ${subject}`);
        console.log(`Content: ${text}`);
        return true; // Return true for development mode
      }

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: data.recipient,
        subject,
        html,
        text
      };

      await emailTransporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${data.recipient}`);
      return true;
    } catch (error) {
      logger.error('Email sending failed:', error);
      // In development, still return true to not break the flow
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV] Email would have been sent to ${data.recipient}`);
        return true;
      }
      return false;
    }
  }

  async sendSMS(data: NotificationData): Promise<boolean> {
    try {
      if (!twilioClient) {
        logger.warn('Twilio not configured, skipping SMS send');
        console.log(`[DEV] SMS to ${data.recipient}: ${data.message}`);
        return true; // Return true for development mode
      }

      await twilioClient.messages.create({
        body: data.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: data.recipient
      });

      logger.info(`SMS sent successfully to ${data.recipient}`);
      return true;
    } catch (error) {
      logger.error('SMS sending failed:', error);
      return false;
    }
  }

  async sendNotification(data: NotificationData): Promise<boolean> {
    if (data.type === 'email') {
      return await this.sendEmail(data);
    } else if (data.type === 'sms') {
      return await this.sendSMS(data);
    }
    return false;
  }

  private replaceTemplateVariables(template: string, data: Record<string, any>): string {
    let result = template;
    Object.keys(data).forEach(key => {
      const value = data[key];
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    });
    return result;
  }

  // SweetAlert integration helper for frontend responses
  static createSweetAlertResponse(
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    additionalOptions?: Record<string, any>
  ) {
    return {
      sweetAlert: {
        icon: type,
        title,
        text: message,
        confirmButtonColor: '#FF833B',
        ...additionalOptions
      }
    };
  }

  // Toast notification helper for frontend
  static createToastResponse(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    duration: number = 3000
  ) {
    return {
      toast: {
        type,
        message,
        duration,
        position: 'top-right'
      }
    };
  }
}

export default NotificationService;