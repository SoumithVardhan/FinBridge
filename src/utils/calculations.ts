import { EMICalculation, SIPCalculation } from '../types';

export const calculateEMI = (
  loanAmount: number,
  tenure: number,
  interestRate: number
): EMICalculation => {
  const P = loanAmount;
  const r = interestRate / (12 * 100);
  const n = tenure * 12;
  
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - P;
  
  return {
    loanAmount,
    tenure,
    interestRate,
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
  };
};

export const calculateSIP = (
  monthlyInvestment: number,
  tenure: number,
  expectedReturn: number
): SIPCalculation => {
  const P = monthlyInvestment;
  const r = expectedReturn / (12 * 100);
  const n = tenure * 12;
  
  const maturityAmount = P * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
  const totalInvestment = P * n;
  const totalGains = maturityAmount - totalInvestment;
  
  return {
    monthlyInvestment,
    tenure,
    expectedReturn,
    maturityAmount: Math.round(maturityAmount),
    totalInvestment: Math.round(totalInvestment),
    totalGains: Math.round(totalGains),
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};