import { useState, useEffect } from 'react';
import { User, RegisterData, LoginCredentials, ApiResponse } from '../types';
import { nullToUndefined } from '../utils/typeHelpers';

class AuthService {
  private baseURL: string;

  constructor() {
    // Force local development - NO PRODUCTION FALLBACK
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    
    console.log('🚀 AuthService using API URL:', this.baseURL);
    
    // Warn if still pointing to production
    if (this.baseURL.includes('vercel.app')) {
      console.warn('⚠️ WARNING: Still using production API! Check your environment variables.');
      console.warn('⚠️ Expected: http://localhost:5001/api');
      console.warn('⚠️ Current VITE_API_URL:', import.meta.env.VITE_API_URL);
    } else {
      console.log('✅ Using local Docker API correctly');
    }
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = localStorage.getItem('finbridge_access_token');

      const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }

      console.log(`🔗 Making request to: ${url}`, {
        method: options.method || 'GET',
        headers: defaultHeaders
      });

      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      console.log(`📡 Response status: ${response.status}`, response);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('API Request failed:', {
        endpoint,
        baseURL: this.baseURL,
        error: errorMessage
      });
      throw error;
    }
  }

  private cleanUserData(user: any): User {
    // Convert null values to undefined and add computed properties
    const cleanedUser = nullToUndefined(user);
    return {
      id: cleanedUser.id || '',
      firstName: cleanedUser.firstName || '',
      lastName: cleanedUser.lastName || '',
      email: cleanedUser.email || '',
      phone: cleanedUser.phone || '',
      role: cleanedUser.role || 'USER',
      kycStatus: cleanedUser.kycStatus || 'PENDING',
      emailVerified: cleanedUser.emailVerified || false,
      phoneVerified: cleanedUser.phoneVerified || false,
      dateOfBirth: cleanedUser.dateOfBirth,
      gender: cleanedUser.gender,
      addressLine1: cleanedUser.addressLine1,
      addressLine2: cleanedUser.addressLine2,
      city: cleanedUser.city,
      state: cleanedUser.state,
      pincode: cleanedUser.pincode,
      country: cleanedUser.country,
      createdAt: cleanedUser.createdAt || new Date().toISOString(),
      lastLoginAt: cleanedUser.lastLoginAt,
      name: `${cleanedUser.firstName || ''} ${cleanedUser.lastName || ''}`.trim(),
      isAuthenticated: true,
      portfolio: cleanedUser.portfolio
    };
  }

  async register(userData: RegisterData): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const response = await this.makeRequest<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      // Store tokens
      localStorage.setItem('finbridge_access_token', response.data.accessToken);
      localStorage.setItem('finbridge_refresh_token', response.data.refreshToken);
      
      // Clean user data and add computed properties
      const userWithName = this.cleanUserData(response.data.user);
      
      localStorage.setItem('finbridge_user', JSON.stringify(userWithName));
      return { ...response.data, user: userWithName };
    }

    throw new Error(response.message || 'Registration failed');
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const response = await this.makeRequest<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      // Store tokens
      localStorage.setItem('finbridge_access_token', response.data.accessToken);
      localStorage.setItem('finbridge_refresh_token', response.data.refreshToken);
      
      // Clean user data and add computed properties
      const userWithName = this.cleanUserData(response.data.user);
      
      localStorage.setItem('finbridge_user', JSON.stringify(userWithName));
      return { ...response.data, user: userWithName };
    }

    throw new Error(response.message || 'Login failed');
  }

  async logout(): Promise<void> {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('finbridge_access_token');
      localStorage.removeItem('finbridge_refresh_token');
      localStorage.removeItem('finbridge_user');
    }
  }

  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem('finbridge_refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.makeRequest<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.data) {
      localStorage.setItem('finbridge_access_token', response.data.accessToken);
      localStorage.setItem('finbridge_refresh_token', response.data.refreshToken);
      return response.data;
    }

    throw new Error(response.message || 'Token refresh failed');
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await this.makeRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Password reset request failed');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await this.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ 
        token, 
        password, 
        confirmPassword: password 
      }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Password reset failed');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await this.makeRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ 
        currentPassword, 
        newPassword, 
        confirmPassword: newPassword 
      }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Password change failed');
    }
  }

  async getProfile(): Promise<User> {
    const response = await this.makeRequest<{ user: User }>('/auth/profile');

    if (response.success && response.data) {
      const userWithName = this.cleanUserData(response.data.user);
      localStorage.setItem('finbridge_user', JSON.stringify(userWithName));
      return userWithName;
    }

    throw new Error(response.message || 'Failed to get profile');
  }

  async verifyEmail(code: string): Promise<void> {
    const response = await this.makeRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  async sendEmailVerification(): Promise<void> {
    const response = await this.makeRequest('/auth/send-email-verification', {
      method: 'POST',
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to send verification email');
    }
  }

  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('finbridge_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
      return null;
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem('finbridge_access_token');
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch (error) {
      return true;
    }
  }
}

const authService = new AuthService();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = authService.getStoredUser();
      const storedToken = authService.getStoredToken();

      if (storedUser && storedToken) {
        // Check if token is expired
        if (authService.isTokenExpired(storedToken)) {
          try {
            // Try to refresh token
            await authService.refreshToken();
            setUser(storedUser);
            setIsAuthenticated(true);
          } catch (error) {
            // Refresh failed, clear auth state
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      let userFriendlyMessage = 'Registration failed. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('already exists')) {
          userFriendlyMessage = 'This email is already registered. Try logging in or use a different email.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          userFriendlyMessage = 'Connection problem. Please check your internet and try again.';
        } else if (err.message.includes('validation') || err.message.includes('required')) {
          userFriendlyMessage = 'Please check your information and try again.';
        } else if (err.message.includes('timeout')) {
          userFriendlyMessage = 'Registration is taking longer than expected. Please try again.';
        } else {
          userFriendlyMessage = err.message || 'Registration failed. Please try again.';
        }
      }
      
      setError(userFriendlyMessage);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(email);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset request failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // For now, we'll use the email as token since the frontend expects this signature
      // In a real implementation, you'd get the token from the email link
      await authService.resetPassword(email, newPassword);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.changePassword(currentPassword, newPassword);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password change failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (): Promise<void> => {
    try {
      const updatedUser = await authService.getProfile();
      setUser(updatedUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
    }
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyEmail(code);
      await updateProfile(); // Refresh user data
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Email verification failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  const sendEmailVerification = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.sendEmailVerification();
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification email';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    verifyEmail,
    sendEmailVerification,
  };
};
