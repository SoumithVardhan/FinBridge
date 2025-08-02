import { useState, useCallback } from 'react';
import { useFormValidation } from './useFormValidation';

interface UseFormManagerOptions<T> {
  initialValues: T;
  validationRules: any;
  onSubmit: (values: T) => Promise<boolean>;
  onSuccess?: () => void;
}

export const useFormManager = <T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  onSuccess
}: UseFormManagerOptions<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validation = useFormValidation(validationRules);

  const updateField = useCallback((field: keyof T, value: any) => {
    // Ensure null values are converted to undefined for optional fields
    const cleanValue = value === null ? undefined : value;
    setFormData(prev => ({ ...prev, [field]: cleanValue }));
    validation.clearError(field as string);
  }, [validation]);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    validation.clearAllErrors();
  }, [initialValues, validation]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      if (success) {
        resetForm();
        onSuccess?.();
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validation, onSubmit, resetForm, onSuccess]);

  return {
    formData,
    isSubmitting,
    errors: validation.errors,
    updateField,
    resetForm,
    handleSubmit,
    setFormData
  };
};
