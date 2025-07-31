import React from 'react';
import { TrendingUp, BarChart3, PieChart, Target, Shield, ArrowRight, Star, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import SIPCalculator from '../components/Calculators/SIPCalculator';

const MutualFundsPage: React.FC = () => {
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
                    className="w-full mt-auto"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Start SIP
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