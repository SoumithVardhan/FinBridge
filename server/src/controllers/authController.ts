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
      // Validate request body
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map((detail) => detail.message)
        });
        return;
      }

      const { firstName, lastName, email, phone, password, dateOfBirth, gender } = value;

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }]
        }
      });

      if (existingUser) {
        const field = existingUser.email === email ? 'email' : 'phone number';
        res.status(409).json({
          success: false,
          message: `User with this ${field} already exists`,
          code: 'USER_EXISTS'
        });
        return;
      }

      // Hash the password
      const passwordHash = await PasswordService.hashPassword(password);

      // Create the user
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          passwordHash,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
          role: UserRole.USER,
          kycStatus: KYCStatus.PENDING
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          kycStatus: true,
          createdAt: true
        }
      });

      // Generate JWT tokens
      const tokenPair = await jwtService.generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      logger.info(`New user registered: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user,
          ...tokenPair
        }
      });
    } catch (error) {
      logger.error('Registration failed:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed. Please try again.',
        code: 'REGISTRATION_FAILED'
      });
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
