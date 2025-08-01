import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { calculateEMI, formatCurrency } from '../../utils/calculations';
import Card from '../UI/Card';

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [result, setResult] = useState(calculateEMI(1000000, 20, 8.5));

  useEffect(() => {
    setResult(calculateEMI(loanAmount, tenure, interestRate));
  }, [loanAmount, tenure, interestRate]);

  return (
    <div className="bg-gradient-to-br from-primary-600 to-purple-700 rounded-3xl p-8 text-white">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
          <Calculator className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold mb-2">EMI Calculator</h3>
        <p className="text-primary-100">Calculate your monthly payments instantly</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              Loan Amount: {formatCurrency(loanAmount)}
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-primary-200 mt-1">
              <span>₹1L</span>
              <span>₹1Cr</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">
              Tenure: {tenure} Years
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-primary-200 mt-1">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">
              Interest Rate: {interestRate}%
            </label>
            <input
              type="range"
              min="6"
              max="18"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-primary-200 mt-1">
              <span>6%</span>
              <span>18%</span>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-6">Your Monthly EMI</h4>
            <div className="text-4xl lg:text-5xl font-bold mb-6 text-yellow-300">
              {formatCurrency(result.emi)}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/20">
                <span className="text-sm opacity-90">Principal Amount</span>
                <span className="font-semibold">{formatCurrency(result.loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/20">
                <span className="text-sm opacity-90">Total Interest</span>
                <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm opacity-90">Total Amount</span>
                <span className="font-semibold text-yellow-300">{formatCurrency(result.totalAmount)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EMICalculator;