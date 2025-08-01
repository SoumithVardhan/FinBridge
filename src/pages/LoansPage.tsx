import React from 'react';
import { Home, User, Briefcase, GraduationCap, Car, Building, CheckCircle, ArrowRight, Calculator, FileText, Clock, Shield } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import EMICalculator from '../components/Calculators/EMICalculator';
import FormField from '../components/UI/FormField';
import ProgressSteps from '../components/UI/ProgressSteps';
import { useFormValidation, commonValidationRules } from '../hooks/useFormValidation';
import { useState } from 'react';

const LoansPage: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [applicationStep, setApplicationStep] = useState(0);
  const [applicationData, setApplicationData] = useState({
    loanType: '',
    amount: '',
    tenure: '',
    income: '',
    employment: '',
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: '',
    city: '',
    pincode: '',
    documents: [] as string[]
  });

  // Form validation rules
  const loanValidation = useFormValidation({
    amount: {
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 100000) return 'Minimum loan amount is ₹1,00,000';
        if (num > 100000000) return 'Maximum loan amount is ₹10,00,00,000';
        return null;
      }
    },
    tenure: { required: true },
    income: {
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 15000) return 'Minimum monthly income should be ₹15,000';
        return null;
      }
    },
    employment: { required: true },
    name: commonValidationRules.name,
    email: commonValidationRules.email,
    phone: commonValidationRules.phone,
    pan: commonValidationRules.pan,
    address: { required: true, minLength: 10 },
    city: { required: true, minLength: 2 },
    pincode: {
      required: true,
      pattern: /^[1-9][0-9]{5}$/,
      custom: (value: string) => {
        if (value.length !== 6) return 'PIN code must be 6 digits';
        return null;
      }
    }
  });

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

  const applicationSteps = [
    { title: 'Loan Details', icon: Calculator },
    { title: 'Personal Info', icon: User },
    { title: 'Documents', icon: FileText },
    { title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleLoanSelect = (loanType: string) => {
    setSelectedLoan(loanType);
    setApplicationData(prev => ({ ...prev, loanType }));
    setApplicationStep(1);
  };

  const handleNextStep = () => {
    let fieldsToValidate: { [key: string]: string } = {};
    
    if (applicationStep === 1) {
      fieldsToValidate = {
        amount: applicationData.amount,
        tenure: applicationData.tenure,
        income: applicationData.income,
        employment: applicationData.employment
      };
    } else if (applicationStep === 2) {
      fieldsToValidate = {
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        pan: applicationData.pan,
        address: applicationData.address,
        city: applicationData.city,
        pincode: applicationData.pincode
      };
    }
    
    if (loanValidation.validateForm(fieldsToValidate)) {
      setApplicationStep(applicationStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setApplicationStep(applicationStep - 1);
    loanValidation.clearAllErrors();
  };

  const handleApplicationSubmit = () => {
    const applicationId = `${applicationData.loanType.replace(/\s+/g, '').toUpperCase()}${Date.now()}`;
    
    // Show success message
    alert(`Application submitted successfully!\n\nReference ID: ${applicationId}\n\nNext Steps:\n• Document verification will begin within 24 hours\n• You will receive an email with required documents list\n• Our team will contact you for further processing`);
    
    // Reset form
    setSelectedLoan(null);
    setApplicationStep(0);
    setApplicationData({
      loanType: '', amount: '', tenure: '', income: '', employment: '', 
      name: '', email: '', phone: '', pan: '', address: '', city: '', pincode: '', documents: []
    });
    loanValidation.clearAllErrors();
  };

  if (selectedLoan) {
    const loan = loans.find(l => l.type === selectedLoan);
    
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Application Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{loan?.type} Application</h1>
            <p className="text-gray-600">Complete your application in 4 simple steps</p>
          </div>

          {/* Progress Steps */}
          <ProgressSteps 
            steps={applicationSteps} 
            currentStep={applicationStep} 
            className="mb-8"
          />

          {/* Application Form */}
          <Card>
            {applicationStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Loan Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Loan Amount"
                    type="number"
                    value={applicationData.amount}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, amount: value }));
                      loanValidation.clearError('amount');
                    }}
                    error={loanValidation.errors.amount}
                    placeholder="Enter loan amount (₹)"
                    min="100000"
                    max="100000000"
                    required
                  />
                  
                  <FormField
                    label="Tenure"
                    type="select"
                    value={applicationData.tenure}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, tenure: value }));
                      loanValidation.clearError('tenure');
                    }}
                    error={loanValidation.errors.tenure}
                    options={[...Array(30)].map((_, i) => ({
                      value: (i + 1).toString(),
                      label: `${i + 1} Year${i > 0 ? 's' : ''}`
                    }))}
                    placeholder="Select tenure"
                    required
                  />
                  
                  <FormField
                    label="Monthly Income"
                    type="number"
                    value={applicationData.income}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, income: value }));
                      loanValidation.clearError('income');
                    }}
                    error={loanValidation.errors.income}
                    placeholder="Enter monthly income (₹)"
                    min="15000"
                    required
                  />
                  
                  <FormField
                    label="Employment Type"
                    type="select"
                    value={applicationData.employment}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, employment: value }));
                      loanValidation.clearError('employment');
                    }}
                    error={loanValidation.errors.employment}
                    options={[
                      { value: 'salaried', label: 'Salaried' },
                      { value: 'self-employed', label: 'Self Employed' },
                      { value: 'business', label: 'Business Owner' },
                      { value: 'professional', label: 'Professional' }
                    ]}
                    placeholder="Select employment type"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedLoan(null)}>
                    Back to Loans
                  </Button>
                  <Button onClick={handleNextStep}>
                    Next: Personal Details
                  </Button>
                </div>
              </div>
            )}

            {applicationStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    value={applicationData.name}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, name: value }));
                      loanValidation.clearError('name');
                    }}
                    error={loanValidation.errors.name}
                    placeholder="Enter full name"
                    required
                  />
                  
                  <FormField
                    label="Email Address"
                    type="email"
                    value={applicationData.email}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, email: value }));
                      loanValidation.clearError('email');
                    }}
                    error={loanValidation.errors.email}
                    placeholder="Enter email address"
                    required
                  />
                  
                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={applicationData.phone}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, phone: value }));
                      loanValidation.clearError('phone');
                    }}
                    error={loanValidation.errors.phone}
                    placeholder="Enter phone number"
                    required
                  />
                  
                  <FormField
                    label="PAN Number"
                    value={applicationData.pan}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, pan: value.toUpperCase() }));
                      loanValidation.clearError('pan');
                    }}
                    error={loanValidation.errors.pan}
                    placeholder="Enter PAN number"
                    maxLength={10}
                    required
                  />
                  
                  <div className="md:col-span-2">
                    <FormField
                      label="Address"
                      type="textarea"
                      value={applicationData.address}
                      onChange={(value) => {
                        setApplicationData(prev => ({ ...prev, address: value }));
                        loanValidation.clearError('address');
                      }}
                      error={loanValidation.errors.address}
                      placeholder="Enter complete address"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <FormField
                    label="City"
                    value={applicationData.city}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, city: value }));
                      loanValidation.clearError('city');
                    }}
                    error={loanValidation.errors.city}
                    placeholder="Enter city"
                    required
                  />
                  
                  <FormField
                    label="PIN Code"
                    value={applicationData.pincode}
                    onChange={(value) => {
                      setApplicationData(prev => ({ ...prev, pincode: value }));
                      loanValidation.clearError('pincode');
                    }}
                    error={loanValidation.errors.pincode}
                    placeholder="Enter PIN code"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <Button onClick={handleNextStep}>
                    Next: Documents
                  </Button>
                </div>
              </div>
            )}

            {applicationStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Document Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Identity Proof</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload Aadhaar/Passport/Voter ID</p>
                    <Button size="sm" variant="outline">Choose File</Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Income Proof</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload Salary Slips/ITR</p>
                    <Button size="sm" variant="outline">Choose File</Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Address Proof</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload Utility Bill/Rent Agreement</p>
                    <Button size="sm" variant="outline">Choose File</Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Bank Statement</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload 6 months bank statement</p>
                    <Button size="sm" variant="outline">Choose File</Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <Button onClick={() => setApplicationStep(4)}>
                    Next: Review
                  </Button>
                </div>
              </div>
            )}

            {applicationStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Review & Submit</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Application Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Loan Type:</span> {applicationData.loanType}</div>
                    <div><span className="font-medium">Amount:</span> ₹{applicationData.amount}</div>
                    <div><span className="font-medium">Tenure:</span> {applicationData.tenure} years</div>
                    <div><span className="font-medium">Monthly Income:</span> ₹{applicationData.income}</div>
                    <div><span className="font-medium">Name:</span> {applicationData.name}</div>
                    <div><span className="font-medium">Email:</span> {applicationData.email}</div>
                    <div><span className="font-medium">Phone:</span> {applicationData.phone}</div>
                    <div><span className="font-medium">PAN:</span> {applicationData.pan}</div>
                    <div><span className="font-medium">City:</span> {applicationData.city}</div>
                    <div><span className="font-medium">PIN Code:</span> {applicationData.pincode}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and conditions and privacy policy
                  </label>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <Button onClick={handleApplicationSubmit}>
                    Submit Application
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

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
                    onClick={() => handleLoanSelect(loan.type)}
                    className="w-full mt-auto"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Apply for {loan.type}
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