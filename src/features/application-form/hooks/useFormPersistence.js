import { useCallback, useEffect } from 'react';
import { saveFormProgress, loadFormProgress, clearFormProgress } from '../utils/formStorage';

/**
 * Custom hook for form persistence with localStorage
 * @param {Object} form - Ant Design form instance
 * @param {number} currentStep - Current step index
 * @param {Function} setCurrentStep - Function to update current step
 * @returns {Object} Form persistence utilities {handleValuesChange, resetForm}
 */
export function useFormPersistence(form, currentStep, setCurrentStep) {
  useEffect(() => {
    const savedProgress = loadFormProgress();
    if (savedProgress) {
      setCurrentStep(savedProgress.currentStep);
      form.setFieldsValue(savedProgress.values);
    }
  }, [form, setCurrentStep]);

  const handleValuesChange = useCallback(() => {
    const formValues = form.getFieldsValue(true);
    saveFormProgress(currentStep, formValues);
  }, [form, currentStep]);

  const resetForm = useCallback(() => {
    form.resetFields();
    setCurrentStep(0);
    clearFormProgress();
  }, [form, setCurrentStep]);

  return { handleValuesChange, resetForm };
}
