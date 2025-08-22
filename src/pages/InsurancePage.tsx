import React from 'react';
import { Heart, UserCheck, Shield, Car, Home, Plane, CheckCircle, ArrowRight, Star, Calculator, Users, Calendar, Phone } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useState } from 'react';

const InsurancePage: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState({
    insuranceType: '',
    coverage: '',
    age: '',
    members: '1',
    name: '',
    email: '',
    phone: '',
    medicalHistory: 'no'
  });
  const [quote, setQuote] = useState<any>(null);

  const insuranceTypes = [
    {
      type: 'Life Insurance',
      icon: Heart,
      coverage: 'Up to ₹5 Crores',
      description: 'Secure your family\'s financial future with comprehensive life insurance coverage',
      image: '/images/insurance/sr-associates/cards/life-insurance.png',
      heroImage: '/images/insurance/sr-associates/05e40303-7516-4d86-91b2-5ebe0d078ec2.png',
      plans: ['Term Life Insurance', 'Whole Life Insurance', 'ULIP Plans', 'Endowment Plans'],
      benefits: ['Tax benefits under 80C', 'Flexible premium payment', 'Rider options available', 'Guaranteed returns'],
      gradient: 'from-red-500 to-pink-600',
      premium: 'Starting ₹500/month'
    },
    {
      type: 'Health Insurance',
      icon: UserCheck,
      coverage: 'Up to ₹1 Crore',
      description: 'Comprehensive healthcare coverage for you and your family\'s medical needs',
      image: '/images/insurance/sr-associates/cards/health-insurance.png',
      heroImage: '/images/insurance/sr-associates/1fb6b5b4-f5c9-45d6-b78b-e711afbdb48e.png',
      plans: ['Individual Health Plan', 'Family Floater Plan', 'Senior Citizen Plan', 'Critical Illness Cover'],
      benefits: ['Cashless treatment', 'Pre & post hospitalization', 'Day care procedures', 'Annual health checkup'],
      gradient: 'from-green-500 to-emerald-600',
      premium: 'Starting ₹200/month'
    },
    {
      type: 'Motor Insurance',
      icon: Car,
      coverage: 'Comprehensive Coverage',
      description: 'Complete protection for your vehicle against accidents, theft, and natural disasters',
      image: '/images/insurance/sr-associates/cards/motor-insurance.png',
      heroImage: '/images/insurance/sr-associates/1fc932d2-b40f-4ff2-83df-16c6ab76383b.png',
      plans: ['Third Party Insurance', 'Comprehensive Insurance', 'Zero Depreciation Cover', 'Engine Protection'],
      benefits: ['24x7 roadside assistance', 'Cashless garage network', 'Quick claim settlement', 'No claim bonus'],
      gradient: 'from-blue-500 to-indigo-600',
      premium: 'Starting ₹2,500/year'
    },
    {
      type: 'Home Insurance',
      icon: Home,
      coverage: 'Up to ₹2 Crores',
      description: 'Protect your home and belongings against fire, theft, and natural calamities',
      image: '/images/insurance/sr-associates/cards/home-insurance.png',
      heroImage: '/images/insurance/sr-associates/45d64d36-9b60-4de7-a950-b284699e7d64.png',
      plans: ['Structure Insurance', 'Contents Insurance', 'Comprehensive Home Plan', 'Tenant Insurance'],
      benefits: ['Fire & allied perils', 'Burglary protection', 'Natural disaster cover', 'Temporary accommodation'],
      gradient: 'from-orange-500 to-red-600',
      premium: 'Starting ₹1,500/year'
    },
    {
      type: 'Travel Insurance',
      icon: Plane,
      coverage: 'Worldwide Coverage',
      description: 'Travel with confidence with our comprehensive travel insurance plans',
      image: '/images/insurance/sr-associates/cards/travel-insurance.png',
      heroImage: '/images/insurance/sr-associates/64526b42-29b8-470e-aba3-ede616da146f.png',
      plans: ['Domestic Travel', 'International Travel', 'Student Travel', 'Senior Citizen Travel'],
      benefits: ['Medical emergencies', 'Trip cancellation', 'Baggage loss', 'Flight delay compensation'],
      gradient: 'from-purple-500 to-pink-600',
      premium: 'Starting ₹100/trip'
    },
    {
      type: 'General Insurance',
      icon: Shield,
      coverage: 'Customized Coverage',
      description: 'Specialized insurance solutions for unique risks and business needs',
      image: '/images/insurance/sr-associates/cards/general-insurance.png',
      heroImage: '/images/insurance/sr-associates/a2d4686e-faaa-4930-8735-cc79dd90eeea.png',
      plans: ['Professional Indemnity', 'Cyber Insurance', 'Marine Insurance', 'Crop Insurance'],
      benefits: ['Tailored solutions', 'Risk assessment', 'Expert guidance', 'Competitive premiums'],
      gradient: 'from-teal-500 to-cyan-600',
      premium: 'Custom pricing'
    }
  ];

  const whyChooseUs = [
    {
      icon: Star,
      title: 'Trusted Partners',
      description: 'We work with top-rated insurance companies to offer you the best coverage options',
      image: '/images/insurance/sr-associates/services/trusted-partners.png'
    },
    {
      icon: CheckCircle,
      title: 'Easy Claims',
      description: 'Hassle-free claim process with dedicated support throughout your claim journey',
      image: '/images/insurance/sr-associates/services/easy-claims.png'
    },
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description: 'Wide range of insurance products to protect all aspects of your life and assets',
      image: '/images/insurance/sr-associates/services/comprehensive-coverage.png'
    }
  ];

  const claimsSteps = [
    { 
      step: '1', 
      title: 'Report Claim', 
      description: 'Notify us immediately about the incident via call or online',
      image: '/images/insurance/sr-associates/claims/step-1-report.png'
    },
    { 
      step: '2', 
      title: 'Submit Documents', 
      description: 'Upload required documents through our secure portal',
      image: '/images/insurance/sr-associates/claims/step-2-documents.png'
    },
    { 
      step: '3', 
      title: 'Assessment', 
      description: 'Our experts assess your claim within 48 hours',
      image: '/images/insurance/sr-associates/claims/step-3-assessment.png'
    },
    { 
      step: '4', 
      title: 'Settlement', 
      description: 'Receive claim amount directly in your bank account',
      image: '/images/insurance/sr-associates/claims/step-4-settlement.png'
    }
  ];

  const handleGetQuote = (insuranceType: string) => {
    setSelectedInsurance(insuranceType);
    setQuoteData(prev => ({ ...prev, insuranceType }));
  };

  const calculatePremium = () => {
    const baseRates = {
      'Life Insurance': 0.001,
      'Health Insurance': 0.002,
      'Motor Insurance': 0.03,
      'Home Insurance': 0.001,
      'Travel Insurance': 0.05,
      'General Insurance': 0.002
    };
    
    const coverage = parseInt(quoteData.coverage) || 0;
    const age = parseInt(quoteData.age) || 25;
    const members = parseInt(quoteData.members) || 1;
    
    const baseRate = baseRates[quoteData.insuranceType as keyof typeof baseRates] || 0.001;
    let premium = coverage * baseRate + (age * 100) + (members * 500);
    
    if (quoteData.medicalHistory === 'yes') {
      premium *= 1.2;
    }
    
    return Math.round(premium);
  };

  const handleQuoteSubmit = () => {
    const premium = calculatePremium();
    const quoteId = `QT${Date.now()}`;
    
    setQuote({
      id: quoteId,
      premium,
      coverage: quoteData.coverage,
      insuranceType: quoteData.insuranceType,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      features: [
        'Cashless claim settlement',
        '24/7 customer support',
        'No waiting period for accidents',
        'Comprehensive coverage'
      ]
    });
  };

  if (selectedInsurance) {
    const insurance = insuranceTypes.find(i => i.type === selectedInsurance);
    
    return (
      <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <img 
                src={insurance?.heroImage || insurance?.image || '/images/placeholder.svg'} 
                alt={insurance?.type || 'Insurance'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{insurance?.type} Quote</h1>
                  <p className="text-gray-200">Get instant premium calculation</p>
                </div>
              </div>
            </div>
          </div>

          {!quote ? (
            <Card>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Get Your Quote</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount (₹)</label>
                    <select
                      value={quoteData.coverage}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, coverage: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select coverage</option>
                      <option value="500000">₹5 Lakhs</option>
                      <option value="1000000">₹10 Lakhs</option>
                      <option value="2500000">₹25 Lakhs</option>
                      <option value="5000000">₹50 Lakhs</option>
                      <option value="10000000">₹1 Crore</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                    <input
                      type="number"
                      value={quoteData.age}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your age"
                      min="18"
                      max="80"
                    />
                  </div>
                  {selectedInsurance === 'Health Insurance' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Family Members</label>
                      <select
                        value={quoteData.members}
                        onChange={(e) => setQuoteData(prev => ({ ...prev, members: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="1">Individual</option>
                        <option value="2">Self + Spouse</option>
                        <option value="3">Self + Spouse + 1 Child</option>
                        <option value="4">Self + Spouse + 2 Children</option>
                        <option value="5">Family Floater (5 members)</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={quoteData.name}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={quoteData.email}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={quoteData.phone}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {(selectedInsurance === 'Health Insurance' || selectedInsurance === 'Life Insurance') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pre-existing Medical Conditions</label>
                      <select
                        value={quoteData.medicalHistory}
                        onChange={(e) => setQuoteData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Get instant premium quote
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Expert consultation call
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Policy documentation
                    </li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedInsurance(null)}>
                    Back to Insurance
                  </Button>
                  <Button onClick={handleQuoteSubmit} icon={Calculator}>
                    Get Instant Quote
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Quote is Ready!</h3>
                  <p className="text-gray-600 mb-6">Quote ID: {quote.id}</p>
                  
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ₹{quote.premium.toLocaleString()}/year
                    </div>
                    <div className="text-gray-600">Premium for ₹{parseInt(quote.coverage).toLocaleString()} coverage</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Coverage Details</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {quote.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Quote Validity</h4>
                      <p className="text-sm text-gray-600">Valid until: {quote.validUntil}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        This quote is based on the information provided and is subject to underwriting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      Buy This Policy
                    </Button>
                    <Button size="lg" variant="outline">
                      Download Quote
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => {
                      setQuote(null);
                      setSelectedInsurance(null);
                      setQuoteData({
                        insuranceType: '', coverage: '', age: '', members: '1',
                        name: '', email: '', phone: '', medicalHistory: 'no'
                      });
                    }}>
                      Get New Quote
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/images/insurance/sr-associates/hero/main-banner.png" 
          alt="Insurance Solutions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Insurance Solutions
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive protection for you and your loved ones. Choose from our wide range of 
              insurance products designed to safeguard your future and provide peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 font-semibold">
                Get Free Quote
              </Button>
              <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 px-8 py-3 font-semibold">
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {insuranceTypes.map((insurance, index) => {
            const Icon = insurance.icon;
            return (
              <Card key={index} className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col h-full">
                  <div className="relative h-48">
                    <img 
                      src={insurance.image} 
                      alt={insurance.type}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${insurance.gradient} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-sm font-bold text-gray-900">{insurance.premium}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{insurance.type}</h3>
                      <p className="text-gray-600 text-sm mb-2">{insurance.description}</p>
                      <span className="text-green-600 font-semibold text-sm">{insurance.coverage}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Available Plans:</h4>
                      <ul className="space-y-2">
                        {insurance.plans.map((plan, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {plan}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 flex-grow">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {insurance.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => handleGetQuote(insurance.type)}
                      className="w-full mt-auto"
                      variant="secondary"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Get Instant Quote
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <Card className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Insurance Services?</h3>
            <p className="text-gray-600">We're committed to providing you with the best insurance solutions and support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center">
                      <div className="w-16 h-16 mb-4 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Insurance Comparison Tool */}
        <Card className="mb-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/images/insurance/sr-associates/hero/secondary-banner.png" 
              alt="Insurance Comparison"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Insurance Comparison Tool</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Compare different insurance plans side by side to find the perfect coverage that fits your needs and budget. 
              Our expert team will help you make an informed decision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" icon={ArrowRight} iconPosition="right">
                Compare Plans
              </Button>
              <Button size="lg" variant="outline">
                Talk to Expert
              </Button>
            </div>
          </div>
        </Card>

        {/* Claims Process */}
        <Card>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Simple Claims Process</h3>
            <p className="text-gray-600">File and track your insurance claims with ease</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {claimsSteps.map((process, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={process.image} 
                    alt={process.title}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {process.step}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InsurancePage;