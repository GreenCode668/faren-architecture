import bcrypt from 'bcryptjs';
import { supabaseAdmin } from './src/config/supabase.ts';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
  try {
    const testUserData = {
      email: 'test@faren.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890',
      companyName: 'Test Company',
      brokerLicense: 'TEST123'
    };

    // Hash password
    const passwordHash = await bcrypt.hash(testUserData.password, 12);

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', testUserData.email)
      .single();

    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Create user
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email: testUserData.email,
        password_hash: passwordHash,
        first_name: testUserData.firstName,
        last_name: testUserData.lastName,
        phone: testUserData.phone,
        is_verified: true // Set to true for testing
      })
      .select()
      .single();

    if (userError) {
      console.error('Failed to create user:', userError);
      return;
    }

    console.log('Test user created:', newUser.id);

    // Create broker profile
    const { data: newBroker, error: brokerError } = await supabaseAdmin
      .from('brokers')
      .insert({
        user_id: newUser.id,
        company_name: testUserData.companyName,
        broker_license: testUserData.brokerLicense,
        verification_status: 'verified'
      })
      .select()
      .single();

    if (brokerError) {
      console.error('Failed to create broker:', brokerError);
      return;
    }

    console.log('Test broker created:', newBroker.id);
    console.log('✅ Test user setup complete!');
    console.log('Email:', testUserData.email);
    console.log('Password:', testUserData.password);

  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

createTestUser();