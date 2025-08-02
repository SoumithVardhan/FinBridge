import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = "flex items-center text-red-600 text-sm mt-2" 
}) => {
  if (!message) return null;

  return (
    <div className={className}>
      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
      {message}
    </div>
  );
};

export default ErrorMessage;
