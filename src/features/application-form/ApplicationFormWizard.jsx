import { Alert, Button, Card, Form, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { STEP_FIELDS } from './constants';
import { saveFormProgress } from './utils/formStorage';
import { useFormPersistence } from './hooks/useFormPersistence';
import { useFormSubmission } from './hooks/useFormSubmission';
import LanguageSwitcher from './components/LanguageSwitcher';
import WizardProgress from './components/WizardProgress';
import StepContent from './components/StepContent';
import './ApplicationFormWizard.less';

export default function ApplicationFormWizard() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const { handleValuesChange, resetForm } = useFormPersistence(form, currentStep, setCurrentStep);
  const { isSubmitting, feedback, setFeedback, handleSubmit: submitForm } = useFormSubmission(form, resetForm, t);

  const steps = useMemo(
    () => [{ title: t('step1Desc') }, { title: t('step2Desc') }, { title: t('step3Desc') }],
    [t]
  );

  const handleNext = useCallback(async () => {
    try {
      await form.validateFields(STEP_FIELDS[currentStep]);
      setFeedback(null);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveFormProgress(nextStep, form.getFieldsValue(true));
    } catch (error) {
      // Validation failed, errors will be shown in form
    }
  }, [form, currentStep, setFeedback]);

  const handleBack = useCallback(() => {
    setFeedback(null);
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    saveFormProgress(prevStep, form.getFieldsValue(true));
  }, [currentStep, setFeedback, form]);

  const handleSubmit = useCallback(async () => {
    try {
      await form.validateFields(STEP_FIELDS[currentStep]);
      await submitForm();
    } catch (error) {
      // Validation failed, errors will be shown in form
    }
  }, [form, currentStep, submitForm]);

  return (
    <>
      {feedback && (
        <div className="wizard-top-alert" role="status" aria-live="polite">
          <Alert
            showIcon
            type={feedback.type}
            message={feedback.message}
            closable
            onClose={() => setFeedback(null)}
          />
        </div>
      )}

      <Card className="wizard-card" role="region" aria-label={t('applicationForm')}>
        <div className="wizard-header">
          <div>
            <Typography.Title level={3} className="wizard-title">
              {t('wizardSubtitle')}
            </Typography.Title>
            </div>
          <LanguageSwitcher />
        </div>
        <WizardProgress currentStep={currentStep} steps={steps} />
        <Form form={form} layout="vertical" className="wizard-form" onValuesChange={handleValuesChange}>
          <div className="wizard-step-shell">
            <StepContent currentStep={currentStep} />
          </div>
          <div className="wizard-actions">
            <Button aria-label={t('back')} onClick={handleBack} disabled={currentStep === 0}>
              {t('back')}
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="primary" aria-label={t('next')} onClick={handleNext}>
                {t('next')}
              </Button>
            ) : (
              <Button type="primary" aria-label={t('submit')} loading={isSubmitting} onClick={handleSubmit}>
                {t('submit')}
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </>
  );
}
