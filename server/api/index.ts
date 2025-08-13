import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import Redis from 'ioredis';

const app = express();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://dtznychatpfevjjwpmjy.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0em55Y2hhdHBmZXZqandwbWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNjU3MDEsImV4cCI6MjA0ODc0MTcwMX0.M8nD5E0FEGwAEPrfUZwePYP7JDJVGjUmqZP0GaGDe0E';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Initialize Redis client
let redis: Redis | null = null;
try {
  const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
  if (redisUrl) {
    redis = new Redis(redisUrl);
    console.log('Redis connected successfully');
  }
} catch (error) {
  console.log('Redis connection failed, running without Redis:', error);
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'https://sr-associates.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));

// Rate limiting
const createRateLimit = (windowMs: number, max: number) => rateLimit({
  windowMs, max,
  message: { success: false, message: 'Too many requests, please try again later.', code: 'RATE_LIMIT_EXCEEDED' },
  standardHeaders: true, legacyHeaders: false,
});

const authLimiter = createRateLimit(15 * 60 * 1000, 5);
const generalLimiter = createRateLimit(15 * 60 * 1000, 100);

// Utility functions
const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 12);
const verifyPassword = async (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);

const generateTokens = (userId: string, email: string, role: string = 'USER') => {
  const payload = { userId, email, role };
  const accessSecret = process.env.JWT_ACCESS_SECRET || 'finbridge_production_jwt_access_secret_2024_secure_key_sr_associates';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'finbridge_production_jwt_refresh_secret_2024_secure_key_sr_associates';
  
  try {
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('JWT generation error:', error);
    throw new Error('Failed to generate tokens');
  }
};

const verifyToken = (token: string, secret: string): JwtPayload | null => {
  try { return jwt.verify(token, secret) as JwtPayload; } 
  catch (error) { return null; }
};

// Validation functions
const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string): boolean => /^[6-9]\d{9}$/.test(phone);
const validateName = (name: string): boolean => /^[a-zA-Z\s]+$/.test(name) && name.length >= 2 && name.length <= 50;

const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) return { isValid: false, message: 'Password must be at least 8 characters long' };
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' };
  }
  
  return { isValid: true };
};

// Authentication middleware
const authenticate = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required', code: 'AUTH_REQUIRED' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET || 'finbridge_production_jwt_access_secret_2024_secure_key_sr_associates');
    
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ success: false, message: 'Invalid or expired token', code: 'INVALID_TOKEN' });
    }

    const { data: user, error } = await supabase.from('users').select('*').eq('id', decoded.userId).single();

    if (error || !user) {
      console.error('User lookup error:', error);
      return res.status(401).json({ success: false, message: 'User not found', code: 'USER_NOT_FOUND' });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ success: false, message: 'Authentication failed', code: 'AUTH_FAILED' });
  }
};

// ENDPOINTS

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const { data: dbTest, error: dbError } = await supabase.from('users').select('count').limit(1);
    const databaseHealthy = !dbError;

    let redisHealthy = false;
    try { if (redis) { await redis.ping(); redisHealthy = true; } } catch (error) { redisHealthy = false; }

    res.status(200).json({
      success: true, message: 'FinBridge API is healthy',
      services: { database: databaseHealthy, redis: redisHealthy },
      environment: process.env.NODE_ENV || 'production', version: '1.0.0', timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      success: false, message: 'Health check failed',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
});

// API info
app.get('/api', (req, res) => {
  res.json({
    success: true, message: 'FinBridge API is running', version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    endpoints: { auth: '/api/auth/*', health: '/api/health', docs: '/api/docs' }
  });
});

// Root
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to FinBridge API', health: '/api/health', docs: '/api/docs' });
});

// Register
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword, dateOfBirth, gender } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided', code: 'MISSING_FIELDS' });
    }

    if (!validateName(firstName)) {
      return res.status(400).json({ success: false, message: 'First name must contain only letters and spaces (2-50 characters)', code: 'INVALID_FIRST_NAME' });
    }

    if (!validateName(lastName)) {
      return res.status(400).json({ success: false, message: 'Last name must contain only letters and spaces (2-50 characters)', code: 'INVALID_LAST_NAME' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address', code: 'INVALID_EMAIL' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit Indian phone number', code: 'INVALID_PHONE' });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ success: false, message: passwordValidation.message, code: 'INVALID_PASSWORD' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match', code: 'PASSWORD_MISMATCH' });
    }

    const { data: existingUser, error: checkError } = await supabase
      .from('users').select('email, phone').or(`email.eq.${email},phone.eq.${phone}`).maybeSingle();

    if (checkError) {
      console.error('User existence check error:', checkError);
      return res.status(500).json({ success: false, message: 'Failed to verify user uniqueness', code: 'DATABASE_ERROR' });
    }

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'phone number';
      return res.status(409).json({ success: false, message: `User with this ${field} already exists`, code: 'USER_EXISTS' });
    }

    const passwordHash = await hashPassword(password);

    const userData = {
      firstName, lastName, email, phone, passwordHash,
      dateOfBirth: dateOfBirth || null, gender: gender || null,
      role: 'USER', kycStatus: 'PENDING', emailVerified: false, phoneVerified: false,
      isActive: true, isBlocked: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), country: 'India'
    };

    const { data: user, error: createError } = await supabase
      .from('users').insert(userData)
      .select('id, firstName, lastName, email, phone, role, kycStatus, emailVerified, phoneVerified, createdAt').single();

    if (createError) {
      console.error('User creation error:', createError);
      return res.status(500).json({ success: false, message: 'Failed to create user account', code: 'REGISTRATION_FAILED' });
    }

    const tokens = generateTokens(user.id, user.email, user.role);

    if (redis) {
      try { await redis.setex(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, tokens.refreshToken); } 
      catch (error) { console.log('Redis error during registration:', error); }
    }

    res.status(201).json({
      success: true, message: 'User registered successfully',
      data: {
        user: { ...user, name: `${user.firstName} ${user.lastName}`, isAuthenticated: true },
        accessToken: tokens.accessToken, refreshToken: tokens.refreshToken
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Failed to create user account', code: 'REGISTRATION_FAILED' });
  }
});

// Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required', code: 'MISSING_CREDENTIALS' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address', code: 'INVALID_EMAIL' });
    }

    const { data: user, error } = await supabase.from('users').select('*').eq('email', email).single();

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password', code: 'INVALID_CREDENTIALS' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is deactivated. Please contact support.', code: 'ACCOUNT_DEACTIVATED' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ success: false, message: `Account is blocked: ${user.blockedReason || 'Contact support'}`, code: 'ACCOUNT_BLOCKED' });
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password', code: 'INVALID_CREDENTIALS' });
    }

    await supabase.from('users').update({ lastLoginAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).eq('id', user.id);

    const tokens = generateTokens(user.id, user.email, user.role);

    if (redis) {
      try { await redis.setex(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, tokens.refreshToken); } 
      catch (error) { console.log('Redis error during login:', error); }
    }

    const { passwordHash, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true, message: 'Login successful',
      data: {
        user: { ...userWithoutPassword, name: `${user.firstName} ${user.lastName}`, isAuthenticated: true },
        accessToken: tokens.accessToken, refreshToken: tokens.refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed. Please try again.', code: 'LOGIN_FAILED' });
  }
});

// Refresh token
app.post('/api/auth/refresh', generalLimiter, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token is required', code: 'TOKEN_REQUIRED' });
    }

    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET || 'finbridge_production_jwt_refresh_secret_2024_secure_key_sr_associates');
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token', code: 'INVALID_REFRESH_TOKEN' });
    }

    if (redis) {
      try {
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
        if (storedToken !== refreshToken) {
          return res.status(401).json({ success: false, message: 'Refresh token not found or expired', code: 'TOKEN_NOT_FOUND' });
        }
      } catch (error) { console.log('Redis error during token refresh:', error); }
    }

    const newTokens = generateTokens(decoded.userId, decoded.email, decoded.role);

    if (redis) {
      try { await redis.setex(`refresh_token:${decoded.userId}`, 7 * 24 * 60 * 60, newTokens.refreshToken); } 
      catch (error) { console.log('Redis error during token update:', error); }
    }

    res.status(200).json({ success: true, message: 'Tokens refreshed successfully', data: newTokens });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ success: false, message: 'Token refresh failed', code: 'TOKEN_REFRESH_FAILED' });
  }
});

// Logout
app.post('/api/auth/logout', authenticate, async (req: any, res) => {
  try {
    if (redis) {
      try { await redis.del(`refresh_token:${req.userId}`); } 
      catch (error) { console.log('Redis error during logout:', error); }
    }
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Logout failed', code: 'LOGOUT_FAILED' });
  }
});

// Get profile
app.get('/api/auth/profile', authenticate, async (req: any, res) => {
  try {
    const { data: user, error } = await supabase.from('users').select(`
      id, firstName, lastName, email, phone, emailVerified, phoneVerified,
      dateOfBirth, gender, addressLine1, addressLine2, city, state, pincode,
      country, role, kycStatus, createdAt, lastLoginAt
    `).eq('id', req.userId).single();

    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found', code: 'USER_NOT_FOUND' });
    }

    res.status(200).json({
      success: true, message: 'Profile retrieved successfully',
      data: { user: { ...user, name: `${user.firstName} ${user.lastName}`, isAuthenticated: true } }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve profile', code: 'GET_PROFILE_FAILED' });
  }
});

// Forgot password
app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const { data: user } = await supabase.from('users').select('id, firstName, email, isActive').eq('email', email).single();

    if (!user || !user.isActive) {
      return res.status(200).json({ success: true, message: 'If the email exists, a password reset code has been sent.' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await supabase.from('otps').insert({
      userId: user.id, code: resetCode, type: 'PASSWORD_RESET',
      expiresAt: expiresAt.toISOString(), used: false, createdAt: new Date().toISOString()
    });

    res.status(200).json({
      success: true, message: 'If the email exists, a password reset code has been sent.',
      ...(process.env.NODE_ENV === 'development' && { resetCode })
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Failed to process password reset request', code: 'FORGOT_PASSWORD_FAILED' });
  }
});

// Reset password
app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Token, password, and confirmation are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match', code: 'PASSWORD_MISMATCH' });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ success: false, message: passwordValidation.message, code: 'INVALID_PASSWORD' });
    }

    const { data: otp, error } = await supabase.from('otps')
      .select('*, users!inner(*)').eq('code', token).eq('type', 'PASSWORD_RESET').eq('used', false)
      .gt('expiresAt', new Date().toISOString()).single();

    if (error || !otp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset code', code: 'INVALID_RESET_CODE' });
    }

    const passwordHash = await hashPassword(password);

    const [updateUser, updateOTP] = await Promise.all([
      supabase.from('users').update({ passwordHash, updatedAt: new Date().toISOString() }).eq('id', otp.userId),
      supabase.from('otps').update({ used: true }).eq('id', otp.id)
    ]);

    if (updateUser.error || updateOTP.error) {
      throw new Error('Failed to update password');
    }

    if (redis) {
      try { await redis.del(`refresh_token:${otp.userId}`); } 
      catch (error) { console.log('Redis error:', error); }
    }

    res.status(200).json({ success: true, message: 'Password reset successful. Please login with your new password.' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: 'Password reset failed', code: 'PASSWORD_RESET_FAILED' });
  }
});

// Change password
app.post('/api/auth/change-password', authenticate, async (req: any, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All password fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match', code: 'PASSWORD_MISMATCH' });
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ success: false, message: passwordValidation.message, code: 'INVALID_PASSWORD' });
    }

    const { data: user, error } = await supabase.from('users').select('id, email, passwordHash').eq('id', req.userId).single();

    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found', code: 'USER_NOT_FOUND' });
    }

    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect', code: 'INVALID_CURRENT_PASSWORD' });
    }

    const newPasswordHash = await hashPassword(newPassword);

    const { error: updateError } = await supabase.from('users')
      .update({ passwordHash: newPasswordHash, updatedAt: new Date().toISOString() }).eq('id', user.id);

    if (updateError) {
      throw new Error('Failed to update password');
    }

    if (redis) {
      try { await redis.del(`refresh_token:${user.id}`); } 
      catch (error) { console.log('Redis error:', error); }
    }

    res.status(200).json({ success: true, message: 'Password changed successfully. Please login again.' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, message: 'Failed to change password', code: 'CHANGE_PASSWORD_FAILED' });
  }
});

// Verify email
app.post('/api/auth/verify-email', authenticate, async (req: any, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Verification code is required' });
    }

    const { data: otp, error } = await supabase.from('otps')
      .select('*').eq('userId', req.userId).eq('code', code).eq('type', 'EMAIL_VERIFICATION')
      .eq('used', false).gt('expiresAt', new Date().toISOString()).single();

    if (error || !otp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code', code: 'INVALID_VERIFICATION_CODE' });
    }

    const [updateUser, updateOTP] = await Promise.all([
      supabase.from('users').update({ 
        emailVerified: true, emailVerifiedAt: new Date().toISOString(), updatedAt: new Date().toISOString() 
      }).eq('id', req.userId),
      supabase.from('otps').update({ used: true }).eq('id', otp.id)
    ]);

    if (updateUser.error || updateOTP.error) {
      throw new Error('Failed to verify email');
    }

    res.status(200).json({ success: true, message: 'Email verified successfully' });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ success: false, message: 'Email verification failed', code: 'EMAIL_VERIFICATION_FAILED' });
  }
});

// Send email verification
app.post('/api/auth/send-email-verification', authenticate, async (req: any, res) => {
  try {
    const { data: user, error } = await supabase.from('users').select('id, email, emailVerified').eq('id', req.userId).single();

    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await supabase.from('otps').insert({
      userId: user.id, code: verificationCode, type: 'EMAIL_VERIFICATION',
      expiresAt: expiresAt.toISOString(), used: false, createdAt: new Date().toISOString()
    });

    res.status(200).json({
      success: true, message: 'Verification code sent to your email',
      ...(process.env.NODE_ENV === 'development' && { verificationCode })
    });

  } catch (error) {
    console.error('Send email verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to send verification code', code: 'SEND_VERIFICATION_FAILED' });
  }
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found`, code: 'ROUTE_NOT_FOUND' });
});

// Export the Express app for Vercel
export default app;