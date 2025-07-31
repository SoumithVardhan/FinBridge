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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAuthenticated: boolean;
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