import React from 'react';
import { CreditCard, Shield, TrendingUp, User, ArrowRight, GraduationCap, Globe, BarChart3, PiggyBank } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface ServicesOverviewProps {
  onSectionChange: (section: string) => void;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onSectionChange }) => {
  const services = [
    {
      id: 'loans',
      title: 'Loans',
      description: 'Quick approval loans with competitive rates and flexible terms',
      icon: CreditCard,
      gradient: 'from-blue-500 to-indigo-600',
      features: ['Home Loans', 'Personal Loans', 'Business Loans', 'Education Loans'],
      buttonText: 'Explore Loans',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Comprehensive insurance coverage for complete peace of mind',
      icon: Shield,
      gradient: 'from-green-500 to-emerald-600',
      features: ['Life Insurance', 'Health Insurance', 'General Insurance', 'Motor Insurance'],
      buttonText: 'View Insurance',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'investments',
      title: 'Investments',
      description: 'Smart investment solutions including mutual funds and fixed deposits',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600',
      features: ['Mutual Funds', 'Fixed Deposits', 'SIP Plans', 'Tax Saving'],
      buttonText: 'Start Investing',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'study-abroad',
      title: 'Study Abroad',
      description: 'Complete education consultancy and visa services',
      icon: GraduationCap,
      gradient: 'from-indigo-500 to-purple-600',
      features: ['Education Consultancy', 'University Applications', 'Education Loans', 'Visa Processing'],
      buttonText: 'Explore Programs',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'visa-services',
      title: 'Visa Services',
      description: 'Expert assistance for all types of visa applications',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-600',
      features: ['B1/B2 Visa', 'Student Visa', 'Work Visa', 'Document Assistance'],
      buttonText: 'Apply Now',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'credit-services',
      title: 'Credit Services',
      description: 'CIBIL score check, credit repair, and co-applicant issues',
      icon: BarChart3,
      gradient: 'from-red-500 to-pink-600',
      features: ['Free CIBIL Score', 'Credit Repair', 'Co-applicant Issues', 'Legal Assistance'],
      buttonText: 'Check Score',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 'portal',
      title: 'Customer Portal',
      description: 'Secure dashboard to manage all your financial services',
      icon: User,
      gradient: 'from-orange-500 to-red-600',
      features: ['Account Management', 'Transaction History', 'Document Upload', '24/7 Support'],
      buttonText: 'Access Portal',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
  ];

  return (
    <section id="services-overview" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Financial Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of integrated financial services designed to help you achieve your goals with expert guidance and cutting-edge technology
          </p>
        </div>

        {/* Services Grid - Fixed alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="group cursor-pointer h-full flex flex-col w-full max-w-xs"
                hover={true}
              >
                <div className="flex flex-col h-full p-6">
                  {/* Icon */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex-grow mb-6">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Button
                    onClick={() => onSectionChange(service.id)}
                    className={`w-full ${service.buttonColor} text-white group-hover:shadow-lg transition-all duration-200 font-semibold`}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SR Associates?</h3>
            <p className="text-lg text-gray-600">We're committed to providing exceptional financial services with transparency and trust</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Compliant</h4>
              <p className="text-gray-600">Bank-grade security with full regulatory compliance and data protection</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h4>
              <p className="text-gray-600">Personalized advice from certified financial experts to maximize your returns</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-gray-600">Round-the-clock customer support to assist you whenever you need help</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;