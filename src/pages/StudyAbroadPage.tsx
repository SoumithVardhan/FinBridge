import React, { useState } from 'react';
import { 
  GraduationCap, 
  Globe, 
  FileText, 
  CreditCard, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  DollarSign,
  Shield,
  Clock
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const StudyAbroadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consultancy');

  const services = [
    {
      id: 'consultancy',
      title: 'Education Consultancy',
      icon: GraduationCap,
      description: 'Expert guidance for your study abroad journey',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'application',
      title: 'University Application',
      icon: FileText,
      description: 'Complete application assistance for top universities',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'finance',
      title: 'Loans & Scholarships',
      icon: CreditCard,
      description: 'Financial solutions for your education',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'visa',
      title: 'Visa Processing',
      icon: Globe,
      description: 'Complete visa assistance with 99% success rate',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const countries = [
    { name: 'USA', universities: '950+', flag: '🇺🇸', popular: true },
    { name: 'Canada', universities: '120+', flag: '🇨🇦', popular: true },
    { name: 'UK', universities: '200+', flag: '🇬🇧', popular: true },
    { name: 'Australia', universities: '150+', flag: '🇦🇺', popular: true },
    { name: 'Germany', universities: '180+', flag: '🇩🇪', popular: false },
    { name: 'Ireland', universities: '80+', flag: '🇮🇪', popular: false },
    { name: 'New Zealand', universities: '60+', flag: '🇳🇿', popular: false },
    { name: 'Singapore', universities: '25+', flag: '🇸🇬', popular: false }
  ];

  const consultancyFeatures = [
    {
      title: 'One-on-One Counseling',
      description: 'Personalized guidance from country specialists',
      icon: Users
    },
    {
      title: 'University Selection',
      description: 'Shortlist ideal destinations and programs',
      icon: Award
    },
    {
      title: 'Career Guidance',
      description: 'Expert advice on career opportunities',
      icon: BookOpen
    },
    {
      title: 'Test Preparation',
      description: 'IELTS, TOEFL, GRE, GMAT coaching',
      icon: CheckCircle
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'consultancy':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Education Consultancy</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get personalized guidance from our experienced education consultants who have helped thousands of students achieve their study abroad dreams.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultancyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Fixed to use red color scheme */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Study Abroad with Confidence
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Complete study abroad solutions - from university selection to visa approval. 
            Join thousands of successful students who achieved their dreams with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-3 font-semibold border border-red-200 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Book Free Consultation
            </button>
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
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === service.id
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {service.title}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Study Destinations</h2>
            <p className="text-lg text-gray-600">
              Explore top universities across the globe with our expert guidance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <Card 
                key={index} 
                className={`p-6 text-center cursor-pointer group hover:shadow-lg transition-all ${
                  country.popular ? 'border-2 border-red-200' : ''
                }`}
              >
                <div className="text-4xl mb-3">{country.flag}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{country.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{country.universities} Universities</p>
                {country.popular && (
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                    Popular
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Fixed to use red color scheme */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Get free consultation with our expert counselors and take the first step towards your dream education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-3 font-semibold border border-red-200 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyAbroadPage;