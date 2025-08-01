import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  options,
  rows,
  maxLength,
  min,
  max,
  className = ''
}) => {
  const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
    error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
  } ${className}`;

  const renderInput = () => {
    if (type === 'select' && options) {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClasses}
          required={required}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInputClasses} resize-none`}
          placeholder={placeholder}
          required={required}
          rows={rows || 4}
          maxLength={maxLength}
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseInputClasses}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
      {maxLength && (
        <div className="text-xs text-gray-500 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default FormField;