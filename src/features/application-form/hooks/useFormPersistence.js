import { useCallback, useEffect } from 'react';
import { saveFormProgress, loadFormProgress, clearFormProgress } from '../utils/formStorage';

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
