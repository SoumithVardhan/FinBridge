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
      color: 'from-red-500 to-pink-600',
      image: '/images/investments/sr-associates/cards/mutual-funds.png'
    },
    {
      id: 'fixed-deposits',
      title: 'Fixed Deposits',
      icon: PiggyBank,
      description: 'Secure returns with guaranteed capital protection',
      color: 'from-green-500 to-emerald-600',
      image: '/images/investments/sr-associates/cards/fixed-deposits.png'
    },
    {
      id: 'calculators',
      title: 'Investment Calculators',
      icon: Calculator,
      description: 'Plan your investments with precision',
      color: 'from-purple-500 to-pink-600',
      image: '/images/investments/sr-associates/cards/calculators.png'
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
      image: '/images/investments/sr-associates/funds/equity-funds.png',
      features: ['High growth potential', 'Long-term wealth creation', 'Tax-efficient', 'Professional management']
    },
    {
      type: 'Debt Funds',
      risk: 'Low-Medium',
      returns: '7-9%*',
      description: 'Stable returns through fixed-income securities',
      color: 'bg-blue-100 text-blue-600',
      icon: Shield,
      image: '/images/investments/sr-associates/funds/debt-funds.png',
      features: ['Stable returns', 'Lower volatility', 'Short to medium term', 'Better than FDs']
    },
    {
      type: 'Hybrid Funds',
      risk: 'Medium',
      returns: '9-12%*',
      description: 'Balanced portfolio of equity and debt',
      color: 'bg-purple-100 text-purple-600',
      icon: BarChart3,
      image: '/images/investments/sr-associates/funds/hybrid-funds.png',
      features: ['Balanced approach', 'Diversified portfolio', 'Moderate risk', 'Suitable for all goals']
    },
    {
      type: 'ELSS Funds',
      risk: 'High',
      returns: '12-15%*',
      description: 'Tax-saving equity funds with 3-year lock-in',
      color: 'bg-green-100 text-green-600',
      icon: Award,
      image: '/images/investments/sr-associates/funds/elss-funds.png',
      features: ['Tax savings up to ₹1.5L', '3-year lock-in', 'Wealth creation', 'Section 80C benefits']
    }
  ];

  const investmentTools = [
    {
      title: 'SIP Calculator',
      description: 'Calculate returns on systematic investment plans',
      icon: Calculator,
      image: '/images/investments/sr-associates/calculators/sip-calculator.png',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Goal Planner',
      description: 'Plan your financial goals with precision',
      icon: Target,
      image: '/images/investments/sr-associates/calculators/goal-planner.png',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Portfolio Tracker',
      description: 'Track and analyze your investment portfolio',
      icon: BarChart3,
      image: '/images/investments/sr-associates/calculators/portfolio-tracker.png',
      color: 'from-purple-500 to-pink-600'
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
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48">
                  <img 
                    src={fund.image} 
                    alt={fund.type}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold">{fund.type}</h4>
                    <p className="text-sm opacity-90">{fund.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-lg font-bold text-green-600">{fund.returns}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${fund.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Expected Returns</div>
                      <div className="text-xs text-gray-500">Risk: {fund.risk}</div>
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
                  
                  <Button className="w-full" size="md">
                    Start SIP
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderFixedDeposits = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Fixed Deposit Options</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Secure your money with guaranteed returns. Choose from various tenure options and earn stable income.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { tenure: '1 Year', rate: '6.5%', minAmount: '₹1,000' },
          { tenure: '3 Years', rate: '7.0%', minAmount: '₹5,000' },
          { tenure: '5 Years', rate: '7.5%', minAmount: '₹10,000' }
        ].map((fd, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">{fd.rate}</div>
            <div className="text-lg font-semibold text-gray-900 mb-1">{fd.tenure}</div>
            <div className="text-sm text-gray-600 mb-4">Minimum: {fd.minAmount}</div>
            <Button className="w-full" variant="outline">
              Invest Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCalculators = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Calculators</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Plan your investments with our comprehensive calculators and achieve your financial goals.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {investmentTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img 
                  src={tool.image} 
                  alt={tool.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${tool.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <Button className="w-full" variant="secondary">
                  Use Calculator
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/images/investments/sr-associates/hero/main-banner.png" 
          alt="Investment Solutions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-pink-700/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Grow Your Wealth Smartly
              </h1>
              <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
                Explore a wide range of investment options from mutual funds to fixed deposits. 
                Start your wealth creation journey with expert guidance and smart tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="!bg-white !text-red-600 hover:!bg-red-50 hover:!text-red-700 !border-0">
                  Start Investing
                </Button>
                <Button size="lg" variant="outline" className="!bg-white !border-red-600 !text-red-600 hover:!bg-red-600 hover:!text-white">
                  Free Portfolio Review
                </Button>
              </div>
            </div>
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
                  className={`group relative overflow-hidden rounded-lg transition-all ${
                    activeTab === option.id
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center px-6 py-4">
                    <Icon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </div>
                  {activeTab === option.id && (
                    <div className="absolute inset-0 opacity-10">
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'mutual-funds' && renderMutualFunds()}
            {activeTab === 'fixed-deposits' && renderFixedDeposits()}
            {activeTab === 'calculators' && renderCalculators()}
          </div>
        </div>
      </section>

      {/* Investment Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Investment Success Stories</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from our clients who achieved their financial goals through smart investing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <img 
                src="/images/investments/sr-associates/success-story-1.png" 
                alt="Investment Success Story"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Wealth Creation Journey</h4>
                <p className="text-gray-600 text-sm">
                  "Started with ₹5,000 monthly SIP and achieved ₹50 lakhs corpus in 10 years through disciplined investing."
                </p>
              </div>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="/images/investments/sr-associates/success-story-2.png" 
                alt="Investment Growth Story"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Portfolio Growth</h4>
                <p className="text-gray-600 text-sm">
                  "Diversified portfolio across equity and debt funds helped me achieve 15% annual returns consistently."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Market Analysis & Insights</h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with market trends and make informed investment decisions with our expert analysis and research reports.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Daily market updates and analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Expert fund recommendations
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Portfolio rebalancing alerts
                  </li>
                </ul>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Get Market Insights
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="/images/investments/sr-associates/market-analysis.png" 
                  alt="Market Analysis"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default InvestmentsPage;