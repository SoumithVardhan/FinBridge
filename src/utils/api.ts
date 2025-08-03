// API Configuration for FinBridge
const API_CONFIG = {
  // Production API URL (Vercel)
  PRODUCTION_URL: 'https://sr-associates-api.vercel.app',
  
  // Development API URL
  DEVELOPMENT_URL: 'http://localhost:5000',
  
  // Use environment variable with fallback
  BASE_URL: import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://sr-associates-api.vercel.app',
  
  // API Endpoints
  ENDPOINTS: {
    HEALTH: '/api/health',
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile'
    },
    LOANS: {
      LIST: '/api/loans',
      APPLY: '/api/loans/apply',
      STATUS: '/api/loans/status'
    },
    INSURANCE: {
      LIST: '/api/insurance',
      APPLY: '/api/insurance/apply',
      CLAIMS: '/api/insurance/claims'
    },
    INVESTMENTS: {
      LIST: '/api/investments',
      SIP: '/api/investments/sip',
      MUTUAL_FUNDS: '/api/investments/mutual-funds'
    }
  }
};

// Helper function to make API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Health check function
export const checkAPIHealth = async () => {
  try {
    return await apiCall(API_CONFIG.ENDPOINTS.HEALTH);
  } catch (error) {
    console.error('Health check failed:', error);
    return { success: false, error: 'API unavailable' };
  }
};

export default API_CONFIG;
