import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  FileText,
  Clock,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Shield,
  CreditCard,
  Building2,
  Download,
  Gavel,
  Scale
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const CibilCoApplicantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cibil-check');
  const [showScore, setShowScore] = useState(false);
  const [formData, setFormData] = useState({
    pan: '',
    mobile: '',
    email: ''
  });

  const coApplicantIssues = [
    {
      title: 'Co-applicant Default Impact',
      description: 'When your co-applicant defaults, it directly affects your credit score',
      severity: 'High',
      solution: 'Legal action against co-applicant and lender negotiation',
      timeframe: '90-180 days',
      cost: '₹15,000 - ₹50,000'
    },
    {
      title: 'Guarantor Liability Issues',
      description: 'Being held liable for someone else\'s loan default',
      severity: 'High',
      solution: 'Legal documentation review and liability assessment',
      timeframe: '60-120 days',
      cost: '₹20,000 - ₹75,000'
    },
    {
      title: 'Joint Account Problems',
      description: 'Issues arising from joint loans and credit cards',
      severity: 'Medium',
      solution: 'Account separation and liability division',
      timeframe: '30-90 days',
      cost: '₹10,000 - ₹25,000'
    },
    {
      title: 'Incorrect Co-applicant Information',
      description: 'Wrong details showing in your credit report',
      severity: 'Medium',
      solution: 'Dispute filing with supporting documents',
      timeframe: '30-60 days',
      cost: '₹5,000 - ₹15,000'
    }
  ];

  const legalServices = [
    {
      service: 'Legal Notice to Co-applicant',
      description: 'Formal legal notice demanding action from defaulting co-applicant',
      price: '₹5,000',
      timeframe: '7-15 days'
    },
    {
      service: 'Lender Negotiation',
      description: 'Professional negotiation with lenders for settlement',
      price: '₹15,000',
      timeframe: '30-45 days'
    },
    {
      service: 'Court Representation',
      description: 'Legal representation in court proceedings',
      price: '₹25,000+',
      timeframe: '3-12 months'
    },
    {
      service: 'Recovery Action',
      description: 'Legal action to recover money from co-applicant',
      price: '₹20,000+',
      timeframe: '6-18 months'
    }
  ];

  const successStories = [
    {
      case: 'Guarantor Liability - ₹15 Lakhs',
      problem: 'Client was liable for friend\'s business loan default',
      solution: 'Legal negotiation and settlement',
      result: 'Settled for ₹5 lakhs, saved ₹10 lakhs',
      timeframe: '4 months'
    },
    {
      case: 'Co-applicant Credit Damage',
      problem: 'Spouse\'s loan default affected client\'s score',
      solution: 'Credit repair and dispute resolution',
      result: 'Score improved from 520 to 720',
      timeframe: '8 months'
    },
    {
      case: 'Joint Account Issues',
      problem: 'Ex-partner\'s defaults showing in credit report',
      solution: 'Account separation and credit cleanup',
      result: 'Clean credit report, score increased to 750+',
      timeframe: '6 months'
    }
  ];

  const handleCibilCheck = () => {
    if (formData.pan && formData.mobile && formData.email) {
      setTimeout(() => {
        setShowScore(true);
      }, 2000);
    }
  };

  const renderCibilCheck = () => (
    <div className="space-y-8">
      {!showScore ? (
        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <BarChart3 className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Free CIBIL Score</h2>
            <p className="text-gray-600">Get your credit score instantly and understand its impact on loan applications</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
              <input
                type="text"
                value={formData.pan}
                onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="ABCDE1234F"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="+91 98765 43210"
                maxLength={13}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-red-800 mb-1">Safe & Secure</h4>
                  <p className="text-red-700">Your data is encrypted and secure. Checking your score doesn't impact it.</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCibilCheck}
              disabled={!formData.pan || !formData.mobile || !formData.email}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold"
            >
              Get Free CIBIL Score
            </Button>

            <p className="text-xs text-gray-500 text-center">
              * Free score available once per year as per RBI guidelines
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-8 text-center bg-green-50 border-green-200">
            <div className="text-6xl font-bold text-green-600 mb-2">756</div>
            <div className="text-lg text-gray-600 mb-4">Excellent</div>
            <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
              <Calendar className="w-4 h-4 mr-1" />
              Last updated: January 15, 2024
            </div>
            <div className="flex justify-center space-x-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                <Download className="w-4 h-4 mr-1" />
                Download Report
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                Improve Score
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  const renderCoApplicantServices = () => (
    <div className="space-y-8">
      {/* Warning Section */}
      <Card className="p-6 bg-red-50 border-red-200">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-4 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-red-800 mb-2">Important Warning About Co-applicant Liability</h4>
            <p className="text-red-700 mb-4">
              When you become a co-applicant or guarantor, you become equally liable for the loan. 
              If the primary borrower defaults, it directly impacts your credit score and you become liable for the entire amount.
            </p>
            <ul className="space-y-2 text-red-700 text-sm">
              <li className="flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Your credit score will be affected by any defaults
              </li>
              <li className="flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                You are legally liable for the full loan amount
              </li>
              <li className="flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Banks can recover from you directly
              </li>
              <li className="flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Your future loan applications may be rejected
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Common Issues */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Co-applicant Issues We Resolve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coApplicantIssues.map((issue, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  issue.severity === 'High' ? 'bg-red-100 text-red-600' :
                  issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {issue.severity} Priority
                </span>
              </div>
              <p className="text-gray-600 mb-4">{issue.description}</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Solution:</span> {issue.solution}</div>
                <div><span className="font-medium">Timeframe:</span> {issue.timeframe}</div>
                <div><span className="font-medium">Estimated Cost:</span> {issue.cost}</div>
              </div>
              <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold">
                Get Help Now
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Legal Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Legal Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalServices.map((service, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Gavel className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{service.service}</h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">{service.price}</div>
                  <div className="text-xs text-gray-500">{service.timeframe}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                <Scale className="w-4 h-4 mr-2" />
                Consult Lawyer
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <Card className="p-8 bg-green-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{story.case}</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-red-600">Problem:</span>
                  <p className="text-gray-600">{story.problem}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-600">Solution:</span>
                  <p className="text-gray-600">{story.solution}</p>
                </div>
                <div>
                  <span className="font-medium text-green-600">Result:</span>
                  <p className="text-gray-600">{story.result}</p>
                </div>
                <div className="text-xs text-gray-500">
                  Resolved in: {story.timeframe}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Fixed button styling */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CIBIL Score & Co-applicant Issues
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Free CIBIL score check, credit repair services, and expert legal assistance 
            for co-applicant and guarantor issues. Protect your financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-3 font-semibold border border-red-200">
              Check Free CIBIL Score
            </Button>
            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold">
              Legal Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: 'cibil-check', label: 'CIBIL Score Check', icon: BarChart3 },
              { id: 'co-applicant', label: 'Co-applicant Issues', icon: Users },
              { id: 'credit-repair', label: 'Credit Repair', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'cibil-check' && renderCibilCheck()}
            {activeTab === 'co-applicant' && renderCoApplicantServices()}
            {activeTab === 'credit-repair' && (
              <Card className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Credit Repair Services</h2>
                <p className="text-gray-600 mb-6">Improve your credit score with our expert assistance and proven strategies</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { plan: 'Basic', price: '₹9,999', duration: '3 months' },
                    { plan: 'Professional', price: '₹19,999', duration: '6 months' },
                    { plan: 'Premium', price: '₹29,999', duration: '12 months' }
                  ].map((item, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.plan}</h3>
                      <div className="text-2xl font-bold text-red-600 mb-2">{item.price}</div>
                      <div className="text-sm text-gray-600 mb-4">{item.duration}</div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                        Choose Plan
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Expert Help with Credit Issues?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get professional assistance for CIBIL issues and co-applicant problems. Free consultation available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold">
              Get Free Consultation
            </Button>
            <Button className="border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white px-8 py-3 font-semibold">
              Check CIBIL Score
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-600">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>credit@srassociates.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CibilCoApplicantPage;