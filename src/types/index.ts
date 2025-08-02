export interface LoanType {
  id: string;
  name: string;
  icon: string;
  rate: string;
  description: string;
  features: string[];
  eligibility: string[];
}

export interface InsuranceType {
  id: string;
  name: string;
  icon: string;
  coverage: string;
  description: string;
  plans: string[];
  benefits: string[];
}

export interface MutualFund {
  id: string;
  name: string;
  category: string;
  returns: string;
  risk: 'Low' | 'Medium' | 'High';
  minInvestment: number;
  description: string;
}

// Updated User interface to match backend schema
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name?: string | undefined; // Computed property for backward compatibility
  email: string;
  phone: string;
  role: string;
  kycStatus: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'INCOMPLETE';
  emailVerified: boolean;
  phoneVerified: boolean;
  dateOfBirth?: string | undefined;
  gender?: string | undefined;
  addressLine1?: string | undefined;
  addressLine2?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  pincode?: string | undefined;
  country?: string | undefined;
  createdAt: string;
  lastLoginAt?: string | undefined;
  isAuthenticated?: boolean | undefined; // For frontend compatibility
  portfolio?: {
    totalInvestment: number;
    currentValue: number;
    totalGains: number;
    activeLoans: number;
    insurancePolicies: number;
  } | undefined;
}

// Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data interface
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string | undefined;
  gender?: string | undefined;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface EMICalculation {
  loanAmount: number;
  tenure: number;
  interestRate: number;
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

export interface SIPCalculation {
  monthlyInvestment: number;
  tenure: number;
  expectedReturn: number;
  maturityAmount: number;
  totalInvestment: number;
  totalGains: number;
}

// API Response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  code?: string;
}

// KYC Status type
export type KYCStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'INCOMPLETE';

// User Role type
export type UserRole = 'USER' | 'ADMIN' | 'KYC_OFFICER' | 'LOAN_OFFICER' | 'SUPPORT';
