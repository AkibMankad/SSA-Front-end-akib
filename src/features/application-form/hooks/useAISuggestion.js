import { useState, useCallback } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { generateAISuggestion } from '../services/openaiService';
import { saveFormProgress } from '../utils/formStorage';

export function useAISuggestion(t, currentStep = 2) {
  const { i18n } = useTranslation();
  const form = Form.useFormInstance();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [currentField, setCurrentField] = useState(null);

  const handleHelpMeWrite = useCallback(async (fieldName) => {
    setCurrentField(fieldName);
    setModalOpen(true);
    setLoading(true);
    setError(null);
    setSuggestion('');

    try {
      const fieldLabel = t(fieldName);
      const currentValue = form.getFieldValue(fieldName) || '';
      const language = i18n.language;
      const generatedText = await generateAISuggestion(fieldName, fieldLabel, currentValue, language);
      setSuggestion(generatedText);
    } catch (err) {
      setError(err.message || t('aiGenerationFailed'));
    } finally {
      setLoading(false);
    }
  }, [form, t, i18n.language]);

  const handleAccept = useCallback((text) => {
    if (currentField) {
      form.setFieldsValue({ [currentField]: text });
      form.validateFields([currentField]).catch(() => {});
      // Persist to localStorage
      const formValues = form.getFieldsValue(true);
      saveFormProgress(currentStep, formValues);
    }
  }, [form, currentField, currentStep]);

  const handleEdit = useCallback((text) => {
    if (currentField) {
      form.setFieldsValue({ [currentField]: text });
      form.validateFields([currentField]).catch(() => {});
      // Persist to localStorage
      const formValues = form.getFieldsValue(true);
      saveFormProgress(currentStep, formValues);
    }
  }, [form, currentField, currentStep]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setCurrentField(null);
    setSuggestion('');
    setError(null);
  }, []);

  return {
    modalOpen,
    loading,
    error,
    suggestion,
    handleHelpMeWrite,
    handleAccept,
    handleEdit,
    handleCloseModal,
  };
}
