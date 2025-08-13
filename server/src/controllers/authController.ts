import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { jwtService } from '../utils/jwt';
import { PasswordService } from '../utils/password';
import { logger } from '../utils/logger';
import { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema,
  changePasswordSchema 
} from '../utils/validation';
import { UserRole, KYCStatus } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse } from '../types';

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      console.log('📝 Registration attempt:', { email: req.body.email, phone: req.body.phone });
      
      // Validate request body
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        console.log('❌ Validation failed:', error.details);
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map((detail) => detail.message)
        });
        return;
      }

      const { firstName, lastName, email, phone, password, dateOfBirth, gender } = value;

      // Initialize Prisma connection with retry logic
      let connectionRetries = 3;
      while (connectionRetries > 0) {
        try {
          await prisma.$connect();
          console.log('✅ Database connected for registration');
          break;
        } catch (dbError) {
          connectionRetries--;
          console.error(`❌ Database connection attempt failed. Retries left: ${connectionRetries}`, dbError);
          if (connectionRetries === 0) {
            res.status(500).json({
              success: false,
              message: 'Database connection failed after multiple attempts',
              code: 'DB_CONNECTION_ERROR'
            });
            return;
          }
          // Wait 1 second before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Check if user already exists with enhanced error handling and debugging
      try {
        console.log('🔍 Checking user uniqueness for:', { email: email.toLowerCase(), phone });
        
        // First, let's test if we can query the users table at all
        const userCount = await prisma.user.count();
        console.log('📊 Total users in database:', userCount);
        
        // Now check for existing user
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: email.toLowerCase().trim() },
              { phone: phone.trim() }
            ]
          },
          select: {
            id: true,
            email: true,
            phone: true,
            createdAt: true
          }
        });

        if (existingUser) {
          const field = existingUser.email === email.toLowerCase() ? 'email' : 'phone number';
          console.log(`❌ User exists with ${field}:`, existingUser);
          res.status(409).json({
            success: false,
            message: `A user with this ${field} already exists. Please try logging in or use a different ${field}.`,
            code: 'USER_EXISTS'
          });
          return;
        }

        console.log('✅ User uniqueness verified - no existing user found');
      } catch (checkError) {
        console.error('❌ Error during user uniqueness check:', {
          error: checkError,
          message: checkError.message,
          stack: checkError.stack,
          code: checkError.code
        });
        
        // More specific error handling
        if (checkError.code === 'P1001') {
          res.status(500).json({
            success: false,
            message: 'Database authentication failed. Please try again.',
            code: 'DB_AUTH_ERROR'
          });
        } else if (checkError.code === 'P1017') {
          res.status(500).json({
            success: false,
            message: 'Database server connection lost. Please try again.',
            code: 'DB_CONNECTION_LOST'
          });
        } else if (checkError.message.includes('relation "users" does not exist')) {
          res.status(500).json({
            success: false,
            message: 'Database tables not properly initialized. Please contact support.',
            code: 'DB_SCHEMA_ERROR'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to verify user uniqueness. Please try again in a moment.',
            code: 'UNIQUENESS_CHECK_FAILED',
            debug: process.env.NODE_ENV === 'development' ? checkError.message : undefined
          });
        }
        return;
      }

      // Hash the password
      console.log('🔐 Hashing password...');
      const passwordHash = await PasswordService.hashPassword(password);
      console.log('✅ Password hashed successfully');

      // Create the user with proper error handling and transaction
      try {
        console.log('📝 Creating new user...');
        
        const user = await prisma.user.create({
          data: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            passwordHash,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            gender,
            role: UserRole.USER,
            kycStatus: KYCStatus.PENDING,
            emailVerified: false,
            phoneVerified: false,
            isActive: true,
            country: 'India'
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            role: true,
            kycStatus: true,
            emailVerified: true,
            phoneVerified: true,
            createdAt: true
          }
        });

        console.log('✅ User created successfully:', { id: user.id, email: user.email });

        // Generate JWT tokens
        console.log('🔑 Generating JWT tokens...');
        const tokenPair = await jwtService.generateTokenPair({
          userId: user.id,
          email: user.email,
          role: user.role
        });
        console.log('✅ JWT tokens generated successfully');

        logger.info(`New user registered successfully: ${user.email}`);

        res.status(201).json({
          success: true,
          message: 'Account created successfully! Welcome to FinBridge.',
          data: {
            user,
            ...tokenPair
          }
        });
      } catch (createError) {
        console.error('❌ Error creating user:', {
          error: createError,
          message: createError.message,
          code: createError.code
        });
        
        // Handle specific Prisma errors
        if (createError.code === 'P2002') {
          const field = createError.meta?.target?.includes('email') ? 'email' : 'phone number';
          res.status(409).json({
            success: false,
            message: `A user with this ${field} already exists. Please try logging in.`,
            code: 'USER_EXISTS'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to create account. Please try again.',
            code: 'USER_CREATION_FAILED',
            debug: process.env.NODE_ENV === 'development' ? createError.message : undefined
          });
        }
        return;
      }
    } catch (error) {
      console.error('❌ Registration failed with unexpected error:', {
        error,
        message: error.message,
        stack: error.stack
      });
      logger.error('Registration failed:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed due to server error. Please try again later.',
        code: 'INTERNAL_SERVER_ERROR',
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } finally {
      // Ensure Prisma disconnects properly
      try {
        await prisma.$disconnect();
      } catch (disconnectError) {
        console.error('Error disconnecting from database:', disconnectError);
      }
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const { email, password } = value;

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          passwordHash: true,
          role: true,
          kycStatus: true,
          isActive: true,
          isBlocked: true,
          blockedReason: true,
          lastLoginAt: true,
          createdAt: true
        }
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        });
        return;
      }

      // Check if account is active
      if (!user.isActive) {
        res.status(403).json({
          success: false,
          message: 'Account is deactivated. Please contact support.',
          code: 'ACCOUNT_DEACTIVATED'
        });
        return;
      }

      // Check if account is blocked
      if (user.isBlocked) {
        res.status(403).json({
          success: false,
          message: `Account is blocked: ${user.blockedReason}`,
          code: 'ACCOUNT_BLOCKED'
        });
        return;
      }

      // Verify password
      const isPasswordValid = await PasswordService.verifyPassword(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        });
        return;
      }

      // Update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });

      // Generate JWT tokens
      const tokenPair = await jwtService.generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      // Remove password hash from response
      const { passwordHash, ...userWithoutPassword } = user;

      logger.info(`User logged in: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: userWithoutPassword,
          ...tokenPair
        }
      });
    } catch (error) {
      logger.error('Login failed:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.',
        code: 'LOGIN_FAILED'
      });
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token is required',
          code: 'TOKEN_REQUIRED'
        });
        return;
      }

      // Refresh the tokens
      const newTokenPair = await jwtService.refreshTokens(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully',
        data: newTokenPair
      });
    } catch (error) {
      logger.error('Token refresh failed:', error);
      res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
        code: 'TOKEN_REFRESH_FAILED'
      });
    }
  }

  /**
   * Logout user
   */
  static async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // Revoke refresh token
      await jwtService.revokeRefreshToken(req.userId);

      logger.info(`User logged out: ${req.user.email}`);

      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      logger.error('Logout failed:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed. Please try again.',
        code: 'LOGOUT_FAILED'
      });
    }
  }

  /**
   * Forgot password - send reset email
   */
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const { error, value } = forgotPasswordSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const { email } = value;

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, firstName: true, email: true, isActive: true }
      });

      // Always return success to prevent email enumeration
      if (!user || !user.isActive) {
        res.status(200).json({
          success: true,
          message: 'If the email exists, a password reset link has been sent.'
        });
        return;
      }

      // Generate reset token (6-digit OTP)
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Store OTP in database
      await prisma.oTP.create({
        data: {
          userId: user.id,
          code: resetCode,
          type: 'PASSWORD_RESET',
          expiresAt
        }
      });

      // TODO: Send email with reset code
      // await emailService.sendPasswordResetEmail(user.email, resetCode);

      logger.info(`Password reset requested for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset code has been sent.',
        // In development, return the code for testing
        ...(process.env.NODE_ENV === 'development' && { resetCode })
      });
    } catch (error) {
      logger.error('Forgot password failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process password reset request.',
        code: 'FORGOT_PASSWORD_FAILED'
      });
    }
  }

  /**
   * Reset password with OTP
   */
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const { error, value } = resetPasswordSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const { token, password } = value;

      // Find and validate OTP
      const otp = await prisma.oTP.findFirst({
        where: {
          code: token,
          type: 'PASSWORD_RESET',
          used: false,
          expiresAt: { gt: new Date() }
        },
        include: { user: true }
      });

      if (!otp) {
        res.status(400).json({
          success: false,
          message: 'Invalid or expired reset code',
          code: 'INVALID_RESET_CODE'
        });
        return;
      }

      // Hash new password
      const passwordHash = await PasswordService.hashPassword(password);

      // Update user password and mark OTP as used
      await prisma.$transaction([
        prisma.user.update({
          where: { id: otp.userId },
          data: { passwordHash }
        }),
        prisma.oTP.update({
          where: { id: otp.id },
          data: { used: true }
        })
      ]);

      // Revoke all existing refresh tokens for security
      await jwtService.revokeAllUserTokens(otp.userId);

      logger.info(`Password reset successful for user: ${otp.user.email}`);

      res.status(200).json({
        success: true,
        message: 'Password reset successful. Please login with your new password.'
      });
    } catch (error) {
      logger.error('Password reset failed:', error);
      res.status(500).json({
        success: false,
        message: 'Password reset failed. Please try again.',
        code: 'PASSWORD_RESET_FAILED'
      });
    }
  }

  /**
   * Change password (authenticated)
   */
  static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // Validate request body
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      const { currentPassword, newPassword } = value;

      // Get current user with password
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, email: true, passwordHash: true }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
        return;
      }

      // Verify current password
      const isCurrentPasswordValid = await PasswordService.verifyPassword(currentPassword, user.passwordHash);
      if (!isCurrentPasswordValid) {
        res.status(400).json({
          success: false,
          message: 'Current password is incorrect',
          code: 'INVALID_CURRENT_PASSWORD'
        });
        return;
      }

      // Hash new password
      const newPasswordHash = await PasswordService.hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newPasswordHash }
      });

      // Revoke all existing refresh tokens for security
      await jwtService.revokeAllUserTokens(user.id);

      logger.info(`Password changed for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Password changed successfully. Please login again.'
      });
    } catch (error) {
      logger.error('Change password failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to change password. Please try again.',
        code: 'CHANGE_PASSWORD_FAILED'
      });
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          emailVerified: true,
          phoneVerified: true,
          dateOfBirth: true,
          gender: true,
          addressLine1: true,
          addressLine2: true,
          city: true,
          state: true,
          pincode: true,
          country: true,
          role: true,
          kycStatus: true,
          createdAt: true,
          lastLoginAt: true
        }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: { user }
      });
    } catch (error) {
      logger.error('Get profile failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile',
        code: 'GET_PROFILE_FAILED'
      });
    }
  }

  /**
   * Verify email with OTP
   */
  static async verifyEmail(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { code } = req.body;

      if (!code) {
        res.status(400).json({
          success: false,
          message: 'Verification code is required'
        });
        return;
      }

      // Find and validate OTP
      const otp = await prisma.oTP.findFirst({
        where: {
          userId: req.userId,
          code,
          type: 'EMAIL_VERIFICATION',
          used: false,
          expiresAt: { gt: new Date() }
        }
      });

      if (!otp) {
        res.status(400).json({
          success: false,
          message: 'Invalid or expired verification code',
          code: 'INVALID_VERIFICATION_CODE'
        });
        return;
      }

      // Update user email verification status and mark OTP as used
      await prisma.$transaction([
        prisma.user.update({
          where: { id: req.userId },
          data: { 
            emailVerified: true,
            emailVerifiedAt: new Date()
          }
        }),
        prisma.oTP.update({
          where: { id: otp.id },
          data: { used: true }
        })
      ]);

      logger.info(`Email verified for user: ${req.user.email}`);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      logger.error('Email verification failed:', error);
      res.status(500).json({
        success: false,
        message: 'Email verification failed',
        code: 'EMAIL_VERIFICATION_FAILED'
      });
    }
  }

  /**
   * Send email verification OTP
   */
  static async sendEmailVerification(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, email: true, emailVerified: true }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      if (user.emailVerified) {
        res.status(400).json({
          success: false,
          message: 'Email is already verified'
        });
        return;
      }

      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Store OTP in database
      await prisma.oTP.create({
        data: {
          userId: user.id,
          code: verificationCode,
          type: 'EMAIL_VERIFICATION',
          expiresAt
        }
      });

      // TODO: Send email with verification code
      // await emailService.sendEmailVerification(user.email, verificationCode);

      logger.info(`Email verification code sent to: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Verification code sent to your email',
        // In development, return the code for testing
        ...(process.env.NODE_ENV === 'development' && { verificationCode })
      });
    } catch (error) {
      logger.error('Send email verification failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send verification code',
        code: 'SEND_VERIFICATION_FAILED'
      });
    }
  }
}
