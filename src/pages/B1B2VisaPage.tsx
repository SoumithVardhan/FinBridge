import React, { useState } from 'react';
import { 
  Plane, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Users, 
  Shield,
  ArrowRight,
  DollarSign,
  AlertCircle,
  Phone,
  Mail,
  Upload,
  Download,
  CreditCard
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const B1B2VisaPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    personalInfo: {},
    travelDetails: {},
    documents: [],
    payment: {}
  });

  const visaProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Free consultation to assess your visa eligibility and requirements',
      duration: '30 minutes',
      icon: Users
    },
    {
      step: 2,
      title: 'Document Preparation',
      description: 'Complete assistance in preparing all required documents',
      duration: '3-5 days',
      icon: FileText
    },
    {
      step: 3,
      title: 'DS-160 Form Filing',
      description: 'Professional completion and submission of your DS-160 application',
      duration: '1-2 days',
      icon: CheckCircle
    },
    {
      step: 4,
      title: 'Interview Scheduling',
      description: 'Book your visa interview appointment at the nearest consulate',
      duration: '1 day',
      icon: Calendar
    },
    {
      step: 5,
      title: 'Interview Preparation',
      description: 'Mock interviews and expert guidance for your visa interview',
      duration: '2-3 sessions',
      icon: Shield
    },
    {
      step: 6,
      title: 'Visa Collection',
      description: 'Assistance with passport and visa collection after approval',
      duration: '5-10 days',
      icon: MapPin
    }
  ];

  const requiredDocuments = [
    {
      category: 'Basic Documents',
      documents: [
        'Valid passport (minimum 6 months validity)',
        'Passport-size photographs (2x2 inches)',
        'DS-160 confirmation page',
        'Visa interview appointment confirmation'
      ]
    },
    {
      category: 'Financial Documents',
      documents: [
        'Bank statements (last 6 months)',
        'Income tax returns (last 3 years)',
        'Employment letter and salary certificate',
        'Property documents (if applicable)'
      ]
    },
    {
      category: 'Travel Documents',
      documents: [
        'Travel itinerary and hotel bookings',
        'Return flight tickets (if booked)',
        'Travel insurance',
        'Invitation letter (if visiting someone)'
      ]
    },
    {
      category: 'Supporting Documents',
      documents: [
        'Marriage certificate (if applicable)',
        'Birth certificates of children',
        'Previous US visa copies (if any)',
        'Educational certificates'
      ]
    }
  ];

  const fees = [
    {
      type: 'Government Fees',
      items: [
        { name: 'DS-160 Application Fee', amount: '$185' },
        { name: 'SEVIS Fee (for students)', amount: '$350' },
        { name: 'Biometric Fee', amount: '$85' }
      ]
    },
    {
      type: 'Service Fees',
      items: [
        { name: 'Complete B1/B2 Visa Assistance', amount: '₹25,000' },
        { name: 'Document Review & Preparation', amount: '₹15,000' },
        { name: 'Interview Preparation (3 sessions)', amount: '₹10,000' },
        { name: 'Express Service (Priority)', amount: '₹35,000' }
      ]
    }
  ];

  const applicationSteps = [
    { step: 1, title: 'Personal Information', description: 'Basic details and passport info' },
    { step: 2, title: 'Travel Purpose', description: 'Purpose and duration of visit' },
    { step: 3, title: 'Document Upload', description: 'Required supporting documents' },
    { step: 4, title: 'Payment', description: 'Fees and charges' },
    { step: 5, title: 'Submit Application', description: 'Final review and submission' }
  ];

  const renderApplicationForm = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Step {currentStep}: {applicationSteps[currentStep - 1].title}
      </h3>

      {currentStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name (As per Passport) *</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="P1234567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Indian</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="+91 98765 43210" />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Visit *</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Tourism/Pleasure (B-2)</option>
              <option>Business Meetings (B-1)</option>
              <option>Medical Treatment (B-2)</option>
              <option>Visit Family/Friends (B-2)</option>
              <option>Conference/Seminar (B-1)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intended Arrival Date *</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intended Departure Date *</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">US Address During Stay</label>
            <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Hotel or host address in the US"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Have you visited the US before?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="previous_visit" value="yes" className="mr-2" />
                Yes
              </label>
              <label className="flex items-center">
                <input type="radio" name="previous_visit" value="no" className="mr-2" />
                No
              </label>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Document Requirements</h4>
                <p className="text-sm text-yellow-700">All documents should be clear, colored scans in PDF format (max 5MB each)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              'Valid Passport (Bio Page)',
              'DS-160 Confirmation Page',
              'Passport Size Photo (2x2 inches)',
              'Bank Statements (Last 6 months)',
              'Employment Letter',
              'Income Tax Returns (Last 3 years)',
              'Travel Itinerary',
              'Hotel Bookings (if available)'
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{doc}</h4>
                  <p className="text-sm text-gray-600">Required for visa application</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <Card className="p-6 bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Fee Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>US Government DS-160 Fee</span>
                <span className="font-medium">$185.00</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee (Complete Assistance)</span>
                <span className="font-medium">₹25,000</span>
              </div>
              <div className="flex justify-between">
                <span>Document Review & Preparation</span>
                <span className="font-medium">₹15,000</span>
              </div>
              <div className="flex justify-between">
                <span>Interview Preparation (3 Sessions)</span>
                <span className="font-medium">₹10,000</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span>$185 + ₹50,000</span>
              </div>
            </div>
          </Card>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-2 border-blue-500 cursor-pointer">
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h5 className="font-medium">Credit/Debit Card</h5>
                    <p className="text-sm text-gray-600">Instant payment processing</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border cursor-pointer">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-gray-600 mr-3" />
                  <div>
                    <h5 className="font-medium">Net Banking</h5>
                    <p className="text-sm text-gray-600">Direct bank transfer</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-green-800 mb-2">Application Ready for Submission</h4>
            <p className="text-green-700">Please review all information before final submission</p>
          </div>

          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Applicant:</span> John Doe</div>
              <div><span className="font-medium">Visa Type:</span> B1/B2 Tourist & Business</div>
              <div><span className="font-medium">Purpose:</span> Tourism/Pleasure</div>
              <div><span className="font-medium">Travel Dates:</span> Mar 15 - Apr 15, 2024</div>
            </div>
          </Card>

          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <input type="checkbox" className="mr-3" />
            <label className="text-sm text-gray-700">
              I hereby declare that all information provided is true and accurate. I understand that providing false information may result in visa denial.
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold"
        >
          Previous
        </Button>
        <Button 
          onClick={() => {
            if (currentStep === 5) {
              alert('Application submitted successfully! You will receive a confirmation email shortly.');
            } else {
              setCurrentStep(Math.min(5, currentStep + 1));
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          {currentStep === 5 ? 'Submit Application' : 'Next'}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            B1/B2 Visa Complete Process
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Complete step-by-step B1/B2 visa application assistance with 95% approval rate. 
            Expert guidance from application to visa collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-3 font-semibold">
              Start Application
            </Button>
            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold">
              Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete B1/B2 Visa Process</h2>
          <div className="flex items-center justify-between mb-8">
            {applicationSteps.map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= item.step ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > item.step ? <CheckCircle className="w-6 h-6" /> : item.step}
                </div>
                {index < applicationSteps.length - 1 && (
                  <div className={`w-full h-1 mx-4 ${currentStep > item.step ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4 text-sm">
            {applicationSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="font-medium text-gray-900">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderApplicationForm()}
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Our 6-Step Success Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visaProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="pt-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="flex items-center text-sm text-blue-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.duration}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Required Documents Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requiredDocuments.map((category, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.documents.map((doc, docIndex) => (
                    <li key={docIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Transparent Fee Structure</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {fees.map((feeType, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  {feeType.type}
                </h3>
                <div className="space-y-4">
                  {feeType.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-semibold text-gray-900">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Apply for Your B1/B2 Visa?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started with a free consultation. Our visa experts are here to guide you through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold">
              Start Application
            </Button>
            <Button className="border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white px-8 py-3 font-semibold">
              Free Consultation
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-600">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>visa@srassociates.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default B1B2VisaPage;