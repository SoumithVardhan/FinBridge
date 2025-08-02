import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from './Card';

interface FormCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({
  icon: Icon,
  title,
  description,
  children,
  className = "max-w-md mx-auto w-full"
}) => {
  return (
    <Card className={className}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </Card>
  );
};

export default FormCard;
