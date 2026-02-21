import { useState, useCallback } from 'react';
import { mockSubmitApplication } from '../services/mockSubmitApplication';
import { serializeFormValues } from '../utils/formStorage';

const SUBMIT_TIMEOUT_MS = 10000;

async function submitWithTimeout(values) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('SUBMIT_TIMEOUT')), SUBMIT_TIMEOUT_MS);
  });

  return Promise.race([mockSubmitApplication(values), timeoutPromise]);
}

export function useFormSubmission(form, resetForm, t) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setFeedback(null);
      
      const formValues = form.getFieldsValue(true);
      const serializedValues = serializeFormValues(formValues);
      
      await submitWithTimeout(serializedValues);
      
      setFeedback({ type: 'success', message: t('applicationSubmitted') });
      resetForm();
    } catch (error) {
      const isTimeout = error?.message === 'SUBMIT_TIMEOUT';
      setFeedback({
        type: 'error',
        message: isTimeout ? t('submitTimeout') : t('submitFailed'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [form, resetForm, t]);

  return { isSubmitting, feedback, setFeedback, handleSubmit };
}
