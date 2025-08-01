import React from 'react';
import { CheckCircle, DivideIcon as LucideIcon } from 'lucide-react';

interface Step {
  title: string;
  icon: LucideIcon;
  completed?: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep || step.completed;
          
          return (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                isCompleted ? 'bg-green-500 text-white shadow-lg' :
                isActive ? 'bg-primary-600 text-white shadow-lg scale-110' :
                'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`ml-2 text-sm font-medium transition-colors ${
                isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 transition-colors ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;