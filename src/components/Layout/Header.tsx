import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, TrendingUp, CreditCard, User, Phone, Home, GraduationCap, ChevronDown, Plane, BarChart3, FileText, Globe } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'Loans', id: 'loans', icon: CreditCard },
    { name: 'Insurance', id: 'insurance', icon: Shield },
    { name: 'Investments', id: 'investments', icon: TrendingUp },
    {
      name: 'Study Abroad',
      id: 'study-abroad',
      icon: GraduationCap,
      hasDropdown: true,
      subItems: [
        {
          name: 'Education Consultancy',
          id: 'study-abroad',
          description: 'University selection & career guidance',
          icon: FileText,
          action: () => {
            onSectionChange('study-abroad');
            // Set active tab to consultancy
            setTimeout(() => {
              const consultancyTab = document.querySelector('[data-tab="consultancy"]') as HTMLElement;
              if (consultancyTab) consultancyTab.click();
            }, 100);
          }
        },
        {
          name: 'University Applications',
          id: 'study-abroad',
          description: 'Complete application assistance',
          icon: FileText,
          action: () => {
            onSectionChange('study-abroad');
            setTimeout(() => {
              const applicationTab = document.querySelector('[data-tab="application"]') as HTMLElement;
              if (applicationTab) applicationTab.click();
            }, 100);
          }
        },
        {
          name: 'B1/B2 Visa Processing',
          id: 'b1b2-visa',
          description: 'Complete visa application process',
          icon: Plane,
          highlight: true,
          action: () => onSectionChange('b1b2-visa')
        },
        {
          name: 'Education Loans & Scholarships',
          id: 'study-abroad',
          description: 'Financial aid and loan assistance',
          icon: CreditCard,
          action: () => {
            onSectionChange('study-abroad');
            setTimeout(() => {
              const financeTab = document.querySelector('[data-tab="finance"]') as HTMLElement;
              if (financeTab) financeTab.click();
            }, 100);
          }
        },
        {
          name: 'CIBIL & Co-applicant Issues',
          id: 'cibil-issues',
          description: 'Credit score check & legal assistance',
          icon: BarChart3,
          highlight: true,
          action: () => onSectionChange('cibil-issues')
        }
      ]
    },
    { name: 'Portal', id: 'portal', icon: User },
    { name: 'Contact', id: 'contact', icon: Phone },
  ];

  const handleNavClick = (sectionId: string, customAction?: () => void) => {
    if (customAction) {
      customAction();
    } else {
      onSectionChange(sectionId);
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (e: React.MouseEvent, navId: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === navId ? null : navId);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">SR</span>
            </div>
            <span className="text-2xl font-bold gradient-text">SR Associates</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id || 
                (item.hasDropdown && item.subItems?.some(sub => currentSection === sub.id));
              
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        handleDropdownClick(e, item.id);
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        activeDropdown === item.id ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">Study Abroad Services</h3>
                        <p className="text-xs text-gray-600">Complete solutions for your study abroad journey</p>
                      </div>
                      {item.subItems?.map((subItem, index) => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={index}
                            onClick={() => handleNavClick(subItem.id, subItem.action)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start space-x-3 ${
                              subItem.highlight ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              subItem.highlight ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              <SubIcon className={`w-4 h-4 ${
                                subItem.highlight ? 'text-blue-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className={`text-sm font-medium ${
                                subItem.highlight ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {subItem.name}
                                {subItem.highlight && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-600">{subItem.description}</div>
                            </div>
                          </button>
                        );
                      })}
                      <div className="px-4 py-2 border-t border-gray-100 mt-2">
                        <button
                          onClick={() => handleNavClick('study-abroad')}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View All Study Abroad Services →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.hasDropdown) {
                          setActiveDropdown(activeDropdown === item.id ? null : item.id);
                        } else {
                          handleNavClick(item.id);
                        }
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </div>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>

                    {/* Mobile Dropdown */}
                    {item.hasDropdown && activeDropdown === item.id && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.subItems?.map((subItem, index) => {
                          const SubIcon = subItem.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => handleNavClick(subItem.id, subItem.action)}
                              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm transition-colors ${
                                subItem.highlight 
                                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' 
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <SubIcon className="w-4 h-4 mr-2" />
                              {subItem.name}
                              {subItem.highlight && (
                                <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                                  New
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;