import React from 'react';
import { Home, User, Briefcase, GraduationCap, Car, Building, CheckCircle, ArrowRight } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import EMICalculator from '../components/Calculators/EMICalculator';

const LoansPage: React.FC = () => {
  const loans = [
    {
      type: 'Home Loan',
      icon: Home,
      rate: '6.5%',
      description: 'Make your dream home a reality with our competitive home loan rates',
      features: ['Up to ₹5 Crores', 'Tenure up to 30 years', 'Minimal documentation', 'Quick approval'],
      eligibility: ['Age: 21-65 years', 'Minimum income: ₹25,000/month', 'Good credit score', 'Stable employment'],
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      type: 'Personal Loan',
      icon: User,
      rate: '10.5%',
      description: 'Instant personal loans for all your immediate financial needs',
      features: ['Up to ₹50 Lakhs', 'No collateral required', '24-hour approval', 'Flexible repayment'],
      eligibility: ['Age: 21-60 years', 'Minimum income: ₹20,000/month', 'Employment history: 2+ years', 'Good credit score'],
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      type: 'Business Loan',
      icon: Briefcase,
      rate: '8.5%',
      description: 'Fuel your business growth with our tailored business financing solutions',
      features: ['Up to ₹10 Crores', 'Working capital support', 'Equipment financing', 'Overdraft facility'],
      eligibility: ['Business vintage: 2+ years', 'Annual turnover: ₹10 Lakhs+', 'Good business credit', 'Proper documentation'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      type: 'Education Loan',
      icon: GraduationCap,
      rate: '7.5%',
      description: 'Invest in your future with our comprehensive education loan schemes',
      features: ['Up to ₹1.5 Crores', 'Covers all expenses', 'Moratorium period', 'Tax benefits'],
      eligibility: ['Admission confirmed', 'Co-applicant required', 'Good academic record', 'Course from approved list'],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      type: 'Vehicle Loan',
      icon: Car,
      rate: '7.5%',
      description: 'Drive your dream vehicle with our attractive auto loan offers',
      features: ['Up to 90% financing', 'New & used vehicles', 'Quick processing', 'Competitive rates'],
      eligibility: ['Age: 21-65 years', 'Minimum income: ₹15,000/month', 'Valid driving license', 'Good credit history'],
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      type: 'Mortgage Loan',
      icon: Building,
      rate: '6.5%',
      description: 'Leverage your property value with our flexible mortgage solutions',
      features: ['Up to 75% of property value', 'Flexible tenure', 'Multiple end-use options', 'Competitive rates'],
      eligibility: ['Property ownership proof', 'Clear property title', 'Good credit score', 'Stable income'],
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loan Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Competitive rates, quick approvals, and flexible terms for all your financial needs. 
            Choose from our comprehensive range of loan products designed to help you achieve your goals.
          </p>
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loans.map((loan, index) => {
            const Icon = loan.icon;
            return (
              <Card key={index} className="h-full flex flex-col">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${loan.gradient} rounded-xl flex items-center justify-center mr-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{loan.type}</h3>
                      <p className="text-primary-600 font-semibold">Starting from {loan.rate}*</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 flex-grow">{loan.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {loan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Eligibility:</h4>
                    <ul className="space-y-1">
                      {loan.eligibility.map((criteria, idx) => (
                        <li key={idx} className="text-xs text-gray-500 flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <Button
                    className="w-full mt-auto"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* EMI Calculator */}
        <div className="mb-16">
          <EMICalculator />
        </div>

        {/* Process Steps */}
        <Card className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Simple Application Process</h3>
            <p className="text-gray-600">Get your loan approved in just 4 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply Online', description: 'Fill out our simple online application form' },
              { step: '2', title: 'Document Upload', description: 'Upload required documents securely' },
              { step: '3', title: 'Quick Verification', description: 'Our team verifies your application within 24 hours' },
              { step: '4', title: 'Get Approved', description: 'Receive funds directly in your bank account' },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">{process.step}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
          <p className="text-gray-600 mb-8">Join thousands of satisfied customers who chose FinBridge for their loan needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" icon={ArrowRight} iconPosition="right">
              Start Application
            </Button>
            <Button size="lg" variant="outline">
              Talk to Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansPage;