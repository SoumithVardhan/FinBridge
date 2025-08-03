import React, { useState, useEffect } from 'react';
import { User, Lock, FileText, CreditCard, TrendingUp, HeadphonesIcon, LogOut, CheckCircle, Clock, AlertCircle, UserPlus, Mail } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import FormField from '../components/UI/FormField';
import PasswordInput from '../components/UI/PasswordInput';
import ErrorMessage from '../components/UI/ErrorMessage';
import FormCard from '../components/UI/FormCard';
import SimpleChart from '../components/Charts/SimpleChart';
import { useAuth } from '../hooks/useAuth';
import { useFormManager } from '../hooks/useFormManager';
import { commonValidationRules } from '../hooks/useFormValidation';
import { RegisterData, LoginCredentials } from '../types';
import { checkAPIHealthWithRetry } from '../utils/api';

const CustomerPortalPage: React.FC = () => {
  const { user, isLoading, error, login, register, logout, forgotPassword, resetPassword, isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // Debug information
  useEffect(() => {
    console.log('🔍 Frontend Debug Info:', {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      MODE: import.meta.env.MODE,
      NODE_ENV: import.meta.env.VITE_NODE_ENV,
      ALL_ENV: import.meta.env
    });
    
    // Test API health check
    checkAPIHealthWithRetry()
      .then(data => console.log('✅ API Health Check:', data))
      .catch(error => console.error('❌ API Health Check Failed:', error));
      
    // Test environment variable access
    console.log('🌍 Environment variables test:', {
      hasViteApiUrl: !!import.meta.env.VITE_API_URL,
      viteApiUrlValue: import.meta.env.VITE_API_URL,
      envKeys: Object.keys(import.meta.env)
    });
  }, []);

  // Login form management
  const loginForm = useFormManager({
    initialValues: { email: '', password: '' } as LoginCredentials,
    validationRules: {
      email: commonValidationRules.email,
      password: { required: true }
    },
    onSubmit: login
  });

  // Registration form management
  const registerForm = useFormManager({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    } as RegisterData,
    validationRules: {
      firstName: commonValidationRules.name,
      lastName: commonValidationRules.name,
      email: commonValidationRules.email,
      phone: commonValidationRules.phone,
      password: commonValidationRules.password,
      confirmPassword: {
        required: true,
        custom: (value: string) => {
          if (value !== registerForm.formData.password) return 'Passwords do not match';
          return null;
        }
      }
    },
    onSubmit: register,
    onSuccess: () => setIsRegistering(false)
  });

  // Reset password form management
  const resetPasswordForm = useFormManager({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationRules: {
      newPassword: commonValidationRules.password,
      confirmPassword: {
        required: true,
        custom: (value: string) => {
          if (value !== resetPasswordForm.formData.newPassword) return 'Passwords do not match';
          return null;
        }
      }
    },
    onSubmit: async (data) => {
      const success = await resetPassword(forgotPasswordEmail, data.newPassword);
      if (success) {
        alert('Password reset successfully! You can now login with your new password.');
        setShowResetPassword(false);
        setResetEmailSent(false);
        setForgotPasswordEmail('');
      }
      return success;
    }
  });

  // Handlers
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) return;
    
    const success = await forgotPassword(forgotPasswordEmail);
    if (success) {
      setResetEmailSent(true);
      setTimeout(() => {
        setShowResetPassword(true);
        setShowForgotPassword(false);
      }, 2000);
    }
  };

  const handleLogout = () => {
    logout();
    loginForm.resetForm();
    registerForm.resetForm();
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    loginForm.resetForm();
    registerForm.resetForm();
  };

  // Constants
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

  const portfolioData = [
    { label: 'Jan', value: 50000 },
    { label: 'Feb', value: 65000 },
    { label: 'Mar', value: 58000 },
    { label: 'Apr', value: 72000 },
    { label: 'May', value: 85000 },
    { label: 'Jun', value: 95000 }
  ];

  const assetAllocation = [
    { label: 'Equity Funds', value: 60, color: '#3b82f6' },
    { label: 'Debt Funds', value: 30, color: '#10b981' },
    { label: 'Gold ETF', value: 10, color: '#f59e0b' }
  ];

  // Reset Password Form
  if (showResetPassword) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FormCard
            icon={Lock}
            title="Reset Password"
            description="Enter your new password"
          >
            <form onSubmit={resetPasswordForm.handleSubmit} className="space-y-6">
              <PasswordInput
                label="New Password"
                value={resetPasswordForm.formData.newPassword}
                onChange={(value) => resetPasswordForm.updateField('newPassword', value)}
                placeholder="Enter new password"
                error={resetPasswordForm.errors.newPassword}
                required
                autoComplete="new-password"
              />

              <PasswordInput
                label="Confirm New Password"
                value={resetPasswordForm.formData.confirmPassword}
                onChange={(value) => resetPasswordForm.updateField('confirmPassword', value)}
                placeholder="Confirm new password"
                error={resetPasswordForm.errors.confirmPassword}
                required
                autoComplete="new-password"
              />

              <ErrorMessage message={error ?? undefined} className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-600 text-sm" />

              <Button 
                type="submit" 
                className="w-full" 
                size="lg" 
                loading={resetPasswordForm.isSubmitting || isLoading}
              >
                Reset Password
              </Button>
            </form>
          </FormCard>
        </div>
      </div>
    );
  }

  // Forgot Password Form
  if (!isAuthenticated && showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FormCard
            icon={Mail}
            title="Reset Password"
            description="Enter your email to receive reset instructions"
          >
            {!resetEmailSent ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <FormField
                  label="Email Address"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={setForgotPasswordEmail}
                  placeholder="Enter your email"
                  required
                />

                <ErrorMessage message={error ?? undefined} className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-600 text-sm" />

                <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                  Send Reset Instructions
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Sent!</h4>
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to {forgotPasswordEmail}
                </p>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmailSent(false);
                  setForgotPasswordEmail('');
                }}
                className="text-primary-600 hover:text-primary-800 text-sm"
              >
                Back to Login
              </button>
            </div>
          </FormCard>
        </div>
      </div>
    );
  }

  // Login/Register Forms
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Portal</h1>
            <p className="text-xl text-gray-600">Secure access to manage your financial portfolio and services</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Login/Register Form */}
            <FormCard
              icon={isRegistering ? UserPlus : User}
              title={isRegistering ? 'Create Your Account' : 'Login to Your Account'}
              description={isRegistering ? 'Join FinBridge for comprehensive financial services' : 'Access your financial dashboard securely'}
            >
              {!isRegistering ? (
                // Login Form
                <form onSubmit={loginForm.handleSubmit} className="space-y-6">
                  <FormField
                    label="Email Address"
                    type="email"
                    value={loginForm.formData.email}
                    onChange={(value) => loginForm.updateField('email', value)}
                    error={loginForm.errors.email}
                    placeholder="Enter your email"
                    required
                  />

                  <PasswordInput
                    label="Password"
                    value={loginForm.formData.password}
                    onChange={(value) => loginForm.updateField('password', value)}
                    placeholder="Enter your password"
                    error={loginForm.errors.password}
                    required
                  />

                  <ErrorMessage message={error ?? undefined} className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-600 text-sm" />

                  <Button type="submit" className="w-full" size="lg" loading={loginForm.isSubmitting || isLoading}>
                    <Lock className="w-5 h-5 mr-2" />
                    Login Securely
                  </Button>
                </form>
              ) : (
                // Registration Form
                <form onSubmit={registerForm.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      value={registerForm.formData.firstName}
                      onChange={(value) => registerForm.updateField('firstName', value)}
                      error={registerForm.errors.firstName}
                      placeholder="First name"
                      required
                    />
                    <FormField
                      label="Last Name"
                      value={registerForm.formData.lastName}
                      onChange={(value) => registerForm.updateField('lastName', value)}
                      error={registerForm.errors.lastName}
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <FormField
                    label="Email Address"
                    type="email"
                    value={registerForm.formData.email}
                    onChange={(value) => registerForm.updateField('email', value)}
                    error={registerForm.errors.email}
                    placeholder="Enter your email"
                    required
                  />

                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={registerForm.formData.phone}
                    onChange={(value) => registerForm.updateField('phone', value)}
                    error={registerForm.errors.phone}
                    placeholder="Enter your phone number"
                    required
                  />

                  <PasswordInput
                    label="Password"
                    value={registerForm.formData.password}
                    onChange={(value) => registerForm.updateField('password', value)}
                    placeholder="Create a strong password"
                    error={registerForm.errors.password}
                    required
                    autoComplete="new-password"
                  />

                  <PasswordInput
                    label="Confirm Password"
                    value={registerForm.formData.confirmPassword}
                    onChange={(value) => registerForm.updateField('confirmPassword', value)}
                    placeholder="Confirm your password"
                    error={registerForm.errors.confirmPassword}
                    required
                    autoComplete="new-password"
                  />

                  <ErrorMessage message={error ?? undefined} className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-600 text-sm" />

                  <Button type="submit" className="w-full" size="lg" loading={registerForm.isSubmitting || isLoading}>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                </form>
              )}

              <div className="text-center mt-6 space-y-2">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-primary-600 hover:text-primary-800 text-sm"
                >
                  Forgot Password?
                </button>
                <div className="text-sm text-gray-500">
                  {!isRegistering ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={toggleAuthMode} className="text-primary-600 hover:text-primary-800">
                    {!isRegistering ? 'Register here' : 'Login here'}
                  </button>
                </div>
              </div>
            </FormCard>

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
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">Here's your financial overview</p>
            {user?.kycStatus === 'PENDING' && (
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center text-yellow-800 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  KYC verification is pending. Complete your KYC to unlock all features.
                </div>
              </div>
            )}
          </div>
          <Button onClick={handleLogout} variant="outline" icon={LogOut}>
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
            <p className="text-2xl font-bold text-blue-600">{user?.portfolio?.activeLoans || 0}</p>
            <p className="text-sm text-gray-500">₹45,00,000 Outstanding</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Investments</h3>
            <p className="text-2xl font-bold text-green-600">₹{user?.portfolio?.currentValue.toLocaleString() || '0'}</p>
            <p className="text-sm text-gray-500">+{user?.portfolio?.totalGains ? ((user.portfolio.totalGains / user.portfolio.totalInvestment) * 100).toFixed(1) : '0'}% Returns</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Insurance</h3>
            <p className="text-2xl font-bold text-purple-600">{user?.portfolio?.insurancePolicies || 0}</p>
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
          {/* Portfolio Performance Chart */}
          <Card>
            <SimpleChart
              data={portfolioData}
              type="line"
              title="Portfolio Performance"
              height={200}
              showTrend={true}
            />
          </Card>

          {/* Asset Allocation */}
          <Card>
            <SimpleChart
              data={assetAllocation}
              type="pie"
              title="Asset Allocation"
              height={200}
            />
          </Card>

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
                <span className="font-semibold text-lg">₹{user?.portfolio?.totalInvestment.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Value</span>
                <span className="font-semibold text-lg text-green-600">₹{user?.portfolio?.currentValue.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Gain</span>
                <span className="font-semibold text-lg text-green-600">+₹{user?.portfolio?.totalGains.toLocaleString() || '0'} ({user?.portfolio?.totalGains ? ((user.portfolio.totalGains / user.portfolio.totalInvestment) * 100).toFixed(1) : '0'}%)</span>
              </div>
              
              {user?.kycStatus === 'VERIFIED' && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Asset Allocation</h4>
                  <div className="space-y-2">
                    {assetAllocation.map((asset, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm">
                          <span>{asset.label}</span>
                          <span>{asset.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{width: `${asset.value}%`, backgroundColor: asset.color}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
