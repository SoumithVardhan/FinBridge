// Phone number formatting utility
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Handle +91 country code
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    const number = cleaned.substring(2);
    if (number.length <= 10) {
      return `+91 ${number}`;
    }
  }
  
  // Format as standard 10-digit number
  if (cleaned.length <= 10) {
    return cleaned;
  }
  
  return value; // Return original if can't format
};

// Name formatting utility
export const formatName = (value: string): string => {
  // Trim and capitalize first letter of each word
  return value
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Email formatting utility  
export const formatEmail = (value: string): string => {
  // Trim and convert to lowercase
  return value.trim().toLowerCase();
};

// Password strength indicator
export const getPasswordStrength = (password: string): { score: number; feedback: string[] } => {
  let score = 0;
  const feedback = [];
  
  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');
  
  if (/[a-z]/.test(password)) score++;
  else feedback.push('Add a lowercase letter');
  
  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add an uppercase letter');
  
  if (/\d/.test(password)) score++;
  else feedback.push('Add a number');
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  else feedback.push('Add a special character');
  
  return { score, feedback };
};
