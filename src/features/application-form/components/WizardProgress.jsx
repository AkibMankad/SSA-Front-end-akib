import { memo } from 'react';
import { Steps } from 'antd';
import { useTranslation } from 'react-i18next';

function WizardProgress({ currentStep, steps }) {
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

export default memo(WizardProgress);
