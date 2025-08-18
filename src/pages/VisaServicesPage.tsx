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
  Mail
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const VisaServicesPage: React.FC = () => {
  const [activeVisaType, setActiveVisaType] = useState('b1-b2');

  const visaTypes = [
    {
      id: 'b1-b2',
      title: 'B1/B2 Tourist & Business Visa',
      icon: Plane,
      description: 'For tourism, business meetings, and temporary visits',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'f1',
      title: 'F1 Student Visa',
      icon: FileText,
      description: 'For academic studies in the United States',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'h1b',
      title: 'H1B Work Visa',
      icon: Users,
      description: 'For skilled workers and professionals',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const b1b2Process = [
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

  const successTips = [
    {
      icon: FileText,
      title: 'Complete Documentation',
      description: 'Ensure all documents are complete, accurate, and up-to-date'
    },
    {
      icon: DollarSign,
      title: 'Strong Financial Proof',
      description: 'Show sufficient funds and strong ties to your home country'
    },
    {
      icon: Users,
      title: 'Honest Interview',
      description: 'Be honest, confident, and consistent in your visa interview'
    },
    {
      icon: Clock,
      title: 'Apply Early',
      description: 'Apply at least 2-3 months before your planned travel date'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            US Visa Services
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Expert assistance for all types of US visas. Our experienced team has helped thousands 
            of clients successfully obtain their US visas with a 95% approval rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3">
              Start Application
            </Button>
            <Button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* B1/B2 Visa Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">B1/B2 Visa Complete Process</h2>
            <p className="text-lg text-gray-600">
              Step-by-step guidance through the entire B1/B2 visa application process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b1b2Process.map((step, index) => {
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <p className="text-lg text-gray-600">
              Complete checklist of documents needed for your B1/B2 visa application
            </p>
          </div>

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

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Apply for Your US Visa?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started with a free consultation. Our visa experts are here to guide you through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Application
            </Button>
            <Button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3">
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

export default VisaServicesPage;