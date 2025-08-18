import React, { useState } from 'react';
import { 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Calculator, 
  Target,
  BarChart3,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  ArrowUpRight,
  Building2,
  Percent,
  Calendar,
  Star
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const InvestmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mutual-funds');

  const investmentOptions = [
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      icon: TrendingUp,
      description: 'Professionally managed investment solutions',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'fixed-deposits',
      title: 'Fixed Deposits',
      icon: PiggyBank,
      description: 'Secure returns with guaranteed capital protection',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'calculators',
      title: 'Investment Calculators',
      icon: Calculator,
      description: 'Plan your investments with precision',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const mutualFundCategories = [
    {
      type: 'Equity Funds',
      risk: 'High',
      returns: '12-15%*',
      description: 'Growth-oriented funds investing in stocks',
      color: 'bg-red-100 text-red-600',
      icon: TrendingUp,
      features: ['High growth potential', 'Long-term wealth creation', 'Tax-efficient', 'Professional management']
    },
    {
      type: 'Debt Funds',
      risk: 'Low-Medium',
      returns: '7-9%*',
      description: 'Stable returns through fixed-income securities',
      color: 'bg-blue-100 text-blue-600',
      icon: Shield,
      features: ['Stable returns', 'Lower volatility', 'Short to medium term', 'Better than FDs']
    },
    {
      type: 'Hybrid Funds',
      risk: 'Medium',
      returns: '9-12%*',
      description: 'Balanced portfolio of equity and debt',
      color: 'bg-purple-100 text-purple-600',
      icon: BarChart3,
      features: ['Balanced approach', 'Diversified portfolio', 'Moderate risk', 'Suitable for all goals']
    },
    {
      type: 'ELSS Funds',
      risk: 'High',
      returns: '12-15%*',
      description: 'Tax-saving equity funds with 3-year lock-in',
      color: 'bg-green-100 text-green-600',
      icon: Award,
      features: ['Tax savings up to ₹1.5L', '3-year lock-in', 'Wealth creation', 'Section 80C benefits']
    }
  ];

  const renderMutualFunds = () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Your Investment Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mutualFundCategories.map((fund, index) => {
            const Icon = fund.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${fund.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{fund.type}</h4>
                      <p className="text-sm text-gray-600">{fund.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{fund.returns}</div>
                    <div className="text-xs text-gray-500">Expected Returns</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {fund.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                  Start SIP
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Changed to red theme */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Grow Your Wealth Smartly
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Explore a wide range of investment options from mutual funds to fixed deposits. 
            Start your wealth creation journey with expert guidance and smart tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-3 font-semibold border border-red-200">
              Start Investing
            </Button>
            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold">
              Free Portfolio Review
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Options Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {investmentOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`flex items-center px-6 py-4 rounded-lg font-medium transition-all ${
                    activeTab === option.id
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{option.title}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'mutual-funds' && renderMutualFunds()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentsPage;