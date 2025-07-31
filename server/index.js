const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Contact form rate limiting (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.',
});

// Middleware
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://finbridge.netlify.app', 'https://your-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must be 2-50 characters and contain only letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number'),
  body('service')
    .isIn(['loans', 'insurance', 'mutual-funds', 'general'])
    .withMessage('Please select a valid service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10-1000 characters')
];

const validateLoanApplication = [
  body('loanType')
    .isIn(['home', 'personal', 'business', 'education', 'vehicle', 'mortgage'])
    .withMessage('Please select a valid loan type'),
  body('amount')
    .isFloat({ min: 100000, max: 100000000 })
    .withMessage('Loan amount must be between ₹1 lakh and ₹10 crores'),
  body('tenure')
    .isInt({ min: 1, max: 30 })
    .withMessage('Tenure must be between 1-30 years'),
  body('income')
    .isFloat({ min: 15000 })
    .withMessage('Monthly income must be at least ₹15,000'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must be 2-50 characters and contain only letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact form submission
app.post('/api/contact', contactLimiter, validateContactForm, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    // Log the contact form submission (in production, save to database)
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      service,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Create support ticket
    // 4. Send confirmation email to user

    res.json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      ticketId: `TKT${Date.now()}`
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Loan application submission
app.post('/api/loans/apply', validateLoanApplication, handleValidationErrors, async (req, res) => {
  try {
    const { loanType, amount, tenure, income, name, email, phone } = req.body;
    
    // Generate application ID
    const applicationId = `${loanType.toUpperCase()}${Date.now()}`;
    
    // Log the loan application (in production, save to database)
    console.log('Loan application submission:', {
      applicationId,
      loanType,
      amount,
      tenure,
      income,
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    // In production, you would:
    // 1. Save to database
    // 2. Run credit checks
    // 3. Send confirmation email
    // 4. Initiate verification process

    res.json({
      success: true,
      message: 'Loan application submitted successfully!',
      applicationId,
      status: 'pending',
      nextSteps: [
        'Document verification will begin within 24 hours',
        'You will receive an email with required documents list',
        'Our team will contact you for further processing'
      ]
    });
  } catch (error) {
    console.error('Loan application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Insurance quote request
app.post('/api/insurance/quote', [
  body('insuranceType')
    .isIn(['life', 'health', 'motor', 'home', 'travel'])
    .withMessage('Please select a valid insurance type'),
  body('coverage')
    .isFloat({ min: 100000, max: 50000000 })
    .withMessage('Coverage amount must be between ₹1 lakh and ₹5 crores'),
  body('age')
    .isInt({ min: 18, max: 80 })
    .withMessage('Age must be between 18-80 years'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must be 2-50 characters and contain only letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number')
], handleValidationErrors, async (req, res) => {
  try {
    const { insuranceType, coverage, age, name, email, phone } = req.body;
    
    // Generate quote ID
    const quoteId = `QT${Date.now()}`;
    
    // Simple premium calculation (in production, use actuarial models)
    let basePremium;
    switch (insuranceType) {
      case 'life':
        basePremium = (coverage * 0.001) + (age * 100);
        break;
      case 'health':
        basePremium = (coverage * 0.002) + (age * 150);
        break;
      case 'motor':
        basePremium = coverage * 0.03;
        break;
      case 'home':
        basePremium = coverage * 0.001;
        break;
      case 'travel':
        basePremium = 500 + (age * 10);
        break;
      default:
        basePremium = 1000;
    }

    const premium = Math.round(basePremium);
    
    console.log('Insurance quote request:', {
      quoteId,
      insuranceType,
      coverage,
      age,
      premium,
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    res.json({
      success: true,
      message: 'Insurance quote generated successfully!',
      quoteId,
      premium,
      coverage,
      insuranceType,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      features: [
        'Comprehensive coverage',
        'Cashless claim settlement',
        '24/7 customer support',
        'No waiting period for accidents'
      ]
    });
  } catch (error) {
    console.error('Insurance quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// SIP investment request
app.post('/api/mutual-funds/sip', [
  body('fundType')
    .isIn(['equity', 'debt', 'hybrid', 'elss', 'index'])
    .withMessage('Please select a valid fund type'),
  body('amount')
    .isFloat({ min: 500, max: 100000 })
    .withMessage('SIP amount must be between ₹500 and ₹1 lakh'),
  body('tenure')
    .isInt({ min: 1, max: 30 })
    .withMessage('Investment tenure must be between 1-30 years'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must be 2-50 characters and contain only letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number')
], handleValidationErrors, async (req, res) => {
  try {
    const { fundType, amount, tenure, name, email, phone } = req.body;
    
    // Generate SIP ID
    const sipId = `SIP${Date.now()}`;
    
    // Calculate expected returns based on fund type
    let expectedReturn;
    switch (fundType) {
      case 'equity':
        expectedReturn = 12;
        break;
      case 'debt':
        expectedReturn = 7;
        break;
      case 'hybrid':
        expectedReturn = 10;
        break;
      case 'elss':
        expectedReturn = 13;
        break;
      case 'index':
        expectedReturn = 11;
        break;
      default:
        expectedReturn = 10;
    }
    
    // Calculate maturity amount
    const monthlyRate = expectedReturn / (12 * 100);
    const months = tenure * 12;
    const maturityAmount = Math.round(amount * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * (1 + monthlyRate));
    
    console.log('SIP investment request:', {
      sipId,
      fundType,
      amount,
      tenure,
      expectedReturn,
      maturityAmount,
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    res.json({
      success: true,
      message: 'SIP investment request submitted successfully!',
      sipId,
      fundType,
      monthlyAmount: amount,
      tenure,
      expectedReturn,
      maturityAmount,
      totalInvestment: amount * months,
      expectedGains: maturityAmount - (amount * months),
      nextSteps: [
        'Complete KYC verification',
        'Set up auto-debit mandate',
        'First SIP installment will be debited on selected date'
      ]
    });
  } catch (error) {
    console.error('SIP investment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 FinBridge API Server running on port ${PORT}`);
  console.log(`🔒 Security: Helmet, CORS, Rate Limiting enabled`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});