import React, { useState } from 'react';
import { Home, User, Briefcase, GraduationCap, Car, Building, CheckCircle, ArrowRight, Calculator, FileText, Clock, Shield, TrendingUp, Heart, Star, Award, Users, Target, Phone, Mail, MapPin } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import EMICalculator from '../components/Calculators/EMICalculator';

const LoansPage: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    purpose: ''
  });

  // Premium loan data with professional SR Associates images
  const loans = [
    {
      type: 'Personal Loan',
      icon: User,
      rate: '10.5%',
      description: 'Instant personal loans for all your immediate financial needs',
      image: '/images/loans/sr-associates/07a2eb88-3963-473c-86c2-6ba957b57aa5.png',
      features: ['Up to ₹50 Lakhs', 'No collateral required', '24-hour approval', 'Flexible repayment'],
      eligibility: ['Age: 21-60 years', 'Minimum income: ₹20,000/month', 'Employment history: 2+ years', 'Good credit score'],
      gradient: 'from-green-500 to-emerald-600',
      maxAmount: '₹50,00,000',
      tenure: '12-60 months',
      processingFee: '1% onwards'
    },
    {
      type: 'Business Loan',
      icon: Briefcase,
      rate: '8.5%',
      description: 'Fuel your business growth with our tailored business financing solutions',
      image: '/images/loans/sr-associates/30c97679-f073-41f7-9dc5-dd8f16697e27.png',
      features: ['Up to ₹10 Crores', 'Working capital support', 'Equipment financing', 'Overdraft facility'],
      eligibility: ['Business vintage: 2+ years', 'Annual turnover: ₹10 Lakhs+', 'Good business credit', 'Proper documentation'],
      gradient: 'from-purple-500 to-pink-600',
      maxAmount: '₹10,00,00,000',
      tenure: '12-84 months',
      processingFee: '0.5% onwards'
    },
    {
      type: 'Education Loan',
      icon: GraduationCap,
      rate: '7.5%',
      description: 'Invest in your future with our comprehensive education loan schemes',
      image: '/images/loans/sr-associates/5a1211be-6188-4c3d-9cd5-4d99cd6e06d8.png',
      features: ['Up to ₹1.5 Crores', 'Covers all expenses', 'Moratorium period', 'Tax benefits'],
      eligibility: ['Admission confirmed', 'Co-applicant required', 'Good academic record', 'Course from approved list'],
      gradient: 'from-orange-500 to-red-600',
      maxAmount: '₹1,50,00,000',
      tenure: '15 years',
      processingFee: 'Nil'
    },
    {
      type: 'Home Loan',
      icon: Home,
      rate: '6.5%',
      description: 'Make your dream home a reality with our competitive home loan rates',
      image: '/images/loans/sr-associates/61dc049f-3b5c-46b0-bcc0-682501cc829b.png',
      features: ['Up to ₹5 Crores', 'Tenure up to 30 years', 'Minimal documentation', 'Quick approval'],
      eligibility: ['Age: 21-65 years', 'Minimum income: ₹25,000/month', 'Good credit score', 'Stable employment'],
      gradient: 'from-blue-500 to-indigo-600',
      maxAmount: '₹5,00,00,000',
      tenure: '30 years',
      processingFee: '0.5% onwards'
    },
    {
      type: 'Vehicle Loan',
      icon: Car,
      rate: '7.5%',
      description: 'Drive your dream vehicle with our attractive auto loan offers',
      image: '/images/loans/sr-associates/8613ba2c-d07a-4f3e-aa77-708765df3200.png',
      features: ['Up to 90% financing', 'New & used vehicles', 'Quick processing', 'Competitive rates'],
      eligibility: ['Age: 21-65 years', 'Minimum income: ₹15,000/month', 'Valid driving license', 'Good credit history'],
      gradient: 'from-teal-500 to-cyan-600',
      maxAmount: '₹1,00,00,000',
      tenure: '7 years',
      processingFee: '1% onwards'
    },
    {
      type: 'Mortgage Loan',
      icon: Building,
      rate: '6.5%',
      description: 'Leverage your property value with our flexible mortgage solutions',
      image: '/images/loans/sr-associates/c14ca927-85e0-43c9-b6ed-0359cf5eed6b.png',
      features: ['Up to 75% of property value', 'Flexible tenure', 'Multiple end-use options', 'Competitive rates'],
      eligibility: ['Property ownership proof', 'Clear property title', 'Good credit score', 'Stable income'],
      gradient: 'from-indigo-500 to-purple-600',
      maxAmount: '₹10,00,00,000',
      tenure: '20 years',
      processingFee: '0.5% onwards'
    }
  ];

  // Enhanced statistics
  const loanStats = [
    { number: '50,000+', label: 'Loans Approved', icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
    { number: '₹2,500Cr+', label: 'Amount Disbursed', icon: TrendingUp, color: 'from-blue-500 to-indigo-600' },
    { number: '98%', label: 'Customer Satisfaction', icon: Heart, color: 'from-pink-500 to-rose-600' },
    { number: '24 Hrs', label: 'Quick Approval', icon: Clock, color: 'from-purple-500 to-violet-600' }
  ];

  // Customer testimonials
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      loanType: 'Home Loan',
      rating: 5,
      comment: 'Excellent service! Got my home loan approved within 48 hours. The process was smooth and transparent.',
      image: '/images/loans/sr-associates/bed14fa5-1dfa-4685-809a-0ac76d4c5b47.png'
    },
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      loanType: 'Personal Loan',
      rating: 5,
      comment: 'Quick approval and competitive rates. The team was very supportive throughout the process.',
      image: '/images/loans/sr-associates/bae62fcc-7f94-4e73-b453-d6744ce6770a.png'
    },
    {
      name: 'Suresh Patel',
      location: 'Bangalore',
      loanType: 'Business Loan',
      rating: 5,
      comment: 'Helped my business grow with flexible repayment options. Highly recommended!',
      image: '/images/loans/sr-associates/863535ee-6fe6-4e11-a6b1-4901de22c563.png'
    }
  ];

  // Why choose us features
  const whyChooseUs = [
    { icon: Award, title: 'Award Winning', description: 'Recognized for excellence in financial services' },
    { icon: Users, title: '50,000+ Happy Customers', description: 'Trusted by thousands across India' },
    { icon: Shield, title: 'Secure & Safe', description: 'Bank-grade security for your data' },
    { icon: Target, title: 'Competitive Rates', description: 'Best-in-market interest rates' }
  ];

  const handleLoanSelect = (loanType: string) => {
    setSelectedLoan(loanType);
  };

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const FormField: React.FC<{
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
  }> = ({ label, type, value, onChange, placeholder, required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        required={required}
      />
    </div>
  );

  if (selectedLoan) {
    const loan = loans.find(l => l.type === selectedLoan);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Application Header with Professional Image */}
          <div className="text-center mb-12">
            <div className="relative h-72 rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <img 
                src={loan?.image || '/images/placeholder.svg'} 
                alt={loan?.type || 'Loan'}
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-8 left-8 text-white">
                  <h1 className="text-4xl font-bold mb-3">{loan?.type} Application</h1>
                  <p className="text-xl text-gray-200">Complete your application in simple steps</p>
                  <div className="flex items-center mt-4 space-x-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-semibold">Starting from {loan?.rate}*</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-semibold">Up to {loan?.maxAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <div className="p-8 space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Application Form</h3>
                <p className="text-gray-600">
                  Thank you for choosing {loan?.type}. Fill out this form and our team will contact you within 2 hours.
                </p>
              </div>

              {/* Application Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  type="text"
                  value={applicationData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  placeholder="Enter your full name"
                  required
                />
                <FormField
                  label="Email Address"
                  type="email"
                  value={applicationData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="Enter your email"
                  required
                />
                <FormField
                  label="Mobile Number"
                  type="tel"
                  value={applicationData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  placeholder="Enter your mobile number"
                  required
                />
                <FormField
                  label="Loan Amount Required"
                  type="number"
                  value={applicationData.amount}
                  onChange={(value) => handleInputChange('amount', value)}
                  placeholder="Enter loan amount"
                  required
                />
              </div>

              <FormField
                label="Purpose of Loan"
                type="text"
                value={applicationData.purpose}
                onChange={(value) => handleInputChange('purpose', value)}
                placeholder="Briefly describe the purpose"
              />

              {/* What happens next */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h4 className="font-bold text-blue-900 mb-4 text-lg">What happens next?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-blue-800 text-sm">Call within 2 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 rounded-full p-2">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-blue-800 text-sm">Document verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 rounded-full p-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-blue-800 text-sm">Quick approval</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedLoan(null)}
                  className="sm:w-auto"
                >
                  ← Back to Loans
                </Button>
                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowCalculator(true)}
                    icon={Calculator}
                  >
                    EMI Calculator
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Professional Design */}
        <div className="text-center mb-20">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Premium Loan Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Experience next-generation financial services with competitive rates, instant approvals, 
              and personalized solutions designed for your success.
            </p>
          </div>
          
          {/* Enhanced Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {loanStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Loans Grid with Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {loans.map((loan, index) => {
            const Icon = loan.icon;
            return (
              <Card key={index} className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white border-0 shadow-xl">
                <div className="flex flex-col h-full">
                  {/* Professional Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={loan.image} 
                      alt={loan.type}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className={`absolute top-6 right-6 w-14 h-14 bg-gradient-to-r ${loan.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                        <span className="text-lg font-bold text-gray-900">From {loan.rate}*</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{loan.type}</h3>
                      <p className="text-gray-600 leading-relaxed">{loan.description}</p>
                    </div>

                    {/* Loan Details */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Max Amount:</span>
                          <div className="font-semibold text-gray-900">{loan.maxAmount}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tenure:</span>
                          <div className="font-semibold text-gray-900">{loan.tenure}</div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 flex-grow">
                      <h4 className="font-bold text-gray-800 mb-4">Key Features:</h4>
                      <ul className="space-y-3">
                        {loan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button */}
                    <Button
                      onClick={() => handleLoanSelect(loan.type)}
                      className={`w-full mt-auto bg-gradient-to-r ${loan.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <p className="text-gray-600 text-lg">Real experiences from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white shadow-xl border-0">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-3">"{testimonial.comment}"</p>
                <span className="text-xs text-blue-600 font-medium">{testimonial.loanType}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FinBridge?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* EMI Calculator Section */}
        {showCalculator && (
          <div className="mb-20">
            <EMICalculator />
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white rounded-3xl p-16 shadow-2xl">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Financial Future?</h3>
          <p className="text-gray-200 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
            Join thousands of satisfied customers who chose FinBridge for their loan needs. 
            Experience instant approval, competitive rates, and world-class service.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              icon={ArrowRight} 
              iconPosition="right" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all"
              onClick={() => setShowCalculator(true)}
            >
              Calculate EMI
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Talk to Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansPage;
