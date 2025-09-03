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
  const [apiHealth, setApiHealth] = useState<{ status: string; timestamp?: string } | null>(null);

  // Debug information
  useEffect(() => {
    console.log('🔍 Frontend Debug Info:', {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      MODE: import.meta.env.MODE,
      NODE_ENV: import.meta.env.VITE_NODE_ENV,
    });
    
    // Test API health check
    const checkApiHealth = async () => {
      try {
        const healthData = await checkAPIHealthWithRetry();
        console.log('✅ API Health Check:', healthData);
        setApiHealth({ status: 'healthy', timestamp: new Date().toISOString() });
      } catch (error) {
        console.error('❌ API Health Check Failed:', error);
        setApiHealth({ status: 'unhealthy', timestamp: new Date().toISOString() });
      }
    };

    checkApiHealth();
    const healthInterval = setInterval(checkApiHealth, 30000);
    return () => clearInterval(healthInterval);
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

  // Handlers
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

  // Login/Register Forms
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        {/* API Health Status Indicator */}
        {apiHealth && (
          <div className={`fixed top-20 right-4 px-3 py-1 rounded-full text-xs font-medium z-50 ${
            apiHealth.status === 'healthy' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            API: {apiHealth.status === 'healthy' ? 'Connected' : 'Disconnected'}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Financial Command Center</h1>
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

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-red-700 text-sm">
                          <p className="font-medium">Login Failed</p>
                          <p className="mt-1">{error}</p>
                          {apiHealth?.status === 'unhealthy' && (
                            <p className="mt-2 text-xs text-red-600">
                              Note: API server appears to be disconnected. Please ensure the backend is running.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

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
                    placeholder="Create a strong password (min 6 characters)"
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

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-red-700 text-sm">
                          <p className="font-medium">Registration Failed</p>
                          <p className="mt-1">{error}</p>
                          {error.includes('already exists') && (
                            <p className="mt-2 text-xs">
                              💡 Tip: Try logging in instead, or use a different email/phone number.
                            </p>
                          )}
                          {apiHealth?.status === 'unhealthy' && (
                            <p className="mt-2 text-xs text-red-600">
                              Note: API server appears to be disconnected. Please ensure the backend is running.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg" loading={registerForm.isSubmitting || isLoading}>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                </form>
              )}

              <div className="text-center mt-6 space-y-2">
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-gray-600">Here's your financial overview</p>
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
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">₹0 Outstanding</p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Investments</h3>
            <p className="text-2xl font-bold text-green-600">₹2,50,000</p>
            <p className="text-sm text-gray-500">+12.5% Returns</p>
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
        </div>

        {/* API Status Footer for debugging */}
        {apiHealth && process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
              apiHealth.status === 'healthy' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                apiHealth.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              API Status: {apiHealth.status}
              {apiHealth.timestamp && (
                <span className="ml-2 opacity-75">
                  {new Date(apiHealth.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPortalPage;
