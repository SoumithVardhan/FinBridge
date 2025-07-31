import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { calculateSIP, formatCurrency } from '../../utils/calculations';
import Card from '../UI/Card';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [tenure, setTenure] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [result, setResult] = useState(calculateSIP(5000, 10, 12));

  useEffect(() => {
    setResult(calculateSIP(monthlyInvestment, tenure, expectedReturn));
  }, [monthlyInvestment, tenure, expectedReturn]);

  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-3xl p-8 text-white">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold mb-2">SIP Calculator</h3>
        <p className="text-purple-100">Plan your systematic investment journey</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              Monthly Investment: {formatCurrency(monthlyInvestment)}
            </label>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-purple-200 mt-1">
              <span>₹500</span>
              <span>₹1L</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">
              Investment Period: {tenure} Years
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-purple-200 mt-1">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">
              Expected Return: {expectedReturn}% p.a.
            </label>
            <input
              type="range"
              min="8"
              max="20"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-purple-200 mt-1">
              <span>8%</span>
              <span>20%</span>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-6">Maturity Value</h4>
            <div className="text-4xl lg:text-5xl font-bold mb-6 text-yellow-300">
              {formatCurrency(result.maturityAmount)}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/20">
                <span className="text-sm opacity-90">Total Investment</span>
                <span className="font-semibold">{formatCurrency(result.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/20">
                <span className="text-sm opacity-90">Total Gains</span>
                <span className="font-semibold text-green-300">{formatCurrency(result.totalGains)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm opacity-90">Return %</span>
                <span className="font-semibold text-yellow-300">
                  {((result.totalGains / result.totalInvestment) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default SIPCalculator;