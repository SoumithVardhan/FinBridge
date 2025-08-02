// SR Associates Brand Constants
export const COMPANY_INFO = {
  name: 'SR Associates',
  tagline: 'Your Success is our Satisfaction',
  shortName: 'SR',
  description: 'Your trusted financial partner in Guntur, Andhra Pradesh. We provide comprehensive financial solutions including loans, insurance, and investment services with personalized guidance.',
  
  // Contact Information
  contact: {
    phone: '+91 96529 37356',
    phoneSecondary: '+91 93987 29870',
    email: 'info@srassociates.com',
    whatsapp: '+91 96529 37356',
    managingDirector: 'S. Onnur Basha',
    address: {
      street: 'OPP. ITC, Srinivasaraopeta',
      city: 'Guntur',
      pincode: '522 004',
      state: 'Andhra Pradesh',
      country: 'India',
      full: 'OPP. ITC, Srinivasaraopeta, GUNTUR - 522 004 AP'
    }
  },
  
  // Business Hours
  businessHours: {
    weekdays: '9:00 AM - 7:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: 'Closed'
  },
  
  // Services
  services: [
    'Education Loans',
    'Personal Loans',
    'Home Loans',
    'Business Loans',
    'Vehicle Loans',
    'Life Insurance',
    'Health Insurance',
    'Mutual Funds'
  ],
  
  // Social Media (placeholder links)
  socialMedia: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    instagram: '#'
  },
  
  // Stats
  stats: {
    clients: '10,000+',
    loansProcessed: '₹500Cr+',
    approvalRate: '99.8%',
    support: '24/7',
    processingTime: '24 Hours'
  },
  
  // Brand Colors (matching Tailwind config)
  colors: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  
  // Trust Indicators
  certifications: [
    'RBI Compliant',
    'ISO 27001 Certified',
    'Trusted by 10,000+ Customers'
  ]
};

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: 'Home', id: 'home', icon: 'Home' },
  { name: 'Loans', id: 'loans', icon: 'CreditCard' },
  { name: 'Insurance', id: 'insurance', icon: 'Shield' },
  { name: 'Mutual Funds', id: 'mutual-funds', icon: 'TrendingUp' },
  { name: 'Portal', id: 'portal', icon: 'User' },
  { name: 'Contact', id: 'contact', icon: 'Phone' },
];

// Loan Types
export const LOAN_TYPES = [
  {
    id: 'education',
    name: 'Education Loan',
    description: 'Fund your dreams with our education loans',
    icon: 'GraduationCap',
    features: ['Low Interest Rates', 'No Collateral Required', 'Flexible Repayment'],
    interestRate: '8.5% onwards'
  },
  {
    id: 'personal',
    name: 'Personal Loan',
    description: 'Quick personal loans for all your needs',
    icon: 'User',
    features: ['Instant Approval', 'Minimal Documentation', 'Quick Disbursal'],
    interestRate: '10.5% onwards'
  },
  {
    id: 'home',
    name: 'Home Loan',
    description: 'Make your dream home a reality',
    icon: 'Home',
    features: ['Low EMI', 'Long Tenure', 'Tax Benefits'],
    interestRate: '8.75% onwards'
  },
  {
    id: 'business',
    name: 'Business Loan',
    description: 'Grow your business with our funding',
    icon: 'Building',
    features: ['Flexible Terms', 'Quick Processing', 'Competitive Rates'],
    interestRate: '11% onwards'
  },
  {
    id: 'vehicle',
    name: 'Vehicle Loan',
    description: 'Get your dream vehicle today',
    icon: 'Car',
    features: ['Up to 90% Financing', 'Fast Approval', 'Competitive Rates'],
    interestRate: '9.5% onwards'
  }
];

// Insurance Types
export const INSURANCE_TYPES = [
  {
    id: 'life',
    name: 'Life Insurance',
    description: 'Secure your family\'s future',
    icon: 'Heart',
    features: ['High Coverage', 'Tax Benefits', 'Flexible Premiums']
  },
  {
    id: 'health',
    name: 'Health Insurance',
    description: 'Comprehensive health coverage',
    icon: 'Shield',
    features: ['Cashless Treatment', 'Wide Network', 'Family Coverage']
  },
  {
    id: 'vehicle',
    name: 'Vehicle Insurance',
    description: 'Protect your vehicle investment',
    icon: 'Car',
    features: ['Comprehensive Coverage', 'Quick Claims', 'Roadside Assistance']
  }
];

export default COMPANY_INFO;