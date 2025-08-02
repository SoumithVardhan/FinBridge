import { Request, Response, NextFunction } from 'express';
import { jwtService, JWTPayload } from '../utils/jwt';
import { logger } from '../utils/logger';
import { UserRole } from '@prisma/client';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
      userId?: string;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: JWTPayload;
  userId: string;
  body: any;
}

/**
 * Middleware to authenticate requests using JWT tokens
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = jwtService.extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token required',
        code: 'TOKEN_MISSING'
      });
      return;
    }

    // Verify the access token
    const payload = jwtService.verifyAccessToken(token);
    
    // Add user information to request
    req.user = payload;
    req.userId = payload.userId;

    logger.debug(`User authenticated: ${payload.userId}`);
    next();
  } catch (error) {
    logger.error('Authentication failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        res.status(401).json({
          success: false,
          message: 'Access token expired',
          code: 'TOKEN_EXPIRED'
        });
      } else if (error.message.includes('invalid')) {
        res.status(401).json({
          success: false,
          message: 'Invalid access token',
          code: 'TOKEN_INVALID'
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Authentication failed',
          code: 'AUTH_FAILED'
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Authentication failed',
        code: 'AUTH_FAILED'
      });
    }
  }
};

/**
 * Middleware to authorize requests based on user roles
 */
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
          code: 'AUTH_REQUIRED'
        });
        return;
      }

      const userRole = req.user.role as UserRole;
      
      if (!allowedRoles.includes(userRole)) {
        logger.warn(`Authorization failed for user ${req.user.userId}: role ${userRole} not in ${allowedRoles}`);
        res.status(403).json({
          success: false,
          message: 'Insufficient permissions',
          code: 'INSUFFICIENT_PERMISSIONS'
        });
        return;
      }

      logger.debug(`User authorized: ${req.user.userId} with role: ${userRole}`);
      next();
    } catch (error) {
      logger.error('Authorization failed:', error);
      res.status(403).json({
        success: false,
        message: 'Authorization failed',
        code: 'AUTH_FAILED'
      });
    }
  };
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = jwtService.extractTokenFromHeader(authHeader);

    if (token) {
      const payload = jwtService.verifyAccessToken(token);
      req.user = payload;
      req.userId = payload.userId;
    }

    next();
  } catch (error) {
    // Silently ignore authentication errors for optional auth
    logger.debug('Optional authentication failed, continuing without auth:', error);
    next();
  }
};

/**
 * Middleware to ensure user can only access their own resources
 */
export const ensureOwnership = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    // Check if user is admin (admins can access any resource)
    if (req.user.role === UserRole.ADMIN) {
      next();
      return;
    }

    // Get user ID from route parameters or request body
    const resourceUserId = req.params.userId || req.body.userId;
    
    if (resourceUserId && resourceUserId !== req.user.userId) {
      logger.warn(`Ownership check failed: user ${req.user.userId} trying to access resource of user ${resourceUserId}`);
      res.status(403).json({
        success: false,
        message: 'Access denied: You can only access your own resources',
        code: 'OWNERSHIP_DENIED'
      });
      return;
    }

    next();
  } catch (error) {
    logger.error('Ownership check failed:', error);
    res.status(403).json({
      success: false,
      message: 'Access denied',
      code: 'ACCESS_DENIED'
    });
  }
};

/**
 * Middleware to check if user's account is active
 */
export const ensureActiveAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    // In a real implementation, you might want to check the database
    // For now, we'll assume the JWT contains current information
    // This could be enhanced to check user status from database

    next();
  } catch (error) {
    logger.error('Account status check failed:', error);
    res.status(403).json({
      success: false,
      message: 'Account access denied',
      code: 'ACCOUNT_DENIED'
    });
  }
};
