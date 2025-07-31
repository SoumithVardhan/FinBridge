import React from 'react';
import { Heart, UserCheck, Shield, Car, Home, Plane, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const InsurancePage: React.FC = () => {
  const insuranceTypes = [
    {
      type: 'Life Insurance',
      icon: Heart,
      coverage: 'Up to ₹5 Crores',
      description: 'Secure your family\'s financial future with comprehensive life insurance coverage',
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
      description: 'We work with top-rated insurance companies to offer you the best coverage options'
    },
    {
      icon: CheckCircle,
      title: 'Easy Claims',
      description: 'Hassle-free claim process with dedicated support throughout your claim journey'
    },
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description: 'Wide range of insurance products to protect all aspects of your life and assets'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Insurance Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive protection for you and your loved ones. Choose from our wide range of 
            insurance products designed to safeguard your future and provide peace of mind.
          </p>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {insuranceTypes.map((insurance, index) => {
            const Icon = insurance.icon;
            return (
              <Card key={index} className="h-full flex flex-col">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${insurance.gradient} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{insurance.type}</h3>
                    <p className="text-gray-600 text-sm mb-2">{insurance.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600 font-semibold">{insurance.coverage}</span>
                      <span className="text-primary-600 font-semibold">{insurance.premium}</span>
                    </div>
                  </div>

                  {/* Plans */}
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

                  {/* Benefits */}
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

                  {/* Get Quote Button */}
                  <Button
                    className="w-full mt-auto"
                    variant="secondary"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Get Quote
                  </Button>
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
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Insurance Comparison Tool */}
        <Card className="mb-16 text-center">
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
        </Card>

        {/* Claims Process */}
        <Card>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Simple Claims Process</h3>
            <p className="text-gray-600">File and track your insurance claims with ease</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Report Claim', description: 'Notify us immediately about the incident via call or online' },
              { step: '2', title: 'Submit Documents', description: 'Upload required documents through our secure portal' },
              { step: '3', title: 'Assessment', description: 'Our experts assess your claim within 48 hours' },
              { step: '4', title: 'Settlement', description: 'Receive claim amount directly in your bank account' },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary-600">{process.step}</span>
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