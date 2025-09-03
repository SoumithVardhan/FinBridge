import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  FileText,
  Clock,
  Users,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const CreditServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cibil-report');

  const services = [
    {
      id: 'cibil-report',
      title: 'CIBIL Score Check',
      icon: BarChart3,
      description: 'Get your free CIBIL score and detailed credit report',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'credit-repair',
      title: 'Credit Repair',
      icon: TrendingUp,
      description: 'Improve your credit score with expert guidance',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'co-applicant',
      title: 'Co-applicant Issues',
      icon: Users,
      description: 'Resolve co-applicant and guarantor related issues',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const renderCibilReport = () => (
    <div className="space-y-12">
      {/* Hero Image Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <img 
          src="/images/credit/hero-consultation.png" 
          alt="Credit Consultation" 
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/financial-consultation.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Professional Credit Assessment</h3>
            <p className="text-lg text-blue-100">Expert guidance for your financial health</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Form */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Your CIBIL Score for Free</h3>
          <p className="text-lg text-gray-600 mb-8">
            Get your credit score and detailed report instantly. Monitor your credit health regularly.
          </p>
          
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ABCDE1234F"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all shadow-lg">
                Check CIBIL Score
              </button>
              <p className="text-xs text-gray-500 text-center">
                Safe & Secure. No impact on your credit score.
              </p>
            </div>
          </Card>
        </div>

        {/* Right: Credit Expert Image */}
        <div className="text-center">
          <img 
            src="/images/credit/credit-expert.png" 
            alt="Credit Expert" 
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
            onError={(e) => {
              e.currentTarget.src = '/images/team-professional-1.png';
            }}
          />
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Expert Credit Analysis</h4>
            <p className="text-gray-600">Our certified credit experts provide personalized recommendations</p>
          </div>
        </div>
      </div>

      {/* Credit Score Visualization */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Credit Score</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Poor (300-549)</h4>
            <p className="text-sm text-gray-600">Needs immediate attention and credit repair</p>
          </Card>
          <Card className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Fair (550-649)</h4>
            <p className="text-sm text-gray-600">Room for improvement with proper guidance</p>
          </Card>
          <Card className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Excellent (750+)</h4>
            <p className="text-sm text-gray-600">Great credit health, best loan rates available</p>
          </Card>
        </div>
      </div>

      {/* Success Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="/images/credit/success-story.png" 
            alt="Success Story" 
            className="w-full rounded-2xl shadow-lg"
            onError={(e) => {
              e.currentTarget.src = '/images/client-success.png';
            }}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Stories</h3>
          <p className="text-gray-600 mb-6">
            We've helped thousands of clients improve their credit scores and achieve their financial goals.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Average score improvement: 150+ points</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>95% success rate in credit repair</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Expert legal assistance included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Need Expert Help Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <img 
          src="/images/credit/consultation-meeting.png" 
          alt="Expert Consultation" 
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/business-meeting.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/60 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl">
            <h3 className="text-3xl font-bold mb-4">Need Expert Help with Credit Issues?</h3>
            <p className="text-lg text-gray-200 mb-8">
              Get professional assistance for CIBIL issues and co-applicant problems. Free consultation available.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 font-semibold rounded-lg transform hover:scale-105 transition-all shadow-lg">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 bg-white/20 backdrop-blur-sm px-8 py-4 font-semibold rounded-lg transform hover:scale-105 transition-all shadow-lg">
                Check CIBIL Score
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-200 mt-8">
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
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CIBIL Score & Co-applicant Issues
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Free CIBIL score check, credit repair services, and expert legal assistance for 
            co-applicant and guarantor issues. Protect your financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-4 font-semibold border-2 border-white shadow-lg transform hover:scale-105 transition-all"
              style={{
                backgroundColor: 'white',
                color: '#dc2626',
                borderColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.color = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#dc2626';
              }}
            >
              Check Free CIBIL Score
            </Button>
            <Button 
              className="border-2 border-white text-white bg-white/20 backdrop-blur-sm hover:bg-white hover:text-red-600 px-8 py-4 font-semibold transform hover:scale-105 transition-all shadow-lg"
              style={{
                borderColor: 'white',
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Legal Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center px-6 py-4 rounded-lg font-medium transition-all ${
                    activeTab === service.id
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{service.title}</div>
                    <div className="text-xs text-gray-500">{service.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'cibil-report' && renderCibilReport()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditServicesPage;