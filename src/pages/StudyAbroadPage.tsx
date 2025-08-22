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
  Clock,
  Star,
  Target,
  Calculator,
  TrendingUp,
  PiggyBank,
  Banknote,
  Receipt,
  Building2,
  FileCheck,
  Heart // Changed from HandHeart to Heart (which exists in lucide-react)
} from 'lucide-react';

const StudyAbroadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consultancy');

  // UPDATED: Main Study Abroad Services using NEW IMAGES
  const services = [
    {
      id: 'consultancy',
      title: 'Education Consultancy',
      icon: GraduationCap,
      description: 'Personalized guidance for selecting the right course and university based on your profile',
      image: '/images/study-abroad/consultancy.png', // Using existing image
      color: 'from-red-500 to-pink-600',
      features: ['One-on-One Counseling', 'University Selection', 'Career Guidance', 'Test Preparation']
    },
    {
      id: 'application',
      title: 'Application Support',
      icon: FileText,
      description: 'Complete assistance with university applications, SOP writing, and documentation',
      image: '/images/study-abroad/application-support.png', // Using existing image
      color: 'from-green-500 to-emerald-600',
      features: ['Application Forms', 'SOP Writing', 'Document Prep', 'Deadline Management']
    },
    {
      id: 'visa',
      title: 'Visa Processing',
      icon: Globe,
      description: 'End-to-end visa assistance with 99% success rate and complete documentation',
      image: '/images/study-abroad/global-opportunities.png', // Using existing image
      color: 'from-orange-500 to-red-600',
      features: ['Visa Documentation', 'Interview Prep', 'Form Filing', 'Status Tracking']
    },
    {
      id: 'finance',
      title: 'Financial Aid',
      icon: CreditCard,
      description: 'Education loan assistance and scholarship guidance to make dreams affordable',
      image: '/images/study-abroad/student-success.png', // Using existing image
      color: 'from-purple-500 to-pink-600',
      features: ['Education Loans', 'Scholarships', 'Financial Planning', 'Cost Analysis']
    }
  ];

  // UPDATED: Student Loan Services with the 3 MAIN images
  const loanServices = [
    {
      id: 'loan-application',
      title: 'Student Loan Application',
      icon: Banknote,
      description: 'Complete assistance with education loan applications for studying abroad with hassle-free processing',
      image: '/images/study-abroad/student-loan-1.png', // Using existing image
      color: 'from-blue-500 to-cyan-600',
      features: ['Loan Documentation', 'Bank Liaison', 'Application Processing', 'Approval Assistance'],
      benefits: ['Up to ₹1.5 Cr Loan Amount', 'Competitive Interest Rates', 'Quick Processing', 'No Hidden Charges'],
      highlight: 'Most Popular'
    },
    {
      id: 'financial-planning',
      title: 'Comprehensive Financial Planning',
      icon: Calculator,
      description: 'Strategic financial planning for your complete study abroad journey with detailed cost analysis',
      image: '/images/study-abroad/student-loan-2.png', // Using existing image
      color: 'from-emerald-500 to-teal-600',
      features: ['Cost Estimation', 'Budget Planning', 'EMI Calculation', 'Financial Counseling'],
      benefits: ['Detailed Cost Breakdown', 'Currency Fluctuation Planning', 'Living Cost Estimates', 'Part-time Work Guidance'],
      highlight: 'Expert Choice'
    },
    {
      id: 'scholarship',
      title: 'Scholarship & Grant Support',
      icon: PiggyBank,
      description: 'Expert assistance in finding and applying for scholarships, grants, and financial aid opportunities',
      image: '/images/study-abroad/student-loan-3.png', // Using existing image
      color: 'from-amber-500 to-orange-600',
      features: ['Scholarship Search', 'Application Assistance', 'Essay Writing', 'Interview Prep'],
      benefits: ['Merit-based Scholarships', 'Need-based Grants', 'Country-specific Funding', 'University Scholarships'],
      highlight: 'High Success Rate'
    }
  ];

  // NEW: Additional Financial Service
  const additionalService = {
    id: 'loan-processing',
    title: 'Loan Processing Support',
    icon: Building2,
    description: 'End-to-end loan processing assistance with bank partnerships and quick approvals',
    image: '/images/study-abroad/university-campus.png', // Using existing image
    color: 'from-indigo-500 to-purple-600',
    features: ['Document Verification', 'Bank Coordination', 'Status Tracking', 'Quick Approval']
  };

  const countries = [
    { name: 'USA', universities: '950+', flag: '🇺🇸', popular: true, avgCost: '$35,000/year' },
    { name: 'Canada', universities: '120+', flag: '🇨🇦', popular: true, avgCost: '$25,000/year' },
    { name: 'UK', universities: '200+', flag: '🇬🇧', popular: true, avgCost: '$30,000/year' },
    { name: 'Australia', universities: '150+', flag: '🇦🇺', popular: true, avgCost: '$28,000/year' },
    { name: 'Germany', universities: '180+', flag: '🇩🇪', popular: false, avgCost: '$15,000/year' },
    { name: 'Ireland', universities: '80+', flag: '🇮🇪', popular: false, avgCost: '$20,000/year' },
    { name: 'New Zealand', universities: '60+', flag: '🇳🇿', popular: false, avgCost: '$22,000/year' },
    { name: 'Singapore', universities: '25+', flag: '🇸🇬', popular: false, avgCost: '$32,000/year' }
  ];

  const stats = [
    { number: '5000+', label: 'Students Placed', icon: Users },
    { number: '99%', label: 'Visa Success Rate', icon: CheckCircle },
    { number: '₹500Cr+', label: 'Loans Processed', icon: TrendingUp },
    { number: '15+', label: 'Years Experience', icon: Clock }
  ];

  const financialStats = [
    { number: '₹1.5Cr', label: 'Max Loan Amount', icon: Banknote, color: 'from-blue-500 to-blue-600' },
    { number: '7.5%', label: 'Starting Interest Rate', icon: Receipt, color: 'from-green-500 to-green-600' },
    { number: '48 Hrs', label: 'Loan Approval Time', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { number: '95%', label: 'Loan Success Rate', icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' }
  ];

  const loanProcess = [
    {
      step: '01',
      title: 'Document Collection',
      description: 'Gather required documents and financial statements',
      icon: FileCheck,
      duration: '1-2 days'
    },
    {
      step: '02',
      title: 'Application Submission',
      description: 'Submit loan application to partner banks',
      icon: Building2,
      duration: '1 day'
    },
    {
      step: '03',
      title: 'Processing & Verification',
      description: 'Bank processing and document verification',
      icon: Shield,
      duration: '5-7 days'
    },
    {
      step: '04',
      title: 'Approval & Disbursement',
      description: 'Loan approval and fund disbursement to university',
      icon: CheckCircle,
      duration: '2-3 days'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      university: 'Stanford University, USA',
      image: '/images/study-abroad/student-success.png',
      quote: 'FinBridge made my dream of studying at Stanford a reality. Their loan assistance was exceptional!',
      rating: 5,
      course: 'MS Computer Science'
    },
    {
      name: 'Rahul Verma',
      university: 'University of Toronto, Canada',
      image: '/images/study-abroad/student-success.png',
      quote: 'The visa processing was smooth and the financial planning helped me budget perfectly.',
      rating: 5,
      course: 'MBA'
    },
    {
      name: 'Ananya Patel',
      university: 'University of Oxford, UK',
      image: '/images/study-abroad/student-success.png',
      quote: 'Got a full scholarship with their guidance. The team is incredibly supportive!',
      rating: 5,
      course: 'PhD Economics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Gateway to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  {" "}Global Education
                </span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Transform your dreams into reality with our comprehensive study abroad services. 
                From university selection to loan assistance, we're with you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Your Journey
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Get Free Consultation
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/images/study-abroad/hero-banner.png" 
                alt="Study Abroad Success" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Study Abroad Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to visa approval, we provide end-to-end services to make your study abroad journey seamless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Education Loan & Financial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make your education affordable with our comprehensive financial solutions and loan assistance
            </p>
          </div>

          {/* Financial Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {financialStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Loan Services */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {loanServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative"
                >
                  {service.highlight && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                      {service.highlight}
                    </div>
                  )}
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                      <div className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <div className="space-y-1">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Service */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${additionalService.color} rounded-full flex items-center justify-center`}>
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{additionalService.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{additionalService.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {additionalService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={additionalService.image} 
                  alt={additionalService.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Loan Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your education loan approved in just 4 simple steps with our streamlined process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {step.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from top destinations worldwide with excellent education systems and career opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  country.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {country.popular && (
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                    Popular
                  </div>
                )}
                <div className="text-center">
                  <div className="text-4xl mb-3">{country.flag}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{country.name}</h3>
                  <p className="text-gray-600 mb-2">{country.universities} Universities</p>
                  <p className="text-blue-600 font-semibold">{country.avgCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our successful students who are now pursuing their dreams at top universities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.course}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-3">"{testimonial.quote}"</p>
                <p className="text-sm font-semibold text-blue-600">{testimonial.university}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Get expert guidance, loan assistance, and complete support to make your international education dreams come true
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Get Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Calculate Loan EMI</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyAbroadPage;