import jwt from 'jsonwebtoken';
import { logger } from './logger';
import { redisService } from '../config/redis';
import { JWTPayload, TokenPair } from '../types';

export { JWTPayload, TokenPair };

class JWTService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;
  private accessTokenExpiry: string;
  private refreshTokenExpiry: string;

  constructor() {
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET!;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;
    this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

    if (!this.accessTokenSecret || !this.refreshTokenSecret) {
      throw new Error('JWT secrets not configured');
    }
  }

  generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    try {
      return jwt.sign(payload, this.accessTokenSecret, {
        expiresIn: this.accessTokenExpiry,
        issuer: 'finbridge',
        audience: 'finbridge-users',
      });
    } catch (error) {
      logger.error('Error generating access token:', error);
      throw new Error('Failed to generate access token');
    }
  }

  generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    try {
      return jwt.sign(payload, this.refreshTokenSecret, {
        expiresIn: this.refreshTokenExpiry,
        issuer: 'finbridge',
        audience: 'finbridge-users',
      });
    } catch (error) {
      logger.error('Error generating refresh token:', error);
      throw new Error('Failed to generate refresh token');
    }
  }

  async generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<TokenPair> {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // Store refresh token in Redis
    const refreshTokenKey = `refresh_token:${payload.userId}`;
    await redisService.set(refreshTokenKey, refreshToken, 7 * 24 * 60 * 60); // 7 days

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.accessTokenSecret, {
        issuer: 'finbridge',
        audience: 'finbridge-users',
      }) as JWTPayload;
    } catch (error) {
      logger.error('Access token verification failed:', error);
      throw new Error('Invalid access token');
    }
  }

  verifyRefreshToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.refreshTokenSecret, {
        issuer: 'finbridge',
        audience: 'finbridge-users',
      }) as JWTPayload;
    } catch (error) {
      logger.error('Refresh token verification failed:', error);
      throw new Error('Invalid refresh token');
    }
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = this.verifyRefreshToken(refreshToken);
      
      // Check if refresh token exists in Redis
      const storedToken = await redisService.get(`refresh_token:${payload.userId}`);
      if (storedToken !== refreshToken) {
        throw new Error('Refresh token not found or invalid');
      }

      // Generate new token pair
      const newTokenPair = await this.generateTokenPair({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      });

      return newTokenPair;
    } catch (error) {
      logger.error('Token refresh failed:', error);
      throw new Error('Failed to refresh tokens');
    }
  }

  async revokeRefreshToken(userId: string): Promise<void> {
    try {
      await redisService.del(`refresh_token:${userId}`);
      logger.info(`Refresh token revoked for user: ${userId}`);
    } catch (error) {
      logger.error('Failed to revoke refresh token:', error);
      throw new Error('Failed to revoke refresh token');
    }
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    try {
      // In a production system, you might want to maintain a blacklist
      // For now, we'll just remove the refresh token
      await this.revokeRefreshToken(userId);
      
      // Add access token to blacklist if needed
      // This would require maintaining a blacklist in Redis
      logger.info(`All tokens revoked for user: ${userId}`);
    } catch (error) {
      logger.error('Failed to revoke all user tokens:', error);
      throw new Error('Failed to revoke user tokens');
    }
  }

  extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as JWTPayload;
      if (!decoded || !decoded.exp) {
        return true;
      }
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }

  getTokenPayload(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      logger.error('Failed to decode token:', error);
      return null;
    }
  }
}

export const jwtService = new JWTService();
