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
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Your CIBIL Score for Free</h3>
        <p className="text-lg text-gray-600 mb-8">
          Get your credit score and detailed report instantly. Monitor your credit health regularly.
        </p>
        
        <Card className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Get Free CIBIL Score
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Safe & Secure. No impact on your credit score.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Credit Score & CIBIL Services
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Check your CIBIL score for free, repair credit issues, and resolve co-applicant problems 
            with our expert financial and legal services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-3 font-semibold">
              Check Free CIBIL Score
            </Button>
            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold">
              Credit Repair Consultation
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