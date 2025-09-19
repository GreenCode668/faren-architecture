# Faren Architecture Backend

A Node.js/Express backend API for the Faren Architecture & Interior Design platform with real estate photography booking system.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Supabase** - Database and authentication
- **Nodemailer** - Email notifications
- **Twilio** - SMS notifications
- **JWT** - Authentication tokens
- **Joi** - Input validation
- **Winston** - Logging

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Email service credentials (Gmail App Password recommended)
- Twilio account for SMS (optional)

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Database setup:**
   - Create a Supabase project
   - Run the SQL in `src/config/database.ts` in your Supabase SQL editor
   - Update `.env` with your Supabase credentials

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Required
```env
# Server
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email (Nodemailer with Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@farenarchitecture.com
```

### Optional
```env
# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Brokers Table
```sql
CREATE TABLE brokers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  broker_license VARCHAR(100) UNIQUE NOT NULL,
  license_state VARCHAR(2),
  verification_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### OTP Verifications Table
```sql
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  code VARCHAR(6) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'email' or 'sms'
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🛡️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new broker
- `POST /api/auth/login` - Login
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/resend-otp` - Resend OTP
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout
- `GET /api/auth/status` - Check auth status

### Health Check
- `GET /health` - Server health status

## 🔐 Security Features

- **Rate Limiting** - Prevents brute force attacks
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Joi schema validation
- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Request Sanitization** - XSS protection

## 📧 Notification System

### Email Templates
- Welcome email with OTP
- OTP verification
- Reservation confirmation

### SMS Support
- OTP delivery via Twilio
- Notification preferences

### SweetAlert Integration
The backend returns notification data that the frontend displays using SweetAlert2:

```javascript
// Backend response includes notification data
{
  success: true,
  message: "Login successful",
  data: { user, token },
  sweetAlert: {
    icon: "success",
    title: "Welcome back!",
    text: "You have been logged in successfully."
  }
}
```

## 🚨 Error Handling

- Global error handler
- Structured error responses
- Logging with Winston
- Production error filtering

## 📝 Logging

Logs are stored in the `logs/` directory:
- `error.log` - Error messages only
- `combined.log` - All log messages

## 🧪 Testing

```bash
npm test
```

## 🏗️ Building

```bash
npm run build
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── server.ts        # Main server file
├── logs/                # Log files
├── uploads/             # File uploads
└── dist/                # Compiled JavaScript
```

## 🔄 Development Workflow

1. Make changes to TypeScript files in `src/`
2. The dev server automatically restarts with `tsx watch`
3. Check logs in the console and `logs/` directory
4. Test API endpoints with your preferred client
5. Run linting: `npm run lint`

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up proper logging
4. Use process manager (PM2 recommended)
5. Set up reverse proxy (Nginx)
6. Configure SSL certificate

## 🤝 Contributing

1. Follow TypeScript and ESLint rules
2. Add proper error handling
3. Include input validation
4. Write meaningful commit messages
5. Update documentation as needed