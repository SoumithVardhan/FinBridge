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
      {/* Background with Team Images Mosaic */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-red-700 to-primary-800">
        {/* Background Team Images Grid - Subtle */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-8">
          <div 
            className="bg-cover bg-center filter grayscale opacity-20" 
            style={{ backgroundImage: `url('/images/team-professional-1.png')` }}
          ></div>
          <div 
            className="bg-cover bg-center filter grayscale opacity-20" 
            style={{ backgroundImage: `url('/images/team-professional-2.png')` }}
          ></div>
          <div 
            className="bg-cover bg-center filter grayscale opacity-20" 
            style={{ backgroundImage: `url('/images/team-professional-3.png')` }}
          ></div>
          <div 
            className="bg-cover bg-center filter grayscale opacity-20" 
            style={{ backgroundImage: `url('/images/team-professional-4.png')` }}
          ></div>
          <div 
            className="bg-cover bg-center filter grayscale opacity-20" 
            style={{ backgroundImage: `url('/images/business-meeting.png')` }}
          ></div>
          <div 
            className="bg-cover bg-center filter grayscale opacity-20" 
            style={{ backgroundImage: `url('/images/client-success.png')` }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div className="text-white space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your Success is
                <span className="block text-yellow-300">our Satisfaction</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                SR Associates provides comprehensive financial solutions in Guntur, Andhra Pradesh. 
                From education loans to insurance, business loans to mutual funds - we're your trusted financial partner.
              </p>
            </div>

            {/* FIXED BUTTONS WITH PROPER STYLING */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSectionChange('portal')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-semibold text-lg rounded-xl shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-red-600 transition-all duration-300 hover:-translate-y-1"
              >
                Learn More
              </button>
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

          {/* Hero Image Section - STATS POSITIONED MORE RIGHT AND DOWN */}
          <div className="animate-float">
            <div className="relative max-w-lg mx-auto pr-16">
              {/* Main Hero Image Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                
                {/* Top Badge - Processing Time */}
                <div className="absolute -top-3 -left-3 bg-yellow-400 text-gray-900 px-4 py-2 rounded-2xl font-bold shadow-xl z-20">
                  <div className="text-center">
                    <div className="text-sm font-bold">24 Hours</div>
                    <div className="text-xs">Processing Time</div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img 
                    src="/images/financial-consultation.png" 
                    alt="Professional Financial Consultation" 
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const alternatives = [
                        '/images/business-meeting.png',
                        '/images/client-success.png',
                        '/images/team-professional-1.png',
                        '/images/team-professional-2.png'
                      ];
                      
                      const currentSrc = target.src.split('/').pop();
                      const currentIndex = alternatives.findIndex(alt => alt.includes(currentSrc?.replace('.png', '') || ''));
                      const nextIndex = currentIndex + 1;
                      
                      if (nextIndex < alternatives.length) {
                        target.src = alternatives[nextIndex];
                      } else {
                        target.style.display = 'none';
                        const container = target.parentElement;
                        if (container) {
                          container.innerHTML = `
                            <div class="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-700">
                              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="m22 9-3 3 3 3"></path>
                                </svg>
                              </div>
                              <h3 class="text-lg font-semibold mb-1">Professional Financial</h3>
                              <p class="text-sm">Consultation Services</p>
                            </div>
                          `;
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Image Caption */}
                <div className="text-center text-white px-4 mb-4">
                  <h3 className="text-lg font-semibold mb-2">Your Trusted Financial Partner</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">Expert guidance for all your financial needs</p>
                </div>
              </div>

              {/* Stats Overlay - MOVED MORE RIGHT AND DOWN */}
              <div className="absolute -bottom-2 right-0 translate-x-12 bg-white backdrop-blur-lg rounded-2xl p-4 border border-gray-200 shadow-2xl z-30 w-52">
                <div className="space-y-3">
                  {stats.slice(0, 2).map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 text-gray-800">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-bold text-red-600 leading-none">{stat.value}</div>
                          <div className="text-xs text-gray-600 mt-1 leading-tight">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="flex justify-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20 shadow-xl">
            <div className="flex items-center justify-center gap-8 text-white text-sm">
              {stats.slice(2).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-yellow-300" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="opacity-90 text-xs">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;