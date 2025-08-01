import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAuthenticated: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  portfolio?: {
    totalInvestment: number;
    currentValue: number;
    totalGains: number;
    activeLoans: number;
    insurancePolicies: number;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const [user, setUser] = useLocalStorage<User | null>('finbridge_user', null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock user database
  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      password: 'password123',
      kycStatus: 'verified' as const,
      portfolio: {
        totalInvestment: 250000,
        currentValue: 285750,
        totalGains: 35750,
        activeLoans: 2,
        insurancePolicies: 3
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      password: 'password123',
      kycStatus: 'pending' as const,
      portfolio: {
        totalInvestment: 150000,
        currentValue: 165000,
        totalGains: 15000,
        activeLoans: 1,
        insurancePolicies: 2
      }
    }
  ];

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!foundUser) {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }

      const { password, ...userWithoutPassword } = foundUser;
      setUser({
        ...userWithoutPassword,
        isAuthenticated: true
      });

      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        setError('User with this email already exists');
        setIsLoading(false);
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        isAuthenticated: true,
        kycStatus: 'pending' as const,
        portfolio: {
          totalInvestment: 0,
          currentValue: 0,
          totalGains: 0,
          activeLoans: 0,
          insurancePolicies: 0
        }
      };

      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Registration failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(u => u.email === email);
      if (!foundUser) {
        setError('No account found with this email address');
        setIsLoading(false);
        return false;
      }

      // In real implementation, send password reset email
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    updateProfile,
    isAuthenticated: !!user?.isAuthenticated
  };
};