// Complete FinBridge API for Vercel with all original endpoints
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import Redis from 'ioredis';

const app = express();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://dtznychatpfevjjwpmjy.supabase.co',
  process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_supabase_key'
);

// Initialize Redis client (Upstash)
let redis: Redis;
try {
  redis = new Redis(process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || 'redis://localhost:6379');
} catch (error) {
  console.log('Redis connection failed, running without Redis');
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
  windowMs,
  max,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = createRateLimit(15 * 60 * 1000, 5); // 15 minutes, 5 requests
const generalLimiter = createRateLimit(15 * 60 * 1000, 100); // 15 minutes, 100 requests

// Utility functions
const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// JWT token generation with explicit typing
const generateTokens = (userId: string, email: string, role: string = 'USER') => {
  const payload = { userId, email, role };
  const accessSecret = process.env.JWT_ACCESS_SECRET || 'access_secret';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
  
  try {
    // Generate access token (15 minutes)
    const accessToken = (jwt as any).sign(payload, accessSecret, { expiresIn: '15m' });
    
    // Generate refresh token (7 days)
    const refreshToken = (jwt as any).sign(payload, refreshSecret, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('JWT generation error:', error);
    throw new Error('Failed to generate tokens');
  }
};

const verifyToken = (token: string, secret: string): any => {
  try {
    return (jwt as any).verify(token, secret);
  } catch (error) {
    return null;
  }
};

// Authentication middleware
const authenticate = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET || 'access_secret') as any;
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      });
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    const { data: dbTest, error: dbError } = await supabase.from('User').select('count').limit(1);
    const databaseHealthy = !dbError;

    // Test Redis connection
    let redisHealthy = false;
    try {
      if (redis) {
        await redis.ping();
        redisHealthy = true;
      }
    } catch (error) {
      redisHealthy = false;
    }

    res.status(200).json({
      success: true,
      message: 'FinBridge API is healthy',
      services: {
        database: databaseHealthy,
        redis: redisHealthy
      },
      environment: process.env.NODE_ENV || 'production',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Basic API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'FinBridge API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    endpoints: {
      auth: '/api/auth/*',
      health: '/api/health',
      docs: '/api/docs'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to FinBridge API',
    health: '/api/health',
    docs: '/api/docs'
  });
});

// AUTH ENDPOINTS

// Register endpoint
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword, dateOfBirth, gender } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
        code: 'MISSING_FIELDS'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
        code: 'PASSWORD_MISMATCH'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
        code: 'WEAK_PASSWORD'
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('User')
      .select('email, phone')
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single();

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'phone number';
      return res.status(409).json({
        success: false,
        message: `User with this ${field} already exists`,
        code: 'USER_EXISTS'
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const { data: user, error } = await supabase
      .from('User')
      .insert({
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        dateOfBirth: dateOfBirth || null,
        gender: gender || null,
        role: 'USER',
        kycStatus: 'PENDING',
        emailVerified: false,
        phoneVerified: false,
        isActive: true,
        isBlocked: false,
        createdAt: new Date().toISOString(),
        country: 'India'
      })
      .select('id, firstName, lastName, email, phone, role, kycStatus, emailVerified, phoneVerified, createdAt')
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create user account',
        code: 'REGISTRATION_FAILED'
      });
    }

    // Generate tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    // Store refresh token in Redis if available
    if (redis) {
      try {
        await redis.setex(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, tokens.refreshToken);
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          isAuthenticated: true
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Login endpoint
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }

    // Find user by email
    const { data: user, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check if account is active and not blocked
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: `Account is blocked: ${user.blockedReason || 'Contact support'}`,
        code: 'ACCOUNT_BLOCKED'
      });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Update last login time
    await supabase
      .from('User')
      .update({ lastLoginAt: new Date().toISOString() })
      .eq('id', user.id);

    // Generate tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    // Store refresh token in Redis
    if (redis) {
      try {
        await redis.setex(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, tokens.refreshToken);
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          ...userWithoutPassword,
          name: `${user.firstName} ${user.lastName}`,
          isAuthenticated: true
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Refresh token endpoint
app.post('/api/auth/refresh', generalLimiter, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
        code: 'TOKEN_REQUIRED'
      });
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as any;
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }

    // Check if token exists in Redis
    if (redis) {
      try {
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
        if (storedToken !== refreshToken) {
          return res.status(401).json({
            success: false,
            message: 'Refresh token not found or expired',
            code: 'TOKEN_NOT_FOUND'
          });
        }
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    // Generate new tokens
    const newTokens = generateTokens(decoded.userId, decoded.email, decoded.role);

    // Update refresh token in Redis
    if (redis) {
      try {
        await redis.setex(`refresh_token:${decoded.userId}`, 7 * 24 * 60 * 60, newTokens.refreshToken);
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Tokens refreshed successfully',
      data: newTokens
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      message: 'Token refresh failed',
      code: 'TOKEN_REFRESH_FAILED'
    });
  }
});

// Logout endpoint
app.post('/api/auth/logout', authenticate, async (req: any, res) => {
  try {
    // Remove refresh token from Redis
    if (redis) {
      try {
        await redis.del(`refresh_token:${req.userId}`);
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      code: 'LOGOUT_FAILED'
    });
  }
});

// Get profile endpoint
app.get('/api/auth/profile', authenticate, async (req: any, res) => {
  try {
    const { data: user, error } = await supabase
      .from('User')
      .select(`
        id, firstName, lastName, email, phone, emailVerified, phoneVerified,
        dateOfBirth, gender, addressLine1, addressLine2, city, state, pincode,
        country, role, kycStatus, createdAt, lastLoginAt
      `)
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: {
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          isAuthenticated: true
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      code: 'GET_PROFILE_FAILED'
    });
  }
});

// Forgot password endpoint
app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const { data: user } = await supabase
      .from('User')
      .select('id, firstName, email, isActive')
      .eq('email', email)
      .single();

    // Always return success to prevent email enumeration
    if (!user || !user.isActive) {
      return res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset code has been sent.'
      });
    }

    // Generate reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store OTP in database
    await supabase
      .from('OTP')
      .insert({
        userId: user.id,
        code: resetCode,
        type: 'PASSWORD_RESET',
        expiresAt: expiresAt.toISOString(),
        used: false
      });

    res.status(200).json({
      success: true,
      message: 'If the email exists, a password reset code has been sent.',
      // In development, return the code for testing
      ...(process.env.NODE_ENV === 'development' && { resetCode })
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request',
      code: 'FORGOT_PASSWORD_FAILED'
    });
  }
});

// Reset password endpoint
app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token, password, and confirmation are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
        code: 'PASSWORD_MISMATCH'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
        code: 'WEAK_PASSWORD'
      });
    }

    // Find and validate OTP
    const { data: otp, error } = await supabase
      .from('OTP')
      .select('*, User!inner(*)')
      .eq('code', token)
      .eq('type', 'PASSWORD_RESET')
      .eq('used', false)
      .gt('expiresAt', new Date().toISOString())
      .single();

    if (error || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code',
        code: 'INVALID_RESET_CODE'
      });
    }

    // Hash new password
    const passwordHash = await hashPassword(password);

    // Update user password and mark OTP as used
    const [updateUser, updateOTP] = await Promise.all([
      supabase
        .from('User')
        .update({ passwordHash })
        .eq('id', otp.userId),
      supabase
        .from('OTP')
        .update({ used: true })
        .eq('id', otp.id)
    ]);

    if (updateUser.error || updateOTP.error) {
      throw new Error('Failed to update password');
    }

    // Revoke all existing refresh tokens
    if (redis) {
      try {
        await redis.del(`refresh_token:${otp.userId}`);
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successful. Please login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
      code: 'PASSWORD_RESET_FAILED'
    });
  }
});

// Change password endpoint
app.post('/api/auth/change-password', authenticate, async (req: any, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All password fields are required'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match',
        code: 'PASSWORD_MISMATCH'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
        code: 'WEAK_PASSWORD'
      });
    }

    // Get current user with password
    const { data: user, error } = await supabase
      .from('User')
      .select('id, email, passwordHash')
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
        code: 'INVALID_CURRENT_PASSWORD'
      });
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password
    const { error: updateError } = await supabase
      .from('User')
      .update({ passwordHash: newPasswordHash })
      .eq('id', user.id);

    if (updateError) {
      throw new Error('Failed to update password');
    }

    // Revoke all existing refresh tokens
    if (redis) {
      try {
        await redis.del(`refresh_token:${user.id}`);
      } catch (error) {
        console.log('Redis error:', error);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Password changed successfully. Please login again.'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      code: 'CHANGE_PASSWORD_FAILED'
    });
  }
});

// Email verification endpoints
app.post('/api/auth/verify-email', authenticate, async (req: any, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Verification code is required'
      });
    }

    // Find and validate OTP
    const { data: otp, error } = await supabase
      .from('OTP')
      .select('*')
      .eq('userId', req.userId)
      .eq('code', code)
      .eq('type', 'EMAIL_VERIFICATION')
      .eq('used', false)
      .gt('expiresAt', new Date().toISOString())
      .single();

    if (error || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
        code: 'INVALID_VERIFICATION_CODE'
      });
    }

    // Update user email verification status and mark OTP as used
    const [updateUser, updateOTP] = await Promise.all([
      supabase
        .from('User')
        .update({ 
          emailVerified: true,
          emailVerifiedAt: new Date().toISOString()
        })
        .eq('id', req.userId),
      supabase
        .from('OTP')
        .update({ used: true })
        .eq('id', otp.id)
    ]);

    if (updateUser.error || updateOTP.error) {
      throw new Error('Failed to verify email');
    }

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed',
      code: 'EMAIL_VERIFICATION_FAILED'
    });
  }
});

app.post('/api/auth/send-email-verification', authenticate, async (req: any, res) => {
  try {
    const { data: user, error } = await supabase
      .from('User')
      .select('id, email, emailVerified')
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store OTP in database
    await supabase
      .from('OTP')
      .insert({
        userId: user.id,
        code: verificationCode,
        type: 'EMAIL_VERIFICATION',
        expiresAt: expiresAt.toISOString(),
        used: false
      });

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your email',
      // In development, return the code for testing
      ...(process.env.NODE_ENV === 'development' && { verificationCode })
    });

  } catch (error) {
    console.error('Send email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send verification code',
      code: 'SEND_VERIFICATION_FAILED'
    });
  }
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND'
  });
});

// Export the Express app for Vercel
export default app;
