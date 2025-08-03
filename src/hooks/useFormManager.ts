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
    
    console.log('🔄 Form submission started:', {
      formData,
      hasValidationErrors: Object.keys(validation.errors).length > 0,
      validationErrors: validation.errors
    });
    
    if (!validation.validateForm(formData)) {
      console.log('❌ Form validation failed:', validation.errors);
      return;
    }

    console.log('✅ Form validation passed, calling onSubmit');
    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      console.log('📊 onSubmit result:', success);
      if (success) {
        resetForm();
        onSuccess?.();
      }
    } catch (error) {
      console.error('💥 Form submission error:', error);
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
