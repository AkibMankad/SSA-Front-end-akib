import { memo } from 'react';
import PersonalInformationStep from '../steps/PersonalInformationStep';
import FamilyFinancialStep from '../steps/FamilyFinancialStep';
import SituationDescriptionsStep from '../steps/SituationDescriptionsStep';

const STEP_COMPONENTS = [PersonalInformationStep, FamilyFinancialStep, SituationDescriptionsStep];

function StepContent({ currentStep }) {
  const StepComponent = STEP_COMPONENTS[currentStep];
  return <StepComponent currentStep={currentStep} />;
}

export default memo(StepContent);
