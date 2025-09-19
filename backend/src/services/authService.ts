import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '../config/supabase.js';
import { BrokerRegistrationData, LoginData, User, Broker, JWTPayload, OTPVerification } from '../types/index.js';
import NotificationServiceClass from './notificationService.js';

const notificationService = new NotificationServiceClass();
import OTPGenerator from '../utils/otpGenerator.js';

class AuthService {
  private readonly saltRounds = 12;
  private readonly jwtSecret = process.env.JWT_SECRET!;
  private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

  async register(data: BrokerRegistrationData): Promise<{ user: User; broker: Broker; needsVerification: boolean }> {
    const { email, password, firstName, lastName, phone, companyName, brokerLicense, licenseState, verificationMethod } = data;

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Check if broker license already exists
    const { data: existingBroker } = await supabaseAdmin
      .from('brokers')
      .select('id')
      .eq('broker_license', brokerLicense)
      .single();

    if (existingBroker) {
      throw new Error('Broker license already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.saltRounds);

    // Create user
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        phone,
        is_verified: false
      })
      .select()
      .single();

    if (userError || !newUser) {
      throw new Error('Failed to create user account');
    }

    // Create broker profile
    const { data: newBroker, error: brokerError } = await supabaseAdmin
      .from('brokers')
      .insert({
        user_id: newUser.id,
        company_name: companyName,
        broker_license: brokerLicense,
        license_state: licenseState || null,
        verification_status: 'pending'
      })
      .select()
      .single();

    if (brokerError || !newBroker) {
      // Cleanup user if broker creation fails
      await supabaseAdmin.from('users').delete().eq('id', newUser.id);
      throw new Error('Failed to create broker profile');
    }

    // Generate and send OTP
    const otpCode = OTPGenerator.generateSecure(6);
    const expiresAt = OTPGenerator.getExpirationTime(10);

    const { error: otpError } = await supabaseAdmin
      .from('otp_verifications')
      .insert({
        user_id: newUser.id,
        code: otpCode,
        type: verificationMethod,
        expires_at: expiresAt.toISOString()
      });

    if (otpError) {
      console.error('Failed to save OTP:', otpError);
    }

    // Send verification notification
    const recipient = verificationMethod === 'email' ? email : phone;
    const notificationData = {
      type: verificationMethod,
      recipient: recipient!,
      template: 'welcome',
      data: {
        firstName,
        otpCode
      }
    };

    await notificationService.sendNotification(notificationData);

    const user: User = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      phone: newUser.phone,
      isVerified: newUser.is_verified,
      createdAt: new Date(newUser.created_at),
      updatedAt: new Date(newUser.updated_at)
    };

    const broker: Broker = {
      id: newBroker.id,
      userId: newBroker.user_id,
      companyName: newBroker.company_name,
      brokerLicense: newBroker.broker_license,
      licenseState: newBroker.license_state,
      verificationStatus: newBroker.verification_status,
      createdAt: new Date(newBroker.created_at),
      updatedAt: new Date(newBroker.updated_at)
    };

    return { user, broker, needsVerification: true };
  }

  async login(data: LoginData): Promise<{ user: User; broker: Broker; token: string }> {
    const { email, password } = data;

    // Get user with broker info
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        *,
        brokers (*)
      `)
      .eq('email', email)
      .single();

    if (userError || !userData) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, userData.password_hash);
    if (!passwordValid) {
      throw new Error('Invalid email or password');
    }

    // Check if user is verified
    if (!userData.is_verified) {
      throw new Error('Please verify your account before logging in');
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      phone: userData.phone,
      isVerified: userData.is_verified,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at)
    };

    const brokerData = userData.brokers[0];
    const broker: Broker = {
      id: brokerData.id,
      userId: brokerData.user_id,
      companyName: brokerData.company_name,
      brokerLicense: brokerData.broker_license,
      licenseState: brokerData.license_state,
      verificationStatus: brokerData.verification_status,
      createdAt: new Date(brokerData.created_at),
      updatedAt: new Date(brokerData.updated_at)
    };

    // Generate JWT token
    const tokenPayload: JWTPayload = {
      userId: user.id,
      email: user.email,
      isVerified: user.isVerified
    };

    const token = jwt.sign(tokenPayload, this.jwtSecret, { expiresIn: this.jwtExpiresIn });

    return { user, broker, token };
  }

  async verifyOTP(userId: string, code: string): Promise<boolean> {
    // Get the latest OTP for the user
    const { data: otpData, error: otpError } = await supabaseAdmin
      .from('otp_verifications')
      .select('*')
      .eq('user_id', userId)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (otpError || !otpData) {
      throw new Error('Invalid or expired verification code');
    }

    // Check if OTP is expired
    if (OTPGenerator.isExpired(new Date(otpData.expires_at))) {
      throw new Error('Verification code has expired');
    }

    // Check if too many attempts
    if (otpData.attempts >= 3) {
      throw new Error('Too many verification attempts. Please request a new code');
    }

    // Verify the code
    if (otpData.code !== code) {
      // Increment attempts
      await supabaseAdmin
        .from('otp_verifications')
        .update({ attempts: otpData.attempts + 1 })
        .eq('id', otpData.id);

      throw new Error('Invalid verification code');
    }

    // Mark OTP as verified
    await supabaseAdmin
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', otpData.id);

    // Mark user as verified
    const { error: userUpdateError } = await supabaseAdmin
      .from('users')
      .update({ is_verified: true })
      .eq('id', userId);

    if (userUpdateError) {
      throw new Error('Failed to verify user account');
    }

    return true;
  }

  async resendOTP(userId: string, type: 'email' | 'sms'): Promise<boolean> {
    // Get user info
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('email, first_name, phone')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      throw new Error('User not found');
    }

    // Generate new OTP
    const otpCode = OTPGenerator.generateSecure(6);
    const expiresAt = OTPGenerator.getExpirationTime(10);

    // Save new OTP
    const { error: otpError } = await supabaseAdmin
      .from('otp_verifications')
      .insert({
        user_id: userId,
        code: otpCode,
        type,
        expires_at: expiresAt.toISOString()
      });

    if (otpError) {
      throw new Error('Failed to generate verification code');
    }

    // Send notification
    const recipient = type === 'email' ? userData.email : userData.phone;
    const notificationData = {
      type,
      recipient: recipient!,
      template: 'otpVerification',
      data: {
        firstName: userData.first_name,
        otpCode
      }
    };

    const sent = await notificationService.sendNotification(notificationData);
    if (!sent) {
      throw new Error('Failed to send verification code');
    }

    return true;
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.jwtSecret) as JWTPayload;
    } catch {
      return null;
    }
  }

  async getUserById(userId: string): Promise<{ user: User; broker: Broker } | null> {
    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select(`
        *,
        brokers (*)
      `)
      .eq('id', userId)
      .single();

    if (error || !userData) {
      return null;
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      phone: userData.phone,
      isVerified: userData.is_verified,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at)
    };

    const brokerData = userData.brokers[0];
    const broker: Broker = {
      id: brokerData.id,
      userId: brokerData.user_id,
      companyName: brokerData.company_name,
      brokerLicense: brokerData.broker_license,
      licenseState: brokerData.license_state,
      verificationStatus: brokerData.verification_status,
      createdAt: new Date(brokerData.created_at),
      updatedAt: new Date(brokerData.updated_at)
    };

    return { user, broker };
  }
}

export default new AuthService();