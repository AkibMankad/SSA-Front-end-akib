import PersonalInformationStep from '../steps/PersonalInformationStep';
import FamilyFinancialStep from '../steps/FamilyFinancialStep';
import SituationDescriptionsStep from '../steps/SituationDescriptionsStep';

export default function StepContent({ currentStep }) {
  if (currentStep === 0) {
    return <PersonalInformationStep />;
  }

  if (currentStep === 1) {
    return <FamilyFinancialStep />;
  }

  return <SituationDescriptionsStep />;
}
