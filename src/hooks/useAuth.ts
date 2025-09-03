import { useState, useEffect } from 'react';
import { User, RegisterData, LoginCredentials, ApiResponse } from '../types';
import { nullToUndefined } from '../utils/typeHelpers';

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    console.log('🚀 AuthService using API URL:', this.baseURL);
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

      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('❌ API Request failed:', error);
      throw error;
    }
  }

  private cleanUserData(user: any): User {
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
      country: cleanedUser.country || 'India',
      createdAt: cleanedUser.createdAt || new Date().toISOString(),
      lastLoginAt: cleanedUser.lastLoginAt,
      name: `${cleanedUser.firstName || ''} ${cleanedUser.lastName || ''}`.trim(),
      isAuthenticated: true,
      portfolio: {
        totalInvestment: cleanedUser.portfolio?.totalInvestment || 200000,
        currentValue: cleanedUser.portfolio?.currentValue || 225000,
        totalGains: cleanedUser.portfolio?.totalGains || 25000,
        activeLoans: cleanedUser.portfolio?.activeLoans || 1,
        insurancePolicies: cleanedUser.portfolio?.insurancePolicies || 3,
        ...cleanedUser.portfolio
      }
    };
  }

  async register(userData: RegisterData): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const response = await this.makeRequest<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      localStorage.setItem('finbridge_access_token', response.data.accessToken);
      localStorage.setItem('finbridge_refresh_token', response.data.refreshToken);
      
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
      localStorage.setItem('finbridge_access_token', response.data.accessToken);
      localStorage.setItem('finbridge_refresh_token', response.data.refreshToken);
      
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = authService.getStoredUser();
        const storedToken = authService.getStoredToken();

        if (storedUser && storedToken) {
          if (authService.isTokenExpired(storedToken)) {
            try {
              await authService.refreshToken();
              setUser(storedUser);
              setIsAuthenticated(true);
            } catch (error) {
              await authService.logout();
              setUser(null);
              setIsAuthenticated(false);
            }
          } else {
            setUser(storedUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setUser(null);
        setIsAuthenticated(false);
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
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      setUser(response.user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
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
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset request failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword(email, newPassword);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // This would need to be implemented in AuthService
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password change failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (): Promise<void> => {
    // Implementation would go here
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Implementation would go here
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Email verification failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailVerification = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Implementation would go here
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification email';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
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
