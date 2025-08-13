// API Configuration for FinBridge - LOCAL DOCKER DEVELOPMENT
const API_CONFIG = {
  // Local Docker API URL - NO PRODUCTION FALLBACK
  BASE_URL: import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001',
  
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

// Helper function to make API calls with enhanced logging
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  console.log('🔗 Making API call to:', url);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    mode: 'cors',
    credentials: 'omit',
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    console.log('📡 API Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ API call failed:', error);
    console.error('🔍 URL attempted:', url);
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

// Health check with retry mechanism for development
export const checkAPIHealthWithRetry = async (maxRetries = 3, delay = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await apiCall(API_CONFIG.ENDPOINTS.HEALTH);
      console.log(`✅ API Health Check successful on attempt ${attempt}`);
      return result;
    } catch (error) {
      console.log(`⚠️ API Health Check attempt ${attempt}/${maxRetries} failed:`, error);
      
      if (attempt === maxRetries) {
        console.error('❌ API Health Check failed after all retries');
        return { success: false, error: 'API unavailable after retries' };
      }
      
      // Wait before next retry
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export default API_CONFIG;
