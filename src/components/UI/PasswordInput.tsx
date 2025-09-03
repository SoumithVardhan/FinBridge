import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter password',
  error,
  required = false,
  autoComplete = 'current-password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 pr-16 ${
            error 
              ? 'border-red-500 bg-red-50 focus:ring-red-500' 
              : 'border-gray-300 hover:border-gray-400 focus:border-primary-500'
          }`}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-700 transition-colors duration-200 rounded-md hover:bg-gray-100 focus:bg-gray-100"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" aria-label="Hide password" />
            ) : (
              <Eye className="w-5 h-5" aria-label="Show password" />
            )}
          </button>
        </div>
      </div>
      {error && (
        <div className="flex items-center text-red-600 text-sm mt-2">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
