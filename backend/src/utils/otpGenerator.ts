import crypto from 'crypto';

export class OTPGenerator {
  static generate(length: number = 6): string {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  static generateSecure(length: number = 6): string {
    const digits = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, digits.length);
      result += digits[randomIndex];
    }

    return result;
  }

  static isExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }

  static getExpirationTime(minutes: number = 10): Date {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + minutes);
    return expiration;
  }
}

export default OTPGenerator;