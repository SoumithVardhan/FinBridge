import Joi from 'joi';

// User validation schemas
export const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'First name must contain only letters and spaces',
      'string.min': 'First name must be at least 2 characters long',
      'string.max': 'First name must not exceed 50 characters'
    }),
  
  lastName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Last name must contain only letters and spaces',
      'string.min': 'Last name must be at least 2 characters long',
      'string.max': 'Last name must not exceed 50 characters'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  
  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid 10-digit Indian phone number'
    }),
  
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match'
    }),
  
  dateOfBirth: Joi.date()
    .max('now')
    .min('1900-01-01')
    .optional(),
  
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional()
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address'
    })
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'string.empty': 'Reset token is required'
    }),
  
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match'
    })
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Current password is required'
    }),
  
  newPassword: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Passwords do not match'
    })
});

// Profile update schema
export const updateProfileSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .optional(),
  
  lastName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .optional(),
  
  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .optional(),
  
  dateOfBirth: Joi.date()
    .max('now')
    .min('1900-01-01')
    .optional(),
  
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional(),
  
  addressLine1: Joi.string()
    .max(200)
    .optional(),
  
  addressLine2: Joi.string()
    .max(200)
    .optional(),
  
  city: Joi.string()
    .max(100)
    .optional(),
  
  state: Joi.string()
    .max(100)
    .optional(),
  
  pincode: Joi.string()
    .pattern(/^\d{6}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Pincode must be a 6-digit number'
    }),
  
  country: Joi.string()
    .max(100)
    .optional()
});

// Loan application schema
export const loanApplicationSchema = Joi.object({
  loanType: Joi.string()
    .valid('HOME', 'PERSONAL', 'BUSINESS', 'EDUCATION', 'VEHICLE', 'MORTGAGE')
    .required(),
  
  amount: Joi.number()
    .min(100000)
    .max(100000000)
    .required()
    .messages({
      'number.min': 'Loan amount must be at least ₹1 lakh',
      'number.max': 'Loan amount cannot exceed ₹10 crores'
    }),
  
  tenure: Joi.number()
    .integer()
    .min(1)
    .max(360)
    .required()
    .messages({
      'number.min': 'Tenure must be at least 1 month',
      'number.max': 'Tenure cannot exceed 30 years (360 months)'
    }),
  
  monthlyIncome: Joi.number()
    .min(15000)
    .required()
    .messages({
      'number.min': 'Monthly income must be at least ₹15,000'
    }),
  
  employmentType: Joi.string()
    .valid('SALARIED', 'SELF_EMPLOYED', 'BUSINESS')
    .required(),
  
  companyName: Joi.string()
    .max(200)
    .optional(),
  
  workExperience: Joi.number()
    .integer()
    .min(0)
    .max(600)
    .optional(),
  
  purpose: Joi.string()
    .max(500)
    .optional()
});

// Investment schema
export const investmentSchema = Joi.object({
  type: Joi.string()
    .valid('SIP', 'LUMP_SUM', 'EQUITY', 'DEBT', 'HYBRID', 'ELSS')
    .required(),
  
  fundName: Joi.string()
    .max(200)
    .required(),
  
  amount: Joi.number()
    .min(500)
    .max(10000000)
    .required()
    .messages({
      'number.min': 'Investment amount must be at least ₹500',
      'number.max': 'Investment amount cannot exceed ₹1 crore'
    }),
  
  sipAmount: Joi.number()
    .min(500)
    .max(100000)
    .when('type', {
      is: 'SIP',
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  
  sipDate: Joi.number()
    .integer()
    .min(1)
    .max(31)
    .when('type', {
      is: 'SIP',
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  
  sipFrequency: Joi.string()
    .valid('MONTHLY', 'QUARTERLY')
    .when('type', {
      is: 'SIP',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
});

// Insurance policy schema
export const insurancePolicySchema = Joi.object({
  type: Joi.string()
    .valid('LIFE', 'HEALTH', 'MOTOR', 'HOME', 'TRAVEL')
    .required(),
  
  coverageAmount: Joi.number()
    .min(100000)
    .max(50000000)
    .required()
    .messages({
      'number.min': 'Coverage amount must be at least ₹1 lakh',
      'number.max': 'Coverage amount cannot exceed ₹5 crores'
    }),
  
  premiumAmount: Joi.number()
    .min(1000)
    .max(1000000)
    .required(),
  
  premiumFrequency: Joi.string()
    .valid('MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY')
    .required(),
  
  nomineeName: Joi.string()
    .max(100)
    .optional(),
  
  nomineeRelation: Joi.string()
    .max(50)
    .optional(),
  
  nomineeAge: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .optional()
});

// Contact form schema
export const contactFormSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Name must contain only letters and spaces'
    }),
  
  email: Joi.string()
    .email()
    .required(),
  
  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid 10-digit Indian phone number'
    }),
  
  service: Joi.string()
    .valid('loans', 'insurance', 'mutual-funds', 'general')
    .required(),
  
  message: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 1000 characters'
    })
});

// OTP verification schema
export const otpVerificationSchema = Joi.object({
  code: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': 'OTP must be exactly 6 digits',
      'string.pattern.base': 'OTP must contain only numbers'
    }),
  
  type: Joi.string()
    .valid('EMAIL_VERIFICATION', 'PHONE_VERIFICATION', 'PASSWORD_RESET', 'LOGIN_MFA')
    .required()
});

// Pagination schema
export const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
  
  sortBy: Joi.string()
    .optional(),
  
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
});
