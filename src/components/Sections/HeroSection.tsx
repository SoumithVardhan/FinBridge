import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Award } from 'lucide-react';
import Button from '../UI/Button';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSectionChange }) => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '₹500Cr+', label: 'Loans Processed' },
    { icon: Shield, value: '99.8%', label: 'Approval Rate' },
    { icon: Award, value: '24/7', label: 'Support' },
  ];

  const scrollToServices = () => {
    document.getElementById('services-overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-purple-600 to-primary-800">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your Complete
                <span className="block text-yellow-300">Financial Partner</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                From loans to insurance, mutual funds to financial planning - 
                FinBridge provides comprehensive financial solutions tailored to your needs with industry-leading security and support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => onSectionChange('portal')}
                icon={ArrowRight}
                iconPosition="right"
                className="!bg-white !text-indigo-600 hover:!bg-gray-100 font-semibold shadow-lg"
              >
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToServices}
                className="!border-2 !border-white !text-white hover:!bg-white hover:!text-indigo-600 font-semibold"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center text-sm text-gray-200">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                RBI Compliant
              </div>
              <div className="flex items-center text-sm text-gray-200">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center text-sm text-gray-200">
                <Users className="w-4 h-4 mr-2 text-blue-400" />
                Trusted by 10,000+ Customers
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="animate-float">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center text-white">
                      <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-white/10 rounded-xl">
                <div className="text-center">
                  <div className="text-sm text-gray-200 mb-2">Average Processing Time</div>
                  <div className="text-2xl font-bold text-yellow-300">24 Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;