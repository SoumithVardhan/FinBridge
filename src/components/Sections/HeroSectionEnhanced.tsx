import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Award, Clock } from 'lucide-react';
import Button from '../UI/Button';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

const HeroSectionEnhanced: React.FC<HeroSectionProps> = ({ onSectionChange }) => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Clients', color: 'text-blue-400' },
    { icon: TrendingUp, value: '₹500Cr+', label: 'Loans Processed', color: 'text-green-400' },
    { icon: Shield, value: '99.8%', label: 'Approval Rate', color: 'text-yellow-400' },
    { icon: Award, value: '24/7', label: 'Support', color: 'text-purple-400' },
  ];

  const scrollToServices = () => {
    document.getElementById('services-overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-6"></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-white/8 to-white/3 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400/8 to-yellow-600/4 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content Section */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                  Your Success is
                </span>
                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent mt-2">
                  our Satisfaction
                </span>
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed max-w-2xl drop-shadow-sm">
                SR Associates provides comprehensive financial solutions in Guntur, Andhra Pradesh. 
                From education loans to insurance, business loans to mutual funds - we're your trusted financial partner.
              </p>
            </div>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSectionChange('portal')}
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={scrollToServices}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { icon: Shield, text: 'RBI Compliant', color: 'text-green-400' },
                { icon: Award, text: 'ISO 27001 Certified', color: 'text-yellow-400' },
                { icon: Users, text: 'Trusted by 10,000+ Customers', color: 'text-blue-400' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Hero Image Section */}
          <div className="relative animate-fade-in">
            {/* Main Image Card */}
            <div className="relative group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-2xl group-hover:-translate-y-2">
                
                {/* Top Badge - Processing Time */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-2xl font-bold shadow-xl animate-pulse">
                  <div className="text-center">
                    <div className="text-lg font-bold">24 Hours</div>
                    <div className="text-sm">Processing Time</div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src="/images/financial-consultation.jpg" 
                    alt="Professional Financial Consultation" 
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400'%3E%3Crect width='500' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23666'%3EProfessional Financial%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23666'%3EConsultation%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Image Caption */}
                <div className="text-center text-white relative z-10">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                    Your Trusted Financial Partner
                  </h3>
                  <p className="text-gray-200 text-lg">Expert guidance for all your financial needs</p>
                </div>

                {/* Bottom Right Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {stats.slice(0, 2).map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-gray-800">
                          <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-lg font-bold text-red-600">{stat.value}</div>
                          <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-red-600/20 to-yellow-400/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Stats Bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-8 py-4 border-2 border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-8 text-white">
              {stats.slice(2).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div>
                      <span className="font-bold text-lg">{stat.value}</span>
                      <span className="ml-2 opacity-90">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10 pointer-events-none"></div>
    </section>
  );
};

export default HeroSectionEnhanced;