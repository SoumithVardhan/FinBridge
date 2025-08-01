import React from 'react';
import { TrendingUp, BarChart3, PieChart, Target, Shield, ArrowRight, Star, CheckCircle, Calculator, CreditCard } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SIPCalculator from '../components/Calculators/SIPCalculator';
import FormField from '../components/UI/FormField';
import SimpleChart from '../components/Charts/SimpleChart';
import { useFormValidation, commonValidationRules } from '../hooks/useFormValidation';
import { useState } from 'react';

const MutualFundsPage: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);
  const [investmentData, setInvestmentData] = useState({
    fundType: '',
    investmentType: 'sip',
    amount: '',
    tenure: '',
    name: '',
    email: '',
    phone: '',
    pan: '',
    bankAccount: '',
    ifsc: ''
  });
  const [sipProjection, setSipProjection] = useState<any>(null);

  // Form validation
  const investmentValidation = useFormValidation({
    amount: {
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 500) return 'Minimum SIP amount is ₹500';
        if (num > 100000) return 'Maximum SIP amount is ₹1,00,000';
        return null;
      }
    },
    tenure: { required: true },
    name: commonValidationRules.name,
    email: commonValidationRules.email,
    phone: commonValidationRules.phone,
    pan: commonValidationRules.pan,
    bankAccount: {
      required: true,
      minLength: 9,
      maxLength: 18,
      custom: (value: string) => {
        if (!/^\d+$/.test(value)) return 'Bank account number should contain only digits';
        return null;
      }
    },
    ifsc: {
      required: true,
      pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
      custom: (value: string) => {
        if (value.length !== 11) return 'IFSC code must be 11 characters';
        return null;
      }
    }
  });

  const fundCategories = [
    {
      category: 'Equity Funds',
      icon: TrendingUp,
      risk: 'High',
      returns: '12-15%',
      description: 'High growth potential funds investing primarily in stocks for long-term wealth creation',
      types: ['Large Cap Funds', 'Mid Cap Funds', 'Small Cap Funds', 'Multi Cap Funds'],
      minInvestment: 500,
      gradient: 'from-green-500 to-emerald-600',
      riskColor: 'text-red-600 bg-red-100'
    },
    {
      category: 'Debt Funds',
      icon: Shield,
      risk: 'Low',
      returns: '6-8%',
      description: 'Stable income generating funds with lower risk, perfect for conservative investors',
      types: ['Liquid Funds', 'Short Duration', 'Medium Duration', 'Long Duration'],
      minInvestment: 1000,
      gradient: 'from-blue-500 to-indigo-600',
      riskColor: 'text-green-600 bg-green-100'
    },
    {
      category: 'Hybrid Funds',
      icon: PieChart,
      risk: 'Medium',
      returns: '8-12%',
      description: 'Balanced approach combining equity and debt investments for optimal risk-return ratio',
      types: ['Conservative Hybrid', 'Balanced Hybrid', 'Aggressive Hybrid', 'Dynamic Asset Allocation'],
      minInvestment: 500,
      gradient: 'from-purple-500 to-pink-600',
      riskColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      category: 'ELSS Funds',
      icon: Target,
      risk: 'High',
      returns: '10-14%',
      description: 'Tax-saving equity funds with 3-year lock-in period offering dual benefits of growth and tax savings',
      types: ['Diversified ELSS', 'Focused ELSS', 'Multi Cap ELSS', 'Thematic ELSS'],
      minInvestment: 500,
      gradient: 'from-orange-500 to-red-600',
      riskColor: 'text-red-600 bg-red-100'
    },
    {
      category: 'Index Funds',
      icon: BarChart3,
      risk: 'Medium',
      returns: '10-12%',
      description: 'Passively managed funds that track market indices with low expense ratios',
      types: ['Nifty 50 Index', 'Sensex Index', 'Nifty Next 50', 'International Index'],
      minInvestment: 100,
      gradient: 'from-teal-500 to-cyan-600',
      riskColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      category: 'Sectoral Funds',
      icon: Target,
      risk: 'Very High',
      returns: '15-20%',
      description: 'Specialized funds focusing on specific sectors like technology, pharma, or banking',
      types: ['Technology Funds', 'Banking Funds', 'Pharma Funds', 'Infrastructure Funds'],
      minInvestment: 1000,
      gradient: 'from-indigo-500 to-purple-600',
      riskColor: 'text-red-700 bg-red-200'
    }
  ];

  const topFunds = [
    { name: 'Axis Bluechip Fund', category: 'Large Cap', returns: '14.2%', rating: 5, minSIP: 500 },
    { name: 'Mirae Asset Large Cap Fund', category: 'Large Cap', returns: '13.8%', rating: 4, minSIP: 500 },
    { name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', returns: '16.5%', rating: 5, minSIP: 1000 },
    { name: 'HDFC Mid-Cap Opportunities Fund', category: 'Mid Cap', returns: '18.3%', rating: 4, minSIP: 500 },
  ];

  const sipBenefits = [
    {
      icon: Target,
      title: 'Disciplined Investing',
      description: 'Build wealth systematically with regular investments'
    },
    {
      icon: TrendingUp,
      title: 'Rupee Cost Averaging',
      description: 'Reduce impact of market volatility on your investments'
    },
    {
      icon: Shield,
      title: 'Flexible & Convenient',
      description: 'Start with as low as ₹500 and modify anytime'
    }
  ];

  const handleStartSIP = (fundType: string) => {
    setSelectedFund(fundType);
    setInvestmentData(prev => ({ ...prev, fundType }));
  };

  const handleInvestmentSubmit = () => {
    const fieldsToValidate = {
      amount: investmentData.amount,
      tenure: investmentData.tenure,
      name: investmentData.name,
      email: investmentData.email,
      phone: investmentData.phone,
      pan: investmentData.pan,
      bankAccount: investmentData.bankAccount,
      ifsc: investmentData.ifsc
    };
    
    if (investmentValidation.validateForm(fieldsToValidate)) {
      const projection = calculateSIPProjection();
      setSipProjection(projection);
    }
  };

  const calculateSIPProjection = () => {
    const monthlyAmount = parseInt(investmentData.amount) || 0;
    const years = parseInt(investmentData.tenure) || 0;
    
    const expectedReturns = {
      'Equity Funds': 12,
      'Debt Funds': 7,
      'Hybrid Funds': 10,
      'ELSS Funds': 13,
      'Index Funds': 11,
      'Sectoral Funds': 15
    };
    
    const annualReturn = expectedReturns[investmentData.fundType as keyof typeof expectedReturns] || 10;
    const monthlyReturn = annualReturn / (12 * 100);
    const months = years * 12;
    
    const maturityAmount = Math.round(
      monthlyAmount * (((Math.pow(1 + monthlyReturn, months)) - 1) / monthlyReturn) * (1 + monthlyReturn)
    );
    
    const totalInvestment = monthlyAmount * months;
    const totalGains = maturityAmount - totalInvestment;
    
    return {
      maturityAmount,
      totalInvestment,
      totalGains,
      annualReturn
    };
  };

  // Mock fund performance data
  const fundPerformanceData = [
    { label: '1Y', value: 12.5 },
    { label: '3Y', value: 15.2 },
    { label: '5Y', value: 13.8 },
    { label: '10Y', value: 14.6 }
  ];

  if (selectedFund) {
    const fund = fundCategories.find(f => f.category === selectedFund);
    
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Start SIP in {fund?.category}</h1>
            <p className="text-gray-600">Begin your systematic investment journey</p>
          </div>

          {!sipProjection ? (
            <Card>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Investment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Investment Type"
                    type="select"
                    value={investmentData.investmentType}
                    onChange={(value) => setInvestmentData(prev => ({ ...prev, investmentType: value }))}
                    options={[
                      { value: 'sip', label: 'SIP (Systematic Investment Plan)' },
                      { value: 'lumpsum', label: 'Lump Sum Investment' }
                    ]}
                  />
                  
                  <FormField
                    label={investmentData.investmentType === 'sip' ? 'Monthly Amount' : 'Investment Amount'}
                    type="number"
                    value={investmentData.amount}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, amount: value }));
                      investmentValidation.clearError('amount');
                    }}
                    error={investmentValidation.errors.amount}
                    placeholder={`Enter ${investmentData.investmentType === 'sip' ? 'monthly' : 'investment'} amount (₹)`}
                    min={investmentData.investmentType === 'sip' ? '500' : '1000'}
                    required
                  />
                  
                  {investmentData.investmentType === 'sip' && (
                    <FormField
                      label="Investment Period"
                      type="select"
                      value={investmentData.tenure}
                      onChange={(value) => {
                        setInvestmentData(prev => ({ ...prev, tenure: value }));
                        investmentValidation.clearError('tenure');
                      }}
                      error={investmentValidation.errors.tenure}
                      options={[...Array(30)].map((_, i) => ({
                        value: (i + 1).toString(),
                        label: `${i + 1} Year${i > 0 ? 's' : ''}`
                      }))}
                      placeholder="Select period"
                      required
                    />
                  )}
                  
                  <FormField
                    label="Full Name"
                    value={investmentData.name}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, name: value }));
                      investmentValidation.clearError('name');
                    }}
                    error={investmentValidation.errors.name}
                    placeholder="Enter full name"
                    required
                  />
                  
                  <FormField
                    label="Email Address"
                    type="email"
                    value={investmentData.email}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, email: value }));
                      investmentValidation.clearError('email');
                    }}
                    error={investmentValidation.errors.email}
                    placeholder="Enter email address"
                    required
                  />
                  
                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={investmentData.phone}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, phone: value }));
                      investmentValidation.clearError('phone');
                    }}
                    error={investmentValidation.errors.phone}
                    placeholder="Enter phone number"
                    required
                  />
                  
                  <FormField
                    label="PAN Number"
                    value={investmentData.pan}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, pan: value.toUpperCase() }));
                      investmentValidation.clearError('pan');
                    }}
                    error={investmentValidation.errors.pan}
                    placeholder="Enter PAN number"
                    maxLength={10}
                    required
                  />
                  
                  <FormField
                    label="Bank Account Number"
                    value={investmentData.bankAccount}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, bankAccount: value }));
                      investmentValidation.clearError('bankAccount');
                    }}
                    error={investmentValidation.errors.bankAccount}
                    placeholder="Enter bank account number"
                    required
                  />
                  
                  <FormField
                    label="IFSC Code"
                    value={investmentData.ifsc}
                    onChange={(value) => {
                      setInvestmentData(prev => ({ ...prev, ifsc: value.toUpperCase() }));
                      investmentValidation.clearError('ifsc');
                    }}
                    error={investmentValidation.errors.ifsc}
                    placeholder="Enter IFSC code"
                    maxLength={11}
                    required
                  />
                </div>
                
                {investmentData.investmentType === 'sip' && investmentData.amount && investmentData.tenure && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Investment Projection</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{(parseInt(investmentData.amount) * parseInt(investmentData.tenure) * 12).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Investment</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          ₹{calculateSIPProjection().maturityAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Maturity Value</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          ₹{calculateSIPProjection().totalGains.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Expected Gains</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedFund(null)}>
                    Back to Funds
                  </Button>
                  <Button onClick={handleInvestmentSubmit} icon={Calculator}>
                    Start Investment
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Investment Started Successfully!</h3>
                <p className="text-gray-600 mb-6">SIP ID: SIP{Date.now()}</p>
                
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Investment Summary</h4>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex justify-between">
                          <span>Fund Type:</span>
                          <span className="font-medium">{investmentData.fundType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly SIP:</span>
                          <span className="font-medium">₹{parseInt(investmentData.amount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investment Period:</span>
                          <span className="font-medium">{investmentData.tenure} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Return:</span>
                          <span className="font-medium">{sipProjection.annualReturn}% p.a.</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Projected Returns</h4>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex justify-between">
                          <span>Total Investment:</span>
                          <span className="font-medium">₹{sipProjection.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Gains:</span>
                          <span className="font-medium text-green-600">₹{sipProjection.totalGains.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Maturity Value:</span>
                          <span className="font-bold text-purple-600">₹{sipProjection.maturityAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete KYC verification within 7 days</li>
                    <li>• Set up auto-debit mandate for seamless investments</li>
                    <li>• First SIP installment will be debited on the 1st of next month</li>
                    <li>• Track your investments through our customer portal</li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" icon={CreditCard}>
                    Complete KYC
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Confirmation
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => {
                    setSipProjection(null);
                    setSelectedFund(null);
                    setInvestmentData({
                      fundType: '', investmentType: 'sip', amount: '', tenure: '',
                      name: '', email: '', phone: '', pan: '', bankAccount: '', ifsc: ''
                    });
                    investmentValidation.clearAllErrors();
                  }}>
                    Start New SIP
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mutual Funds</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart investment solutions to grow your wealth systematically. Choose from our expertly curated 
            mutual fund portfolio designed to meet your financial goals and risk appetite.
          </p>
        </div>

        {/* Fund Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {fundCategories.map((fund, index) => {
            const Icon = fund.icon;
            return (
              <Card key={index} className="h-full flex flex-col">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${fund.gradient} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{fund.category}</h3>
                    <p className="text-gray-600 text-sm mb-4">{fund.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{fund.returns}</div>
                        <div className="text-xs text-gray-500">Expected Returns</div>
                      </div>
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${fund.riskColor}`}>
                          {fund.risk} Risk
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fund Types */}
                  <div className="mb-6 flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-3">Fund Types:</h4>
                    <ul className="space-y-2">
                      {fund.types.map((type, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {type}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Investment Info */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Min SIP:</span> ₹{fund.minInvestment}/month
                    </div>
                  </div>

                  {/* Invest Button */}
                  <Button
                    onClick={() => handleStartSIP(fund.category)}
                    className="w-full mt-auto"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Start SIP in {fund.category}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* SIP Calculator */}
        <div className="mb-16">
          <SIPCalculator />
        </div>

        {/* Fund Performance Chart */}
        <div className="mb-16">
          <Card>
            <SimpleChart
              data={fundPerformanceData}
              type="bar"
              title="Average Fund Performance Across Categories"
              height={250}
              showTrend={true}
            />
          </Card>
        </div>

        {/* Top Performing Funds */}
        <Card className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Top Performing Funds</h3>
            <p className="text-gray-600">Handpicked funds with consistent performance and strong track records</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Fund Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">3Y Returns</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Min SIP</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {topFunds.map((fund, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{fund.name}</td>
                    <td className="py-4 px-4 text-gray-600">{fund.category}</td>
                    <td className="py-4 px-4 text-green-600 font-semibold">{fund.returns}</td>
                    <td className="py-4 px-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < fund.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">₹{fund.minSIP}</td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">
                        Invest Now
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SIP Benefits */}
        <Card className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SIP?</h3>
            <p className="text-gray-600">Systematic Investment Plan - The smart way to build wealth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Investment Process */}
        <Card>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Start Your Investment Journey</h3>
            <p className="text-gray-600">Begin investing in just 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { step: '1', title: 'Choose Fund', description: 'Select funds based on your risk profile and goals' },
              { step: '2', title: 'Complete KYC', description: 'Complete your KYC verification online in minutes' },
              { step: '3', title: 'Start SIP', description: 'Set up automatic investments and watch your wealth grow' },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">{process.step}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" icon={ArrowRight} iconPosition="right">
              Start Investing Today
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MutualFundsPage;