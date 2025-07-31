import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, FileText, CreditCard, TrendingUp, HeadphonesIcon, LogOut, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateEmail, validateRequired } from '../utils/validation';

const CustomerPortalPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const portalFeatures = [
    {
      icon: FileText,
      title: 'Account Overview',
      description: 'View all your investments, loans, and insurance policies in one comprehensive dashboard'
    },
    {
      icon: CreditCard,
      title: 'Transaction History',
      description: 'Access detailed transaction records and download statements for all your financial activities'
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Management',
      description: 'Track performance, rebalance investments, and make informed decisions about your portfolio'
    },
    {
      icon: HeadphonesIcon,
      title: 'Support Center',
      description: 'Get help, raise tickets, and connect with our financial experts whenever you need assistance'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!validateRequired(loginForm.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateRequired(loginForm.password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate login
      setIsLoggedIn(true);
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Portal</h1>
            <p className="text-xl text-gray-600">Secure access to manage your financial portfolio and services</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Login Form */}
            <Card className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Login to Your Account</h3>
                <p className="text-gray-600">Access your financial dashboard securely</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors pr-12 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Lock className="w-5 h-5 mr-2" />
                  Login Securely
                </Button>
              </form>

              <div className="text-center mt-6 space-y-2">
                <a href="#" className="text-primary-600 hover:text-primary-800 text-sm">Forgot Password?</a>
                <div className="text-sm text-gray-500">
                  Don't have an account? <a href="#" className="text-primary-600 hover:text-primary-800">Register here</a>
                </div>
              </div>
            </Card>

            {/* Portal Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Portal Features</h3>
              <div className="space-y-6">
                {portalFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Here's your financial overview</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            icon={LogOut}
          >
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Loans</h3>
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-gray-500">₹45,00,000 Outstanding</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Investments</h3>
            <p className="text-2xl font-bold text-green-600">₹2,85,750</p>
            <p className="text-sm text-gray-500">+14.3% Returns</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Insurance</h3>
            <p className="text-2xl font-bold text-purple-600">3</p>
            <p className="text-sm text-gray-500">Active Policies</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-xl flex items-center justify-center">
              <HeadphonesIcon className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Support</h3>
            <p className="text-2xl font-bold text-orange-600">24/7</p>
            <p className="text-sm text-gray-500">Available</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Applications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Home Loan Application</div>
                    <div className="text-sm text-gray-600">Application ID: HL2025001</div>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Approved
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Health Insurance</div>
                    <div className="text-sm text-gray-600">Application ID: HI2025002</div>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">SIP Investment</div>
                    <div className="text-sm text-gray-600">Application ID: MF2025003</div>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  In Review
                </span>
              </div>
            </div>
          </Card>

          {/* Portfolio Summary */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Portfolio Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Investment</span>
                <span className="font-semibold text-lg">₹2,50,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Value</span>
                <span className="font-semibold text-lg text-green-600">₹2,85,750</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Gain</span>
                <span className="font-semibold text-lg text-green-600">+₹35,750 (14.3%)</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Asset Allocation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Equity Funds</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Debt Funds</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Gold ETF</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm">{feature.title}</span>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortalPage;