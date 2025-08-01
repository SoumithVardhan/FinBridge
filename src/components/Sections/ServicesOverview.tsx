import React from 'react';
import { CreditCard, Shield, TrendingUp, User, ArrowRight } from 'lucide-react';
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
      id: 'mutual-funds',
      title: 'Mutual Funds',
      description: 'Smart investment solutions to grow your wealth systematically',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600',
      features: ['Equity Funds', 'Debt Funds', 'Hybrid Funds', 'SIP Plans'],
      buttonText: 'Start Investing',
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="group cursor-pointer h-full flex flex-col"
                hover={true}
              >
                <div className="flex flex-col h-full">
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
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Button
                    onClick={() => onSectionChange(service.id)}
                    className={`w-full ${service.buttonColor} text-white group-hover:shadow-lg`}
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
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Compliant</h4>
              <p className="text-gray-600">Bank-grade security with full regulatory compliance and data protection</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-secondary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h4>
              <p className="text-gray-600">Personalized advice from certified financial experts to maximize your returns</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-purple-600" />
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