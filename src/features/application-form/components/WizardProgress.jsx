import { Steps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export default function WizardProgress({ currentStep, steps }) {
  const { t } = useTranslation();

  return (
      <div
        className="wizard-progress-wrap"
        role="progressbar"
        aria-label={t('formProgress')}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={currentStep + 1}
      >
        <Steps current={currentStep} items={steps} />
      </div>
  );
}
