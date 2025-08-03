import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback((name: string, value: string): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && (!value || value.trim().length === 0)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rule.maxLength} characters`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      return `Please enter a valid ${name}`;
    }

    if (value && rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  // More flexible validateForm that accepts any object type
  const validateForm = useCallback(<T extends Record<string, any>>(formData: T): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const fieldValue = formData[fieldName];
      // Convert to string, handling undefined/null values
      const stringValue = fieldValue != null ? String(fieldValue) : '';
      
      const error = validateField(fieldName, stringValue);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearError,
    clearAllErrors
  };
};

// Common validation rules
export const commonValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    custom: (value: string) => {
      if (!value?.trim()) return 'Phone number is required';
      
      // Remove all non-digit characters
      const cleaned = value.replace(/\D/g, '');
      
      // Handle +91 country code
      let phoneNumber = cleaned;
      if (cleaned.startsWith('91') && cleaned.length === 12) {
        phoneNumber = cleaned.substring(2);
      }
      
      // Check for valid 10-digit Indian mobile number
      if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
        return 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9';
      }
      
      return null;
    }
  },
  pan: {
    required: true,
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    custom: (value: string) => {
      if (value.length !== 10) return 'PAN must be 10 characters';
      return null;
    }
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value: string) => {
      if (!value?.trim()) return 'Name is required';
      
      const trimmed = value.trim();
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 50) return 'Name must be less than 50 characters';
      
      // Allow letters, spaces, apostrophes, hyphens, and dots (for names like O'Connor, Mary-Jane, Jr.)
      if (!/^[a-zA-Z\s'-.]+$/.test(trimmed)) {
        return 'Name can only contain letters, spaces, apostrophes, hyphens, and dots';
      }
      
      return null;
    }
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      
      // Count different character types
      let score = 0;
      const missing = [];
      
      if (!/[a-z]/.test(value)) missing.push('lowercase letter');
      else score++;
      
      if (!/[A-Z]/.test(value)) missing.push('uppercase letter');
      else score++;
      
      if (!/\d/.test(value)) missing.push('number');
      else score++;
      
      // Require at least 2 out of 3 criteria (more user-friendly)
      if (score < 2) {
        return `Password needs at least 2 of: ${missing.slice(0, 2).join(', ')}`;
      }
      
      return null;
    }
  },
  amount: {
    required: true,
    custom: (value: string) => {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) return 'Please enter a valid amount';
      return null;
    }
  }
};
