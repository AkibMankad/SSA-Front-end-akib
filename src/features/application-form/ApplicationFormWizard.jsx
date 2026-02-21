import { Alert, Button, Card, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { STEP_FIELDS } from './constants';
import { mockSubmitApplication } from './services/mockSubmitApplication';
import LanguageSwitcher from './components/LanguageSwitcher';
import WizardProgress from './components/WizardProgress';
import StepContent from './components/StepContent';
import './ApplicationFormWizard.less';

const STORAGE_KEY = 'ssa.application-form.values.v1';
const SUBMIT_TIMEOUT_MS = 10000;

function serializeValues(values) {
  return Object.entries(values).reduce((accumulator, [key, value]) => {
    if (dayjs.isDayjs(value)) {
      accumulator[key] = value.toISOString();
      return accumulator;
    }

    accumulator[key] = value;
    return accumulator;
  }, {});
}

function deserializeValues(values) {
  if (!values) {
    return {};
  }

  return {
    ...values,
    dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth) : undefined,
  };
}

async function submitWithTimeout(values) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('SUBMIT_TIMEOUT')), SUBMIT_TIMEOUT_MS);
  });

  return Promise.race([mockSubmitApplication(values), timeoutPromise]);
}

export default function ApplicationFormWizard() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timerId = setTimeout(() => {
      setFeedback(null);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [feedback]);

  const steps = [
    { title: t('step1Desc') },
    { title: t('step2Desc') },
    { title: t('step3Desc') },
  ];

  const resetWizard = () => {
    form.resetFields();
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      return;
    }

    try {
      const parsed = JSON.parse(savedState);
      if (Number.isInteger(parsed.currentStep) && parsed.currentStep >= 0 && parsed.currentStep <= 2) {
        setCurrentStep(parsed.currentStep);
      }
      form.setFieldsValue(deserializeValues(parsed.values));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [form]);

  const persistProgress = (stepValue) => {
    const values = serializeValues(form.getFieldsValue(true));
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentStep: stepValue,
        values,
      }),
    );
  };

  const handleValuesChange = () => {
    persistProgress(currentStep);
  };

  const handleNext = async () => {
    await form.validateFields(STEP_FIELDS[currentStep]);
    setFeedback(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    persistProgress(nextStep);
  };

  const handleBack = () => {
    setFeedback(null);
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep);
    persistProgress(previousStep);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setFeedback(null);
      await form.validateFields(STEP_FIELDS[currentStep]);
      const values = form.getFieldsValue(true);
      await submitWithTimeout(serializeValues(values));
      setFeedback({ type: 'success', message: t('applicationSubmitted') });
      resetWizard();
    } catch (error) {
      const isTimeout = error?.message === 'SUBMIT_TIMEOUT';
      setFeedback({
        type: 'error',
        message: isTimeout ? t('submitTimeout') : t('submitFailed'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {feedback ? (
        <div className="wizard-top-alert" role="status" aria-live="polite">
          <Alert
            showIcon
            type={feedback.type}
            message={feedback.message}
            closable
            onClose={() => setFeedback(null)}
          />
        </div>
      ) : null}

      <Card className="wizard-card" role="region" aria-label={t('applicationForm')}>
        <div className="wizard-header">
          <div>
            <Typography.Title level={3} className="wizard-title">
              {t('wizardSubtitle')}
            </Typography.Title>
            <Typography.Paragraph className="wizard-subtitle">{t('applicationForm')}</Typography.Paragraph>
          </div>
          <LanguageSwitcher />
        </div>

        <WizardProgress currentStep={currentStep} steps={steps} />

        <Form form={form} layout="vertical" className="wizard-form" onValuesChange={handleValuesChange}>
          <div className="wizard-step-shell">
            <StepContent currentStep={currentStep} />
          </div>
        </Form>

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
      </Card>
    </>
  );
}
